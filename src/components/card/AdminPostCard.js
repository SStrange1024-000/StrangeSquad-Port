import React from "react";
// import { MdDeleteForever } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deletePost} from "../../Redux/slices/appGallerySlice";

function AdminPostCard({ gData }) {
  const dispatch = useDispatch();

  const postId=gData?._id;

  function handleDeletePost(){
    dispatch(deletePost(postId))
  }

  const date = new Date(gData?.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",

    month: "short",

    year: "numeric",

    hour: "numeric",

    minute: "2-digit",

    hour12: true,
  });
  return (
    <div className="PostCard">
      <div className="postImg">
        <img src={gData?.image?.url} alt="posts pic" />
      </div>
      <div className="postCont">
        <h3>{gData?.title}</h3>
        <div className="desc2">
          <p>{gData?.description}</p>
          <p className="timeStamp2">
            <span>Created On : </span>
            {date}
          </p>
        </div>
        <div className="read">
          <button className="deleteBtn center" onClick={handleDeletePost}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default AdminPostCard;
