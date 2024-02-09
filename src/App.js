import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Settings from "./components/Settings";
import HomePage from "./components/HomePage";
import { useState } from "react";
import Search from "./components/Search";
import Dettagli from "./components/Dettagli";

function App() {
  const [cittadina, setCitta] = useState("matera");
  const [unita, setCambiaunita] = useState("metric");
  const [lingua, setCambiaLingua] = useState("it");

  const cambiaCitta = (newCitta) => {
    setCitta(newCitta);
  };
  const cambiaUnitaGradi = (newUnita) => {
    setCambiaunita(newUnita);
  };
  const cambiaLinguaggio = (newLingua) => {
    setCambiaLingua(newLingua);
  };

  return (
    <BrowserRouter>
      <div className="d-flex justify-content-between ms-5 me-5 pt-5">
        <Search cambiaCitta={cambiaCitta} lingua={lingua} />
        <Settings
          cambiaUnitaGradi={cambiaUnitaGradi}
          cambiaLinguaggio={cambiaLinguaggio}
          lingua={lingua}
        />
      </div>

      <Routes>
        <Route
          element={<HomePage citta={cittadina} lingua={lingua} units={unita} />}
          path="/"
        />
        <Route
          element={<Dettagli citta={cittadina} lingua={lingua} units={unita} />}
          path="/dettagli"
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
