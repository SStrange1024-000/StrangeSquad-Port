import React from "react";
import "./Notes.scss";
import Card from "../../components/card/Card";
import PostCard from "../../components/card/PostCard";
import { useDispatch, useSelector } from "react-redux";
import { getMygallery } from "../../Redux/slices/appGallerySlice";
function Notes() {
  const notesTitle = [
    "HTML Notes",
    "CSS Notes",
    "JS Notes",
    "Python Notes",
    "Java Notes",
    "MySql",
  ];
  const galleryData = useSelector((state) => state.appGalleryReducer.myGallery);

  console.log(" this is gal", galleryData);

  return (
    <div className="Notes ">
      <div className="noteCont">
        <div className="projectHeader vertical">
          <h1>Gallery</h1>
          <p className="projectDesc">
            Expressing my journey through a visual lens. A curated space sharing
            the things I'm currently exploring, places I discover, and snapshots
            from recent events.
          </p>
        </div>
        <div className="noteListCont">
          <div className="notesList">
            {galleryData?.map((item) => {
              return <PostCard key={item._id} gData={item} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notes;
