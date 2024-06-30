
import { collection, getDocs, updateDoc, doc, getDoc, query, where, DocumentData, addDoc } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";

export const getP2P = async (walletAddress: any, type: any) => {
  try {
    const p2pCollection = collection(db, "P2POrder");
    const p2pQuerySnapshot = await getDocs(p2pCollection);

    p2pQuerySnapshot.forEach(async (p2pDoc) => {
      if (p2pDoc.id === walletAddress) {
        const data = p2pDoc.data();
        if (data.type !== type) {
          await updateDoc(doc(db, "P2POrder", p2pDoc.id), {
            type: type,
          });
          return data
        } else {
        }
      }
    });

  } catch (error) {
    console.error("Error updating document:", error);
    return { data: [], loading: true, error: "Error updating document" };
  }
};


export const getWallet = async (docId: string) => {
  try {
    const p2pCollection = collection(db, "P2POrder");
    const p2pDoc = doc(p2pCollection, docId);
    const p2pDocSnapshot = await getDoc(p2pDoc);

    if (p2pDocSnapshot.exists()) {
      return { data: p2pDocSnapshot.data(), loading: false, error: null };
    } else {
      return { data: null, loading: false, error: "No such document!" };
    }
  } catch (error) {
    // console.error("Error getting document:", error);
    return { data: null, loading: false, error: "Error getting document" };
  }
};
export const getWalletMessage = async (makerWallet: string) => {
  try {
    const p2pCollection = collection(db, "P2POrder");
    const p2pQuerySnapshot = await getDocs(p2pCollection);

    for (const doc of p2pQuerySnapshot.docs) {
      const messagesCollection = collection(db, "P2POrder", doc.id, "messages");
      const messagesQuery = query(messagesCollection, where("makerSender", "==", makerWallet));
      const messagesSnapshot = await getDocs(messagesQuery);
      if (!messagesSnapshot.empty) {
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error("Error checking wallet address in messages:", error);
    return false;
  }
};



const walletP2P = async (docId: any, walletAddress: any) => {
  try {
    const p2pDocRef = doc(db, 'P2POrder', docId);
    const docSnapshot = await getDoc(p2pDocRef);
    if (docSnapshot.exists()) {
      const data = docSnapshot.data() as DocumentData;
      if (data.wallet.toLowerCase() === walletAddress && data.type === 1) {
        return true;
      } else {
        return false;
      }
    } else {
      return null; // Return null if the document does not exist
    }
  } catch (error) {
    console.error('Error fetching document:', error);
    return null;
  }
};
export default walletP2P;



interface UserData {
  cryptoSymbol: string;
  currentTime: any;
  fiatCurrency: string;
  makerPremium: number;
  orderId: string;
  pricePerToken: string;
  sellerAddress: string;
  status: string;
  takerAddress: string;
  takerPremium: string;
  type: string;
  uid: number;
  value: string
}

export const Transactions = async (data: UserData) => {
  try {
    const userCollection = collection(db, 'Transactions');
    const userDocRef = await addDoc(userCollection, data);
    return userDocRef;
  } catch (error) {
    console.error('Error adding document: ', error);
    throw new Error('Error adding document');
  }
};

interface Object {
  [key: string]: any
}

export const UpdateP2POrder = async (docID: any, order: Object) => {
  try {
    await updateDoc(doc(db, "P2POrder", docID), {
      ...order
    });
  } catch (error) {
    console.error('Error updating document: ', error);
    throw new Error('Error updating document');
  }
};