import "./css/app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./presentation/components/NavBar/NavBar";
import Home from "./presentation/pages/Home/Home";
import Products from "./presentation/pages/Products/Products";
import ProductAction from "./presentation/pages/ProductAction/ProductAction";
import RegisterParent from "./presentation/pages/RegisterParent/RegisterParent";
import Logout from "./presentation/pages/Logout/Logout";

import Loading from "./presentation/components/Loading/Loading";
import AlertView from "./presentation/components/AlertView/AlertView";

import { useLoadingContext } from "./hooks/useLoadingContext";
import { useAlertContext } from "./hooks/useAlertContext";
function App() {
  const { loading } = useLoadingContext();
  const { alertData } = useAlertContext();
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        {alertData && (
          <AlertView status={alertData.status} text={alertData.text} />
        )}
        {loading && <Loading />}
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product-action" element={<ProductAction />} />
          <Route path="/register-parent" element={<RegisterParent />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
