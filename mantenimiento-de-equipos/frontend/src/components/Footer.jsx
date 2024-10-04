// Footer.jsx
import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import "./Footer.css"; // Asegúrate de tener este archivo CSS

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; 2024 Richard Ari</p>
      <div className="social-icons">
        <a
          href="https://www.linkedin.com/in/richard-ari-6005b1306/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin size={30} />
        </a>
        <a
          href="https://github.com/RichardAri"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub size={30} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
