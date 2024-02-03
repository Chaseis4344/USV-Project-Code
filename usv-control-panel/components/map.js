'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DownloadButton from './DownloadButton';

function TrimbleMapComponent() {
    const [map, setMap] = useState(null);
    const [draw, setDraw] = useState(null);

    useEffect(() => {
        if (!map) {
            import('@trimblemaps/trimblemaps-js').then(TrimbleMaps => {
                TrimbleMaps.setAPIKey("A0BE83B6F0F79743934A805868522888");

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
                            trash: true
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
                    // Call the function to process the polygon data when a polygon is completed
                    processPolygonData();
                }
            };
    
            map.on('draw.create', handlePolygonComplete);
    
            return () => {
                map.off('draw.create', handlePolygonComplete);
            };
        }
    }, [map, draw]);
    


    const processPolygonData = async () => {
        const polygonData = draw.getAll().features.filter(feature => feature.geometry.type === 'Polygon');
        if (polygonData.length > 0) {
            try {
                // Update the URL to point to your local Flask server
                const response = await axios.post('http://127.0.0.1:5000/api/process-polygon', { polygonData });
    
                // Assuming 'drawSurveyLines' is a function that you will define to handle the response
                // and draw the survey lines on the map
                drawSurveyLines(response.data);
    
            } catch (error) {
                console.error('Error sending polygon data to server:', error);
            }
        }
    };

    const getPolygonData = () => {
        const polygonData = [];
        for (const [_, lineIds] of surveyLinesMap.entries()) {
            const lines = lineIds.map(lineId => {
                const line = draw.get(lineId);
                if (line) {
                    const coordinates = line.geometry.coordinates;
                    return {
                        type: "Feature",
                        properties: {},
                        geometry: {
                            type: "LineString",
                            coordinates: coordinates
                        },
                        id: line.id
                    };
                }
                return null;
            }).filter(line => line !== null);
    
            polygonData.push(...lines);
        }
        return polygonData;
    };

    return (
        <div>
            <div id="myMap" style={{ height: '900px', width: '1440px' }}></div>
            <DownloadButton getPolygonData={getPolygonData} />
        </div>
    );
}


export default TrimbleMapComponent;