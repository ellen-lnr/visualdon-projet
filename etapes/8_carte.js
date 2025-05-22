export default function initMap() {
    // Initialize the map
    const map = L.map('map').setView([46.8182, 8.2275], 8); // Centered on Switzerland

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Load and process the data
    fetch('../src/data/stations_epuration.json')
        .then(response => response.json())
        .then(data => {
            // Create a marker for each station
            data.forEach(station => {
                const marker = L.circleMarker([station.lat, station.lon], {
                    radius: 8,
                    fillColor: '#0080ff',
                    color: '#0055aa',
                    weight: 2,
                    opacity: 1,
                    fillOpacity: 0.8
                }).addTo(map);

                // Add popup with station information
                marker.bindPopup(`<div class="station-popup">
                    <h3>${station.name}</h3>
                    <p>Latitude: ${station.lat.toFixed(4)}</p>
                    <p>Longitude: ${station.lon.toFixed(4)}</p>
                </div>`);
            });

            // Add zoom controls
            map.addControl(new L.Control.Zoom({
                position: 'topright'
            }));

            // Add scale control
            map.addControl(new L.Control.Scale({
                position: 'bottomleft'
            }));

            // Add a legend
            const legend = L.control({position: 'bottomright'});
            legend.onAdd = function (map) {
                const div = L.DomUtil.create('div', 'info legend');
                div.innerHTML = `
                    <h4>Stations d'épuration</h4>
                    <div style="background-color: #0080ff; width: 20px; height: 20px; border-radius: 50%; margin: 5px; display: inline-block;"></div>
                    <span style="margin-left: 10px;">Station d'épuration</span>
                `;
                return div;
            };
            legend.addTo(map);

            // Add a custom attribution
            map.attributionControl.setPrefix('');
            map.attributionControl.addAttribution('Données: Stations d\'épuration en Suisse');
        })
        .catch(error => console.error('Error loading data:', error));

    // Add a mouseover effect to markers
    map.on('mouseover', function(e) {
        if (e.target instanceof L.CircleMarker) {
            e.target.setStyle({
                fillColor: '#ff0000',
                color: '#aa0000'
            });
        }
    });

    // Add a mouseout effect to markers
    map.on('mouseout', function(e) {
        if (e.target instanceof L.CircleMarker) {
            e.target.setStyle({
                fillColor: '#0080ff',
                color: '#0055aa'
            });
        }
    });

    // Add a custom style to the map container
    map.getContainer().style.backgroundColor = '#0F142A';
    map.getContainer().style.borderRadius = '10px';

    // Add a hover effect to the map container
    map.getContainer().addEventListener('mouseover', function() {
        this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
    });

    map.getContainer().addEventListener('mouseout', function() {
        this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });

    // Add a click handler to zoom to clicked marker
    map.on('click', function(e) {
        if (e.target instanceof L.CircleMarker) {
            map.setView(e.latlng, 12);
        }
    });

    // Add a keyboard shortcut to zoom out (Ctrl + Z)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'z') {
            map.setZoom(map.getZoom() - 1);
        }
    });

    // Add a keyboard shortcut to zoom in (Ctrl + X)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'x') {
            map.setZoom(map.getZoom() + 1);
        }
    });

    // Add a keyboard shortcut to center the map (Ctrl + C)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'c') {
            map.setView([46.8182, 8.2275], 8);
        }
    });

    // Add a search box for stations
    const searchControl = new L.Control.Search({
        position: 'topleft',
        layer: L.layerGroup(),
        initial: false,
        zoom: 12
    });

    // Add search functionality
    searchControl.on('search:locationfound', function(e) {
        map.setView(e.latlng, 12);
    });

    searchControl.addTo(map);

    return map;
}