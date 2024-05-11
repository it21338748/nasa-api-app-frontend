import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8078/api/users/login",
        {
          username,
          password,
        }
      );

      const { token } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("isLoggedIn", true);

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "You have successfully logged in.",
      });
      window.location.href = "/api/apod";
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Error",
        text: error.response.data.message,
      });
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-center bg-cover"
      style={{
        backgroundImage: `url(https://wallpapercave.com/wp/wp9406169.jpg)`,
      }}
    >
      <div className="w-full max-w-md p-8 space-y-8 bg-black rounded-lg shadow-lg">
        <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-200">
          {" "}
          Login
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="relative block w-full px-3 py-2 mb-5 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-full appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Username"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="relative block w-full px-3 py-2 mb-5 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-full appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex justify-center">
            {" "}
            {/* Centering container */}
            <button
              type="submit"
              className="relative flex justify-center w-32 px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-full group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </form>
        <p className="mt-2 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/api/register"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
