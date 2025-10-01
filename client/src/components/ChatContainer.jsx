// import toast from "react-hot-toast";
// import { AuthContext } from "../../context/AuthContext";
// import { useChat } from "../../context/ChatContext";
// import assets, { messagesDummyData } from "../assets/assets";
// import { formatMessageTime } from "../lib/utils";
// import { useRef, useEffect, useState, useContext } from "react";

// const ChatContainer = () => {
//   // ✅ Fixed: Call useChat() directly, not useContext(useChat)
//   const { messages = [], selectedUser, setSelectedUser, sendMessage, getMessages } = useChat();
//   const { authUser, onlineUsers = [] } = useContext(AuthContext);

//   const scrollEnd = useRef();
//   const [input, setInput] = useState("");

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (input.trim() === "") return null;
//     await sendMessage({ text: input.trim() });
//     setInput("");
//   };

//   const handleSendImage = async (e) => {
//     const file = e.target.files[0];
//     if (!file || !file.type.startsWith("image/")) {
//       toast.error("Select an image file");
//       return;
//     }
//     const reader = new FileReader();

//     reader.onloadend = async () => {
//       await sendMessage({ image: reader.result });
//       e.target.value = "";
//     };
//     reader.readAsDataURL(file);
//   };

//   useEffect(() => {
//     if (selectedUser && getMessages) {
//       getMessages(selectedUser._id);
//     }
//   }, [selectedUser, getMessages]);

//   useEffect(() => {
//     if (scrollEnd.current && messages) {
//       scrollEnd.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   return selectedUser ? (
//     <div className="h-full flex flex-col backdrop-blur-lg overflow-hidden">
//       {/* Header */}
//       <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500 flex-shrink-0 min-h-fit">
//         <img
//           src={selectedUser.profilePic || assets.avatar_icon}
//           alt="Profile"
//           className="w-8 rounded-full"
//         />
//         <p className="flex-1 text-lg text-white flex items-center gap-2">
//           {selectedUser.fullName}
//           {Array.isArray(onlineUsers) && onlineUsers.includes(selectedUser._id) && (
//             <span className="w-2 h-2 rounded-full bg-green-500"></span>
//           )}
//         </p>
//         <img
//           onClick={() => setSelectedUser(null)}
//           src={assets.arrow_icon}
//           alt="Back"
//           className="md:hidden max-w-7 cursor-pointer"
//         />
//         <img
//           src={assets.help_icon}
//           alt="Help"
//           className="max-md:hidden max-w-5"
//         />
//       </div>

//       {/* Chat area */}
//       <div className="flex-1 overflow-y-auto overscroll-contain p-3 pb-4">
//         {messages && messages.length > 0 ? messages.map((msg, index) => {
//           if (!msg) return null;
          
//           const isOwnMessage = msg.senderId === authUser?._id;
          
//           return (
//             <div
//               key={msg._id || index}
//               className={`flex items-end gap-2 mb-6 ${
//                 isOwnMessage ? "flex-row-reverse" : ""
//               }`}
//             >
//               {/* Message content - Image or Text */}
//               {msg.image ? (
//                 <img
//                   src={msg.image}
//                   className="max-w-[230px] border border-gray-700 rounded-lg"
//                   alt="Message attachment"
//                   onError={(e) => {
//                     console.error("Image failed to load:", msg.image);
//                     e.target.style.display = "none";
//                   }}
//                 />
//               ) : msg.text ? (
//                 <p
//                   className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg break-words text-white bg-violet-500/30 ${
//                     isOwnMessage ? "rounded-br-none" : "rounded-bl-none"
//                   }`}
//                 >
//                   {msg.text}
//                 </p>
//               ) : null}
              
