import React, { useState } from "react";
import Logo from "../../../public/images/logoVyzlo.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdLanguage } from "react-icons/md";
import Image from "next/image";
import { CiSettings } from "react-icons/ci";
import { IoIosNotifications, IoMdContact } from "react-icons/io";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useAppContext } from "@/context/AppContext";
import { Badge, IconButton, Menu, MenuItem } from "@mui/material";
import { IoNotificationsCircleOutline } from "react-icons/io5";

type HeaderProps = {
  toggleMenu: () => void;
  toggleAccMenu: () => void;
  openAccMenu?: boolean;
  openMenu?: boolean;
  toggleList?: () => void;
  openList?: boolean;
};

const Header = ({
  toggleList,
  toggleMenu,
  toggleAccMenu,
  openAccMenu,
  openMenu,
  openList,
}: HeaderProps) => {
  const { getWalletFunction, wallet } = useAppContext();
  const walletConnect = async () => {
    getWalletFunction(true);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* Header */}
      <div
        className={`bg-[#fff] py-4 px-4 flex items-center justify-between z-10 w-full ${openMenu ? "absolute lg:fixed top-0" : "fixed"
          } ${openAccMenu ? "absolute lg:fixed top-0" : "fixed"}`}
      >
        <div className="flex items-center gap-12">
          <div className="hidden lg:flex items-center">
            <Image src={Logo} alt="Logo" width={50} height={30} />
            <h1 className=" ml-2 text-3xl">
              <b>VYZLO</b>
            </h1>
          </div>
          <RxHamburgerMenu
            onClick={toggleMenu}
            className="h-10 text-[40px] cursor-pointer rounded-lg bg-[#d4ebfc] text-[#05379A] hover:bg-[#05379A] hover:text-white p-2 transition-all duration-500"
          />
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={toggleList}>
            <BiDotsVerticalRounded fontSize="32px" className="text-blue-500" />
          </button>
          {openList ? (
            <div className="bg-blue-400 rounded p-4 text-sm justify-center items-center absolute top-14 left-[50vw] flex flex-col gap-2">
              <button
                className="bg-[#d4ebfc] font-semibold px-4 py-2 rounded-lg"
                onClick={() => {
                  !wallet && walletConnect();
                }}
              >
                {wallet
                  ? wallet?.slice(0, 5) + "..." + wallet?.slice(-6)
                  : "Connect Wallet"}
              </button>
              <button
                className="flex gap-2 mx-auto bg-[#d4ebfc] justify-center text-[#2196f3] p-3 rounded-full hover:text-white hover:bg-blue-500"
                onClick={toggleAccMenu}
              >
                <IoMdContact size={22} />
                <CiSettings size={22} />
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="hidden md:flex items-center gap-2 lg:gap-6">
          {/* <button className="bg-[#d4ebfc] text-[#2196f3] px-4 py-1 rounded-lg flex items-center gap-2">
            <MdLanguage className="text-[20px]" /> IS
          </button> */}
          <button
            className="me-8 sm:me-0 bg-[#d4ebfc] font-semibold px-4 py-1 rounded-lg"
            onClick={() => {
              !wallet && walletConnect();
            }}
          >
            {wallet
              ? wallet?.slice(0, 5) + "..." + wallet?.slice(-6)
              : "Connect Wallet"}
          </button>
          {/* 
          <button
            className="me-8 sm:me-0 bg-[#d4ebfc] font-semibold px-4 py-1 rounded-lg"
          >
            <IoIosNotifications size={22} />
          </button> */}
          <div>
            <IconButton onClick={handleOpenMenu} color="inherit">
              <Badge badgeContent={2} color="error">
                <IoIosNotifications size={22} />
              </Badge>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
              disableScrollLock
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <MenuItem disabled>No notifications</MenuItem>
            </Menu>
          </div>

          <button
            className="flex gap-2 bg-[#d4ebfc] text-[#05379A] p-3 rounded-full hover:text-white hover:bg-[#05379A] transition-all duration-500"
            onClick={toggleAccMenu}
          >
            <IoMdContact size={22} />
            <CiSettings size={22} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
