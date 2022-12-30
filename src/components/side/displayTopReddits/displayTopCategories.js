import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import './displayTopCategories.css'
import '../side.css'

import { topCategories } from "./data";
import { getTopCategory } from "../../../appResources/helperFunctions";
export const DisplayTopCategories = () => {
  const dispatch = useDispatch();
  let { name, items } = getTopCategory(topCategories);
  let key = 0;

  return (
    <div className="cat-showcase">
      <header className="cat-header">
        <h2 className="cat-title">Top {name} Communities</h2>
      </header>
      <ul className="categories">
        {items.map((category) => {
          return (
            <li key={(key += 1)} className="category-li">
              <Link
                to={"/" + category}
                className="category"
              >
                <h1 className="category-text">{category}</h1>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
