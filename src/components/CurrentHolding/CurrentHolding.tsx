import Image from "next/image";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import sidebarIcon1 from "../../../public/images/icon1.svg";
import Holdings from "../Holdings/Holdings";

const CurrentHolding = () => {
  return (
    <div className="bg-[#d4ebfc] max-lg:pt-16 pt-32 w-screen h-full min-h-screen">
      {/* <div className="p-6">
                <div className="bg-white px-2 py-4 rounded-md border border-gray-300 flex justify-between max-sm:gap-2 whitespace-nowrap">
                    <h1 className="text-[12px] lg:text-xl font-semibold">Marketplace</h1>
                    <div className="flex items-center gap-2">
                        <button className="text-[12px] lg:text-xl flex items-center gap-2"><Image src={sidebarIcon1} alt="sideBarIcon1" width={20} height={20} />P2P</button>
                        <IoIosArrowForward className="text-gray-400" />
                        <h1 className="text-gray-400 text-[12px] lg:text-xl">Marketplace</h1>
                    </div>
                </div>
            </div> */}
      <Holdings />
    </div>
  );
};

export default CurrentHolding;
