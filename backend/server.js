const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors({
    origin: '*', // For production, restrict this to the exact client domain if desired
    methods: ['POST', 'GET'],
    allowedHeaders: ['Content-Type']
}));

// Rate Limiter: Max 60 requests per 10 minutes from any single IP address
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, 
    max: 60, 
    message: { error: 'Too many requests from this IP. Please try again later.' },
    standardHeaders: true, 
    legacyHeaders: false, 
});
app.use('/api/', limiter);

// Body Parser
app.use(express.json());

// Import & mount routes
const chatRouter = require('./routes/chat');
app.use('/api/chat', chatRouter);

// Health check route
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date() });
});

// General Error Handler
app.use((err, req, res, next) => {
    console.error('Unhandled server error:', err.stack || err);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Listen
app.listen(PORT, () => {
    console.log(`Yatra Guide backend listening on port ${PORT}`);
});
