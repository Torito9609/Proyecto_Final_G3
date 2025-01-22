const container = document.querySelector(".container");
const register_btn = document.querySelector(".register-btn");
const login_btn = document.querySelector(".login-btn");

register_btn.addEventListener("click", () => {
  container.classList.add("active");
});

login_btn.addEventListener("click", () => {
  console.log("button has been pressed");
  container.classList.remove("active");
});
