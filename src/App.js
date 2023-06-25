import React, { useState } from "react";
import Main from "./Components/Main/Main";
import Navsignup from "./Components/Navsignup/Navsignup";
import Navlogin from "./Components/Navlogin/Navlogin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const App = () => {
  const [rediect, setrediect] = useState(false);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main pushRedirect={rediect} />} />
          <Route
            path="/Signup"
            element={<Navsignup pullRedirect={setrediect} />}
          />
          <Route
            path="/login"
            element={<Navlogin pullRedirect={setrediect} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
