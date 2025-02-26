document.addEventListener("DOMContentLoaded", () => {
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const navLinks = document.querySelector(".nav-links");
  const registo_inicio = document.getElementById("btn-login");
  const token = localStorage.getItem("authToken");
  const logo = document.querySelector(".logo_nav");

  logo.addEventListener("click", () => {
    window.location.href = "../html/inicio.html";
  });

  if (token) {
    const decodedToken = jwt_decode(token);
    console.log("Token decodificado: ", decodedToken);
    const nombreUsuario = decodedToken.nombre;
    console.log(nombreUsuario);

    let containerLogIn = document.getElementById("login-section");

    const userNameContainer = document.createElement("div");
    userNameContainer.classList.add("user-name-container");
    const userIcon = document.createElement("i");
    userIcon.classList.add("bx");
    userIcon.classList.add("bxs-user");
    const userName = document.createElement("p");
    userName.textContent = nombreUsuario;

    userNameContainer.appendChild(userIcon);
    userNameContainer.appendChild(userName);
    containerLogIn.appendChild(userNameContainer);

    // Creamos el menú desplegable (que estará oculto por defecto)
    const dropdownMenu = document.createElement("div");
    dropdownMenu.classList.add("dropdown-menu");
    dropdownMenu.style.display = "none";

    // Creamos la opción de "Cerrar sesión"
    const logoutOption = document.createElement("p");
    logoutOption.classList.add("dropdown-item");
    logoutOption.textContent = "Cerrar sesión";

    // Añadimos el evento de clic para cerrar sesión
    logoutOption.addEventListener("click", () => {
      // Eliminar el token del almacenamiento local
      localStorage.removeItem("authToken");
      window.location.href = "../html/inicio.html";
    });
    dropdownMenu.appendChild(logoutOption);
    // Añadimos el menú desplegable al contenedor del nombre de usuario
    userNameContainer.appendChild(dropdownMenu);
    userNameContainer.addEventListener("click", () => {
      // Alternamos la visibilidad del menú desplegable
      if (dropdownMenu.style.display === "none") {
        dropdownMenu.style.display = "block";
      } else {
        dropdownMenu.style.display = "none";
      }
    });
  } else {
    let containerLogIn = document.getElementById("login-section");
    containerLogIn.innerHTML = `          
    <a href="/html/inciar_sesiom.html">
     <button id="btn-login">Registrarse / Iniciar Sesión</button>
    </a>`;
  }

  // Alternar el menú al hacer clic en el botón del menú hamburguesa
  hamburgerMenu.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevenir que el clic en el menú  cierre el menú
    navLinks.classList.toggle("active");
  });

  // Para cerrar el menu cuando se hace clic en cualquier parte d ela pantalla
  document.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });

  // Cerrar el menú si se hace clic en uno de los enlaces dentro del menú
  navLinks.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      navLinks.classList.remove("active");
    }
  });
});
