import * as turf from '@turf/turf';

export const calculateDistances = (markers) => {
  const distances = [];

  if (markers.length < 2) return distances;

  for (let i = 0; i < markers.length - 1; i++) {
    const from = turf.point([markers[i].lng, markers[i].lat]);
    const to = turf.point([markers[i + 1].lng, markers[i + 1].lat]);
    const distance = turf.distance(from, to) * 1000;  // Convert to meters
    distances.push(distance);
  }

  // Calculate distance between the last and first marker to close the polygon
  const fromLast = turf.point([markers[markers.length - 1].lng, markers[markers.length - 1].lat]);
  const toFirst = turf.point([markers[0].lng, markers[0].lat]);
  const distanceClosing = turf.distance(fromLast, toFirst) * 1000;  // Convert to meters
  distances.push(distanceClosing);

  return distances;
};
