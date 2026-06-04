import React from "react";
import "./About.scss";
import ProfilePic from "../../components/ProfilePic/ProfilePic";
import SkillCard from "../../components/card/Card";
import Education from "../Sections/Education";
import { useSelector } from "react-redux";

function About() {
  const profileData=useSelector((state)=>state.appProfileReducer.myProfile);
  console.log("This is about",profileData);
  
  return (
    <div className="About">
      <h1 className="title">About</h1>
      <div className="aboutCont center">
        <div className="leftPart">
          <div className="imgContainer">
            <ProfilePic src={profileData?.message?.adminData?.profilePic?.url} />
          </div>
          <h4>{profileData?.message?.adminData?.name}</h4>
        </div>
        <div className="rightPart">
          {/* <h1>About</h1> */}
          <p className="desc">
            I am a Computer Science graduate from
            Rama University, Kanpur, with strong analytical skills, keen
            attention to detail, and a solid foundation in web development. My
            technical expertise includes JavaScript, Git, GitHub, HTML, CSS,
            React.js, Node.js, Express.js, MySQL, and MongoDB. I am passionate
            about building efficient, responsive, and user-friendly web
            applications, and I am continuously focused on learning and
            improving my technical skills.
          </p>
        </div>
      </div>
      <div className="aboutCont flexCont">
        <h1 className="skillTitle">Skills</h1>
        <div className="skillCont">
          <div className="skill">
            <h3>Frontend Skills</h3>
            <ul>
              <li>HTML</li>
              <li>CSS/SCSS</li>
              <li>JavaScript</li>
              <li>React.JS</li>
            </ul>
          </div>
          <div className="skill">
            <h3>Backend Skills</h3>
            <ul>
              <li>Node.Js</li>
              <li>Express.Js</li>
            </ul>
          </div>
          <div className="skill">
            <h3>Database</h3>
            <ul>
              <li>MySQL</li>
              <li>SQL Server</li>
              <li>MongoDb (basic)</li>
            </ul>
          </div>
          <div className="skill">
            <h3>Tools & Other</h3>
            <ul>
              <li>Git/Github</li>
              <li>Insomnia</li>
              <li>Firebase</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="aboutCont flexCont">
        <h1 className="skillTitle">Featured Projects</h1>
        <div className="skillCont">
          <div className="projects">
            <h3>Full Stack Portfolio Web App with CMS</h3>
            <p><b>Mar 2025 – Apr 2025</b></p>
            <p><b>Tech Stack :</b> <span>JavaScript, HTML, SCSS, 
              React.js, React Redux, Node.js, Express.js, MongoDB</span>
            </p>
            <p>Developed a dynamic full-stack portfolio web application 
              integrated with a custom CMS dashboard to manage projects and blogs.
              Built secure RESTful APIs using Node.js and Express.js, and designed 
              robust MongoDB schemas for flexible data management. Implemented user 
              authentication with JWT to restrict dashboard access and created a fully 
              responsive user interface using React and advanced CSS layouts.
            </p>
          </div>
        </div>
        <div className="skillCont">
          <div className="projects">
            <h3>Social Media App</h3>
            <p><b>Aug 2025 – Sept 2025</b></p>
            <p><b>Tech Stack :</b> <span>JavaScript, HTML, SCSS, 
              React.js, React Redux, Node.js, Express.js, MongoDB</span>
            </p>
            <p>Developed a full-stack social media application with user 
              authentication and a secure login system. Implemented CRUD 
              operations for creating, updating, and deleting posts. 
              Designed RESTful APIs using Node.js and Express.js, and 
              integrated MongoDB for storing user data and posts.
            </p>
          </div>
        </div>
      </div>

      <div className="aboutCont">
        <Education />
      </div>
    </div>
  );
}

export default About;
