import React from "react"
import { IoIosArrowForward } from "react-icons/io";
import Transactions from "../Transactions/Transactions"
import Table from "../Table/Table"

interface MarketplaceProps {
    tab: boolean;
    toggleTabBuy: () => void;
    toggleTabSell: () => void;
}

const MarketPlace: React.FC<MarketplaceProps> = ({ tab, toggleTabBuy, toggleTabSell }) => {
    return (
        <div className="bg-[#d4ebfc] max-lg:pt-16 pt-32 w-screen h-full min-h-screen">
            <div className="p-6">
                <div className="bg-white px-2 py-4 rounded-md border border-gray-300 flex justify-between max-sm:gap-2 whitespace-nowrap">
                    <h1 className="text-[12px] lg:text-xl font-semibold">Marketplace</h1>
                    <div className="flex items-center gap-2">
                        <button className="text-[12px] lg:text-xl">P2P Commerce</button>
                        <IoIosArrowForward className="text-gray-400" />
                        <h1 className="text-gray-400 text-[12px] lg:text-xl">Marketplace</h1>
                    </div>
                </div>
            </div>
            <Transactions />
            <Table tab={tab} toggleTabBuy={toggleTabBuy} toggleTabSell={toggleTabSell} />
        </div>
    )
}

export default MarketPlace;