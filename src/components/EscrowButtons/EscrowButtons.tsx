import React from "react";
import { CreateEsCrow } from "@/hooks/call_contract";

type Props = {};

const EscrowButtons = (props: Props) => {
  return (
    <div className="flex justify-between">
      <button
        onClick={() => CreateEsCrow()}
        className="py-5 rounded-md px-10 mx-2 text-md text-white bg-green-500"
      >
        Create Escrow
      </button>
      <button className="py-5 px-10 rounded-md mx-2 text-md text-white bg-yellow-500">
        Mark as Paid
      </button>
      <button className="py-5 px-10 rounded-md mx-2 text-md text-white bg-red-500">
        Release Escrow
      </button>
    </div>
  );
};

export default EscrowButtons;
