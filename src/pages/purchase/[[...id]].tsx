import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Stepper,
  StepLabel,
  Step,
} from "@mui/material";
import { useAppContext } from "@/context/AppContext";
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
import { getWalletAddress } from "@/hooks/cookies";
import {
  CreateEsCrow,
  ReleaseEsCrow,
  SetMarkAsPaid,
} from "@/hooks/call_contract";
import useFirestoreListener from "@/hooks/useFirestoreListener";
import { UpdateP2PStatus } from "@/hooks/getP2P";

const Purchase = () => {
  const { maker } = useAppContext();
  const router = useRouter();
  const { id } = router.query;
  const docId =
    Array.isArray(id) && id.length > 0
      ? id[0]
      : typeof id === "string"
        ? id
        : "";
  const [p2pOrder, setP2pOrder] = useState<any>(null);
  const statusText = [
    {
      btnText: "Create Escrow",
      title: "Before we begin",
      para: "You have to wait for the seller to put the cryptocurrencies in escrow. Do not make the payment until the above is done.",
    },
    {
      btnText: "Release Escrow",
      title: "Keep in touch with the seller",
      para: "To continue, transfer the fiat under the established conditions and mark as paid.",
    },
    {
      btnText: "Release Escrow",
      title: "Keep in touch with the seller",
      para: "To continue, transfer the fiat under the established conditions and mark as paid.",
    },
    {
      btnText: "Released Escrow",
      title: "Perfect",
      para: "Now you will have to wait for the seller to release the cryptocurrency.",
    },
  ];
  const [wallet, setWalletAddress] = useState<string | undefined>("");
  const steps = ["Crypto in escrow", "Fiat transferred", "Crypto released"];

  const getNewData = (p2pOrder: any) => {
    console.log(p2pOrder);
    setP2pOrder(p2pOrder);
  };

  const eventListener = useFirestoreListener("P2POrder", docId, getNewData);

  const updateStatus = async () => {
    try {
      if (p2pOrder?.status === "0") {
        const res = await CreateEsCrow();
        if (res) {
          await UpdateP2PStatus(docId, "1");
        } else {
          console.error("Failed to create escrow");
        }
      } else if (p2pOrder?.status === "1") {
        const res = await SetMarkAsPaid();
        if (res) {
          await UpdateP2PStatus(docId, "1");
        } else {
          console.error("Failed to mark as paid");
        }
      } else if (p2pOrder?.status === "2") {
        const res = await ReleaseEsCrow();
        if (res) {
          await UpdateP2PStatus(docId, "2");
        } else {
          console.error("Failed to release crypto");
        }
      }
    } catch (error: any) {
      if (error.code === "ACTION_REJECTED") {
        console.error("User rejected the transaction");
        alert("Transaction was rejected by the user.");
      } else {
        console.error("An error occurred:", error);
        alert("An error occurred while processing the transaction.");
      }
    }
  };

  useEffect(() => {
    if (docId) {
      eventListener();
    }
  }, [docId]);

  useEffect(() => {
    const address = getWalletAddress();
    if (address) {
      setWalletAddress(address);
    }
  }, []);

  const [chatDisplay, setChatDisplay] = useState(false)
  // const screenWidth = window ? window?.innerWidth : 1000;


  // MS BT order Id and timer
  return (
    <>
      <Box className="w-full md:flex justify-end items-center my-1 py-1 ">
        <Box sx={{ width: "100%" }}>
          <Stepper
            activeStep={p2pOrder?.status ? Number(p2pOrder?.status) : 0}
            alternativeLabel
          >
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel style={{ fontSize: 12 }}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            display: "flex",
            justifyContent: { xs: "center", md: "end" },
            alignItems: "center",
            marginBlock: { xs: 2, md: 0 },
          }}
        >
          <Box className="mx-1 px-2 py-1 rounded-full bg-blue-100">
            <NotificationsIcon sx={{ fontSize: 16 }} />
          </Box>
          <Box
            sx={{ fontSize: 12 }}
            className="mx-1 px-2 py-1 rounded-full bg-blue-100"
          >
            <LanguageIcon sx={{ fontSize: 16 }} />
            EN
          </Box>
          <DropDown />
          <Box className="mx-1 px-2 py-1 rounded-full bg-blue-100">
            <SettingsIcon sx={{ fontSize: 16 }} />
            <AccountCircleIcon sx={{ fontSize: 16 }} />
          </Box>
        </Box>
      </Box>
      <Box className="bg-blue-100 p-5 md:flex  ">
        <Box
          sx={{
            backgroundColor: "white",
            width: { xs: "100%", md: "50%" },
            padding: 2,
          }}
          className={`${chatDisplay ? "hidden" : ""} md:block rounded-lg`}
        >
          <Box>
            <Typography
              color="initial"
              style={{ color: "black", fontWeight: "bold", fontSize: 16 }}
            >
              P2P Purchase
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: "start",
            }}
          >
            <Box
              sx={{
                width: { xs: "100%", sm: "50%" },
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box style={{ display: "flex" }}>
                <Typography color="initial" fontSize={14} marginRight={1}>
                  Add from
                </Typography>
                <Typography color="initial" fontSize={14}>
                  {wallet
                    ? `${wallet.slice(0, 6)}...${wallet.slice(-4)}`
                    : "0x81...a6d5"}
                </Typography>
              </Box>
              <Box>
                <Typography color="initial" fontSize={14}>
                  Less Info
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                width: { xs: "100%", sm: "50%" },
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
                <Typography fontSize={14}>0%</Typography>
                <Button>
                  <ThumbUpIcon style={{ color: "green", fontSize: 16 }} />
                </Button>
                <Typography fontSize={14}>0</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography fontSize={14}>0 Opinions</Typography>
                <Button>
                  <ThumbDownIcon style={{ color: "gray", fontSize: 16 }} />
                </Button>
                <Typography fontSize={14}>0</Typography>
              </Box>
            </Box>
          </Box>
          <Box>
            <Typography sx={{ color: "gray", fontSize: 14 }}>
              2 completed transactions
            </Typography>
            <Typography sx={{ color: "gray", fontSize: 14 }}>
              Transactions amount: 3 USD
            </Typography>
            <Typography sx={{ color: "gray", fontSize: 14 }}>
              Average release time: 2 min
            </Typography>
            <Box sx={{ display: "flex", marginTop: 0.5 }}>
              <Typography sx={{ color: "gray", fontSize: 14 }}>
                Location:
              </Typography>
              <Typography sx={{ fontWeight: "bold", fontSize: 14 }}>
                Non specified
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                marginTop: 0.5,
                fontSize: 14,
              }}
            >
              <Box sx={{ display: "flex", width: "100%" }}>
                <Typography color="initial">Wallet</Typography>
                <Typography sx={{ color: "blue", marginLeft: 1, fontSize: 14 }}>
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
                  justifyContent: "end",
                  width: "100%",
                }}
              >
                <Typography color="initial" fontSize={14}>
                  Start of activity:
                </Typography>
                <Typography sx={{ color: "black" }} fontSize={14}>
                  2024-02-01
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: { xs: "center", sm: "space-between" },
              borderBlock: 1,
              paddingBlock: 1,
            }}
            className="  border-blue-200 "
          >
            <Box
              sx={{
                width: { xs: "100%", md: "40%" },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: { xs: "start", md: "end" },
              }}
            >
              <Box sx={{ fontSize: 14 }}>
                Receive{" "}
                <Typography sx={{ display: "inline-block", fontSize: 14 }}>
                  0.995 USDT
                </Typography>
              </Box>
              <Box sx={{ fontSize: 14 }}>
                Paying{" "}
                <Typography sx={{ display: "inline-block", fontSize: 14 }}>
                  10000 ARS
                </Typography>
              </Box>
              <Box sx={{ fontSize: 14 }}>
                Network{" "}
                <Typography sx={{ display: "inline-block", fontSize: 14 }}>
                  BNB chain
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                width: { xs: "100%", md: "40%" },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "start",
                marginBlock: 2,
              }}
            >
              <Box sx={{ fontSize: 14 }}>
                Price:{" "}
                <Typography sx={{ display: "inline-block", fontSize: 14 }}>
                  10000 ARS
                </Typography>
              </Box>
              <Box sx={{ fontSize: 14 }}>
                Commission:{" "}
                <Typography sx={{ display: "inline-block", fontSize: 14 }}>
                  0.005 USDT
                </Typography>
              </Box>
              <Box sx={{ fontSize: 14 }}>
                Escrow ID:{" "}
                <Typography sx={{ display: "inline-block", fontSize: 14 }}>
                  107748224558073
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box>
            <Box sx={{ fontSize: 14 }}>
              Payment method:{" "}
              <Typography
                sx={{ display: "inline-block", fontWeight: 605, fontSize: 14 }}
              >
                text
              </Typography>
            </Box>
            <Box sx={{ fontSize: 14 }}>
              <Typography
                sx={{ display: "inline-block", fontWeight: 605, fontSize: 14 }}
              >
                Terms and conditions:{" "}
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
              paddingTop: 2,
            }}
          >
            <Typography
              color="initial"
              sx={{ color: "black", fontWeight: "bold", fontSize: 16 }}
            >
              {statusText[p2pOrder?.status]?.title}
            </Typography>
            <Typography
              sx={{ textAlign: "center", marginBlock: 1, fontSize: 14 }}
            >
              {statusText[p2pOrder?.status]?.para}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                sx={{ border: "1px solid blue", marginRight: 2, fontSize: 12 }}
              >
                Cancel
              </Button>
              {maker && (
                <Button
                  disabled={p2pOrder?.status === "1"}
                  sx={{ fontSize: 12 }}
                  className={`text-gray-700 ${p2pOrder?.status === "1" ? "bg-blue-100" : "bg-blue-500"
                    } rounded`}
                  onClick={updateStatus}
                >
                  {statusText[p2pOrder?.status]?.btnText}
                </Button>
              )}
              {maker === false && (
                <Button
                  disabled={
                    p2pOrder?.status === "0" || p2pOrder?.status
                      ? Number(p2pOrder?.status) > 1
                      : false
                  }
                  sx={{ fontSize: 12 }}
                  className={`text-gray-700 ${p2pOrder?.status === "0" ? "bg-blue-100" : "bg-blue-500"
                    } rounded`}
                  onClick={updateStatus}
                >
                  Mark as Paid
                </Button>
              )}

              <Button
                sx={{ fontSize: 12 }}
                className={`text-gray-700 md:hidden bg-green-500 ms-3`}
                onClick={() => setChatDisplay(true)}
              >
                Chat
              </Button>
            </Box>
          </Box>
        </Box>
        <ChatRoom setChatDisplay={setChatDisplay} chatDisplay={chatDisplay} />
      </Box>
    </>
  );
};

export default Purchase;
