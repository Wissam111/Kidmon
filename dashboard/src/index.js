import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ApiContextProvider } from "./context/ApiContext";
import { LoadingContextProvider } from "./context/LoadingContext";
import { CartItemsContextProvider } from "./context/CartItemsContext";
import { AlertsContextProvider } from "./context/AlertsContext";
// import { PrimeReactProvider } from "primereact/context";
import { BrowserRouter } from "react-router-dom";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ApiContextProvider>
          <CartItemsContextProvider>
            <AlertsContextProvider>
              <LoadingContextProvider>
                {/* <PrimeReactProvider> */}
                <App />
                {/* </PrimeReactProvider> */}
              </LoadingContextProvider>
            </AlertsContextProvider>
          </CartItemsContextProvider>
        </ApiContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
