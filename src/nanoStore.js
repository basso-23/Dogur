import { atom } from "nanostores";
import { map } from "nanostores";

const products = map({
  donut1: {
    donut: "donut1",
    keyNum: "buyNum1",
    quantity: 0,
    countId: "count1",
    addId: "add1",
    name: "Snow Donut",
    price: 1.5,
  },
  donut2: {
    donut: "donut2",
    keyNum: "buyNum2",
    quantity: 0,
    countId: "count2",
    addId: "add2",
    name: "Strawberry Whimsie",
    price: 1.2,
  },
  donut3: {
    donut: "donut3",
    keyNum: "buyNum3",
    quantity: 0,
    countId: "count3",
    addId: "add3",
    name: "Caramaelow",
    price: 1.5,
  },
  donut4: {
    donut: "donut4",
    keyNum: "buyNum4",
    quantity: 0,
    countId: "count4",
    addId: "add4",
    name: "Taro Preketek",
    price: 1.5,
  },
  donut5: {
    donut: "donut5",
    keyNum: "buyNum5",
    quantity: 0,
    countId: "count5",
    addId: "add5",
    name: "Chocoreng",
    price: 1.5,
  },
  donut6: {
    donut: "donut6",
    keyNum: "buyNum6",
    quantity: 0,
    countId: "count6",
    addId: "add6",
    name: "Bulan Purnama",
    price: 2.0,
  },
});

const purchase = (donut, keyNum, quantity, countId, addId, name, price) =>
  products.setKey(donut, { donut, keyNum, quantity, countId, addId, name, price });

const initialValue = { value: 1 };
const totalValue = { value: 0 };

const c1 = atom(initialValue);

const add1 = () => c1.set({ value: c1.get().value + 1 });

const c2 = atom(initialValue);

const add2 = () => c2.set({ value: c2.get().value + 1 });

const c3 = atom(initialValue);

const add3 = () => c3.set({ value: c3.get().value + 1 });

const c4 = atom(initialValue);

const add4 = () => c4.set({ value: c4.get().value + 1 });

const c5 = atom(initialValue);

const add5 = () => c5.set({ value: c5.get().value + 1 });

const c6 = atom(initialValue);

const add6 = () => c6.set({ value: c6.get().value + 1 });

const subtract1 = () => {
  const current = c1.get().value;
  if (current > 1) {
    c1.set({ value: current - 1 });
  }
};

const subtract2 = () => {
  const current = c2.get().value;
  if (current > 1) {
    c2.set({ value: current - 1 });
  }
};

const subtract3 = () => {
  const current = c3.get().value;
  if (current > 1) {
    c3.set({ value: current - 1 });
  }
};

const subtract4 = () => {
  const current = c4.get().value;
  if (current > 1) {
    c4.set({ value: current - 1 });
  }
};

const subtract5 = () => {
  const current = c5.get().value;
  if (current > 1) {
    c5.set({ value: current - 1 });
  }
};

const subtract6 = () => {
  const current = c6.get().value;
  if (current > 1) {
    c6.set({ value: current - 1 });
  }
};

const total = atom(totalValue);

const addTotal = () => {
  total.set({ value: total.get().value + 1 });
  calculateTotalPrice();
};

const subtractTotal = () => {
  const current = total.get().value;
  if (current > 0) {
    total.set({ value: current - 1 });
    calculateTotalPrice();
  }
};

const totalPrice = atom({ value: 0 });

const calculateTotalPrice = () => {
  const productItems = products.get();
  let sum = 0;
  Object.values(productItems).forEach(({ quantity, price }) => {
    sum += quantity * price;
  });
  totalPrice.set({ value: sum });
};

const removeItem = (donut, countId) => {
  const product = products.get()[donut];
  if (product && product.quantity > 0) {
    const currentTotal = total.get().value - product.quantity;
    total.set({ value: currentTotal >= 0 ? currentTotal : 0 });

    // Reset counter a 1
    const counterMap = {
      count1: c1,
      count2: c2,
      count3: c3,
      count4: c4,
      count5: c5,
      count6: c6,
    };
    counterMap[countId].set({ value: 1 });

    // Set quantity a 0
    products.setKey(donut, { ...product, quantity: 0 });

    calculateTotalPrice();
  }
};

export {
  products,
  purchase,
  add1,
  c1,
  subtract1,
  add2,
  c2,
  subtract2,
  add3,
  c3,
  subtract3,
  add4,
  c4,
  subtract4,
  add5,
  c5,
  subtract5,
  add6,
  c6,
  subtract6,
  total,
  addTotal,
  subtractTotal,
  totalPrice,
  calculateTotalPrice,
  removeItem,
};
