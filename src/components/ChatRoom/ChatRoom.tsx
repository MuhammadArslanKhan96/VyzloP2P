// import React, { useState, useEffect, useRef } from "react";
// import { Avatar, Box, Typography, IconButton } from "@mui/material";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import SendIcon from "@mui/icons-material/Send";
// import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
// import { MainContainer, MessageList } from "@chatscope/chat-ui-kit-react";
// import {
//   collection,
//   addDoc,
//   query,
//   orderBy,
//   onSnapshot,
//   where,
//   getDocs,
// } from "firebase/firestore";
// import db from "../../../utils/firebaseConfig";
// import { useRouter } from "next/router";
// import { useAppContext } from "@/context/AppContext";
// import { getWalletAddress } from "@/hooks/cooket";

// interface MessageType {
//   id: string;
//   text: string; // Example field, adjust as per your actual data structure
//   createdAt: Date; // Example field, adjust as per your actual data structure
// }
// const ChatRoom = () => {
//   const router = useRouter();
//   // const { wallet: user1 } = useAppContext();
//   const { id } = router.query;
//   const [messages, setMessages] = useState<MessageType[]>([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [walletAddress, setWalletAddressState] = useState<string | undefined>(
//     ""
//   );
//   const chatContainerRef = useRef<HTMLDivElement>(null);
//   const user2 = Array.isArray(id) && id.length > 0 ? id[0] : undefined;
//   const user1 = walletAddress;

//   useEffect(() => {
//     const address = getWalletAddress();
//     if (address) {
//       setWalletAddressState(address);
//     }
//   }, []);

//   console.log(user1, user2);
//   useEffect(() => {
//     if (!user1 || !user2) {
//       console.error("User1 or User2 is undefined");
//       return;
//     }

//     const q = query(
//       collection(db, "conversations"),
//       where("participants", "array-contains", user1)
//     );

//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//       let conversationId = null;
//       querySnapshot.forEach((doc) => {
//         const data = doc.data();
//         if (data.participants.includes(user2)) {
//           conversationId = doc.id;
//         }
//       });

//       if (conversationId) {
//         const messagesQuery = query(
//           collection(db, `conversations/${conversationId}/messages`),
//           orderBy("createdAt")
//         );
//         onSnapshot(messagesQuery, (messagesSnapshot) => {
//           const loadedMessages:
//             | ((prevState: never[]) => never[])
//             | { id: string }[] = [];
//           messagesSnapshot.forEach((msg) => {
//             loadedMessages.push({ ...msg.data(), id: msg.id });
//           });
//           setMessages(loadedMessages);
//         });
//       }
//     });

//     return () => unsubscribe();
//   }, [user1, user2]);

//   useEffect(() => {
//     // Scroll chat container to bottom on messages change
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop =
//         chatContainerRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const handleSend = async () => {
//     if (newMessage.trim() === "") return;

//     const conversationQuery = query(
//       collection(db, "conversations"),
//       where("participants", "array-contains", user1)
//     );

//     let conversationId = null;

//     const querySnapshot = await getDocs(conversationQuery);
//     querySnapshot.forEach((doc) => {
//       const data = doc.data();
//       if (data.participants.includes(user2)) {
//         conversationId = doc.id;
//       }
//     });

//     if (!conversationId) {
//       const conversationDoc = await addDoc(collection(db, "conversations"), {
//         participants: [user1, user2],
//       });
//       conversationId = conversationDoc.id;
//     }

//     await addDoc(collection(db, `conversations/${conversationId}/messages`), {
//       text: newMessage,
//       createdAt: new Date(),
//       sender: user1,
//     });

//     setNewMessage("");
//   };

//   return (
//     <div
//       style={{
//         position: "relative",
//         width: "30%",
//       }}
//       className="border bg-white rounded-lg h-[500px] ml-3 flex flex-col justify-between"
//     >
//       <Box className="w-full flex justify-between items-center border-b p-4">
//         <Box className="flex">
//           <Avatar />
//           <Box className="ml-1">
//             <Typography>
//               {user2
//                 ? user2.length > 10
//                   ? `${user2.slice(0, 10)}...${user2.slice(-10)}`
//                   : user2
//                 : "no name"}
//             </Typography>

//             <Typography>no name</Typography>
//           </Box>
//         </Box>
//         <IconButton>
//           <MoreVertIcon />
//         </IconButton>
//       </Box>

//       <MainContainer>
//         <div
//           className="w-full h-[350px] overflow-y-auto px-4"
//           ref={chatContainerRef}
//         >
//           <MessageList>
//             {messages.map((msg: any, index: any) => {
//               const createdAt = msg?.createdAt?.toDate();
//               const formattedTime =
//                 createdAt instanceof Date ? createdAt.toLocaleTimeString() : "";

