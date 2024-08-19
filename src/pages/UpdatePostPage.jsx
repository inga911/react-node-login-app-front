import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import useMainStore from "../store/mainStore";
import http from "../plugins/http";

function UpdatePostPage() {
  const { user, token } = useMainStore();
  const { username, id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const postData = location.state.data;

  const [title, setTitle] = useState(postData.title);
  const [description, setDescription] = useState(postData.description);
  const [image, setImage] = useState(postData.image);

  async function handleUpdatePost() {
    if (!user) {
      console.error("User not logged in");
      return;
    }

    const updateData = {
      title,
      description,
      image,
    };

    const res = await http.postAuth(
      `/updatePost/${username}/${postData._id}`,
      updateData,
      token
    );
    if (!res.error) {
      navigate(`/post/${username}/${id}`);
    } else {
      console.error("Error updating post:", res.message);
    }
  }

  return (
    <div className="create-post-box  d-flex flex-column justify-content-between align-items-center">
      <div className="box-title">Update post</div>
      <div className="d-flex flex-column w-75">
        <div className="input-group">
          <span className="input-group-text w-25" id="basic-addon1">
            Title
          </span>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>
      <div className="d-flex flex-column w-75">
        <div className="input-group">
          <span className="input-group-text w-25">Description</span>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="d-flex flex-column w-75">
        <div className="input-group">
          <span className="input-group-text w-25" id="basic-addon1">
            Image URL link
          </span>
          <input
            type="text"
            className="form-control"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
      </div>
      <button onClick={handleUpdatePost}>Update Post</button>
    </div>
  );
}

export default UpdatePostPage;
