import React from "react";
import { Link } from "react-router-dom";
export default function Error() {
  return (
    <div className="skip-link-div">
      <Link className="skip-link" to="/home/searchbar">
        SKIP TO CONTENT
      </Link>
    </div>
  );
}
