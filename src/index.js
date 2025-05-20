import { createDropletSVG } from "../etapes/gouttes.js";



const container = document.getElementById("droplet-container");
const moveDistance = 300;

let svg = createDropletSVG();
container.appendChild(svg);

const droplet = svg.querySelector("#droplet");
const smallDroplets = svg.querySelector("#small-droplets");

// Initial setup on page load
window.addEventListener("load", () => {
  droplet.style.opacity = "1";
  droplet.style.display = "block";
  smallDroplets.style.display = "none";
  smallDroplets.classList.remove("active");
  smallDroplets.querySelectorAll("circle").forEach(c => {
    c.classList.remove("disperse");
  });
});

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const progress = Math.min(scrollTop / moveDistance, 1);

  if (progress < 1) {
    droplet.style.display = "block";
    droplet.style.opacity = 1 - progress * 0.3;
    const scale = 1 - progress * 0.3;
    droplet.style.transform = `scale(${scale})`;

    smallDroplets.style.display = "none";
    smallDroplets.classList.remove("active");
    smallDroplets.querySelectorAll("circle").forEach(c => c.classList.remove("disperse"));
  } else {
    droplet.style.opacity = "0";
    droplet.style.display = "none";

    smallDroplets.style.display = "block";
    smallDroplets.classList.add("active");

    // Lance la dispersion après un court délai
    setTimeout(() => {
      smallDroplets.querySelectorAll("circle").forEach((c) => {
        c.classList.add("disperse");
      });
    }, 50);
  }
});
