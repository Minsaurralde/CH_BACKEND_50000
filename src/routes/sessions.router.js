import { Router } from "express";
import passport from "passport";

import { userModel } from "../daos/mongo/models/user.model.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";
import { passportCall } from "../middleware/passportCall.js";
import { authorization } from "../middleware/authorization.js";

const router = Router();

// Debe mostrar la vista para reistrarase
router.post("/register", async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;
  const exist = await userModel.findOne({ email: email });
  //si el usuario ya existe devuelvo error
  if (exist) return res.status(400).send({ error: "existent user" });

  //si el usuario no existe, lo guardi en la base de datos
  try {
    const result = await userModel.create({
      first_name,
      last_name,
      email,
      age,
      password: createHash(password),
    });
    res.status(200).send({ status: "success", message: "register ok" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Debe mostrar la vista para hacer la autenticacion, si la sesion no existe
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({
    email: email,
  });
  if (!user) return res.status(404).send({ error: "user not found" });

  if (!isValidPassword(user, password))
    return res.status(403).send({ error: "incorrect password" });

  delete user.password; // IMPORTANTE:  borrar el password porque es un dato sensible

  try {
    req.session.user = {
      name: user.first_name + " " + user.last_name,
      email: user.email,
      age: user.age,
    };

    res.status(200).send({ status: "success", message: req.session.user });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post("/logout", async (req, res) => {
  try {
    req.session.destroy();
    res.status(200).send({ status: "success", message: "Logout OK!" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get(
  "/current",
  passportCall(["session", "github"]),
  authorization("user"),
  (req, res) => {
    res.send(req.user);
  }
);

router.post("/restartPassword", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email: email });
  if (!user) return res.status(404).send({ error: "user not found" });

  const newPass = createHash(password);

  try {
    const result = await userModel.updateOne(
      { _id: user._id },
      { $set: { password: newPass } }
    );
    res.status(200).send({ status: "success", message: "update ok" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get(
  "/github",
  passport.authenticate("github", { scope: "user:email" }),
  (req, res) => {}
);

router.get(
  "/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    console.log("exito");
    req.session.user = req.user;
    res.redirect("/");
  }
);

export default router;
