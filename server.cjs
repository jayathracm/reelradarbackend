// server.cjs
async function startServer() {
    try {
      const app = await import('./index.js');
      return app.default;
    } catch (err) {
      console.error('Error importing ES module:', err);
      process.exit(1);
    }
  }
  
  startServer();