const slider = document.querySelector(".slider");

let isClicked = false;
let initX = null;
let isAdd = true;
let addTr = 0;

const sliderClick = (e) => {
  let offset = getComputedStyle(slider).transform.match(/\d+/gi);
  if (offset) offset = +offset[4];
  initX = e.pageX + offset;
  isClicked = true;
  addTr = 0;
};

const sliderRelease = (e) => {
  isClicked = false;
  isAdd = true;
};

const sliderMove = (e) => {
  if (isClicked) {
    let pos = e.pageX - initX;
    let sliderWidth = (-pos / (slider.clientWidth * 4)) * 100;
    if (sliderWidth > 95 && isAdd) {
      isAdd = false;
      slider.appendChild(slider.firstElementChild);
      addTr = slider.offsetWidth;
    } else if (sliderWidth < 5 && isAdd) {
      isAdd = false;
      slider.prepend(slider.lastElementChild);
      addTr = -slider.offsetWidth;
    }
    slider.style.transform = `translateX(${pos + addTr}px)`;
  }
};

slider.addEventListener("mousedown", sliderClick);
document.addEventListener("mouseup", sliderRelease);
slider.addEventListener("mousemove", sliderMove);
