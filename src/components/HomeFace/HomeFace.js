import React from "react";
import ProfilePic from "../ProfilePic/ProfilePic";
import { FaLinkedin } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquareFacebook } from "react-icons/fa6";
import "./HomeFace.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function HomeFace() {
  const data=useSelector((state)=> state.appProfileReducer.myProfile)
  const navigate=useNavigate()
  console.log("Data From Hero or Homeface",data);
  
  return (
    <div className="HomeFace center">
      <div className="container">
        <div className="leftPart">
          <h2 className="name">{data?.message?.adminData?.name}</h2>
          <p>{data?.message?.adminData?.bio}
          </p>
          <button className="links btn2" onClick={()=>navigate('/projects')}>Projects</button>
          <div className="socialMedia center">
            <FaLinkedin className="icon"/>
            <FaSquareInstagram className="icon"/>
            <FaSquareFacebook className="icon"/>
          </div>


        </div>
        <div className="rightPart">
          <ProfilePic src={data.message?.adminData?.profilePic?.url} />
        </div>
      </div>
    </div>
  );
}

export default HomeFace;
