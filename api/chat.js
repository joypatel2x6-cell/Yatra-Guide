const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = process.env.GEMINI_API_KEY;
let genAI;

if (apiKey && apiKey !== 'YOUR_GEMINI_API_KEY_HERE') {
    genAI = new GoogleGenerativeAI(apiKey);
}

const SYSTEM_INSTRUCTION = `You are Yatra AI, the professional Indian travel assistant for the Yatra Guide website.
Your goal is to help users with travel questions about India, but you are also a helpful general AI assistant. You can recommend destinations, suggest itineraries, compare transport options (bike, car, bus, train, flight), suggest budgets, give packing tips, explain local attractions, and recommend hotels/restaurants.

Guidelines:
1. Always be polite, welcoming, and act as a knowledgeable travel expert.
2. While you specialize in Indian travel planning, you are also a helpful general AI assistant and MUST answer ANY question the user asks, even if it is completely unrelated to travel. Do not decline any question.
3. Keep your answers concise, structured, and use Markdown (bullet points, bold text) for readability.
4. Do not make up facts; if you do not know about a specific topic or place, provide the best general information possible or advise checking official resources.`;

// Simple in-memory rate limiting (per serverless instance, resets on cold starts)
const ipRequestMap = new Map();

function isRateLimited(ip) {
    const now = Date.now();
    const windowMs = 10 * 60 * 1000; // 10 minutes
    const maxRequests = 60;

    if (!ipRequestMap.has(ip)) {
        ipRequestMap.set(ip, []);
    }
    const timestamps = ipRequestMap.get(ip).filter(t => now - t < windowMs);
    timestamps.push(now);
    ipRequestMap.set(ip, timestamps);

    return timestamps.length > maxRequests;
}

module.exports = async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // Rate limiting
    const ip = req.headers['x-forwarded-for'] || req.connection?.remoteAddress || 'unknown';
    if (isRateLimited(ip)) {
        return res.status(429).json({ error: 'Too many requests from this IP. Please try again later.' });
    }

    try {
        const { message, history } = req.body;

        if (!message || typeof message !== 'string') {
            return res.status(400).json({ error: 'Message field is required and must be a string.' });
        }

        const sanitizedMessage = message.trim().slice(0, 1000);
        if (sanitizedMessage.length === 0) {
            return res.status(400).json({ error: 'Message cannot be empty.' });
        }

        if (!genAI) {
            return res.status(503).json({ error: 'AI Service is currently unavailable. Please verify API key configuration.' });
        }

        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash',
            systemInstruction: SYSTEM_INSTRUCTION,
        });

        let chatSessionHistory = [];
        if (Array.isArray(history)) {
            chatSessionHistory = history.map(item => ({
                role: item.role === 'user' ? 'user' : 'model',
                parts: [{ text: item.text }]
            })).filter(h => h.parts[0].text);
        }

        const chat = model.startChat({
            history: chatSessionHistory,
            generationConfig: {
                maxOutputTokens: 1000,
                temperature: 0.7,
            }
        });

        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Request Timeout')), 15000)
        );

        const responsePromise = chat.sendMessage(sanitizedMessage);
        const result = await Promise.race([responsePromise, timeoutPromise]);

        const responseText = result.response.text();
        res.json({ reply: responseText });

    } catch (error) {
        console.error('Error during chat completion:', error);
        if (error.message === 'Request Timeout') {
            return res.status(504).json({ error: 'The request timed out. Please try again.' });
        }
        res.status(500).json({ error: 'An error occurred while generating the response.' });
    }
};
