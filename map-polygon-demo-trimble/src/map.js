import TrimbleMaps from "@trimblemaps/trimblemaps-js";
import * as turf from '@turf/turf';
/* global TrimbleMapsControl */
import React, { useEffect } from 'react';

function TrimbleMapComponent() {
    useEffect(() => {
        TrimbleMaps.APIKey = process.env.REACT_APP_TRIMBLE_MAPS_API_KEY;

        const Map = new TrimbleMaps.Map({
            container: "myMap",
            center: new TrimbleMaps.LngLat(-81.84916796332335, 28.14888921518113),
            zoom: 15,
            region: TrimbleMaps.Common.Region.NA3,
            style: TrimbleMaps.Common.Style.SATELLITE,
            language: TrimbleMaps.Common.Language.EN,
            hash: true,
            satelliteProvider: TrimbleMaps.Common.SatelliteProvider.SAT6,
        });

        const Draw = new TrimbleMapsControl.Draw({
            displayControlsDefault: false,
            controls: {
                polygon: true,
                trash: true
            }
        });

        Map.addControl(Draw, "top-left");

        // Event listener for shape creation
        Map.on('draw.create', (e) => {
            const shape = e.features[0];
            if (shape.geometry.type === 'Polygon') {
                const lines = dividePolygonIntoSurveyLines(shape, 0.001); // Adjust lineSpacing as needed
                lines.forEach(line => {
                    Draw.add(line); // Add each line to the map
                });
            }
        });

        return () => {
            Map.remove();
        };
    }, []);

    return (
        <div id="myMap" style={{ height: '900px', width: '1440px' }}></div>
    );
}

function dividePolygonIntoSurveyLines(polygon, lineSpacing) {
    const boundingBox = turf.bbox(polygon);
    const surveyLines = [];
    let currentLongitude = boundingBox[0];

    while (currentLongitude <= boundingBox[2]) {
        // Create a vertical line that spans the height of the bounding box
        const line = turf.lineString([
            [currentLongitude, boundingBox[1]], // South point
            [currentLongitude, boundingBox[3]]  // North point
        ]);

        // Split the line by the polygon
        const splitLines = turf.lineSplit(line, polygon);

        splitLines.features.forEach(splitLine => {
            if (turf.booleanWithin(splitLine, polygon) || turf.booleanContains(polygon, splitLine)) {
                surveyLines.push(splitLine); // Add the line segment within the polygon
            }
        });

        currentLongitude += lineSpacing;
    }

    return surveyLines;
}

export default TrimbleMapComponent;