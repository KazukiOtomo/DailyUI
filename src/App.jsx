import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Day01 from "./Day01.jsx";
import Day02 from "./Day02.jsx";
import Day03 from "./Day03.jsx";
import Day04 from "./Day04.jsx";
import Day05 from "./Day05.jsx";
import Day06 from "./Day06.jsx";
import Day07 from "./Day07.jsx";
import Day08 from "./Day08.jsx";
import Day09 from "./Day09.jsx";
import Day10 from "./Day10.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/1" element={<Day01 />} />
      <Route path="/2" element={<Day02 />} />
      <Route path="/3" element={<Day03 />} />
      <Route path="/4" element={<Day04 />} />
      <Route path="/5" element={<Day05 />} />
      <Route path="/6" element={<Day06 />} />
      <Route path="/7" element={<Day07 />} />
      <Route path="/8" element={<Day08 />} />
      <Route path="/9" element={<Day09 />} />
      <Route path="/10" element={<Day10 />} />
    </Routes>
  );
}
