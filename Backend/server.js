const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

 
const app = express();
const PORT = process.env.PORT || 5000;

// Conectar a la base de datos
async function connectToDatabase() {
  try {
    process.on('warning', (warning) => {
      if (warning.name === 'DeprecationWarning') {
        console.warn('Deprecation Warning:', warning.message);
      } else {
        console.warn('Warning:', warning.message);
      }
    });

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB Connected');
  } catch (error) {
    if (error.message.includes('timeout')) {
      console.error('Connection Timeout Error: Unable to connect to MongoDB. Please check your network/firewall settings.');
      console.error('Error connecting to MongoDB:', error);
    } else if (error.message.includes('network')) {
      console.error('Network Error: Unable to connect to MongoDB. Please check your network/firewall settings.');
      console.error('Error connecting to MongoDB:', error);
    } else if (error.code === 'EREFUSED' || error.syscall === 'querySrv') {
      console.error('DNS Error: Unable to resolve MongoDB hostname. Please check your network configuration and ensure that MongoDB is accessible.');
      console.error('Error connecting to MongoDB:', error);
    } else {
      console.error('Error connecting to MongoDB:', error);
    }
  } 
}


async function disconnectFromDatabase() {
  try {
    await mongoose.disconnect();
    console.log('MongoDB Disconnected');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
  }
}

// Llamar a la función para conectarse a la base de datos
connectToDatabase();

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'exp://192.168.1.72:8081', 'https://good-guys.netlify.app'],
  //origin: true,
  credentials: true
}));
app.use(cookieParser());

// Rutas y endpoints
const routes = require('./src/routes/routes'); //ruta
app.use('/api/functions', routes); //endpoint

const accountsRoutes = require('./src/routes/accountsRoutes');
app.use('/api/accounts', accountsRoutes);

const movementsRoutes = require('./src/routes/movementsRoutes');
app.use('/api/movements', movementsRoutes);

const surveyRoutes = require('./src/routes/surveyRoutes');
app.use('/api/survey', surveyRoutes);


// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
