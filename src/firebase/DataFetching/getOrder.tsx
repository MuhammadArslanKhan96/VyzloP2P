import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../utils/firebaseConfig";

export interface OrderItem {
  blockChain: string;
  cryptoSymbol: string;
  fiatCurrency: string;
  takerAddress: string;
  time: string;
  method: string;
  txType: string;
  uid: number;
  paymentMethod: string[];
  message: string;
  terms: string;
}

export const fetchOrder = async (
  collectionName: string
): Promise<OrderItem[]> => {
  try {
    const userCol = collection(db, collectionName);
    const userCitySnapshot = await getDocs(userCol);
    const data = userCitySnapshot.docs.map((doc) => doc.data() as OrderItem);
    return data;
  } catch (error) {
    console.error("Error fetching collection:", error);
    throw error;
  }
};
