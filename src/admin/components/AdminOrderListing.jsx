import { Link } from "react-router-dom";

function AdminOrderListing({ order }) {
  const OrderStatus =
    order.status === "Pending"
      ? " p-4 mb-6 bg-red-200 rounded-md shadow-md relative"
      : " p-4 mb-6 bg-green-200 rounded-md shadow-md relative";

  return (
    <div className="bg-white rounded-xl shadow-2xl relative">
      <div className="p-4">
        <div className={OrderStatus}>
          <h3 className="text-xl font-bold"> Order ID: {order._id} </h3>
          <h3 className="text-xl font-bold">
            {" "}
            Customer Name: {order.userId.name}{" "}
          </h3>
        </div>
        <h3 className="text-indigo-800 text-lg font-bold mb-2">Items</h3>
        <ul className="mb-4">
          {order.items.map((item) => (
            <li key={item.productId._id}>
              {item.productId.title} - Quantity: {item.qty}
            </li>
          ))}
        </ul>
        <h3 className="text-indigo-500 mb-2"> Total: $ {order.totalAmount}</h3>
        <h3 className="text-indigo-500 mb-2"> Order Status: {order.status}</h3>
        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <Link
            to={`/admin/order/${order._id}`}
            className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminOrderListing;
