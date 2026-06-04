import React from "react";
import "./PostCard.scss";
// import { RxReader } from "react-icons/rx"; Read more

function PostCard({ gData }) {
  const date = new Date(gData.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",

    month: "short",

    year: "numeric",
  });

  console.log(date);
  return (
    <div className="PostCard">
      <div className="postImg">
        <img src={gData.image.url} alt="Post pic" />
      </div>
      <div className="postCont">
        <h3>{gData.title}</h3>
        <div className="desc">
          <p>{gData.description}</p>
        </div>
        <div className="read">
          {/* <RxReader />
          <button className="links">Read More</button> */}
        </div>
        <p className="timeStamp">{date}</p>
      </div>
    </div>
  );
}

export default PostCard;
