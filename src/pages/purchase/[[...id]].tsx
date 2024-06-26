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
import { getWalletAddress } from "@/hooks/cookies";
import {
  CreateEsCrow,
  ReleaseEsCrow,
  SetMarkAsPaid,
} from "@/hooks/call_contract";

const Purchase = () => {
  const router = useRouter();
  const { id } = router.query;
  const takerAddress = Array.isArray(id) && id.length > 0 ? id[0] : undefined;
  console.log("takerAddress", takerAddress);
  const [activeStep, setActiveStep] = useState(0);
  const [btnText, setBtnText] = useState("create escrow");
  const [title, setTitle] = useState("Before we begin");
  const [para, setPara] = useState(
    "You have to wait for the seller to put the cryptocurrencies in escrow. Do not make the payment until the above is done."
  );
  const [wallet, setWalletAddress] = useState<string | undefined>("");

  const steps = ["Crypto in escrow", "Fiat transferred", "Crypto released"];

  const textChange = async () => {
    try {
      if (activeStep === 0) {
        const res = await CreateEsCrow();
        if (res) {
          setBtnText("Mark as Paid");
          setTitle("Keep in touch with the seller");
          setPara(
            "To continue, transfer the fiat under the established conditions and mark as paid."
          );
          setActiveStep(1);
        } else {
          console.error("Failed to create escrow");
        }
      } else if (activeStep === 1) {
        const res = await SetMarkAsPaid();
        setBtnText("released crypto");
        setTitle("Perfect");
        setPara(
          "Now you will have to wait for the seller to release the cryptocurrency."
        );
        if (res) {
          setActiveStep(2);
        }
      } else if (activeStep === 2) {
        const res = await ReleaseEsCrow();
        if (res) {
          setBtnText("released crypto");
          setTitle("Perfect");
          setPara(
            "Now you will have to wait for the seller to release the cryptocurrency."
          );
          setActiveStep(3);
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
    const address = getWalletAddress();
    if (address) {
      setWalletAddress(address);
    }
  }, []);
  // MS BT order Id and timer
  return (
    <>
      <Box className="w-full md:flex justify-end items-center my-1 py-1 ">
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activeStep} alternativeLabel>
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
          className="rounded-lg"
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
              {title}
            </Typography>
            <Typography
              sx={{ textAlign: "center", marginBlock: 1, fontSize: 14 }}
            >
              {para}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                sx={{ border: "1px solid blue", marginRight: 2, fontSize: 12 }}
              >
                Cancel
              </Button>
              <Button
                sx={{ fontSize: 12 }}
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
