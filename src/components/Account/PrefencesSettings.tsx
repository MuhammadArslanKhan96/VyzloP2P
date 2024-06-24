import React from 'react'
import GlobalSettings from './GlobalSettings'

const PrefencesSettings = () => {
    return (
        <div className='pt-2'>
            <h1 className='font-bold border-t border-b pt-4 pb-4'>Marketplace Prefrences</h1>
            <div className='flex flex-col gap-6'>
                <div className="flex gap-44 pt-4">
                    <label htmlFor="Preferred Fiat Currency" className='text-md text-gray-400'>Preferred Fiat Currency</label>
                    <select className='cursor-pointer bg-[#d4ebfc] rounded p-1 w-32' name="Preferred Fiat Currency">
                        <option value="" className='text-sm'>All</option>
                        <option value="EUR" className='text-sm'>EUR</option>
                        <option value="ARS" className='text-sm'>ARS</option>
                        <option value="COP" className='text-sm'>COP</option>
                        <option value="USD" className='text-sm'>USD</option>
                    </select>
                </div>
                <div className="flex gap-[154px]">
                    <label htmlFor="Preferred Crypto Currency" className='text-md text-gray-400'>Preferred Crypto Currency</label>
                    <select className='cursor-pointer bg-[#d4ebfc] rounded p-1 w-32' name="Preferred Crypto Currency">
                        <option value="" className='text-sm'>All</option>
                        <option value="USDT" className='text-sm'>USDT</option>
                        <option value="USDC" className='text-sm'>USDC</option>
                        <option value="DAI" className='text-sm'>DAI</option>
                    </select>
                </div>
                <div className="flex gap-[194px]">
                    <label htmlFor="Preferred Blockchain" className='text-md text-gray-400'>Preferred Blockchain</label>
                    <select className='cursor-pointer bg-[#d4ebfc] rounded p-1 w-32' name="Preferred Blockchain">
                        <option value="" className='text-sm'>All</option>
                        <option value="ZETA" className='text-sm'>ZETA</option>
                        <option value="BSC" className='text-sm'>BSC</option>
                        <option value="Polygon" className='text-sm'>Polygon</option>
                    </select>
                </div>
                <GlobalSettings />
            </div>
        </div>
    )
}

export default PrefencesSettings
