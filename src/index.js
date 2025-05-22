import { createDropletSVG } from "../etapes/1_gouttes.js";
import initSourcesHover from "../etapes/2_sources_eau.js";
import initCouchesTerre from "../etapes/31_couches_terre.js";
import './components/CircularInfo.js'


const section4 = document.querySelector(".section4");
const section32 = document.querySelector(".section32");
const container = document.getElementById("droplet-container");

let svg = createDropletSVG();
container.appendChild(svg);

const droplet = svg.querySelector("#droplet");
const dropletp = svg.querySelector("#droplet path");
const smallDroplets = svg.querySelector("#small-droplets");

// Path caché pour récupérer la position
const hiddenSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
hiddenSVG.setAttribute("width", "760");
hiddenSVG.setAttribute("height", "1205");
hiddenSVG.style.position = "absolute";
hiddenSVG.style.left = "-9999px";
hiddenSVG.style.top = "-9999px";



const firstTransitionDistance = 300;
const lastTransitionStart = 860;
let lastTranslateX = 0;

import initMap from '../etapes/8_carte.js';

window.addEventListener("load", () => {
  droplet.style.opacity = "1";
  droplet.style.display = "block";
  smallDroplets.style.display = "none";

  initSourcesHover();
  initCouchesTerre();

  // Initialize the map
  try {
    const map = initMap();
    console.log("Map initialized successfully");
  } catch (error) {
    console.error("Error initializing map:", error);
  }
});

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const viewportHeight = window.innerHeight;

  const section4Top = section4.offsetTop;
  const section4Height = section4.offsetHeight;
  const isInSection4 = scrollTop + viewportHeight > section4Top && scrollTop < section4Top + section4Height;

  const section32Top = section32.offsetTop;
  const isInSection32 = scrollTop + viewportHeight > section32Top;

  if (scrollTop < firstTransitionDistance) {
    // Rapetissement progressif
    const progress = scrollTop / firstTransitionDistance;
    droplet.style.display = "block";
    droplet.style.opacity = 1 - progress * 0.3;
    droplet.style.transform = `scale(${1 - progress * 0.3})`;

    smallDroplets.style.display = "none";
    smallDroplets.classList.remove("active");
    smallDroplets.querySelectorAll("circle").forEach(c => c.classList.remove("disperse"));

  } else if (scrollTop >= firstTransitionDistance && scrollTop < lastTransitionStart) {
    droplet.style.opacity = "0";
    droplet.style.display = "none";

    smallDroplets.style.display = "block";
    smallDroplets.classList.add("active");

    setTimeout(() => {
      smallDroplets.querySelectorAll("circle").forEach((c) => {
        c.classList.add("disperse");
      });
    }, 50);

  } else if (isInSection4) {
    const scrollInSection4 = scrollTop - section4Top;

    // Ralentissement pour suivre le path
    const slowFactor = 4;
    const usableHeight = section4Height;
    const progressOnPath = Math.min((scrollInSection4 / slowFactor) / usableHeight, 1);

    // Position sur le path
    const point = motionPath.getPointAtLength(pathLength * progressOnPath);

    // Décalage horizontal progressif (de 0 à 200 px)
    const maxXShift = 200;
    const xShift = maxXShift * progressOnPath;

    const scale = 0.7;
    const verticalCompensation = 1000 * (1 - scale);

    droplet.style.display = "block";
    droplet.style.opacity = "1";
    droplet.style.transition = "transform 0.1s linear";

    droplet.style.transform = `translate(${point.x + xShift}px, ${point.y - verticalCompensation}px) scale(${scale})`;
    droplet.style.transformOrigin = "center center";

    dropletp.style.display = "block";
    dropletp.style.opacity = "1";

  } else if (isInSection32) {
   
    const maxTranslateX = -270;
    const progress = Math.min((scrollTop + viewportHeight - section32Top) / viewportHeight, 1);
    const translateX = maxTranslateX * progress;
    lastTranslateX = translateX;

    const maxYOffset = 250;
    const yOffset = maxYOffset * progress;

    const startColor = [2, 83, 110];
    const endColor = [0, 191, 255];
    const currentColor = startColor.map((start, i) =>
      Math.round(start + (endColor[i] - start) * progress)
    );
    const colorString = `rgb(${currentColor[0]}, ${currentColor[1]}, ${currentColor[2]})`;

    dropletp.style.display = "block";
    dropletp.style.opacity = "1";
    droplet.style.transform = `translateX(${translateX}px, ${-yOffset}px)`;
    dropletp.setAttribute("fill", colorString);

  } else {
    // Reset goutte par défaut
    smallDroplets.style.display = "none";
    smallDroplets.classList.remove("active");
    smallDroplets.querySelectorAll("circle").forEach(c => c.classList.remove("disperse"));

    droplet.style.display = "block";
    droplet.style.opacity = "1";
    droplet.style.transform = "scale(1)";
  }
});
