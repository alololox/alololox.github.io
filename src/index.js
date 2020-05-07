import "./scss/main.scss";

console.log("👋 Hello there. Thanks for visiting my site. ");

window.addEventListener("load", () => {
  document.addEventListener("mousemove", function (event) {
    document.querySelectorAll(".mountain").forEach((mountain, index) => {
      moveMountains(mountain, event, index);
    });

    moveMountains(document.getElementById("initials"), event, 0, true);
  });

  document.body.classList.add("ready");
  rotatePurposes();
});

const moveMountains = (element, event, index, isInitial = false) => {
  let offset = (index + 1) * 10;
  let ix = Math.ceil(window.innerWidth / offset);
  let iy = Math.ceil(window.innerHeight / offset);
  let px = (event.pageX || event.beta) - ix;
  let py = (event.pageY || event.gamma) - iy;
  let tx = py / iy;
  let ty = -(px / ix);
  let rad = Math.sqrt(Math.pow(tx, 2) + Math.pow(ty, 2));
  let deg = rad * 2;
  element.style.transform = isInitial
    ? "translateY(20%) rotate3d(" + -tx + ", " + -ty + ", 0, " + deg + "deg)"
    : "scale(1.1) translate(" + -ty + "px, " + -tx + "px)";
};

const rotatePurposes = () => {
  let orig = document.querySelector("#what-would-you-say-you-do-here span"),
    item,
    prev;
  setInterval(() => {
    if (!item) {
      item = orig;
    }
    if (prev) {
      prev.classList.remove("active");
    }
    item.classList.add("active");
    prev = item;
    if (item.nextElementSibling) {
      item = item.nextElementSibling;
    } else {
      item = orig;
    }
  }, 2000);
};
