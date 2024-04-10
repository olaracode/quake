import React from "react";
import { Container, Heading } from "@chakra-ui/react";
import Map from "../../core/components/Map";
const Loading = () => {
  return (
    <Container maxW="container.lg">
      <Map />
      <Heading as="h2" textAlign="center">
        Cargando
      </Heading>
    </Container>
  );
};

export default Loading;
