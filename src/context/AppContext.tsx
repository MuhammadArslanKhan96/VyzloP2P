import React, { createContext, useContext, useState } from "react";
import { ethers } from "ethers";
import { setWalletAddress } from "@/hooks/cookies";
import { chains } from "@/constants/rpcs";
import { SupportedBlockchains } from "@/types";

const AppContext = createContext({} as any); // Provide a default value to the context

declare global {
  interface Window {
    ethereum: any | null;
  }
}

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [wallet, setWallet] = useState<any>();
  const [tabValue, setTabValue] = useState(0);
  const [maker, setMaker] = useState<boolean>(false);

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
    networkId: number, network: SupportedBlockchains
  ): Promise<ethers.JsonRpcProvider | ethers.BrowserProvider> => {
    let ethersProvider: ethers.JsonRpcProvider | ethers.BrowserProvider;

    if (window.ethereum && window.ethereum.isMetaMask) {
      ethersProvider = new ethers.BrowserProvider(window.ethereum);
    } else {
      const publicEndpoint =
        "https://polygon-amoy.blockpi.network/v1/rpc/public";
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
                chains[network],
              ],
            });
          } catch (addError) {
            console.error("Error adding Ethereum chain:", addError);
            throw addError;
          }
        } else {
          console.error("Error switching Ethereum chain:", switchError);
          throw switchError; // Rethrow or handle as needed
        }
      }
    }

    if (window.ethereum && window.ethereum.isMetaMask) {
      await getUserWalletAddresses(); // Replace with your function to handle user wallet addresses
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
        console.log();
        Wallet && setWallet(Wallet);
        console.log(Wallet);
        setWalletAddress(Wallet);
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
        maker,
        setMaker,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

export const useAppContext = () => useContext(AppContext); // Use the correct context
