import {
  useContext,
  useEffect,
  useState,
} from "react";

import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filter";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

import {
  getProducts,
  getCategories,
} from "../api/productApi";

import { ProductContext } from "../context/ProductContext";

const ProductListingPage = () => {
  const { filters } = useContext(ProductContext);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const limit = 12;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [productRes, categoryRes] =
        await Promise.all([
          getProducts(100, 0),
          getCategories(),
        ]);

      setProducts(productRes.products);
      setCategories(categoryRes);
    } catch (error) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, searchTerm]);

  const filteredProducts = products.filter(
    (product) => {
      const categoryMatch =
        !filters.category ||
        product.category === filters.category;

      const minMatch =
        !filters.minPrice ||
        product.price >= Number(filters.minPrice);

      const maxMatch =
        !filters.maxPrice ||
        product.price <= Number(filters.maxPrice);

      const brandMatch =
        filters.brands.length === 0 ||
        filters.brands.includes(product.brand);

      const searchMatch =
        product.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      return (
        categoryMatch &&
        minMatch &&
        maxMatch &&
        brandMatch &&
        searchMatch
      );
    }
  );

  const brands = [
    ...new Set(products.map((p) => p.brand)),
  ];

  const totalPages = Math.ceil(
    filteredProducts.length / limit
  );

  const start = (currentPage - 1) * limit;

  const paginatedProducts =
    filteredProducts.slice(
      start,
      start + limit
    );

  if (loading) return <Loader />;

  if (error) return <ErrorMessage message={error} />;

  return (
    <>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

    <div className="bg-gray-100 min-h-screen py-6">

      <div className="max-w-7xl mx-auto bg-white rounded-md shadow-md overflow-hidden">

        <div className="flex">

          {/* Sidebar */}
          <aside className="w-64 border-r border-gray-300 bg-white p-4">

            <Filters
              categories={categories}
              brands={brands}
            />

          </aside>

          {/* Product Section */}
          <main className="flex-1 p-4">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}

            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />

          </main>

        </div>

      </div>

    </div>
  </>
);
};

export default ProductListingPage;
