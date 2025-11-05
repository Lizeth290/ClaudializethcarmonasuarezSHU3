import asyncHandler from 'express-async-handler';
import axios from 'axios';

// @desc    Consumir un endpoint de una API externa (tercero)
// @route   GET /api/external/random-api
// @access  Público (o Privado, si lo prefieres)
const getRandomPublicAPI = asyncHandler(async (req, res) => {
  try {
    const response = await axios.get(process.env.EXTERNAL_API_URL);

    // Reenviamos la respuesta del servicio externo a nuestro frontend
    res.json(response.data);
  } catch (error) {
    console.error(`Error al llamar a la API externa: ${error.message}`);
    // Manejamos el error si la API de terceros falla
    res.status(error.response?.status || 500);
    throw new Error(
      `Fallo al obtener datos del servicio externo: ${error.message}`
    );
  }
});

export { getRandomPublicAPI };