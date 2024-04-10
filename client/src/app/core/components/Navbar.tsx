import React from "react";
import { Box, Container } from "@chakra-ui/react";
const Navbar = () => {
  return (
    <Box bgColor="brand.card" px="5" py="3">
      <Container display="flex" maxW="container.lg">
        <h1>Quake</h1>
      </Container>
    </Box>
  );
};

export default Navbar;
