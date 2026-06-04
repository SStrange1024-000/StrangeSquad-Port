import React, { useEffect, useState } from "react";
import "./DashBoard.scss";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { KEY_ACCESS_TOKEN, removeItem } from "../../Utilities/localStorage";
import MessageCard from "../../components/card/MessageCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllmessages, setLoading } from "../../Redux/slices/appConfigSlice";
import { myProfile, myProfileUpdate, myPublicInfo } from "../../Redux/slices/appProfileSlice";
import { axiosClient } from "../../Utilities/axiosClient";
import { getMyProjects } from "../../Redux/slices/appProjectSlice";
import ProjectAdminCard from "../../components/card/ProjectAdminCard";
import { RiImageAddLine } from "react-icons/ri";
import AdminPostCard from "../../components/card/AdminPostCard";
import { getMygallery } from "../../Redux/slices/appGallerySlice";

function DashBoard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(myProfile());
  }, [dispatch]);


  const handleLogout = () => {
    removeItem(KEY_ACCESS_TOKEN);
    navigate("/", { replace: true });
    dispatch(myPublicInfo())
  };
  return (
    <div className="DashBoard">
      <h1 className="title">Admin Dashboard</h1>
      <div className="container">
        <div className="leftPart">
          <NavLink to="/dashboard/profile" className="links">
            <h2>Profile</h2>
          </NavLink>
          <NavLink to="/dashboard/preview" className="links">
            {/* Fixed path */}
            <h2>Info</h2>
          </NavLink>
          <NavLink to="/dashboard/postEvent" className="links">
            <h2>Gallery</h2>
          </NavLink>
          <NavLink to="/dashboard/postProject" className="links">
            <h2>Project</h2>
          </NavLink>
          <NavLink to="/dashboard/postNote" className="links">
            <h2>Add Note</h2>
          </NavLink>
          {/* Fixed duplicate links */}
          <NavLink to="/dashboard/deletePage" className="links">
            <h2>Delete</h2>
          </NavLink>
          <button onClick={handleLogout} className="deleteBtn">
            Logout
          </button>
        </div>
        <div className="rightPart">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashBoard;

export function ProjectPost() {
  const [projectName, setPname] = useState("");
  const [description, setPdesc] = useState("");
  const [techName, setPtech] = useState("");
  const [postImg, setImage] = useState("");
  const [alert, setAlert] = useState("");
  const dispatch = useDispatch();

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const result = await axiosClient.post("/post/addProject", {
        projectName,
        description,
        techName,
        postImg,
      });

      setPname("");
      setPdesc("");
      setPtech("");
      setImage("");

      dispatch(getMyProjects());
      console.log(" Create project ", result);

      setAlert(result?.message);
      setTimeout(() => {
        setAlert("");
      }, 3000);
      return result;
    } catch (e) {
      console.log("Project Post failed", e);
      setAlert("Create Project Failed");
      setTimeout(() => {
        setAlert("");
      }, 3000);
    } finally {
      dispatch(setLoading(false));
    }
  };

  function onChangeHandleFile(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader();

    try {
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        if (fileReader.readyState === fileReader.DONE) {
          setImage(fileReader.result);
        }
      };
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="ProjectPost">
      <div className="projectCont">
        <h2>Add New Projects</h2>
        <form onSubmit={handleCreateProject}>
          <label
            htmlFor="img1"
            className={!postImg ? "insertImg" : "LoadedImage"}
          >
            <div className="icon center">
              <RiImageAddLine />
            </div>
            <img src={postImg} alt="" />
          </label>
          <input
            type="file"
            name="img"
            accept=".png,.jpg,.jpeg,.webp"
            id="img1"
            className="imgInput"
            onChange={onChangeHandleFile}
          />
          <input
            type="text"
            placeholder="Project Name"
            className="inpStyle"
            value={projectName}
            onChange={(e) => setPname(e.target.value)}
          />
          {/* <input
            type="text"
            placeholder="Project Description"
            className="inpStyle"
            value={description}
            onChange={(e) => setPdesc(e.target.value)}
          /> */}
          <textarea
            className="inpStyle"
            placeholder="Project Description"
            rows={6}
            value={description}
            onChange={(e) => setPdesc(e.target.value)}
          ></textarea>
          <input
            type="text"
            placeholder="Technology Used"
            className="inpStyle"
            value={techName}
            onChange={(e) => setPtech(e.target.value)}
          />
          <button className="links btn1" onClick={handleCreateProject}>
            Post
          </button>
          {alert && <h3 className="alert">{alert}</h3>}
        </form>
      </div>
    </div>
  );
}

