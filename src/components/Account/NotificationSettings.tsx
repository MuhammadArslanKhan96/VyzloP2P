import React, { useState } from 'react'
import { IoMdNotificationsOutline } from "react-icons/io";
import Switcher4 from '../Switcher/Switcher';
import { InfoOutlined } from '@mui/icons-material';
import PrefencesSettings from './PrefencesSettings';

const NotificationSettings = () => {
    return (
        <div className='bg-white pt-6'>
            <div className='px-5 pt-4 pb-2 border border-gray-300 rounded-tl-md rounded-tr-md'>
                <h1 className='font-bold'>Notifications</h1>
            </div>
            <div className='pt-5 px-5 pb-4 border-r border-l border-b border-gray-300'>
                <div className='flex gap-24 items-start'>
                    <div>
                        <h1 className='flex items-center'><IoMdNotificationsOutline />Email notifications</h1>
                        <p className='text-[10px] text-red-600 font-bold pt-3'>To activate this option you must specify your email</p>
                    </div>
                    <div className='flex gap-2 text-[12px] text-blue-400 font-bold'>
                        <Switcher4 />
                        <p>Disabled</p>
                    </div>
                </div>
                <div className='flex gap-24 items-start pt-4'>
                    <div>
                        <h1 className='flex items-center'><IoMdNotificationsOutline />Telegram notifications</h1>
                        <p className='text-[10px] text-red-600 font-bold pt-3'>To activate this option you must specify your email</p>
                    </div>
                    <div className='flex gap-2 text-[12px] text-blue-400 font-bold'>
                        <Switcher4 />
                        <p>Disabled</p>
                    </div>
                </div>
                <div className='flex gap-[155px] items-start pt-6 pb-4'>
                    <div>
                        <h1 className='flex items-center'><IoMdNotificationsOutline />Newsletter by email <InfoOutlined /></h1>
                    </div>
                    <div className='flex gap-2 text-[12px] text-blue-400 font-bold'>
                        <Switcher4 />
                        <p>Disabled</p>
                    </div>
                </div>
                <PrefencesSettings />
            </div>
        </div>
    )
}

export default NotificationSettings
