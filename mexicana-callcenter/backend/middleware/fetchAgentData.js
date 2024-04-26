const express = require('express');
const AWS = require('aws-sdk');
// require('dotenv').config({ path: '../../env/.env' });

const app = express();
const port = 3001;

// Configura AWS SDK
// AWS.config.update({
//   region: 'us-east-1', // Region en .env
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID, // AccesKeyID en .env
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // AccesKeySecret en .env
// });

AWS.config.update({
  region: 'us-east-1', // Region en .env
  accessKeyId: "", // AccesKeyID en .env
  secretAccessKey: "", // AccesKeySecret en .env
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Middleware para configurar CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Permite cualquier origen para consultas
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Ruta para obtener datos de un usuario por su nombre de usuario
app.get('/userData', async (req, res) => {
  try {
    const username = 'juanpaRdeChAgent'; // Nombre de usuario a consultar
    const params = {
      TableName: 'Agent',
      IndexName: 'usernameQueryIndex', // Nombre del índice global secundario (GSI)
      KeyConditionExpression: 'username = :username',
      ExpressionAttributeValues: {
        ':username': username,
      },
    };
    const { Items } = await dynamoDB.query(params).promise();
    if (Items.length > 0) {
      res.json(Items[0]); // Devuelve el primer elemento encontrado (debería ser único por nombre de usuario)
      console.log('Datos del usuario:', Items[0]); // Se imprime en la consola del servidor
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener datos del usuario por nombre de usuario:', error);
    res.status(500).json({ error: 'Error al obtener datos del usuario por nombre de usuario', details: error.message });
  }
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Consultar datos del agente en http://localhost:${port}/userData`);
});

