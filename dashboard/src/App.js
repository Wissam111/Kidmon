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

function App() {
  const { loading } = useLoadingContext();
  const { alertData } = useAlertContext();
  const { authData } = useAuthContext();
  console.log(authData);
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        {alertData && (
          <AlertView status={alertData.status} text={alertData.text} />
        )}
        {loading && <Loading />}
        {authData && <NavBar />}
        <Routes>
          <Route exact path="/" element={<ProtectedRoute />}>
            <Route exact path="/" element={<Home />} />
          </Route>
          <Route exact path="/products" element={<ProtectedRoute />}>
            <Route exact path="/products" element={<Products />} />
          </Route>
          <Route exact path="/product-action" element={<ProtectedRoute />}>
            <Route exact path="/product-action" element={<ProductAction />} />
          </Route>
          <Route exact path="/register-parent" element={<ProtectedRoute />}>
            <Route exact path="/register-parent" element={<RegisterParent />} />
          </Route>
          <Route path="/entry" element={<Entry />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
