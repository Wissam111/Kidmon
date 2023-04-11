import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ApiContextProvider } from "./context/ApiContext";
import { LoadingContextProvider } from "./context/LoadingContext";
import { CartItemsContextProvider } from "./context/CartItemsContext";
import { AlertContextProvider } from "./context/AlertContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ApiContextProvider>
        <CartItemsContextProvider>
          <AlertContextProvider>
            <LoadingContextProvider>
              <App />
            </LoadingContextProvider>
          </AlertContextProvider>
        </CartItemsContextProvider>
      </ApiContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
