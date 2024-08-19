import { useEffect, useRef, useState } from "react";
import http from "../plugins/http";
import mainStore from "../store/mainStore";
import EmojiPicker from "emoji-picker-react";

function ChatComponent({ selectedContact }) {
  const msgRef = useRef();
  const messagesEndRef = useRef(null);
  const { user, token } = mainStore();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [emojiMsg, setEmojiMsg] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (selectedContact) {
      fetchMessages();
    }
  }, [selectedContact]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  function handleEmojiPicker() {
    setShowEmojiPicker(!showEmojiPicker);
  }

  function handleEmojiClick(emojiObject, event) {
    setEmojiMsg((prevEmojiMsg) => prevEmojiMsg + emojiObject.emoji);
  }

  const sendMessage = async () => {
    const msg = {
      receiver: selectedContact.username,
      message: msgRef.current.value,
      sender: user.username,
    };
    const res = await http.postAuth("/sendMessage", msg, token);
    if (res.data && !res.data.error) {
      msgRef.current.value = "";
      setEmojiMsg("");
      fetchMessages();
    } else {
      console.error(res.message);
    }
  };

  const fetchMessages = async () => {
    const res = await http.get(
      `/getMessages/${user.username}/${selectedContact.username}`,
      token
    );
    if (!res.error) {
      if (Array.isArray(res.data)) {
        setMessages(res.data);
      }
    } else {
      console.error("Error fetching messages:", res.message);
    }
  };

  return (
    <div className="chat-main-box">
      <div className="chat-header d-flex align-items-center gap-3">
        <img
          className=""
          src={selectedContact.image}
          alt={`${selectedContact.username} profile image`}
        />
        <div>{selectedContact.username}</div>
      </div>

      <div
        className="messages-box"
        style={{ display: "flex", flexDirection: "column" }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message d-flex flex-column ${
              message.from === user.username ? "sent" : "received"
            }`}
          >
            <div className="message-time">
              {new Date(message.time).toLocaleTimeString()}
            </div>
            <div className="background-color d-flex  gap-3 ">
              <div>
                {message.from !== user.username ? (
                  <div>
                    <img
                      src={selectedContact.image}
                      alt={`${selectedContact.username} profile image`}
                    />
                  </div>
                ) : (
                  <div>
                    <img
                      src={user.image}
                      alt={`${user.username} profile image`}
                    />
                  </div>
                )}
              </div>
              <div className="message-content">{message.message}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-box d-flex justify-content-evenly align-items-center">
        <div className="emoji-box">
          <div onClick={handleEmojiPicker} className="emoji">
            😊
          </div>
          {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}
        </div>
        <textarea
          ref={msgRef}
          placeholder="Enter your message"
          value={emojiMsg}
          onChange={(e) => setEmojiMsg(e.target.value)}
        ></textarea>
        <div>
          <span
            onClick={sendMessage}
            className="material-symbols-outlined send-btn"
          >
            send
          </span>
        </div>
      </div>
    </div>
  );
}

export default ChatComponent;
