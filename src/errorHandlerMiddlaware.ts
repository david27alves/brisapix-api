export default function errorHandler (err, req, res, next) {
    res.status(500)
    res.send("Estamos com problemas no servidor. Tente novamente mais tarde.");
  }