//               {/* Avatar and timestamp */}
//               <div className="text-center text-xs">
//                 <img
//                   src={
//                     isOwnMessage
//                       ? authUser?.profilePic || assets.avatar_icon
//                       : selectedUser?.profilePic || assets.avatar_icon
//                   }
//                   alt="Avatar"
//                   className="w-7 rounded-full"
//                 />
//                 <p className="text-gray-500">
//                   {formatMessageTime(msg.createdAt)}
//                 </p>
//               </div>
//             </div>
//           );
//         }) : (
//           <div className="flex items-center justify-center h-full text-gray-400">
//             <p>No messages yet. Start the conversation!</p>
//           </div>
//         )}
//         <div ref={scrollEnd} className="h-1"></div>
//       </div>

//       {/* Bottom input */}
//       <div className="flex items-center gap-3 p-3 bg-black/20 backdrop-blur-sm border-t border-gray-700/30 flex-shrink-0">
//         <div className="flex-1 flex items-center bg-gray-800/50 border border-gray-600/30 px-3 rounded-full">
//           <input
//             onChange={(e) => setInput(e.target.value)}
//             value={input}
//             onKeyDown={(e) => (e.key === "Enter" ? handleSendMessage(e) : null)}
//             type="text"
//             placeholder="Send a message"
//             className="flex-1 text-sm p-3 border-none rounded-full outline-none bg-transparent text-white placeholder-gray-400"
//           />
//           <input
//             onChange={handleSendImage}
//             type="file"
//             id="image"
//             accept="image/png, image/jpeg"
//             hidden
//           />
//           <label htmlFor="image">
//             <img
//               src={assets.gallery_icon}
//               alt="Upload"
//               className="w-5 mr-2 cursor-pointer"
//             />
//           </label>
//         </div>
//         <img
//           onClick={handleSendMessage}
//           src={assets.send_button}
//           alt="Send"
//           className="w-7 cursor-pointer"
//         />
//       </div>
//     </div>
//   ) : (
//     <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden">
//       <img src={assets.logo_icon} className="max-w-16" alt="Logo" />
//       <p className="text-lg font-medium text-white">Chat anytime, anywhere</p>
//     </div>
//   );
// };

// export default ChatContainer;


// ==================== ChatContainer.jsx ====================
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import { useChat } from "../../context/ChatContext";
import assets, { messagesDummyData } from "../assets/assets";
import { formatMessageTime } from "../lib/utils";
import { useRef, useEffect, useState, useContext } from "react";

