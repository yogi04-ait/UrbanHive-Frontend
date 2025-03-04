import React, { useState } from "react";
import uploadImg from "../../assets/upload.png";
import { MdDeleteForever } from "react-icons/md";

const AddItem = () => {
  const [images, setImages] = useState([null, null, null, null]);
  const [error, setError] = useState("");

  const handleImageChange = (index, event) => {
    const newImages = [...images];
    newImages[index] = event.target.files[0];
    setImages(newImages);
  };

  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleDeleteImage = (index, event) => {
    event.stopPropagation();
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
  };

  const handleSubmit = () => {
    if (images.every((image) => image === null)) {
      setError("At least one image is required.");
    } else {
      setError("");
      console.log(
        "Form submitted with images:",
        images.filter((img) => img !== null)
      );
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
    <form className="flex flex-col p-10 font-[Outfit] text-gray-500 gap-3 font-semibold">
      <p>Upload Image</p>
      <div className="flex gap-4">{renderImagePreviews()}</div>
      <label>Product Name</label>
      <input
        placeholder="Type here"
        className="font-normal text-lg w-full border px-2 py-1 outline-pink-300  rounded-md"
      />
      <label>Product description</label>
      <textarea className="border outline-pink-200 h-16 rounded-md" />
      <div className="flex gap-10">
        <div className="flex flex-col gap-3">
          <label htmlFor="product-category">Product Category</label>
          <select
            id="product-category"
            className="w-full p-2 border rounded-md"
            name="category"
            value={category}
          >
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>
        </div>
        <div className="flex flex-col gap-3 ">
          <label htmlFor="sub-category">Sub Category</label>
          <select
            id="sub-category"
            className="w-full p-2 border rounded-md"
            name="sub-category"
            value={subCategory}
          >
            <option value="men">Topwear</option>
            <option value="women">Bottomwear</option>
            <option value="kids">Winterwear</option>
          </select>
        </div>
        <div className="flex flex-col gap-3 ">
          <label>Product Price</label>
          <input className="border rounded-md p-1.5" />
        </div>
      </div>
      <label>Product Sizes and Quantity</label>
      <div className="flex gap-4">
        <div className="flex flex-col gap-2">
          <p className="bg-gray-300 p-1 px-2 w-fit">S</p>
          <input type="number" className="w-8 border px-2 py-1" />
        </div>
        <div className="flex flex-col gap-2">
          <p className="bg-gray-300 p-1 px-2 w-fit">M</p>
          <input type="number" className="w-8 border px-2 py-1" />
        </div>
        <div className="flex flex-col gap-2">
          <p className="bg-gray-300 p-1 px-2 w-fit">L</p>
          <input type="number" className="w-8 border px-2 py-1" />
        </div>
        <div className="flex flex-col gap-2">
          <p className="bg-gray-300 p-1 px-2 w-fit">XL</p>
          <input type="number" className="w-8 border px-2 py-1 no-spinner" />
        </div>
      </div>

      {error && <p className="text-red-500 text-center mt-2">{error}</p>}

      <button className="bg-black text-white w-fit px-5 py-2 ">
        Add Product
      </button>
    </form>
  );
};

export default AddItem;
