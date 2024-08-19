import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import http from "../plugins/http";
import mainStore from "../store/mainStore";
import MyFunctions from "../plugins/functions";

function GetUserPage() {
  const [user, setUser] = useState(null);
  const [gotMessages, setGotMessages] = useState([]);
  const { username } = useParams();
  const nav = useNavigate();
  const msgRef = useRef();
  const { user: myUser, token } = mainStore();
  const { formatTime } = MyFunctions();

  useEffect(() => {
    getUser();
    fetchMessages();
  }, [username]);

  async function getUser() {
    const res = await http.get(`/getUser/${username}`);
    if (!res.error) {
      setUser(res.data);
    } else {
      console.error(res.message);
    }
  }

  async function fetchMessages() {
    const res = await http.get(`/getMessages/${username}`, token);
    if (!res.error) {
      setGotMessages(res.data);
    } else {
      console.error(res.message);
    }
  }

  const sendMessage = async () => {
    const msg = {
      receiver: user.username,
      message: msgRef.current.value,
      sender: myUser.username,
    };
    const res = await http.postAuth("/sendMessage", msg, token);
    if (res.data && !res.data.error) {
      fetchMessages();
      msgRef.current.value = "";
    } else {
      console.error(res.message);
    }
  };

  const filteredMessages = gotMessages.filter(
    (msg) =>
      (msg.from === myUser.username && msg.to === user.username) ||
      (msg.to === myUser.username && msg.from === user.username)
  );

  const combinedMessages = filteredMessages.sort(
    (a, b) => new Date(a.time) - new Date(b.time)
  );

  return (
    <div className="user-detail p-5 text-center">
      {user ? (
        <>
          <h1>{user.username}</h1>
          <img
            src={user.image}
            alt={`${user.username}'s profile`}
            className="profile-img"
          />
        </>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}

export default GetUserPage;
