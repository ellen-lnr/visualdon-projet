import { createDropletSVG } from "../etapes/gouttes.js";
import initSourcesHover from "../etapes/1_sources_eau.js";



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

  // Initialise les effets de survol sur la section "sources-eau"
  initSourcesHover();
});

const firstTransitionDistance = 300;
const lastTransitionStart = 860;

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;

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

  } else {
    // Reset quand on dépasse lastTransitionStart (scroll plus bas)
    smallDroplets.style.display = "none";
    smallDroplets.classList.remove("active");
    smallDroplets.querySelectorAll("circle").forEach(c => c.classList.remove("disperse"));

    droplet.style.display = "block";
    droplet.style.opacity = "1";
    droplet.style.transform = "scale(1)";
  }
});
