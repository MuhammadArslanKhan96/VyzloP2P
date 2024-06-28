import AccountSidebar from "@/components/Account/AccountSidebar";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import AppContextProvider from "@/context/AppContext";
import { TelegramProvider } from "@/context/TelegramProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useState } from "react";
import { PagesProgressBar as ProgressBar } from "next-nprogress-bar";

export default function App({ Component, pageProps }: AppProps) {
  const [openMenu, setOpenMenu] = useState(false);
  const [openAccMenu, setOpenAccMenu] = useState(false);
  const [openList, setOpenList] = useState(false);

  const toggleList = () => {
    setOpenList(!openList)
  }

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
    setOpenAccMenu(false);
  };
  const toggleAccMenu = () => {
    setOpenAccMenu(!openAccMenu);
    setOpenMenu(false);
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
  const closedBothSideBar = () => {
    setOpenAccMenu(false);
    setOpenMenu(false);
  };
  const router = useRouter();
  const hideSidebarAndHeader = router.asPath.startsWith("/purchase");

  return (
    <>
      <TelegramProvider>
        <AppContextProvider>
          {!hideSidebarAndHeader && (
            <Header
              openList={openList}
              toggleList={toggleList}
              openMenu={openMenu}
              toggleMenu={toggleMenu}
              openAccMenu={openAccMenu}
              toggleAccMenu={toggleAccMenu}
            />
          )}

          <div className="">
            {openMenu || openAccMenu ? (
              <div
                onClick={closedBothSideBar}
                className=" w-screen h-full min-h-screen fixed top-20 left-0 z-10"
              ></div>
            ) : null}
            {!hideSidebarAndHeader && (
              <>
                <Sidebar
                  openMenu={openMenu}
                  toggleMenu={toggleMenu}
                  TutorialDropDown={TutorialDropDown}
                  toggleTutorialDropDown={toggleTutorialDropDown}
                  P2PDropDown={P2PDropDown}
                  toggleP2PDropDown={toggleP2PDropDown}
                  CommunityDropDown={CommunityDropDown}
                  toggleCommunityDropDown={toggleCommunityDropDown}
                />
                <AccountSidebar
                  openAccMenu={openAccMenu}
                  toggleAccMenu={toggleAccMenu}
                />
              </>
            )}
            <div className={`${openMenu ? "lg:ml-40" : ""}`}>
              <Component {...pageProps} />
              <ProgressBar
                height="2px"
                color="#2196f3"
                options={{ showSpinner: false }}
                shallowRouting
              />
            </div>
          </div>
        </AppContextProvider>
      </TelegramProvider>
    </>
  );
}
