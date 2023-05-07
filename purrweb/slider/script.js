const slider = document.querySelector(".slider");
const slides = slider.querySelectorAll(".slide");
const slide = slider.querySelector(".slide");
const pagination = document.querySelector(".pagination");
const btnNext = document.querySelector(".buttons-next");
const btnPrev = document.querySelector(".buttons-prev");

let firstSlideClone = slides[0].cloneNode(true);
let lastSlideClone = slides[slides.length - 1].cloneNode(true);

slider.insertBefore(lastSlideClone, slides[0]);
slider.appendChild(firstSlideClone);

let pixels = 0;
let slideIndex = 0;
let activeIndex = 0;
let animationTime = 10;
let pixelsTransition = 41;

for (let i = 0; i < slides.length; i++) {
  const button = document.createElement("button");
  button.addEventListener("click", function () {
    setActiveButton(i);

    function animate() {
      const res = i * 820;

      disabledBtns(true);

      if (res > pixels) {
        pixels += pixelsTransition;
        slider.style.right = `${pixels}px`;
      }

      if (res < pixels) {
        pixels -= pixelsTransition;
        slider.style.right = `${pixels}px`;
      }

      if (pixels === res) {
        clearInterval(interval);
        disabledBtns(false);
      }
    }

    const interval = setInterval(animate, animationTime);

    slideIndex = i;
  });

  pagination.appendChild(button);
}

setActiveButton(activeIndex);

function disabledBtns(disabled) {
  btnPrev.disabled = disabled;
  btnNext.disabled = disabled;
  pagination
    .querySelectorAll("button")
    .forEach((item) => (item.disabled = disabled));
}

function setActiveButton(index) {
  const buttons = pagination.querySelectorAll("button");

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("active");
  }

  buttons[index].classList.add("active");

  activeIndex = index;
}

function intervalAnimation(next, slideEnd = "") {
  const res = next ? pixels + 820 : pixels - 820;

  const interval = setInterval(() => {
    next ? (pixels += pixelsTransition) : (pixels -= pixelsTransition);

    slider.style.right = `${pixels}px`;

    disabledBtns(true);

    if (pixels === res) {
      clearInterval(interval);
      disabledBtns(false);

      if (slideEnd === "next") {
        slideIndex = 0;
        pixels = 0;
        slider.style.right = `${pixels}px`;
        setActiveButton(slideIndex);
      }

      if (slideEnd === "prev") {
        slideIndex = slides.length - 1;
        pixels = (slides.length - 1) * 820;
        slider.style.right = `${pixels}px`;
        setActiveButton(slideIndex);
      }
    }
  }, animationTime);
}

btnNext.addEventListener("click", () => {
  slideIndex++;

  if (slideIndex >= slides.length) {
    intervalAnimation(true, "next");

    return slideIndex;
  }

  intervalAnimation(true);

  setActiveButton(slideIndex);
});

btnPrev.addEventListener("click", () => {
  slideIndex--;

  if (slideIndex <= -1) {
    intervalAnimation(false, "prev");

    return slideIndex;
  }

  intervalAnimation(false);

  setActiveButton(slideIndex);
});
