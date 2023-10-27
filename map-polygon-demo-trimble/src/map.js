import TrimbleMaps from "@trimblemaps/trimblemaps-js";
/* global TrimbleMapsControl */
import React, { useEffect } from 'react';

function TrimbleMapComponent() {
    useEffect(() => {
        // Set the API key
        TrimbleMaps.APIKey = '7993F98C58B58E40A2EB9D7ADC46C3ED';

        // Initialize the map
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
        const Draw = new TrimbleMapsControl.Draw({});

        Map.addControl(Draw, "top-left");

        // Cleanup on component unmount
        return () => {
            Map.remove();
        };
    }, []);

    return (
        <div id="myMap" style={{ height: '900px', width: '1440px' }}></div>
    );
}

export default TrimbleMapComponent;