const ChatContainer = () => {
  const { messages = [], selectedUser, setSelectedUser, sendMessage, getMessages } = useChat();
  const { authUser, onlineUsers = [] } = useContext(AuthContext);

  const scrollEnd = useRef();
  const [input, setInput] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return null;
    await sendMessage({ text: input.trim() });
    setInput("");
  };

  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Select an image file");
      return;
    }
    const reader = new FileReader();

    reader.onloadend = async () => {
      await sendMessage({ image: reader.result });
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (selectedUser && getMessages) {
      getMessages(selectedUser._id);
      // Reset auto-scroll when fetching new user's messages
      setShouldAutoScroll(true);
    }
  }, [selectedUser]); // Removed getMessages from dependencies

  // Track if user is near bottom of chat
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const chatContainerRef = useRef();

  // Check if user is scrolled near the bottom
  const handleScroll = () => {
    if (!chatContainerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    
    setShouldAutoScroll(isNearBottom);
  };

  // Only auto-scroll if user is already at the bottom
  useEffect(() => {
    if (shouldAutoScroll && scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages, shouldAutoScroll]);

  // Initial scroll when user changes
  useEffect(() => {
    if (selectedUser && scrollEnd.current) {
      setShouldAutoScroll(true);
      setTimeout(() => {
        scrollEnd.current?.scrollIntoView({ behavior: "auto", block: "end" });
      }, 100);
    }
  }, [selectedUser]);

  return selectedUser ? (
    <div className="min-h-0 h-full flex flex-col backdrop-blur-lg">
      {/* Header */}
      <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500 flex-shrink-0">
        <img
          src={selectedUser.profilePic || assets.avatar_icon}
          alt="Profile"
          className="w-8 rounded-full"
        />
        <p className="flex-1 text-lg text-white flex items-center gap-2">
          {selectedUser.fullName}
          {Array.isArray(onlineUsers) && onlineUsers.includes(selectedUser._id) && (
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
          )}
        </p>
        <img
          onClick={() => setSelectedUser(null)}
          src={assets.arrow_icon}
          alt="Back"
          className="md:hidden max-w-7 cursor-pointer"
        />
        <img
          src={assets.help_icon}
          alt="Help"
          className="max-md:hidden max-w-5"
        />
      </div>

      {/* Chat area */}
      <div 
        ref={chatContainerRef}
        onScroll={handleScroll}
        className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-3 pb-4"
      >
        {messages && messages.length > 0 ? messages.map((msg, index) => {
          if (!msg) return null;
          
          const isOwnMessage = msg.senderId === authUser?._id;
          
          return (
            
            <div
              key={msg._id || index}
              className={`flex items-end gap-2 mb-6 ${
                isOwnMessage ? "flex-row-reverse" : ""
              }`}
            >
                 <div className="text-center text-xs">
                <img
                  src={
                    isOwnMessage
                      ? authUser?.profilePic || assets.avatar_icon
                      : selectedUser?.profilePic || assets.avatar_icon
                  }
                  alt="Avatar"
                  className="w-7 rounded-full"
                />
                <p className="text-gray-500">
                  {formatMessageTime(msg.createdAt)}
                </p>
              </div>
              {msg.image ? (
                <img
                  src={msg.image}
                  className="max-w-[230px] border border-gray-700 rounded-lg"
                  alt="Message attachment"
                  onLoad={() => {
                    // Only scroll on image load if user is at bottom
                    if (shouldAutoScroll) {
                      scrollEnd.current?.scrollIntoView({ behavior: "smooth", block: "end" });
                    }
                  }}
                  onError={(e) => {
                    console.error("Image failed to load:", msg.image);
                    e.target.style.display = "none";
                  }}
                />
              ) : msg.text ? (
                <p
                  className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg break-words text-white bg-violet-500/30 ${
                    isOwnMessage ? "rounded-br-none" : "rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </p>
              ) : null}
              
              {/* <div className="text-center text-xs">
                <img
                  src={
                    isOwnMessage
                      ? authUser?.profilePic || assets.avatar_icon
                      : selectedUser?.profilePic || assets.avatar_icon
                  }
                  alt="Avatar"
                  className="w-7 rounded-full"
                />
                <p className="text-gray-500">
                  {formatMessageTime(msg.createdAt)}
                </p>
              </div> */}
            </div>
          );
        }) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <p>No messages yet. Start the conversation!</p>
          </div>
        )}
        <div ref={scrollEnd} className="h-1"></div>
      </div>

      {/* Bottom input */}
      <div className="flex items-center gap-3 p-3 bg-black/20 backdrop-blur-sm border-t border-gray-700/30 flex-shrink-0">
        <div className="flex-1 flex items-center bg-gray-800/50 border border-gray-600/30 px-3 rounded-full">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyDown={(e) => (e.key === "Enter" ? handleSendMessage(e) : null)}
            type="text"
            placeholder="Send a message"
            className="flex-1 text-sm p-3 border-none rounded-full outline-none bg-transparent text-white placeholder-gray-400"
          />
          <input
            onChange={handleSendImage}
            type="file"
            id="image"
            accept="image/png, image/jpeg"
            hidden
          />
          <label htmlFor="image">
            <img
              src={assets.gallery_icon}
              alt="Upload"
              className="w-5 mr-2 cursor-pointer"
            />
          </label>
        </div>
        <img
          onClick={handleSendMessage}
          src={assets.send_button}
          alt="Send"
          className="w-7 cursor-pointer"
        />
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden">
      <img src={assets.logo_icon} className="max-w-16" alt="Logo" />
      <p className="text-lg font-medium text-white">Chat anytime, anywhere</p>
    </div>
  );
};

export default ChatContainer;