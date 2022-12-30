// IMPORTS:
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/navBar/navbar.js";
import { Posts } from "./features/posts/posts.js";
import { CurrentPost } from "./features/currentPost/currentPost.js";
import store from "./store";
import "./AppStyle.css";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";


// CODE START:
const root = ReactDOM.createRoot(document.getElementById("root"));

function App() {
  return (
    <Provider store={store}>
      <NavBar id="NavBar" />
      {/* Navbar is always shown */}
      <Routes>
        <Route
          path="/"
          element={
            <div className="article">
              <div>
                <Posts isSubreddit={false} />
                {/* false = default route */}
              </div>
            </div>
          }
        />{" "}
        <Route
          path="/r/:subreddit"
          element={
            <div className="article">
              <div>
                <Posts isSubreddit={true} />
                {/* true = subreddit route, change look */}
              </div>
            </div>
          }
        />
        {/*Current Post*/}
        <Route path={"post/:id/:name/"} element={<CurrentPost />} />
        <Route
          path={"r/:subreddit/post/:id/:name/"}
          element={<CurrentPost />}
        />
      </Routes>
    </Provider>
  );
}

export default function ScrollToTop() {
  // Resets scroll when changing pages
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
