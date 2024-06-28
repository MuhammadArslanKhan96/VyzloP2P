import {
  FormControl,
  MenuItem,
  Box,
  Button,
  Typography,
  InputLabel,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import noADs from "../../../public/images/adsEmpty.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { CreateOrder } from "@/hooks/createOrders";
import { GetToken } from "@/hooks/getTokensByIdName";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import PaymentMethodTags from "../Field/PaymentMethodTags";
import Location from "../Location/Location";
import CountrySelector from "../Location/Location";
const MyAds = () => {
  const [age, setAge] = React.useState("");

  const [value, setValue] = React.useState("female");

  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
  const [activeModel, setActiveModel] = useState(0);
  const [nextStep, setNextStep] = useState(false);
  const [newAds, setNewAds] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [terms, setTerms] = React.useState(false);

  const { wallet } = useAppContext();
  const [networkData, setNetworkData] = useState<any[]>([]);
  const [createOrder, setCreateOrder] = useState({
    blockChain: "",
    cryptoSymbol: "",
    fiatCurrency: "usd",
    method: "",
    selectedUserId: 0,
    takerAddress: wallet,
    txType: "P2P",
    uid: 0,
    value: "0.0001",
    message: "",
    paymentMethod: "",
    terms: "",
  });
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  useEffect(() => {
    const fetchToken = async (blockChainId: string) => {
      if (!blockChainId) return;
      const { data, error } = await GetToken(blockChainId);
      setNetworkData(data);
    };

    fetchToken(createOrder.blockChain);
  }, [createOrder]);

  const buyMethod = () => {
    setCreateOrder((prevOrder: any) => ({
      ...prevOrder,
      method: "buy",
    }));
    setNextStep(true);
  };
  const salesMethod = () => {
    setCreateOrder((prevOrder: any) => ({
      ...prevOrder,
      method: "sale",
    }));
    setNextStep(true);
  };
  const handleNetworkChange = (event: any) => {
    setCreateOrder((prevOrder: any) => ({
      ...prevOrder,
      blockChain: event.target.value,
    }));
  };
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  const coinChange = (event: any) => {
    const selectedKey = event.target.value;
    // setSelectedKey(selectedKey);

    const selectedItem = networkData
      .flatMap(Object.entries)
      .find(([key, value]) => key === selectedKey);

    if (selectedItem) {
      setCreateOrder((prevOrder: any) => ({
        ...prevOrder,
        cryptoSymbol: selectedItem[1].symbol,
      }));
      console.log("Selected value:", selectedItem[1].symbol);
    }
  };
  const messageHandle = (event: any) => {
    setCreateOrder((prevOrder: any) => ({
      ...prevOrder,
      message: event.target.value,
    }));
  };
  const termsHandle = (event: any) => {
    setCreateOrder((prevOrder: any) => ({
      ...prevOrder,
      terms: event.target.value,
    }));
  };
  const paymentMethod = (paymentMethods: any) => {
    console.log(paymentMethods);
    setCreateOrder((prevOrder: any) => ({
      ...prevOrder,
      paymentMethod: paymentMethods,
    }));
  };
  const nextModel = () => {
    setActiveModel((prevModel) => (prevModel < 2 ? prevModel + 1 : prevModel));
  };

  const preModel = () => {
    setActiveModel((prevModel) => (prevModel - 1 < 0 ? 0 : prevModel - 1));
    if (activeModel === 0) {
      setNextStep(false);
    }
    if (nextStep === false) {
      setNewAds(true);
    }
  };
  const newAdsBtn = () => {
    setNewAds(false);
  };
  const list1 = [
    { price: "NaN" },
    { availableCryptos: "NaN" },
    { "limit of the offers:": "NaN" },
    { minimum: "NaN" },
    { maximum: "NaN" },
    { method: createOrder.method },
  ];
  const list2 = [
    { Network: createOrder.blockChain },
    { Crypto: createOrder.cryptoSymbol },
    { Currency: "NaN" },
    {
      "payment method": Array.isArray(createOrder.paymentMethod)
        ? createOrder.paymentMethod.join(" ")
        : createOrder.paymentMethod,
    },
    { Locaition: "NaN" },
    { "automatic message": "Read More" },
    { "terms and conditions": "check" },
  ];
  const handleClose = () => {
    setNotification({ ...notification, open: false });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseOpen = () => {
    setOpen(false);
  };

  const handleClickTerms = () => {
    setTerms(true);
  };

  const handleCloseTerms = () => {
    setTerms(false);
  };

  const submitAds = async () => {
    for (const [key, value] of Object.entries(createOrder)) {
      if (value === "" || value === undefined) {
        setNotification({
          open: true,
          message: `Field ${key} is empty`,
          severity: "error",
        });
        return;
      }
    }

    try {
      const res = await CreateOrder(createOrder);
      console.log("Order created successfully:", res);
      setNotification({
        open: true,
        message: "Order created successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("Error creating order:", error);
      setNotification({
        open: true,
        message: "Error creating order",
        severity: "error",
      });
    }
  };

  return (
    <Box className="bg-[#d4ebfc] max-lg:pt-16 pt-32 sm:w-screen  h-full min-h-screen pb-5">
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={notification.severity as "success" | "error"}
        >
          {notification.message}
        </Alert>
      </Snackbar>
      {newAds && (
        <div className="flex  flex-col px-8 py-6 justify-center items-center gap-x-6 mx-auto w-full xl:w-[80%] rounded-lg bg-white mt-4">
          <Box className="flex flex-col justify-center items-center">
            <Image src={noADs} alt="no ads" />
            <Typography
              variant="h6"
              sx={{ color: "black", fontWeight: "bold" }}
            >
              No ads created yet{" "}
            </Typography>
            <Typography marginBlock={2} sx={{ color: "black" }}>
              You can define the terms of the transaction when creating an ad.{" "}
            </Typography>
            <button
              className="bg-blue-500 px-2  py-1 text-white rounded-lg hover:bg-blue-400"
              onClick={newAdsBtn}
            >
              Publish New Ad
            </button>
          </Box>
        </div>
      )}
      {nextStep ? (
        <div className="flex  flex-col px-8 py-6 justify-center items-center gap-x-6 mx-auto w-full xl:w-[80%] rounded-lg bg-white mt-4">
          {activeModel === 0 && (
            <div className="flex  flex-col  justify-center items-center gap-x-6 mx-auto w-full ">
              <Box className="w-full flex mb-10">
                <ArrowBackIcon onClick={preModel} />
                <Box className="flex flex-col">
                  <Typography color="initial">
                    creation of a purchase annoucement.
                  </Typography>
                  <Typography color="initial">Step 2 of 4</Typography>
                </Box>
              </Box>
              <Box className="flex flex-col  justify-center items-center  w-full">
                <Typography sx={{ color: "black", fontWeight: "bold" }}>
                  Great!
                </Typography>
                <Typography sx={{ color: "black" }}>
                  Now we will ask you to give us some details of the
                  transaction.
                </Typography>
                <Box className="w-full flex flex-col justify-center  items-center mt-10 ">
                  <Box className="w-full flex flex-wrap justify-center  gap-x-10 ">
                    <Box sx={{ m: 1, minWidth: 300 }}>
                      <Typography sx={{ color: "gray" }}>
                        Which network are you going to use to make the exchange?
                      </Typography>
                      <FormControl sx={{ m: 1, minWidth: 300 }}>
                        <InputLabel id="demo-simple-select-autowidth-label">
                          Network
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-autowidth-label"
                          id="demo-simple-select-autowidth"
                          value={createOrder.blockChain}
                          onChange={handleNetworkChange}
                          label="Network"
                        >
                          <MenuItem value="BSC">BSC</MenuItem>
                          <MenuItem value="POLYGON">POLYGON</MenuItem>
                          <MenuItem value="ZETA">ZETA</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    <Box sx={{ m: 1, minWidth: 300 }}>
                      <Typography sx={{ color: "gray" }}>
                        Which currency do you want to buy?
                      </Typography>
                      <FormControl sx={{ m: 1, minWidth: 300 }}>
                        <InputLabel id="demo-simple-select-autowidth-label">
                          coin
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-autowidth-label"
                          id="demo-simple-select-autowidth"
                          value={createOrder.cryptoSymbol}
                          onChange={coinChange}
                          label="coin"
                        >
                          {networkData.length > 0 ? (
                            networkData.map((item: any, index: any) =>
                              Object.keys(item).map((key) => (
                                <MenuItem key={key} value={key}>
                                  {key}
                                </MenuItem>
                              ))
                            )
                          ) : (
                            <MenuItem disabled>No coins available</MenuItem>
                          )}
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                  <Box>
                    <Box sx={{ m: 1, minWidth: 400, maxWidth: 400 }}>
                      <Box>
                        <Typography sx={{ color: "gray" }}>
                          Which fiat currency do you want to buy?
                        </Typography>
                        <TextField sx={{ m: 1, minWidth: 400 }}></TextField>
                      </Box>
                      <Box className="flex flex-col justify-start  items-start ">
                        <Typography sx={{ color: "gray" }}>
                          Do You want to set limit to your offer?{" "}
                        </Typography>
                        <Box className="flex justify-start items-center">
                          <Box sx={{ m: 1, width: 160 }}>
                            <Typography sx={{ color: "gray", fontSize: 12 }}>
                              Miniumn offer
                            </Typography>
                            <TextField sx={{ width: 160 }}></TextField>
                          </Box>
                          <Box sx={{ m: 1, width: 160 }}>
                            <Typography sx={{ color: "gray", fontSize: 12 }}>
                              Maxium offer
                            </Typography>
                            <TextField sx={{ width: 160 }}></TextField>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ m: 1, minWidth: 800 }}>
                      <Typography sx={{ color: "gray" }}>
                        Which one or more payment methods
                      </Typography>
                      <PaymentMethodTags mutlipleMethod={paymentMethod} />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </div>
          )}
          {/* {activeModel === 2 && (
            <div className="flex  flex-col  justify-center items-center gap-x-6 mx-auto w-full ">
              <Box className="w-full flex mb-10">
                <ArrowBackIcon onClick={preModel} />
                <Box className="flex flex-col">
                  <Typography color="initial">
                    creation of a purchase annoucement.
                  </Typography>
                  <Typography color="initial">Step 3 of 5</Typography>
                </Box>
              </Box>
              <Box className="flex flex-col  justify-center items-center  w-full ">
                <Typography sx={{ color: "black", fontWeight: "bold" }}>
                  Great!
                </Typography>
                <Typography sx={{ color: "black" }}>
                  Now we need some important specifications.
                </Typography>
                <Box className="w-full flex justify-center  gap-12 flex-wrap items-start mt-10">
                  <Box sx={{ m: 1, minWidth: 400, maxWidth: 400 }}>
                    <Box>
                      <Typography sx={{ color: "gray" }}>
                        Which curreny do you want to buy?
                      </Typography>
                      <TextField sx={{ m: 1, minWidth: 400 }}></TextField>
                    </Box>
                    <Box className="flex flex-col justify-start  items-start ">
                      <Typography sx={{ color: "gray" }}>
                        Do You want to set limit to your offer?{" "}
                      </Typography>
                      <Box className="flex justify-start items-center">
                        <Box sx={{ m: 1, width: 160 }}>
                          <Typography sx={{ color: "gray", fontSize: 12 }}>
                            Miniumn offer
                          </Typography>
                          <TextField sx={{ width: 160 }}></TextField>
                        </Box>
                        <Box sx={{ m: 1, width: 160 }}>
                          <Typography sx={{ color: "gray", fontSize: 12 }}>
                            Maxium offer
                          </Typography>
                          <TextField sx={{ width: 160 }}></TextField>
                        </Box>
                      </Box>

                      <Typography
                        color="initial"
                        sx={{ fontSize: 14, color: "gray" }}
                        // className="w-[66%]"
                      >
                        vyzlo charges a 1% fee over the transaction total amount
                        to both parties Premium users are exempt from this 1%
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ m: 1, minWidth: 400 }}>
                    <Typography sx={{ color: "gray" }}>
                      In Which currecy do you want to make the payment?
                    </Typography>
                    <TextField sx={{ m: 1, minWidth: 400 }}></TextField>
                  </Box>
                </Box>
              </Box>
            </div>
          )} */}
          {activeModel === 1 && (
            <div className="flex  flex-col  justify-center items-center gap-x-6 mx-auto w-full ">
              <Box className="w-full flex mb-10">
                <ArrowBackIcon onClick={preModel} />
                <Box className="flex flex-col">
                  <Typography color="initial">
                    creation of a purchase annoucement.
                  </Typography>
                  <Typography color="initial">Step 3 of 4</Typography>
                </Box>
              </Box>
              <Box className="flex flex-col  justify-center items-center  w-full ">
                <Typography sx={{ color: "black", fontWeight: "bold" }}>
                  Almost finished On this step!
                </Typography>
                <Typography sx={{ color: "black" }}>
                  You can add additional information according to your
                  preferences.
                </Typography>
                <Box className="w-full flex justify-center  gap-8 items-center mt-10  ">
                  <Box className="w-[40%]">
                    {/* <Typography>
                      {" "}
                      How do you want your ad to be seen?
                    </Typography>
                    <Box className="w-full  ">
                      <FormControl>
                        <RadioGroup
                          row
                          aria-labelledby="demo-controlled-radio-buttons-group"
                          name="controlled-radio-buttons-group"
                          value={value}
                          onChange={handleChangeRadio}
                        >
                          <FormControlLabel
                            value="public"
                            control={<Radio />}
                            label="public"
                          />
                          <FormControlLabel
                            value="private"
                            control={<Radio />}
                            label="private"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Box> */}
                    {/* <Location /> */}
                    <CountrySelector />
                    <Typography sx={{ marginBlock: 2 }}>
                      You can add conditions here:
                    </Typography>
                    <TextareaAutosize
                      minRows={4}
                      maxRows={4}
                      placeholder="Enter your text here"
                      style={{ width: "100%" }}
                      className="border rounded-lg p-2 resize-none overflow-y-auto"
                    />{" "}
                  </Box>
                  <Box className="w-[40%]">
                    <Typography color="initial">
                      You can add an automatic message
                    </Typography>
                    <TextareaAutosize
                      onChange={messageHandle}
                      minRows={4}
                      maxRows={4}
                      placeholder="Enter your text here"
                      style={{ width: "100%" }}
                      className="border rounded-lg p-2 overflow-y-auto resize-none"
                    />{" "}
                    <Typography sx={{ marginTop: 2 }}>
                      you can add up to three restrications:
                    </Typography>
                    <TextareaAutosize
                      onChange={termsHandle}
                      minRows={2}
                      maxRows={2}
                      placeholder="Enter your text here"
                      style={{ width: "100%" }}
                      className="border rounded-lg p-2 overflow-y-auto resize-none "
                    />
                  </Box>
                </Box>
              </Box>
            </div>
          )}
          {activeModel === 2 && (
            <div className="flex  flex-col justify-center items-center gap-x-6 w-full   ">
              <Box className="w-full flex mb-10">
                <ArrowBackIcon onClick={preModel} />
                <Box className="flex flex-col">
                  <Typography color="initial">
                    creation of a purchase announcement.
                  </Typography>
                  <Typography color="initial">Step 4 of 4</Typography>
                </Box>
              </Box>
              <Box className="flex flex-col  justify-center items-center  w-full ">
                <Typography sx={{ color: "black" }}>
                  Great! to finish, here is a review for you to review the
                  details!
                </Typography>
                <Typography sx={{ color: "black" }}>
                  If it's all good. it time to publish your ad!
                </Typography>
                <Box className="w-full flex justify-center  gap-8 items-center mt-10  ">
                  <Box className="w-[40%]">
                    {list1.map((item, index) => {
                      const [key, value] = Object.entries(item)[0];
                      return (
                        <Box className="flex" key={index}>
                          <Typography color="initial" fontSize={16}>
                            {key.charAt(0).toUpperCase() + key.slice(1)}:
                          </Typography>
                          <Typography
                            variant="h6"
                            color="initial"
                            fontSize={16}
                          >
                            {value}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Box>
                  <Box className="w-[40%]">
                    {list2.map((item, index) => {
                      const [key, value] = Object.entries(item)[0];
                      const content =
                        value === "Read More" ? (
                          <Button
                            key={index}
                            variant="outlined"
                            onClick={handleClickOpen}
                            className="border-none px-0 py-0 text-black underline text-[10px] hover:border-none"
                          >
                            Read More
                          </Button>
                        ) : value === "check" ? (
                          <Button
                            key={index}
                            onClick={handleClickTerms}
                            className="border-none px-0 py-0 text-black underline text-[10px] hover:border-none"
                          >
                            Check
                          </Button>
                        ) : (
                          <Typography key={index} color="initial">
                            {value}
                          </Typography>
                        );

                      return (
                        <div key={index} className="flex">
                          <Typography color="initial">
                            {key.charAt(0).toUpperCase() + key.slice(1)}:
                          </Typography>
                          {content}
                        </div>
                      );
                    })}
                  </Box>
                </Box>
              </Box>
            </div>
          )}
          <div className="w-full flex justify-end items-center">
            <Button
              className="text-blue-500 bg-white border border-blue-500 mr-2"
              onClick={preModel}
            >
              Previous
            </Button>
            {activeModel === 3 ? (
              <Button
                className="bg-blue-500 px-2 py-1 rounded text-white hover:bg-blue-400 "
                onClick={submitAds}
              >
                Publish Ad
              </Button>
            ) : (
              <Button
                className="bg-blue-500 px-2 py-1 border text-white hover:bg-blue-400"
                onClick={nextModel}
              >
                Next
              </Button>
            )}
          </div>
        </div>
      ) : (
        newAds === false && (
          <div className="flex  flex-col px-8 py-6 justify-center items-center gap-x-6 mx-auto w-full xl:w-[80%] rounded-lg bg-white mt-4">
            <Box className="w-full flex mb-10">
              <ArrowBackIcon onClick={preModel} />
              <Box className="flex flex-col">
                <Typography color="initial">Create new Ad</Typography>
                <Typography color="initial">Step 1 of 4</Typography>
              </Box>
            </Box>
            <Box className="flex flex-col justify-center items-center">
              <Typography sx={{ color: "black", fontWeight: "bold" }}>
                Hi! To begin with
              </Typography>
              <Typography sx={{ color: "black" }}>
                What kind of ad are you looking to create?
              </Typography>
              <Box className="w-full flex justify-center gap-x-3 mt-10  ">
                <button
                  className="bg-blue-500 px-2  py-1 text-white rounded-lg hover:bg-blue-400"
                  onClick={buyMethod}
                >
                  Purchase Ad
                </button>
                <button
                  className="bg-blue-500 px-2  py-1 text-white rounded-lg hover:bg-blue-400"
                  onClick={salesMethod}
                >
                  Sales Ad
                </button>
              </Box>
            </Box>
          </div>
        )
      )}

      <Dialog
        open={open}
        keepMounted
        onClose={handleCloseOpen}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {createOrder.message || "No Text"}
          </DialogContentText>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
      <Dialog
        open={terms}
        keepMounted
        onClose={handleCloseTerms}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {createOrder.terms || "No Text"}
          </DialogContentText>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyAds;
