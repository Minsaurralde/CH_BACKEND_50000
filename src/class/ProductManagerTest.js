import ProductManager from "./ProductManager.js";

// TESTING
const TestGET = async () => {
  instancia1.getProducts().then((value) => {
    console.log("getProducts responde: ", value);
  });
};
const TestADD = async () => {
  await instancia1.addProduct(
    "producto prueba",
    "Este es un producto prueba",
    200,
    "Sin imagen",
    "abc123",
    25
  );
};
const TestGETID = async () => {
  instancia1.getProductById(4).then((value) => {
    value && console.log("getProductById responde: ", value);
  });
};
const TestUPDATE = async () => {
  const objeto = {
    id: 4,
    title: "update prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25,
  };

  await instancia1.updateProduct(objeto);
  instancia1.getProducts().then((value) => {
    value && console.log("validar que se haya updateado: ", value);
  });
};
const TestDELETE = async () => {
  await instancia1.deleteProduct(4);
  instancia1.getProducts().then((value) => {
    value && console.log("validar que se haya borrado: ", value);
  });
};

// 1 - Se creará una instancia de la clase “ProductManager”
const instancia1 = new ProductManager("prodmanager.txt");
const runAsyncTest = async () => {
  // 2 - Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
  await TestGET();
  // 3 - Se llamará al método “addProduct”. El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
  await TestADD();
  // 4 - Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
  await TestGET();
  // 5 - Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo
  await TestGETID();
  // 6 - Se llamará al método “updateProduct” y se cambiara un campo. se evaluará que se haya actualizado sin eliminar el id.
  await TestUPDATE();
  // 7 -Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir.
  await TestDELETE();
};

runAsyncTest();
