import React, { useState } from 'react'
import TableHeader from './TableHeader';
import TableItem from './TableItem'

interface TableProps {
    tab: boolean;
    toggleTabBuy: () => void;
    toggleTabSell: () => void;
}

const Table: React.FC<TableProps> = ({ tab, toggleTabBuy, toggleTabSell }) => {
    const [selectedFiat, setSelectedFiat] = useState('');
    const [selectedCrypto, setSelectedCrypto] = useState('');
    const [selectedBlockchain, setSelectedBlockchain] = useState('');
    const [selectedCommunities, setSelectedCommunities] = useState('');
    return (
        <div className='bg-white mx-auto mt-4 mb-4 w-full max-w-[80vw] overflow-x-scroll rounded-lg'>
            <TableHeader tab={tab} toggleTabBuy={toggleTabBuy} toggleTabSell={toggleTabSell} setSelectedFiat={setSelectedFiat} setSelectedCrypto={setSelectedCrypto} setSelectedBlockchain={setSelectedBlockchain} setSelectedCommunities={setSelectedCommunities} />
            {/* Table */}
            <TableItem tab={tab} selectedFiat={selectedFiat} selectedCrypto={selectedCrypto} selectedBlockchain={selectedBlockchain} selectedCommunities={selectedCommunities} />
        </div>
    )
}

export default Table;