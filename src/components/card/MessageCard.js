import React from "react";
import './Card.scss'
import { useDispatch } from "react-redux";
import { deleteMessage } from "../../Redux/slices/appConfigSlice";

function MessageCard(message) {
  const dispatch=useDispatch();

    const date=new Date(message?.message?.createdAt).toLocaleString("en-IN",{

      day: "numeric",

      month: "short",

      year: "numeric",

      hour: "numeric",

      minute: "2-digit",

      hour12: true

    })

    

  function handleDelete(){
    dispatch(deleteMessage(message.message?._id))
  }
  
  return (
    <div className="messageCard">
      <div className="msgCont">
        <div><h2>{message.message?.name} </h2> <p className="timeStamp">Date : {date}</p></div>
        <h3>{message.message?.email}</h3>
        <h3>Sub : <span>{message.message?.subject}</span></h3>
        <p>
          {message.message?.message}
        </p>
      </div>
      <div className="msgBtns">
        <button className="btn3" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default MessageCard;
