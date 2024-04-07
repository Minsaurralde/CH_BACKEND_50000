let currentCart = "";

const activeSort = () => {
  const params = new URLSearchParams(window.location.search);
  const sortValue = params.get("sort");

  if (sortValue) {
    const coleccion = document.querySelectorAll("#dropdownMenuButton option");
    for (let index = 0; index < coleccion.length; index++) {
      const element = coleccion[index];

      element.value == sortValue
        ? element.setAttribute("selected", true)
        : element.removeAttribute("selected");
    }
  }
};

const handleSort = (e) => {
  const { target } = e;
  const sort = target.value;

  const params = new URLSearchParams(window.location.search);
  if (sort == 0) {
    params.delete("sort");
  } else {
    params.delete("page");
    params.set("sort", sort.toString());
  }

  location.replace(`${window.location.pathname}?${params}`);
};

const activeCategory = () => {
  const params = new URLSearchParams(window.location.search);
  const filterValue = params.get("filterVal");

  let category = "";
  if (filterValue == "Mujer") category = "Women’s";
  if (filterValue == "Hombre") category = "Men’s";

  const coleccion = document.querySelectorAll("#filter__controls li");
  for (let index = 0; index < coleccion.length; index++) {
    const element = coleccion[index];

    element.textContent == category
      ? element.classList.add("active")
      : element.classList.remove("active");
  }
};

const handleCategory = (e) => {
  const { target } = e;
  const category = target.textContent;

  console.log(category);
  const params = new URLSearchParams(window.location.search);
  params.delete("page");
  params.delete("filter");
  params.delete("filterVal");

  if (category != "All") {
    params.set("filter", "category");
    category == "Women’s" && params.set("filterVal", "Mujer");
    category == "Men’s" && params.set("filterVal", "Hombre");
  }
  location.replace(`${window.location.pathname}?${params}`);
};

const addToCart = async (prodID) => {
  console.log("add: ", prodID);

  if (!currentCart) {
    const res = await fetch("http://localhost:8080/api/carts/", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      body: {}, // body data type must match "Content-Type" header
    });
    currentCart = await res.json();
  }

  if (currentCart) {
    const url = `http://localhost:8080/api/carts/${currentCart}/product/${prodID}`;
    try {
      const res = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        body: {}, // body data type must match "Content-Type" header
      });
      if (!res.ok) throw new Error("UPS! algo salio mal");

      const json = await res.json();
      alert(json.exito);
    } catch (error) {
      alert(error.toString());
    }
  }
};

const goToCheckout = () => {
  if (!currentCart) {
    Swal.fire({
      icon: "info",
      title: "Your Cart is empty",
      text: "Click OK to continue shopping.",
    });
    return;
  }

  const params = new URLSearchParams("cid");
  params.set("cid", currentCart.toString());
  location.assign(`/checkout?${params}`);
};

const signOut = async () => {
  try {
    const res = await fetch("http://localhost:8080/api/sessions/logout", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      body: {}, // body data type must match "Content-Type" header
    });
    console.log(res);
    window.location.replace("/login");
  } catch (error) {
    alert("UPS! ocurrio un error inesperado, reintenta en unos instantes");
  }
};

////////////////////////////////////////////////////////////////////////////
// CODIGO AUTO-EJECUTADO EN WINDOW.ONLOAD
////////////////////////////////////////////////////////////////////////////
document
  .querySelector("#filter__controls")
  .addEventListener("click", handleCategory);

document
  .querySelector("#dropdownMenuButton")
  .addEventListener("change", handleSort);

activeCategory();
activeSort();
