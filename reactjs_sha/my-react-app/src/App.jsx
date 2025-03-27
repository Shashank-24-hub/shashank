import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./home";
import Portfolio from "./portfolio";
import LoanForm from "./LoanForm";

function App() {
  return (
    <div className="flex">
      <Home /> {/* Sidebar is always visible */}
      <div className="flex-grow p-6">
        <Routes>
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/add-loan" element={<LoanForm />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
