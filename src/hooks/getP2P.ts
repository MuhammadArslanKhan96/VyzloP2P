// import { collection, getDocs, query, where } from "firebase/firestore";
// import {db} from "../../utils/firebaseConfig";

// const getP2P = async (walletAddress:any) => {
//   try {
//     const p2pCollection = collection(db, 'P2POrder');
//     let p2pQuery = query(p2pCollection);

//     if (walletAddress) {
//       p2pQuery = query(p2pCollection, where("wallet", "==", walletAddress));
//     }

//     const p2pGetDoc = await getDocs(p2pQuery);
//     const filteredData = p2pGetDoc.docs.map((doc) => doc.data());
//     if (filteredData.length > 0) {
//         const advertiser = filteredData[0].advertiser;
//         console.log("Advertiser:", advertiser);
//         return advertiser;
//       } else {
//         console.log("No data found for the given wallet address.");
//         return null;
//       }
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return { data: [], loading: false, error: 'Error fetching data' };
//   }
// };

// export default getP2P;

// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../../utils/firebaseConfig";

// const getP2P = async (walletAddress: any) => {
//   try {
//     const p2pCollection = collection(db, 'P2POrder');
//     const p2pGetDoc = await getDocs(p2pCollection);
//     const filteredData = p2pGetDoc.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data()
//     }));

//     const filteredItem = filteredData.find(item => item.id === walletAddress);
//     console.log(filteredItem)
//      return filteredItem?.type
   
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return { data: [], loading: false, error: 'Error fetching data' };
//   }
// };

// export default getP2P;
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";

const getP2P = async (walletAddress: any, type: any) => {
  try {
    const p2pCollection = collection(db, "P2POrder");
    const p2pQuerySnapshot = await getDocs(p2pCollection);

    p2pQuerySnapshot.forEach(async (p2pDoc) => {
      if (p2pDoc.id === walletAddress) {
        const data = p2pDoc.data();
        if (data.type !== type) {
          // Update the document if type needs to be changed
          await updateDoc(doc(db, "P2POrder", p2pDoc.id), {
            type: type,
          });
          console.log("Document updated successfully");
        } else {
          console.log("Document type is already correct, no update needed");
        }
      }
    });

  } catch (error) {
    console.error("Error updating document:", error);
    return { data: [], loading: true, error: "Error updating document" };
  }
};

export default getP2P;

