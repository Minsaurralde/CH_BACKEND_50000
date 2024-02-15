const form = document.getElementById("registerForm");

const modalSuccess = () => {
  Swal.fire({
    icon: "success",
    title: "Register success",
    showCancelButton: true,
    confirmButtonText: "Go to Login",
    cancelButtonText: `Register another account`,
  }).then((option) => {
    if (option.isConfirmed) {
      window.location.replace("/login");
    }
  });
};
const modalError = () => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Something went wrong!",
  });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));
  fetch("/api/sessions/register", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => {
      form.reset();
      console.log(result);
      modalSuccess();
    })
    .catch((error) => {
      console.log(error);
      modalError();
    });
});
