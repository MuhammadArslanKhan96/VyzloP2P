import { useState } from "react";
import React from "react";
import Market from "@/components/Marketplace/MarketPlace";

export default function Home() {
  const [tab, setTab] = useState(true);

  const toggleTabBuy = () => {
    setTab(true);
  };

  const toggleTabSell = () => {
    setTab(false);
  };

  return (
    <>
      {/* <h1>Coming Soon, stay with us</h1> */}
      <Market
        tab={tab}
        toggleTabBuy={toggleTabBuy}
        toggleTabSell={toggleTabSell}
      />
    </>
  );
}
