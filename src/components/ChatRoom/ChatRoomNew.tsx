import React, { useState, useEffect, useRef, useMemo } from "react";
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
  getDocs,
  deleteDoc,
  where,
  doc,
} from "firebase/firestore";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { db, storage } from "../../../utils/firebaseConfig";
import { useRouter } from "next/router";
import { getWalletAddress, setWalletAddress } from "@/hooks/cookies";
import walletP2P, { getP2P, getWallet } from "@/hooks/getP2P";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import { IoCloseCircleOutline } from "react-icons/io5";
import { fetchUserByWalletAddress } from "@/services/user";
interface MessageType {
  id: string;
  text: string;
  createdAt: Date;
  sender?: string;
  imageURL?: string;
  collectionId: string
}

const ChatRoomNew = ({
  setChatDisplay,
  chatDisplay,
}: {
  setChatDisplay: Function;
  chatDisplay: boolean;
}) => {
  // const { maker, setMaker } = useAppContext();
  const router = useRouter();
  const { id = [] } = router.query;

  const collectionId = useMemo(() => id?.length > 0 ? id[0] : null, [id])
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [msgInput, setMsgInput] = useState("");
  const [makerWallet, setMakerWallet] = useState("");
  const [isSeller, setIsSeller] = useState<any | null>([]);
  const [seller, setSeller] = useState<any | null>([]);
  const [user, setUser] = useState<any | null>([])
  const [data, setData] = useState<any | null>([]);

  const [selectedImage, setSelectedImage] = useState<File | null>(null); // pending
  const [uploadedImageURL, setUploadedImageURL] = useState<string | null>(null); //pending

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchWalletAddress = async (id: any) => {

      console.log(id, "id")

      const { data: resData, loading, error } = await getWallet(id);
      const address = getWalletAddress();

      if (loading || error) {
        return console.log(error || loading);
      }

      const sellerCheck = address === resData?.takerAddress;
      const userData: any = await fetchUserByWalletAddress(address || "");
      setUser(userData);

      if (sellerCheck) {
        setIsSeller(true);
        return setData(resData);
      }

      setSeller({ name: resData?.userName, address: resData?.takerAddress });
    };

    if (collectionId) {
      fetchWalletAddress(collectionId);
    }

  }, [collectionId]);

  useEffect(() => {
    if (!user || !user.id) {
      console.log("Invalid parameters:", { user });
      return;
    }

    const messagesRef = collection(db, `createOrder/${collectionId}/messages`);
    const q = query(messagesRef, orderBy("createdAt"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const loadedMessages: any = [];
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

    return () => {
      // deleteMessagesOnUserLeave(collectionId)
      unsubscribe()
    };
  }, [collectionId, user]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (msgInput.trim() === "" && !uploadedImageURL) return;

    if (!user) {
      console.error("user is undefined");
      return;
    }

    if (typeof collectionId !== "string") {
      return console.error(id);
    }

    const messageData: Partial<MessageType> = {
      text: msgInput,
      createdAt: new Date(),
      sender: user.address,
      collectionId
    };

    if (uploadedImageURL) {
      messageData.imageURL = uploadedImageURL;
    }

    await addDoc(collection(db, `createOrder/${collectionId}/messages`), messageData);

    setMsgInput("");
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

  const handleCloseImage = () => {
    setSelectedImage(null);
    setUploadedImageURL(null);
  };

  const deleteMessagesOnUserLeave = async (collectionId: string) => {
    try {
      const messagesRef = collection(db, `createOrder/${collectionId}/messages`);
      const querySnapshot = await getDocs(messagesRef);
      // Delete each document in the subcollection
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
        console.log(`Document with ID ${doc.id} successfully deleted.`);
      });
      console.log('All messages deleted for user:', collectionId);
    } catch (error) {
      console.error('Error deleting messages:', error);
    }
  };

  const cancelOrder = async () => {
    await deleteMessagesOnUserLeave(collectionId || "")
    router.push("/");
  };

  useEffect(() => {
    if (messages.length > 0) {
      setMakerWallet(messages[0]?.sender || "");
    }
  }, [messages]);

  // useEffect(() => {
  //   const getting = async () => {
  //     const res = await walletP2P(user2, walletAddress);
  //     setMaker(res);
  //   };
  //   getting();
  // }, [walletAddress, user2]);

  return (
    <Box
      sx={{
        position: "relative",
        width: { xs: "100%", md: "30%" },
        marginTop: { md: 0 },
      }}
      className={`${!chatDisplay ? "hidden" : ""
        } md:flex border bg-white rounded-lg h-[500px] ml-0 md:ml-3 flex flex-col justify-between`}
    >
      <Box className="w-full flex justify-between items-center border-b p-4">
        <Box className="flex">
          <button
            onClick={() => setChatDisplay(false)}
            className="border-0 md:hidden"
          >
            ◀
          </button>
          <Avatar />
          <Box className="ml-1">
            <Typography fontSize={14}>
              {isSeller ? `${makerWallet?.slice(0, 6)}...${makerWallet?.slice(-6)}` : `${seller?.address?.slice(0, 6)}...${seller?.address?.slice(-6)}`}
            </Typography>
            <Typography fontSize={14}> {isSeller ? "unknown" : seller?.name || ""}</Typography>
            {/* <Typography fontSize={14}> {!seller ? "unknown" : seller.address?.slice(0, 6) + "..." + seller.address?.slice(-6)}</Typography> */}
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
            <Box className="w-full flex flex-col items-center p-4  overflow-hidden">
              <IconButton
                sx={{
                  position: "absolute",
                  top: 80,
                  right: 10,
                  zIndex: 10,
                  backgroundColor: "white",
                }}
                onClick={handleCloseImage}
              >
                <IoCloseCircleOutline />
              </IconButton>
              <Image
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
                layout="fill"
                objectFit="contain"
              />
            </Box>
          ) : (
            <MessageList>
              {messages.map((msg: any, index: any) => {
                return (
                  <Box
                    key={index}
                    className={`w-full flex items-center ${msg.sender === user?.address ? "justify-end" : "justify-start"
                      }`}
                  >
                    <Box
                      className={`p-2 rounded-lg w-[60%] ${msg.sender === user?.address
                        ? "bg-blue-100 text-left"
                        : "bg-pink-100 text-right"
                        } mb-2`}
                    >
                      <Typography
                        className={`text-[9px]  ${false ? "text-right" : "text-left"
                          }`}
                      >
                        {msg?.sender === user?.address ? user?.name : isSeller ? "unknown" : seller?.name}
                      </Typography>
                      <Typography
                        className={`text-sm  ${false ? "text-right" : "text-left"
                          }`}
                      >
                        {msg.text}
                      </Typography>
                      <Typography
                        className={`text-[9px] ${false ? "text-left" : "text-right"
                          }`}
                      >
                        {msg?.createdAt.toLocaleTimeString()}
                      </Typography>
                      {msg?.imageURL && (
                        <Box>
                          <img src={msg?.imageURL} alt="Attached" />
                        </Box>
                      )}
                    </Box>
                  </Box>
                );
              })}
            </MessageList>
          )}
        </div>
      </MainContainer>
      <Box className="w-full flex justify-between items-center px-4 py-3 border-t">
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
          value={msgInput}
          onChange={(e) => setMsgInput(e.target.value)}
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

export default ChatRoomNew;
