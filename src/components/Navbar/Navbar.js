import React, {useState } from "react";
import "./Navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoOptionsSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { getItem, KEY_ACCESS_TOKEN } from "../../Utilities/localStorage";
// import { FaBedPulse } from "react-icons/fa6";

function Navbar() {
  const [clicked, setClicked] = useState(false);
  const navigate=useNavigate();
  const getUser=getItem(KEY_ACCESS_TOKEN);
  const uData=useSelector((state)=>state.appProfileReducer.myProfile);


  function handleUser(){
    if(getUser){
      navigate("/dashboard");
      window.scrollTo(0, 0);
    }
  }
  
  const handleMobNav = () => {
    setClicked(prev => !prev);
  };
  return (
    <div className="Navbar">
      <div className="leftPart">
        <Link to="/" className="links">
          <h1 className="logo">StrangeSquad</h1>
        </Link>
      </div>
      <div className="rightPart">
        <div className="option" onClick={handleMobNav}>
          {clicked?<IoClose/>:<IoOptionsSharp />}
        </div>
        <div className={clicked ? "mobileLink" : "link"}>
          <Link to="/" className="home links" onClick={(e)=>setClicked(false)}>
            {" "}
            <FaHome />
          </Link>
          <Link to="/projects" className="links" onClick={(e)=>setClicked(false)}>
            {" "}
            Projects
          </Link>
          {/* <Link to='/posts' className='links'> Posts</Link> */}
          <Link to="/notes" className="links" onClick={(e)=>setClicked(false)}>
            {" "}
            Gallery
          </Link>
          <Link to="/about" className="links" onClick={(e)=>setClicked(false)}>
            {" "}
            About
          </Link>
          <Link to="/contact" className="links" onClick={(e)=>setClicked(false)}>
            {" "}
            Contact
          </Link>
        </div>
        {!getUser && <Link to="/login" className="links center" id="btn2" >
          Login
        </Link>}
        {getUser && <div className="userAvatar" onClick={handleUser}> <img src={uData?.message?.adminData?.profilePic?.url} alt="avatar" /></div>}
      </div>
    </div>
  );
}

export default Navbar;
