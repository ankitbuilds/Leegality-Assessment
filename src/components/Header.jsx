import {
  FaBars,
  FaShoppingCart,
  FaBell,
  FaUser
} from "react-icons/fa";

const Header = ({
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <header className="bg-[#1f2a3a] shadow-md">
      <div className="h-14 px-6 flex items-center justify-between">

        {/* Left Menu Icon */}
        <button className="text-white text-lg">
          <FaBars />
        </button>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="w-full h-10 pl-10 pr-4 rounded-md border-none outline-none text-gray-700 bg-white"
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-3 h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-6 text-white text-lg">
          <FaShoppingCart className="cursor-pointer hover:text-gray-300" />
          <FaBell className="cursor-pointer hover:text-gray-300" />
          <FaUser className="cursor-pointer hover:text-gray-300" />
        </div>

      </div>
    </header>
  );
};

export default Header;