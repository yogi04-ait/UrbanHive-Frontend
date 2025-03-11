import ProductCard from "./ProductCard";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useState, useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";

const WomenProducts = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("women");
  const [subCategory, setSubCategory] = useState("");
  const [sort, setSort] = useState("");

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalProducts: 0,
    pageSize: 12,
  });

  const fetchProducts = async () => {
    try {
      const { currentPage, pageSize } = pagination;

      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: pageSize,
        category,
        subCategory,
        sort,
      }).toString();

      const res = await axios.get(`${BASE_URL}/products?${queryParams}`, {
        withCredentials: true,
      });
      setProducts(res?.data?.data);
      setPagination(res?.data?.pagination);
      scroll.scrollToTop({
        duration: 500,
        smooth: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
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

  return (
    <div>
      <div className="w-full h-full flex flex-col items-start px-5 xl:px-10 py-10 gap-10">
        {products.length <= 0 ? (
          <div>Loading...</div>
        ) : (
          <div className="w-full h-full flex flex-wrap gap-10  ">
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
  );
};

export default WomenProducts;
