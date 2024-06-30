import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import { Box, Modal, Typography } from "@mui/material";
import useFirestoreListener from "@/hooks/useFirestoreListener";
import { Order } from "@/types/order";
import Ellipsis from "../Ellipsis/Ellipsis";

interface AppProps {
  selectedBlockchain: string;
  selectedCrypto: string;
  selectedFiat: string;
  selectedCommunities: string;
  tab: boolean;
}

const App: React.FC<AppProps> = ({
  selectedBlockchain,
  selectedCrypto,
  selectedFiat,
  selectedCommunities,
  tab,
}) => {
  const [tableData, setTableData] = useState<Order[]>([]);
  const [filterType, setFilterType] = useState<string | null>("buy");
  const { wallet } = useAppContext();
  const [openModel, setOpenModel] = useState(false);

  const getData = (tableData: Order[]) =>
    setTableData(
      tableData.filter((order) =>
        wallet === order.wallet ? true : !order.isOpen
      )
    );

  const listener = useFirestoreListener("createOrder", getData);

  useEffect(() => {
    listener();
  }, []);

  const handleFilter = (type: any) => {
    setFilterType(type);
  };

  const filteredData = tableData
    ? tableData.filter((item) => {
        return (
          item?.cryptoSymbol
            ?.toLowerCase()
            .includes(selectedCrypto.toLowerCase()) &&
          item?.fiatCurrency
            ?.toLowerCase()
            .includes(selectedFiat.toLowerCase()) &&
          item?.blockChain
            ?.toLowerCase()
            .includes(selectedBlockchain.toLowerCase()) &&
          item.method === filterType
        );
      })
    : tableData;
  const checkWallet = () => {
    if (wallet) {
      setOpenModel(false);
    } else {
      setOpenModel(true);
    }
  };
  const handleClose = () => setOpenModel(false);
  const headTableName = ["price", "payment", "Limits", "Available", ""];

  return (
    <>
      <div className="flex justify-center space-x-4 my-4"></div>
      <div className="flex gap-2 p-1 bg-blue-100 rounded-lg w-fit absolute top-12 left-[150px] md:top-[12px] md:left-[48px]">
        <button
          onClick={() => handleFilter("buy")}
          className={`text-gray-400 mx-auto w-full py-1 px-4 rounded-lg transition-all duration-400 ${
            filterType === "buy" ? "text-white bg-green-500" : "bg-blue-100"
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => handleFilter("sell")}
          className={`text-gray-400 px-4 py-1 rounded-lg transition-all duration-400 ${
            filterType === "sell" ? "text-white bg-red-500" : "bg-blue-100"
          }`}
        >
          Sell
        </button>
      </div>

      <div className="mx-auto w-full xl:w-[72vw] h-full min-h-fit max-h-[50vw] overflow-auto selectscroll">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {headTableName.map((item, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-6 py-3 font-bold text-left text-xs   uppercase tracking-wider"
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item.key} className="bg-white">
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {item.price} {item.fiatCurrency.toUpperCase()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {item.paymentMethod && item.paymentMethod.join(", ")}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-500 ">
                    <div>
                      {item.fiatCurrency.toUpperCase()} {item.min}
                    </div>
                    <div>
                      {item.fiatCurrency.toUpperCase()} {item.max}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-500 ">
                    <div>
                      {item.price} {item.cryptoSymbol}
                    </div>
                    <div>{item.blockChain}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <Link
                      href={wallet ? `/purchase/${item.key}` : "/"}
                      onClick={checkWallet}
                    >
                      <button
                        className={`text-sm px-2 py-2 rounded-md w-24 transition-all duration-300 text-white ${
                          item.method === "buy"
                            ? "bg-green-500 hover:bg-green-300"
                            : "bg-red-500 hover:bg-red-300"
                        }`}
                      >
                        {item.method === "buy" ? "Buy" : "Sell"} {item.symbol}
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-4 text-sm text-gray-500 text-center w-full  mx-auto"
                >
                  Data is currently unavailable. Please try again shortly{" "}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {openModel && (
          <Modal
            open={openModel}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="w-full flex justify-center items-center"
          >
            <Box className=" flex flex-col justify-center items-center  border w-[300px] h-[100px] bg-white rounded-lg">
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
                className="text-black"
              >
                Connect your wallet
              </Typography>
            </Box>
          </Modal>
        )}
      </div>
    </>
  );
};

export default App;
