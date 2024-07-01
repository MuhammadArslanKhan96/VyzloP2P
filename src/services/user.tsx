import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";


export const fetchUserByWalletAddress = async (walletAddress: string) => {
    console.log(walletAddress, "fetchUserByWalletAddress")
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("address", "==", walletAddress));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        return { id: userDoc.id, ...userData };
    }
    console.log("No matching documents.");
    return null;
}