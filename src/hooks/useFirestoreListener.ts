import { collection, doc, onSnapshot } from "firebase/firestore"
import { db } from "../../utils/firebaseConfig"

export default function useFirestoreListener(collectionName: string, callback: (data: any | any[]) => void, docId?: string) {
    const listener = () => {
        if (docId) {
            onSnapshot(doc(db, collectionName, docId), (doc) => {
                const newData = { ...doc.data(), id: docId, key: docId };

                callback(newData);
            })
        } else {
            onSnapshot(collection(db, collectionName), (docs) => {
                const newData = docs.docs.map(doc => ({ ...doc.data(), id: doc.id, key: doc.id }));

                callback(newData);
            })
        }
    }


    return listener;
}