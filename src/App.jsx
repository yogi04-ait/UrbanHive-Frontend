import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
const Homepage = lazy(() => import("./Pages/Homepage"));
const Sellerpage = lazy(() => import("./Pages/Sellerpage"));
const Home = lazy(() => import("./Components/User/Home"));
const Feed = lazy(() => import("./Components/User/Feed"));
const UserLogin = lazy(() => import("./Components/User/UserLogin"));
const UserProfile = lazy(() => import("./Components/User/UserProfile"));
const Wishlist = lazy(() => import("./Components/User/Wishlist"));
const SellerLogin = lazy(() => import("./Components/Seller/SellerLogin"));
const ProductList = lazy(() => import("./Components/Seller/ProductList"));
const AddItem = lazy(() => import("./Components/Seller/AddItem"));
const Orders = lazy(() => import("./Components/Seller/Orders"));
const UpdateProduct = lazy(() => import("./Components/Seller/UpdateProduct"));
const Profile = lazy(() => import("./Components/Seller/Profile"));

const App = () => {
  return (
    <Provider store={appStore}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Homepage />}>
              <Route index element={<Home />} />
              <Route path="feed" element={<Feed />} />
              <Route path="login" element={<UserLogin />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="wishlist" element={<Wishlist />} />
            </Route>

            <Route path="/seller/login" element={<SellerLogin />} />
            <Route path="/seller" element={<Sellerpage />}>
              <Route path="products" element={<ProductList />} />
              <Route path="add" element={<AddItem />} />
              <Route path="orders" element={<Orders />} />
              <Route path="update/:id" element={<UpdateProduct />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  );
};

export default App;
