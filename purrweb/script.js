const cookie = document.querySelector(".cookie");
const cookieBtn = document.querySelector(".cookie__btn");
const form = document.querySelector(".form");
const formBtn = document.querySelector(".form__send");
const formInputs = document.querySelectorAll(".form__input");
const formTextarea = document.querySelector(".form__textarea");

if (localStorage.getItem("cookie") !== "true") {
  cookie.style.display = "flex";
}

cookieBtn.addEventListener("click", () => {
  cookie.classList.add("cookie--hidden");
  localStorage.setItem("cookie", true);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

formBtn.addEventListener("click", () => {
  formInputs.forEach((item) => {
    if (item.value.length === 0) {
      item.style.outline = "2px solid red";
    } else {
      item.style.outline = "0";
    }

    if (formTextarea.value.length === 0) {
      formTextarea.style.outline = "2px solid red";
    } else {
      formTextarea.style.outline = "0";
    }
  });
});
