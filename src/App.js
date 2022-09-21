import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/navBar/navbar.js";
import { Post } from "./features/posts/posts.js";
import { Side } from "./components/side/side.js";
import { CurrentPost } from "./features/currentPost/currentPost.js";
import store from "./store";
import "./AppStyle.css";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar id="NavBar" />
        <Routes>
          <Route
            path="/"
            element={
              <div className="article">
                <div className="Posts">
                  <Post />
                </div>
                <Side />
              </div>
            }
          />
          <Route path={"/post/:id"} element={<CurrentPost />} />
        </Routes>
      </Router>
    </Provider>
  );
}

root.render(
  <div>
    <App />
  </div>
);
