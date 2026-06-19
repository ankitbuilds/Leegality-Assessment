import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa6";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`}>

      <div className="border border-gray-300 rounded p-3 bg-white hover:shadow-md transition">

        <div className="h-40 flex items-center justify-center">

          <img
            src={product.thumbnail}
            alt={product.title}
            className="max-h-full object-contain"
          />

        </div>

        <h3 className="mt-3 font-medium text-gray-800">
          {product.title}
        </h3>

        <p className="text-lg font-semibold mt-1">
          ${product.price}
        </p>

        <div className="text-yellow-500 text-sm">
          <div className="flex items-center gap-1">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          </div>
          <span className="text-gray-500 ml-1">
            ({product.rating})
          </span>
        </div>

      </div>

    </Link>
  );
};

export default ProductCard;