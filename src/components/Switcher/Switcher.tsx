import React, { useState } from 'react'

const Switcher4 = () => {
    const [isChecked, setIsChecked] = useState(false)

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked)
    }

    return (
        <>
            <label className='flex cursor-pointer select-none items-center'>
                <div className='relative'>
                    <input
                        type='checkbox'
                        checked={isChecked}
                        onClick={handleCheckboxChange}
                        className='sr-only'
                    />
                    <div
                        className={`box block h-4 w-9 rounded-full ${isChecked ? 'bg-blue-500' : 'bg-gray-300'
                            }`}
                    ></div>
                    <div
                        className={`absolute left-1 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-white transition ${isChecked ? 'translate-x-full' : '-left-0'
                            }`}
                    ></div>
                </div>
            </label>
        </>
    )
}

export default Switcher4