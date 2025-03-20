import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../utils/cartSlice";
import { toast } from "react-toastify";
import { HiOutlineShoppingBag } from "react-icons/hi";
import Lazy from "../LazyLoading/Lazy";
import { unstable_batchedUpdates } from "react-dom";
import { animateScroll as scroll } from "react-scroll";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [goToCart, setGoToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("S");
  const dispatch = useDispatch();
  const cart = useSelector((store) => store.cart);
  const isInitialRender = useRef(true);
  const [isQuantityUpdate, setIsQuantityUpdate] = useState(false);
  const [isProductInCard, setIsProductInCard] = useState(false);
  const [isOutOfStock, setIsOutOfStock] = useState(false);
  const navigate = useNavigate();

  const handleQuantity = (operation) => {
    const item = product.sizes.find((item) => item.size === selectedSize);

    if (!item) {
      return;
    }

    if (goToCart) {
      setIsQuantityUpdate(true);
    }

    if (operation === "i" && item.quantity <= quantity) {
      toast.info("Limited quantity available");
    } else {
      setQuantity((prevQuantity) => {
        if (operation === "i") {
          return prevQuantity + 1;
        } else {
          return prevQuantity - 1;
        }
      });
    }
    if (isProductInCard) {
      setIsQuantityUpdate(true);
    }
  };

  const validateQuantity = () => {
    const item = product.sizes.find((item) => item.size === selectedSize);
    setIsOutOfStock(false);
    if (!item) {
      toast.error("This size is not available");
    }
    if (item.quantity == 0) {
      toast.error("Out of stock");
      setIsOutOfStock(true);
    } else if (item.quantity < quantity) {
      toast.info("Limited quantity available");
      setQuantity(item.quantity);
    }
  };

  const handleChangeSize = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    const item = product.sizes.find((item) => item.size === selectedSize);
    if (item.quantity === 0) {
      toast.error("Out of stock");
      return;
    }
    dispatch(
      addToCart({
        id,
        name: product?.name,
        image: product?.images[0]?.imageUrls,
        size: selectedSize,
        price: product?.price,
        quantity,
        availableQuantity: item.quantity,
      })
    );
    setGoToCart(true);
    toast.success("Product added successfully");
  };

  const updateQuantity = () => {
    if (product.isDeleted) return;

    const item = product.sizes.find((item) => item.size === selectedSize);
    dispatch(
      addToCart({
        id,
        name: product?.name,
        image: product?.images[0]?.imageUrls,
        size: selectedSize,
        quantity,
        availableQuantity: item.quantity,
      })
    );
    setIsQuantityUpdate(false);
    toast.success("Quantity updated successfully");
  };

  const fetchProduct = async () => {
    try {
      scroll.scrollToTop({
        duration: 500,
        smooth: true,
      });

      const res = await axios.get(BASE_URL + "/product/" + id, {
        withCredentials: true,
      });
      setProduct(res.data);
    } catch (error) {
      toast.error("Product not found");
      navigate("/feed");
    }
  };

  const checkForCart = () => {
    try {
      const item = cart.find(
        (product) => product.productId === id && product.size === selectedSize
      );

      if (item) {
        unstable_batchedUpdates(() => {
          setQuantity(item.quantity);
          setGoToCart(true);
          setIsQuantityUpdate(false);
          setIsProductInCard(true);
        });
      } else {
        setQuantity(1);
        setGoToCart(false);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (isInitialRender.current) {
      // Skip the first render
      isInitialRender.current = false;
      return;
    }

    validateQuantity();
  }, [selectedSize]);

  useEffect(() => {
    checkForCart();
  }, [selectedSize]);

  useEffect(() => {
    fetchProduct();
  }, []);

  if (product.length === 0) {
    return (
      <div className="text-center w-full h-full text-lg flex justify-center align-center pt-[25vh] min-h-[60vh] ">
        Loading...
      </div>
    );
  }

  return (
    <>
      <main className="w-full h-full flex flex-col items-start px-5 xl:px-10 py-10 gap-20 mb-20">
        <section className="w-full h-full flex flex-col lg:flex-row items-start  lg:items-center justify-start gap-10 lg:gap-20">
          <section className="w-full h-full sm:w-[410px] sm:h-[540px]">
            <Lazy
              img={product?.images[0]?.imageUrls}
              className="w-full h-full sm:w-[410px] sm:h-[540px] object-center rounded"
            />
          </section>
          <section className="flex flex-col justify-start items-start gap-6">
            <header className="flex flex-col items-start justify-start gap-4">
              <section className="flex flex-col items-start justify-start gap-1">
                <h1 className="font-medium text-3xl md:text-4xl text-black-100 capitalize">
                  {product?.name}
                </h1>
              </section>
              <section className="">
                <p className="font-normal text-black-100 text-2xl">
                  &#8377; {product?.price}
                </p>
                <p className="text-dark-violet font-medium">
                  inclusive of all taxes
                </p>
              </section>
            </header>
            <article className="max-w-3xl xl:max-w-5xl flex flex-col justify-start items-start gap-2">
              <h3 className="font-medium text-xl text-black-100">
                Product description
              </h3>
              <p className="text-light-gray">{product?.description}</p>
            </article>

            {product.isDeleted ? (
              <div className="text-white font-semibold px-6 py-2 rounded bg-red-500">
                Not Available
              </div>
            ) : (
              <>
                <section className="flex flex-col gap-2 items-start">
                  <h3 className="font-medium text-xl text-black-100">
                    Select Size
                  </h3>
                  <div className="flex items-center gap-4">
                    {["S", "M", "L", "XL"].map((size) => (
                      <p
                        key={size}
                        className={`w-10 h-10 text-light-gray border-[1px] border-light-gray rounded-full p-4 flex items-center justify-center text-sm cursor-pointer ${
                          selectedSize === size ? "bg-black text-white" : ""
                        }`}
                        onClick={() => handleChangeSize(size)}
                      >
                        {size}
                      </p>
                    ))}
                  </div>
                </section>

                {!isOutOfStock && (
                  <section className="flex flex-col items-start justify-start gap-4">
                    <h3 className="font-medium text-xl text-black-100">
                      Quantity
                    </h3>
                    <div className="flex items-center justify-start gap-4 font-normal text-base text-Primary">
                      <span
                        className={`border-[1px] border-light-gray-100 px-4 py-2 cursor-pointer ${
                          quantity <= 1 ? "opacity-50 pointer-events-none" : ""
                        }`}
                        onClick={() => handleQuantity("d")}
                      >
                        -
                      </span>
                      <p>{quantity}</p>
                      <span
                        className="border-[1px] border-light-gray-100 px-4 py-2 cursor-pointer"
                        onClick={() => handleQuantity("i")}
                      >
                        +
                      </span>
                    </div>
                  </section>
                )}

                <div className="flex items-center justify-start">
                  {goToCart ? (
                    isQuantityUpdate ? (
                      <button
                        onClick={updateQuantity}
                        className="bg-black text-white px-5 py-2 rounded cursor-pointer"
                      >
                        Update Quantity
                      </button>
                    ) : (
                      <NavLink
                        to="/cart"
                        className="bg-black text-white px-5 py-2 rounded cursor-pointer"
                      >
                        Go to cart
                      </NavLink>
                    )
                  ) : (
                    <button
                      className={`flex items-center gap-2 text-white font-medium px-6 py-2 rounded ${
                        isOutOfStock
                          ? "bg-red-500 cursor-not-allowed"
                          : "bg-black cursor-pointer"
                      }`}
                      disabled={isOutOfStock}
                      onClick={handleAddToCart}
                    >
                      {isOutOfStock ? (
                        "Out of Stock"
                      ) : (
                        <>
                          <HiOutlineShoppingBag /> Add to cart
                        </>
                      )}
                    </button>
                  )}
                </div>
              </>
            )}
          </section>
        </section>
      </main>
    </>
  );
};

export default Product;
