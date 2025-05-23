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
    if (!Math.clamp) {
      Math.clamp = function(x, min, max) {
        return Math.max(min, Math.min(max, x));
      };
    }

    const map = initMap();
    console.log("Map initialized successfully");
  } catch (error) {
    console.error("Error initializing map:", error);
  }
});

// Add scroll event listener for all effects
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const viewportHeight = window.innerHeight;

  // Check if we're in section8 (egouts)
  const section8 = document.querySelector('.section8');
  const isInSection8 = scrollTop + viewportHeight > section8.offsetTop && 
                      scrollTop < section8.offsetTop + section8.offsetHeight;

  if (isInSection8) {
    const svgElement = section8.querySelector('img');
    const svgRect = svgElement.getBoundingClientRect();
    const dropletRect = droplet.getBoundingClientRect();

    const svgCenterX = svgRect.left + svgRect.width / 2;
    const svgCenterY = svgRect.top + svgRect.height / 2;
    const distance = Math.sqrt(
      Math.pow(svgCenterX - dropletRect.left - dropletRect.width / 2, 2) +
      Math.pow(svgCenterY - dropletRect.top - dropletRect.height / 2, 2)
    );

    const maxDistance = 100;
    const opacity = Math.clamp((distance / maxDistance), 0.1, 0.5);  // Adjusted min/max opacity values
    droplet.style.opacity = opacity;
    droplet.style.transition = 'opacity 0.3s ease';
  } else {
    droplet.style.opacity = "1";
    droplet.style.transition = 'opacity 0.3s ease';
  }

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

document.addEventListener('DOMContentLoaded', () => {
  // Crée le conteneur
  const container = document.createElement('div');
  container.className = 'evaporation-container';

  // Crée le bouton
  const button = document.createElement('button');
  button.id = 'scrollTopBtn';
  button.className = 'cloud-button';
  button.innerHTML = '☁️⬆️ <span>Évaporation</span>';

  // Ajoute le bouton dans le conteneur
  container.appendChild(button);

  // Ajoute le conteneur à la fin du body
  document.body.appendChild(container);

  // Action du bouton
  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
