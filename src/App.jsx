import React from "react";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home";
import Issuance from "./pages/Issuance/Issuance";
import LkLayout from "./components/LkLayout/LkLayout.jsx";
import Distribution from "./pages/Distribution/Distribution.jsx";

function App() {

  return (<Routes>
      <Route path="" element={<LkLayout />}>
        <Route index element={<Home />}></Route>
        <Route path="issuance" element={<Issuance />}/>
        <Route path="distribution" element={<Distribution />}/>
      </Route>
    </Routes>);
}

export default App;
