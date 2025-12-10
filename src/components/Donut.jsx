import React, { useState, useEffect } from "react";
import { TOTAL_PRODUCTS } from "../Index/Index_donuts.js";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useStore } from "@nanostores/react";
import {
  purchase,
  products,
  add1,
  c1,
  add2,
  c2,
  add3,
  c3,
  add4,
  c4,
  add5,
  c5,
  add6,
  c6,
  addTotal,
  calculateTotalPrice,
} from "../nanoStore.js";

const Donut = ({ name, price, buy, new_, image }) => {
  const productItems = useStore(products);
  const count1 = useStore(c1);
  const count2 = useStore(c2);
  const count3 = useStore(c3);
  const count4 = useStore(c4);
  const count5 = useStore(c5);
  const count6 = useStore(c6);

  const parsePrice = (priceStr) => {
    return parseFloat(priceStr.replace("$", "").split("/")[0]);
  };
  const numericPrice = parsePrice(price);

  return (
    <div class="w-full sm:w-[min(90vw,350px)] h-[min(100vw,400px)] bg-[#f5f5f5] rounded-2xl mx-auto p-3 relative shadowStory">
      {/* MAIN CONTAINER----------------------------------------------- */}
      <div class="w-full h-[75%] bg-white rounded-2xl relative">
        {/* IMAGE CONTAINER----------------------------------------------- */}
        <div class="w-full h-full p-4 absolute">
          <div class={`w-full h-full donut1 ${image}`}></div>
        </div>

        {/* NEW CONTAINER----------------------------------------------- */}
        <div class={`top-0 left-0 ${new_} p-[10px] flex`}>
          <div class="py-1 px-4 bg-[#E7FC55] rounded-full font-medium text-[min(3.5vw,15px)]">
            New
          </div>
        </div>
      </div>
      {/* DESCRIPTION CONTAINER----------------------------------------------- */}
      <div class="flex flex-col bottom-0 absolute mb-[15px] left-0 ml-4">
        <div class="text-[min(4.5vw,17px)] text-[#878787]">{name}</div>
        <div class="text-[min(6.5vw,25px)] font-medium">{price}</div>
      </div>
      {/* BUY BUTTON----------------------------------------------- */}
      {Object.values(productItems).map(
        ({ donut, keyNum, quantity, countId, addId }) => (
          <div key={keyNum}>
            {keyNum === buy ? (
              <div className="flex flex-col">
                <div
                  onClick={() => {
                    addTotal();
                    eval(addId)();
                    purchase(
                      donut,
                      keyNum,
                      eval(countId).value,
                      countId,
                      addId,
                      name,
                      numericPrice
                    );
                  }}
                  class="flex absolute bottom-0 right-0 mr-4 mb-[30px] purchaseBtn"
                >
                  <div class="w-[min(11vw,43px)] h-[min(11vw,43px)] text-[min(5vw,19px)] bg-[#9959d0] rounded-full flex text-white cursor-pointer">
                    <div class="m-auto">
                      <HiOutlineShoppingBag class="m-auto" />
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )
      )}
    </div>
  );
};
export default Donut;
