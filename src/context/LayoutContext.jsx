import { useEffect, useRef } from "react";
import { createContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router-dom";
import { AddHomeWorkRounded, ContentPasteRounded } from "@mui/icons-material";

export const LayoutContext = createContext(null);

const LayoutContextProvider = (props) => {

    let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
    const [open, setOpen] = useState(isTabletMid ? false : true);
    const sidebarRef = useRef();
    const { pathname } = useLocation();

    useEffect(() => {
        if (isTabletMid) {
            setOpen(false);
        } else {
            setOpen(true);
        }
    }, [isTabletMid]);

    useEffect(() => {
        isTabletMid && setOpen(false);
    }, [pathname]);

    const Nav_animation = isTabletMid
        ? {
            open: {
                x: 0,
                width: "16rem",
                Height: '100%',
                transition: {
                    damping: 40,
                },
            },
            closed: {
                x: -250,
                width: 0,
                transition: {
                    damping: 40,
                    delay: 0.15,
                },
            },
        }
        : {
            open: {
                width: "16rem",
                Height: '100%',
                transition: {
                    damping: 40,
                },
            },
            closed: {
                width: "4rem",
                transition: {
                    damping: 40,
                },
            },
        };

    const contextValue = {
        isTabletMid,
        open,
        setOpen,
        sidebarRef,
        pathname,
        Nav_animation,

    }

    return (
        <LayoutContext.Provider value={contextValue}>
            {props.children}
        </LayoutContext.Provider>
    )

}


export default LayoutContextProvider