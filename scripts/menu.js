document.addEventListener("DOMContentLoaded", () => {
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const navLinks = document.querySelector(".nav-links");
  const registo_inicio = document.getElementById("btn-login");
  loged_user = JSON.parse(localStorage.getItem("logged_user"));

  if (loged_user != undefined) {
    //registo_inicio.classList.add("hide-button");
   // const element = document.getElementById("btn-login");
   // element.remove();

    let containerLogIn = document.getElementById("login-section");
    let userData = JSON.parse(localStorage.getItem("logged_user"));

    const userNameContainer = document.createElement('div');
    userNameContainer.classList.add("user-name-container");
    const userIcon = document.createElement('i');
    userIcon.classList.add("bx");
    userIcon.classList.add("bxs-user");
    const userName = document.createElement('p');
    userName.textContent = userData.name;

    userNameContainer.appendChild(userIcon);
    userNameContainer.appendChild(userName);
    containerLogIn.appendChild(userNameContainer);
  }else {
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
