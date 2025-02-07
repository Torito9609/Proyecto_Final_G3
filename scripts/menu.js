document.addEventListener("DOMContentLoaded", () => {
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const navLinks = document.querySelector(".nav-links");
  const registo_inicio = document.getElementById("btn-login");
  loged_user = JSON.parse(localStorage.getItem("logged_user"));

  if (loged_user != undefined) {
    registo_inicio.classList.add("hide-button");
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
