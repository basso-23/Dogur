import React, { useState } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { BsChevronDown } from "react-icons/bs";
import { Link } from "react-scroll";
import Menu from "./Menu";
import Cart from "./Cart";
import { total } from "../nanoStore.js";
import { useStore } from "@nanostores/react";
import { motion as m, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [scroll, setScroll] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const $total = useStore(total);

  const changeBackground = () => {
    if (window.scrollY >= 200) {
      setScroll(false);
    } else {
      setScroll(true);
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", changeBackground);
  }
  return (
    <div
      class={
        scroll
          ? "w-full h-[70px] flex font-medium fixed z-50 transition-all bg-[#eeefe9] shadow-xl"
          : "w-full h-[70px] flex font-medium fixed z-50 transition-all glass shadow-xl"
      }
    >
      <div class="m-auto flex max-w-[1800px] w-full relative">
        {/* LEFT CONTENT----------------------------------------------- */}
        <Link
          to="/"
          smooth={true}
          duration={700}
          class="my-auto text-[#313d47] text-[min(6vw,30px)] absolute left-0 fixedCenterY sm:pl-10 pl-3 font-bold tracking-tight cursor-pointer z-40"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          DOGUR
        </Link>
        <div class="xl:flex hidden">
          {/* MIDDLE CONTENT----------------------------------------------- */}
          <div class="flex text-[min(4.5vw,16.5px)] gap-20 text-[#151a1e] absolute fixedCenterXnY">
            <Link
              to="catalogue"
              smooth={true}
              duration={700}
              offset={-40}
              class="my-auto cursor-pointer menuHover px-3"
            >
              Catálogo
            </Link>
            <Link
              to="about"
              smooth={true}
              duration={700}
              offset={-150}
              class="my-auto cursor-pointer menuHover px-3"
            >
              Nosotros
            </Link>
            <Link
              to="testimonial"
              smooth={true}
              duration={700}
              offset={-135}
              class="my-auto cursor-pointer menuHover px-3"
            >
              Testimonios
            </Link>
          </div>

          {/* RIGHT CONTENT----------------------------------------------- */}
          <div class="flex text-[min(4.5vw,20px)] gap-[45px] absolute right-0 fixedCenterY sm:pr-10 pr-3">
            {/* BAG ICON----------------------------------------------- */}
            <div
              onClick={() => {
                setIsCartOpen(true);
              }}
              class="my-auto mr-2 text-[min(9vw,25px)] relative cursor-pointer purchaseBtn"
            >
              <HiOutlineShoppingBag />
              <div
                className={
                  $total.value === 0
                    ? "w-[15px] h-[15px] absolute rounded-full bg-[#d1d1d1] top-0 right-0 mr-[-12px] mt-[-5px] flex"
                    : "w-[15px] h-[15px] absolute rounded-full bg-lime-400 top-0 right-0 mr-[-12px] mt-[-5px] flex"
                }
              >
                <div className="m-auto text-[min(5vw,11px)]">
                  {$total.value}
                </div>
              </div>
            </div>
            {/* LOGIN BUTTON----------------------------------------------- */}
            <div class="text-[min(3.5vw,15px)] flex text-white purchaseBtn">
              <div class="bg-[#9959d0] py-2 px-7 rounded-full cursor-pointer">
                Iniciar Sesión
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MENU MOBILE CONTENT------------------------------------------------- */}
      <Menu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
      />

      {/* CART CONTENT------------------------------------------------- */}
      <AnimatePresence>
        {isCartOpen ? (
          <m.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1],
            }}
            exit={{ x: "100%", opacity: 0 }}
          >
            <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
          </m.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
export default Navbar;
