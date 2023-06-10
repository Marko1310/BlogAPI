// Import dependencies
import app from './app';

// Setup server
const PORT = process.env.PORT || 8000;

//Import database
import sequelize from './config/databaseConnection';

// 1) Connect the database
// 2) Start server
async function connect(): Promise<void> {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    app.listen(PORT, () => {
      console.log(`now listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

connect();
