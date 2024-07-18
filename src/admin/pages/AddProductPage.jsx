import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function AddProductPage() {
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState(1);

  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    const newProduct = {
      title,
      brand,
      description,
      price,
      qty,
    };
    try {
      await axios.post("http://localhost:3000/admin/create-product", newProduct);
      toast.success("Product Created Successfully", { autoClose: 500 });
      return navigate("/admin/products");
    } catch (error) {
      console.log("Error Creating product", error);
      toast.error("Failed To create product", { autoClose: 500 });
    }
  };

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={submitForm}>
            <h2 className="text-3xl text-center font-semibold mb-6">
              Add Product
            </h2>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Product Name
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="eg. Intel Core i9 14900k"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Brand Name
              </label>
              <input
                type="text"
                id="brand"
                name="brand"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Intel"
                required
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
              >
                Product Description
              </label>
              <textarea
                id="description"
                name="description"
                className="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="Describe your product's features, benefits and other details"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-gray-700 font-bold mb-2"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                className="border rounded w-full py-2 px-3"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="qty"
                className="block text-gray-700 font-bold mb-2"
              >
                Quantity
              </label>
              <input
                type="number"
                id="qty"
                name="qty"
                className="border rounded w-full py-2 px-3"
                required
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="img"
                className="block text-gray-700 font-bold mb-2"
              >
                Product Image
              </label>
              <input
                type="file"
                id="img"
                name="img"
                className="border rounded w-full py-2 px-3"
                accept="image/*"
              />
            </div>

            <div>
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AddProductPage;
