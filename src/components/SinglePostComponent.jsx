import { useEffect, useState } from "react";
import mainStore from "../store/mainStore";
import http from "../plugins/http";
import { useNavigate } from "react-router-dom";
import MyFunctions from "../plugins/functions";

function SinglePostComponent({ data, setData }) {
  const {
    user,
    token,
    savedPosts,
    setSavedPosts,
    setAllPosts,
    updatePostLikes,
  } = mainStore();
  const [likes, setLikes] = useState(data.postLikes.length);
  const [likedByUser, setLikedByUser] = useState(
    user ? data.postLikes.includes(user.username) : false
  );
  const nav = useNavigate();
  const { fetchPosts, likePost, getLikeInfoText } = MyFunctions();
  const [savedPost, setSavedPost] = useState(false);

  useEffect(() => {
    if (user && Array.isArray(savedPosts)) {
      const isPostSaved = savedPosts.some((x) => x._id === data._id);
      setSavedPost(isPostSaved);
    }
  }, [user, savedPosts, data._id]);

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

  async function removePost(post) {
    const dataRemove = {
      id: post._id,
      username: post.author,
    };

    const res = await http.postAuth("/deletePost", dataRemove, token);
    setSavedPosts(res.data);
    if (setData) {
      setData(null);
    } else {
      setAllPosts(res.data);
    }
    nav(`/allPosts`);
  }

  async function savePost() {
    const res = await http.postAuth("/savePost", { postID: data._id }, token);

    if (!res.error) {
      setSavedPosts(res.data);
      setSavedPost(res.data.includes(data._id));
    }
  }

  const shorterTitle = (title) => {
    if (title.length > 20) {
      return `${title.substring(0, 20)}... `;
    }
    return title;
  };

  return (
    <div className="post" key={data._id}>
      <div className="fav-bookmark-box" onClick={() => savePost()}>
        <span
          className={`material-symbols-outlined bookmark ${
            savedPost ? "saved-post" : ""
          }`}
        >
          bookmark
        </span>
      </div>
      <div
        className="post-title"
        onClick={() => nav(`/post/${data.author}/${data._id}`)}
      >
        {data.title}
      </div>
      <div className="post-img-box">
        <img
          className="post-img"
          src={data.image}
          alt={data.title}
          onClick={() => nav(`/post/${data.author}/${data._id}`)}
        />
      </div>
      <div className="post-author" onClick={() => nav(`/posts/${data.author}`)}>
        By {data.author}
      </div>
      <div className="post-description">{shorterTitle(data.description)}</div>
      <div className="post-action-buttons d-flex  gap-3">
        {user && user.username === data.author ? (
          <>
            <button
              className="btn btn-outline-warning"
              onClick={() =>
                nav(`/updatePost/${data.author}/${data._id}`, {
                  state: { data },
                })
              }
            >
              Update
            </button>
            <button
              className="btn btn-outline-danger"
              onClick={() => removePost(data)}
            >
              delete
            </button>
          </>
        ) : (
          ""
        )}
      </div>
      <div className="post-bottom">
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
            <span
              className="comments-info"
              onClick={() => nav(`/post/${data.author}/${data._id}`)}
            >
              <span className="material-symbols-outlined">forum</span>
              {data.comments.length}
            </span>
          </div>
        ) : (
          <div className="post-bottom post-actions d-flex">
            <span className="like-info disable">
              {likes >= 1 ? (
                <>{likes} people like your post</>
              ) : (
                <>No likes yet</>
              )}
            </span>
            <span
              className="comments-info"
              onClick={() => nav(`/post/${data.author}/${data._id}`)}
            >
              <span className="material-symbols-outlined">forum</span>
              {data.comments.length}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default SinglePostComponent;
