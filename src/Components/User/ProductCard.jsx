import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { toast } from "react-toastify";
import axios from "axios";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { addToWishlist, removeFromWishlist } from "../../utils/userSlice";
const BASE_URL = import.meta.env.VITE_BASE_URL;


const ProductCard = ({ id, name, price, image }) => {
  const [color, setColor] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const wishlist = user?.wishlist || [];

  useEffect(() => {
    const isFav = wishlist.includes(id);
    setColor(isFav);
  }, []);

  const handleFav = async (e) => {
    try {
      let res;
      if (color) {
        res = await axios.delete(`${BASE_URL}/wishlist/${id}`, {
          withCredentials: true,
        });

        if (res.status === 200) {
          dispatch(removeFromWishlist(id));
          setColor(false);
          toast.info("Product removed from wishlist");
        } else {
          toast.error("Failed to remove product");
          throw new Error("Failed to remove");
        }
      } else {
        res = await axios.post(
          `${BASE_URL}/wishlist/${id}`,
          {},
          { withCredentials: true }
        );

        if (res.status === 200) {
          dispatch(addToWishlist(id));
          setColor(true);
          toast.success("Product added to wishlist");
        } else {
          toast.error("Failed to Add");
          throw new Error("Failed to add product to wishlist");
        }
      }
    } catch (error) {
      toast.error(`Error: ${error.message || "Something went wrong"}`);
    }
  };

  return (
    <>
      <section className="w-[282px] h-[440px] flex flex-col items-start justify-start gap-2 rounded cursor-pointer">
        <div className="w-full h-[370px] relative overflow-hidden rounded">
          <section className="w-[282px] h-[370px] object-cover object-center rounded overflow-hidden hover:scale-110 transition-all duration-300 ease-in-out">
            <NavLink to={`/product/${id}`}>
              <LazyLoadImage
                alt={name}
                effect="blur"
                src={image}
                className="w-full h-full object-cover object-center rounded"
              />
            </NavLink>
          </section>
          <section className="absolute top-5 right-5 bg-white rounded-full p-1">
            {color ? (
              <MdOutlineFavorite
                className="text-red-500 cursor-pointer"
                onClick={() => (user ? handleFav() : navigate("/login"))}
              />
            ) : (
              <MdOutlineFavoriteBorder
                className="text-black-100 cursor-pointer"
                onClick={() => (user ? handleFav() : navigate("/login"))}
              />
            )}
          </section>
        </div>
        <article className="w-full flex items-center justify-between gap-2">
          <div className="w-full flex flex-col justify-between">
            <h1 className="text-base font-medium text-gray-700">{name}</h1>
          </div>
          <p>₹{price}</p>
        </article>
      </section>
    </>
  );
};

export default ProductCard;
