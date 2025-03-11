import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../utils/constants";
import { addList } from "../../utils/wishlistSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { GiShoppingBag } from "react-icons/gi";
import WishlistCard from "./WishlistCard";
import { removeProduct } from "../../utils/wishlistSlice";
import { toast } from "react-toastify";
import { removeFromWishlist } from "../../utils/userSlice";
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
    <div>
      <h1 className="text-xl md:text-2xl lg:text-3xl ml-8 p-5 font-medium font-[Outfit] ">
        Your Wishlist
      </h1>
      <div className="flex flex-wrap">
        {wishlist.length === 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center gap-5">
            <GiShoppingBag className="text-7xl text-blue-800" />
            <article className="flex flex-col items-center justify-center">
              <h3 className="text-2xl font-medium">Hey, It feels so light!</h3>
              <p className="text-light-gray text-xs">
                There is nothing in your wishlist
              </p>
            </article>
            <button className="text-white bg-blue-800 px-6 py-2 font-normal rounded">
              Add Products
            </button>
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
