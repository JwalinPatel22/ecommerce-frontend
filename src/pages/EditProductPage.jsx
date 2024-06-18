import axios from "axios";
import { useState } from "react";
import { useParams, useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; 
//jp
function EditProductPage() { //{ updateProductSubmit }
  const product = useLoaderData();

  const [title, setTitle] = useState(product.title);
  const [brand, setBrand] = useState(product.brand);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [qty, setQty] = useState(product.qty);

  const navigate = useNavigate();
  const { id } = useParams();

  const submitForm = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      title,
      brand,
      description,
      price,
      qty,
    };
    // updateProductSubmit(updatedProduct);
    try{
      await axios.patch(`http://localhost:3000/api/product/${id}`, updatedProduct);
      toast.success("Product Updated Successfully");
      return navigate(`/product/${id}`);
    } catch (error){
      console.log("Error updating product", error);
      toast.error("Failed to update product");
    }
  };

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={submitForm}>
            <h2 className="text-3xl text-center font-semibold mb-6">
              Update Product
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
                placeholder="Add any job duties, expectations, requirements, etc"
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
            {/* <div className="mb-4">
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
                required
                accept="image/png, image/gif, image/jpeg"
              />
            </div> */}

            <div>
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default EditProductPage;
