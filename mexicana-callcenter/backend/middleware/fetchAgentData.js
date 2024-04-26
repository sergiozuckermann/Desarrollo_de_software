// const express = require('express');
// const AWS = require('aws-sdk');

// const app = express();
// const port = 3001;

// // Configura AWS SDK
// AWS.config.update({
//   region: 'us-east-1', // Reemplaza 'us-east-1' con la región de tu tabla DynamoDB
//   accessKeyId: 'AKIA4MTWNWHCMPE7QLDG', // Reemplaza 'TU_ACCESS_KEY_ID' con tu ID de clave de acceso
//   secretAccessKey: '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', // Reemplaza 'TU_SECRET_ACCESS_KEY' con tu clave de acceso secreta
// });

// const dynamoDB = new AWS.DynamoDB.DocumentClient();

// // Ruta para obtener todos los datos de la tabla DynamoDB
// app.get('/allData', async (req, res) => {
//   try {
//     const params = {
//       TableName: 'Agent',
//     };
//     const { Items } = await dynamoDB.scan(params).promise();
//     res.json(Items);
//     console.log('Todos los datos de la tabla:', Items); // Se imprime en la consola del servidor
//   } catch (error) {
//     console.error('Error al obtener todos los datos de la tabla:', error);
//     res.status(500).json({ error: 'Error al obtener todos los datos de la tabla', details: error.message });
//   }
// });

// // Inicia el servidor
// app.listen(port, () => {
//   console.log(`Servidor backend iniciado en http://localhost:${port}`);
// });

const express = require('express');
const AWS = require('aws-sdk');
require('dotenv').config({ path: './env/.env' });

const app = express();
const port = 3001;

// Configura AWS SDK
AWS.config.update({
  region: 'us-east-1', // Region us-east-1
  accessKeyId: 'ACCESS_KEY_ID', // AccesKeyID en .env
  secretAccessKey: 'TU_SECRET_ACCESS_KEY', // AccesKeySecret en .env o solicitar por whatsapp a 4432277727
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Ruta para obtener datos de un usuario por su nombre de usuario
app.get('/userDataByUsername', async (req, res) => {
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
  console.log(`Servidor backend iniciado en http://localhost:${port}`);
});

