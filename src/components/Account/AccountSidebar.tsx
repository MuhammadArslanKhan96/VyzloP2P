import Link from "next/link";
import React from "react";
import { FaWallet } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { IoMdContact } from "react-icons/io";
import Switcher4 from "../Switcher/Switcher";

interface AccountSidebarProps {
  openAccMenu: boolean;
  toggleAccMenu: () => void;
}

const AccountSidebar: React.FC<AccountSidebarProps> = ({
  openAccMenu,
  toggleAccMenu,
}) => {
  return (
    <div className={`transition-all duration-300 ease-in-out rounded-xl`}>
      <div
        className={`bg-white fixed z-20 transition-all duration-300 ease-in-out ${
          openAccMenu
            ? "w-[80vw] !pb-28 sm:w-[30vw] top-0 xl:top-[92px] xl:w-[22vw] right-0 h-full min-h-screen"
            : "h-0 top-0 lg:top-20 -right-40 w-0"
        } flex flex-col py-2 overflow-y-scroll selectscroll`}
      >
        <div className="px-5 text-sm">
          <div className="pb-4">
            <h1 className="font-bold">0x3e...A188</h1>
            <h1 className="text-red-600 font-semibold">
              0 BNB Insufficient Balance
            </h1>
          </div>
          <hr />
        </div>
        <div>
          <div
            className="px-5 py-8 flex flex-col gap-4 items-start"
            style={{
              backgroundImage: "url(/public/images/settingsMembershipCard.svg)",
              backgroundSize: "cover",
            }}
          >
            <div>
              <h1 className="font-bold text-[18px]">Subscription vyzlo</h1>
              <p className="text-[15px]">
                Subscribe to a plan and stop paying commissions.
              </p>
              <button className="bg-amber-300 p-2 rounded-md font-bold">
                Subscribe
              </button>
            </div>
          </div>
          <div className="px-5">
            <hr />
          </div>
        </div>
        <div className="px-5 py-4 text-sm">
          <div className="bg-[#d4ebfc] rounded-lg px-3 py-4 flex flex-col gap-y-4 items-start mb-4">
            <div className="flex justify-between w-full">
              <h1>Email Notifications</h1>
              <Switcher4 />
            </div>
            <div className="flex justify-between w-full">
              <h1>Telegram Notifications</h1>
              <Switcher4 />
            </div>
          </div>
          <hr />
        </div>
        <div className="flex flex-col gap-y-4">
          <div className="px-5">
            <Link
              href="/Wallet"
              className="flex justify-between items-center hover:bg-[#d4ebfc] hover:text-[#2196f3] transition-all duration-500 ml-4 p-1 rounded-md"
            >
              <h1 className="flex items-center p-2 gap-2">
                <FaWallet size={20} className="hover:text-blue-500" />
                Wallet
              </h1>
            </Link>
          </div>
          <div className="px-5">
            <Link
              href="/AccSettings"
              className="flex justify-between items-center hover:bg-[#d4ebfc] hover:text-[#2196f3] transition-all duration-500 ml-4 p-1 rounded-md"
            >
              <h1 className="flex items-center p-2 gap-2">
                <CiSettings size={20} className="hover:text-blue-500" />
                Account Settings
              </h1>
            </Link>
          </div>
          <div className="px-5">
            <Link
              href="/Wallet"
              className="flex justify-between items-center hover:bg-[#d4ebfc] hover:text-[#2196f3] transition-all duration-500 ml-4 p-1 rounded-md"
            >
              <h1 className="flex items-center p-2 gap-2">
                <IoMdContact size={20} className="hover:text-blue-500" />
                Profile
              </h1>
            </Link>
          </div>
          <div className="px-5">
            <Link
              href="/Wallet"
              className="flex justify-between items-center hover:bg-[#d4ebfc] hover:text-[#2196f3] transition-all duration-500 ml-4 p-1 rounded-md"
            >
              <h1 className="flex items-center p-2 gap-2">
                <FaWallet size={20} className="hover:text-blue-500" />
                Log Off
              </h1>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSidebar;
