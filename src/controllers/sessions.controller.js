import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

import { userModel } from "../store/mongo/models/user.model.js";
import { JWT_COOKIE, JWT_SECRET } from "../app.config.js";
import { createHash } from "../utils/bcrypt.js";

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

// solo para JWT (pasar por DTO para ocultar informacion sensible)
router.get(
  "/current",
  passport.authenticate(["jwt"], { session: false }),
  async (req, res) => {
    res.status(200).send(req.user);
  }
);

router.post("/logout", async (req, res) => {
  try {
    res
      .clearCookie(JWT_COOKIE)
      .status(200)
      .send({ status: "success", message: "Logout OK!" });
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
    res.cookie(JWT_COOKIE, token, { httpOnly: true }).redirect("/");
  }
);

export default router;
