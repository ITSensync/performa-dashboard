import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import DaftarChart from "./components/per2mnt/DaftarChart";
import ThemeToggle from "./components/ThemeToggle";
import CardComponents from "./components/per2mnt/CardComponents";

import { ThemeProvider } from "./components/ThemeContext";
import CardHoursComponents from "./components/perjam/CardHoursComponents";
import DaftarChartHours from "./components/perjam/DaftarChartHours";
import NavBar from "./components/layout/NavBar";
import { title } from "process";

const AppContent: React.FC = () => {
  const dataPer2Mnt = [
    { id: "sparing01", title: "Gistex" },
    { id: "sparing02", title: "Indorama PWK" },
    { id: "sparing04", title: "Indorama PDL" },
    { id: "sparing05", title: "Besland" },
    { id: "sparing06", title: "Indotaisei" },
    { id: "sparing07", title: "Daliatex" },
    { id: "sparing08", title: "Papyrus" },
    { id: "sparing09", title: "BCP" },
    { id: "sparing10", title: "Pangjaya" },
    { id: "sparing11", title: "LPA" },
    { id: "sparing12", title: "Kertas PDL"},
    { id: "sparing13", title: "SSM"},
    // { id: "weaving01", title: "weaving01" },
    // { id: "weaving02", title: "weaving02" },
    { id: "spinning", title: "spinning" },

    // { id: "sparing01", title: "sparing01" },
    // { id: "sparing02", title: "sparing02" },
    // { id: "sparing03", title: "sparing03" },
    // { id: "sparing04", title: "sparing04" },
    // { id: "sparing05", title: "sparing05" },
    // { id: "sparing06", title: "sparing06" },
    // { id: "sparing07", title: "sparing07" },
    // { id: "sparing08", title: "sparing08" },
    // { id: "sparing09", title: "sparing09" },
    // { id: "sparing10", title: "sparing10" },
    // { id: "sparing11", title: "sparing11" },
    // { id: "weaving01", title: "weaving01" },
    // { id: "weaving02", title: "weaving02" },
    // { id: "spinning", title: "spinning" },
    // Add other data if needed
  ];

  const dataPerJam = dataPer2Mnt.map((item) => ({
    id: `${item.id}_lap`,
    title: item.title,
  }));

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <NavBar />
      <div className="container mx-auto p-4 mt-5">
        <Routes>
          <Route
            path="/per2mnt"
            element={
              <>
                <CardComponents />
                <DaftarChart data={dataPer2Mnt} /> {/* Pass only data prop */}
              </>
            }
          />
          <Route
            path="/perjam"
            element={
              <>
                <CardHoursComponents />
                <DaftarChartHours data={dataPerJam} /> {/* Pass only data prop */}
              </>
            }
          />
          <Route path="*" element={<Navigate to="/per2mnt" />} />
        </Routes>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
};

export default App;
