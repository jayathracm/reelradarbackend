const startServer = async () => {
    try {
      // Import app configuration
      const { default: app } = await import('./index.js');
      
      // Ensure port is correctly set
      const PORT = process.env.PORT || 3001;
      
      // Create server instance and start listening
      const server = app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server initialized and running on port ${PORT}`);
      });
  
      // Handle server-specific errors
      server.on('error', (error) => {
        console.error('Server error:', error);
        process.exit(1);
      });
  
      return server;
    } catch (err) {
      console.error('Server initialization failed:', err);
      console.error('Stack trace:', err.stack);
      process.exit(1);
    }
  };
  
  // Process error handlers
  process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    console.error('Stack trace:', err.stack);
    process.exit(1);
  });
  
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise);
    console.error('Reason:', reason);
    process.exit(1);
  });
  
  // Export the server startup function
  module.exports = startServer;
  
  // Start server immediately in production
  if (process.env.NODE_ENV === 'production') {
    (async () => {
      try {
        await startServer();
      } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
      }
    })();
  }