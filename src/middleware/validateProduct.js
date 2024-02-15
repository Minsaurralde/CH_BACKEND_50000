export const validateProduct = (req, res, next) => {
  const { title, category, description, price, code, stock } = req.body;
  // - Todos los campos son obligatorios a excepcion de thumbnail
  if (!title || !category || !description || !price || !code || !stock) {
    res.send({ error: "faltan datos obligatorios" });
  } else {
    req.body = {
      title,
      category,
      description,
      price,
      thumbnail: req.body.thumbnail || "Sin imagen",
      code,
      stock,
    };
    next();
  }
};
