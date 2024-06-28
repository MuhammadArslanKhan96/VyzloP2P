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
};

const Sidebar = ({ openMenu, toggleMenu }: SidebarProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={sidebarRef}
      className={`transition-all duration-300 ease-in-out  bg-white ${
        openMenu ? "md:w-[20vw] lg:w-[18vw]" : "lg:w-16"
      }`}
    >
      {" "}
      <div
        className={`bg-white fixed z-20 transition-all duration-300 ease-in-out ${
          openMenu
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
            <>
              <Link
                href="/"
                onClick={toggleMenu}
                className="flex justify-between items-center w-full hover:bg-[#d4ebfc] hover:text-[#05379A] transtiotion-all duration-500 p-1 rounded-md"
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
                className="flex justify-between items-center w-full hover:bg-[#d4ebfc] hover:text-[#05379A] transtiotion-all duration-500 p-1 rounded-md"
              >
                <h1 className="flex items-center p-4 gap-2 w-full">
                  <SiGoogleads className="w-10 h-[22px] hover:text-[#05379A]" />
                  Create Ad
                </h1>
              </Link>
              <Link
                href="/Wallet"
                onClick={toggleMenu}
                className="flex justify-between items-center w-full hover:bg-[#d4ebfc] hover:text-[#05379A] transtiotion-all duration-500 p-1 rounded-md"
              >
                <h1 className="flex items-center p-4 gap-2 w-full">
                  <FaWallet className="w-10 h-[22px]" />
                  Current Holding
                </h1>
              </Link>
            </>
          </div>
        </div>
        <div className="px-4">
          <h1 className="p-2 font-semibold">More From VYZLO</h1>
          <div className="py-2">
            <a href="https://t.me/Vyzlo" target="blank">
              <button className="flex justify-between items-center w-full hover:bg-[#d4ebfc] hover:text-[#05379A] transtiotion-all duration-500 p-1 rounded-md">
                <h1 className="flex items-center p-4 gap-2 w-full">
                  <FaTelegram className="hover:text-[#05379A]" />
                  Telegram
                </h1>
              </button>
            </a>
            <a href=" https://discord.gg/aVzxt4Ka " target="blank">
              <button className="flex justify-between items-center w-full hover:bg-[#d4ebfc] hover:text-[#05379A] transtiotion-all duration-500 p-1 rounded-md">
                <h1 className="flex items-center p-4 gap-2 w-full">
                  <FaDiscord className="hover:text-[#05379A]" />
                  Discord
                </h1>
              </button>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61558965401403"
              target="blank"
            >
              <button className="flex justify-between items-center w-full hover:bg-[#d4ebfc] hover:text-[#05379A] transtiotion-all duration-500 p-1 rounded-md">
                <h1 className="flex items-center p-4 gap-2 w-full">
                  <FaFacebook className="hover:text-[#05379A]" />
                  Facebook
                </h1>
              </button>
            </a>
          </div>
        </div>
      </div>
      <div
        className={`hidden transition-all bg-white h-full duration-300 ease-in-out fixed top-[80px] z-20 lg:flex flex-col gap-10 items-center w-20 ${
          openMenu ? "-left-40" : "left-0"
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
                    className="flex items-center gap-2 hover:text-[#05379A] hover:bg-[#d4ebfc] transtiotion-all duration-500 p-4 rounded-md text-gray-500 cursor-pointer"
                  >
                    <GoDotFill fontSize="small" />
                    Market Place
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
                    className="flex items-center gap-2 hover:text-[#05379A] hover:bg-[#d4ebfc] transtiotion-all duration-500 p-4 rounded-md text-gray-500 cursor-pointer"
                  >
                    <GoDotFill fontSize="small" />
                    Create Ad
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
                    className="flex items-center gap-2 hover:text-[#05379A] hover:bg-[#d4ebfc] transtiotion-all duration-500 p-4 rounded-md text-gray-500 cursor-pointer"
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
                    className="flex items-center gap-2 hover:text-[#05379A] hover:bg-[#d4ebfc] transtiotion-all duration-500 p-4 rounded-md text-gray-500 cursor-pointer"
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
                    className="flex items-center gap-2 hover:text-[#05379A] hover:bg-[#d4ebfc] transtiotion-all duration-500 p-4 rounded-md text-gray-500 cursor-pointer"
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
                    className="flex items-center gap-2 hover:text-[#05379A] hover:bg-[#d4ebfc] transtiotion-all duration-500 p-4 rounded-md text-gray-500 cursor-pointer"
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
      </div>
    </div>
  );
};

export default Sidebar;
function toggleMenu() {
  throw new Error("Function not implemented.");
}
