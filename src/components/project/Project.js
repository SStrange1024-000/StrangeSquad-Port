import React from 'react'
import './Project.scss'
import ProfilePic from '../ProfilePic/ProfilePic'

function Project({pData}) {
    console.log("This is cp", pData);

    const formatTime=new Date(pData.createdAt).toLocaleString("en-IN",{

      day: "numeric",

      month: "short",

      year: "numeric",

    //   hour: "numeric",

    //   minute: "2-digit",

    //   hour12: true

    })
    
  return (
    <div className="Project center">
        <div className="projectCont">
            <div className="leftPart">
                <div className="projectImg vertical">
                    <ProfilePic src={pData?.image?.url}/>
                </div>
                <h1 className="projectName">{pData?.projectName}</h1>
            </div>
            <div className="middlePart vertical">
                <h2>Description</h2>
                <p>
                    {pData?.description}
                </p>
                {/* <p>
                   Project Link : Lorem ipsum dolor sit amet.
                </p> */}
            </div>
            <div className="rightPart vertical">
                <h2>Technology Used</h2>
                <p>
                    {pData?.technologies}
                </p>
            </div>
            <div className="time">
                <p>{formatTime}</p>
            </div>
        </div>
    </div>
  )
}

export default Project