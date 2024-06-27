import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../utils/firebaseConfig";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import { Box, Modal, Typography } from "@mui/material";
import { useRouter } from "next/router";
import useFirestoreListener from "@/hooks/useFirestoreListener";

interface TableItem {
  key: string;
  advertiser: string;
  value: string;
  fiat: string;
  payMethod: string;
  boundries: string;
  available: string;
  symbol: string;
  blockChain: string;
  type: string | number;
  wallet: string;
  isOpen?: boolean;
}

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
  // const router = useRouter();
  // const { id } = router.query;
  const [tableData, setTableData] = useState<TableItem[]>([]);
  const [filterType, setFilterType] = useState<string | null>(null); // 'buy', 'sell', or null
  const { wallet } = useAppContext();
  const [openModel, setOpenModel] = useState(false);

  const getData = (tableData: TableItem[]) => setTableData(tableData.filter(order => !order.isOpen))

  const listener = useFirestoreListener("P2POrder", getData);

  useEffect(() => {
    listener();
  }, []);

  const handleFilter = (type: any) => {
    setFilterType(type);
  };

  console.log(tableData, tab)

  // const type = tab === true ? 1 : 0;

  const filteredData = tableData
    ? tableData.filter((item) => {
      return (
        item.symbol.toLowerCase().includes(selectedCrypto.toLowerCase()) &&
        item.fiat.toLowerCase().includes(selectedFiat.toLowerCase()) &&
        item.symbol.toLowerCase().includes(selectedCrypto.toLowerCase()) &&
        item.blockChain.toLowerCase().includes(selectedBlockchain.toLowerCase()) &&
        item.type === (tab ? 0 : 1)
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
  return (
    <>
      <div></div>
      <div className="flex flex-col bg-white p-3 rounded-lg">
        <div className="flex flex-col gap-6 pt-1 pb-3">
          {filteredData.map((item, index) => (
            <Link
              href={
                wallet && item.type === 0
                  ? `/purchase/${item.key}`
                  : "/"
              }
              key={index}
              onClick={checkWallet}
            >
              <div className="px-1 border-t pt-2 first:pt-0 first:border-0">
                <div className="text-sm">{item.advertiser}</div>
                <div className="text-xs text-gray-800">Completions 100.00%</div>
                {/* <div className="text-xs pb-1 text-gray-800 font-bold" style={{ filter: "grayscale(1)" }}>👍100% ⏱️15 min</div> */}

                <div className="flex justify-between gap-3">
                  <div className="flex-2">
                    <div className="font-bold">{item.value} {item.fiat}</div>
                    <div className="text-xs pb-1">Available {item.available}{item.symbol}</div>
                    <div className="text-xs">Boundaries {item.fiat} {item.boundries}</div>
                  </div>

                  <div className="flex flex-col items-end flex-1 gap-1">
                    <div className="text-gray-600 text-xs">{item.payMethod}</div>

                    <button className={`text-white py-[1px] px-3 rounded text-sm ${item.type === 0
                      ? "bg-green-500 hover:bg-green-300"
                      : "bg-red-500 hover:bg-red-300"}`}>
                      {item.type === 0 ? "Buy" : "Sell"}
                    </button>
                    <div className="border border-yellow-600 text-yellow-600 text-[9px]">* Requires verification</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {filteredData.length === 0 &&
            <>No Records Founds</>
          }
        </div>
      </div >
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
      )
      }
    </>
  );
};

export default App;
