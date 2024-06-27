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
      method: "sales",
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
    setActiveModel((prevModel) => (prevModel < 3 ? prevModel + 1 : prevModel));
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
    <Box className="bg-[#d4ebfc] max-lg:pt-16 pt-32 w-screen  h-full min-h-screen pb-5">
      {newAds && (
        <div className="flex  flex-col px-8 py-6 justify-center items-center gap-x-6 mx-auto w-full xl:w-[80%] rounded-lg bg-white mt-4">
          <div className="flex w-full gap-4 items-end ">
            <div className="flex gap-x- px-1  py-1 bg-blue-200 rounded-lg">
              <button className="text-bold py-1 bg-blue-500 text-white px-4 rounded-lg transition-all duration-400">
                Buy
              </button>
              <button className="text-gray-400 text-bold px-4 py-1 rounded-lg transition-all duration-400">
                Sell
              </button>
            </div>
            <div className="flex gap-x-10">
              <div className="flex flex-col">
                <label
                  htmlFor="Blockchain"
                  className="text-sm text-gray-300 font-medium"
                >
                  Blockchain
                </label>
                <select
                  className="cursor-pointer bg-[#d4ebfc] rounded-lg py-1 px-2 "
                  name="Blockchain"
                >
                  <option value="" className="text-sm">
                    All
                  </option>
                  <option value="ZETA" className="text-sm">
                    ZETA
                  </option>
                  <option value="BSC" className="text-sm">
                    BSC
                  </option>
                  <option value="Polygon" className="text-sm">
                    Polygon
                  </option>
                </select>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="Crypto"
                  className="text-sm text-gray-300 font-medium"
                >
                  Crypto
                </label>
                <select
                  className="cursor-pointer bg-[#d4ebfc] rounded-lg py-1 px-2"
                  name="Crypto"
                >
                  <option value="" className="text-sm">
                    All
                  </option>
                  <option value="USDT" className="text-sm">
                    USDT
                  </option>
                  <option value="USDC" className="text-sm">
                    USDC
                  </option>
                  <option value="DAI" className="text-sm">
                    DAI
                  </option>
                </select>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="Fiat"
                  className="text-sm text-gray-300 font-medium"
                >
                  Fiat
                </label>
                <select
                  className="cursor-pointer bg-[#d4ebfc] rounded-lg py-1 px-2"
                  name="Fiat"
                >
                  <option value="" className="text-sm">
                    All
                  </option>
                  <option value="EUR">EUR</option>
                  <option value="ARS">ARS</option>
                  <option value="COP">COP</option>
                  <option value="USD">USD</option>
                </select>
              </div>
            </div>
          </div>
          <Box className="flex flex-col justify-center items-center">
            <Image src={noADs} alt="no ads" />
            <Typography
              variant="h6"
              sx={{ color: "black", fontWeight: "bold" }}
            >
              No ads created yet{" "}
            </Typography>
            <Typography marginBlock={2} sx={{ color: "black" }}>
              you can define the terms transaction when creating an ad
            </Typography>
            <Button
              sx={{ paddingInline: 2, color: "white" }}
              className="bg-blue-500 rounded-lg hover:bg-blue-400"
              onClick={newAdsBtn}
            >
              Publish New Ad
            </Button>
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
                  <Typography color="initial">Step 2 of 5</Typography>
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
                <Box className="w-full flex justify-center gap-4 flex-wrap items-center mt-10 ">
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
                        {networkData.length > 0 &&
                          networkData.map((item: any, index: any) =>
                            Object.keys(item).map((key) => (
                              <MenuItem key={key} value={key}>
                                {key}
                              </MenuItem>
                            ))
                          )}
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={{ m: 1, minWidth: 600 }}>
                    <Typography sx={{ color: "gray" }}>
                      Which one or more payment methods
                    </Typography>
                    <PaymentMethodTags mutlipleMethod={paymentMethod} />
                  </Box>
                </Box>
              </Box>
            </div>
          )}
          {activeModel === 1 && (
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
              <Box className="flex flex-col  justify-center items-center  w-full">
                <Typography sx={{ color: "black", fontWeight: "bold" }}>
                  Great!
                </Typography>
                <Typography sx={{ color: "black" }}>
                  Now we need some important specifications.
                </Typography>
                <Box className="w-full flex justify-center gap-4 flex-wrap items-center mt-10 ">
                  <Box sx={{ m: 1, minWidth: 400 }}>
                    <Typography sx={{ color: "gray" }}>
                      Which curreny do you want to buy?
                    </Typography>
                    <TextField sx={{ m: 1, minWidth: 400 }}></TextField>
                  </Box>
                  <Box sx={{ m: 1, minWidth: 400 }}>
                    <Typography sx={{ color: "gray" }}>
                      In Which currecy do you want to make the payment?
                    </Typography>
                    <TextField sx={{ m: 1, minWidth: 400 }}></TextField>
                  </Box>
                </Box>
                <Box className="w-full flex justify-start items-center">
                  <Box className="w-1/2  flex flex-col justify-center items-center ">
                    <Typography color="initial">
                      Do You want to set limit to your offer?
                    </Typography>
                    <Box className="w-full  flex justify-center flex-wrap items-center ">
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
                      <Typography
                        color="initial"
                        sx={{ fontSize: 14, color: "gray" }}
                        className="w-[66%]"
                      >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Accusamus alias voluptas corporis error cum sit iusto
                        tempora Voluptatem, dolore ullam.
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </div>
          )}
          {activeModel === 2 && (
            <div className="flex  flex-col  justify-center items-center gap-x-6 mx-auto w-full ">
              <Box className="w-full flex mb-10">
                <ArrowBackIcon onClick={preModel} />
                <Box className="flex flex-col">
                  <Typography color="initial">
                    creation of a purchase annoucement.
                  </Typography>
                  <Typography color="initial">Step 4 of 5</Typography>
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
                    <Typography>
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
                    </Box>
                    <Typography>Location:</Typography>
                    <TextField
                      id="outlined-basic"
                      label="Location"
                      variant="outlined"
                      className="w-[90%] rounded-lg"
                    />{" "}
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
          {activeModel === 3 && (
            <div className="flex  flex-col justify-center items-center gap-x-6 w-full   ">
              <Box className="w-full flex mb-10">
                <ArrowBackIcon onClick={preModel} />
                <Box className="flex flex-col">
                  <Typography color="initial">
                    creation of a purchase announcement.
                  </Typography>
                  <Typography color="initial">Step 5 of 5</Typography>
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
              Prvious
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
                className="bg-gray-400 px-2 py-1 border text-white hover:bg-gray-300"
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
                <Typography color="initial">Step 1 of 5</Typography>
              </Box>
            </Box>
            <Box className="flex flex-col justify-center items-center">
              <Typography sx={{ color: "black", fontWeight: "bold" }}>
                Hi! To begin with
              </Typography>
              <Typography sx={{ color: "black" }}>
                what kind of ad do you want to create ?
              </Typography>
              <Box className="w-full flex justify-start gap-x-3 mt-10">
                <Button
                  sx={{ paddingInline: 2, color: "white" }}
                  className="bg-blue-500 rounded-lg hover:bg-blue-400"
                  onClick={buyMethod}
                >
                  Purchase Ad
                </Button>
                <Button
                  sx={{ paddingInline: 2, color: "white" }}
                  className="bg-blue-500 rounded-lg hover:bg-blue-400"
                  onClick={salesMethod}
                >
                  Sales Ad
                </Button>
              </Box>
            </Box>
          </div>
        )
      )}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={notification.severity as "success" | "error"}
        >
          {notification.message}
        </Alert>
      </Snackbar>
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
