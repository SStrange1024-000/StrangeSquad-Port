import React from "react";
import ProfilePic from "../../components/ProfilePic/ProfilePic";
import "./PnGSection.scss";
import { useSelector } from "react-redux";

function PnGSection() {
  const postData = useSelector((state) => state.appGalleryReducer.myGallery);
  const [firstData, secondData] = postData;
  const fDate = new Date(firstData?.createdAt).toLocaleString("en-IN", {
    day: "numeric",

    month: "short",

    year: "numeric",

      hour: "numeric",

      minute: "2-digit",

      hour12: true
  });
  const sDate = new Date(secondData?.createdAt).toLocaleString("en-IN", {
    day: "numeric",

    month: "short",

    year: "numeric",

      hour: "numeric",

      minute: "2-digit",

      hour12: true
  });
  console.log("This galleery", postData);

  return (
    <div className="PnGSection">
      <div className="head">
        <h1 className="heading">Events and Gallery</h1>
      </div>
      <div className="cont">
        <div className="left">
          <div className="top">
            <ProfilePic src={firstData?.image?.url}/>
          </div>
          <div className="bottom">
            <h4 className="subHeading">{firstData?.title}</h4>
            <p className="desc">{firstData?.description}</p>
            <div className="timeStamp">
              <p>{fDate}</p>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="top">
            <ProfilePic src={secondData?.image?.url} />
          </div>
          <div className="bottom">
            <h4 className="subHeading">{secondData?.title}</h4>
            <p className="desc">
                {secondData?.description}
            </p>
            <div className="timeStamp">
              <p>{sDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PnGSection;
