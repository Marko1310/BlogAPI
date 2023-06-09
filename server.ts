// Import dependencies
const app = require('./app');

// Setup server
const PORT = process.env.PORT || 8000;

//Import database
const client = require('./config/databaseConnection');

// Start server
async function connect(): Promise<void> {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL');
    app.listen(PORT, () => {
      console.log(`now listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error);
  }
}

connect();
