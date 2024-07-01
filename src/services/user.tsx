import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
import { AnyAaaaRecord } from "dns";


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


export const addUserIfNotExists = async (userData: any) => {
    const { address } = userData; // Assuming email is used as a unique identifier

    try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('address', '==', address));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            return console.log('User already exists:', querySnapshot.docs[0].id);
        }

        const docRef = await addDoc(collection(db, 'users'), userData);
        console.log('User added with ID:', docRef.id);

    } catch (error: any) {
        console.error('Error adding user:', error.message);
    }
};