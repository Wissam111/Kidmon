import "./css/app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./presentation/components/NavBar/NavBar";
import Home from "./presentation/pages/Home/Home";
import Settings from "./presentation/pages/Settings/Settings";
function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
