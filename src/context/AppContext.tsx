import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { setWalletAddress } from "@/hooks/cookies";
import { chains, networkIds } from "@/constants/rpcs";
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
  const [balance, setBalance] = useState(0);
  const [chainCoin, setChainCoin] = useState("MATIC");

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

  const getBalance = async (Wallet?: string) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const selectedChain = await provider.getNetwork();
    const chainId = Number(selectedChain.chainId);
    const chainsKeys = Object.keys(networkIds);
    const chainsValues = Object.values(networkIds);
    const selectedCoin = chains[chainsKeys[chainsValues.indexOf(chainId)] as SupportedBlockchains];
    setChainCoin(selectedCoin.nativeCurrency.name);
    const balanceEth = await provider.getBalance(Wallet ? Wallet : wallet);
    const balance = ethers.formatEther(balanceEth);
    setBalance(parseFloat(balance))
  };

  const getWalletFunction = async (connect?: boolean) => {
    if (window.ethereum) {
      try {
        const walletConnected = localStorage.getItem("walletConnected");
        if (walletConnected === null && !connect) return;

        const res = await (walletConnected ?
          window.ethereum.request({
            method: 'eth_requestAccounts',
            params: []
          })
          :
          window.ethereum.request({
            method: "wallet_requestPermissions",
            params: [{
              eth_accounts: {}
            }]
          }).then(() => window.ethereum.request({
            method: 'eth_requestAccounts'
          })));

        const Wallet = res.length > 0 ? res[0] : null;
        Wallet && setWallet(Wallet);
        setWalletAddress(Wallet);
        localStorage.setItem("walletConnected", "true");

        Wallet && await getBalance(Wallet);


        window.ethereum.on("connect", (accounts: string[]) => {
          getBalance(accounts[0])
        });

        window.ethereum.on("accountsChanged", (accounts: string[]) => {
          setWallet(accounts[0]);
          setWalletAddress(accounts[0]);
          getBalance(accounts[0])
        });

        window.ethereum.on("chainChanged", () => {
          getBalance();
        });

        window.ethereum.on("disconnect", () => {
          setWalletAddress(null);
          localStorage.removeItem("walletConnected");
          setBalance(0);
        });



      } catch (err) {
        console.error("Error requesting accounts:", err);
      }
    } else {
      alert("Install MetaMask extension!!");
    }
  };

  useEffect(() => {
    getWalletFunction();
  }, []);

  const disconnectWallet = async () => {
    setWallet(null);
    setWalletAddress(null);
    localStorage.removeItem("walletConnected");
    setBalance(0);
  }

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
        balance,
        disconnectWallet,
        chainCoin
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

export const useAppContext = () => useContext(AppContext); // Use the correct context
