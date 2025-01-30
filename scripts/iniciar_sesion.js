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

    const namePattern = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    const phonePattern = /^\d{7,15}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    let users = JSON.parse(localStorage.getItem("user")) || [];

    if (!namePattern.test(name)) {
      alert("❌ El nombre solo debe contener letras y espacios.");
      console.log("Error: Nombre inválido ->", name);
      return;
    }
    if (!phonePattern.test(phone)) {
      alert("❌ El teléfono debe contener entre 7 y 15 dígitos numéricos.");
      console.log("Error: Teléfono inválido ->", phone);
      return;
    }
    if (!emailPattern.test(email)) {
      alert("❌ Por favor, ingresa un correo válido.");
      console.log("Error: Correo inválido ->", email);
      return;
    }
    if (!passwordPattern.test(password)) {
      alert(
        "❌ La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, una minúscula, un número y un carácter especial."
      );
      console.log("Error: Contraseña inválida ->", password);
      return;
    }

    const userExists = users.some(
      (user) => user.email === email || user.phone === phone
    );
    if (userExists) {
      alert("⚠️ El correo o teléfono ya están registrados. Usa otro.");
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

    alert("✅ Registro exitoso");
    console.log("Usuario registrado con éxito ->", newUser);
    this.reset();
  });

register_btn.addEventListener("click", () => {
  container.classList.add("active");
});

login_btn.addEventListener("click", () => {
  console.log("button has been pressed");
  container.classList.remove("active");
});
