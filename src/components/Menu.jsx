import React, { useState } from "react";
import { Link } from "react-scroll";
import { Turn as Hamburger } from "hamburger-react";
import { motion as m, AnimatePresence } from "framer-motion";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { BsChevronDown } from "react-icons/bs";
import { total } from "../nanoStore.js";
import { useStore } from "@nanostores/react";

const Menu = ({ isOpen, setIsOpen, isCartOpen, setIsCartOpen }) => {
  const $total = useStore(total);
  return (
    <>
      {/* MENU ICON-------------------------------------------------------------------------------------------------------- */}
      <div className=" absolute right-0 fixedCenterY mr-3 xl:hidden flex z-40">
        <Hamburger toggled={isOpen} toggle={setIsOpen} size={25} />
      </div>
      {/* BAG ICON----------------------------------------------- */}
      <div
        onClick={() => {
          setIsCartOpen(true);
          setIsOpen(false);
        }}
        class="absolute right-0 fixedCenterY mt-[-1px] mr-[100px] text-[min(9vw,25px)] cursor-pointer z-40 xl:hidden flex"
      >
        <HiOutlineShoppingBag />
        <div className="w-[15px] h-[15px] absolute rounded-full bg-lime-400 top-0 right-0 mr-[-12px] mt-[-5px] flex">
          <div className="m-auto text-[min(5vw,11px)]">{$total.value}</div>
        </div>
      </div>

      {/* MENU MOBILE CONTENT-------------------------------------------------------------------------------------------------------- */}
      <AnimatePresence>
        {isOpen ? (
          <m.div
            initial={{ x: "-100vw", opacity: 1 }}
            animate={{ x: "0", opacity: 1 }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
              delay: 0,
            }}
            exit={{ x: "100vw", opacity: 1 }}
            className="absolute bg-[#eeefe9] shadow-xl w-full xl:hidden flex mt-[70px]"
          >
            <div class="flex flex-col text-[min(5vw,16.5px)] text-[#151a1e] pb-10 w-full gap-10 border-t-2 border-[#d3d4cf] ">
              <Link
                to="catalogue"
                smooth={true}
                duration={700}
                offset={-40}
                class="m-auto cursor-pointer menuHover px-3 mt-10"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Catálogo
              </Link>
              <Link
                to="about"
                smooth={true}
                duration={700}
                offset={-150}
                class="m-auto cursor-pointer menuHover px-3"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Nosotros
              </Link>
              <Link
                to="testimonial"
                smooth={true}
                duration={700}
                offset={-135}
                class="m-auto cursor-pointer menuHover px-3"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Testimonios
              </Link>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};
export default Menu;
