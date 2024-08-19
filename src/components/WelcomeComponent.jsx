import mainStore from "../store/mainStore";

function WelcomeComponent() {
  const { user } = mainStore();
  return (
    <div className="welcome">
      <img
        src="https://raw.githubusercontent.com/koolkishan/chat-app-react-nodejs/master/public/src/assets/robot.gif"
        alt=""
      />
      <div style={{ fontSize: "20px" }}>
        Welcome,
        {user ? <span style={{ color: "#AEF0A3" }}>{user.username}!</span> : ""}
      </div>
      {user ? (
        <div>Please select chat friend to start conversation</div>
      ) : (
        <div>
          Please log in to start conversation{" "}
          <a href="/login" className="login-link">
            Login
          </a>
        </div>
      )}
    </div>
  );
}

export default WelcomeComponent;
