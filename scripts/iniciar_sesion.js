//import Swal from "sweetalert2";
const container = document.querySelector(".container");
const register_btn_toggle = document.querySelector(".register-btn-toggle");
const login_btn_toggle = document.querySelector(".login-btn-toggle");

document
  .getElementById("registerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const password_confirm = document
      .getElementById("password_confirm")
      .value.trim();

    const namePattern = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    const phonePattern = /^\d{7,15}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    let users = JSON.parse(localStorage.getItem("user")) || [];

    if (!namePattern.test(name)) {
      Swal.fire({
        icon: "error",
        title: "Nombre no válido.",
        text: "El nombre debería contener solo letras y espacios.",
        background: "#243d74",
        color: "#dbc078",
        customClass: { confirmButton: "btn-alert" },
      });
      console.log("Error: Nombre inválido ->", name);
      return;
    }
    if (!phonePattern.test(phone)) {
      Swal.fire({
        icon: "error",
        title: "Teléfono no válido",
        text: "El teléfono debe contener entre 7 y 15 dígitos numéricos.",
        background: "#243d74",
        color: "#dbc078",
        customClass: { confirmButton: "btn-alert" },
      });
      console.log("Error: Teléfono inválido ->", phone);
      return;
    }
    if (!emailPattern.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Correo no válido",
        text: "Por favor ingresa un correo válido: ejemplo@correo.com",
        background: "#243d74",
        color: "#dbc078",
        customClass: { confirmButton: "btn-alert" },
      });
      console.log("Error: Correo inválido ->", email);
      return;
    }
    if (!passwordPattern.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Contraseña no válida",
        text: "La contraseña debe tener al menos 8 carácteres (1 letra mayúscula, 1 letra minúscula, 1 número y un carácter epecial.)",
        background: "#243d74",
        color: "#dbc078",
        customClass: { confirmButton: "btn-alert" },
      });
      console.log("Error: Contraseña inválida ->", password);
      return;
    }

    if (password != password_confirm) {
      Swal.fire({
        icon: "warning",
        title: "Las contraseñas no coinciden",
        text: "Por favor verifica que ambas contraseñas son iguales.",
        background: "#243d74",
        color: "#dbc078",
        customClass: { confirmButton: "btn-alert" },
      });
      return;
    }

    const userExists = users.some(
      (user) => user.email === email || user.phone === phone
    );
    if (userExists) {
      Swal.fire({
        icon: "warning",
        title: "Correo o teléfono ya existentes",
        text: "Por favor intenta registrarte con otro correo o número de teléfono",
        background: "#243d74",
        color: "#dbc078",
        customClass: { confirmButton: "btn-alert" },
      });
      console.log(
        "Error: Usuario duplicado -> Email:",
        email,
        "Teléfono:",
        phone
      );
      return;
    }

    let newUser = { name, phone, email, password };
    users.push(newUser);
    localStorage.setItem("user", JSON.stringify(users));

    Swal.fire({
      icon: "succes",
      title: "¡Registro existoso!",
      text: "Ahora intenta iniciar sesión con tu correo y contraseña.",
      background: "#243d74",
      color: "#dbc078",
      customClass: { confirmButton: "btn-alert" },
    });
    console.log("Usuario registrado con éxito ->", newUser);
    this.reset();
  });

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email_login").value.trim();
    const password = document.getElementById("password_login").value.trim();

    let users = JSON.parse(localStorage.getItem("user")) || [];

    const userCorrect = users.find(
      (user) => user.email === email && user.password === password
    );
    if (userCorrect) {
      console.log("Es correcto! Iniciando sesión");
      this.reset();
      localStorage.setItem("logged_user", JSON.stringify(userCorrect));
      window.location.href = "/html/inicio.html";
    } else {
      Swal.fire({
        icon: "warning",
        title: "Usuario y/o contraseña inválidos",
        text: "Por favor intenta de nuevo.",
        background: "#243d74",
        color: "#dbc078",
        customClass: { confirmButton: "btn-alert" },
      });
      this.reset();
      return;
    }
  });

register_btn_toggle.addEventListener("click", () => {
  container.classList.add("active");
});

login_btn_toggle.addEventListener("click", () => {
  console.log("button has been pressed");
  container.classList.remove("active");
});
