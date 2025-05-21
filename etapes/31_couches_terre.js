export default function initCouchesTerre() {
    const section = document.querySelector(".section31");
    if (!section) {
      console.warn("section31 introuvable");
      return;
    }
  
    // Crée le conteneur superposé
    const blocSuperpose = document.createElement("div");
    blocSuperpose.className = "bloc-superpose";
  
    // Crée l'image
    const image = document.createElement("img");
    image.src = "assets/svg/couches_terre.svg";
    image.alt = "couches";
  
    // Crée le texte des couches à gauche
    const textContainer = document.createElement("div");
    textContainer.className = "texte-couches";
  
    const couches = [
      "1. HUMUS",
      "2. GRAVIER ET SABLE",
      "3. ARGILE OU ROCHE",
      "4. EAU",
    ];
  
    couches.forEach((texte) => {
      const p = document.createElement("p");
      p.textContent = texte;
      textContainer.appendChild(p);
    });
  
    // Crée le paragraphe à droite
    const paragrapheDroite = document.createElement("div");
    paragrapheDroite.className = "texte-description-droite";
  
    paragrapheDroite.innerHTML = `
      💧 <strong>L’eau potable en Suisse</strong><br><br>
      La majorité des sources suisses offrent une eau de qualité, naturellement filtrée à travers le sol.<br><br>
      Dans les Alpes et le Jura, l’eau de pluie s’infiltre, traverse plusieurs couches géologiques, puis s’écoule horizontalement le long de roches et d’argiles imperméables. Ce processus de filtration naturelle donne naissance à des eaux de source pures, souvent prêtes à la consommation sans traitement complexe.
    `;
  
    // Assemble les éléments dans le bloc
    blocSuperpose.appendChild(image);
    blocSuperpose.appendChild(textContainer);
    blocSuperpose.appendChild(paragrapheDroite);
  
    // Injecte tout dans la section
    section.appendChild(blocSuperpose);
  }
  