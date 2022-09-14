import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { NavBar } from "./components/navBar/navbar.js";
import { Posts } from "./components/posts/posts.js";
import { Side } from "./components/side/side.js";
import "./AppStyle.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

function App() {
  return (
    <Router>
      <nav>
        <NavBar id="NavBar" />
      </nav>
      <div className="article">
          <Posts />
          <Side />
      </div>
    </Router>
  );
}

root.render(
  <div>
    <App />
  </div>
);
