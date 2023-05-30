import "./css/app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./presentation/components/NavBar/NavBar";
import Home from "./presentation/pages/Home/Home";
import Products from "./presentation/pages/Products/Products";
import ProductAction from "./presentation/pages/ProductAction/ProductAction";
import RegisterParent from "./presentation/pages/RegisterParent/RegisterParent";
import Entry from "./presentation/pages/Entry/Entry";
import Loading from "./presentation/components/Loading/Loading";
import AlertView from "./presentation/components/AlertView/AlertView";
import ProtectedRoute from "./presentation/components/ProtectedRoute";

import { useLoadingContext } from "./hooks/useLoadingContext";
import { useAlertContext } from "./hooks/useAlertContext";
import { useAuthContext } from "./hooks/useAuthContext";
import Dashboard from "./presentation/pages/Dashboard/Dashboard";

function App() {
  const { loading } = useLoadingContext();
  const { alertData } = useAlertContext();
  const { authData } = useAuthContext();

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        {alertData && (
          <AlertView status={alertData.status} text={alertData.text} />
        )}
        <Loading isLoading={loading} />
        {authData && <NavBar />}
        <div className="outter-page-container">
          <Routes>
            <Route exact path="/" element={<ProtectedRoute />}>
              <Route exact path="/" element={<Dashboard />} />
            </Route>

            <Route exact path="/store" element={<ProtectedRoute />}>
              <Route exact path="/store" element={<Home />} />
            </Route>
            <Route exact path="/products" element={<ProtectedRoute />}>
              <Route exact path="/products" element={<Products />} />
            </Route>
            <Route exact path="/product-action" element={<ProtectedRoute />}>
              <Route exact path="/product-action" element={<ProductAction />} />
            </Route>
            <Route exact path="/register-parent" element={<ProtectedRoute />}>
              <Route
                exact
                path="/register-parent"
                element={<RegisterParent />}
              />
            </Route>
            <Route path="/entry" element={<Entry />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
