// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   Typography,
//   Stepper,
//   StepLabel,
//   Step,
// } from "@mui/material";
// import ThumbUpIcon from "@mui/icons-material/ThumbUp";
// import ThumbDownIcon from "@mui/icons-material/ThumbDown";
// import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import LanguageIcon from "@mui/icons-material/Language";
// import SettingsIcon from "@mui/icons-material/Settings";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import DropDown from "@/components/Button/DropDown";
// import ChatRoom from "@/components/ChatRoom/ChatRoom";
// import { useRouter } from "next/router";
// import { getWalletAddress } from "@/hooks/cooket"; // Ensure the correct path to your cookie hook

// const Purchase = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const [btnText, setBtnText] = useState("create escrow");
//   const [title, setTitle] = useState("Before we begin");
//   const [para, setPara] = useState(
//     "You have to wait for the seller to put the cryptocurrencies in escrow. Do not make the payment until the above is done."
//   );
//   const [wallet, setWalletAddress] = useState<string | undefined>("");

//   const steps = [
//     "Select master blaster campaign settings",
//     "Create an ad group",
//     "Create an ad",
//   ];

//   const textChange = () => {
//     if (btnText === "create escrow") {
//       setBtnText("Mark as Paid");
//       setTitle("Keep in touch with the seller");
//       setPara(
//         "To continue, transfer the fiat under the established conditions and mark as paid."
//       );
//     } else if (btnText === "Mark as Paid") {
//       setBtnText("released crypto");
//       setTitle("Perfect");
//       setPara(
//         "Now you will have to wait for the seller to release the cryptocurrency."
//       );
//     } else {
//       setBtnText("released crypto");
//       setTitle("Perfect");
//       setPara(
//         "Now you will have to wait for the seller to release the cryptocurrency."
//       );
//     }
//   };

//   useEffect(() => {
//     const address = getWalletAddress();
//     if (address) {
//       setWalletAddress(address);
//     }
//   }, []);

//   return (
//     <>
//       <Box className="w-full flex justify-end items-center my-1 py-1">
//         <Box sx={{ width: "100%" }}>
//           <Stepper activeStep={1} alternativeLabel>
//             {steps.map((label) => (
//               <Step key={label}>
//                 <StepLabel>{label}</StepLabel>
//               </Step>
//             ))}
//           </Stepper>
//         </Box>
//         <Box
//           sx={{
//             width: "50%",
//             display: "flex",
//             justifyContent: "end",
//             alignItems: "center",
//           }}
//         >
//           <Box className="mx-1 p-2 rounded-full bg-blue-100">
//             <NotificationsIcon />
//           </Box>
//           <Box className="mx-1 p-2 rounded-full bg-blue-100">
//             <LanguageIcon />
//             EN
//           </Box>
//           <DropDown />
//           <Box className="mx-1 p-2 rounded-full bg-blue-100">
//             <SettingsIcon />
//             <AccountCircleIcon />
//           </Box>
//         </Box>
//       </Box>
//       <Box className="bg-blue-100 p-5 flex">
//         <Box
//           style={{
//             borderRadius: 10,
//             backgroundColor: "white",
//             width: "50%",
//             padding: 20,
//           }}
//         >
//           <Box>
//             <Typography color="initial" style={{ color: "black", fontWeight: "bold" }}>
//               P2P Purchase
//             </Typography>
//           </Box>
//           <div className=" flex justify-between items-start">
//             <Box
//               style={{
//                 width: "50%",
//                 display: "flex",
//                 justifyContent: "space-between",
//               }}
//             >
//               <Box style={{ display: "flex" }}>
//                 <Typography color="initial">Add from</Typography>
//                 <Typography color="initial">
//                   {wallet
//                     ? `${wallet.slice(0, 6)}...${wallet.slice(-4)}`
//                     : "0x81...a6d5"}
//                 </Typography>
//               </Box>
//               <Box>
//                 <Typography color="initial">Less Info</Typography>
//               </Box>
//             </Box>
//             <Box
//               style={{
//                 width: "50%",
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "end",
//                 alignItems: "end",
//               }}
//             >
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//               >
//                 <Typography>0%</Typography>
//                 <Button>
//                   <ThumbUpIcon style={{ color: "green" }} />
//                 </Button>
//                 <Typography>0</Typography>
//               </Box>
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//               >
//                 <Typography>0 Opinions</Typography>
//                 <Button>
//                   <ThumbDownIcon style={{ color: "gray" }} />
//                 </Button>
//                 <Typography>0</Typography>
//               </Box>
//             </Box>
//           </div>
//           <Box>
//             <Typography sx={{ color: "gray" }}>2 completed transactions</Typography>
//             <Typography sx={{ color: "gray" }}>Transactions amount: 3 USD</Typography>
//             <Typography sx={{ color: "gray" }}>Average release time: 2 min</Typography>
//             <Box sx={{ display: "flex", marginTop: 0.5 }}>
//               <Typography sx={{ color: "gray" }}>Location:</Typography>
//               <Typography sx={{ fontWeight: "bold" }}>Non specified</Typography>
//             </Box>
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 marginTop: 0.5,
//               }}
//             >
//               <Box sx={{ display: "flex", width: "100%" }}>
//                 <Typography color="initial">Wallet</Typography>
//                 <Typography sx={{ color: "blue", marginLeft: 1 }}>
//                   {wallet
//                     ? `${wallet.slice(0, 6)}...${wallet.slice(-4)}`
//                     : "0x81...a6d5"}
//                   <InsertDriveFileIcon />
//                 </Typography>
//               </Box>
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "start",
//                   justifyContent: "start",
//                   width: "100%",
//                 }}
//               >
//                 <Typography color="initial">Start of activity:</Typography>
//                 <Typography sx={{ color: "black" }}>2024-02-01</Typography>
//               </Box>
//             </Box>
//           </Box>
//           <Box
//             style={{
//               display: "flex",
//               flexDirection: "row",
//               justifyContent: "center",
//             }}
//             className="py-6 border-t-2 border-b-2 border-blue-200 my-4"
//           >
//             <Box
//               sx={{
//                 width: "40%",
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <Box>
//                 Receive{" "}
//                 <Typography sx={{ display: "inline-block" }}>0.995 USDT</Typography>
//               </Box>
//               <Box>
//                 Paying{" "}
//                 <Typography sx={{ display: "inline-block" }}>10000 ARS</Typography>
//               </Box>
//               <Box>
//                 Network{" "}
//                 <Typography sx={{ display: "inline-block" }}>BNB chain</Typography>
//               </Box>
//             </Box>
//             <Box
//               sx={{
//                 width: "40%",
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <Box>
//                 Price:{" "}
//                 <Typography sx={{ display: "inline-block" }}>10000 ARS</Typography>
//               </Box>
//               <Box>
//                 Commission:{" "}
//                 <Typography sx={{ display: "inline-block" }}>0.005 USDT</Typography>
//               </Box>
//               <Box>
//                 Escrow ID:{" "}
//                 <Typography sx={{ display: "inline-block" }}>107748224558073</Typography>
//               </Box>
//             </Box>
//           </Box>
//           <Box>
//             <Box>
//               Payment method:
//               <Typography sx={{ display: "inline-block", fontWeight: 605 }}>
//                 text
//               </Typography>
//             </Box>
//             <Box>
//               <Typography sx={{ display: "inline-block", fontWeight: 605 }}>
//                 Terms and conditions:
//               </Typography>
//               Non specified
//             </Box>
//           </Box>

