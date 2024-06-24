import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import db from "../../../utils/firebaseConfig";

interface TableItem {
    key: string;
    advertiser: string;
    value: string;
    fiat: string;
    payMethod: string;
    boundries: string;
    available: string;
    symbol: string;
    blockChain: string;
    type: number;
}

interface AppProps {
    selectedBlockchain: string;
    selectedCrypto: string;
    selectedFiat: string;
    selectedCommunities: string;
    tab: boolean;
}

const App: React.FC<AppProps> = ({ selectedBlockchain, selectedCrypto, selectedFiat, selectedCommunities, tab }) => {
    const [tableData, setTableData] = useState<TableItem[]>([]);
    const [filterType, setFilterType] = useState<string | null>(null); // 'buy', 'sell', or null

    useEffect(() => {
        async function fetchData() {
            const querySnapshot = await getDocs(collection(db, "P2POrder"));
            const data: TableItem[] = [];

            querySnapshot.forEach(doc => {
                data.push({ key: doc.id, ...doc.data() } as TableItem);
            });

            setTableData(data);
        }

        fetchData();
    }, []);

    const handleFilter = (type: any) => {
        setFilterType(type);
    };

    const filteredData = tableData ? tableData.filter(item => {
        return (
            item.symbol.toLowerCase().includes(selectedCrypto.toLowerCase()) &&
            item.fiat.toLowerCase().includes(selectedFiat.toLowerCase()) &&
            item.symbol.toLowerCase().includes(selectedCrypto.toLowerCase()) &&
            item.blockChain.toLowerCase().includes(selectedBlockchain.toLowerCase()) &&
            (filterType === null || item.type === (filterType === 'buy' ? 0 : 1))
        );
    }) : tableData;

    return (
        <>
            <div className="flex justify-center space-x-4 my-4">
                <button onClick={() => handleFilter(null)} className="text-sm px-4 py-2 rounded-md transition-all duration-300 text-white bg-blue-500 hover:bg-blue-300">All</button>
                <button onClick={() => handleFilter('buy')} className="text-sm px-4 py-2 rounded-md transition-all duration-300 text-white bg-green-500 hover:bg-green-300">Buy</button>
                <button onClick={() => handleFilter('sell')} className="text-sm px-4 py-2 rounded-md transition-all duration-300 text-white bg-red-500 hover:bg-red-300">Sell</button>
            </div>
            <div className="mx-auto w-full xl:w-[72vw] h-full min-h-fit max-h-[50vw] overflow-auto selectscroll">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Advertiser</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pay</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Boundaries</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredData.map(item => (
                            <tr key={item.key} className="bg-white">
                                <td className="px-6 py-4 text-sm text-gray-500">{item.advertiser}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{item.value} {item.fiat}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{item.payMethod}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{item.fiat} {item.boundries}</td>
                                <td className="px-6 py-4 text-sm text-gray-500 flex flex-col"><span className='font-semibold'>{item.available} {item.symbol}</span> {item.blockChain}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    <button className={`text-sm px-4 py-2 rounded-md w-24 transition-all duration-300 text-white ${item.type === 0 ? "bg-green-500 hover:bg-green-300" : "bg-red-500 hover:bg-red-300"}`}>{item.type === 0 ? "Buy" : "Sell"} {item.symbol}</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default App;
