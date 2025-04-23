import { useEffect } from 'react';
import dynamic from 'next/dynamic';

// This component will only be rendered on the client side
const MapComponent = ({ projects }) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const L = require('leaflet');
      
      // Initialize the map
      const map = L.map('map').setView(
        [projects[0]?.coordinates?.lat || 17.3850, projects[0]?.coordinates?.lng || 78.4867], 
        12
      );

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // Add markers for each project
      projects.forEach(project => {
        if (project.coordinates) {
          const marker = L.marker([project.coordinates.lat, project.coordinates.lng]).addTo(map);
          marker.bindPopup(`
            <b>${project.name}</b><br>
            Price: ${project.priceRange}<br>
            Builder: ${project.builder}
          `);
        }
      });

      return () => {
        map.remove();
      };
    }
  }, [projects]);

  return <div id="map" className="h-full w-full rounded-md"></div>;
};

export default MapComponent;