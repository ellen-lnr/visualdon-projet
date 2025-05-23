export const fullDropletPath = `
  M 380 0
  L 380 180
  C 380 200, 400 220, 420 260
  L 420 400
  C 420 430, 370 430, 370 460
  L 370 600
  L 380 1700
`; // simplifié pour illustration

export function createMotionPathSVG() {
  const hiddenSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  hiddenSVG.setAttribute("width", "800");
  hiddenSVG.setAttribute("height", "1800");
  hiddenSVG.style.position = "absolute";
  hiddenSVG.style.left = "-9999px";
  hiddenSVG.style.top = "-9999px";

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("id", "motionPath");
  path.setAttribute("d", fullDropletPath);
  path.setAttribute("fill", "none");

  hiddenSVG.appendChild(path);
  document.body.appendChild(hiddenSVG);

  return path;
}
