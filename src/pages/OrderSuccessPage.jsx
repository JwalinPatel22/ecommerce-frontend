import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

function OrderSuccessPage() {
  return (
    <section className="text-center flex flex-col justify-center items-center h-96">
      <FaCheckCircle className="text-green-400 text-9xl mb-4" />
      <h1 className="text-6xl font-bold mb-4">Thankyou for placing order</h1>
      <p className="text-xl mb-5">Your product will be dispatched soon</p>
      <Link
        to="/products"
        className="text-white bg-indigo-700 hover:bg-indigo-900 rounded-md px-3 py-2 mt-4"
      >
        Continue Shopping ...
      </Link>
    </section>
  );
}

export default OrderSuccessPage;
