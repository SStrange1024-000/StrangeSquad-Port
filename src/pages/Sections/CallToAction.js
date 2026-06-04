import React from "react";
import "./CallToAction.scss";
import { useNavigate } from "react-router-dom";

function CallToAction() {
    const navigate=useNavigate();
  function handleContact() {
    navigate("/contact");
    window.scrollTo(0, 0);
  }
  
  function handleProject() {
    navigate("/projects");
    window.scrollTo(0, 0);
  }
  return (
    <div className="CallToAction">
      <div className="cont">
        <div className="text">
          <h2>Let’s Work Together</h2>
          <div className="text2">
            <p>
              I build modern web projects and share event updates. If you want
              something similar, contact me.
            </p>
            <p>
              Let’s create something useful, modern, and memorable together.
            </p>
          </div>
        </div>
        <div className="btnCont">
          <button className="links btn2 btnc" onClick={handleContact}>Contact</button>
          <button className="links btn2" onClick={handleProject}>Project</button>
        </div>
      </div>
    </div>
  );
}

export default CallToAction;
