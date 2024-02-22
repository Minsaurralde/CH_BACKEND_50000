import { Router } from "express";
import passport from "passport";

import { userModel } from "../daos/mongo/models/user.model.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";
import jwt from "jsonwebtoken";
import { JWT_COOKIE, JWT_SECRET } from "../constants/environments.js";

const router = Router();

// Debe mostrar la vista para reistrarase
router.post(
  "/register",
  passport.authenticate("register", { session: false }),
  async (req, res) => {
    res.status(200).send({ status: "success", message: "register ok" });
  }
);

// Debe mostrar la vista para hacer la autenticacion, si la sesion no existe
router.post(
  "/login",
  passport.authenticate("login", { session: false }),
  async (req, res) => {
    let token = jwt.sign(
      {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        age: req.user.age,
      },
      JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    res
      .cookie(JWT_COOKIE, token, { httpOnly: true })
      .status(200)
      .send({ status: "success", message: req.user });
  }
);

router.get(
  "/current",
  passport.authenticate(["jwt", "github"], { session: false }),
  async (req, res) => {
    res.status(200).send(req.user);
  }
);

// router.get(
//   "/current",
//   passportCall(["jwt", "github"], { session: false }),
//   authorization("user"),
//   (req, res) => {
//     res.send(req.user);
//   }
// );

router.post("/logout", async (req, res) => {
  try {
    req.session.destroy();
    res.status(200).send({ status: "success", message: "Logout OK!" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

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
    res.redirect("/");
  }
);

export default router;
