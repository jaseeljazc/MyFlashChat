import { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authUser, SetAuthUser] = useState(null);
  const [onlineUser, setOnlineUser] = useState([]);
  const [socket, setSocket] = useState(null);


  const checkAuth = async () => {
    try {
      const { data } = await axios.get("/api/auth/check");
      if (data.success) {
        SetAuthUser(data.user);
        connectSocket(data.user); // Connect socket after auth
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const refreshPage = () => {
  window.location.reload(); // reloads the current page
};


  //Login function to handle user authentication and socket connection
  const login = async (state, credentials) => {
    try {
      // Send login request to backend
      const { data } = await axios.post(`/api/auth/${state}`, credentials);

      if (data.success) {
        // Save token to localStorage and state
        localStorage.setItem("token", data.token);
        setToken(data.token);
        axios.defaults.headers.common["token"] = data.token;

        // Set authenticated user
        SetAuthUser(data.user);
        refreshPage();


        // Connect socket for real-time updates
        connectSocket(data.user);

        toast.success("Login successful!");

        return true;
      } else {
        toast.error(data.message || "Login failed");
        return false;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      return false;
    }
  };

  //logout function to handle user logout and socket disconnection

  const logout = async () => {
    // Remove token from localStorage and state
    localStorage.removeItem("token");
    setToken(null);

    // Clear authenticated user
    SetAuthUser(null);

    // Disconnect socket if it exists
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }

    // Clear online users list
    setOnlineUser([]);

    toast.success("Logged out successfully!");
  };

  // Update profile fumction to handle user profile updates

  const updateProfile = async (updatedData) => {
    try {
      // Send request to backend to update profile
      const { data } = await axios.put("/api/auth/update-profile", updatedData);

      if (data.success) {
        // Update authUser state with new data
        SetAuthUser(data.user);

        toast.success("Profile updated successfully!");
        return true;
      } else {
        toast.error(data.message || "Profile update failed");
        return false;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      return false;
    }
  };

  //Connect socket function

  const connectSocket = (userData) => {
    if (!userData || socket?.connected) return;

    const newSocket = io(backendUrl, {
      query: {
        userId: userData._id,
      },
    });

    setSocket(newSocket);

    newSocket.on("getOnlineUsers", (userIds) => {
      setOnlineUser(userIds);
    });
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["token"] = token;
    }
    checkAuth();
  }, []);

  const value = {
    axios,
    authUser,
    onlineUser,
    socket,
    login,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
