import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../components/pages/home/Home";
import Shop from "../components/pages/shop/Shop";
import Login from "../components/sign-in/Login";
import SignUp from "../components/sign-up/SignUp";
import ProductDetails from "../components/pages/product-details/ProductDetails";
import Cart from "../components/pages/cart/Cart";
import PrivetRoute from "./PrivetRoute";
import Checkout from "../components/pages/checkout-page/Checkout";
import AddedItemCount from "../shared/added-item-count/AddedItemCount";
import MyOrder from "../components/pages/my-order/MyOrder";
import MyAccount from "../components/pages/my-account/MyAccount";
import MyList from "../components/pages/my-list/MyList";

const render = createBrowserRouter([
    {
        path: '/',
        element:<Main/>,
        children: [
            {
                path: '/',
                element:<Home/>
            },
            {
                path: '/shop',
                element: <Shop/>
            },
            {
                path:'/product/:id',
                loader: ({params}) => fetch(`https://e-market-hub-server.onrender.com/products/${params.id}`),
                element: <ProductDetails/>
            },
            {
                path: '/cart',
                element: <PrivetRoute> <Cart/></PrivetRoute>
            },
            {
                path: '/checkout',
                element: <AddedItemCount><PrivetRoute> <Checkout/></PrivetRoute></AddedItemCount>
            },
            {
                path: '/my-order',
                element: <PrivetRoute><MyOrder/></PrivetRoute>
            },
            {
                path: '/my-account',
                element: <PrivetRoute><MyAccount/></PrivetRoute>
            },
            {
                path: '/my-list',
                element: <PrivetRoute><MyList/></PrivetRoute>
            }
        ]
    },
    {
        path: '/sign-in',
        element: <Login/>
    },
    {
        path: '/sign-up',
        element: <SignUp/>
    }
]);

export default  render;