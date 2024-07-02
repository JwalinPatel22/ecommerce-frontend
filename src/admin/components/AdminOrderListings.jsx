import { useState, useEffect } from "react";
import Spinner from "../../components/Spinner";
import AdminOrderListing from "./AdminOrderListing";
import axios from "axios";

function AdminOrderListings() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:3000/admin/orders");
        setOrders(res.data);
      } catch (error) {
        console.log("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {orders.map((order) => {
              return <AdminOrderListing key={order._id} order={order} />;
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default AdminOrderListings;
