import Market from "@/components/Marketplace/MarketPlace";
import React, { useState } from "react";

const MarketPlace = () => {
  const [tab, setTab] = useState(true);

  const toggleTabBuy = () => {
    setTab(true);
  };

  const toggleTabSell = () => {
    setTab(false);
  };

  return (
    <Market
      tab={tab}
      toggleTabBuy={toggleTabBuy}
      toggleTabSell={toggleTabSell}
    />
  );
};

export default MarketPlace;
