import React from "react";
import { useState } from "react";
import Data from "../foodItem_Mockdat.json";

const SearchForm = () => {
  const [query, setQuery] = useState("");
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Enter The Food Name"
        onChange={(e) => setQuery(e.target.value)}
      ></input>
      {Data.filter((post) => {
        if (query === "") {
          return post;
        } else if (post.name.toLowerCase().includes(query.toLowerCase())) {
          return post;
        }
      }).map((post, id) => {
        return (
          <div className="search-item" key={id}>
            <button>{post.name}</button>
          </div>
        );
      })}
    </div>
  );
};

export default SearchForm;