//               return (
//                 <Box
//                   key={index}
//                   className={`w-full flex items-center  ${
//                     msg.sender === user1 ? "justify-end" : "justify-start "
//                   } `}
//                 >
//                   <Box
//                     className={`p-2  rounded-lg w-10/12 ${
//                       msg?.sender === user1
//                         ? "bg-blue-100 text-left"
//                         : "bg-pink-100 text-right"
//                     } mb-2`}
//                   >
//                     <Typography className="text-[9px] text-left">
//                       {msg.sender === user1 ? "Hamza" : "Ali"}
//                     </Typography>
//                     <Typography className="text-sm text-left">
//                       {msg?.text}
//                     </Typography>
//                     <Typography className="text-[9px] text-right">
//                       {formattedTime}
//                     </Typography>
//                   </Box>
//                 </Box>
//               );
//             })}
//           </MessageList>
//         </div>
//       </MainContainer>
//       <Box className="w-full flex justify-between items-center px-4 py-3 border-t">
//         <InsertEmoticonIcon />
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           className="w-full px-1 outline-none border-none"
//           placeholder="Type message here"
//           onKeyPress={(e) => {
//             if (e.key === "Enter") {
//               handleSend();
//             }
//           }}
//         />
//         <IconButton onClick={handleSend}>
//           <SendIcon />
//         </IconButton>
//       </Box>
//     </div>
//   );
// };

// export default ChatRoom;

import React, { useState, useEffect, useRef } from "react";
import { Avatar, Box, Typography, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SendIcon from "@mui/icons-material/Send";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { MainContainer, MessageList } from "@chatscope/chat-ui-kit-react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  where,
  getDocs,
} from "firebase/firestore";
import db from "../../../utils/firebaseConfig";
import { useRouter } from "next/router";
import { getWalletAddress } from "@/hooks/cookies";
import getP2P from "@/hooks/getP2P";
interface MessageType {
  id: string;
  text: string;
  createdAt: Date;
  sender?: string;
}
const ChatRoom = () => {
  const router = useRouter();
  const { id } = router.query;
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [walletAddress, setWalletAddressState] = useState<string | undefined>(
    ""
  );
  const [advertiseName, setadvertiseName] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const user2 = Array.isArray(id) && id.length > 0 ? id[0] : undefined;
  const user1 = walletAddress;
  getP2P(user2)
    .then((name) => {
      setadvertiseName(name);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  useEffect(() => {
    const address = getWalletAddress();
    if (address) {
      setWalletAddressState(address);
    }
  }, []);

  useEffect(() => {
    if (!user1 || !user2) {
      console.error("User1 or User2 is undefined");
      return;
    }

    const q = query(
      collection(db, "conversations"),
      where("participants", "array-contains", user1)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let conversationId = null;
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.participants.includes(user2)) {
          conversationId = doc.id;
        }
      });

      if (conversationId) {
        const messagesQuery = query(
          collection(db, `conversations/${conversationId}/messages`),
          orderBy("createdAt")
        );
        onSnapshot(messagesQuery, (messagesSnapshot) => {
          const loadedMessages: MessageType[] = [];
          messagesSnapshot.forEach((msg) => {
            loadedMessages.push({
              id: msg.id,
              text: msg.data().text,
              createdAt: msg.data().createdAt.toDate(),
            });
          });
          setMessages(loadedMessages);
        });
      }
    });

    return () => unsubscribe();
  }, [user1, user2]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (newMessage.trim() === "") return;

    const conversationQuery = query(
      collection(db, "conversations"),
      where("participants", "array-contains", user1)
    );

    let conversationId = null;

    const querySnapshot = await getDocs(conversationQuery);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.participants.includes(user2)) {
        conversationId = doc.id;
      }
    });

    if (!conversationId) {
      const conversationDoc = await addDoc(collection(db, "conversations"), {
        participants: [user1, user2],
      });
      conversationId = conversationDoc.id;
    }

    await addDoc(collection(db, `conversations/${conversationId}/messages`), {
      text: newMessage,
      createdAt: new Date(),
      sender: user1,
    });

    setNewMessage("");
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: { xs: "100%", md: "30%" },
        marginTop: { xs: 10, md: 0 },
      }}
      className="border bg-white rounded-lg h-[500px] ml-0 md:ml-3 flex flex-col justify-between"
    >
      <Box className="w-full flex justify-between items-center border-b p-4">
        <Box className="flex">
          <Avatar />
          <Box className="ml-1">
            <Typography fontSize={14}>
              {user2
                ? user2.length > 10
                  ? `${user2.slice(0, 6)}...${user2.slice(-6)}`
                  : user2
                : "00000"}
            </Typography>
            <Typography fontSize={14}>{advertiseName}</Typography>
          </Box>
        </Box>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </Box>

      <MainContainer>
        <div
          className="w-full h-[350px] overflow-y-auto px-4"
          ref={chatContainerRef}
        >
          <MessageList>
            {messages.map((msg, index) => (
              <Box
                key={index}
                className={`w-full flex items-center ${
                  msg.sender === user1 ? "justify-end" : "justify-start"
                }`}
              >
                <Box
                  className={`p-2 rounded-lg w-10/12 ${
                    msg.sender === user1
                      ? "bg-blue-100 text-left"
                      : "bg-pink-100 text-right"
                  } mb-2`}
                >
                  <Typography className="text-[9px] text-left">
                    {msg.sender === user1 ? "Hamza" : "Ali"}
                  </Typography>
                  <Typography className="text-sm text-left">
                    {msg.text}
                  </Typography>
                  <Typography className="text-[9px] text-right">
                    {msg.createdAt.toLocaleTimeString()}
                  </Typography>
                </Box>
              </Box>
            ))}
          </MessageList>
        </div>
      </MainContainer>
      <Box className="w-full flex justify-between items-center px-4 py-3 border-t">
        <InsertEmoticonIcon />
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="w-full px-1 outline-none border-none"
          placeholder="Type message here"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />
        <IconButton onClick={handleSend}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatRoom;
