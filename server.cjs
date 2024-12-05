// server.cjs
try {
    await import('./index.js');
  } catch (err) {
    console.error('Error importing ES module:', err);
    process.exit(1);
  }