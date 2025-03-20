import React, { useEffect, useState } from "react";
import Item from "../Seller/Item";
import axios from "axios";
import { animateScroll as scroll } from "react-scroll";
const BASE_URL = import.meta.env.VITE_BASE_URL;


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalProducts: 0,
    pageSize: 10,
  });

  // Function to fetch products from the backend
  const getProducts = async () => {
    try {
      const { currentPage, pageSize } = pagination;
      const res = await axios.get(
        `${BASE_URL}/seller/products?page=${currentPage}&limit=${pageSize}`,
        {
          withCredentials: true,
        }
      );
      setProducts(res?.data?.products);
      setPagination(res?.data?.pagination);

      scroll.scrollToTop({
        duration: 500,
        smooth: true,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [pagination.currentPage]);

  const handleNextPage = () => {
    if (pagination.currentPage < pagination.totalPages) {
      setPagination((prevState) => ({
        ...prevState,
        currentPage: prevState.currentPage + 1,
      }));
    }
  };

  const handlePrevPage = () => {
    if (pagination.currentPage > 1) {
      setPagination((prevState) => ({
        ...prevState,
        currentPage: prevState.currentPage - 1,
      }));
    }
  };

  const handleDeleteProduct = async () => {
    try {
      if (productToDelete) {
        await axios.delete(`${BASE_URL}/product/${productToDelete}`, {
          withCredentials: true,
        });
        setProducts(
          products.filter((product) => product._id !== productToDelete)
        );
      }
      setIsModalOpen(false);
      setProductToDelete(null);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const openDeleteModal = (id) => {
    setProductToDelete(id);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setProductToDelete(null);
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg min-w-3xs w-1/3 ">
            <p>Are you sure you want to delete this product?</p>
            <div className="mt-4 flex justify-between">
              <button
                className="px-4 py-2 bg-red-600 cursor-pointer text-white rounded"
                onClick={handleDeleteProduct}
              >
                Yes
              </button>
              <button
                className="px-4 py-2 bg-gray-300 cursor-pointer text-gray-800 rounded"
                onClick={closeDeleteModal}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full flex flex-col gap-1 py-7  px-12 font-[Outfit]">
        <h1 className="mb-2 text-gray-500 font-semibold">All Products List</h1>
        <div className="bg-gray-100 hidden md:flex justify-between p-0.5 pl-3 pr-10 text-gray-600">
          <div className="flex gap-24 min-w-2xs">
            <p className="font-semibold">Image</p>
            <p className="font-semibold">Name</p>
          </div>
          <div className="flex gap-16">
            <p className="font-semibold">Category</p>
            <p className="font-semibold">Price</p>
            <p className="font-semibold">Action</p>
          </div>
        </div>
        {products.map((product) => (
          <Item key={product._id} item={product} onDelete={openDeleteModal} />
        ))}

        <div className="flex justify-center items-center mt-5">
          <button
            onClick={handlePrevPage}
            disabled={pagination.currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-l-md disabled:opacity-50"
          >
            Previous
          </button>

          <span className="mx-4 text-gray-700">
            {/* Render page numbers */}
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() =>
                    setPagination((prevState) => ({
                      ...prevState,
                      currentPage: pageNumber,
                    }))
                  }
                  className={`px-4 py-2 ${
                    pagination.currentPage === pageNumber
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  } rounded-md mx-0.5 cursor-pointer`}
                >
                  {pageNumber}
                </button>
              )
            )}
          </span>

          <button
            onClick={handleNextPage}
            disabled={pagination.currentPage === pagination.totalPages}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-r-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductList;
