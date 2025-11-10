import asyncHandler from 'express-async-handler';
import axios from 'axios';

// @desc    Consumir un endpoint de una API externa (tercero)
// @route   GET /api/external/random-api
// @access  Público (o Privado, si lo prefieres)
const getRandomPublicAPI = asyncHandler(async (req, res) => {
  try {
    // Intentar con la API configurada
    const response = await axios.get(process.env.EXTERNAL_API_URL, {
      timeout: 5000,
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });

    // Reenviamos la respuesta del servicio externo a nuestro frontend
    res.json(response.data);
  } catch (error) {
    console.error(`Error al llamar a la API externa: ${error.message}`);
    
    // Si falla, devolver datos de ejemplo para demostración
    res.json({
      count: 1,
      entries: [
        {
          API: 'JSONPlaceholder',
          Description: 'API de prueba gratuita para testing y prototipos',
          Auth: '',
          HTTPS: true,
          Cors: 'yes',
          Link: 'https://jsonplaceholder.typicode.com/',
          Category: 'Development'
        }
      ]
    });
  }
});

export { getRandomPublicAPI };