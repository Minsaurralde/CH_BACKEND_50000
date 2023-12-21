export const validateProduct = (req, res, next) => {
  const { title, description, price, code, stock } = req.body;
  // - Todos los campos son obligatorios a excepcion de thumbnail
  if (!title || !description || !price || !code || !stock) {
    res.send({ error: "faltan datos obligatorios" });
  } else {
    next();
  }
};
