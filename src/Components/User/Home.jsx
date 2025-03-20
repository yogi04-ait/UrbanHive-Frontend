import { useEffect, useState } from "react";
import hero from "../../assets/hero.jpg";
import ProductCard from "./ProductCard";
import axios from "axios";
import { NavLink } from "react-router";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Home = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(BASE_URL + "/products/random", {
        withCredentials: true,
      });
      setProducts(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-full h-full flex flex-col font-[Outfit] justify-start px-5 xl:px-10 py-10 gap-10">
      <div className="border flex  flex-col-reverse sm:h-[70vh]  sm:flex-row sm:justify-between w-[80vw] m-[3vw]  mx-[7vw] ">
        <div className="w-full mt-3 h-full  text-center lg:text-lg md:text-sm text-xs text-gray-700 flex flex-col justify-center font-semibold sm:font-normal items-center gap-3 sm:w-[40vw]">
          <p>OUR BESTSELLERS</p>
          <h1 className=" text-sm sm:text-2xl  md:text-5xl sm:whitespace-nowrap">
            Latest Arrivals
          </h1>
          <NavLink
            to="/feed"
            className="hover:bg-gray-300 py-2 mb-2 cursor-pointer px-4 rounded-sm"
          >
            SHOP NOW
          </NavLink>
        </div>
        <div>
          <img
            src={hero}
            alt="Girl with shopping bags"
            className="w-full h-full sm:w-[40vw]"
            loading="lazy"
          />
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 ">
        <p className="text-sm sm:text-xl md:text-2xl lg:text-4xl mb-2 font-[Outfit] text-gray-700 font-medium">
          <span className="text-gray-500">LATEST</span> COLLECTIONS
        </p>
        <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] max-sm:mb-2 bg-gray-700 self-center "></p>
      </div>
      <p className="text-center font-[Outfit] tracking-wide px-3 text-gray-500 font-semibold">
        Discover the Latest Trends and Unveil Your Perfect Style with Our Newest
        Collections!
      </p>
      <div className="h-full flex flex-wrap items-center justify-center gap-10 mt-14 mx-[7vw]">
        {products.length <= 0 ? (
          <div>Loading...</div>
        ) : (
          <div className="flex flex-wrap gap-5 justify-between ">
            {products.map((product) => {
              return (
                <ProductCard
                  key={product._id}
                  id={product._id}
                  name={product.name}
                  price={product.price}
                  image={product.images[0].imageUrls}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
