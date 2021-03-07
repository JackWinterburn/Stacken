import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.render(
    <React.StrictMode>
        <ChakraProvider> {/* Chakra UI needs this provider to work properly */}
            <App />
        </ChakraProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// Enable service worker
serviceWorkerRegistration.register();