import React from 'react'

const GlobalSettings = () => {
    return (
        <div className='pt-2'>
            <h1 className='font-bold border-t border-b pt-4 pb-4'>Global</h1>
            <div className='flex flex-col gap-6'>
                <div className="flex gap-44 pt-4">
                    <label htmlFor="Preferred Language" className='text-md text-gray-400'>Preferred Language</label>
                    <select className='cursor-pointer bg-[#d4ebfc] rounded p-1 w-32' name="Preferred Language">
                        <option value="" className='text-sm'>All</option>
                        <option value="EUR" className='text-sm'>English</option>
                        <option value="ARS" className='text-sm'>Spanish</option>
                    </select>
                </div>
            </div>
            <div className='flex gap-4 items-center justify-end'>
                <button className='border border-blue-300 hover:border-blue-500 text-blue-400 hover:text-blue-500 py-2 px-8 rounded transition-all duration-500'>Reset</button>
                <button className=' bg-blue-400 hover:bg-blue-500 text-white py-2 px-6 rounded transition-all duration-500'>Save Changes</button>
            </div>
        </div>
    )
}

export default GlobalSettings
