import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/navBar/navbar.js";
import { Post } from "./features/posts/posts.js";
import { CurrentPost } from "./features/posts/currentPost/currentPost.js";
import store from "./store";
import "./AppStyle.css";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

function App() {
  return (
    <Provider store={store}>
      <NavBar id="NavBar" />
      <Routes>
        <Route
          path="/"
          element={
            <div className="article">
              <div className="Posts">
                <Post />
              </div>
            </div>
          }
        />
        <Route
          path="/r/:subreddit"
          element={
            <div className="article">
              <div className="Posts">
                <Post />
              </div>
            </div>
          }
        />
        <Route path={"/:id"} element={<CurrentPost />} />
      </Routes>
    </Provider>
  );
}

export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}

root.render(
  <Router>
    <ScrollToTop />
    <App />
  </Router>
);
