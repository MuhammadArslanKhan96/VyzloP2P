// import React from "react";
// import { FaPowerOff, FaWallet } from "react-icons/fa";
// import { useAppContext } from "@/context/AppContext";

// interface AccountSidebarProps {
//   openAccMenu: boolean;
//   toggleAccMenu: () => void;
// }

// const AccountSidebar: React.FC<AccountSidebarProps> = ({
//   openAccMenu,
//   toggleAccMenu,
// }) => {
//   const { wallet, balance, chainCoin, disconnectWallet } = useAppContext();
//   return (
//     <div className={`transition-all duration-300 ease-in-out rounded-xl  `}>
//       <div
//         className={`bg-white fixed z-20 transition-all duration-300 ease-in-out ${openAccMenu
//           ? "w-[80vw] !pb-28 sm:w-[30vw] top-0 xl:top-[80px] xl:w-[22vw] right-0 h-full min-h-screen"
//           : "h-0 top-0 lg:top-20 -right-40 w-0"
//           } flex flex-col py-2 overflow-y-scroll selectscroll`}
//       >
//         {wallet && (
//           <div className="px-5 text-sm">

//             <div className="flex pb-4 justify-end">
//               <div onClick={disconnectWallet} className="cursor-pointer">
//                 <FaPowerOff size={20} />
//               </div>
//             </div>

//             <hr />

//             <h1 className="font-bold pt-4 pb-2 text-base lg:text-lg">Wallet: {wallet ? `${wallet?.slice(0, 5)}...${wallet?.slice(-7)}` : ""}</h1>

//             <h1 className={`${balance <= 0 ? "text-red-600" : "text-black"} text-sm lg:text-base pb-4 font-semibold`}>
//               {balance.toFixed(6)} {chainCoin} {balance <= 0 ? "Insufficient Balance" : ""}
//             </h1>

//             <hr />
//           </div>
//         )}
//         {/* <div>
//           <div
//             className="px-5 py-8 flex flex-col gap-4 items-start"
//             style={{
//               backgroundImage: "url(/public/images/settingsMembershipCard.svg)",
//               backgroundSize: "cover",
//             }}
//           >
//             <div>
//               <h1 className="font-bold text-[18px]">Subscription VYZLO</h1>
//               <p className="text-[15px]">
//                 Subscribe to a plan and stop paying commissions.
//               </p>
//               <button className="bg-amber-300 mt-2 p-2 rounded-md font-bold">
//                 Subscribe
//               </button>
//             </div>
//           </div>
//           <div className="px-5">
//             <hr />
//           </div>
//         </div> */}
//         {/* <div className="px-5 py-4 text-sm">
//           <div className="bg-[#d4ebfc] rounded-lg px-3 py-4 flex flex-col gap-y-4 items-start mb-4">
//             <div className="flex justify-between w-full">
//               <h1>Email Notifications</h1>
//               <Switcher4 />
//             </div>
//             <div className="flex justify-between w-full">
//               <h1>Telegram Notifications</h1>
//               <Switcher4 />
//             </div>
//           </div>
//           <hr />
//         </div> */}
//         <div className="flex flex-col gap-y-4">
//           {/* <div className="px-5">
//             <Link
//               href="/Wallet"
//               className="flex justify-between items-center hover:bg-[#d4ebfc] hover:text-[#2196f3] transition-all duration-500 ml-4 p-1 rounded-md"
//             >
//               <h1 className="flex items-center p-2 gap-2">
//                 <FaWallet size={20} className="hover:text-blue-500" />
//                 Wallet
//               </h1>
//             </Link>
//           </div> */}
//           {/* <div className="px-5">
//             <Link
//               href="/AccSettings"
//               className="flex justify-between items-center hover:bg-[#d4ebfc] hover:text-[#2196f3] transition-all duration-500 ml-4 p-1 rounded-md"
//             >
//               <h1 className="flex items-center p-2 gap-2">
//                 <CiSettings size={20} className="hover:text-blue-500" />
//                 Account Settings
//               </h1>
//             </Link>
//           </div> */}
//           {/* <div className="px-5">
//             <Link
//               href="/Wallet"
//               className="flex justify-between items-center hover:bg-[#d4ebfc] hover:text-[#2196f3] transition-all duration-500 ml-4 p-1 rounded-md"
//             >
//               <h1 className="flex items-center p-2 gap-2">
//                 <IoMdContact size={20} className="hover:text-blue-500" />
//                 Profile
//               </h1>
//             </Link>
//           </div> */}
//           {/* <div className="px-5">
//             <Link
//               href="/Wallet"
//               className="flex justify-between items-center hover:bg-[#d4ebfc] hover:text-[#2196f3] transition-all duration-500 ml-4 p-1 rounded-md"
//             >
//               <h1 className="flex items-center p-2 gap-2">
//                 <FaWallet size={20} className="hover:text-blue-500" />
//                 Log Off
//               </h1>
//             </Link>
//           </div> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AccountSidebar;

import React from "react";
import { FaPowerOff } from "react-icons/fa";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";

interface AccountSidebarProps {
  openAccMenu: boolean;
  toggleAccMenu: () => void;
}

const AccountSidebar: React.FC<AccountSidebarProps> = ({
  openAccMenu,
  toggleAccMenu,
}) => {
  const { wallet, balance, chainCoin, disconnectWallet } = useAppContext();

  const getExplorerLink = () => {
    switch (chainCoin) {
      case "MATIC":
        return `https://amoy.polygonscan.com/address/${wallet}`;
      case "tBNB":
        return `https://testnet.bscscan.com/address/${wallet}`;
      case "ZETA":
        return `https://zetachain-athens-3.blockscout.com/address/${wallet}`;
      default:
        return `https://amoy.polygonscan.com/address/${wallet}`;
    }
  };

  return (
    <div className={`transition-all duration-300 ease-in-out rounded-xl`}>
      <div
        className={`bg-white fixed z-20 transition-all duration-300 ease-in-out ${
          openAccMenu
            ? "w-[80vw] !pb-28 sm:w-[30vw] top-0 xl:top-[80px] xl:w-[22vw] right-0 h-full min-h-screen shadow-lg"
            : "h-0 top-0 lg:top-20 -right-40 w-0"
        } flex flex-col py-4 overflow-y-scroll selectscroll`}
      >
        {wallet && (
          <div className="p-5">
            <div className="bg-white shadow-md relative rounded-xl p-6">
              <div className="absolute right-4 mb-4">
                <div
                  onClick={() => {
                    disconnectWallet();
                    toggleAccMenu();
                  }}
                  className="cursor-pointer text-gray-600 hover:text-red-600 transition-colors duration-300"
                >
                  <FaPowerOff size={20} />
                </div>
              </div>
              <h1 className="font-bold text-lg mb-2">Wallet</h1>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={getExplorerLink()}
                className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
              >
                {`${wallet.slice(0, 5)}...${wallet.slice(-7)}`}
              </Link>
              <div className="mt-4">
                <h1 className="text-lg font-semibold">Balance</h1>
                <p className={`text-black text-sm lg:text-base`}>
                  {balance.toFixed(6)} {chainCoin}
                </p>
                {balance <= 0 && (
                  <p className="text-red-600 mt-2">Insufficient Balance</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountSidebar;
