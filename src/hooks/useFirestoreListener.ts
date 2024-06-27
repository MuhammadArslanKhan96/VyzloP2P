import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../../utils/firebaseConfig"

export default function useFirestoreListener(collectionName: string, docId: string, callback: (data: any) => void) {
    const listener = () => {
        onSnapshot(doc(db, collectionName, docId), (doc) => {
            const newData = {...doc.data(), id: docId};

            callback(newData);
        })
    }


    return listener;
}