import { ethers } from "ethers";
// import { contractAddress } from "@/content/utils";
import ABI from "@/content/ABI.json";


declare global {
  interface Window {
    ethereum: any | null;
  }
}

let provider: ethers.BrowserProvider;

let signer: ethers.Signer | any | undefined;

export const CreateEsCrow = async (takerAddress: string, contractAddress: string): Promise<boolean | number> => {
  if (typeof window !== "undefined") {
    provider = new ethers.BrowserProvider(window.ethereum as any);

    signer = await provider.getSigner();
  }
  try {
    // const gasPrice = await signer?.getGasPrice();
    const myContract = new ethers.Contract(contractAddress, ABI, signer);
    const orderId = Date.now();
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
        // gasPrice: gasPrice,
        // gasLimit: "210000",
        value: value,
      }
    );
    return orderId;
  } catch (error) {
    console.error("Transaction failed:", error);
    return false;
  }
};

export const SetMarkAsPaid = async (orderId: number, contractAddress: string): Promise<boolean> => {
  if (typeof window !== "undefined") {
  provider = new ethers.BrowserProvider(window.ethereum as any);

  signer = await provider.getSigner();
}
  try {
    const myContract = new ethers.Contract(contractAddress, ABI, signer);
    console.log(signer);
    await myContract.setMarkAsPaid(orderId);
    return true;
  } catch (error) {
    console.error("Transaction failed:", error);
    return false;
  }
};

export const ReleaseEsCrow = async (orderId: number, contractAddress: string): Promise<boolean> => {
  if (typeof window !== "undefined") {
    provider = new ethers.BrowserProvider(window.ethereum as any);
  
    signer = await provider.getSigner();
  }
  try {
    const myContract = new ethers.Contract(contractAddress, ABI, signer);
    await myContract.releaseEscrowNativeCoin(orderId);
    return true;
  } catch (error) {
    console.error("Transaction failed:", error);
    return false;
  }
};
