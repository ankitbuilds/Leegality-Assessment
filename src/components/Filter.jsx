import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

const Filters = ({
  categories,
  brands,
}) => {
  const { filters, setFilters } =
    useContext(ProductContext);

  const handleBrandChange = (brand) => {
    let updatedBrands;

    if (filters.brands.includes(brand)) {
      updatedBrands = filters.brands.filter(
        (b) => b !== brand
      );
    } else {
      updatedBrands = [...filters.brands, brand];
    }

    setFilters({
      ...filters,
      brands: updatedBrands,
    });
  };

  return (
    <div className="space-y-4">

      <div>
        <h3 className="font-bold mb-2">
          Categories
        </h3>

        <select
          className="border p-2 w-full"
          value={filters.category}
          onChange={(e) =>
            setFilters({
              ...filters,
              category: e.target.value,
            })
          }
        >
          <option value="">
            All Categories
          </option>

          {categories.map((cat) => (
            <option
              key={cat.slug}
              value={cat.slug}
            >
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="font-bold mb-2">
          Price Range
        </h3>

        <input
          type="number"
          placeholder="Min"
          className="border p-2 w-full mb-2"
          value={filters.minPrice}
          onChange={(e) =>
            setFilters({
              ...filters,
              minPrice: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Max"
          className="border p-2 w-full"
          value={filters.maxPrice}
          onChange={(e) =>
            setFilters({
              ...filters,
              maxPrice: e.target.value,
            })
          }
        />
      </div>

      <div>
        <h3 className="font-bold mb-2">
          Brands
        </h3>

        {brands.map((brand) => (
          <label
            key={brand}
            className="block"
          >
            <input
              type="checkbox"
              checked={filters.brands.includes(
                brand
              )}
              onChange={() =>
                handleBrandChange(brand)
              }
            />

            <span className="ml-2">
              {brand}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Filters;