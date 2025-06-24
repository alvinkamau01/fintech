import React, { useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";

function MapView() {
  const mapRef = useRef(null);
  const position = [-1.2921, 36.8219]; // Nairobi coordinates

  useEffect(() => {
    // Load Leaflet from CDN
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
    script.integrity = 'sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==';
    script.crossOrigin = '';
    
    script.onload = () => {
      // Initialize map after Leaflet is loaded
      if (!mapRef.current) {
        const L = window.L;
        const map = L.map('map').setView(position, 13);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Create custom icon
        const icon = L.icon({
          iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        });

        const marker = L.marker(position, { icon }).addTo(map);
        marker.bindPopup("Nairobi, Kenya").openPopup();

        mapRef.current = map;

        // Fix map display issues
        setTimeout(() => {
          map.invalidateSize();
        }, 100);
      }
    };

    document.head.appendChild(script);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      document.head.removeChild(script);
    };
  }, []);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Box
        id="map"
        borderRadius="15px"
        overflow="hidden"
        h="600px"
        boxShadow="0px 3px 6px rgba(0, 0, 0, 0.1)"
      />
    </Box>
  );
}

export default MapView;
