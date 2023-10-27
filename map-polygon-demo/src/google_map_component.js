import React, { useRef, useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, Polygon, OverlayView } from '@react-google-maps/api';
import { calculateDistances } from './utils';  // Ensure this import path is correct

const containerStyle = {
  width: '100%',
  height: '100vh'
};

const center = {
  lat: 28.148150526687154,
  lng: -81.84860625151802
};

function MapComponent() {
  const [markers, setMarkers] = useState([]);
  const polygonRef = useRef(null);
  const listenersRef = useRef([]);

  const onEdit = useCallback(() => {
    if (polygonRef.current) {
      const nextMarkers = polygonRef.current
        .getPath()
        .getArray()
        .map((latLng) => {
          return { lat: latLng.lat(), lng: latLng.lng() };
        });
      setMarkers(nextMarkers);
    }
  }, []);

  const onPolygonLoad = useCallback(
    (polygon) => {
      polygonRef.current = polygon;
      const path = polygon.getPath();
      listenersRef.current.push(
        path.addListener("set_at", onEdit),
        path.addListener("insert_at", onEdit),
        path.addListener("remove_at", onEdit)
      );
    },
    [onEdit]
  );

  const onPolygonUnmount = useCallback(() => {
    listenersRef.current.forEach((lis) => lis.remove());
    polygonRef.current = null;
  }, []);

  const onMapClick = event => {
    const newMarker = { lat: event.latLng.lat(), lng: event.latLng.lng() };
    
    if (markers.length >= 3) {
        const newMarkers = [...markers];
        newMarkers.splice(newMarkers.length - 1, 0, newMarker);  // Insert the new marker before the last one
        setMarkers(newMarkers);
    } else {
        setMarkers(prev => [...prev, newMarker]);
    }
};


  const clearMarkers = () => {
    setMarkers([]);
  };

  const removeMarker = (indexToRemove) => {
    setMarkers(prevMarkers => prevMarkers.filter((_, index) => index !== indexToRemove));
  };

  const getEdgeCenter = (point1, point2) => {
    return {
      lat: (point1.lat + point2.lat) / 2,
      lng: (point1.lng + point2.lng) / 2,
    };
  };

  const distances = calculateDistances(markers);

  return (
    <div style={{ height: '100vh' }}>
      <LoadScript googleMapsApiKey="AIzaSyCnDBXsZFv5MAMgVsXoIUz_4Dbnwzm-GQw">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          onClick={onMapClick}
        >
          {markers.map((marker, index) => (
            <Marker key={index} position={marker} onClick={() => removeMarker(index)} />
          ))}

          {distances.map((distance, index) => {
            const point1 = markers[index];
            const point2 = markers[(index + 1) % markers.length];

            return (
              <OverlayView
                key={index}
                position={getEdgeCenter(point1, point2)}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <div style={{}}>
                  {distance.toFixed(2)}m
                </div>
              </OverlayView>
            );
          })}

          {markers.length > 2 && (
            <Polygon
              editable
              draggable
              path={markers}
              onMouseUp={onEdit}
              onDragEnd={onEdit}
              onLoad={onPolygonLoad}
              onUnmount={onPolygonUnmount}
              options={{
                fillColor: "#00FF00",
                fillOpacity: 0.4,
                strokeColor: "#00FF00",
                strokeOpacity: 1,
                strokeWeight: 2
              }}
            />
          )}
        </GoogleMap>
        <button className="clear-button" onClick={clearMarkers}>Clear All</button> 
      </LoadScript>
    </div>
  );
}

export default MapComponent;