const modalSuccess = (ticket) => {
  const { code, amount, noStockProducts } = ticket;
  const message = `Your purchase was register with number: ${code}. Your final Price was ${amount}`;
  if (noStockProducts) {
    message = `Your purchase was register with number: ${code}. Your final Price was ${amount}. Some items are not in stock`;
  }
  Swal.fire({
    icon: "success",
    title: "Purchase success",
    text: message,
    confirmButtonText: "Ok",
  }).then(() => {
    location.reload();
  });
};
const modalError = (msj) => {
  Swal.fire({
    icon: "error",
    title: "Oops... Something went wrong!",
    text: msj,
  });
};

const handlePurchase = async (event) => {
  event.preventDefault();
  const params = new URLSearchParams(window.location.search);
  const currentCart = params.get("cid");

  try {
    const url = `http://localhost:8080/api/carts/${currentCart}/purchase`;
    const res = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      body: {}, // body data type must match "Content-Type" header
    });
    if (!res.ok) throw new Error("UPS! algo salio mal");
    const json = await res.json();
    modalSuccess(json.ticket);
  } catch (error) {
    modalError("unexpected error");
  }
};
