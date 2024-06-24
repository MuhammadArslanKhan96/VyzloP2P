import React, { createContext, useContext, useState } from "react";
import { ethers } from "ethers";

const AppContext = createContext({} as any); // Provide a default value to the context

declare global {
  interface Window {
    ethereum: ethers.providers.ExternalProvider | null;
  }
}

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [wallet, setWallet] = useState<any>();
  const networkId = 80002;
  // const networkId = 7000; //For Mainnet Only

  // console.log(wallet, "wallet");
  const getUserWalletAddresses = async (): Promise<void> => {
    try {
      await (window.ethereum as any).request({ method: "eth_requestAccounts" });
    } catch (accountError) {
      // Handle error if needed
    }
  };
  const getEthersInstance = async (
    networkId: number
  ): Promise<ethers.providers.Provider> => {
    let ethersProvider: ethers.providers.Provider;

    if (window.ethereum) {
      ethersProvider = new ethers.providers.Web3Provider(
        window.ethereum as any
      );
    } else {
      // const publicEndpoint = "https://zetachain-athens-evm.blockpi.network/v1/rpc/public";
      const publicEndpoint = "https://rpc-amoy.polygon.technology";

      // const publicEndpoint = "https://zetachain-evm.blockpi.network/v1/rpc/public"; //For Mainnet Only
      ethersProvider = new ethers.providers.JsonRpcProvider(publicEndpoint);
    }

    const currentNetworkId = await ethersProvider
      .getNetwork()
      .then((network: any) => network.chainId);

    if (currentNetworkId !== networkId && window.ethereum) {
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
                  chainName: "ZetaChain",
                  nativeCurrency: {
                    // name: "ZetaChain Athens 3 Testnet",
                    name: "Polygon Amoy Testnet",
                    // name: "ZetaChain Mainnet", //For Mainnet Only
                    // symbol: "ZETA",
                    symbol: "MATIC",
                    decimals: 18,
                  },
                  // rpcUrls: ["https://zetachain-athens-evm.blockpi.network/v1/rpc/public"],
                  rpcUrls: ["https://rpc-amoy.polygon.technology"],
                  // rpcUrls: ["https://zetachain-evm.blockpi.network/v1/rpc/public"], //For Mainnet Only
                },
              ],
            });
          } catch (addError) {
            // Handle "add" error
          }
        }
        // Handle other "switch" errors
      }
    }

    if (window.ethereum) {
      await getUserWalletAddresses();
    }

    return ethersProvider;
  };

  const getWalletFunction = () => {
    if (window.ethereum && window.ethereum.request) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })

        .then((res: any) => {
          const Wallet = res.length > 0 && String(res[0]);
          console.log(Wallet, "YO");
          !wallet && setWallet(Wallet);
        })

        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("install metamask extension!!");
    }
  };
  return (
    <AppContext.Provider
      value={{
        wallet,
        setWallet,
        getEthersInstance,
        getWalletFunction,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

export const useAppContext = () => useContext(AppContext); // Use the correct context
