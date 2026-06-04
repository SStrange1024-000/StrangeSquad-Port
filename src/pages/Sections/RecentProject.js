import React from 'react'
import ProfilePic from '../../components/ProfilePic/ProfilePic';
import './RecentProject.scss'
import { useSelector } from 'react-redux';

function RecentProject() {
    const projectData=useSelector((state)=>state.appProjectReducer.myProjects);
    const [latestPData]=projectData?.projects || [];

    const date=new Date(latestPData?.createdAt).toLocaleString("en-IN",{

      day: "numeric",

      month: "short",

      year: "numeric",

    //   hour: "numeric",

    //   minute: "2-digit",

    //   hour12: true

    })
 
    console.log("Single project", latestPData);
    
  return (
    <div className='RecentProject'>
        <div className="top">
            <h1 className="heading">Recent Project Overview</h1>
        </div>
        <div className="bottom">
            <div className="left"><ProfilePic src={latestPData?.image?.url}/></div>
            <div className="right">
                <h3>{latestPData?.projectName}</h3>
                <p className='tech'><span className='bold'>Technologies : </span>{latestPData?.technologies}</p>
                <p>
                    {latestPData?.description}
                </p>
                <p><span className='bold'>Created On : </span>{date}</p>
            </div>
        </div>
    </div>
  )
}

export default RecentProject