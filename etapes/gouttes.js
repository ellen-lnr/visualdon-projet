export function createDropletSVG() {
    const svgNS = "http://www.w3.org/2000/svg";
  
    // Création du SVG
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("id", "droplet-svg");
    svg.setAttribute("width", "250");
    svg.setAttribute("height", "250");
    svg.setAttribute("viewBox", "0 0 150 300");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
  
    // Grosse goutte
    const dropletGroup = document.createElementNS(svgNS, "g");
    dropletGroup.setAttribute("id", "droplet");
    dropletGroup.style.transformOrigin = "center center";
  
    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", "M75 0C60 20 20 70 20 115C20 150 45 175 75 175C105 175 130 150 130 115C130 70 90 20 75 0Z");
    path.setAttribute("fill", "#35B2E0");
  
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", "100");
    circle.setAttribute("cy", "75");
    circle.setAttribute("r", "10");
    circle.setAttribute("fill", "#6DD5F7");
    circle.setAttribute("fill-opacity", "0.4");
  
    dropletGroup.appendChild(path);
    dropletGroup.appendChild(circle);
    svg.appendChild(dropletGroup);
  
    // Petites gouttes
    const smallGroup = document.createElementNS(svgNS, "g");
    smallGroup.setAttribute("id", "small-droplets");
    smallGroup.style.display = "none";
  
    const small1 = document.createElementNS(svgNS, "circle");
    small1.setAttribute("class", "small1");
    small1.setAttribute("cx", "45");
    small1.setAttribute("cy", "130");
    small1.setAttribute("r", "12");
    small1.setAttribute("fill", "#35B2E0");
  
    const small2 = document.createElementNS(svgNS, "circle");
    small2.setAttribute("class", "small2");
    small2.setAttribute("cx", "75");
    small2.setAttribute("cy", "150");
    small2.setAttribute("r", "10");
    small2.setAttribute("fill", "#35B2E0");
  
    const small3 = document.createElementNS(svgNS, "circle");
    small3.setAttribute("class", "small3");
    small3.setAttribute("cx", "105");
    small3.setAttribute("cy", "130");
    small3.setAttribute("r", "8");
    small3.setAttribute("fill", "#35B2E0");
  
    smallGroup.appendChild(small1);
    smallGroup.appendChild(small2);
    smallGroup.appendChild(small3);
    svg.appendChild(smallGroup);
  
    return svg;
  }
  