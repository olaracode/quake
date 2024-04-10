import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider, Box } from "@chakra-ui/react";
import theme from "./core/theme";
import Home from "./home/Home";
import EarthquakeDetails from "./earthquakes/Details";
import NotFound from "./not_found/NotFound";
import Navbar from "./core/components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Box bgColor="brand.bg" color="white" minH="100vh" >
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/earthquake/:id" element={<EarthquakeDetails />} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </Box>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;