import { useState, useEffect } from "react";
import Spinner from './Spinner';
import ProductListing from "./ProductListing";
import axios from "axios";


function ProductListings({ isHome=false }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
        const apiUrl = isHome ? "http://localhost:3000/api/products?_limit=3" : "http://localhost:3000/api/products";
      try {
        const res = await axios.get(apiUrl);
        setProducts(res.data);
      } catch (error) {
        console.log("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();    
  }, [isHome]);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? "Featured Products" : "Browse Products"}
        </h2>
            { loading ? (<Spinner loading={loading} />) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.map((product) => {
                return <ProductListing key={product._id} product={product} />;
                })}
            </div>)}
      </div>
    </section>
  );
}

export default ProductListings;
