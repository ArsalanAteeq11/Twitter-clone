import React, { useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/userSlice";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (isLogin) {
      // login
      try {
        setIsLoading(true);
        const res = await axios.post(
          `${USER_API_END_POINT}/login`,
          {
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        console.log(res);
        setIsLoading(false);
        if (res.data.success) {
          dispatch(getUser(res?.data?.user));
          navigate("/");
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
        console.log(error);
      }
    } else {
      // signup
      try {
        setIsLoading(true);
        const res = await axios.post(
          `${USER_API_END_POINT}/register`,
          {
            name,
            username,
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        console.log(res);
        setIsLoading(false);
        if (res.data.success) {
          setIsLogin(true);
          toast.success(res.data.message);
        }
        console.log(res);
      } catch (error) {
        toast.error(error.response?.data?.message || "Registration failed");
        console.log(error);
      }
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex items-center justify-evenly w-[80%]">
        <div>
          <img
            className="w-[250px] ml-5"
            src="https://img.freepik.com/premium-vector/twitter-logo_979658-3412.jpg?w=740"
          />
        </div>
        <div>
          <div className="my-6">
            <h1 className="text-6xl font-bold">Happening now.</h1>
          </div>

          <h1 className="text-2xl font-bold mt-4 mb-2">
            {isLogin ? "Login" : "Sign Up"}
          </h1>
          <form onSubmit={submitHandler} className="flex flex-col w-[50%]">
            {!isLogin && (
              <>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder="Name"
                  className="border border-gray-800 px-3 py-1 rounded-full my-1"
                />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  placeholder="Username"
                  className="border border-gray-800 px-3 py-1 rounded-full my-1"
                />{" "}
              </>
            )}

            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
              className="border border-gray-800 px-3 py-1 rounded-full my-1"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
              className="border border-gray-800 px-3 py-1 rounded-full my-1"
            />

            <button
              type="submit"
              className="text-md font-semibold text-white bg-black px-2 py-1 rounded-full my-3"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : isLogin ? "Login" : "Register"}
            </button>
            <h1 className="text-sm text-gray-500">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <span
                className="text-blue-500 underline cursor-pointer"
                onClick={() => {
                  setIsLogin(!isLogin);
                }}
              >
                {isLogin ? "Register" : "Login"}
              </span>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
