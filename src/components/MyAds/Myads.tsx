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
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import Image from "next/image";
import React from "react";
import noADs from "../../../public/images/adsEmpty.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
const MyAds = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  const [value, setValue] = React.useState("female");

  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
  const list1 = [
    { price: "1 custom" },
    { availableCryptos: "10 USDT" },
    { "limit of the offers:": "1 custom" },
    { minimum: "1 custom" },
    { maximum: "10 custom" },
    { limitations: "not specified" },
  ];
  const list2 = [
    { Network: "Polygon" },
    { Crypto: "USDT" },
    { Currency: "custom" },
    { "payment method": "jazz cash" },
    { Locaition: "Pakistan" },
    { "automatic message": "read message" },
    { "terms and conditions": "read message" },
  ];
  return (
    <Box className="bg-[#d4ebfc] max-lg:pt-16 pt-32 w-screen  h-full min-h-screen pb-5">
      <div className="flex  flex-col px-8 py-6 justify-center items-center gap-x-6 mx-auto w-full xl:w-[60%] rounded-lg bg-white mt-4">
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
            {/* <div className="flex flex-col">
                        <label htmlFor="Communities" className='text-sm'>Communities</label>
                        <select name="Communities" onChange={e => setSelectedCommunities(e.target.value)}>
                            <option value="" className='text-sm'>Do Not Filter</option>
                            <option value="P2PHispano"><Image src={P2PImage} alt="P2PHispano" width={2} height={2} />P2P Hispano</option>
                        </select>
                    </div> */}
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
          <Typography variant="h6" sx={{ color: "black", fontWeight: "bold" }}>
            No ads created yet{" "}
          </Typography>
          <Typography marginBlock={2} sx={{ color: "black" }}>
            you can define the terms transaction when creating an ad
          </Typography>
          <Button
            sx={{ paddingInline: 2, color: "white" }}
            className="bg-blue-500 rounded-lg"
          >
            Publish New Ad
          </Button>
        </Box>
      </div>
      <div className="flex  flex-col px-8 py-6 justify-center items-center gap-x-6 mx-auto w-full xl:w-[60%] rounded-lg bg-white mt-4">
        <Box className="w-full flex mb-10">
          <ArrowBackIcon />
          <Box className="flex flex-col">
            <Typography color="initial">Create new Ad</Typography>
            <Typography color="initial">Step 1 of 5</Typography>
          </Box>
        </Box>
        <Box className="flex flex-col justify-center items-center">
          <Typography sx={{ color: "black", fontWeight: "bold" }}>
            HI! To begin with
          </Typography>
          <Typography sx={{ color: "black" }}>
            what kind of do you want to create ?
          </Typography>
          <Box className="w-full flex justify-start gap-x-3 mt-10">
            <Button
              sx={{ paddingInline: 2, color: "white" }}
              className="bg-blue-500 rounded-lg"
            >
              Purchase Ad
            </Button>
            <Button
              sx={{ paddingInline: 2, color: "white" }}
              className="bg-blue-500 rounded-lg"
            >
              Sales Ad
            </Button>
          </Box>
        </Box>
      </div>
      <div className="flex  flex-col px-8 py-6 justify-center items-center gap-x-6 mx-auto w-full xl:w-[60%] rounded-lg bg-white mt-4">
        <Box className="w-full flex mb-10">
          <ArrowBackIcon />
          <Box className="flex flex-col">
            <Typography color="initial">
              creation of a purchase annoucement.
            </Typography>
            <Typography color="initial">Step 2 of 5</Typography>
          </Box>
        </Box>
        <Box className="flex flex-col  justify-center items-center  w-full">
          <Typography sx={{ color: "black", fontWeight: "bold" }}>
            Great!!
          </Typography>
          <Typography sx={{ color: "black" }}>
            Now we will you ask to give us some details of the transaction.
          </Typography>
          <Box className="w-full flex justify-center gap-4 flex-wrap items-center mt-10 ">
            <Box sx={{ m: 1, minWidth: 300 }}>
              <Typography sx={{ color: "gray" }}>
                Which network are you going to maket the exchange
              </Typography>
              <FormControl sx={{ m: 1, minWidth: 300 }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Age
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={age}
                  onChange={handleChange}
                  autoWidth
                  label="Age"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={21}>Twenty one</MenuItem>
                  <MenuItem value={22}>Twenty one and a half</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ m: 1, minWidth: 300 }}>
              <Typography sx={{ color: "gray" }}>
                Which curreny do you want to buy?
              </Typography>
              <FormControl sx={{ m: 1, minWidth: 300 }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Age
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={age}
                  onChange={handleChange}
                  autoWidth
                  label="Age"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={21}>Twenty one</MenuItem>
                  <MenuItem value={22}>Twenty one and a half</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ m: 1, minWidth: 300 }}>
              <Typography sx={{ color: "gray" }}>
                In Which currecy do you want to make the payment?
              </Typography>
              <FormControl sx={{ m: 1, minWidth: 300 }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Age
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={age}
                  onChange={handleChange}
                  autoWidth
                  label="Age"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={21}>Twenty one</MenuItem>
                  <MenuItem value={22}>Twenty one and a half</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ m: 1, minWidth: 300 }}>
              <Typography sx={{ color: "gray" }}>
                Which one or more payment methods
              </Typography>
              <FormControl sx={{ m: 1, minWidth: 300 }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Age
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={age}
                  onChange={handleChange}
                  autoWidth
                  label="Age"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={21}>Twenty one</MenuItem>
                  <MenuItem value={22}>Twenty one and a half</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>
      </div>
      <div className="flex  flex-col px-8 py-6 justify-center items-center gap-x-6 mx-auto w-full xl:w-[60%] rounded-lg bg-white mt-4">
        <Box className="w-full flex mb-10">
          <ArrowBackIcon />
          <Box className="flex flex-col">
            <Typography color="initial">
              creation of a purchase annoucement.
            </Typography>
            <Typography color="initial">Step 3 of 5</Typography>
          </Box>
        </Box>
        <Box className="flex flex-col  justify-center items-center  w-full">
          <Typography sx={{ color: "black", fontWeight: "bold" }}>
            Great!!
          </Typography>
          <Typography sx={{ color: "black" }}>
            Now we need some important specifications.
          </Typography>
          <Box className="w-full flex justify-center gap-4 flex-wrap items-center mt-10 ">
            <Box sx={{ m: 1, minWidth: 300 }}>
              <Typography sx={{ color: "gray" }}>
                Which curreny do you want to buy?
              </Typography>
              <TextField sx={{ m: 1, minWidth: 300 }}></TextField>
            </Box>
            <Box sx={{ m: 1, minWidth: 300 }}>
              <Typography sx={{ color: "gray" }}>
                In Which currecy do you want to make the payment?
              </Typography>
              <TextField sx={{ m: 1, minWidth: 300 }}></TextField>
            </Box>
          </Box>
          <Box className="w-full flex justify-start items-center">
            <Box className="w-1/2  flex flex-col justify-center items-center ">
              <Typography color="initial">
                Do You want to set limit to your offer?
              </Typography>
              <Box className="w-full  flex justify-center flex-wrap items-center ">
                <Box sx={{ m: 1, width: 145 }}>
                  <Typography sx={{ color: "gray", fontSize: 12 }}>
                    Miniumn offer
                  </Typography>
                  <TextField sx={{ m: 1, width: 145 }}></TextField>
                </Box>
                <Box sx={{ m: 1, width: 145 }}>
                  <Typography sx={{ color: "gray", fontSize: 12 }}>
                    Maxium offer
                  </Typography>
                  <TextField sx={{ m: 1, width: 145 }}></TextField>
                </Box>
                <Typography
                  color="initial"
                  sx={{ fontSize: 14, color: "gray" }}
                  className="w-[70%]"
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Accusamus alias voluptas corporis error cum sit iusto tempora
                  Voluptatem, dolore ullam.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </div>
      <div className="flex  flex-col px-8 py-6 justify-center items-center gap-x-6 mx-auto w-full xl:w-[60%] rounded-lg bg-white mt-4">
        <Box className="w-full flex mb-10">
          <ArrowBackIcon />
          <Box className="flex flex-col">
            <Typography color="initial">
              creation of a purchase annoucement.
            </Typography>
            <Typography color="initial">Step 4 of 5</Typography>
          </Box>
        </Box>
        <Box className="flex flex-col  justify-center items-center  w-full ">
          <Typography sx={{ color: "black", fontWeight: "bold" }}>
            Almost finished On this step,!!
          </Typography>
          <Typography sx={{ color: "black" }}>
            You can additional information according to your prefernces.
          </Typography>
          <Box className="w-full flex justify-center  gap-8 items-center mt-10  ">
            <Box className="w-[40%]">
              <Typography> How do you want your ad to be seen?</Typography>
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
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
              <Typography sx={{ fontWeight: "bold" }}>Location:</Typography>
              <TextField
                id="outlined-basic"
                label="Location"
                variant="outlined"
                className="w-[90%] rounded-lg"
              />{" "}
              <Typography sx={{ fontWeight: "bold", marginBlock: 2 }}>
                You can add additional here:
              </Typography>
              <TextareaAutosize
                minRows={4}
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
                minRows={4}
                placeholder="Enter your text here"
                style={{ width: "100%" }}
                className="border rounded-lg p-2 overflow-y-auto resize-none"
              />{" "}
              <Typography sx={{ fontWeight: "bold", marginTop: 2 }}>
                you can add up to three restrications:
              </Typography>
              <TextField
                id="outlined-basic"
                variant="outlined"
                className="w-[90%] rounded-lg"
              />{" "}
            </Box>
          </Box>
        </Box>
      </div>
      <div className="flex  flex-col px-8 py-6 justify-center items-center gap-x-6 mx-auto w-full xl:w-[60%] rounded-lg bg-white mt-4">
        <Box className="w-full flex mb-10">
          <ArrowBackIcon />
          <Box className="flex flex-col">
            <Typography color="initial">
              creation of a purchase annoucement.
            </Typography>
            <Typography color="initial">Step 5 of 5</Typography>
          </Box>
        </Box>
        <Box className="flex flex-col  justify-center items-center  w-full ">
          <Typography sx={{ color: "black" }}>
            Great to Finish here is a preview for you to review the details ,!!
          </Typography>
          <Typography sx={{ color: "black" }}>
            if its all good. it time to publish your ad!!
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
                      fontWeight={700}
                    >
                      {value}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
            <Box className="w-[40%]">
              {list2.map((item, index) => {
                const [key, value] = Object.entries(item)[0]; // Extract key and value
                return (
                  <Box className="flex" key={index}>
                    <Typography color="initial" fontSize={16}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}:
                    </Typography>
                    <Typography
                      variant="h6"
                      color="initial"
                      fontSize={16}
                      fontWeight={700}
                    >
                      {value}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      </div>
    </Box>
  );
};

export default MyAds;
