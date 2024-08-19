import { useRef, useState } from "react";
import http from "../plugins/http";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const usernameRef = useRef();
  const passOneRef = useRef();
  const passTwoRef = useRef();
  const nav = useNavigate();

  const [error, setError] = useState("");

  async function auth(event) {
    event.preventDefault();
    const user = {
      username: usernameRef.current.value,
      passwordOne: passOneRef.current.value,
      passwordTwo: passTwoRef.current.value,
    };
    const res = await http.post("/register", user);

    if (res.error) {
      return setError(res.message);
    } else {
      nav("/login");
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Registration
            </h1>
            <form className="space-y-4 md:space-y-6">
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
                  ref={passOneRef}
                  autoComplete="new-password"
                />
              </div>
              <div>
                <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Repeat password
                </div>
                <input
                  type="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  ref={passTwoRef}
                  autoComplete="new-password"
                />
              </div>
              <div className="flex items-center justify-between"></div>
              <div>{error}</div>
              <button
                onClick={auth}
                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Register
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Do you already have an account?{" "}
                <a
                  href="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Log in
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;
