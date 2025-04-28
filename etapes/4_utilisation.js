document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.section5');

    fetch('./assets/svg/utilisation_eau.svg')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur de chargement du fichier SVG');
            }
            return response.text();
        })
        .then(svgContent => {
            container.innerHTML = svgContent;
        })
        .catch(error => {
            console.error('Erreur de chargement SVG :', error);
        });
});a
