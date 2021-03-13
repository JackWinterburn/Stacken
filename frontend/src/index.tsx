import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import allReducers from "./reducers"
import thunk from "redux-thunk"
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { CookiesProvider } from 'react-cookie';
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";


const middleware = [thunk]
const store = createStore(allReducers, composeWithDevTools(
    applyMiddleware(...middleware)
))

ReactDOM.render(
    <React.StrictMode>
        <CookiesProvider> {/* Dependancy for react-cookies */}
        <CSSReset />
        <Provider store={store}> {/* Redux state provider */}
            <ChakraProvider> {/* Chakra UI needs this provider to work properly */}
                <App />
            </ChakraProvider>
        </Provider>
        </CookiesProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// Enable service worker
serviceWorkerRegistration.register();