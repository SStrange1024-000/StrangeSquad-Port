import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Contact from "./pages/contact/Contact";
import Footer from "./pages/footer/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Projects from "./pages/project/Projects";
import About from "./pages/About/About";
import Notes from "./pages/Notes/Notes";
import Login from "./pages/login/Login";
import Signup from "./pages/login/Signup";
import LoadingBar from "react-top-loading-bar";
import DashBoard, {
  PostNote,
  PostEvent,
  ProjectPost,
  Preview,
  Profile,
  DeleteComponent,
} from "./pages/DashBoard/DashBoard";
import ProtectedRoute from "./components/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { myProfile, myPublicInfo } from "./Redux/slices/appProfileSlice";
import { getMyProjects } from "./Redux/slices/appProjectSlice";
import { getMygallery } from "./Redux/slices/appGallerySlice";

function App() {
  const isLoading=useSelector(state=>state.appConfigReducer.isLoading)
  const loadingRef=useRef(null);
  const dispatch=useDispatch();

  useEffect(()=>{
    if(isLoading){
      loadingRef.current?.continuousStart();
    }else{
      loadingRef.current?.complete();
    }
  }, [isLoading])

  
  useEffect(()=>{
    dispatch(myPublicInfo())
    dispatch(getMyProjects())
    dispatch(getMygallery())
  },[])



  return (
    <div>
      <LoadingBar color="rgb(11, 207, 233)" height={3} ref={loadingRef} shadow={true} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        >
          {/* These will render inside Dashboard's <Outlet /> */}
          <Route path="/dashboard" element={<DashBoard />}>
            <Route path="/dashboard/preview" element={<Preview />} />{" "}
            {/* /dashboard */}
            <Route path="/dashboard/postProject" element={<ProjectPost />} />
            <Route path="/dashboard/postNote" element={<PostNote />} />
            <Route path="/dashboard/postEvent" element={<PostEvent />} />
            <Route path="/dashboard/profile" element={<Profile/>}/>
            <Route path="/dashboard/deletePage" element={<DeleteComponent/>}/>
          </Route>
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
