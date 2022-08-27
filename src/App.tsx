import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { ChakraProvider } from "@chakra-ui/react";
import { FormSample } from "./components/FormSample";

function App() {
  return (
    <ChakraProvider>
      <FormSample />
    </ChakraProvider>
  );
}

export default App;
