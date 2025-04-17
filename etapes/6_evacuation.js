// export function initCarteStations() {
//     // Initialisation de la carte
//     const map = L.map('map').setView([46.8, 8.3], 8); // Centre sur la Suisse
  
//     // Ajout d’un fond de carte
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; OpenStreetMap contributors'
//     }).addTo(map);
  
//     // Charger les données JSON
//     fetch('data/stations_epuration_visualisation.json')
//       .then(response => response.json())
//       .then(data => {
//         data.forEach(station => {
//           const marker = L.marker([station.latitude, station.longitude]).addTo(map);
//           marker.bindPopup(`<strong>${station.name}</strong><br>ID: ${station.id}`);
//         });
//       })
//       .catch(error => console.error('Erreur chargement des stations :', error));
//   }
  