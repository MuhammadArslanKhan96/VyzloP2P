import { InfoOutlined } from "@mui/icons-material";
import React from "react";
import HoldingsData from "./HoldingsData";

const Holdings = () => {
  return (
    <div className="bg-[#d4ebfc] max-lg:pt-16 w-full max-w-[70vw] mx-auto h-full min-h-screen">
      <div className="p-6">
        <HoldingsData />
      </div>
    </div>
  );
};

export default Holdings;
