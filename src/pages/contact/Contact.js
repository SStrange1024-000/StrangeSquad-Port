import React, { useState } from "react";
import "./Contact.scss";
import ProfilePic from "../../components/ProfilePic/ProfilePic";
import { axiosClient } from "../../Utilities/axiosClient";
import { RiSendPlaneFill } from "react-icons/ri"; 
import { useDispatch } from "react-redux";
import { setLoading } from "../../Redux/slices/appConfigSlice";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState("");
  const dispatch=useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      dispatch(setLoading(true))
      const messages = await axiosClient.post("/contact/", {
        name,
        email,
        subject,
        message,
      });
    

      setAlert(messages.message);

      // clear form fields

      
      setTimeout(() => {
        setAlert("");
      }, 3000);

      console.log(messages.message);
    } catch (er) {
      console.log(er);
      setAlert(" Failed to send message ");

      
      setTimeout(() => {
        setAlert("");
      }, 3000);
    }finally{
      dispatch(setLoading(false));
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    }
  }

  return (
    <div className="Contact center">
      <div className="leftPart">
        <div className="desc">
          <h2 className="title">Contact</h2>
          <p>Here, you can ask any questions, feedback and all.</p>
          <p>You can also ask here relate to projects and Deal reated query.</p>
          <p>We will send response on your email</p>
        </div>
        <div className="img">
          <ProfilePic />
        </div>
      </div>
      <div className="rightPart">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
          <textarea
            rows="5"
            cols="40"
            value={message}
            placeholder="Message..."
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button className="links btn1">Send <span><RiSendPlaneFill className="sendIcon" /></span></button>
          {alert && <h3 className="alert">{alert}</h3>}
        </form>
      </div>
    </div>
  );
}

export default Contact;
