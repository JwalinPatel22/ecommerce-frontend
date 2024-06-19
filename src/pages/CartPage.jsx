import axios from "axios";
import { useEffect, useState, useSyncExternalStore } from "react";

const CartPage = ({userId}) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCart = async (userId) => {
      try {
        const response = await axios.get(
          `http://localhost:3000/cart/${userId}`
        );
        setCartItems(res.data.items);
      } catch (error) {
        console.log("Error fetching cart", error);
      }
    };
    fetchCart();
  }, [userId]);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = cartItems.reduce(
        (acc, item) => acc + item.price + item.qty,
        0
      );
      setTotalPrice(total);
    };
    calculateTotalPrice();
  }, [cartItems]);

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
                <h3 className="text-xl font-bold">{item.productId.title}</h3>
                <p className="text-gray-500">
                  {item.productId.description.substring(0, 90)}...
                </p>
              </div>
              <div className="flex flex-col lg:flex-row items-center">
                <div className="flex items-center mb-4 lg:mb-0 lg:mr-4">
                  <button
                    className="text-indigo-500 hover:text-indigo-700"
                    onClick={() => handleUpdateQuantity(item._id, item.qty - 1)}
                    disabled={item.qty === 1}
                  >
                    -
                  </button>
                  <span className="mx-2">{item.qty}</span>
                  <button
                    className="text-indigo-500 hover:text-indigo-700"
                    onClick={() => handleUpdateQuantity(item._id, item.qty + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="text-lg font-semibold text-indigo-500">
                  $ {item.price * item.qty}
                </div>
                <button
                  className="ml-4 text-red-500 hover:text-red-700"
                  onClick={() => handleRemoveItem(item._id)}
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
    </div>
  );
};

export default CartPage;
