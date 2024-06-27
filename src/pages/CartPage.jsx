import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/cart/${user.id}`,
          {
            headers: { "x-auth-token": localStorage.getItem("token") },
          }
        );
        setCartItems(response.data.items);
      } catch (error) {
        console.log("Error fetching cart", error);
      }
    };
    if (user) {
      fetchCart();
    }
  }, [user]);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = cartItems.reduce(
        (acc, item) => acc + item.productId.price * item.qty,
        0
      );
      setTotalPrice(total);
    };
    calculateTotalPrice();
  }, [cartItems]);

  const handleRemoveItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:3000/api/cart/delete`, {
        data: { userId: user.id, productId: itemId },
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.productId._id !== itemId)
      );
      toast.success("Product removed", { autoClose: 1000 });
    } catch (error) {
      console.log("Error removing item from cart", error);
    }
  };

  const handleUpdateQuantity = async (itemId, qty) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/cart/update`,
        {
          userId: user.id,
          productId: itemId,
          qty,
        },
        { headers: { "x-auth-token": localStorage.getItem("token") } }
      );

      if (response.status === 200) {
        // console.log("Response data:", response.data); // Debug log
        const updatedItem = response.data;
        const updatedItems = cartItems.map((item) =>
          item.productId._id === itemId
            ? { ...item, qty: updatedItem.qty } // Update the quantity of the specific item
            : item
        );
        // console.log("Updated items: ", updatedItems); //Debug log
        // console.log("Updated item:", updatedItem); // Debug log
        setCartItems(updatedItems);
        const total = updatedItems.reduce(
          (acc, item) => acc + item.productId.price * item.qty,
          0
        );
        setTotalPrice(total);
      } else {
        console.log("Error updating item quantity:", response.statusText);
      }
    } catch (error) {
      console.log("Error updating item quantity", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col lg:flex-row justify-between items-center"
            >
              <div className="flex-1 mb-4 lg:mb-0">
                <h3 className="text-xl font-bold">{item.productId?.title}</h3>
              </div>
              <div className="flex flex-col lg:flex-row items-center">
                <div className="flex items-center mb-4 lg:mb-0 lg:mr-4">
                  <button
                    className="text-indigo-500 hover:text-indigo-700"
                    onClick={() =>
                      handleUpdateQuantity(item.productId._id, item.qty - 1)
                    }
                    disabled={item.qty === 1}
                  >
                    -
                  </button>
                  <span className="mx-2">{item.qty}</span>
                  <button
                    className="text-indigo-500 hover:text-indigo-700"
                    onClick={() =>
                      handleUpdateQuantity(item.productId._id, item.qty + 1)
                    }
                  >
                    +
                  </button>
                </div>
                <div className="text-lg font-semibold text-indigo-500">
                  $ {item.productId?.price * item.qty}
                </div>
                <button
                  className="ml-4 text-red-500 hover:text-red-700"
                  onClick={() => handleRemoveItem(item.productId._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="text-right">
            <h2 className="text-xl font-bold">Total: $ {totalPrice}</h2>
          </div>
        </div>
      )}
      <Link
        to={`/products`}
        className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
      >
        Browse Products
      </Link>
      <Link
        to={`/checkout`}
        className="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
      >
        Checkout
      </Link>
    </div>
  );
};

export default CartPage;
