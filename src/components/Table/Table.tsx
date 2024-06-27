import React, { useState } from "react";
import TableHeader from "./TableHeader";
import TableItem from "./TableItem";
import TableItemMobile from "./TableItemMobile";

interface TableProps {
  tab: boolean;
  toggleTabBuy: () => void;
  toggleTabSell: () => void;
}

const Table: React.FC<TableProps> = ({ tab, toggleTabBuy, toggleTabSell }) => {
  const [selectedFiat, setSelectedFiat] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState("");
  const [selectedBlockchain, setSelectedBlockchain] = useState("");
  const [selectedCommunities, setSelectedCommunities] = useState("");

  return (
    <>
      <div className="bg-white mx-4 md:mx-auto mt-4 mb-4 md:w-full max-w-[100vw] sm:max-w-[80vw] overflow-x-auto rounded-lg">
        <TableHeader
          tab={tab}
          toggleTabBuy={toggleTabBuy}
          toggleTabSell={toggleTabSell}
          setSelectedFiat={setSelectedFiat}
          setSelectedCrypto={setSelectedCrypto}
          setSelectedBlockchain={setSelectedBlockchain}
          setSelectedCommunities={setSelectedCommunities}
        />
        {/* Table */}
        <div className="hidden md:block ">
          <TableItem
            tab={tab}
            selectedFiat={selectedFiat}
            selectedCrypto={selectedCrypto}
            selectedBlockchain={selectedBlockchain}
            selectedCommunities={selectedCommunities}
          />
        </div>
        <div className="md:hidden">
          <TableItemMobile
            tab={tab}
            selectedFiat={selectedFiat}
            selectedCrypto={selectedCrypto}
            selectedBlockchain={selectedBlockchain}
            selectedCommunities={selectedCommunities}
          />
        </div>
      </div>
    </>
  );
};

export default Table;
