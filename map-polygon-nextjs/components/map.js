'use client';

import React, { useEffect, useState } from 'react';
import * as turf from '@turf/turf';

function TrimbleMapComponent() {
    const [map, setMap] = useState(null);
    const [draw, setDraw] = useState(null);
    const [surveyLinesMap, setSurveyLinesMap] = useState(new Map());

    useEffect(() => {
        // Initialize the map only if it hasn't been created yet
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
    }, [map]); // Dependency on map

    useEffect(() => {
        // Set up event listeners if map and draw instances are available
        if (map && draw) {
            const createHandler = (e) => {
                const shape = e.features[0];
                if (shape.geometry.type === 'Polygon') {
                    const lines = dividePolygonIntoSurveyLines(shape, 0.0005);
                    lines.forEach(line => {
                        draw.add(line);
                    });
                    surveyLinesMap.set(shape.id, lines.map(line => line.id));
                }
            };

            const deleteHandler = (e) => {
                e.features.forEach(feature => {
                    if (feature.geometry.type === 'Polygon') {
                        const lineIds = surveyLinesMap.get(feature.id);
                        if (lineIds) {
                            draw.delete(lineIds);
                            surveyLinesMap.delete(feature.id);
                        }
                    }
                });
            };

            map.on('draw.create', createHandler);
            map.on('draw.delete', deleteHandler);

            return () => {
                map.off('draw.create', createHandler);
                map.off('draw.delete', deleteHandler);
            };
        }
    }, [map, draw, surveyLinesMap]); // Dependencies on map, draw, and surveyLinesMap

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