export function PostNote() {
  const [inpImage, setImage] = useState("");

  function onChangeHandleFile(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setImage(fileReader.result);
      }
    };
  }
  return (
    <div className="ProjectPost">
      <div className="projectCont">
        <h2>Profile</h2>
        <form>
          <label
            htmlFor="img2"
            className={!inpImage ? "insertImg" : "LoadedImage"}
          >
            <div className="icon center">
              <RiImageAddLine />
            </div>
            <img src={inpImage} alt=""/>
          </label>
          <input
            type="file"
            name="img"
            id="img2"
            className="imgInput"
            onChange={onChangeHandleFile}
          />
          <input type="text" placeholder="Note Title" className="inpStyle" />
          <input type="text" placeholder="Note Status" className="inpStyle" />
          <input type="text" placeholder="Conclusion" className="inpStyle" />
          <button className="links btn1">Post</button>
        </form>
      </div>
    </div>
  );
}

// Gallery
export function PostEvent() {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [alert, setAlert] = useState("");
  const dispatch = useDispatch();

  async function handleCreatePost(e) {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const result = await axiosClient.post("/post/addPost", {
        title,
        image,
        description,
      });

      console.log("Gallery result", result);

      setAlert(result?.message);
      dispatch(getMygallery());
      setTimeout(() => {
        setAlert("");
      }, 4000);

      return result;
    } catch (e) {
      setAlert("Adding Post Failed");
      setTimeout(() => {
        setAlert("");
      }, 4000);
      console.log(e);
    } finally {
      dispatch(setLoading(false));
      setDescription("");
      setImage("");
      setTitle("");
    }
  }

  function onChangeHandleFile(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setImage(fileReader.result);
      }
    };
  }
  return (
    <div className="ProjectPost">
      <div className="projectCont">
        <h2>Gallery</h2>
        <form onSubmit={handleCreatePost}>
          <label
            htmlFor="img3"
            className={!image ? "insertImg" : "LoadedImage"}
          >
            <div className="icon center">
              <RiImageAddLine />
            </div>
            <img src={image} accept=".png,.jpg,.jpeg,.webp" alt="" />
          </label>
          <input
            type="file"
            name="img"
            id="img3"
            className="imgInput"
            onChange={onChangeHandleFile}
          />
          <input
            type="text"
            placeholder="Post Name"
            value={title}
            className="inpStyle"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            type="text"
            placeholder="Event Description"
            rows={5}
            className="inpStyle"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button className="links btn1">Post</button>
          {alert && <h3 className="alert">{alert}</h3>}
        </form>
      </div>
    </div>
  );
}

//  Get Information Preview

