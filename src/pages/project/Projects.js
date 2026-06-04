import React from "react";
import Project from "../../components/project/Project";
import './Projects.scss'
import { useSelector } from "react-redux";

function Projects() {
  const projectData=useSelector((state)=>state.appProjectReducer.myProjects)

  console.log("This is Project List", projectData);
  
  return (<>
    <div className="Projects">
      <div className="projectHeader vertical">
        <h1>Projects</h1>
        <p className="projectDesc">
          Transforming complex and creative ideas into scalable, modern web applications. Explore our recent work.
        </p>
      </div>
      <div className="projectList">
        {projectData?.projects?.map((item)=>{
          return <Project key={item?._id} pData={item}/>
        })}
        {/* { arr.map((arr,index)=>{
          return <Project key={index} series={arr}/>
        })} */}
      </div> 
    </div>
  </>
  );
}

export default Projects;
