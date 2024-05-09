import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  try {
    req.logger.fatal("fatal level");
    req.logger.error("error level");
    req.logger.warning("warning level");
    req.logger.info("info level");
    req.logger.http("http level");
    req.logger.debug("debug level");

    res.status(200).send({ message: "test ok" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

export default router;
