export default function initSourcesHover() {
    const container = document.getElementById("sources-eau");
  
    fetch("assets/svg/sources_eau.svg")
      .then(response => response.text())
      .then(svgText => {
        container.innerHTML = svgText;
  
        const bloc1 = container.querySelector("path:first-of-type");
        const bloc2Rects = container.querySelectorAll("rect");
        const bloc3HoverRect = container.querySelector("#bloc3-hover-area");
  
        const texts = container.querySelectorAll("text");
        const [text1, text2, text3] = texts;
  
        function addHover(element, text, hoverText, normalText) {
          element.addEventListener("mouseenter", () => text.textContent = hoverText);
          element.addEventListener("mouseleave", () => text.textContent = normalText);
        }
  
        // Bloc 1 - path + texte
        addHover(bloc1, text1, "40%", "Sources");
        addHover(text1, text1, "40%", "Sources");
  
        // Bloc 2 - rectangles + texte
        bloc2Rects.forEach(rect => {
          if (rect.id !== "bloc3-hover-area") { // éviter bloc3 hover rect ici
            rect.addEventListener("mouseenter", () => text2.textContent = "40%");
            rect.addEventListener("mouseleave", () => text2.textContent = "Nappes phréatiques");
          }
        });
        addHover(text2, text2, "40%", "Nappes phréatiques");
  
        // Bloc 3 - hover rect + texte
        addHover(bloc3HoverRect, text3, "20%", "Lacs");
        addHover(text3, text3, "20%", "Lacs");
      })
      .catch(console.error);
  }
  