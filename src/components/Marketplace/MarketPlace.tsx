import React from "react";
import Table from "../Table/Table";
import { Box } from "@mui/material";
import Link from "next/link";

interface MarketplaceProps {
  tab: boolean;
  toggleTabBuy: () => void;
  toggleTabSell: () => void;
}

const Market: React.FC<MarketplaceProps> = ({
  tab,
  toggleTabBuy,
  toggleTabSell,
}) => {
  return (
    <Box className="bg-[#d4ebfc] max-lg:pt-16 pt-32 sm:w-screen h-full min-h-screen pb-5">
      <div className="flex justify-end mx-4 mt-8 md:mx-auto mb-4 md:w-full max-w-[100vw] sm:max-w-[80vw]">
        <Link
          href="/create-ads"
          className="text-[12px] lg:text-xl bg-[#05379A] border-none hover:bg-opacity-75 transition-all ease-in-out duration-300 rounded-lg px-4 py-2 text-white "
        >
          Create Ad
        </Link>
      </div>
      {/* <Transactions /> */}
      <Table
        tab={tab}
        toggleTabBuy={toggleTabBuy}
        toggleTabSell={toggleTabSell}
      />
    </Box>
  );
};

export default Market;
