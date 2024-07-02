import { FaArrowLeft } from "react-icons/fa";
import { useParams, useLoaderData, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function AdminOrderPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const order = useLoaderData();

  const handleDispatchOrder = async (orderId) => {
    const confirm = window.confirm(
      "Are you sure you want to dispatch this order?"
    );
    if (!confirm) {
      return;
    }
    try {
      await axios.patch(
        `http://localhost:3000/admin/order/dispatch/${orderId}`
      );
      toast.success("Order Dispatched Successfully", { autoClose: 500 });
      navigate("/admin/orders");
    } catch (error) {
      console.log("Error dispatching order", error);
      toast.error("Cannot dispatch order");
    }
  };

  return (
    <>
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            to="/admin/orders"
            className="text-indigo-500 hover:text-indigo-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Orders Page
          </Link>
        </div>
      </section>

      <section className="bg-indigo-100">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <main>
              <div className="bg-white p-6 rounded-lg shadow-2xl text-center md:text-left">
                <h1 className="text-3xl font-bold mb-4">
                  Order ID: {order._id}
                </h1>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-2xl mt-6">
                <h3 className="text-indigo-800 text-lg font-bold mb-6">
                  Order Details
                </h3>

                <p className="mb-4">
                  <strong>Customer Name:</strong> {order.userId.name}
                </p>

                <div className="mb-4">
                  <p className="mb-4">
                    <strong>Items:</strong>
                  </p>
                  <table className="mb-4 w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">
                          Product
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                          Quantity
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item) => (
                        <tr
                          key={item.productId._id}
                          className="border border-gray-300"
                        >
                          <td className="border border-gray-300 px-4 py-2">
                            {item.productId.title}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {item.qty}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* {order.items.map((item) => (
                    <li key={item.productId._id}>
                      {item.productId.title} - Quantity: {item.qty}
                    </li>
                  ))} */}
                </div>
                    <hr className="p-4"/>
                <h3 className="text-indigo-800 text-lg font-bold mb-2">
                  Total Price
                </h3>
                <p className="mb-4">${order.totalAmount}</p>

                <h3 className="text-indigo-800 text-lg font-bold mb-2">
                  Order Status
                </h3>
                <p className="mb-4">{order.status}</p>
              </div>
              <button
                className="bg-green-500 text-white shadow-xl px-4 py-2 rounded mt-4"
                onClick={() => handleDispatchOrder(order._id)}
              >
                Dispatch Order
              </button>
            </main>
          </div>
        </div>
      </section>
    </>
  );
}

// Fetching order with a particular id from the database
const adminOrderLoader = async ({ params }) => {
  const res = await axios.get(`http://localhost:3000/admin/order/${params.id}`);
  return res.data;
};

export { AdminOrderPage as default, adminOrderLoader };
