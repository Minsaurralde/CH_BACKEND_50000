// se crea una instancia de socket para poder establecer la comunicacion
const socket = io();

//Funciones para pintar y borrar users
const render = (data) => {
  let productList = document.getElementById("user-list");
  let newElement = document.createElement("tr");
  newElement.setAttribute("id", data._id);

  let htmlProducto = `
      <td>${data._id}</td>
      <td>${data.first_name}</td>
      <td>${data.last_name}</td>
      <td>${data.email}</td>
      <td>
        <select id="inputRole-${data._id}" class="form-control" disabled >
          <option selected>${data.role}</option>
          <option value="admin">admin</option>
          <option value="user">user</option>
        </select>
      </td>
      <td>
        <i class="bi bi-pencil-fill" onclick="edit('${data._id}')"></i>
        <button type="button" class="btn btn-primary d-none" onclick="save('${data._id}')">Guardar</button>
      </td>
      <td><i class="bi bi-trash3-fill" onclick="remove('${data._id}')"></i></td>
      `;
  newElement.innerHTML = htmlProducto;
  productList.appendChild(newElement);
};
const deleteRender = (id) => {
  const toDelete = document.getElementById(id);
  const fatherNode = toDelete.parentNode;
  fatherNode.removeChild(toDelete);
};

//Funcion del lapiz
const edit = (id) => {
  // 1- habilitar opciones
  const htmlSelect = document.getElementById(`inputRole-${id}`);
  htmlSelect.removeAttribute("disabled");
  // 2- ocultar lapiz y mostrar btn
  const parentDOM = document.getElementById(id);
  const htmlEdit = parentDOM.getElementsByClassName("bi-pencil-fill");
  htmlEdit[0].classList.add("d-none");
  const htmlSave = parentDOM.getElementsByTagName("button");
  htmlSave[0].classList.remove("d-none");
};
//Funcion guardar rol
const save = (id) => {
  const htmlSelect = document.getElementById(`inputRole-${id}`);
  const role = htmlSelect.value;

  // 1- desabilitar opciones
  htmlSelect.setAttribute("disabled", "");
  // 2- ocultar lapiz y mostrar btn
  const parentDOM = document.getElementById(id);
  const htmlEdit = parentDOM.getElementsByClassName("bi-pencil-fill");
  htmlEdit[0].classList.remove("d-none");
  const htmlSave = parentDOM.getElementsByTagName("button");
  htmlSave[0].classList.add("d-none");

  socket.emit("update-user", { id, role });
};

const remove = (id) => {
  socket.emit("remove-user", id);
};

// Escuchando mensajes del backend para actualizar la lista
socket.on("delete-user", (id) => {
  deleteRender(id);
});
socket.on("message-user", (data) => {
  const htmlToast = document.getElementById("toast");
  const htmlInfoToast = htmlToast.getElementsByTagName("p");
  htmlInfoToast[0].innerHTML = `${data}`;

  htmlToast.classList.add("show");
});
socket.on("error-user", (data) => {
  alert(data);
});
