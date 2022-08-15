import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App";
import Search from "./Search";
import Book from "./Book";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/:id" element={<Book />} />
    </Routes>
    </Router>
    
    
  </React.StrictMode>
);
