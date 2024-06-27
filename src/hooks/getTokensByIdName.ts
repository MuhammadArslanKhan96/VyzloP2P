import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../utils/firebaseConfig';
export const GetToken = async (docId: string) => {
  try {
    const userCol = collection(db, 'tokenDetails');
    const q = query(userCol, where('__name__', '==', docId)); 
    const userCitySnapshot = await getDocs(q);
    const userList = userCitySnapshot.docs.map((doc) => doc.data());   
    console.log('list', userList);
    return { data: userList, loading: false, error: null }; 
  } catch (error) {
    console.error('Error fetching data:', error);
    return { data: [], loading: false, error: 'Error fetching data' };
  }
}