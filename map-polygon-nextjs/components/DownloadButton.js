// DownloadButton.js
import React from 'react';

const DownloadButton = ({ getPolygonData }) => {
    const downloadWaypoints = (polygonData) => {
        let content = "QGC WPL 110\n";
        let waypointIndex = 0;
    
        polygonData.forEach((line) => {
            if (line.geometry && Array.isArray(line.geometry.coordinates)) {
                line.geometry.coordinates.forEach((coord, pointIndex) => {
                    const isCurrentWP = pointIndex === 0 ? 1 : 0; // Set the first point of the first line as the 'current' waypoint
                    const lineData = `${waypointIndex}\t${isCurrentWP}\t0\t16\t0\t0\t0\t0\t${coord[1]}\t${coord[0]}\t50.000000\t1\n`;
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
    const handleDownloadClick = () => {
        const polygonData = getPolygonData();
        downloadWaypoints(polygonData);
    };

    return <button onClick={handleDownloadClick}>Download Waypoints</button>;
};

export default DownloadButton;
