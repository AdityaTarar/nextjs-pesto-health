import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FaLocationDot } from "react-icons/fa6";
import L from "leaflet";

const Map = () => {
  const [location, setLocation]: any = useState([18.5787983, 73.7401555]);

  const position: any = [51.505, -0.09];
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation([latitude, longitude]);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not available in this browser.");
    }
  }, []);
  console.log("location", location);

  return (
    <>
      {location?.length > 0 ? (
        <MapContainer
          style={{ height: "100%", width: "100%", borderRadius: 20 }}
          center={location}
          zoom={13}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={location}
            icon={L.icon({
              iconUrl:
                "https://www.google.com/imgres?imgurl=https%3A%2F%2Fw7.pngwing.com%2Fpngs%2F457%2F630%2Fpng-transparent-location-logo-location-computer-icons-symbol-location-miscellaneous-angle-heart.png&tbnid=rBfrpgyKygGAOM&vet=12ahUKEwjlmaG9hJaEAxULQGwGHUZPDtQQMygDegQIARB6..i&imgrefurl=https%3A%2F%2Fwww.pngwing.com%2Fen%2Ffree-png-zdvkr&docid=utzcM8qrZrnL_M&w=920&h=1200&q=location%20icon%20png&ved=2ahUKEwjlmaG9hJaEAxULQGwGHUZPDtQQMygDegQIARB6", // Replace with the path to your custom marker image
              iconSize: [32, 32], // Adjust the size of the marker image as needed
            })}
          >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      ) : (
        <></>
      )}
    </>
  );
};

export default Map;
