import { useAppContext } from "@/context/AppContext";
import { SupportedBlockchains } from "@/types";
import React from "react";
import { RxUpdate } from "react-icons/rx";

interface TableHeaderProps {
  setSelectedFiat: (value: string) => void;
  setSelectedCrypto: (value: string) => void;
  setSelectedBlockchain: (value: string) => void;
  setSelectedCommunities: (value: string) => void;
  toggleTabBuy: () => void;
  toggleTabSell: () => void;
  tab: boolean;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  setSelectedFiat,
  setSelectedCrypto,
  setSelectedBlockchain,
  tab,
  toggleTabBuy,
  toggleTabSell,
  setSelectedCommunities,
}) => {
  const { getEthersInstance } = useAppContext();

  return (
    <>
      <div className="hidden md:flex px-8 py-4  justify-center items-center gap-x-6 mx-auto w-full  rounded-lg bg-white mt-4">
        <div className="flex  max-auto gap-4 items-end">
          <div className="flex gap-2 p-1 bg-blue-100 rounded-lg">
            <button
              className={`text-gray-400 py-1 px-4 rounded-lg transition-all duration-400 ${tab ? "text-white bg-blue-500" : ""
                }`}
              onClick={toggleTabBuy}
            >
              Buy
            </button>
            <button
              className={`text-gray-400 px-4 py-1 rounded-lg transition-all duration-400 ${!tab ? "text-white bg-blue-500" : ""
                }`}
              onClick={toggleTabSell}
            >
              Sell
            </button>
          </div>
          <div className="flex gap-x-10">
            {/* <div className="flex flex-col">
                        <label htmlFor="Communities" className='text-sm'>Communities</label>
                        <select name="Communities" onChange={e => setSelectedCommunities(e.target.value)}>
                            <option value="" className='text-sm'>Do Not Filter</option>
                            <option value="P2PHispano"><Image src={P2PImage} alt="P2PHispano" width={2} height={2} />P2P Hispano</option>
                        </select>
                    </div> */}
            <div className="flex flex-col">
              <label htmlFor="Blockchain" className="text-sm">
                Blockchain
              </label>
              <select
                className="cursor-pointer bg-[#d4ebfc] rounded p-1"
                name="Blockchain"
                onChange={(e) => {
                  setSelectedBlockchain(e.target.value)
                  getEthersInstance(e.target.value as SupportedBlockchains);
                }}
              >
                <option value="" className="text-sm">
                  All
                </option>
                <option value="ZETA" className="text-sm">
                  ZETA
                </option>
                <option value="BSC" className="text-sm">
                  BSC
                </option>
                <option value="POLYGON" className="text-sm">
                  Polygon
                </option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="Crypto" className="text-sm">
                Crypto
              </label>
              <select
                className="cursor-pointer bg-[#d4ebfc] rounded p-1"
                name="Crypto"
                onChange={(e) => setSelectedCrypto(e.target.value)}
              >
                <option value="" className="text-sm">
                  All
                </option>
                <option value="USDT" className="text-sm">
                  USDT
                </option>
                <option value="USDC" className="text-sm">
                  USDC
                </option>
                <option value="DAI" className="text-sm">
                  DAI
                </option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="Fiat" className="text-sm">
                Fiat
              </label>
              <select
                className="cursor-pointer bg-[#d4ebfc] rounded p-1"
                name="Fiat"
                onChange={(e) => setSelectedFiat(e.target.value)}
              >
                <option value="" className="text-sm">
                  All
                </option>
                <option value="EUR">EUR</option>
                <option value="ARS">ARS</option>
                <option value="COP">COP</option>
                <option value="USD">USD</option>
              </select>
            </div>
          </div>
          {/* <div className="whitespace-nowrap mt-5">
            <button className="bg-[#d4ebfc] text-sm font-semibold p-2 rounded flex items-center gap-2">
              <RxUpdate />
              Do Not Update
            </button>
          </div> */}
        </div>
      </div>

      <div className="flex md:hidden">
        <div className="flex gap-2 p-1 rounded-lg">
          <button
            className={`text-gray-400 py-1 px-4 rounded-lg transition-all duration-400 ${tab ? "text-white bg-blue-500" : ""
              }`}
            onClick={toggleTabBuy}
          >
            Buy
          </button>
          <button
            className={`text-gray-400 px-4 py-1 rounded-lg transition-all duration-400 ${!tab ? "text-white bg-blue-500" : ""
              }`}
            onClick={toggleTabSell}
          >
            Sell
          </button>
        </div>
      </div>

      <div className="flex md:hidden items-center gap-2 p-3 pb-0">
        <select onChange={(e) => setSelectedBlockchain(e.target.value)} className="bg-transparent border-none leading-tight focus:outline-none text-sm">
          <option value="" className="text-sm">All</option>
          <option value="ZETA" className="text-sm">
            ZETA
          </option>
          <option value="BSC" className="text-sm">
            BSC
          </option>
          <option value="Polygon" selected className="text-sm">
            Polygon
          </option>
        </select>
        <select
          onChange={(e) => setSelectedCrypto(e.target.value)}
          className="bg-transparent border-none leading-tight focus:outline-none text-sm">
          <option value="" className="text-sm">All</option>
          <option value="USDT" className="text-sm">
            USDT
          </option>
          <option value="USDC" className="text-sm">
            USDC
          </option>
          <option selected value="DAI" className="text-sm">
            DAI
          </option>
        </select>

        <select
          onChange={(e) => setSelectedFiat(e.target.value)}
          className="bg-transparent border-none leading-tight focus:outline-none text-sm">
          <option value="" className="text-sm">All</option>
          <option value="EUR">EUR</option>
          <option value="ARS">ARS</option>
          <option value="COP">COP</option>
          <option selected value="USD">USD</option>
        </select>
      </div>
    </>
  );
};

export default TableHeader;
