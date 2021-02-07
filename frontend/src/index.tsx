import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import { CookiesProvider } from "react-cookie";
import { createStore } from "redux";
import allReducers from "./reducers/reducers";
import { Provider } from "react-redux";

const store = createStore(allReducers);

ReactDOM.render(
    <React.StrictMode>
        <CookiesProvider>
            <Provider store={store}>
                <ChakraProvider>
                    <App />
                </ChakraProvider>
            </Provider>
        </CookiesProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

serviceWorkerRegistration.unregister();

reportWebVitals();
