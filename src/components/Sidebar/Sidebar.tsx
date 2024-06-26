import React, { useState } from "react";
import PeopleIcon from "@mui/icons-material/People";
import sidebarIcon1 from "../../../public/images/icon1.svg";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import YouTubeIcon from "@mui/icons-material/YouTube";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { FaWallet } from "react-icons/fa";
import Logo from "../../../public/images/images.jpg";
import Image from "next/image";
import { Tooltip } from "@nextui-org/tooltip";
import Link from "next/link";
import VerticalTabs from "../Tabs/VerticalTabs";

type SidebarProps = {
  openMenu: boolean;
  CommunityDropDown: boolean;
  P2PDropDown: boolean;
  TutorialDropDown: boolean;
  toggleTutorialDropDown: () => void;
  toggleCommunityDropDown: () => void;
  toggleP2PDropDown: () => void;
};

const Sidebar = ({
  openMenu,
  TutorialDropDown,
  toggleTutorialDropDown,
  toggleP2PDropDown,
  P2PDropDown,
  CommunityDropDown,
  toggleCommunityDropDown,
}: SidebarProps) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };
  return (
    <div
      className={`transition-all duration-300 ease-in-out  bg-white ${
        openMenu ? "md:w-[40vw] lg:w-[34vw]" : "lg:w-20"
      }`}
    >
      {" "}
      {/* Sidebar */}
      <div
        className={`bg-white fixed z-20 transition-all duration-300 ease-in-out ${
          openMenu
            ? "w-[90vw] sm:w-[30vw] top-0 xl:top-20 xl:w-[26vw] left-0 h-full min-h-screen !pb-16"
            : "h-0 top-0 lg:top-20 -left-40 w-0"
        } flex flex-col gap-10 overflow-y-scroll selectscroll`}
      >
        <div className="px-4">
          <div className="xl:hidden flex items-center">
            <Image src={Logo} alt="Logo" width={60} height={30} />
            <h1 className="text-3xl">
              <b>pay</b>dece
            </h1>
          </div>
          <h1 className="p-2">Products</h1>
          <div className="py-4 px-8">
            <button
              onClick={toggleP2PDropDown}
              className="flex justify-between items-center w-[14vw] hover:bg-[#d4ebfc] hover:text-[#2196f3] transtiotion-all duration-500 p-4 rounded-md"
            >
              <h1 className="flex gap-2 ">
                <Image
                  src={sidebarIcon1}
                  alt="sideBarIcon1"
                  width={20}
                  height={20}
                />{" "}
                P2P Commerce
              </h1>
              {!P2PDropDown ? <IoIosArrowDown /> : <IoIosArrowUp />}
            </button>
            {P2PDropDown ? (
              <>
                <VerticalTabs value={value} handleChange={handleChange} />{" "}
                {/*
                 <Link href="/" className="flex items-center p-4 gap-2">
                  <GoDotFill fontSize="small" />
                  Marketplace
                </Link>
                <Link href="/" className="flex items-center p-4 gap-2">
                  <GoDotFill fontSize="small" />
                  My Ads
                </Link> */}
              </>
            ) : (
              ""
            )}
          </div>
          {/* <div className="py-4 px-8">
            <button
              onClick={toggleCommunityDropDown}
              className="flex justify-between items-center w-[14vw] hover:bg-[#d4ebfc] hover:text-[#2196f3] transtiotion-all duration-500 p-4 rounded-md"
            >
              <h1 className="flex gap-2">
                <PeopleIcon /> Communities
              </h1>
              {!CommunityDropDown ? <IoIosArrowDown /> : <IoIosArrowUp />}
            </button>
            {CommunityDropDown ? (
              <div>
                <h1 className="flex items-center p-4 gap-2">
                  <GoDotFill fontSize="small" />
                  Communities
                </h1>
                <h1 className="flex items-center p-4 gap-2">
                  <GoDotFill fontSize="small" />
                  My Community
                </h1>
              </div>
            ) : (
              ""
            )}
          </div> */}
          <div className="py-2 px-4">
            <button className="flex justify-between items-center w-[14vw] hover:bg-[#d4ebfc] hover:text-[#2196f3] transtiotion-all duration-500 ml-4 p-1 rounded-md">
              <h1 className="flex items-center p-4 gap-2">
                <Image
                  src="https://app.paydece.io/assets/images/sidebar/subscriptionsIcon.svg"
                  alt="sidebarIcon3"
                  width={30}
                  height={30}
                />
                Subscription
              </h1>
            </button>
          </div>
        </div>
        <div className="px-4">
          <h1 className="p-2">Wallet</h1>
          <div className="py-2 px-4">
            <Link
              href="/Wallet"
              className="flex justify-between items-center w-[14vw] hover:bg-[#d4ebfc] hover:text-[#2196f3] transtiotion-all duration-500 ml-4 p-1 rounded-md"
            >
              <h1 className="flex items-center p-4 gap-2">
                <FaWallet fontSize="large" />
                Current Holding
              </h1>
            </Link>
          </div>
        </div>
        <div className="px-4">
          <h1 className="p-2">More From Vyzlo</h1>
          <div className="py-2 px-4">
            <button className="flex justify-between items-center w-[14vw] hover:bg-[#d4ebfc] hover:text-[#2196f3] transtiotion-all duration-500 ml-4 p-1 rounded-md">
              <h1 className="flex items-center p-4 gap-2">
                <InfoOutlinedIcon />
                Telegram Support
              </h1>
            </button>
          </div>
          {/* <div className="p-2 px-4">
            <button
              onClick={toggleTutorialDropDown}
              className="flex justify-between items-center w-[14vw] hover:bg-[#d4ebfc] hover:text-[#2196f3] transtiotion-all duration-500 ml-4 p-2 rounded-md"
            >
              <h1 className="flex items-center p-4 gap-2">
                <YouTubeIcon />
                Tutorials
              </h1>
              {!TutorialDropDown ? <IoIosArrowDown /> : <IoIosArrowUp />}
            </button>
            {TutorialDropDown ? (
              <div className="flex flex-col gap-y-4">
                <h1 className="flex items-center gap-2 hover:text-[#2196f3] transtiotion-all duration-500 ml-12 p-1 rounded-md text-gray-500 cursor-pointer">
                  <GoDotFill fontSize="small" />
                  Introduction
                </h1>
                <h1 className="flex items-center gap-2 hover:text-[#2196f3] transtiotion-all duration-500 ml-12 p-1 rounded-md text-gray-500 cursor-pointer">
                  <GoDotFill fontSize="small" />
                  Connect Wallet
                </h1>
                <h1 className="flex items-center gap-2 hover:text-[#2196f3] transtiotion-all duration-500 ml-12 p-1 rounded-md text-gray-500 cursor-pointer">
                  <GoDotFill fontSize="small" />
                  Buy Crypto
                </h1>
                <h1 className="flex items-center gap-2 hover:text-[#2196f3] transtiotion-all duration-500 ml-12 p-1 rounded-md text-gray-500 cursor-pointer">
                  <GoDotFill fontSize="small" />
                  Sell Crypto
                </h1>
                <h1 className="flex items-center gap-2 hover:text-[#2196f3] transtiotion-all duration-500 ml-12 p-1 rounded-md text-gray-500 cursor-pointer">
                  <GoDotFill fontSize="small" />
                  Post An Ad
                </h1>
              </div>
            ) : (
              ""
            )}
          </div> */}
          <div className="p-2 px-4">
            <button className="flex justify-between items-center w-[14vw] hover:bg-[#d4ebfc] hover:text-[#2196f3] transtiotion-all duration-500 ml-4 p-1 rounded-md">
              <h1 className="flex items-center p-4 gap-2">
                <HelpOutlineIcon />
                Faq
              </h1>
            </button>
          </div>
        </div>
      </div>
      <div
        className={`hidden transition-all bg-white h-full duration-300 ease-in-out fixed top-[42px] z-20 lg:flex flex-col gap-10 mt-10 items-center w-20 ${
          openMenu ? "-left-40" : "left-0"
        }`}
      >
        <Tooltip
          delay={100}
          closeDelay={100}
          offset={25}
          placement="right"
          content={
            <div className="rounded-lg bg-white text-gray-700">
              <div className="p-2">
                <Link
                  href="/"
                  className="flex items-center gap-2 hover:text-[#2196f3] hover:bg-[#d4ebfc] transtiotion-all duration-500 p-4 rounded-md text-gray-500 cursor-pointer"
                >
                  <GoDotFill fontSize="small" />
                  Marketplace
                </Link>
              </div>
            </div>
          }
        >
          <button className="hover:p-2 hover:rounded transtition-all duration-300 hover:bg-[#d4ebfc]">
            <Image
              src={sidebarIcon1}
              alt="sidebarIcon1"
              width={25}
              height={20}
            />
          </button>
        </Tooltip>
        <Tooltip
          delay={100}
          closeDelay={100}
          offset={25}
          placement="right"
          content={
            <div className="rounded-lg bg-white text-gray-700">
              <div className="p-4">
                <h1 className="flex items-center gap-2 hover:text-[#2196f3] hover:bg-[#d4ebfc] transtiotion-all duration-500 p-4 rounded-md text-gray-500 cursor-pointer">
                  <GoDotFill fontSize="small" />
                  Communities
                </h1>
                <h1 className="flex items-center gap-2 hover:text-[#2196f3] hover:bg-[#d4ebfc] transtiotion-all duration-500 p-4 rounded-md text-gray-500 cursor-pointer">
                  <GoDotFill fontSize="small" />
                  My Community
                </h1>
              </div>
            </div>
          }
        >
          <button className="hover:p-2 hover:rounded transtition-all duration-300 hover:bg-[#d4ebfc]">
            <PeopleIcon />
          </button>
        </Tooltip>
        <Tooltip
          delay={100}
          closeDelay={100}
          placement="right"
          offset={25}
          content={
            <div className="bg-gray-800 text-white p-2 rounded-lg">
              Subscription
            </div>
          }
        >
          <button className="hover:p-2 hover:rounded transtition-all duration-300 hover:bg-[#d4ebfc]">
            <Image
              src="https://app.paydece.io/assets/images/sidebar/subscriptionsIcon.svg"
              alt="sidebarIcon3"
              width={30}
              height={30}
            />
          </button>
        </Tooltip>
        <Tooltip
          delay={100}
          closeDelay={100}
          placement="right"
          offset={25}
          content={
            <div className="bg-gray-800 text-white p-2 rounded-lg">
              Telegram Support
            </div>
          }
        >
          <button className="hover:p-2 hover:rounded transtition-all duration-300 hover:bg-[#d4ebfc]">
            <InfoOutlinedIcon />
          </button>
        </Tooltip>
        <Tooltip
          delay={100}
          closeDelay={100}
          offset={25}
          placement="right"
          content={
            <div className="rounded-lg bg-white text-gray-700">
              <div className="p-4">
                <h1 className="flex items-center gap-2 hover:text-[#2196f3] hover:bg-[#d4ebfc] transtiotion-all duration-500 p-4 rounded-md text-gray-500 cursor-pointer">
                  <GoDotFill fontSize="small" />
                  Introduction
                </h1>
                <h1 className="flex items-center gap-2 hover:text-[#2196f3] hover:bg-[#d4ebfc] transtiotion-all duration-500 p-4 rounded-md text-gray-500 cursor-pointer">
                  <GoDotFill fontSize="small" />
                  Connect Wallet
                </h1>
                <h1 className="flex items-center gap-2 hover:text-[#2196f3] hover:bg-[#d4ebfc] transtiotion-all duration-500 p-4 rounded-md text-gray-500 cursor-pointer">
                  <GoDotFill fontSize="small" />
                  Buy Crypto
                </h1>
                <h1 className="flex items-center gap-2 hover:text-[#2196f3] hover:bg-[#d4ebfc] transtiotion-all duration-500 p-4 rounded-md text-gray-500 cursor-pointer">
                  <GoDotFill fontSize="small" />
                  Sell Crypto
                </h1>
                <h1 className="flex items-center gap-2 hover:text-[#2196f3] hover:bg-[#d4ebfc] transtiotion-all duration-500 p-4 rounded-md text-gray-500 cursor-pointer">
                  <GoDotFill fontSize="small" />
                  Post An Ad
                </h1>
              </div>
            </div>
          }
        >
          <button className="hover:p-2 hover:rounded transtition-all duration-300 hover:bg-[#d4ebfc]">
            <YouTubeIcon />
          </button>
        </Tooltip>
        <Tooltip
          delay={100}
          closeDelay={100}
          placement="right"
          offset={25}
          content={
            <div className="bg-gray-800 text-white p-2 rounded-lg">FAQs</div>
          }
        >
          <button className="hover:p-2 hover:rounded transtition-all duration-300 hover:bg-[#d4ebfc]">
            <HelpOutlineIcon />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default Sidebar;
