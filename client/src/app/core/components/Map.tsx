import { Icon, Tooltip } from "@chakra-ui/react";
import { MdMyLocation } from "react-icons/md";

import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Marker,
  Graticule,
} from "react-simple-maps";
import { SeismicItem } from "../types";
import map from "../geojson/map.json";

const Map = ({ items = [] }: { items?: SeismicItem[] }) => {
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
        {items.map((item) => (
          <Marker
            key={item.title}
            coordinates={[item.longitude, item.latitude]}
          >
            <Tooltip label={`${item.title}`}>
              <Icon
                as={MdMyLocation}
                _hover={{ color: "red.100" }}
                color="red.500"
                y={-2}
              />
            </Tooltip>
          </Marker>
        ))}
      </ComposableMap>
    </>
  );
};

export default Map;
