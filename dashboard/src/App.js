import "./css/app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./presentation/components/NavBar/NavBar";
import Home from "./presentation/pages/Home/Home";
import Settings from "./presentation/pages/Settings/Settings";
import Products from "./presentation/pages/Products/Products";
import ProductAction from "./presentation/pages/ProductAction/ProductAction";
import Loading from "./presentation/components/Loading/Loading";
import { useLoadingContext } from "./hooks/useLoadingContext";

function App() {
  const { loading } = useLoadingContext();
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        {loading && <Loading />}
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/product-action" element={<ProductAction />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
