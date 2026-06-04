import React from "react";
import "./Education.scss";
import { FaUserGraduate } from "react-icons/fa6";

function Education() {
  return (
    <div className="Education">
        <header>
            <h1>Education</h1>
        </header>
      <div className="container">
        <div className="eduCont eduCont-left">
          <div className="circle center">
            <FaUserGraduate />
          </div>
          <div className="box">
            <h2>High School</h2>
            <h3>St. Paul Public School</h3>
            <p>Batch 2018-19</p>
            <span className="Larrow"></span>
          </div>
        </div>
        <div className="eduCont eduCont-right">
          <div className="circle center">
            <FaUserGraduate />
          </div>
          <div className="box">
            <h2>Intermediate School</h2>
            <h3>St. Paul Public School</h3>
            <p>Batch 2020-21</p>
            <span className="Rarrow"></span>
          </div>
        </div>
        <div className="eduCont eduCont-left">
          <div className="circle center">
            <FaUserGraduate />
          </div>
          <div className="box">
            <h2>B.Tech</h2>
            <h3>Rama University</h3>
            <p>Batch 2021-25</p>
            <span className="Larrow"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Education;
