const errorHandler = (err, req, res, next) => { 
    let message = 'No se ha podido procesar la solicitud';

    if (process.env.NODE_ENV === 'development') {
        const statusCode = err.statusCode || 400;
        message = err.message || message;
        return res.status(statusCode).json({ 
            success: false,
            status: err.statusCode,
            message: message,
            stack: err.stack
        });
    }

    return res.status(400).send({ message: message });
};

module.exports = errorHandler;