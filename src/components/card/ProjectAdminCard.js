import React, { useState } from "react";
import ProfilePic from "../ProfilePic/ProfilePic";
import { useDispatch } from "react-redux";
import { deleteProject } from "../../Redux/slices/appProjectSlice";

function ProjectAdminCard({pData}) {
  const dispatch=useDispatch();

  console.log("project card", pData);
  

  function handleDeleteBtn(){
    dispatch(deleteProject(pData?._id))
  }

  

    const formatTime=new Date(pData?.createdAt).toLocaleString("en-IN",{

      day: "numeric",

      month: "short",

      year: "numeric",

      hour: "numeric",

      minute: "2-digit",

      hour12: true

    })
  return (
    <div className="ProjectAdminCard">
      <div className="cont">
        <div className="name">
          <div className="titleCont">
            <ProfilePic src={pData?.image?.url}/>
          </div>

          <div className="projectInfo">
            <div className="pName">
                <h4>{pData?.projectName}</h4>
                <p>{pData?.description}</p>
            </div>            
            <p>Created on : <span>{formatTime}</span></p>
          </div>
        </div>
        <button className="deleteBtn" onClick={handleDeleteBtn}>Delete</button>
      </div>
    </div>
  );
}

export default ProjectAdminCard;
