import { Link, useNavigate } from "react-router-dom";
import mainStore from "../store/mainStore";
import { useState } from "react";

function Toolbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { user, setUser, savedPosts, setSavedPosts, setToken } = mainStore();
  const nav = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken("");
    setUser(null);
    setSavedPosts([]);
    nav("/");
  }
  const handleMenuToggle = () => {
    setToggleMenu((prevToggleMenu) => !prevToggleMenu);
  };

  return (
    <div className="toolbar d-flex gap-4 justify-content-end align-items-center p-3">
      <Link to="/">All users</Link>
      <Link to="/allPosts">All posts</Link>
      <Link to="/chat">Chat</Link>
      {!user && <Link to="/login">Login</Link>}
      {!user && <Link to="/register">Register</Link>}
      {user && <Link to={`/savedPosts`}>Saved Posts({savedPosts.length})</Link>}
      {user && (
        <>
          <div
            className="logged-user d-flex align-content-center gap-1 action"
            onClick={handleMenuToggle}
          >
            <div className="profile d-flex gap-1">
              <span className="material-symbols-outlined">account_circle</span>
              {user.username}
              <span className="material-symbols-outlined">arrow_drop_down</span>
            </div>
            <div className={`menu ${toggleMenu ? "active" : ""}`}>
              <ul>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to={`/posts/${user.username}`}>myPosts</Link>
                </li>
                <li>
                  <Link to="/createPost">+Post</Link>
                </li>

                <li>
                  <a
                    className="action-btn d-flex align-content-center"
                    href="/"
                    onClick={logout}
                  >
                    <span className="material-symbols-outlined">logout</span>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Toolbar;
