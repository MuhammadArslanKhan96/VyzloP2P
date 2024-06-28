import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";

interface UserData {
  blockChain?: string;
  cryptoSymbol?: any;
  fiatCurrency?: string;
  method?: string;
  selectedUserId?: number;
  wallet?: string;
  txType?: string;
  uid?: number;
  value?: string;
  paymentMethods?:any;
  message?:string;
  terms?:string;
  min?:string;
  max?:string
  country?:string;
  price?:string
  condition?:string
}

export const CreateOrder = async (data: UserData) => {
  console.log(data)
  try {
    const time = new Date().toISOString(); 
    const userCollection = collection(db, 'createOrder');
    const userDocRef = await addDoc(userCollection, { time, ...data });
    return userDocRef;
  } catch (error) {
    console.error('Error adding document: ', error);
    throw new Error('Error adding document');
  }
};
