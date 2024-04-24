import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TrimbleMapsControl from './Drawtool';
import { API_URL } from '../config';
import TableComponent from './TableComponent';

/* global TrimbleMapsControl */

function TrimbleMapComponent() {
  const [map, setMap] = useState(null);
  const [draw, setDraw] = useState(null);
  //const [surveyLinesMap] = useState(new Map());
  const [waypoints, setWaypoints] = useState([]);


  const extractWaypoints = (polygonData) => {
    const waypoints = [];
    polygonData.forEach(feature => {
      if (feature.geometry.type === 'Polygon') {
        feature.geometry.coordinates[0].forEach(coord => {
          waypoints.push({ lng: coord[0], lat: coord[1] });
        });
      }
    });
    return waypoints;
  };


  const processPolygonData = async () => {
    const polygonData = draw.getAll().features.filter(feature => feature.geometry.type === 'Polygon');

    if (polygonData.length > 0) {
      const coordinates = polygonData[0].geometry.coordinates[0];
      const newWaypoints = coordinates.map(coord => ({ lng: coord[0], lat: coord[1] }));

      setWaypoints(newWaypoints);

      console.log('Waypoints:', newWaypoints);

      try {
        const response = await axios.post(`${API_URL}/api/process-polygon`, { polygonData });
        // console.log('Server response:', response.data);
      } catch (error) {
        console.error('Error sending polygon data to server:', error);
      }
    }
  };

  useEffect(() => {
    if (!map) {
      axios.get(`${API_URL}/api/config`)
        .then(response => {
          const apiKey = response.data.apiKey;

          import('@trimblemaps/trimblemaps-js').then(TrimbleMaps => {
            TrimbleMaps.setAPIKey(apiKey);

            const newMap = new TrimbleMaps.Map({
              container: "myMap",
              center: new TrimbleMaps.LngLat(-81.84916796332335, 28.14888921518113),
              zoom: 15,
              region: TrimbleMaps.Common.Region.NA3,
              style: TrimbleMaps.Common.Style.SATELLITE,
              language: TrimbleMaps.Common.Language.EN,
              hash: true,
              satelliteProvider: TrimbleMaps.Common.SatelliteProvider.SAT6,
            });

            setMap(newMap);

            if (typeof TrimbleMapsControl !== 'undefined') {
              const newDraw = new TrimbleMapsControl.Draw({
                displayControlsDefault: false,
                controls: {
                  polygon: true,
                  trash: true,
                  save: true,
                  upload: true
                }
              });

              newMap.addControl(newDraw, "top-left");
              setDraw(newDraw);
            }
          }).catch(error => console.error("Failed to load TrimbleMaps", error));
        })
        .catch(error => console.error("Failed to retrieve config", error));
    }
  }, [map]);

  useEffect(() => {
    if (map && draw) {
      const handlePolygonComplete = (e) => {
        const shape = e.features[0];
        if (shape.geometry.type === 'Polygon') {
          processPolygonData();
        }
      };

      map.on('draw.create', handlePolygonComplete);

      return () => {
        map.off('draw.create', handlePolygonComplete);
      };
    }
  }, [map, draw, processPolygonData]);

  return (
    <div style={{ position: 'fixed', top: 0, left: 200, right: 0, bottom: 0 }}>
      <div id="myMap" style={{ width: '100%', height: '100%' }}></div>
      {waypoints.length > 0 && <TableComponent waypoints={waypoints} />}
    </div>
  );
}

export default TrimbleMapComponent;

