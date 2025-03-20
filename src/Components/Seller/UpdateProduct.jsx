import React, { useEffect, useState } from "react";
import uploadImg from "../../assets/upload.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router";
import ShimmerLoader from "../Loader/ShimmerLoader";
const BASE_URL = import.meta.env.VITE_BASE_URL;


const UpdateProduct = () => {
  const { id } = useParams();
  const [images, setImages] = useState([null, null, null, null]);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState({
    S: 0,
    M: 0,
    L: 0,
    XL: 0,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(BASE_URL + "/product/" + id, {
        withCredentials: true,
      });
      const productData = res.data;

      setName(productData.name);
      setCategory(productData.category);
      setSubCategory(productData.subCategory);
      setPrice(productData.price);
      setDescription(productData.description);

      const sizeObj = productData.sizes.reduce((acc, size) => {
        acc[size.size] = size.quantity;
        return acc;
      }, {});
      setSizes(sizeObj);

      const imageUrls = productData.images.map(
        (image) => image.imageUrls || null
      );
      setImages(imageUrls);
      setLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const notify = (msg) => toast(msg);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSizeChange = (size, event) => {
    setSizes((prevSizes) => ({
      ...prevSizes,
      [size]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("price", price);
    formData.append(
      "sizes",
      JSON.stringify(
        Object.keys(sizes).map((size) => ({ size, quantity: sizes[size] }))
      )
    );

    try {
      const response = await axios.put(
        BASE_URL + "/seller/product/" + id,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        notify("Product updated successfully!");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
      notify("Error in updating the product.");
    }
  };

  const renderImagePreviews = () => {
    return images.map((image, index) => (
      <div key={index} className="relative w-full h-full">
        {image ? (
          <img
            src={image}
            alt={`uploaded-${index}`}
            className="w-16 sm:w-26 "
          />
        ) : (
          <div className="w-full h-full flex justify-center items-center bg-gray-200 rounded-md">
            <img
              src={uploadImg}
              alt="upload placeholder"
              className="w-16 sm:w-26 "
            />
          </div>
        )}
      </div>
    ));
  };

  if (loading) {
    return <ShimmerLoader />;
  }

  return (
    <>
      <ToastContainer />
      <form
        className="flex flex-col p-10 font-[Outfit] text-gray-500 gap-3 font-semibold"
        onSubmit={handleSubmit}
      >
        <p>Product Image</p>
        <div className="flex gap-4">{renderImagePreviews()}</div>
        <label>Product Name</label>
        <input
          placeholder="Type here"
          className="font-normal text-lg w-full border px-2 py-1 outline-pink-300  rounded-md outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Product Description</label>
        <textarea
          className="border outline-pink-200 h-16 rounded-md outline-none py-1 px-2 font-normal text-lg"
          placeholder="Write content here"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex gap-10">
          <div className="flex flex-col gap-3">
            <label htmlFor="product-category">Product Category</label>
            <select
              id="product-category"
              className="w-full p-2 border rounded-md"
              name="category"
              value={category}
              onChange={handleChange}
            >
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
            </select>
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="sub-category">Sub Category</label>
            <select
              id="sub-category"
              className="w-full p-2 border rounded-md"
              name="sub-category"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
            >
              <option value="topwear">Topwear</option>
              <option value="bottomwear">Bottomwear</option>
              <option value="winterwear">Winterwear</option>
              <option value="ethnicwear">Ethnicwear</option>
            </select>
          </div>
          <div className="flex flex-col gap-3">
            <label>Product Price</label>
            <input
              className="border rounded-md p-1.5 outline-none"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        <label>Product Sizes and Quantity</label>
        <div className="flex gap-4">
          {["S", "M", "L", "XL"].map((size) => (
            <div key={size} className="flex flex-col gap-2">
              <p className="bg-gray-300 p-1 px-2 w-11 text-center">{size}</p>
              <input
                type="number"
                value={sizes[size]}
                className="w-11 border px-2 py-1 outline-none"
                onChange={(e) => handleSizeChange(size, e)}
              />
            </div>
          ))}
        </div>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <button className="bg-black text-white w-fit px-5 py-2">
          Update Product
        </button>
      </form>
    </>
  );
};

export default UpdateProduct;
