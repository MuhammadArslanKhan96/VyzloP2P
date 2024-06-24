import React from "react";
import { CreateEsCrow } from "@/hooks/call_contract";

type Props = {};

const EscrowButtons = (props: Props) => {
  return (
    <div className="flex items-center  justify-between flex-wrap max-sm:px-4">
      <button
        onClick={() => CreateEsCrow()}
        className="py-5 rounded-md px-10 mx-2 text-md text-white bg-green-500 max-sm:w-full max-sm:mb-1"
      >
        Create Escrow
      </button>
      <button className="py-5 px-10 rounded-md mx-2 text-md text-white bg-yellow-500 max-sm:w-full max-sm:mb-1">
        Mark as Paid
      </button>
      <button className="py-5 px-10 rounded-md mx-2 text-md text-white bg-red-500 max-sm:w-full max-sm:mb-1">
        Release Escrow
      </button>
    </div>
  );
};

export default EscrowButtons;
