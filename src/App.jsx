import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Day01 from "./Day01.jsx";
import Day02 from "./Day02.jsx";
import Day03 from "./Day03.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/1" element={<Day01 />} />
      <Route path="/2" element={<Day02 />} />
      <Route path="/3" element={<Day03 />} />
    </Routes>
  );
}
