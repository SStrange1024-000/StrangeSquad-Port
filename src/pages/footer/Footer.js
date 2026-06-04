import React, { useEffect, useState } from "react";
import { FaLinkedin } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaPinterestSquare } from "react-icons/fa";
import "./Footer.scss";
import { useNavigate } from "react-router-dom";
import { getItem, KEY_ACCESS_TOKEN } from "../../Utilities/localStorage";

function Footer() {
  const navigate = useNavigate();
  const user = getItem(KEY_ACCESS_TOKEN);

  function handleProfile() {
    if (user) {
      navigate("/dashboard");
      window.scrollTo(0, 0);
    } else {
      navigate("/login");
    }
  }

  function handleAbout() {
    navigate("/about");
    window.scrollTo(0, 0);
  }

  function handleContact() {
    navigate("/contact");
    window.scrollTo(0, 0);
  }

  return (
    <div className="Footer">
      <div className="FTop">
        <div className="logo">
          <h1>StrangeSquad</h1>
        </div>
        <div className="fcont">
          <p onClick={handleAbout}>About</p>
          <p onClick={handleProfile}>Admin</p>
          <p onClick={handleContact}>Contact</p>
          <p>Privacy Policy</p>
        </div>
        <div className="SocialLinks">
          <div className="socialMedia">
            <FaLinkedin className="icon" />
            <FaPinterestSquare className="icon" />
            <FaSquareInstagram className="icon" />
            <FaSquareXTwitter className="icon" />
            <FaTelegramPlane className="icon" />
          </div>
        </div>
      </div>
      <div className="FBottom">
        <h1>@ This is my Portfolio website.</h1>
      </div>
    </div>
  );
}

export default Footer;
