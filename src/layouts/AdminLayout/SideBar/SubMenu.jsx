import { useState } from "react";
import { motion } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";
import { KeyboardArrowDown } from "@mui/icons-material";

const SubMenu = ({ data }) => {
  const { pathname } = useLocation();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  return (
    <>
      <li
        className={`link ${pathname.includes(data.identity) && "text-red-400"}`}
        onClick={() => setSubMenuOpen(!subMenuOpen)}
      >
        {data.icon}
        <p className="flex-1 capitalize">{data.name}</p>
        <KeyboardArrowDown
          className={` ${subMenuOpen && "rotate-180"} duration-200 `}
        />
      </li>
      <motion.ul
        animate={
          subMenuOpen
            ? {
              height: "fit-content",
            }
            : {
              height: 0,
            }
        }
        className="flex h-0 flex-col pl-14 text-[0.8rem] font-normal overflow-hidden"
      >
        {data?.children?.map((subMenu, index2) => (
          <li key={index2}>
            <NavLink
              to={subMenu.path}
              className={`link !bg-transparent capitalize ${pathname.includes(subMenu.path) && "text-red-400"}`}
            >
              {subMenu.name}
            </NavLink>
          </li>
        ))}
      </motion.ul>
    </>
  );
};

export default SubMenu;
