import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import Transactions from "../Transactions/Transactions";
import Table from "../Table/Table";
import EscrowButtons from "../EscrowButtons/EscrowButtons";
import { Box } from "@mui/material";

interface MarketplaceProps {
  tab: boolean;
  toggleTabBuy: () => void;
  toggleTabSell: () => void;
}

const MarketPlace: React.FC<MarketplaceProps> = ({
  tab,
  toggleTabBuy,
  toggleTabSell,
}) => {
  return (
    <Box className="bg-[#d4ebfc] max-lg:pt-16 pt-32 w-screen  h-full min-h-screen pb-5">
      <div className="p-6 w-[90%] mx-auto">
        <div className="bg-white px-10 py-4 rounded-md border border-gray-300 flex justify-between max-sm:gap-2 whitespace-nowrap">
          <h1 className="text-[12px] lg:text-xl font-semibold">Marketplace</h1>
          <div className="flex items-center gap-2">
            <button className="text-[12px] lg:text-xl">P2P Commerce</button>
            <IoIosArrowForward className="text-gray-400" />
            <h1 className="text-gray-400 text-[12px] lg:text-xl">
              Marketplace
            </h1>
          </div>
        </div>
      </div>
      <Transactions />
      <div className="flex justify-center py-5">
        <EscrowButtons />
      </div>
      <Table
        tab={tab}
        toggleTabBuy={toggleTabBuy}
        toggleTabSell={toggleTabSell}
      />
    </Box>
  );
};

export default MarketPlace;
