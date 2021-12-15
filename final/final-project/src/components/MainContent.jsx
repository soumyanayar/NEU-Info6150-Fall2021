import React from "react";
import { Link } from "react-router-dom";

const MainContent = ({ searchRecipes, setQuery }) => {
  return (
    <form className="search-form" onSubmit={searchRecipes}>
      <div className="form-control">
        <input
          className="search-input"
          type="text"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <button type="submit" className="btn">
          Search
        </button>
      </div>
    </form>
  );
};

export default MainContent;
