// server.cjs
let server = null; // Track server instance

const startServer = async () => {
    // Only start if no server exists
    if (server) {
        console.log('Server already running');
        return server;
    }

    try {
        // Import app configuration
        const { default: app } = await import('./index.js');
        
        // Ensure port is correctly set
        const PORT = process.env.PORT || 3001;
        
        // Create server instance and start listening
        server = app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server initialized and running on port ${PORT}`);
        });

        // Handle server-specific errors
        server.on('error', (error) => {
            console.error('Server error:', error);
            cleanup();
        });

        return server;
    } catch (err) {
        console.error('Server initialization failed:', err);
        console.error('Stack trace:', err.stack);
        cleanup();
        throw err;
    }
};

// Cleanup function
const cleanup = () => {
    if (server) {
        server.close(() => {
            console.log('Server closed');
            server = null;
        });
    }
    process.exit(1);
};

// Process error handlers
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    console.error('Stack trace:', err.stack);
    cleanup();
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise);
    console.error('Reason:', reason);
    cleanup();
});

// Export the server startup function
module.exports = startServer;

// Start server in production
if (process.env.NODE_ENV === 'production') {
    startServer().catch(err => {
        console.error('Failed to start server:', err);
        process.exit(1);
    });
}