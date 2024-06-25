import React, { createContext, useContext, useState } from "react";
import { ethers } from "ethers";
import { setWalletAddress } from "@/hooks/cookies";

const AppContext = createContext({} as any); // Provide a default value to the context

declare global {
  interface Window {
    ethers: ethers.Provider | any | null;
  }
}

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [wallet, setWallet] = useState<any>();
  const [tabValue, setTabValue] = useState(0);

  const networkId = 80002;
  // const networkId = 7000; //For Mainnet Only

  // console.log(wallet, "wallet");
  const getUserWalletAddresses = async (): Promise<void> => {
    try {
      await (window.ethereum as any).request({ method: "eth_requestAccounts" });
    } catch (accountError) {
      // Handle error if needed
      console.error("Error requesting accounts:", accountError);
    }
  };

  const getEthersInstance = async (
    networkId: number
  ): Promise<ethers.Provider> => {
    let ethersProvider: ethers.Provider;

    if (window.ethereum) {
      ethersProvider = new ethers.BrowserProvider(window.ethereum as any);
    } else {
      const publicEndpoint = "https://rpc-amoy.polygon.technology";
      ethersProvider = new ethers.JsonRpcProvider(publicEndpoint);
    }

    const currentNetworkId = await ethersProvider
      .getNetwork()
      .then((network) => network.chainId);

    if (Number(currentNetworkId) !== networkId && window.ethereum) {
      try {
        await (window.ethereum as any).request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: `0x${networkId.toString(16)}` }],
        });
      } catch (switchError: any) {
        if (switchError.code === 4902) {
          try {
            await (window.ethereum as any).request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: `0x${networkId.toString(16)}`,
                  chainName: "Polygon Amoy Testnet",
                  nativeCurrency: {
                    name: "MATIC",
                    symbol: "MATIC",
                    decimals: 18,
                  },
                  rpcUrls: ["https://rpc-amoy.polygon.technology"],
                },
              ],
            });
          } catch (addError) {
            // Handle "add" error
            console.error("Error adding Ethereum chain:", addError);
          }
        }
        // Handle other "switch" errors
        console.error("Error switching Ethereum chain:", switchError);
      }
    }

    if (window.ethereum) {
      await getUserWalletAddresses();
    }

    return ethersProvider;
  };

  const getWalletFunction = async () => {
    if (window.ethereum) {
      try {
        const res = await (window.ethereum as any).request({
          method: "eth_requestAccounts",
        });
        const Wallet = res.length > 0 ? res[0] : null;
        console.log(wallet, "YO");
        // Assuming wallet and setWallet are defined elsewhere in your code
        // Replace the following lines with your state management logic
        // Example:
        Wallet && setWallet(Wallet);
        // setWalletAddress(wallet);
      } catch (err) {
        console.error("Error requesting accounts:", err);
      }
    } else {
      alert("Install MetaMask extension!!");
    }
  };
  return (
    <AppContext.Provider
      value={{
        wallet,
        setWallet,
        getEthersInstance,
        getWalletFunction,
        tabValue,
        setTabValue,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

export const useAppContext = () => useContext(AppContext); // Use the correct context
