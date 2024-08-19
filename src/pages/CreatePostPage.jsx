import { useRef, useState } from "react";
import mainStore from "../store/mainStore";
import http from "../plugins/http";
import { useNavigate } from "react-router-dom";

function CreatePostPage() {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const imageRef = useRef();
  const [error, setError] = useState("");
  const nav = useNavigate();
  const { user: myUser, token } = mainStore();

  async function createPost() {
    const post = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      image: imageRef.current.value,
    };

    const res = await http.postAuth("/createPost", post, token);

    if (!res.error) {
      nav("/allPosts");
    } else {
      setError(res.message);
    }
  }
  return (
    <div className="create-post-box  d-flex flex-column justify-content-between align-items-center">
      <div className="box-title">Create post</div>
      <div className="d-flex flex-column w-75">
        <div className="input-group">
          <span className="input-group-text w-25" id="basic-addon1">
            Title
          </span>
          <input
            type="text"
            className="form-control"
            ref={titleRef}
            min={3}
            max={20}
          />
        </div>
      </div>
      <div className="d-flex flex-column w-75">
        <div className="input-group">
          <span className="input-group-text w-25">Description</span>
          <textarea
            className="form-control"
            ref={descriptionRef}
            min={5}
            max={100}
          ></textarea>
        </div>
      </div>
      <div className="d-flex flex-column w-75">
        <div className="input-group">
          <span className="input-group-text w-25" id="basic-addon1">
            Image URL link
          </span>
          <input type="text" className="form-control" ref={imageRef} />
        </div>
      </div>
      <div className="error-msg">{error}</div>
      <button
        type="button"
        className="btn btn-outline-success"
        onClick={createPost}
      >
        Create Post
      </button>
    </div>
  );
}

export default CreatePostPage;
