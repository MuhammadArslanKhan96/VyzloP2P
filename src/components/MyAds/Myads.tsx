import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import noADs from "../../../public/images/adsEmpty.png";

const MyAds = ({ newAdsBtn }: { newAdsBtn?: () => void }) => {

  return (
    <div className="flex  flex-col px-8 py-6 justify-center items-center gap-x-6 mx-auto w-full xl:w-[80%] rounded-lg bg-white max-lg:mt-16">
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
          className="bg-[#05379A] px-2  py-1 text-white rounded-lg hover:bg-opacity-75"
          onClick={newAdsBtn}
        >
          Publish New Ad
        </button>
      </Box>
    </div>
  );
};

export default MyAds;
