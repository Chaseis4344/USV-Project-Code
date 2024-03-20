import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TrimbleMapsControl from './Drawtool';
/* global TrimbleMapsControl */

function TrimbleMapComponent() {
    const [map, setMap] = useState(null);
    const [draw, setDraw] = useState(null);
    const [surveyLinesMap] = useState(new Map());

    const processPolygonData = async () => {
        const polygonData = draw.getAll().features.filter(feature => feature.geometry.type === 'Polygon');
        if (polygonData.length > 0) {
            try {
                // Update the URL to point to your local Flask server
                const response = await axios.post('http://127.0.0.1:5000/api/process-polygon', { polygonData });

                // Assuming 'drawSurveyLines' is a function that you will define to handle the response
                // and draw the survey lines on the map
                // drawSurveyLines(response.data);

            } catch (error) {
                console.error('Error sending polygon data to server:', error);
            }
        }
    };

    useEffect(() => {
        if (!map) {
            import('@trimblemaps/trimblemaps-js').then(TrimbleMaps => {
                TrimbleMaps.setAPIKey("E006198D3D2D034197622ADE3E8DF111");

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

            const handlePolygonUpdate = (e) => {
                processPolygonData();
            };

            map.on('draw.create', handlePolygonComplete);
            map.on('draw.update', handlePolygonUpdate);

            return () => {
                map.off('draw.create', handlePolygonComplete);
                map.off('draw.update', handlePolygonUpdate);
            };
        }
    }, [map, draw, processPolygonData]);

    return (
        <div style={{ position: 'fixed', top: 0, left: 200, right: 0, bottom: 0 }}>
            <div id="myMap" style={{ width: '100%', height: '100%' }}></div>
        </div>
    );
}

export default TrimbleMapComponent;

