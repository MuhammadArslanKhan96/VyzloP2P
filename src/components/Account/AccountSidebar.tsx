import React from 'react'
import MemberShipCard from '../../images/settingsMembershipCard.svg'

interface AccountSidebarProps {
    openAccMenu: boolean;
    toggleAccMenu: () => void;
}

const AccountSidebar: React.FC<AccountSidebarProps> = ({ openAccMenu, toggleAccMenu }) => {
    return (
        <div className={`transition-all duration-300 ease-in-out rounded-xl`}>
            <div className={`bg-white fixed z-20 transition-all duration-300 ease-in-out ${openAccMenu ? "w-[80vw] sm:w-[30vw] top-0 xl:top-[92px] xl:w-[22vw] right-0 h-full min-h-screen" : "h-0 top-0 lg:top-20 -right-40 w-0"} flex flex-col py-2 overflow-y-scroll selectscroll`}>
                <div className='px-5 text-sm'>
                    <div className='pb-4'>
                        <h1 className='font-bold'>0x3e...A188</h1>
                        <h1 className='text-red-600 font-semibold'>0 BNB Insufficient Balance</h1>
                    </div>
                    <hr />
                </div>
                <div>
                    <div className='px-8 py-8 flex flex-col gap-4 items-start'>
                        <h1 className='font-bold text-[18px]'>Subscription paydece</h1>
                        <p className='text-[15px]'>Subscribe to a plan and stop paying commissions.</p>
                        <button className='bg-amber-300 p-2 rounded-md font-bold'>Subscribe</button>
                    </div>
                    <hr />  
                </div>
            </div>
        </div>
    )
}

export default AccountSidebar
