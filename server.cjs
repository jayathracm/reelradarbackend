async function startServer() {
    try {
      const { default: server } = await import('./index.js');
      return server;
    } catch (err) {
      console.error('Error importing ES module:', err);
      process.exit(1);
    }
}

startServer();