import { Navigate, Route, Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import AdGenerator from "./pages/AdGenerator";
import Gallery from "./pages/Gallery";
import { useEffect, useState } from "react";

const App = () => {
  const [generatedAds, setGeneratedAds] = useState([]);

  // Load generated ads from localStorage
  useEffect(() => {
    try {
      const savedAds = localStorage.getItem("ai-ads-gallery");
      if (savedAds) {
        setGeneratedAds(JSON.parse(savedAds));
      }
    } catch (error) {
      console.error("Error loading ads:", error);
    }
  }, []);

  // Save ads to localStorage
  useEffect(() => {
    if (generatedAds.length > 0) {
      localStorage.setItem("ai-ads-gallery", JSON.stringify(generatedAds));
    }
  }, [generatedAds]);

  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<HomePage generatedAds={generatedAds} />} />
          <Route
            path="/dashboard"
            element={<Dashboard generatedAds={generatedAds} />}
          />
          <Route path="/generator" element={<AdGenerator />} />
          <Route
            path="/gallery"
            element={<Gallery generatedAds={generatedAds} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
