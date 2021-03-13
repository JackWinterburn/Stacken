import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { CookiesProvider } from 'react-cookie';

ReactDOM.render(
    <React.StrictMode>
        <CookiesProvider> {/* Dependancy for react-cookies */}
        <CSSReset />
            <ChakraProvider> {/* Chakra UI needs this provider to work properly */}
                <App />
            </ChakraProvider>
        </CookiesProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// Enable service worker
serviceWorkerRegistration.register();