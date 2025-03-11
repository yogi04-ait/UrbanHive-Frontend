import React from "react";
import { MdOutlineFavorite } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const WishlistCard = ({ id, name, price, image, updateWishlist }) => {
  return (
    <>
      <section className="w-[282px] h-[440px] flex flex-col items-start justify-start  rounded cursor-pointer">
        <div className="w-full h-[370px] relative overflow-hidden rounded">
          <section className="w-[282px] h-[370px] object-cover object-center rounded overflow-hidden hover:scale-110 transition-all duration-300 ease-in-out">
            <LazyLoadImage
              alt="Your Image"
              effect="blur"
              src={image}
              className="w-full h-full object-cover object-center rounded"
            />
          </section>
          <section className="absolute top-5 right-5 bg-white rounded-full p-1">
            <MdOutlineFavorite
              className="text-red-500 cursor-pointer"
              onClick={() => updateWishlist(id)}
            />
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

export default WishlistCard;
