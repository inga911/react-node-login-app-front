import { useEffect, useRef, useState } from "react";
import http from "../plugins/http";
import mainStore from "../store/mainStore";
import MyFunctions from "../plugins/functions";

function CommentsComponent({ data }) {
  const { user, comments, setComments, token } = mainStore();
  const contentRef = useRef();
  const [error, setError] = useState("");
  const { formatTime } = MyFunctions();

  useEffect(() => {
    fetchComments();
  }, [data._id]);

  async function comment() {
    const content = contentRef.current.value.trim();
    if (!content) {
      setError("Content is required.");
      return;
    }
    const newComment = {
      commentAuthor: user.username,
      content: contentRef.current.value,
      id: data._id,
    };
    try {
      setError("");
      const res = await http.postAuth("/comment", newComment, token);
      if (!res.error) {
        setComments((prevComments) => [...prevComments, res.data]);
        fetchComments();
        contentRef.current.value = "";
      } else {
        setError(res.message);
      }
    } catch (error) {
      setError("An error occurred while posting the comment.");
      console.error(error);
    }
  }
  async function fetchComments() {
    const res = await http.get(`/getComments/${data._id}`);
    if (!res.error) {
      if (Array.isArray(res.data)) {
        setComments(res.data);
      }
    } else {
      console.error("Error fetching comments:", res.message);
    }
  }

  return (
    <div className="comments-box">
      <div className="all-comments">
        {Array.isArray(comments) &&
          comments.map((comment, index) => (
            <div className="post-title-box" key={index}>
              <div className="single-post-title d-flex align-items-center gap-3">
                <div className="post-author-mini-box ">
                  {comment.author.charAt(0)}
                </div>
                <div className="post-title">
                  <small className="full-author-name">
                    <b>{comment.author}</b>{" "}
                    <span className="comment-date">
                      {formatTime(comment.time)}
                    </span>
                  </small>
                  <div className="comment">{comment.content}</div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div>{error}</div>
      <div className="comment-input d-flex align-items-center">
        <textarea
          ref={contentRef}
          placeholder={
            user
              ? "Your comment.."
              : "You have to login first for write comment"
          }
        ></textarea>
        {user && <button onClick={comment}>Comment</button>}
      </div>
    </div>
  );
}

export default CommentsComponent;
