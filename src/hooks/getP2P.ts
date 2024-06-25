import { collection, getDocs, query, where } from "firebase/firestore";
import db from "../../utils/firebaseConfig";

const getP2P = async (walletAddress:any) => {
  try {
    const p2pCollection = collection(db, 'P2POrder');
    let p2pQuery = query(p2pCollection);

    if (walletAddress) {
      p2pQuery = query(p2pCollection, where("wallet", "==", walletAddress));
    }

    const p2pGetDoc = await getDocs(p2pQuery);
    const filteredData = p2pGetDoc.docs.map((doc) => doc.data());
    if (filteredData.length > 0) {
        const advertiser = filteredData[0].advertiser;
        console.log("Advertiser:", advertiser);
        return advertiser;
      } else {
        console.log("No data found for the given wallet address.");
        return null;
      }
  } catch (error) {
    console.error('Error fetching data:', error);
    return { data: [], loading: false, error: 'Error fetching data' };
  }
};

export default getP2P;
