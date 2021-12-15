import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <nav className="footer-navbar">
      <div className="footer-nav-center">
        <Link to="/privacypolicy">Privacy Policy</Link>
      </div>
    </nav>
  );
}

export default Footer;
