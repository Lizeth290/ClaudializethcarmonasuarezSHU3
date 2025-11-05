// Middleware para rutas no encontradas (404)
const notFound = (req, res, next) => {
  const error = new Error(`No encontrado - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Middleware de manejo de errores centralizado
const errorHandler = (err, req, res, next) => {
  // A veces los errores vienen con status 200, lo ajustamos
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Manejo de errores específicos de Mongoose (ej. CastError para ObjectId inválido)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Recurso no encontrado';
  }

  res.status(statusCode).json({
    message: message,
    // Mostrar el stack trace solo en desarrollo (no en producción)
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };