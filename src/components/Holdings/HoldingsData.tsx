import Image from 'next/image'
import React from 'react'
import Ethereum from "../../images/Ethereum.png"
import USDT from '../../images/USDT.png'

const HoldingsData = () => {
    return (
        <div className="mx-auto w-full xl:w-[56.5vw] h-full min-h-fit max-h-[50vw] overflow-auto selectscroll">
            <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">CryptoCurrencies</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Amount</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Balance (USD)</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    <tr className="bg-white">
                        <td className="px-6 py-4 text-sm text-gray-500">
                            <div className='relative'>
                                <div className='flex gap-2 items-center'>
                                    <Image src={Ethereum} alt='Ethereum' width={16} className='rounded-full absolute  right-[165px] -top-2 bg-white' />
                                    <Image src={USDT} alt='USDT' width={24} className='rounded-full' />
                                    <h1 className='font-bold text-black'>USDT</h1>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">0</td>
                        <td className="px-6 py-4 text-sm text-gray-500">0</td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                            <button disabled className='p-2 rounded bg-gray-300 text-gray-400'>Transfer</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default HoldingsData
