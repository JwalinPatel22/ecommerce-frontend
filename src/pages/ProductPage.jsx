import { FaArrowLeft } from "react-icons/fa";
import { useParams, useLoaderData, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";

function ProductPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const product = useLoaderData();
  const { user } = useContext(AuthContext);

  const addToCart = async (productId) => {
    if (!user) {
      alert("Please login to add items to your cart.");
      return;
    }
    try {
      await axiosInstance.post("/cart/add", {
        userId: user.id,
        productId,
        qty: 1,
      });
      toast.success("Product added to cart successfully", { autoClose: 500 });
      navigate(`/cart`);
      console.log("Updated Cart");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Failed to add product to cart");
    }
  };

  return (
    <>
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            to="/products"
            className="text-indigo-500 hover:text-indigo-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Products Page
          </Link>
        </div>
      </section>

      <section className="bg-indigo-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <main>
              <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-indigo-800 text-lg font-bold mb-6">
                  Product Description
                </h3>

                <p className="mb-4">{product.description}</p>

                <h3 className="text-indigo-800 text-lg font-bold mb-2">
                  Price
                </h3>

                <p className="mb-4">{product.price}</p>
              </div>
            </main>

            <aside>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">Brand: </h3>

                <h2 className="text-2xl">{product.brand}</h2>

                <hr className="my-4" />

                <h3 className="text-xl">Quantity:</h3>

                <p className="my-2 bg-indigo-100 p-2 font-bold">
                  {product.qty}
                </p>
                <button
                  onClick={() => addToCart(product._id)}
                  className="bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Add To Cart
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

//fetching job with a particular id from database
const productLoader = async ({ params }) => {
  const res = await axios.get(`http://localhost:3000/admin/product/${params.id}`);
  return res.data;
};

export { ProductPage as default, productLoader };
