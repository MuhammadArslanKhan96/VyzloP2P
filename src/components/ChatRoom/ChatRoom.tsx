import React, { useState, useEffect, useRef } from "react";
import { Avatar, Box, Typography, IconButton, Button } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SendIcon from "@mui/icons-material/Send";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import ImageIcon from "@mui/icons-material/Image";
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
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { db, storage } from "../../../utils/firebaseConfig";
import { useRouter } from "next/router";
import { getWalletAddress } from "@/hooks/cookies";
import getP2P from "@/hooks/getP2P";
import Image from "next/image";
interface MessageType {
  id: string;
  text: string;
  createdAt: Date;
  sender?: string;
  imageURL?: string;
}

const ChatRoom = () => {
  const router = useRouter();
  const { id } = router.query;
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [walletAddress, setWalletAddressState] = useState<string | undefined>(
    ""
  );
  const [advertiseName, setAdvertiseName] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploadedImageURL, setUploadedImageURL] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const user2 = Array.isArray(id) && id.length > 0 ? id[0] : undefined;
  const user1 = walletAddress;

  useEffect(() => {
    if (user2) {
      getP2P(user2, 1);
    }
  }, [user2]);

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
      collection(db, "P2POrder", user2, "messages"),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const loadedMessages: MessageType[] = [];
      querySnapshot.forEach((msg) => {
        loadedMessages.push({
          id: msg.id,
          text: msg.data().text,
          createdAt: msg.data().createdAt.toDate(),
          sender: msg.data().sender,
          imageURL: msg.data().imageURL,
        });
      });
      setMessages(loadedMessages);
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
    if (newMessage.trim() === "" && !uploadedImageURL) return;

    if (!user1 || !user2) {
      console.error("User1 or User2 is undefined");
      return;
    }

    const messageData: Partial<MessageType> = {
      text: newMessage,
      createdAt: new Date(),
      sender: user1,
    };

    if (uploadedImageURL) {
      messageData.imageURL = uploadedImageURL;
    }

    await addDoc(collection(db, `P2POrder/${user2}/messages`), messageData);

    setNewMessage("");
    setUploadedImageURL(null);
    setSelectedImage(null);
  };

  const handleImageUpload = async (imageFile: File) => {
    try {
      const imageRef = storageRef(storage, `images/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      const imageURL = await getDownloadURL(imageRef);
      setUploadedImageURL(imageURL);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const confirmSend = async () => {
    if (selectedImage) {
      await handleImageUpload(selectedImage);
    }
    handleSend();
    setSelectedImage(null);
  };

  const cancelOrder = async () => {
    await getP2P(user2, 0); // Set type to 0 on cancel order
    router.push("/");
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
        <Box>
          <Button
            sx={{ fontSize: 10, borderRadius: 2 }}
            className="bg-blue-100/50"
            onClick={cancelOrder}
          >
            Cancel order
          </Button>
          <MoreVertIcon />
        </Box>
      </Box>

      <MainContainer>
        <div
          className="w-full h-[350px] overflow-y-auto px-4"
          ref={chatContainerRef}
        >
          {selectedImage !== null ? (
            <Box className="w-full flex flex-col items-center p-4 ">
              <Image
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
                layout="fill"
                objectFit="cover"
              />
            </Box>
          ) : (
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
                    {msg.imageURL && (
                      <Box>
                        <img src={msg.imageURL} alt="Attached" />
                      </Box>
                    )}
                  </Box>
                </Box>
              ))}
            </MessageList>
          )}
        </div>
      </MainContainer>
      <Box className="w-full flex justify-between items-center px-4 py-3 border-t">
        <InsertEmoticonIcon />
        <label htmlFor="image-upload">
          <ImageIcon className="text-blue-400" />
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setSelectedImage(file);
              handleImageUpload(file);
            }
          }}
        />
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
