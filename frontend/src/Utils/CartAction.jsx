import { useState } from "react";

function CartAction() {
  const cartItems = JSON.parse(window.localStorage.getItem("cartItems")) || [];
  const shippingAdd =
    JSON.parse(window.localStorage.getItem("shippingAddress")) || "";

  const [cartProduct, setCartProduct] = useState(cartItems);
  const [shipping, setShipping] = useState(shippingAdd);

  const addToCart = (product, amountItem) => {
    const productExit = cartProduct.find((item) => item._id === product._id);

    if (productExit) {
      // setCartProduct(
      //   cartProduct.map((item) => {
      //     return item.id === product.id
      //       ? { ...productExit, qty: amountItem }
      //       : item;
      //   })
      // );

      const newCartItems = cartItems.map((item) => {
        return item._id === product._id
          ? { ...productExit, qty: amountItem }
          : item;
      });

      window.localStorage.setItem("cartItems", JSON.stringify(newCartItems));
      setCartProduct(newCartItems);
    } else {
      // setCartProduct([...cartProduct, { ...product, qty: amountItem }]);

      cartItems.push({ ...product, qty: amountItem });
      window.localStorage.setItem("cartItems", JSON.stringify(cartItems));
      setCartProduct(cartItems);
    }
  };

  const removeFromCart = (product) => {
    // const newProduct = cartProduct.filter(
    //   (addedProduct) => addedProduct.id !== product.id
    // );
    // setCartProduct(newProduct);

    const newCartItems = cartItems.filter(
      (addedProduct) => addedProduct._id !== product._id
    );

    window.localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    setCartProduct(newCartItems);

    if (cartProduct.length === 1) {
      window.localStorage.removeItem("cartItems");
    }
  };

  const increaseQty = (product) => {
    const productExit = cartProduct.find((item) => item._id === product._id);

    if (productExit) {
      // setCartProduct(
      //   cartProduct.map((item) =>
      //     item.id === product.id
      //       ? { ...productExit, qty: productExit.qty + 1 }
      //       : item
      //   )
      // );

      const newCartItems = cartItems.map((item) => {
        return item._id === product._id
          ? { ...productExit, qty: productExit.qty + 1 }
          : item;
      });

      window.localStorage.setItem("cartItems", JSON.stringify(newCartItems));
      setCartProduct(newCartItems);
    }
  };

  const decreaseQty = (product) => {
    const productExit = cartProduct.find((item) => item._id === product._id);

    // setCartProduct(
    //   cartProduct.map((item) =>
    //     item.id === product.id
    //       ? { ...productExit, qty: Math.max(productExit.qty - 1, 1) }
    //       : item
    //   )
    // );

    const newCartItems = cartItems.map((item) => {
      return item._id === product._id
        ? { ...productExit, qty: Math.max(productExit.qty - 1, 1) }
        : item;
    });

    window.localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    setCartProduct(newCartItems);
  };

  const shippingAddress = (data) => {
    window.localStorage.setItem("shippingAddress", JSON.stringify(data));
    setShipping(shippingAdd);
  };

  const clearcartItems = () => {
    window.localStorage.removeItem("cartItems");
    setCartProduct([]);
  };

  return {
    addToCart,
    removeFromCart,
    cartProduct,
    increaseQty,
    decreaseQty,
    shippingAddress,
    shipping,
    clearcartItems,
  };
}

export default CartAction;
