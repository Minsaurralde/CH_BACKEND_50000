import app from "./server";
import { PORT } from "./config/app.config";

const httpServer = app.listen(PORT, () =>
  console.log(`server ready on port ${PORT}`)
);

// Configuraciones de websocket
const socketServer = new Server(httpServer);
configureWebSocket(socketServer);
