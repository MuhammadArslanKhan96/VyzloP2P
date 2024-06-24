import React, { useState } from "react";
import AccountSidebar from "./AccountSidebar";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import { IoIosArrowForward } from "react-icons/io";
import sidebarIcon1 from "../../../public/images/icon1.svg";
import Image from "next/image";
import Settings from "./Settings";

const AccountSettings = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const [P2PDropDown, openP2PDropDown] = useState(false);
  const toggleP2PDropDown = () => {
    openP2PDropDown(!P2PDropDown);
  };

  const [CommunityDropDown, openCommunityDropDown] = useState(false);
  const toggleCommunityDropDown = () => {
    openCommunityDropDown(!CommunityDropDown);
  };

  const [TutorialDropDown, openTutorialDropDown] = useState(false);
  const toggleTutorialDropDown = () => {
    openTutorialDropDown(!TutorialDropDown);
  };

  const [openAccMenu, setOpenAccMenu] = useState(false);
  const toggleAccMenu = () => {
    setOpenAccMenu(!openAccMenu);
  };
  return (
    <>
      <Header
        toggleAccMenu={toggleAccMenu}
        openAccMenu={openAccMenu}
        openMenu={openMenu}
        toggleMenu={toggleMenu}
      />

      <div className="flex">
        {/* Main Content */}
        {openMenu && (
          <div
            onClick={toggleMenu}
            className="bg-black/70 xl:hidden w-screen h-full min-h-screen fixed top-0 left-0 z-10"
          ></div>
        )}
        <Sidebar
          openMenu={openMenu}
          TutorialDropDown={TutorialDropDown}
          toggleTutorialDropDown={toggleTutorialDropDown}
          P2PDropDown={P2PDropDown}
          toggleP2PDropDown={toggleP2PDropDown}
          CommunityDropDown={CommunityDropDown}
          toggleCommunityDropDown={toggleCommunityDropDown}
        />
        {openAccMenu && (
          <div
            onClick={toggleAccMenu}
            className="bg-black/70 xl:hidden w-screen h-full min-h-screen fixed top-0 left-0 z-10"
          ></div>
        )}
        <AccountSidebar
          openAccMenu={openAccMenu}
          toggleAccMenu={toggleAccMenu}
        />
        {/* Content */}
        <div className="bg-[#d4ebfc] max-lg:pt-20 pt-32 w-screen h-full min-h-screen">
          <div className="p-6">
            <div className="bg-white px-2 py-4 rounded-md border border-gray-300 flex justify-between max-sm:gap-2 whitespace-nowrap">
              <h1 className="text-[12px] lg:text-xl font-semibold">
                Marketplace
              </h1>
              <div className="flex items-center gap-2">
                <button className="text-[12px] lg:text-xl flex items-center gap-2">
                  <Image
                    src={sidebarIcon1}
                    alt="sideBarIcon1"
                    width={20}
                    height={20}
                  />
                </button>
                <IoIosArrowForward className="text-gray-400" />
                <button className="text-[12px] lg:text-xl flex items-center gap-2">
                  P2P
                </button>
                <IoIosArrowForward className="text-gray-400" />
                <h1 className="text-gray-400 text-[12px] lg:text-xl">
                  Settings
                </h1>
              </div>
            </div>
          </div>
          <Settings />
        </div>
      </div>
    </>
  );
};

export default AccountSettings;
