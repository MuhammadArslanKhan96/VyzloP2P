import React from "react";
import { BsGraphUpArrow } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import Link from "next/link";

const Transactions = () => {
  return (
    <div className="flex max-sm:flex-col max-sm:gap-y-4 max-sm:text-[12px] text-center justify-center items-center gap-x-6 mx-auto w-[80%]">
      <div className="flex flex-col items-center justify-center bg-white p-4 rounded-xl gap-y-2 h-48 w-[80%] sm:w-[30%]">
        <h1 className="text-gray-500 font-bold">Transacted USD volume</h1>
        <p className="text-xl">$9143407.52</p>
        <p className="text-gray-500">Your Wallet Moved: $0</p>
      </div>
      <div className="flex flex-col items-center justify-center bg-white p-4 rounded-xl gap-y-2 h-48 w-[80%] sm:w-[30%]">
        <h1 className="text-gray-500 font-bold">Total Transactions</h1>
        <p className="flex items-center text-xl gap-1">
          <BsGraphUpArrow className="text-blue-400" />
          18493
        </p>
        <p className="text-gray-500">Your Wallet Made 0 txs</p>
      </div>
      {/* <div className="flex flex-col items-center justify-center bg-white p-4 rounded-xl gap-y-2 h-48 w-[80%] sm:w-[30%]">
                <h1 className="text-gray-500 font-bold items-center flex gap-2">Best Community <FaStar className="text-yellow-400" /></h1>
                <p className="text-xl">Hispanic P2P</p>
                <p className="text-gray-500">Do You Want To Join? <Link href="/" className="text-blue-500 underline">Send Request</Link></p>
            </div> */}
    </div>
  );
};

export default Transactions;
