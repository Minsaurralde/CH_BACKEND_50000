import ProductService from "../services/product.service.js";
import UserService from "../services/user.service.js";

export const configureWebSocket = (socketServer) => {
  socketServer.on("connection", (socket) => {
    // console.log("New conection id: " + socket.id);

    // PRODUCTS
    socket.on("new-product", async (newProduct) => {
      try {
        const res = await ProductService.newProduct(newProduct);
        socket.emit("update-product", res);
      } catch (error) {
        socket.emit("error-product", error.message);
      }
    });

    socket.on("remove-product", async (id) => {
      try {
        await ProductService.deleteById(id);
        socket.emit("delete-product", id);
      } catch (error) {
        socket.emit("error-product", error.message);
      }
    });

    // USERS
    socket.on("update-user", async ({ id, role }) => {
      try {
        await UserService.updateRoleById({ id, role });
        socket.emit(
          "message-user",
          `el usuario id: ${id} se actualizo con exito`
        );
      } catch (error) {
        socket.emit("error-user", error.message);
      }
    });

    socket.on("remove-user", async (id) => {
      try {
        await UserService.deleteById(id);
        socket.emit(
          "message-user",
          `el usuario id: ${id} se elimino exitosamente`
        );
      } catch (error) {
        socket.emit("error-user", error.message);
      }
    });
  });
};
