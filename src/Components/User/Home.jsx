import { useEffect, useState } from "react";
import hero from "../../assets/hero.png";
import ProductCard from "./ProductCard";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
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
    <div className="w-full h-full flex flex-col justify-start px-5 xl:px-10 py-10 gap-10">
      <div className="border m-[3vw] mx-[7vw] flex h-[70vh] justify-between">
        <div className="flex flex-col gap-3 font-[Outfit] lg:text-lg md:text-sm text-xs text-gray-700 text-center justify-center items-center w-[40vw]">
          <p>OUR BESTSELLERS</p>
          <h1 className="text-2xl md:text-5xl whitespace-nowrap">
            Latest Arrivals
          </h1>
          <p>SHOP NOW</p>
        </div>
        <div>
          <img src={hero} alt="Hero-Image" className="w-[40vw] h-full" />
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 ">
        <p className="text-xl md:text-2xl lg:text-4xl mb-2 font-[Outfit] text-gray-700 font-medium">
          <span className="text-gray-500">LATEST</span> COLLECTIONS
        </p>
        <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
      </div>
      <p className="text-center font-[Outfit] tracking-wide text-gray-500 font-semibold">
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
