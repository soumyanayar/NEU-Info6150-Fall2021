import React from "react";

function Searchbar(setQuery) {
  return (
    <input
      className="search-input"
      type="text"
      onChange={(e) => {
        setQuery(e.target.value);
      }}
    />
  );
}

export default Searchbar;
