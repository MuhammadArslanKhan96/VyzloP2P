import React, { useEffect, useRef, useState } from "react";
import PeopleIcon from "@mui/icons-material/People";
import sidebarIcon1 from "../../../public/images/icon1.svg";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import YouTubeIcon from "@mui/icons-material/YouTube";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { FaDiscord, FaFacebook, FaTelegram, FaWallet } from "react-icons/fa";
import Logo from "../../../public/images/logoVyzlo.png";
import Image from "next/image";
import { Tooltip } from "@nextui-org/tooltip";
import Link from "next/link";
import { SiGoogleads } from "react-icons/si";

type SidebarProps = {
  openMenu: boolean;
  toggleMenu: () => void;
  CommunityDropDown: boolean;
  P2PDropDown: boolean;
  TutorialDropDown: boolean;
  toggleTutorialDropDown: () => void;
  toggleCommunityDropDown: () => void;
  toggleP2PDropDown: () => void;
};

const Sidebar = ({
  openMenu,
  toggleMenu,
  TutorialDropDown,
  toggleTutorialDropDown,
  toggleP2PDropDown,
  P2PDropDown,
  CommunityDropDown,
  toggleCommunityDropDown,
}: SidebarProps) => {
  const [value, setValue] = useState(0);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };
  return (
    <div
      ref={sidebarRef}
      className={`transition-all duration-300 ease-in-out  bg-white ${openMenu ? "md:w-[20vw] lg:w-[18vw]" : "lg:w-16"
        }`}
    >
      {" "}
      {/* Sidebar */}
      <div
        className={`bg-white fixed z-20 transition-all duration-300 ease-in-out ${openMenu
          ? "w-[80vw] sm:w-[20vw] top-0 xl:top-20 xl:w-[18vw] left-0 h-full min-h-screen !pb-16"
          : "h-0 top-0 lg:top-20 -left-40 w-0"
          } flex flex-col gap-10 overflow-y-scroll selectscroll`}
      >
        <div className="px-4">
          <div className="xl:hidden flex items-center mt-1">
            <Image src={Logo} alt="Logo" width={40} height={20} />
            <h1 className=" ml-2 text-3xl">
              <b>VYZLO</b>
            </h1>
          </div>
          <h1 className="p-2 font-semibold">Products</h1>
          <div className="py-4">
            {/* <button
              onClick={toggleP2PDropDown}
              className="flex justify-between items-center w-fullw-[14vw] hover:bg-[#d4ebfc] hover:text-[#2196f3] transtiotion-all duration-500 p-4 rounded-md"
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
            {P2PDropDown ? ( */}
            <>
              <Link
                href="/"
                onClick={toggleMenu}
                className="flex justify-between items-center w-full hover:bg-[#d4ebfc] hover:text-[#2196f3] transtiotion-all duration-500 p-1 rounded-md"
              >
                <h1 className="flex items-center p-4 gap-2 w-full">
                  <Image
                    src={sidebarIcon1}
                    alt="sidebarIcon1"
                    className="w-10 h-[22px]"
                    width={25}
                    height={20}
                  />
                  Market Place
                </h1>
              </Link>
              <Link
                href="/create-ads"
                onClick={toggleMenu}
                className="flex justify-between items-center w-full hover:bg-[#d4ebfc] hover:text-[#2196f3] transtiotion-all duration-500 p-1 rounded-md"
              >
                <h1 className="flex items-center p-4 gap-2 w-full">
                  <SiGoogleads className="w-10 h-[22px]" />
                  Create Ads
                </h1>
              </Link>
              <Link
                href="/Wallet"
                onClick={toggleMenu}
                className="flex justify-between items-center w-full hover:bg-[#d4ebfc] hover:text-[#2196f3] transtiotion-all duration-500 p-1 rounded-md"
              >
                <h1 className="flex items-center p-4 gap-2 w-full">
                  <FaWallet className="w-10 h-[22px]" />
                  Current Holding
                </h1>
              </Link>
            </>
            {/* ) : (
              ""
            )} */}
          </div>
          {/* <div className="py-4 px-8">
            <button
              onClick={toggleCommunityDropDown}
              className="flex justify-between items-center w-fullw-[14vw] hover:bg-[#d4ebfc] hover:text-[#2196f3] transtiotion-all duration-500 p-4 rounded-md"
            >
              <h1 className="flex gap-2">
                <PeopleIcon /> Communities
              </h1>
              {!CommunityDropDown ? <IoIosArrowDown /> : <IoIosArrowUp />}
            </button>
            {CommunityDropDown ? (
              <div>
                <h1 className="flex items-center p-4 gap-2 w-full">
                  <GoDotFill fontSize="small" />
                  Communities
                </h1>
                <h1 className="flex items-center p-4 gap-2 w-full">
                  <GoDotFill fontSize="small" />
                  My Community
                </h1>
              </div>
            ) : (
              ""
            )}
          </div> */}
          {/* <div className="py-2 px-4">
            <button className="flex justify-between items-center w-fullw-[14vw] hover:bg-[#d4ebfc] hover:text-[#2196f3] transtiotion-all duration-500 ml-4 p-1 rounded-md">
              <h1 className="flex items-center p-4 gap-2 w-full">
                <Image
                  src="https://app.paydece.io/assets/images/sidebar/subscriptionsIcon.svg"
                  alt="sidebarIcon3"
                  width={30}
                  height={30}
                />
                Subscription
              </h1>
            </button>
          </div> */}
        </div>
        {/* <div className="px-4">
          <h1 className="p-2 font-semibold">Wallet</h1>
          <div className="py-2 px-4">
            <Link
              href="/Wallet"
              className="flex justify-between items-center w-full hover:bg-[#d4ebfc] hover:text-[#2196f3] transtiotion-all duration-500 ml-4 p-1 rounded-md"
            >
              <h1 className="flex items-center p-4 gap-2 w-full">
                <FaWallet fontSize="large" />
                Current Holding
              </h1>
            </Link>
          </div>
        </div> */}
        <div className="px-4">
          <h1 className="p-2 font-semibold">More From VYZLO</h1>
          <div className="py-2">
            <a href="https://t.me/Vyzlo" target="blank">
              <button className="flex justify-between items-center w-full hover:bg-[#d4ebfc] hover:text-[#2196f3] transtiotion-all duration-500 p-1 rounded-md">
                <h1 className="flex items-center p-4 gap-2 w-full">
                  <FaTelegram />
                  Telegram
                </h1>
              </button>
            </a>
            <a href=" https://discord.gg/aVzxt4Ka " target="blank">
              <button className="flex justify-between items-center w-full hover:bg-[#d4ebfc] hover:text-[#2196f3] transtiotion-all duration-500 p-1 rounded-md">
                <h1 className="flex items-center p-4 gap-2 w-full">
                  <FaDiscord />
                  Discord
                </h1>
              </button>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61558965401403"
              target="blank"
            >
              <button className="flex justify-between items-center w-full hover:bg-[#d4ebfc] hover:text-[#2196f3] transtiotion-all duration-500 p-1 rounded-md">
                <h1 className="flex items-center p-4 gap-2 w-full">
                  <FaFacebook />
                  Facebook
                </h1>
              </button>
            </a>
          </div>
          {/* <div className="p-2 px-4">
            <button
              onClick={toggleTutorialDropDown}
              className="flex justify-between items-center w-fullw-[14vw] hover:bg-[#d4ebfc] hover:text-[#2196f3] transtiotion-all duration-500 ml-4 p-2 rounded-md"
            >
              <h1 className="flex items-center p-4 gap-2 w-full">
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
          {/* <div className="p-2 px-4">
            <button className="flex justify-between items-center w-fullw-[14vw] hover:bg-[#d4ebfc] hover:text-[#2196f3] transtiotion-all duration-500 ml-4 p-1 rounded-md">
              <h1 className="flex items-center p-4 gap-2 w-full">
                <HelpOutlineIcon />
                Faq
              </h1>
            </button>
          </div> */}
        </div>
      </div>
      <div
        className={`hidden transition-all bg-white h-full duration-300 ease-in-out fixed top-[80px] z-20 lg:flex flex-col gap-10 items-center w-20 ${openMenu ? "-left-40" : "left-0"
          }`}
      >
        <Link href="/">
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
            <button className="py-2 hover:rounded transtition-all duration-300 hover:bg-[#d4ebfc]">
              <Image
                src={sidebarIcon1}
                alt="sidebarIcon1"
                width={25}
                height={20}
                className="w-10 h-[22px]"
              />
            </button>
          </Tooltip>
        </Link>
        {/* <Tooltip
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
          <button className="py-2 hover:rounded transtition-all duration-300 hover:bg-[#d4ebfc]">
            <PeopleIcon />
          </button>
        </Tooltip> */}

        <Link href="/Wallet">
          <Tooltip
            delay={100}
            closeDelay={100}
            offset={25}
            placement="right"
            content={
              <div className="rounded-lg bg-white text-gray-700">
                <div className="p-2">
                  <Link
                    href="/Wallet"
                    className="flex items-center gap-2 hover:text-[#2196f3] hover:bg-[#d4ebfc] transtiotion-all duration-500 p-4 rounded-md text-gray-500 cursor-pointer"
                  >
                    <GoDotFill fontSize="small" />
                    Current Holding
                  </Link>
                </div>
              </div>
            }
          >
            <button className="py-2 hover:rounded transtition-all duration-300 hover:bg-[#d4ebfc]">
              <FaWallet className="w-10 h-[22px]" />
            </button>
          </Tooltip>
        </Link>
        <Link href="/create-ads">
          <Tooltip
            delay={100}
            closeDelay={100}
            offset={25}
            placement="right"
            content={
              <div className="rounded-lg bg-white text-gray-700">
                <div className="p-2">
                  <Link
                    href="/create-ads"
                    className="flex items-center gap-2 hover:text-[#2196f3] hover:bg-[#d4ebfc] transtiotion-all duration-500 p-4 rounded-md text-gray-500 cursor-pointer"
                  >
                    <SiGoogleads fontSize="small" />
                    Create Ads
                  </Link>
                </div>
              </div>
            }
          >
            <button className="py-2 hover:rounded transtition-all duration-300 hover:bg-[#d4ebfc]">
              <SiGoogleads className="w-10 h-[22px]" />
            </button>
          </Tooltip>
        </Link>
        <Link target="_blank" href="https://t.me/Vyzlo">
          <Tooltip
            delay={100}
            closeDelay={100}
            offset={25}
            placement="right"
            content={
              <div className="rounded-lg bg-white text-gray-700">
                <div className="p-2">
                  <Link
                    href="https://t.me/Vyzlo"
                    target="_blank"
                    className="flex items-center gap-2 hover:text-[#2196f3] hover:bg-[#d4ebfc] transtiotion-all duration-500 p-4 rounded-md text-gray-500 cursor-pointer"
                  >
                    <GoDotFill fontSize="small" />
                    Telegram
                  </Link>
                </div>
              </div>
            }
          >
            <button className="py-2 hover:rounded transtition-all duration-300 hover:bg-[#d4ebfc]">
              <FaTelegram className="w-10 h-[22px]" />
            </button>
          </Tooltip>
        </Link>

        <Link target="_blank" href="https://discord.com/invite/aVzxt4Ka">
          <Tooltip
            delay={100}
            closeDelay={100}
            offset={25}
            placement="right"
            content={
              <div className="rounded-lg bg-white text-gray-700">
                <div className="p-2">
                  <Link
                    href="/https://discord.com/invite/aVzxt4Ka"
                    target="_blank"
                    className="flex items-center gap-2 hover:text-[#2196f3] hover:bg-[#d4ebfc] transtiotion-all duration-500 p-4 rounded-md text-gray-500 cursor-pointer"
                  >
                    <GoDotFill fontSize="small" />
                    Discord
                  </Link>
                </div>
              </div>
            }
          >
            <button className="py-2 hover:rounded transtition-all duration-300 hover:bg-[#d4ebfc]">
              <FaDiscord className="w-10 h-[22px]" />
            </button>
          </Tooltip>
        </Link>

        <Link
          target="_blank"
          href="https://www.facebook.com/profile.php?id=61558965401403"
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
                    href="https://www.facebook.com/profile.php?id=61558965401403"
                    target="_blank"
                    className="flex items-center gap-2 hover:text-[#2196f3] hover:bg-[#d4ebfc] transtiotion-all duration-500 p-4 rounded-md text-gray-500 cursor-pointer"
                  >
                    <GoDotFill fontSize="small" />
                    Facebook
                  </Link>
                </div>
              </div>
            }
          >
            <button className="py-2 hover:rounded transtition-all duration-300 hover:bg-[#d4ebfc]">
              <FaFacebook className="w-10 h-[22px]" />
            </button>
          </Tooltip>
        </Link>
        {/* <Tooltip
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
          <button className="py-2 hover:rounded transtition-all duration-300 hover:bg-[#d4ebfc]">
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
          <button className="py-2 hover:rounded transtition-all duration-300 hover:bg-[#d4ebfc]">
            <HelpOutlineIcon />
          </button>
        </Tooltip> */}
      </div>
    </div>
  );
};

export default Sidebar;
function toggleMenu() {
  throw new Error("Function not implemented.");
}
