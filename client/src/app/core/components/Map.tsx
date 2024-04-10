import React from "react";
import { Container } from "@chakra-ui/react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
} from "react-simple-maps";
import map from "../geojson/map.json";
const Map = () => {
  return (
    <>
      <ComposableMap>
        <Sphere stroke="#E4E5E6" strokeWidth={0.5} id={""} fill={""} />
        <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
        <Geographies
          geography={map}
          style={{
            color: "white",
          }}
        >
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#fafafa"
                stroke="#000000"
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </>
  );
};

export default Map;
