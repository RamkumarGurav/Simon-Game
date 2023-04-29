import React from "react";
import './Footer.css'

const Footer = () => {
  return (
    <footer id="footer">
      <div className="social-icons">
        <a href="https://github.com/RamkumarGurav">
          <i className="fab fa-github-square"></i>
        </a>
        <a href="https://www.facebook.com/ram.gurav.79">
          <i className="fab fa-facebook-square"></i>
        </a>
        <a href="https://twitter.com/Raamathecoder">
          <i className="fab fa-twitter-square"></i>
        </a>
        <a href="https://www.instagram.com/ram.gurav/">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://www.linkedin.com/in/ramkumar-gurav-645585250/">
          <i className="fab fa-linkedin"></i>
        </a>
      </div>

      <p>Copyright © raamthecoder@gmail.com </p>
    </footer>
  );
};
export default Footer