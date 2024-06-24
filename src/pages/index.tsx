import { useState } from "react";
import React from "react";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import MarketPlace from "@/components/Marketplace/MarketPlace";
import AccountSidebar from "@/components/Account/AccountSidebar";

export default function Home() {
  const [tab, setTab] = useState(true);
  const toggleTabBuy = () => {
    setTab(true);
  };

  const toggleTabSell = () => {
    setTab(false);
  };

  const [openMenu, setOpenMenu] = useState(false);
  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const [openAccMenu, setOpenAccMenu] = useState(false);
  const toggleAccMenu = () => {
    setOpenAccMenu(!openAccMenu);
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

  return (
    <>
      <Header
        openMenu={openMenu}
        toggleMenu={toggleMenu}
        openAccMenu={openAccMenu}
        toggleAccMenu={toggleAccMenu}
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
        <MarketPlace
          tab={tab}
          toggleTabBuy={toggleTabBuy}
          toggleTabSell={toggleTabSell}
        />
      </div>
    </>
  );
}
