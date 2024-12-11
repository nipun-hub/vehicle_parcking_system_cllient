import { Close } from "@mui/icons-material";
import React from "react";

export default function Drawer({ children, isOpen, setIsOpen }) {
  return (
    <main
      className={
        " fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out flex items-center" +
        (isOpen
          ? " transition-opacity opacity-100 duration-500 translate-x-0  "
          : " transition-all delay-500 opacity-0 translate-x-full")
      }
    >
      <section
        className={
          " w-screen max-w-sm sm:max-w-md md:max-w-lg right-0 absolute bg-white h-[95%] shadow-xl delay-400 duration-500 ease-in-out transition-all transform  rounded-xl me-6" +
          (isOpen ? " translate-x-0 " : " translate-x-full ")
        }
      >
        <article className="relative w-screen max-w-sm sm:max-w-md md:max-w-lg pb-10 flex flex-col space-y-6  h-full pt-3">
          <span className='absolute top-0 right-0 m-3 text-gray-500' onClick={() => setIsOpen(false)}><Close /></span>
          {children}
        </article>
      </section>
      <section
        className=" w-screen h-full cursor-pointer "
        onClick={() => {
          setIsOpen(false);
        }}
      ></section>
    </main>
  );
}
