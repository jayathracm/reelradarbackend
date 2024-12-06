const startServer = async () => {
    try {
      // Import app configuration
      const app = await import('./index.js');
      
      // Access the Express app instance
      const server = app.default;
      
      // Log successful startup
      console.log('Server initialized successfully');
      
      return server;
    } catch (err) {
      // Enhanced error logging
      console.error('Server initialization failed:', err);
      console.error('Stack trace:', err.stack);
      process.exit(1);
    }
  };
  
  // Add process error handlers
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
  
  // Start server with immediate invocation
  (async () => {
    try {
      await startServer();
    } catch (err) {
      console.error('Failed to start server:', err);
      process.exit(1);
    }
  })();