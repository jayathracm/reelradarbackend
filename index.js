import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { userRouter } from './routers/userRouter.js';
import reviewRouter from "./routers/reviewRouter.js";
import favoriteRouter from "./routers/favoriteRouter.js";
import groupRouter from "./routers/groupRouter.js";
import groupDetailsRouter from './routers/groupDetailsRouter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002; // Changed port to 3002

// Error handling
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Health check
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Test endpoint
app.get('/test', (req, res) => {
  res.send('Hello from backend');
});

// Root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the Movie App Backend!');
});

// Routes
app.use('/user', userRouter);
app.use('/reviews', reviewRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/favorites", favoriteRouter);
app.use("/api/groups", groupRouter);
app.use('/api', groupDetailsRouter);

// Error handler
app.use((err, req, res, next) => {
  console.error('Error stack:', err.stack);
  res.status(err.statusCode || 500).json({ 
    error: err.message || 'Internal Server Error'
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Capture startup errors
server.on('error', (err) => {
  console.error('Server startup error:', err);
});

export default server; // Export the server instance