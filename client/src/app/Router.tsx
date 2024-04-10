import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider, Box } from "@chakra-ui/react";
import theme from "./core/theme";
import Home from "./home/Home";
import NotFound from "./not_found/NotFound";
import Navbar from "./core/components/Navbar";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Box bgColor="brand.bg" color="white" minH="100vh">
          <Navbar />
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </QueryClientProvider>
        </Box>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
