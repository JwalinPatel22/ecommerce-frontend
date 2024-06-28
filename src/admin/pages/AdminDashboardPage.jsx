import React from "react";
import Card from "../../components/Card";
import { Link } from "react-router-dom";
import { FaBoxes, FaShoppingCart, FaUser } from "react-icons/fa";

const AdminDashboardPage = () => {
  return (
    <section className="py-4">
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-3 gap-4 p-4 rounded-lg">
          <Card bg="bg-violet-200">
            <div className="grid grid-cols-2 items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold">Products</h2>
                <p className="mt-2 mb-4">Manage orders</p>
                <Link
                  to="/admin/products"
                  className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
                >
                  View Products
                </Link>
              </div>
              <div className="flex justify-center items-center">
                <FaBoxes size={80} />
              </div>
            </div>
          </Card>
          <Card bg="bg-violet-200">
            <div className="grid grid-cols-2 items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold">Customers</h2>
                <p className="mt-2 mb-4">Manage Customers</p>
                <Link
                  to="/admin/customers"
                  className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
                >
                  Manage Customers
                </Link>
              </div>
              <div className="flex justify-center items-center">
                <FaUser size={80} />
              </div>
            </div>
          </Card>
          <Card bg="bg-violet-200">
            <div className="grid grid-cols-2 items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold">Orders</h2>
                <p className="mt-2 mb-4">View orders</p>
                <Link
                  to="/admin/orders"
                  className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
                >
                  View Orders
                </Link>
              </div>
              <div className="flex justify-center items-center">
                <FaShoppingCart size={80} />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboardPage;
