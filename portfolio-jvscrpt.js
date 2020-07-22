// window.addEventListener("scroll", function () {
//   const parallax = document.querySelector(".parallax");
//   let scrollPosition = window.pageYOffset;

//   parallax.style.transform = "translateY(" + scrollPosition * 0.35 + "px)";
// });

let af;
const numLasers = 30;
const tail = 200;
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const createLasers = (n) => {
  const lasers = [];
  for (let i = 0; i < n; i++) {
    lasers.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      s: Math.random() + 0.2,
    });
  }
  return lasers;
};
const renderLaser = (l) => {
  const grad = ctx.createLinearGradient(l.x, l.y, l.x, l.y + tail);
  grad.addColorStop(0, `hsla(0,100%,100%, 0.7)`);
  grad.addColorStop(1, `hsla(283, 100%, 50%, 0)`);
  ctx.strokeStyle = grad;
  ctx.beginPath();
  ctx.moveTo(l.x, l.y);
  ctx.lineTo(l.x, l.y + tail);
  ctx.stroke();
};
const updateLaser = (l) => {
  l.y -= l.s;
  if (l.y < -tail) {
    l.y = canvas.height;
  }
};
const render = (lasers) => {
  ctx.fillStyle = "hsl(0, 0%, 0%)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let l of lasers) {
    renderLaser(l);
    updateLaser(l);
  }
  af = requestAnimationFrame(() => render(lasers));
};
const init = () => {
  cancelAnimationFrame(af);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render(createLasers(numLasers));
};
window.onresize = init;
init();
