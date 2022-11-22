import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import Issuance from "./pages/Issuance/Issuance";
import LkLayout from "./components/LkLayout/LkLayout.jsx";
import Distribution from "./pages/Distribution/Distribution.jsx";

function App() {

  return (<Routes>
      <Route element={<LkLayout />}>
        <Route index element={<Navigate to="/issuance"/>}/>
        <Route path="issuance" element={<Issuance />} />
        <Route path="distribution" element={<Distribution />}/>
      </Route>
    </Routes>);
}

export default App;
