import { ChakraProvider,Button } from "@chakra-ui/react";
import theme from "@chakra-ui/theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Button colorScheme="blue">Click me</Button>
    </ChakraProvider>
  );
}

export default App;
