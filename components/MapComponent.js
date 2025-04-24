import { useEffect } from 'react';

const MapComponent = ({ projects }) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const L = require('leaflet');

      // Fix for missing marker icons in Leaflet
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      const map = L.map('map').setView(
        [projects[0]?.coordinates?.lat || 17.3850, projects[0]?.coordinates?.lng || 78.4867],
        12
      );

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      projects.forEach((project) => {
        if (project.coordinates) {
          const marker = L.marker([project.coordinates.lat, project.coordinates.lng]).addTo(map);
          marker.bindPopup(`
            <b>${project.name}</b><br/>
            Price: ${project.priceRange}<br/>
            Builder: ${project.builder}
          `);
        }
      });

      return () => {
        map.remove();
      };
    }
  }, [projects]);

  return <div id="map" className="h-[500px] w-full rounded-md mt-8" />;
};

export default MapComponent;
