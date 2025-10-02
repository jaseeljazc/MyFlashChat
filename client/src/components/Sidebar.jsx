
// ==================== Sidebar.jsx ====================
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useChat } from "../../context/ChatContext";

const Sidebar = () => {
  const {
    getUsers,
    users = [],
    selectedUser,
    setSelectedUser,
    unseenMessages = {},
    setUnseenMessages,
  } = useChat() || {};
  
  const { logout, onlineUsers = [] } = useContext(AuthContext) || {};

  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const filteredUsers = input
    ? users.filter((user) =>
        user?.fullName?.toLowerCase().includes(input.toLowerCase())
      )
    : users;

  useEffect(() => {
    if (getUsers) {
      getUsers();
    }
  }, [onlineUsers]);

  return (
    <div
      className={`min-h-0 bg-[#8185b2]/5 h-full rounded-r-xl text-white flex flex-col ${
        selectedUser ? "max-md:hidden" : ""
      }`}
    >
      {/* Top Section - Fixed */}
      <div className="p-5 pb-5 flex-shrink-0">
        <div className="flex justify-between items-center">
          {/* <img src={assets.logo} alt="logo" className="max-w-40" /> */}
          <h1  className="max-w-40" >Flash Chat</h1>
          <div className="relative py-2 group">
            <img
              src={assets.menu_icon}
              alt="Menu"
              className="max-h-5 cursor-pointer"
            />
            <div className="absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142] border border-gray-500 text-gray-100 hidden group-hover:block">
              <p
                onClick={() => navigate("/profile")}
                className="cursor-pointer text-sm"
              >
                Edit Profile
              </p>
              <hr className="my-2 border-t border-gray-500" />
              <p onClick={() => logout && logout()} className="cursor-pointer text-sm">
                Logout
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-[#282142] rounded-full flex items-center gap-2 py-3 px-4 mt-5">
          <img src={assets.search_icon} alt="Search" className="w-3" />
          <input
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Search User"
            className="bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8] flex-1"
          />
        </div>
      </div>

      {/* Users List - Scrollable */}
      <div className="flex-1 min-h-0 overflow-y-auto px-5 pb-5">
        <div className="flex flex-col">
          {filteredUsers.map((user, index) => (
            <div
              key={user?._id || index}
              onClick={() => {
                setSelectedUser(user);
                setUnseenMessages(prev => ({ ...prev, [user._id]: 0 }));
              }}
              className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm ${
                selectedUser?._id === user?._id ? "bg-violet-500/30" : ""
              }`}
            >
              <img
                src={user?.profilePic || assets.avatar_icon}
                alt={user?.fullName || "User"}
                className="w-[35px] aspect-[1/1] rounded-full object-cover"
              />
              <div className="flex flex-col leading-5">
                <p>{user?.fullName || "Unknown User"}</p>
                {onlineUsers?.includes(user?._id) ? (
                  <span className="text-green-400 text-xs">Online</span>
                ) : (
                  <span className="text-neutral-400 text-xs">Offline</span>
                )}
              </div>
              {unseenMessages?.[user?._id] > 0 && (
                <p className="absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50">
                  {unseenMessages[user._id]}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
