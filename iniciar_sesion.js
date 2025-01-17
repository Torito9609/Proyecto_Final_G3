const container = document.querySelector(".container");
const register_btn = document.querySelector(
  ".toggle-panel. .btn .register-btn"
);
const login_btn = document.querySelector(".toggle-panel. .btn .login-btn");

register_btn.addEventListener("click", () => {
  container.classList.add("active");
});

login_btn.addEventListener("click", () => {
  console.log("button has been pressed");
  container.classList.remove("active");
});
