import { useRef, useState } from "react";
import mainStore from "../store/mainStore";
import http from "../plugins/http";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const usernameRef = useRef();
  const passRef = useRef();
  const nav = useNavigate();

  const [error, setError] = useState("");
  const { setUser, setToken, setSavedPosts } = mainStore();

  async function auth(event) {
    event.preventDefault();
    setError("");
    const user = {
      username: usernameRef.current.value,
      password: passRef.current.value,
    };

    try {
      const res = await http.post("/login", user);
      if (res.error) {
        return setError(res.message);
      } else {
        setUser(res.data.user);
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        setSavedPosts(res.data.user.savedPosts);
        await fetchSavedPosts(res.data.user._id, res.data.token);
        nav("/profile");
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError("Failed to login. Please try again.");
    }
  }

  async function fetchSavedPosts(userID, token) {
    const res = await http.postAuth("/getSavedPosts", { userID }, token);
    if (res.data) {
      setSavedPosts(res.data);
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your username
                </div>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  ref={usernameRef}
                  autoComplete="username"
                />
              </div>
              <div>
                <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </div>
                <input
                  type="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  ref={passRef}
                  autoComplete="current-password"
                />
              </div>
              <div className="flex items-center justify-between"></div>
              <div>{error}</div>
              <button
                type="submit"
                onClick={auth}
                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Login
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  href="/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Register
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
