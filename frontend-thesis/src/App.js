import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import MapPage from "./pages/MapPage";
import ExperiencePage from "./pages/ExperiencePage";
import ARPage from "./pages/ARPage";
import { ExperienceProvider } from "./context/ExperienceContext";

function App() {
  return (
    <ExperienceProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/experience/:id" element={<ExperiencePage />} />
          <Route path="/ar" element={<ARPage />} />
        </Routes>
      </Router>
    </ExperienceProvider>
  );
}

export default App;
