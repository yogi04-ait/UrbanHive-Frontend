import React, { useState } from "react";
import uploadImg from "../../assets/upload.png";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
const BASE_URL = import.meta.env.VITE_BASE_URL;


const AddItem = () => {
  const [images, setImages] = useState([null, null, null, null]);
  const [category, setCategory] = useState("men");
  const [subCategory, setSubCategory] = useState("topwear");
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
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setImages([null, null, null, null]);
    setCategory("men");
    setSubCategory("topwear");
    setName("");
    setDescription("");
    setPrice("");
    setSizes({
      S: 0,
      M: 0,
      L: 0,
      XL: 0,
    });
    setError("");
  };

  const handleImageChange = (index, event) => {
    const newImages = [...images];
    newImages[index] = event.target.files[0];
    setImages(newImages);
  };

  const handleDeleteImage = (index, event) => {
    event.stopPropagation();
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSizeChange = (size, event) => {
    const newSizes = { ...sizes };
    newSizes[size] = event.target.value;
    setSizes(newSizes);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check for at least one image
    if (images.every((image) => image === null)) {
      setError("At least one image is required.");
      return;
    } else {
      setError("");
    }

    setLoading(true);

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

    images.forEach((image) => {
      if (image) {
        formData.append("images", image);
      }
    });

    try {
      const response = await axios.post(
        BASE_URL + "/seller/product",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (
        response.data &&
        response.data.message === "Product uploaded successfully"
      ) {
        toast.success("Product added successfully!");
        resetForm();
      } else {
        toast.error(
          "Failed to upload product: " +
            (response.data.message || "Unknown error")
        );
      }
    } catch (error) {
      console.error("Error during product upload:", error);
      notify("Error in uploading the product.");
    } finally {
      setLoading(false);
    }
  };

  const renderImagePreviews = () => {
    return images.map((image, index) => (
      <div key={index} className="relative w-20 h-20">
        <label
          htmlFor={`image-upload-${index}`}
          className="w-full h-full border-1 border-dotted border-gray-500  flex justify-center items-center cursor-pointer"
          onClick={(event) => event.stopPropagation()}
        >
          {image ? (
            <>
              <img
                src={URL.createObjectURL(image)}
                alt={`uploaded-${index}`}
                className="w-full h-full object-cover rounded-md "
              />
              <MdDeleteForever
                className="absolute -top-1.5 -right-2 w-5 text-red-600 "
                onClick={(event) => handleDeleteImage(index, event)}
              />
            </>
          ) : (
            <span className="text-gray-500 text-3xl">
              <img src={uploadImg} />
            </span>
          )}
          <input
            type="file"
            id={`image-upload-${index}`}
            accept="image/*"
            className="hidden"
            onChange={(event) => handleImageChange(index, event)}
          />
        </label>
      </div>
    ));
  };

  return (
    <form
      className="flex flex-col p-10 font-[Outfit] text-gray-500 gap-3 font-semibold"
      onSubmit={handleSubmit}
    >
      <p>Upload Image</p>
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
            <p className="bg-gray-300 p-1 px-2 w-10 text-center">{size}</p>
            <input
              type="number"
              value={sizes[size]}
              className="w-10 border px-2 py-1 outline-none"
              onChange={(e) => handleSizeChange(size, e)}
            />
          </div>
        ))}
      </div>

      {error && <p className="text-red-500 text-center mt-2">{error}</p>}

      <button
        className={`bg-black  text-white w-fit px-5 py-2 ${
          loading ? "cursor-progress" : "cursor-pointer"
        }`}
        disabled={loading}
      >
        {loading ? "Uploading" : "Add Product"}
      </button>
    </form>
  );
};
export default AddItem;
