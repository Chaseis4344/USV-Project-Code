import React, { useEffect } from 'react';
import TrimbleMaps from "@trimblemaps/trimblemaps-js";
import * as turf from '@turf/turf';
/* global TrimbleMapsControl */

function TrimbleMapComponent() {
    useEffect(() => {
        // Set the API key
        TrimbleMaps.APIKey = "7993F98C58B58E40A2EB9D7ADC46C3ED"; // Remember to replace this with your actual API key

        // Initialize the map
        const myMap = new TrimbleMaps.Map({
            container: "myMap",
            center: new TrimbleMaps.LngLat(-81.84916796332335, 28.14888921518113),
            zoom: 15,
            region: TrimbleMaps.Common.Region.NA3,
            style: TrimbleMaps.Common.Style.SATELLITE,
            language: TrimbleMaps.Common.Language.EN,
            hash: true,
            satelliteProvider: TrimbleMaps.Common.SatelliteProvider.SAT6,
        });

        // Initialize Draw functionality with customized point style
        const Draw = new TrimbleMapsControl.Draw({
            displayControlsDefault: false,
            controls: {
                point: true,
                polygon: true,
                trash: true
            },
            styles: [
                // Point style
                {
                    "id": "gl-draw-point",
                    "type": "circle",
                    "filter": ["all", ["==", "$type", "Point"], ["!=", "mode", "static"]],
                    "paint": {
                        "circle-radius": 7,
                        "circle-color": "#D20C0C", // Red color
                        "circle-stroke-width": 2,
                        "circle-stroke-color": "#fff" // White border
                    }
                }
                // ... other styles can be added if needed
            ]
        });
        myMap.addControl(Draw, "top-left");

        // Store clicked points
        const points = [];

        myMap.on('click', function(e) {
            points.push(e.lngLat);

            // If there are three or more points, compute the convex hull and draw it
            if (points.length >= 3) {
                // Convert points to GeoJSON format
                const geojsonPoints = {
                    "type": "FeatureCollection",
                    "features": points.map(p => ({
                        "type": "Feature",
                        "properties": {},
                        "geometry": {
                            "type": "Point",
                            "coordinates": [p.lng, p.lat]
                        }
                    }))
                };

                // Compute convex hull
                const hull = turf.convex(geojsonPoints);

                if (hull) {
                    if (myMap.getLayer("polygon")) {
                        myMap.removeLayer("polygon");
                        myMap.removeSource("polygon");
                    }

                    myMap.addLayer({
                        'id': 'polygon',
                        'type': 'fill',
                        'source': {
                            'type': 'geojson',
                            'data': hull
                        },
                        'layout': {},
                        'paint': {
                            'fill-color': '#088',
                            'fill-opacity': 0.8
                        }
                    });
                }
            }
        });

        myMap.on('load', function() {
            myMap.resize(); // force the map to adjust to its container size
        });

        // Cleanup on component unmount
        return () => {
            myMap.remove();
        };
    }, []);

    return (
        <div id="myMap" style={{ height: '900px', width: '1440px' }}></div>
    );
}

export default TrimbleMapComponent;
