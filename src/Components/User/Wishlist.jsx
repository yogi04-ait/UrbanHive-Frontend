import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addList } from "../../utils/wishlistSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { GiShoppingBag } from "react-icons/gi";
import WishlistCard from "./WishlistCard";
import { removeProduct } from "../../utils/wishlistSlice";
import { toast } from "react-toastify";
import { removeFromWishlist } from "../../utils/userSlice";
import { NavLink } from "react-router";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Wishlist = () => {
  const wishlist = useSelector((store) => store.wishlist);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getWishlist = async () => {
    if (wishlist && wishlist.length > 0) return;
    try {
      const res = await axios.get(BASE_URL + "/wishlist", {
        withCredentials: true,
      });

      if (res.status === 200) {
        dispatch(addList(res?.data?.data));
      }
    } catch (error) {
      navigate("/login");
      console.log(error);
    }
  };

  const updateWishlist = async (id) => {
    try {
      const res = await axios.delete(BASE_URL + "/wishlist/" + id, {
        withCredentials: true,
      });
      if (res.status === 200) {
        toast.info("Product removed");
        dispatch(removeProduct(id));
        dispatch(removeFromWishlist(id));
      }
    } catch (error) {}
  };

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <div className="lg:mx-40 mx-10 sm:mx-16 md:mx-32 ">
      <div className="text-2xl mb-3">
        <div className="inline-flex gap-2 items-center mb-3">
          <p className="text-gray-500">
            YOUR
            <span className="text-gray-700 font-medium"> WISHLIST</span>
          </p>
          <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
        </div>
      </div>
      <div className="flex flex-wrap">
        {wishlist.length === 0 ? (
          <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-5 ">
            <GiShoppingBag className="text-7xl text-black" />
            <article className="flex flex-col items-center justify-center">
              <h3 className="text-2xl font-medium">Hey, It feels so light!</h3>
              <p className="text-light-gray text-xs mt-2">
                There is nothing in your wishlist
              </p>
            </article>
            <NavLink to="/feed">
              <button className="text-white bg-black px-6 py-2 cursor-pointer font-normal rounded">
                Add Products
              </button>
            </NavLink>
          </div>
        ) : (
          <div className="flex flex-wrap gap-10 items-center w-full h-full mx-10">
            {wishlist?.map((item) => {
              return (
                <WishlistCard
                  key={item?.id}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  image={item.image.imageUrls}
                  updateWishlist={updateWishlist}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
