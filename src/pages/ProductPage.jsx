import { FaArrowLeft } from "react-icons/fa";
import { useParams, useLoaderData, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function ProductPage({ deleteProduct }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const product = useLoaderData();

  const onDeleteClick = async (productId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this product listing ?"
    );

    if (!confirm) {
      return;
    }

    deleteProduct(productId);
    toast.success("Product Deleted Successfully");
    navigate("/products");
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
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-xl font-bold mb-6">Manage Product</h3>
                <Link
                  to={`/edit-product/${product._id}`}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Edit Product
                </Link>
                <button
                  onClick={() => onDeleteClick(product._id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Delete Product
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
  const res = await axios.get(`http://localhost:3000/api/product/${params.id}`);
  return res.data;
};

export { ProductPage as default, productLoader };
