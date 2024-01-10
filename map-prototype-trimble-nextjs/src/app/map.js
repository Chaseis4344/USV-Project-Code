
'use client';
import TrimbleMaps from "@trimblemaps/trimblemaps-js";
import * as turf from '@turf/turf';

import React, { useEffect, useState } from 'react';


function TrimbleMapComponent() {
    const [surveyLinesMap, setSurveyLinesMap] = useState(new Map()); // Map to store survey lines for each polygo
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
/*
        const Draw = new TrimbleMapsControl.Draw({
            displayControlsDefault: false,
            controls: {
                polygon: true,
                trash: true
            }
        });

        Map.addControl(Draw, "top-left");

        Map.on('draw.create', (e) => {
            const shape = e.features[0];
            if (shape.geometry.type === 'Polygon') {
                const lines = dividePolygonIntoSurveyLines(shape, 0.0005); // Adjust lineSpacing as needed
                lines.forEach(line => {
                    Draw.add(line); // Add each line to the map
                });
                surveyLinesMap.set(shape.id, lines.map(line => line.id)); // Store line IDs
            }
        });

        Map.on('draw.delete', (e) => {
            e.features.forEach(feature => {
                if (feature.geometry.type === 'Polygon') {
                    const lineIds = surveyLinesMap.get(feature.id);
                    if (lineIds) {
                        Draw.delete(lineIds); // Delete survey lines associated with the polygon
                        surveyLinesMap.delete(feature.id); // Remove the reference from the map
                    }
                }
            });
        });
*/
        return () => {
            Map.remove();
        };
    }, [surveyLinesMap]); // Include surveyLinesMap in the dependency array

    return (
        <div id="myMap" style={{ height: '900px', width: '1440px' }}></div>
    );
}

function dividePolygonIntoSurveyLines(polygon, lineSpacing) {
    const boundingBox = turf.bbox(polygon);
    const surveyLines = [];
    let currentLongitude = boundingBox[0];

    while (currentLongitude <= boundingBox[2]) {
        const verticalLine = turf.lineString([
            [currentLongitude, boundingBox[1]],
            [currentLongitude, boundingBox[3]]
        ]);

        // Find intersection points between the vertical line and the polygon
        const intersections = turf.lineIntersect(verticalLine, polygon);

        // If there are intersections, process them
        if (intersections.features.length) {
            // Sort intersections from south to north
            const sortedIntersections = intersections.features.sort((a, b) => a.geometry.coordinates[1] - b.geometry.coordinates[1]);

            for (let i = 0; i < sortedIntersections.length - 1; i += 2) {
                // Create a line segment for each pair of intersection points
                const segment = turf.lineString([sortedIntersections[i].geometry.coordinates, sortedIntersections[i + 1].geometry.coordinates]);

                // Check if the midpoint of the segment is within the polygon
                const midpoint = turf.midpoint(sortedIntersections[i], sortedIntersections[i + 1]);
                if (turf.booleanPointInPolygon(midpoint, polygon)) {
                    // If the midpoint is inside the polygon, the segment is valid
                    surveyLines.push(segment);
                }
            }
        }

        currentLongitude += lineSpacing;
    }

    return surveyLines;
}


export default TrimbleMapComponent;