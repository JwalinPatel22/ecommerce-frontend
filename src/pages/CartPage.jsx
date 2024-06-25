import axios from "axios";
import { useEffect, useState, useSyncExternalStore } from "react";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/cart/667172b7402a5aa71991b574`
        );
        setCartItems(response.data.items);
      } catch (error) {
        console.log("Error fetching cart", error);
      }
    };
    fetchCart();
  }, []);

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
        data: { userId: "667172b7402a5aa71991b574", productId: itemId },
      });
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.productId._id !== itemId)
      );
    } catch (error) {
      console.log("Error removing item from cart", error);
    }
  };

  const handleUpdateQuantity = async (itemId, newQty) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/cart/update`,
        {
          userId: "667172b7402a5aa71991b574",
          productId: itemId,
          qty: newQty,
        }
      );

      if (
        response.data &&
        response.data.item &&
        response.data.item.qty !== undefined
      ) {
        const updatedItems = cartItems.map((item) => {
          if (item.productId._id === itemId) {
            return { ...item, qty: response.data.item.qty };
          }
          return item;
        });

        setCartItems(updatedItems);

        const total = updatedItems.reduce(
          (acc, item) => acc + item.productId.price * item.qty,
          0
        );
        setTotalPrice(total);
      } else {
        console.log("Error: Unexpected response format", response.data);
        // Handle unexpected response format here, e.g., show an error message to the user
      }
    } catch (error) {
      console.log("Error updating item quantity", error);
      // Handle network errors or other exceptions here
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
                <h3 className="text-xl font-bold">{item.productId.title}</h3>
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
                  $ {item.productId.price * item.qty}
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
    </div>
  );
};

export default CartPage;
