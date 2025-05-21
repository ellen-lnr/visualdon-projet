import { createDropletSVG } from "../etapes/1_gouttes.js";
import initSourcesHover from "../etapes/2_sources_eau.js";
import initCouchesTerre from "../etapes/31_couches_terre.js";


const section32 = document.querySelector(".section32");
const container = document.getElementById("droplet-container");


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

  // Initialise les effets de survol sur la section "sources-eau"
  initSourcesHover();

  initCouchesTerre();
});

const firstTransitionDistance = 300;
const lastTransitionStart = 860;

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const viewportHeight = window.innerHeight;

  const section32Top = section32.offsetTop;
  const isInSection32 = scrollTop + viewportHeight > section32Top;

  if (scrollTop < firstTransitionDistance) {
    // Première transition (grosse goutte visible)
    const progress = scrollTop / firstTransitionDistance;
    droplet.style.display = "block";
    droplet.style.opacity = 1 - progress * 0.3;
    droplet.style.transform = `scale(${1 - progress * 0.3})`;

    smallDroplets.style.display = "none";
    smallDroplets.classList.remove("active");
    smallDroplets.querySelectorAll("circle").forEach(c => c.classList.remove("disperse"));

  } else if (scrollTop >= firstTransitionDistance && scrollTop < lastTransitionStart) {
    // Petites gouttes visibles et dispersées
    droplet.style.opacity = "0";
    droplet.style.display = "none";

    smallDroplets.style.display = "block";
    smallDroplets.classList.add("active");

    setTimeout(() => {
      smallDroplets.querySelectorAll("circle").forEach((c) => {
        c.classList.add("disperse");
      });
    }, 50);

  } else if (isInSection32) {
    // Déviation vers la gauche dans .section32
    const maxTranslateX = -270;
    const progress = Math.min((scrollTop + viewportHeight - section32Top) / viewportHeight, 1);
    const translateX = maxTranslateX * progress;

    droplet.style.display = "block";
    droplet.style.opacity = "1";
    droplet.style.transform = `translateX(${translateX}px)`;

    smallDroplets.style.display = "none";
    smallDroplets.classList.remove("active");
    smallDroplets.querySelectorAll("circle").forEach(c => c.classList.remove("disperse"));

  } else {
    // Reset en dehors de section32
    smallDroplets.style.display = "none";
    smallDroplets.classList.remove("active");
    smallDroplets.querySelectorAll("circle").forEach(c => c.classList.remove("disperse"));

    droplet.style.display = "block";
    droplet.style.opacity = "1";
    droplet.style.transform = "scale(1)";
  }
});
