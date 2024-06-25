import { ethers } from "ethers";
import { contractAddress } from "@/content/utils";
import ABI from "@/content/ABI.json";

declare global {
  interface Window {
    ethereum: ethers.providers.ExternalProvider | null;
  }
}
let provider;

let signer: ethers.providers.Provider | ethers.Signer | undefined;

if (typeof window !== "undefined") {
  provider = new ethers.providers.Web3Provider(window.ethereum as any);

  signer = provider.getSigner();
} else {
  // Handle the case where window is not defined (e.g. server-side rendering)

  console.log("Window is not defined");
}

// export const CreateEsCrow = async () => {
//   const gasPrice = await signer?.getGasPrice();
//   const myContract = new ethers.Contract(contractAddress, ABI, signer);
//   const orderId = 17;
//   const takerAddress = "0xA6cA715bD8f2160D5AFD1B278DaB294d2AD160eF";
//   const value = 100000000000000;
//   const makerPremium = false;
//   const takerPremium = false;
//   myContract.createEscrowNativeCoin(
//     orderId,
//     takerAddress,
//     value,
//     makerPremium,
//     takerPremium,
//     {
//       gasPrice: gasPrice,
//       gasLimit: "210000",
//       value: value,
//     }
//   );
// };

export const CreateEsCrow = async (): Promise<boolean> => {
  try {
    const gasPrice = await signer?.getGasPrice();
    const myContract = new ethers.Contract(contractAddress, ABI, signer);
    const orderId = 17;
    const takerAddress = "0xA6cA715bD8f2160D5AFD1B278DaB294d2AD160eF";
    const value = 100000000000000;
    const makerPremium = false;
    const takerPremium = false;
    
    await myContract.createEscrowNativeCoin(
      orderId,
      takerAddress,
      value,
      makerPremium,
      takerPremium,
      {
        gasPrice: gasPrice,
        gasLimit: "210000",
        value: value,
      }
    );
    return true; 
  } catch (error) {
    console.error("Transaction failed:", error);
    return false; 
  }
};

export const SetMarkAsPaid = async (): Promise<boolean> => {
  try {
    const myContract = new ethers.Contract(contractAddress, ABI, signer);
    const orderId = 17;
    await myContract.setMarkAsPaid(orderId);
    return true; 
  } catch (error) {
    console.error("Transaction failed:", error);
    return false; 
  }
};

export const ReleaseEsCrow = async (): Promise<boolean> => {
  try {
    const myContract = new ethers.Contract(contractAddress, ABI, signer);
    const orderId = 17;
    await myContract.releaseEscrowNativeCoin(orderId);
    return true; 
  } catch (error) {
    console.error("Transaction failed:", error);
    return false; 
  }
};