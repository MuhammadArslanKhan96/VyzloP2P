import React, { createContext, useContext, useState } from "react";
import { ethers } from "ethers";
import { setWalletAddress } from "@/hooks/cookies";

const AppContext = createContext({} as any); // Provide a default value to the context

// declare global {
//   interface Window {
//     ethers: any | null;
//   }
// }

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
    networkId: number
  ): Promise<
    ethers.providers.JsonRpcProvider | ethers.providers.Web3Provider
  > => {
    let ethersProvider:
      | ethers.providers.JsonRpcProvider
      | ethers.providers.Web3Provider;

    if (window.ethereum && window.ethereum.isMetaMask) {
      ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
    } else {
      const publicEndpoint = "https://rpc-amoy.polygon.technology";
      ethersProvider = new ethers.providers.JsonRpcProvider(publicEndpoint);
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

  // const getEthersInstance = async (
  //   networkId: number
  // ): Promise<ethers.Providers> => {
  //   let ethersProvider: ethers.Provider;

  //   if (window.ethereum) {
  //     ethersProvider = new ethers.BrowserProvider(window.ethereum as any);
  //   } else {
  //     const publicEndpoint = "https://rpc-amoy.polygon.technology";
  //     ethersProvider = new ethers.JsonRpcProvider(publicEndpoint);
  //   }

  //   const currentNetworkId = await ethersProvider
  //     .getNetwork()
  //     .then((network: any) => network.chainId);

  //   if (Number(currentNetworkId) !== networkId && window.ethereum) {
  //     try {
  //       await (window.ethereum as any).request({
  //         method: "wallet_switchEthereumChain",
  //         params: [{ chainId: `0x${networkId.toString(16)}` }],
  //       });
  //     } catch (switchError: any) {
  //       if (switchError.code === 4902) {
  //         try {
  //           await (window.ethereum as any).request({
  //             method: "wallet_addEthereumChain",
  //             params: [
  //               {
  //                 chainId: `0x${networkId.toString(16)}`,
  //                 chainName: "Polygon Amoy Testnet",
  //                 nativeCurrency: {
  //                   name: "MATIC",
  //                   symbol: "MATIC",
  //                   decimals: 18,
  //                 },
  //                 rpcUrls: ["https://rpc-amoy.polygon.technology"],
  //               },
  //             ],
  //           });
  //         } catch (addError) {
  //           // Handle "add" error
  //           console.error("Error adding Ethereum chain:", addError);
  //         }
  //       }
  //       // Handle other "switch" errors
  //       console.error("Error switching Ethereum chain:", switchError);
  //     }
  //   }

  //   if (window.ethereum) {
  //     await getUserWalletAddresses();
  //   }

  //   return ethersProvider;
  // };

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
