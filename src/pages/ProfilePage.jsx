import React, { useEffect, useRef, useState } from "react";
import mainStore from "../store/mainStore";
import http from "../plugins/http";
import { Link, useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user, setUser, token } = mainStore();

  const imageRef = useRef();
  const usernameRef = useRef();
  const [errorImg, setErrorImg] = useState("");
  const [errorName, setErrorName] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    if (imageRef.current) imageRef.current.value = "";
    if (usernameRef.current) usernameRef.current.value = "";
  }, [user]);

  async function updatePicture() {
    const data = {
      image: imageRef.current.value,
    };

    try {
      const res = await http.postAuth("/updateImage", data, token);
      if (res.error) {
        return setErrorImg(res.message);
      }
      setUser(res.data);
      imageRef.current.value = "";
    } catch (error) {
      setErrorImg("Failed to update image. Please try again.");
    }
  }

  async function updateUsername() {
    const data = {
      username: usernameRef.current.value,
    };

    try {
      const res = await http.postAuth("/updateUsername", data, token);
      if (res.error) {
        return setErrorName(res.message);
      }
      setUser(res.data);
      usernameRef.current.value = "";
    } catch (error) {
      console.error("Error updating username:", error);
      setErrorName("Failed to update username. Please try again.");
    }
  }

  function logout() {
    setUser(null);
    nav("/");
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile p-5">
      <div className="user-toolbar d-flex gap-5 justify-content-center mb-5">
        <Link to={`/posts/${user.username}`} className="user-profile-link">
          myPosts
        </Link>
        <Link to="/createPost" className="user-profile-link">
          +Post
        </Link>

        <Link className="user-profile-link d-flex" to="/" onClick={logout}>
          <span className="material-symbols-outlined">logout</span>
          Logout
        </Link>
      </div>
      <div className="profile-data">
        <div className="my-profile-title">My profile</div>
        <div className="d-flex gap-5">
          <img src={user.image} alt="" className="profile-img" />

          <table className="table table-borderless">
            <tbody>
              <tr>
                <th scope="row">Name</th>
                <td>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      ref={usernameRef}
                      placeholder="New username"
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={updateUsername}
                    >
                      Change
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">Profile image</th>
                <td>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      ref={imageRef}
                      placeholder="Enter new profile image url link"
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={updatePicture}
                    >
                      Change
                    </button>
                  </div>
                  <div className="ms-2">
                    {errorImg && <small>{errorImg}</small>}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
