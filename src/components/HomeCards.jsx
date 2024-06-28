import Card from "./Card";
import { Link } from "react-router-dom";

export default function HomeCards() {
  return (
    <section className="py-4">
      <div className="container-full lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <Card bg="bg-violet-200">
            <h2 className="text-2xl font-bold">Explore Products</h2>
            <p className="mt-2 mb-4">
              Explore our wide range of products for an ultimate shopping
              experience
            </p>
            <Link
              to="/products"
              className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
            >
              Browse Products
            </Link>
          </Card>
          <Card bg="bg-violet-200">
            <h2 className="text-2xl font-bold">Cart</h2>
            <p className="mt-2 mb-4">
              View products added in your cart
            </p>
            <Link
              to="/cart"
              className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
            >
              View Cart
            </Link>
          </Card>
        </div>
      </div>
    </section>
  );
}
