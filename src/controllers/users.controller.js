import { Router } from "express";
import passport from "passport";
import UserService from "../services/user.service.js";
import { authorization } from "../middleware/authorization.js";

const router = Router();

router.get(
  "/",
  passport.authenticate(["jwt"], { session: false }),
  authorization("admin"),
  async (req, res) => {
    try {
      const response = await UserService.getAll();
      res.status(200).send(response);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
);

router.get(
  "/:uid",
  passport.authenticate(["jwt"], { session: false }),
  authorization("admin"),
  async (req, res) => {
    const userId = req.params.uid;

    try {
      const data = await UserService.getById(userId);
      res.status(200).send(data);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
);

router.delete(
  "/:uid",
  passport.authenticate(["jwt"], { session: false }),
  authorization("admin"),
  async (req, res) => {
    const userId = req.params.cid;

    try {
      await UserService.deleteById(userId);
      res.status(200).send({ exito: "el usuario fue eliminado con exito" });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
);

router.delete(
  "/",
  passport.authenticate(["jwt"], { session: false }),
  authorization("admin"),
  async (req, res) => {
    try {
      const response = await UserService.deleteInactiveUsers();
      res.status(200).send({ exito: response });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
);

export default router;
