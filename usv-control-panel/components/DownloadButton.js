// DownloadButton.js
import React from 'react';

const DownloadButton = ({ getPolygonData }) => {
    const downloadWaypoints = (polygonData) => {
        let content = "QGC WPL 110\n";
        let waypointIndex = 0;

        polygonData.forEach((line, lineIndex) => {
            if (line.geometry && Array.isArray(line.geometry.coordinates)) {
                line.geometry.coordinates.forEach((coord, pointIndex) => {
                    // Set the first point of the first line as the 'current' waypoint
                    const isCurrentWP = waypointIndex === 0 ? 1 : 0;
                    const lineData = formatLineData(waypointIndex, isCurrentWP, coord);
                    content += lineData;
                    waypointIndex++; // Increment the waypoint index for each point
                });
            } else {
                console.error('Feature has an unexpected structure:', line);
            }
        });

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'Poly.waypoints';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(url);
    };

    // Helper function for formatting each line
    function formatLineData(waypointIndex, isCurrentWP, coord) {
        const formatNumber = (num, precision) => num.toFixed(precision).padStart(precision + 3, ' ');

        const fields = [
            waypointIndex.toString().padEnd(1, ' '),
            isCurrentWP.toString().padEnd(1, ' '),
            '0'.padEnd(1, ' '),
            '16'.padEnd(2, ' '),
            formatNumber(0, 6), // PARAM1
            formatNumber(0, 6), // PARAM2
            formatNumber(0, 6), // PARAM3
            formatNumber(0, 6), // PARAM4
            formatNumber(coord[1], 6), // X/LATITUDE
            formatNumber(coord[0], 6), // Y/LONGITUDE
            formatNumber(50, 6), // Z/ALTITUDE
            '1' // AUTOCONTINUE
        ];
        return fields.join('\t') + '\n';
    }


    const handleDownloadClick = () => {
        const polygonData = getPolygonData();
        downloadWaypoints(polygonData);
    };

    return <button onClick={handleDownloadClick}>Download Waypoints</button>;
};

export default DownloadButton;
