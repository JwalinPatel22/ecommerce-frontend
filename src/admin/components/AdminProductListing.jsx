import { useState } from "react";
import { Link } from "react-router-dom";

function AdminProductListing({ product }) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  let description = product.description;

  //if value of showFullDescription is false, it will trim the description
  if (!showFullDescription) {
    description = description.substring(0, 90) + "...";
  }

  return (
    <div className="bg-white rounded-xl shadow-md relative">
      <div className="p-4">
        <div className="mb-6">
          <h3 className="text-xl font-bold"> {product.title} </h3>
        </div>
        <div className="mb-5"> {product.description} </div>
        <button
          className="text-indigo-400 mb-5 hover:text-indigo-600"
          onClick={() => setShowFullDescription((prevState) => !prevState)}
        >
          {showFullDescription ? "  Less" : "More"}
        </button>

        <h3 className="text-indigo-500 mb-2"> $ {product.price}</h3>
        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <Link
            to={`/admin/product/${product._id}`}
            className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminProductListing;
