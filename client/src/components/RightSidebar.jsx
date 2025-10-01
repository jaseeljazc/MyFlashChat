// import React, { useContext, useEffect, useState } from "react";
// import assets, { imagesDummyData } from "../assets/assets";
// import ChatContainer from "./ChatContainer";
// import { useChat } from "../../context/ChatContext";
// import { AuthContext } from "../../context/AuthContext";

// const RightSidebar = () => {
// const { selectedUser,messages } = useChat();
//   const { logout, onlineUser } = useContext(AuthContext);
//   const [msgImages, setMsgImages] = useState([]);

//   // Get the all images from the messages and set them to state
//   useEffect(() => {
//     setMsgImages(messages.filter((msg) => msg.image).map((msg) => msg.image));
//   }, [messages]);

//   return (
//     selectedUser && (
//       <div
//         className={`bg-[#8185B2]/10 text-white w-full relative overflow-y-scroll ${
//           selectedUser ? "max-md:hidden" : ""
//         }`}
//       >
//         {/* Profile Info */}
//         <div className="pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto">
//           <img
//             src={selectedUser?.profilePic || assets.avatar_icon}
//             alt="Profile"
//             className="w-20 aspect-[1/1] rounded-full object-cover"
//           />
//           <h1 className="px-10 text-xl font-medium mx-auto flex items-center gap-2">
//             {onlineUser.includes(selectedUser._id) && (
//               <p className="w-2 h-2 rounded-full bg-green-500"></p>
//             )}
//             {selectedUser.fullName}
//           </h1>
//           <p className="px-10 mx-auto text-center">{selectedUser.bio}</p>
//         </div>

//         <hr className="border-[#ffffff50] my-4" />

//         {/* Media Section */}
//         <div className="px-5 text-xs">
//           <p>Media</p>
//           <div className="mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80">
//             {msgImages.map((url, index) => (
//               <div
//                 key={index}
//                 onClick={() => window.open(url)}
//                 className="cursor-pointer rounded"
//               >
//                 <img
//                   src={url}
//                   alt="media"
//                   className="h-full w-full rounded-md object-cover"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Logout Button */}
//         <button onClick={()=>logout()} className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-400 to-violet-600 text-white text-sm font-light py-2 px-20 rounded-full cursor-pointer border-none">
//           Logout
//         </button>
//       </div>
//     )
//   );
// };

// export default RightSidebar;





// ==================== RightSidebar.jsx ====================
import React, { useContext, useEffect, useState } from "react";
import assets from "../assets/assets";
import { useChat } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const RightSidebar = () => {
  const { selectedUser, messages } = useChat();
  const { logout, onlineUser } = useContext(AuthContext);
  const [msgImages, setMsgImages] = useState([]);

  useEffect(() => {
    setMsgImages(messages.filter((msg) => msg.image).map((msg) => msg.image));
  }, [messages]);

  return (
    selectedUser && (
      <div
        className={`min-h-0 bg-[#8185B2]/10 text-white w-full relative flex flex-col ${
          selectedUser ? "max-md:hidden" : ""
        }`}
      >
        {/* Scrollable content area */}
        <div className="flex-1 min-h-0 overflow-y-auto pb-20">
          {/* Profile Info */}
          <div className="pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto">
            <img
              src={selectedUser?.profilePic || assets.avatar_icon}
              alt="Profile"
              className="w-20 aspect-[1/1] rounded-full object-cover"
            />
            <h1 className="px-10 text-xl font-medium mx-auto flex items-center gap-2">
              {onlineUser?.includes(selectedUser._id) && (
                <p className="w-2 h-2 rounded-full bg-green-500"></p>
              )}
              {selectedUser.fullName}
            </h1>
            <p className="px-10 mx-auto text-center">{selectedUser.bio}</p>
          </div>

          <hr className="border-[#ffffff50] my-4" />

          {/* Media Section */}
          <div className="px-5 text-xs">
            <p>Media</p>
            <div className="mt-2 max-h-[200px] overflow-y-auto grid grid-cols-2 gap-4 opacity-80">
              {msgImages.map((url, index) => (
                <div
                  key={index}
                  onClick={() => window.open(url)}
                  className="cursor-pointer rounded"
                >
                  <img
                    src={url}
                    alt="media"
                    className="h-full w-full rounded-md object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Logout Button - Fixed position */}
        <button 
          onClick={() => logout()} 
          className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-400 to-violet-600 text-white text-sm font-light py-2 px-20 rounded-full cursor-pointer border-none"
        >
          Logout
        </button>
      </div>
    )
  );
};

export default RightSidebar;