import { addDoc, collection } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";

interface UserData {
  blockChain?: string;
  cryptoSymbol?: any;
  fiatCurrency?: string;
  method?: string;
  selectedUserId?: number;
  takerAddress?: string;
  txType?: string;
  uid?: number;
  value?: string;
  paymentMethods?:any;
  message?:string;
  terms?:string
}

export const CreateOrder = async (data: UserData) => {
  try {
    const time = new Date().toISOString(); 
    const userCollection = collection(db, 'createOrder');
    const userDocRef = await addDoc(userCollection, { time, ...data });
    console.log('Document written with ID: ', userDocRef.id);
    return userDocRef;
  } catch (error) {
    console.error('Error adding document: ', error);
    throw new Error('Error adding document');
  }
};
