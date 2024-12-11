import { AccountCircle, HomeOutlined, LogoutOutlined, Menu, Notifications, Settings } from '@mui/icons-material'
import React, { useContext } from 'react'
import { LayoutContext } from "../../../context/LayoutContext";

const NavBar = () => {

    const { setOpen, open } = useContext(LayoutContext)

    return (
        <nav className="flex text-center justify-between py-2 px-3 bg-white shadow w-full rounded-s">
            <div className="mb-2 sm:mb-0 inner text-gray-500 ">

                <span className='md:hidden' onClick={() => setOpen(true)}><Menu /></span>
                <span className='hidden md:inline-block me-2' onClick={() => setOpen(!open)}><LogoutOutlined sx={{ fontSize: 17 }} className={`duration-500 ${open ? 'scale-x-[-1]' : 'scale-x-[1]'}`} /></span>
                <span className="text-xs text-grey-dark hidden md:inline "><HomeOutlined sx={{ fontSize: 20 }} /> / Dashboard</span>

            </div>

            <div className="flex gap-3 text-gray-500">
                <span><Settings sx={{ fontSize: 17 }} /></span>
                <span><Notifications sx={{ fontSize: 17 }} /></span>
                <span><AccountCircle sx={{ fontSize: 30 }} /></span>
            </div>
        </nav>
    )
}

export default NavBar
