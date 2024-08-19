import { useEffect, useState } from "react";
import mainStore from "../store/mainStore";
import http from "../plugins/http";
import { useNavigate } from "react-router-dom";
import CommentsComponent from "./CommentsComponent";
import MyFunctions from "../plugins/functions";

function ViewPostComponent({ data, setData }) {
  const nav = useNavigate();
  const { setAllPosts, user, token, updatePostLikes } = mainStore();
  const [likes, setLikes] = useState(data.postLikes.length);
  const [likedByUser, setLikedByUser] = useState(
    user ? data.postLikes.includes(user.secret) : false
  );
  const { fetchPosts, likePost, getLikeInfoText } = MyFunctions(data);

  useEffect(() => {
    fetchPosts();
  }, [setAllPosts]);

  const handleLikePost = () => {
    if (user) {
      likePost(data._id, user.username, token, (updatedPost) => {
        setLikes(updatedPost.postLikes.length);
        setLikedByUser(updatedPost.postLikes.includes(user.username));
        updatePostLikes(updatedPost._id, updatedPost.postLikes);
        if (setData) {
          setData(updatedPost);
        }
      });
    } else {
      console.error("User not logged in");
    }
  };

  return (
    <>
      <div
        key={data._id}
        className="single-post d-flex gap-2 justify-content-center  position-relative"
      >
        <div className="single-img-box">
          <img src={data.image} alt="" className="single-img" />
        </div>
        <div className="single-post-data">
          <div className="post-author">@ {data.author}</div>
          <div className="post-title-box">
            <div className="single-post-title d-flex align-items-center gap-3">
              <div className="post-author-mini-box ">
                {data.author.charAt(0)}
              </div>
              <div className="">
                <div className="post-main-title">{data.title}</div>
                <div className="">{data.description}</div>
              </div>
            </div>
          </div>
          <div className="comments-box">
            <div className="view-post-right-side">
              <CommentsComponent data={data} key={data._id} />
            </div>
          </div>
        </div>
        <div
          className="position-absolute top-100 start-50 translate-middle mt-4 mb-5 p-2 w-100"
          style={{
            backgroundColor: "white",
            borderRadius: "0 0 10px 10px",
            border: "1px solid lightgrey",
          }}
        >
          {user && user.username !== data.author ? (
            <div className={`post-actions ${likedByUser ? "like-bg" : ""}`}>
              <div className="like">
                <span
                  className="material-symbols-outlined like-btn"
                  onClick={handleLikePost}
                >
                  {likedByUser ? "thumb_down" : "thumb_up"}
                </span>
                <span className="like-info">
                  {getLikeInfoText(likes, likedByUser)}
                </span>
              </div>
            </div>
          ) : (
            <div className="post-bottom d-flex">
              <span className="like-info disable">
                {likes >= 1 ? (
                  <>{likes} people like your post</>
                ) : (
                  <>No likes yet</>
                )}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ViewPostComponent;
