import L from 'leaflet';
import 'leaflet.markercluster';

export default function initMap() {
    // Initialize the map
    const map = L.map('map').setView([46.8182, 8.2275], 8); // Centered on Switzerland

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Create a marker cluster group
    const markers = L.markerClusterGroup({
        maxClusterRadius: 80, // Adjust this value to change cluster size
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        iconCreateFunction: function(cluster) {
            const childCount = cluster.getChildCount();
            const c = ' marker-cluster-';
            if (childCount < 10) {
                return L.divIcon({ 
                    html: '<div><span>' + childCount + '</span></div>', 
                    className: 'marker-cluster marker-cluster-small' + c + 'small', 
                    iconSize: L.point(40, 40) 
                });
            } else if (childCount < 100) {
                return L.divIcon({ 
                    html: '<div><span>' + childCount + '</span></div>', 
                    className: 'marker-cluster marker-cluster-medium' + c + 'medium', 
                    iconSize: L.point(40, 40) 
                });
            } else {
                return L.divIcon({ 
                    html: '<div><span>' + childCount + '</span></div>', 
                    className: 'marker-cluster marker-cluster-large' + c + 'large', 
                    iconSize: L.point(40, 40) 
                });
            }
        }
    });

    // Add the cluster group to the map
    map.addLayer(markers);

    // Load and process the data
    fetch('../src/data/stations_epuration.json')
        .then(response => response.json())
        .then(data => {
            console.log('Loaded data:', data.length, 'stations');
            
            // Create a marker for each station and add to cluster group
            data.forEach(station => {
                const marker = L.marker([station.lat, station.lon], {
                    icon: L.divIcon({
                        className: 'station-marker',
                        html: '<div style="background-color: #0080ff; width: 10px; height: 10px; border-radius: 50%; border: 2px solid white;"></div>'
                    })
                });
                
                marker.bindPopup(`
                    <h4>${station.name}</h4>
                    <p>Latitude: ${station.lat.toFixed(4)}</p>
                    <p>Longitude: ${station.lon.toFixed(4)}</p>
                `);
                
                markers.addLayer(marker);
            });
        })
        .catch(error => {
            console.error('Error loading data:', error);
            throw error; // Re-throw to prevent silent failure
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
        layer: markers,
        initial: false,
        zoom: 12
    });

    // Add search functionality
    searchControl.on('search:locationfound', function(e) {
        map.setView(e.latlng, 12);
    });

    searchControl.addTo(map);

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
        if (e.target instanceof L.Marker) {
            map.setView(e.latlng, 12);
        }
    });

    return map;
}