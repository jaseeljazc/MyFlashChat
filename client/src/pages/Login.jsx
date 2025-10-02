import React from "react";
import assets from "../assets/assets";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [currState, setCurrState] = useState("Sign up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const { login } = useContext(AuthContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (currState === "Sign up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }

    await login(currState === "Sign up" ? "signup" : "login", {
      fullName,
      email,
      password,
      bio,
    });
    
 
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center
            justify-center gap-8 sm:justify-evenly max-sm:flex-col "
    >
      {/* left */}
      {/* <img src={assets.logo_big} alt="" className="w-[min(30vw,250px)]" /> */}

      <h1 className="w-[min(30vw,250px)] text-7xl text-white" >Flash Chat</h1>
      {/* right */}
      <form
        onSubmit={onSubmitHandler}
        className="border bg-white/4 text-white border-gray-700 p-6 flex
            flex-col gap-6 rounded-lg shadow-lg"
      >
        <h2 className="font-medium text-2x1 flex justify-between items-center">
          {currState}
          {isDataSubmitted && (
            <img
              onClick={() => setIsDataSubmitted(false)}
              src={assets.arrow_icon}
              alt=""
              className="w-5 cursor-pointer"
            />
          )}
        </h2>

        {currState === "Sign up" && !isDataSubmitted && (
          <input
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            type="text"
            className="p-2 border border-gray-500 rounded-md
                focus:outline-none"
            placeholder="Full Name"
            required
          />
        )}

        {!isDataSubmitted && (
          <>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email Address"
              required
              className="p-2 border border-gray-500 rounded-md focus: outline-none focus: ring-2focus: ring-indigo-500"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
              className="p-2 border border-gray-500 rounded-md focus: outline-none focus: ring-2focus: ring-indigo-500"
            />
          </>
        )}

        {currState === "Sign up" && isDataSubmitted && (
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            rows={4}
            className="p-2 border border-gray-500 rounded-md
                focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="provide a short bio..."
            required
          ></textarea>
        )}
     
        <button
          type="submit"
          className="py-2 bg-gradient-to-b from-purple-400
                to-violet-600 text-white rounded-md cursor-pointer hover:from-transparent hover:to-transparent border border-transparent hover:border-violet-600 hover:text-gray-200"
        >
          {currState === "Sign up" ? "Create Account" : "Login Now"}
        </button>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>

        <div className="flex flex-col gap-2">
          {currState === "Sign up" ? (
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => {
                  setCurrState("Login");
                  setIsDataSubmitted(false);
                }}
                className="font-medium text-violet-500 cursor-pointer"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              Create an account{" "}
              <span
                onClick={() => setCurrState("Sign up")}
                className="font-medium text-violet-500
        cursor-pointer"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;