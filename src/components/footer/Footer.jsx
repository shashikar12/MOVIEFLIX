import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

import ContentWrapper from "../contentWrapper/ContentWrapper";

import "./style.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <ContentWrapper>
        <ul className="menuItems">
          <li className="menuItem">Terms</li>
          <li className="menuItem">Privacy</li>
          <li className="menuItem">About</li>
          <li className="menuItem">Engineering</li>
          <li className="menuItem">Status</li>
        </ul>
        <div className="infoText">
          movieflx is a React OTT discovery experience focused on fast search,
          responsive content rails, keyboard-friendly navigation, and clean API
          integration.
          <p>&copy; 2026 Shashikar Saurabh</p>
        </div>
        <div className="socialIcons">
          <span className="icon" aria-label="Facebook">
            <FaFacebookF />
          </span>
          <span className="icon" aria-label="Instagram">
            <FaInstagram />
          </span>
          <span className="icon" aria-label="Twitter">
            <FaTwitter />
          </span>
          <span className="icon" aria-label="LinkedIn">
            <FaLinkedin />
          </span>
        </div>
      </ContentWrapper>
    </footer>
  );
};

export default Footer;
