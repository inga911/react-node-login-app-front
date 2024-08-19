import { useNavigate } from "react-router-dom";
import mainStore from "../store/mainStore";

function SingleUserComponent({ singleUser }) {
  const nav = useNavigate();
  const { user } = mainStore();

  return (
    <div
      className="user d-flex flex-column gap-2"
      style={{ cursor: "pointer" }}
    >
      <img src={singleUser.image} alt="" className="profile-img" />
      <h4 className="ms-3">{singleUser.username}</h4>
      <div>
        {user?.username === singleUser.username ? (
          "YOU"
        ) : (
          <button
            className="start-chat-btn"
            onClick={() => nav(`/chat/${singleUser.username}`)}
          >
            Start conversation
          </button>
        )}
      </div>
    </div>
  );
}

export default SingleUserComponent;
