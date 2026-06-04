import React from "react";
import "./Notes.scss";
import PostCard from "../../components/card/PostCard";
import { useSelector } from "react-redux";
function Notes() {
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
