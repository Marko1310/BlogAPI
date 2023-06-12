// Import dependencies
import app from './app';

// Setup server
const PORT = process.env.PORT || 8000;

//import model config
import syncModels from './config/modelsConfig';

// 1) Connect the database, sync models
// 2) Start server
const startServer = async () => {
  try {
    await syncModels();
    console.log(`All models are in sync`);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log('Error starting server:', error);
  }
};

process.on('unhandledRejection', (err: Error) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! Shutting down...');
  process.exit(1);
});

startServer();
