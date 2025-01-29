const container = document.querySelector(".container");
const register_btn = document.querySelector(".register-btn");
const login_btn = document.querySelector(".login-btn");

document
  .getElementById("registerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    let usuario = {
      name: name,
      phone: phone,
      email: email,
      password: password,
    };
    let users = JSON.parse(localStorage.getItem("user")) || [];

    const namePattern = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    if (!namePattern.test(name)) {
      alert("El nombre solo debe contener letras y espacios.");
      return;
    }

    const phonePattern = /^\d{7,15}$/;
    if (!phonePattern.test(phone)) {
      alert("El teléfono debe contener entre 7 y 15 dígitos numéricos.");
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      alert("Por favor, ingresa un correo válido.");
      return;
    }

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordPattern.test(password)) {
      alert(
        "La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, una minúscula, un número y un carácter especial."
      );
      return;
    }

    alert("Formulario enviado exitosamente");
    users.push(usuario);
    console.log(users);
    localStorage.setItem("user", JSON.stringify(users));
    //location.reload();
    this.reset();
  });

register_btn.addEventListener("click", () => {
  container.classList.add("active");
});

login_btn.addEventListener("click", () => {
  console.log("button has been pressed");
  container.classList.remove("active");
});
