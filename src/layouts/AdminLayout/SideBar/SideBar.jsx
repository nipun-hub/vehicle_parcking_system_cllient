import React, { useContext } from "react";
import { motion } from "framer-motion";
import SubMenu from './SubMenu'
import './SideBar.css'

import { NavLink } from "react-router-dom";
import { LayoutContext } from "../../../context/LayoutContext";
import { SideBarList } from "./SideBarList";
import Logo from '../../../assets/web/images/logo/logo.png'

const SideBar = () => {

    const { isTabletMid, open, setOpen, sidebarRef, pathname, Nav_animation, subMenusList } = useContext(LayoutContext)

    return (
        <div className="SideBar">
            <div
                onClick={() => setOpen(false)}
                className={`md:hidden fixed inset-0 max-h-screen h-screen z-[998] bg-black/50 ${open ? "block" : "hidden"
                    } `}
            ></div>
            <motion.div
                ref={sidebarRef}
                variants={Nav_animation}
                initial={{ x: isTabletMid ? -250 : 0 }}
                animate={open ? "open" : "closed"}
                className=" bg-white text-gray shadow-xl z-[999] max-w-[16rem]  w-[16rem] overflow-hidden md:relative fixed h-screen "
            >
                <div className="grid w-full items-center font-medium border-b py-3 border-slate-300  ">
                    <img
                        src={Logo}
                        width={45}
                        alt=""
                        className="justify-self-center"
                    />
                </div>

                <div className="flex flex-col h-full ">
                    <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1  font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100   md:h-[68%] h-[70%] text-gray-700">
                        {
                            SideBarList.map((item, index) => (
                                item.children
                                    ?
                                    <SubMenu key={index} data={item} />
                                    :
                                    <li key={index}>
                                        <NavLink to={item.path} className={`link ${pathname == item.path && "text-blue-400"}`}>
                                            {item.icon}
                                            {item.name}
                                        </NavLink>
                                    </li>
                            ))
                        }
                    </ul>
                </div>
            </motion.div>
        </div>
    );
};

export default SideBar;