export function Preview() {
  const allMessage = useSelector(
    (state) => state.appConfigReducer.allMessages || [],
  );
  const gallaryData = useSelector(
    (state) => state.appGalleryReducer.myGallery || [],
  );
  const projectData = useSelector(
    (state) => state.appProjectReducer.myProjects || {},
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllmessages());
  }, [dispatch]);

  console.log("This is preview", allMessage);

  return (
    <div className="Preview">
      <h1>Information</h1>
      <div className="content">
        <div className="topContainer">
          <div className="box">
            <h3>Total Projects</h3>
            <p className="desc">{projectData?.projects?.length || 0}</p>
          </div>
          <div className="box">
            <h3>Total Posts</h3>
            <p className="desc">{gallaryData?.length || 0}</p>
          </div>
        </div>
        <div className="bottomContainer">
          <div className="leftCont">{/* <h3>Visits</h3> */}</div>
          <div className="rightCont">
            <div className="messages">
              <h3 className="msg">
                All Messages{" "}
                <span className="msgCount">{allMessage?.length || 0} </span>
              </h3>

              <div className="msgList">
                {allMessage?.length < 1
                  ? " Empty Message Box"
                  : allMessage.map((item) => (
                      <MessageCard key={item._id} message={item} />
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Profile

export function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [Mob, setMob] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [newProfilePic, setNewProfilePic] = useState("");
  const dispatch = useDispatch();
  const myInfo = useSelector((state) => state.appProfileReducer.myProfile);

  console.log("this is my profile", myInfo?.message);

  useEffect(() => {
    setName(myInfo.message?.adminData?.name);
    setBio(myInfo?.message?.adminData?.bio);
    setEmail(myInfo?.message?.adminData?.email);
    setProfilePic(myInfo?.message?.adminData?.profilePic?.url);
  }, [myInfo]);

  function handleSubmit(e) {
    e.preventDefault();

    const body = {
      name,
      bio,
    };

    if (newProfilePic) {
      body.profilePic = newProfilePic;
    }

    dispatch(myProfileUpdate(body));
  }

  function handleImage(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setProfilePic(fileReader.result);
        setNewProfilePic(fileReader.result);
      }
    };
  }

  return (
    <form onSubmit={handleSubmit} className="profile-card">
      <div className="profile-header">
        <label htmlFor="img3" className="profile-avatar-container">
          <img className="profile-avatar" src={profilePic} alt="avatar" />
          <div className="edit-icon">✎</div>
        </label>
        <input
          type="file"
          name="avatar"
          accept=".png,.jpg,.jpeg,.webp"
          id="img3"
          className="avatar"
          onChange={handleImage}
        />

        <div className="profile-info">
          <div className="name">{name}</div>
          <div className="email">{bio}</div>
        </div>
      </div>

      <div className="profile-row">
        <label htmlFor="name" className="label">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          className="value"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="profile-row">
        <label htmlFor="bio" className="label">
          Bio
        </label>
        <textarea
          id="bio"
          value={bio}
          rows="6"
          className="value"
          onChange={(e) => setBio(e.target.value)}
        />
      </div>
      <div className="profile-row">
        <label htmlFor="mob" className="label">
          Mobile number{Mob}
        </label>
        <input
          type="phone"
          id="mob"
          className="value"
          placeholder="Enter Mobile Number"
          onChange={(e) => setMob(e.target.value)}
        />
      </div>
      <div className="profile-row">
        <label htmlFor="email" className="label">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          className="value"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button className="save-btn" onClick={handleSubmit}>
        Save Change
      </button>
    </form>
  );
}

// Delete projects and posts

export function DeleteComponent() {
  const projectData = useSelector(
    (state) => state.appProjectReducer.myProjects,
  );
  const gallaryData = useSelector((state) => state.appGalleryReducer.myGallery);
  const [active, setActive] = useState("");

  return (
    <div className="DeleteComponent">
      <div className="topPart">
        <div className="heading">
          <h2>Delete</h2>
        </div>
        <div className="headCont">
          <div>
            <button
              className="btn1 links"
              onClick={(e) => setActive("project")}
            >
              Project
            </button>
            <button
              className="btn1 links"
              onClick={(e) => setActive("gallery")}
            >
              Gallery
            </button>
          </div>
          <div>
            <p>
              Total Projects : <span>{projectData?.projects?.length}</span>
            </p>
            <p>
              Total Gallery : <span>{gallaryData?.length}</span>
            </p>
          </div>
        </div>
      </div>
      <hr />
      <div className="bottomPart">
        {active === "project" &&
          projectData?.projects?.map((item) => {
            return <ProjectAdminCard key={item._id} pData={item} />;
          })}

        {active === "gallery" &&
          gallaryData.map((item) => {
            return <AdminPostCard key={item._id} gData={item} />;
          })}
        {active === "" && (
          <div>
            <h2>Admin Instruction</h2>
            <h3>To delete a project from the Admin Panel:</h3>
            <ol
              style={{
                listStyleType: "disc",
                paddingLeft: "20px",
                marginTop: "12px",
              }}
            >
              <li>Click on the project you want to manage.</li>
              <li>
                Open <b>Your Projects.</b>
              </li>
              <li>
                Click the <b>Delete button</b> next to the project.
              </li>
              <li>
                <b>Project Deleted Successfully</b>
              </li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
