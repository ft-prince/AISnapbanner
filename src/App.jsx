import { Navigate, Route, Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";

import AdGenerator from "./pages/AdGenerator";
import { useEffect, useState } from "react";

const App = () => {
  const [generatedAds, setGeneratedAds] = useState([]);

  // Load generated ads from localStorage
  useEffect(() => {
    try {
      const savedAds = localStorage.getItem('ai-ads-gallery');
      if (savedAds) {
        const parsed = JSON.parse(savedAds);
        // Ensure it's an array
        setGeneratedAds(Array.isArray(parsed) ? parsed : []);
      }
    } catch (error) {
      console.error('Error loading ads:', error);
      setGeneratedAds([]);
    }
  }, []);

  // Save ads to localStorage
  useEffect(() => {
    if (generatedAds.length > 0) {
      try {
        localStorage.setItem('ai-ads-gallery', JSON.stringify(generatedAds));
      } catch (error) {
        console.error('Error saving ads:', error);
      }
    }
  }, [generatedAds]);

  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<HomePage generatedAds={generatedAds} />} />
          <Route path="/generator" element={<AdGenerator />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
