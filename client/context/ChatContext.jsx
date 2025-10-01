import { createContext, useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "./AuthContext";

// Keep Context private (not exported)
const ChatContext = createContext();

// Only export the Provider component
export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unseenMessages, setUnseenMessages] = useState({});

  const authContext = useContext(AuthContext);
  
  // Safety check: ensure AuthContext is available
  if (!authContext) {
    throw new Error("ChatProvider must be used within AuthProvider");
  }
  
  const { socket, axios } = authContext;

  // Get all users for sidebar
  const getUsers = async () => {
    try {
      const { data } = await axios.get("/api/messages/users");
      if (data.success) {
        setUsers(data.users);
        setUnseenMessages(data.unseenMessages || {});
      } else {
        toast.error(data.message || "Failed to fetch users");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Get messages from selected user
  const getMessages = async (userId) => {
    try {
      const { data } = await axios.get(`/api/messages/${userId}`);
      if (data.success) setMessages(data.messages);
      else toast.error(data.message || "Failed to fetch messages");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Send message to selected user
  const sendMessage = async (messageData) => {
    if (!selectedUser) return;
    try {
      console.log("Sending message data:", messageData);
      const { data } = await axios.post(
        `/api/messages/send/${selectedUser._id}`,
        messageData
      );
      console.log("Response from server:", data);
      if (data.success) {
        setMessages((prev) => [...prev, data.message]);
      } else {
        toast.error(data.message || "Failed to send message");
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Send message error:", error);
    }
  };

  // Subscribe/unsubscribe to messages for selected user
  useEffect(() => {
    if (!socket || !selectedUser) return;

    const messageHandler = (newMessage) => {
      console.log("Received new message:", newMessage);
      if (newMessage.senderId === selectedUser._id) {
        newMessage.seen = true;
        setMessages((prev) => [...prev, newMessage]);
        axios.put(`/api/messages/mark/${newMessage._id}`).catch(console.error);
      } else {
        setUnseenMessages((prev) => ({
          ...prev,
          [newMessage.senderId]: prev[newMessage.senderId]
            ? prev[newMessage.senderId] + 1
            : 1,
        }));
      }
    };

    socket.on("receiveMessage", messageHandler);

    return () => {
      socket.off("receiveMessage", messageHandler);
    };
  }, [socket, selectedUser, axios]);

  const value = {
    messages,
    users,
    selectedUser,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages,
    getUsers,
    getMessages,
    sendMessage,
  };

  // Don't render children until axios is ready
  if (!axios) {
    return <div>Loading...</div>;
  }

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

// Export the hook to use the context
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within ChatProvider");
  }
  return context;
};