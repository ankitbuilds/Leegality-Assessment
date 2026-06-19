import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../api/productApi";
import Loader from "../components/Loader";
import Header from "../components/Header";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <Loader />;

  return (
    <>
      <Header />

      <div className="bg-gray-100 min-h-screen p-4">

        <div className="max-w-6xl mx-auto bg-white rounded-md shadow p-6">

          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 border rounded mb-6 hover:bg-gray-100"
          >
            ← Back
          </button>

          {/* Product Section */}
          <div className="grid md:grid-cols-2 gap-12">

            {/* Left Side */}
            <div className="flex justify-center items-start">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full max-w-[350px] h-[450px] object-contain"
              />
            </div>

            {/* Right Side */}
            <div>

              <h1 className="text-4xl font-bold text-gray-800">
                {product.title}
              </h1>

              <div className="flex items-center gap-3 mt-4">
                <span className="text-3xl font-bold">
                  ${product.price}
                </span>

                <span className="text-yellow-500">
                  ⭐⭐⭐⭐⭐
                </span>

                <span className="text-gray-500">
                  ({product.rating})
                </span>
              </div>

              <div className="mt-6 space-y-2">
                <p>
                  <span className="font-semibold">
                    Brand:
                  </span>{" "}
                  {product.brand}
                </p>

                <p>
                  <span className="font-semibold">
                    Category:
                  </span>{" "}
                  {product.category}
                </p>
              </div>

              <hr className="my-8" />

              {/* Description */}
              <div>
                <h2 className="text-2xl font-semibold mb-3">
                  Description
                </h2>

                <p className="text-gray-600 leading-7">
                  {product.description}
                </p>
              </div>

              <hr className="my-8" />

              {/* Reviews */}
              <div>
                <h2 className="text-2xl font-semibold mb-5">
                  Reviews
                </h2>

                {product.reviews?.length > 0 ? (
                  product.reviews.map((review, index) => (
                    <div
                      key={index}
                      className="mb-6"
                    >
                      <h4 className="font-semibold">
                        {review.reviewerName}
                      </h4>

                      <div className="text-yellow-500">
                        {"⭐".repeat(review.rating)}
                        <span className="text-gray-500 ml-2">
                          ({review.rating})
                        </span>
                      </div>

                      <p className="text-gray-600 mt-2">
                        {review.comment}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No Reviews Available</p>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;