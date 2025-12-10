import React, { useState } from "react";
import { motion as m, AnimatePresence } from "framer-motion";
import {
  products,
  total,
  totalPrice,
  add1,
  add2,
  add3,
  add4,
  add5,
  add6,
  subtract1,
  subtract2,
  subtract3,
  subtract4,
  subtract5,
  subtract6,
  c1,
  c2,
  c3,
  c4,
  c5,
  c6,
  removeItem,
  purchase,
  addTotal,
  subtractTotal,
} from "../nanoStore.js";
import { useStore } from "@nanostores/react";
import { HiOutlineShoppingBag, HiMiniXMark } from "react-icons/hi2";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";

const Cart = ({ isCartOpen, setIsCartOpen }) => {
  const productItems = useStore(products);
  const $total = useStore(total);
  const $totalPrice = useStore(totalPrice);

  // Mapas de funciones
  const incrementMap = { add1, add2, add3, add4, add5, add6 };
  const decrementMap = {
    subtract1,
    subtract2,
    subtract3,
    subtract4,
    subtract5,
    subtract6,
  };
  const counterMap = {
    count1: c1,
    count2: c2,
    count3: c3,
    count4: c4,
    count5: c5,
    count6: c6,
  };

  // Sub-componente CartItem
  const CartItem = ({
    donut,
    keyNum,
    quantity,
    name,
    price,
    countId,
    addId,
  }) => {
    const [isRemoving, setIsRemoving] = useState(false);

    const handleIncrement = () => {
      incrementMap[addId]();
      const newQuantity = counterMap[countId].get().value;
      purchase(donut, keyNum, newQuantity, countId, addId, name, price);
      addTotal();
    };

    const handleDecrement = () => {
      if (quantity > 1) {
        decrementMap[countId.replace("count", "subtract")]();
        const newQuantity = counterMap[countId].get().value;
        purchase(donut, keyNum, newQuantity, countId, addId, name, price);
        subtractTotal();
      }
    };

    const handleRemove = () => {
      setIsRemoving(true);
      setTimeout(() => {
        removeItem(donut, countId);
      }, 200);
    };

    const subtotal = (quantity * price).toFixed(2);

    return (
      <m.div
        initial={{ opacity: 1, x: 0 }}
        animate={{
          opacity: isRemoving ? 0 : 1,
          x: isRemoving ? 100 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="flex gap-4 p-4 bg-white rounded-2xl shadowStory mb-3"
      >
        {/* Imagen del donut */}
        <div
          className={`w-24 h-24 ${donut} rounded-xl bg-gray-50 flex-shrink-0`}
        />

        {/* Detalles */}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-semibold text-[#313d47]">{name}</h4>
              <p className="text-sm text-[#878787]">${price.toFixed(2)}/pza</p>
            </div>
            <button
              onClick={handleRemove}
              className="text-red-500 hover:text-red-700 p-2 purchaseBtn"
            >
              <FaTrash className="text-sm" />
            </button>
          </div>

          {/* Controles de cantidad */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 bg-gray-100 rounded-full px-2 py-1">
              <button
                onClick={handleDecrement}
                disabled={quantity <= 1}
                className={`w-7 h-7 rounded-full flex items-center justify-center purchaseBtn ${
                  quantity <= 1
                    ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                    : "bg-white text-[#9959d0] hover:bg-[#9959d0] hover:text-white"
                }`}
              >
                <FaMinus className="text-xs" />
              </button>
              <span className="font-medium min-w-[20px] text-center">
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="w-7 h-7 rounded-full bg-white text-[#9959d0] hover:bg-[#9959d0] hover:text-white flex items-center justify-center purchaseBtn"
              >
                <FaPlus className="text-xs" />
              </button>
            </div>
            <span className="font-semibold text-[#313d47]">${subtotal}</span>
          </div>
        </div>
      </m.div>
    );
  };

  return (
    <div className="fixed right-0 top-0 h-screen bg-white sm:w-[500px] w-full z-50 flex flex-col shadow-2xl">
      {/* HEADER */}
      <div className="border-b border-gray-200 p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <HiOutlineShoppingBag className="text-2xl text-[#9959d0]" />
          <h2 className="text-xl font-semibold text-[#313d47]">
            Carrito de Compras
          </h2>
          {$total.value > 0 && (
            <div className="bg-[#E7FC55] px-3 py-1 rounded-full text-sm font-medium">
              {$total.value}
            </div>
          )}
        </div>
        <button
          onClick={() => setIsCartOpen(false)}
          className="text-2xl text-gray-500 hover:text-gray-700 transition-colors"
        >
          <HiMiniXMark />
        </button>
      </div>

      {/* CONTENIDO */}
      {$total.value === 0 ? (
        // Estado vacío
        <div className="flex flex-col items-center justify-center flex-1 text-center px-6">
          <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <HiOutlineShoppingBag className="text-6xl text-gray-300" />
          </div>
          <h3 className="text-xl font-semibold text-[#313d47] mb-2">
            Tu carrito está vacío
          </h3>
          <p className="text-[#878787] mb-6">
            ¡Agrega algunas donas deliciosas para comenzar!
          </p>
          <button
            onClick={() => setIsCartOpen(false)}
            className="bg-[#9959d0] text-white px-6 py-3 rounded-full font-medium purchaseBtn"
          >
            Explorar Donas
          </button>
        </div>
      ) : (
        <>
          {/* Lista de items */}
          <div className="flex-1 overflow-y-auto px-4 py-4 bg-[#f5f5f5]">
            <AnimatePresence mode="popLayout">
              {Object.values(productItems).map(
                ({ donut, keyNum, quantity, countId, addId, name, price }) =>
                  quantity > 0 && (
                    <CartItem
                      key={keyNum}
                      donut={donut}
                      keyNum={keyNum}
                      quantity={quantity}
                      name={name}
                      price={price}
                      countId={countId}
                      addId={addId}
                    />
                  )
              )}
            </AnimatePresence>
          </div>

          {/* FOOTER - Totales y Checkout */}
          <div className="border-t border-gray-200 p-4 bg-white">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-[#878787]">
                <span>Subtotal ({$total.value} artículos)</span>
                <span>${$totalPrice.value.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#878787]">
                <span>Impuesto (10%)</span>
                <span>${($totalPrice.value * 0.1).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold text-[#313d47] pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>${($totalPrice.value * 1.1).toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => {
                alert("¡Funcionalidad de pago próximamente!");
              }}
              className="w-full bg-[#9959d0] text-white py-4 rounded-full font-semibold text-lg purchaseBtn hover:bg-[#8848bf] transition-colors"
            >
              Finalizar Compra
            </button>
          </div>
        </>
      )}
    </div>
  );
};
export default Cart;
