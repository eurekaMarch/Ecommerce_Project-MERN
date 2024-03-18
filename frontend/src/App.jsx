import { useState, useEffect } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Home from "./components/HomePage/Home";
import Nav from "./components/Nav/Nav";
import Register from "./components/LoginPage/Register";
import Login from "./components/LoginPage/Login";
import SingleProduct from "./components/SingleProductPage/SingleProduct";
import Cart from "./components/CartPage/Cart";
import Order from "./components/OrderPage/Order";
import Shipping from "./components/ShippingPage/Shipping";
import CartAction from "./Utils/CartAction";
import PlaceOrder from "./components/PlaceOrderPage/PlaceOrder";
import Profile from "./components/ProfilePage/Profile";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Utils/theme";
import { mongoDBApi } from "../src/Utils/axios";
import useToken from "./Utils/Token";

const initial = {
  data: [],
  loading: false,
  error: null,
};

function App() {
  const [state, setState] = useState(initial);
  const [products, setProducts] = useState([]);
  const [pageAction, setPageAction] = useState(false);

  const { token } = useToken();

  const {
    addToCart,
    removeFromCart,
    cartProduct,
    increaseQty,
    decreaseQty,
    shippingAddress,
    shipping,
    clearcartItems,
  } = CartAction();

  const fetchProduct = async () => {
    setState((prev) => ({
      ...prev,
      loading: true,
    }));
    let products;
    let fetchError;

    try {
      const productResponse = await mongoDBApi.get("products");

      products = await productResponse?.data;
    } catch (error) {
      fetchError = error;
    }

    setState((prev) => ({
      ...prev,
      data: products,
      loading: false,
      error: fetchError,
    }));

    setProducts(products);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <Nav
            data={state.data}
            setProducts={setProducts}
            cartProduct={cartProduct}
          />
        }
      >
        <Route
          index
          element={<Home products={products} loading={state.loading} />}
        />
        <Route
          path="/register"
          element={!token ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={
            !token ? <Login pageAction={pageAction} /> : <Navigate to="/" />
          }
        />
        <Route
          path="/profile"
          element={token ? <Profile /> : <Navigate to="/" />}
        />
        <Route
          path="/products"
          element={<SingleProduct addToCart={addToCart} />}
        />
        <Route
          path="/cart"
          element={
            <Cart
              cartProduct={cartProduct}
              removeFromCart={removeFromCart}
              increaseQty={increaseQty}
              decreaseQty={decreaseQty}
              setPageAction={setPageAction}
            />
          }
        />
        <Route
          path="/shipping"
          element={
            <Shipping shippingAddress={shippingAddress} shipping={shipping} />
          }
        />
        <Route
          path="/placeorder"
          element={
            token ? (
              <PlaceOrder
                shipping={shipping}
                cartProduct={cartProduct}
                clearcartItems={clearcartItems}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/order"
          element={token ? <Order /> : <Navigate to="/" />}
        />
      </Route>
    )
  );
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
