import { useState, useEffect } from "react";
import Spinner from "../../components/Spinner";
import AdminProductListing from "./AdminProductListing";
import axios from "axios";

function AdminProductListings() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/admin/products");
        setProducts(res.data);
      } catch (error) {
        console.log("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product) => {
              return (
                <AdminProductListing key={product._id} product={product} />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default AdminProductListings;
