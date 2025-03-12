import ProductCard from "./ProductCard";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useState, useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";
import Select from "react-select";

const MenProducts = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("men");
  const [subCategory, setSubCategory] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);

  const sortOptions = [
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
  ];
  const subCategoryOptions = [
    { value: "topwear", label: "Topwear" },
    { value: "winterwear", label: "Winterwear" },
    { value: "bottomwear", label: "Bottomwear" },
    { value: "ethnicwear", label: "Ethnicwear" },
    { value: "", label: "None" },
  ];

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
      setLoading(false);

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
  }, [pagination.currentPage, sort, subCategory]);

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

  if (loading) {
    return (
      <div className="text-center w-full h-full text-lg flex justify-center align-center pt-[25vh] min-h-[60vh] ">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <div className="w-full flex justify-end  px-10 xl:px-20 gap-5 ">
        <Select
          name="sort"
          value={subCategory}
          onChange={(selectedOption) => setSubCategory(selectedOption.value)}
          isClearable={true}
          isSearchable={true}
          options={subCategoryOptions}
          getOptionLabel={(option) => option.label}
          getOptionValue={(option) => option.value}
          placeholder={
            subCategory
              ? subCategory.charAt(0).toUpperCase() + subCategory.slice(1)
              : "Category"
          }
          classNamePrefix="select"
          className="w-[150px] sm:w-[180px] text-black outline-none  "
        />
        <Select
          name="sort"
          value={sort}
          onChange={(selectedOption) => setSort(selectedOption.value)}
          isClearable={true}
          isSearchable={true}
          options={sortOptions}
          getOptionLabel={(option) => option.label}
          getOptionValue={(option) => option.value}
          placeholder={
            sort
              ? sort === "price_asc"
                ? "Low to High"
                : "High to Low"
              : "Sort By"
          }
          classNamePrefix="select"
          className="w-[150px] sm:w-[180px] text-black outline-none  "
        />
      </div>
      <div className="w-full h-full flex flex-col items-start px-5 xl:px-10 py-10 gap-10">
        {products.length <= 0 ? (
          <div className="w-full text-center align-bottom mt-24 text-gray-500">
            <p>No products matched the filtered search</p>
          </div>
        ) : (
          <div className="w-full h-full flex flex-wrap gap-10  ">
            {products.map((product) => {
              return (
                <ProductCard
                  key={product._id}
                  id={product._id}
                  name={product.name}
                  price={product.price}
                  image={product.images[0].imageUrls }
                />
              );
            })}
          </div>
        )}
      </div>
      {pagination.totalPages > 1 ? (
        <div className="flex justify-center items-center mt-5">
          <button
            onClick={handlePrevPage}
            disabled={pagination.currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-l-md disabled:opacity-50"
          >
            Previous
          </button>

          <span className="mx-4 text-gray-700">
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
      ) : (
        ""
      )}
    </div>
  );
};

export default MenProducts;
