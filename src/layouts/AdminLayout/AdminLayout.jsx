import React from 'react'
import NavBar from './NavBar/NavBar'
import Footer from './Footer/Footer'
import SideBar from './SideBar/SideBar'
import LayoutContextProvider from '../../context/LayoutContext'

const AdminLayout = ({ children }) => {
    return (
        <LayoutContextProvider>
            <div className='flex bg-gray-50 '>
                <SideBar />
                <main className="flex flex-col w-full p-3 justify-between h-screen">
                    <NavBar />
                    <div className='h-screen overflow-y-auto my-3'>{children}</div>
                    <Footer />
                </main>
            </div>
        </LayoutContextProvider>
    )
}

export default AdminLayout
