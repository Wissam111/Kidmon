import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ApiContextProvider } from "./context/ApiContext";
import { LoadingContextProvider } from "./context/LoadingContext";
import { CartItemsContextProvider } from "./context/CartItemsContext";
import { AlertsContextProvider } from "./context/AlertsContext";
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ApiContextProvider>
          <CartItemsContextProvider>
            <AlertsContextProvider>
              <LoadingContextProvider>
                <App />
              </LoadingContextProvider>
            </AlertsContextProvider>
          </CartItemsContextProvider>
        </ApiContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
