const cards = document.querySelectorAll(".card__inner");

cards.forEach((card) => {
  card.addEventListener("click", function () {
    card.classList.toggle("is-flipped");
  });
});
