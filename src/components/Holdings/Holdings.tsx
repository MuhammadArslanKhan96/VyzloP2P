import { InfoOutlined } from "@mui/icons-material";
import React from "react";
import HoldingsData from "./HoldingsData";

const Holdings = () => {
  return (
    <div className="bg-[#d4ebfc] max-lg:pt-16 w-full max-w-[60vw] mx-auto h-full min-h-screen">
      <div className="p-6">
        {/* <div className="bg-white px-2 py-4 rounded-md border border-gray-300 flex flex-col w-full max-sm:gap-2">
                    <h1 className="text-[12px] xl:text-[15px] text-gray-500 font-semibold flex items-center gap-2"><InfoOutlined /> Wallet Disconnected</h1>
                    <button className='font-bold text-blue-500 w-max mt-2 pl-2'>Connect Wallet</button>
                </div> */}
        <HoldingsData />
      </div>
    </div>
  );
};

export default Holdings;