//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               alignItems: "center",
//               paddingBlock: 5,
//             }}
//           >
//             <Typography
//               color="initial"
//               sx={{ color: "black", fontWeight: "bold" }}
//             >
//               {title}
//             </Typography>
//             <Typography sx={{ textAlign: "center", marginBlock: 2 }}>
//               {para}
//             </Typography>
//             <Box sx={{ display: "flex", justifyContent: "center" }}>
//               <Button sx={{ border: "1px solid blue", marginRight: 2 }}>
//                 Cancel
//               </Button>
//               <Button
//                 className="text-gray-700 bg-gray-200 rounded"
//                 onClick={textChange}
//               >
//                 {btnText}
//               </Button>
//             </Box>
//           </Box>
//         </Box>
//         <ChatRoom />
//       </Box>
//     </>
//   );
// };

// export default Purchase;

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Stepper,
  StepLabel,
  Step,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LanguageIcon from "@mui/icons-material/Language";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DropDown from "@/components/Button/DropDown";
import ChatRoom from "@/components/ChatRoom/ChatRoom";
import { useRouter } from "next/router";
import { getWalletAddress } from "@/hooks/cooket"; // Ensure the correct path to your cookie hook

const Purchase = () => {
  const router = useRouter();
  const { id } = router.query;
  const [btnText, setBtnText] = useState("create escrow");
  const [title, setTitle] = useState("Before we begin");
  const [para, setPara] = useState(
    "You have to wait for the seller to put the cryptocurrencies in escrow. Do not make the payment until the above is done."
  );
  const [wallet, setWalletAddress] = useState<string | undefined>("");

  const steps = [
    "Select master blaster campaign settings",
    "Create an ad group",
    "Create an ad",
  ];

  const textChange = () => {
    if (btnText === "create escrow") {
      setBtnText("Mark as Paid");
      setTitle("Keep in touch with the seller");
      setPara(
        "To continue, transfer the fiat under the established conditions and mark as paid."
      );
    } else if (btnText === "Mark as Paid") {
      setBtnText("released crypto");
      setTitle("Perfect");
      setPara(
        "Now you will have to wait for the seller to release the cryptocurrency."
      );
    } else {
      setBtnText("released crypto");
      setTitle("Perfect");
      setPara(
        "Now you will have to wait for the seller to release the cryptocurrency."
      );
    }
  };

  useEffect(() => {
    const address = getWalletAddress();
    if (address) {
      setWalletAddress(address);
    }
  }, []);

  return (
    <>
      <Box className="w-full md:flex justify-end items-center my-1 py-1">
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={1} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          <Box className="mx-1 p-2 rounded-full bg-blue-100">
            <NotificationsIcon />
          </Box>
          <Box className="mx-1 p-2 rounded-full bg-blue-100">
            <LanguageIcon />
            EN
          </Box>
          <DropDown />
          <Box className="mx-1 p-2 rounded-full bg-blue-100">
            <SettingsIcon />
            <AccountCircleIcon />
          </Box>
        </Box>
      </Box>
      <Box className="bg-blue-100 p-5 md:flex">
        <Box
          sx={{
            backgroundColor: "white",
            width: { xs: "100%", md: "50%" },
            padding: 2,
          }}
          className="rounded-lg"
        >
          <Box>
            <Typography
              color="initial"
              style={{ color: "black", fontWeight: "bold" }}
            >
              P2P Purchase
            </Typography>
          </Box>
          <div className=" flex justify-between items-start">
            <Box
              style={{
                width: "50%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box style={{ display: "flex" }}>
                <Typography color="initial">Add from</Typography>
                <Typography color="initial">
                  {wallet
                    ? `${wallet.slice(0, 6)}...${wallet.slice(-4)}`
                    : "0x81...a6d5"}
                </Typography>
              </Box>
              <Box>
                <Typography color="initial">Less Info</Typography>
              </Box>
            </Box>
            <Box
              style={{
                width: "50%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "end",
                alignItems: "end",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography>0%</Typography>
                <Button>
                  <ThumbUpIcon style={{ color: "green" }} />
                </Button>
                <Typography>0</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography>0 Opinions</Typography>
                <Button>
                  <ThumbDownIcon style={{ color: "gray" }} />
                </Button>
                <Typography>0</Typography>
              </Box>
            </Box>
          </div>
          <Box>
            <Typography sx={{ color: "gray" }}>
              2 completed transactions
            </Typography>
            <Typography sx={{ color: "gray" }}>
              Transactions amount: 3 USD
            </Typography>
            <Typography sx={{ color: "gray" }}>
              Average release time: 2 min
            </Typography>
            <Box sx={{ display: "flex", marginTop: 0.5 }}>
              <Typography sx={{ color: "gray" }}>Location:</Typography>
              <Typography sx={{ fontWeight: "bold" }}>Non specified</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 0.5,
              }}
            >
              <Box sx={{ display: "flex", width: "100%" }}>
                <Typography color="initial">Wallet</Typography>
                <Typography sx={{ color: "blue", marginLeft: 1 }}>
                  {wallet
                    ? `${wallet.slice(0, 6)}...${wallet.slice(-4)}`
                    : "0x81...a6d5"}
                  <InsertDriveFileIcon />
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "start",
                  justifyContent: "start",
                  width: "100%",
                }}
              >
                <Typography color="initial">Start of activity:</Typography>
                <Typography sx={{ color: "black" }}>2024-02-01</Typography>
              </Box>
            </Box>
          </Box>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
            className="py-6 border-t-2 border-b-2 border-blue-200 my-4"
          >
            <Box
              sx={{
                width: "40%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box>
                Receive{" "}
                <Typography sx={{ display: "inline-block" }}>
                  0.995 USDT
                </Typography>
              </Box>
              <Box>
                Paying{" "}
                <Typography sx={{ display: "inline-block" }}>
                  10000 ARS
                </Typography>
              </Box>
              <Box>
                Network{" "}
                <Typography sx={{ display: "inline-block" }}>
                  BNB chain
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                width: "40%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box>
                Price:{" "}
                <Typography sx={{ display: "inline-block" }}>
                  10000 ARS
                </Typography>
              </Box>
              <Box>
                Commission:{" "}
                <Typography sx={{ display: "inline-block" }}>
                  0.005 USDT
                </Typography>
              </Box>
              <Box>
                Escrow ID:{" "}
                <Typography sx={{ display: "inline-block" }}>
                  107748224558073
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box>
            <Box>
              Payment method:
              <Typography sx={{ display: "inline-block", fontWeight: 605 }}>
                text
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ display: "inline-block", fontWeight: 605 }}>
                Terms and conditions:
              </Typography>
              Non specified
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              paddingBlock: 5,
            }}
          >
            <Typography
              color="initial"
              sx={{ color: "black", fontWeight: "bold" }}
            >
              {title}
            </Typography>
            <Typography sx={{ textAlign: "center", marginBlock: 2 }}>
              {para}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button sx={{ border: "1px solid blue", marginRight: 2 }}>
                Cancel
              </Button>
              <Button
                className="text-gray-700 bg-gray-200 rounded"
                onClick={textChange}
              >
                {btnText}
              </Button>
            </Box>
          </Box>
        </Box>
        <ChatRoom />
      </Box>
    </>
  );
};

export default Purchase;
