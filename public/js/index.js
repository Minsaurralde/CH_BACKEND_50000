//Formulario
let htmlForm = document.getElementById("product-form");
//Eventlistener para el form del submit de Producto y lo enviá al backend
htmlForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let htmlInputs = htmlForm.getElementsByTagName("input");

  let newData = {
    title: "",
    description: "",
    price: "",
    thumbnail: "",
    code: "",
    stock: "",
  };

  for (let i = 0; i < htmlInputs.length; i++) {
    newData = {
      ...newData,
      [htmlInputs[i].name]: htmlInputs[i].value,
    };
  }

  socket.emit("new-product", newData);
  htmlForm.reset();
});
//Funcion para pintar un producto
const render = (data) => {
  let productList = document.getElementById("product-list");
  let newElement = document.createElement("tr");
  let htmlProducto = `
      <th scope="row">${data.id}</th>
      <td>${data.title}</td>
      <td>${data.price}</td>
      <td>${data.code}</td>
      <td>${data.stock}</td>
      <td>${data.description}</td>
      <td>${data.thumbnail || ""}</td>
      `;
  newElement.innerHTML = htmlProducto;
  productList.appendChild(newElement);
};

// se crea una instancia de socket para poder establecer la comunicacion
const socket = io();
// Escuchando mensajes del backend para actualizar la lista de productos
socket.on("update", (product) => {
  render(product);
});
// mostramos una alerta si no se creo el producto
socket.on("error", (data) => {
  alert(data);
});
