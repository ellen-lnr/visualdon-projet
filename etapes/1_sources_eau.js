document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.section2');

    fetch('./assets/svg/sources_eau.svg')
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
