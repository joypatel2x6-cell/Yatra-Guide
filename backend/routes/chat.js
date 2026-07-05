const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Retrieve secure API key from backend environment variables
const apiKey = process.env.GEMINI_API_KEY;
let genAI;

if (apiKey && apiKey !== 'YOUR_GEMINI_API_KEY_HERE') {
    genAI = new GoogleGenerativeAI(apiKey);
} else {
    console.warn('WARNING: GEMINI_API_KEY is not configured or contains placeholder in backend/.env. AI requests will fail.');
}

const SYSTEM_INSTRUCTION = `You are Yatra AI, the professional Indian travel assistant for the Yatra Guide website.
Your goal is to help users with travel questions about India, but you are also a helpful general AI assistant. You can recommend destinations, suggest itineraries, compare transport options (bike, car, bus, train, flight), suggest budgets, give packing tips, explain local attractions, and recommend hotels/restaurants.

Guidelines:
1. Always be polite, welcoming, and act as a knowledgeable travel expert.
2. While you specialize in Indian travel planning, you are also a helpful general AI assistant and MUST answer ANY question the user asks, even if it is completely unrelated to travel. Do not decline any question.
3. Keep your answers concise, structured, and use Markdown (bullet points, bold text) for readability.
4. Do not make up facts; if you do not know about a specific topic or place, provide the best general information possible or advise checking official resources.`;

router.post('/', async (req, res) => {
    try {
        const { message, history } = req.body;

        // Validation
        if (!message || typeof message !== 'string') {
            return res.status(400).json({ error: 'Message field is required and must be a string.' });
        }

        const sanitizedMessage = message.trim().slice(0, 1000); // Sanitize and cap length
        if (sanitizedMessage.length === 0) {
            return res.status(400).json({ error: 'Message cannot be empty.' });
        }

        if (!genAI) {
            return res.status(503).json({ error: 'AI Service is currently unavailable. Please verify API key configuration.' });
        }

        // Initialize Gemini model with system instruction
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash',
            systemInstruction: SYSTEM_INSTRUCTION,
        });

        // Format history for Gemini chat if provided
        // Gemini expects: array of { role: 'user' | 'model', parts: [{ text: '...' }] }
        let chatSessionHistory = [];
        if (Array.isArray(history)) {
            chatSessionHistory = history.map(item => ({
                role: item.role === 'user' ? 'user' : 'model',
                parts: [{ text: item.text }]
            })).filter(h => h.parts[0].text);
        }

        // Start chat with history
        const chat = model.startChat({
            history: chatSessionHistory,
            generationConfig: {
                maxOutputTokens: 1000,
                temperature: 0.7,
            }
        });

        // Timeout promise: 15 seconds
        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Request Timeout')), 15000)
        );

        // Fetch response from API or timeout
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
});

module.exports = router;
