import Card from "./Card";
import { Link } from "react-router-dom";

export default function HomeCards() {
  return (
    <section className="py-4">
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <Card bg="bg-violet-200">
            <h2 className="text-2xl font-bold">ECommerce WebStore</h2>
            <p className="mt-2 mb-4">
              Discover our top products for the ultimate shopping experience
            </p>
            <Link
              to="/products"
              className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
            >
              Browse Products
            </Link>
          </Card>
          {/* <Card bg="bg-violet-100">
            <h2 className="text-2xl font-bold">For Sellers</h2>
            <p className="mt-2 mb-4">
              List your products and find the perfect customers
            </p>
            <Link
              to="/add-product"
              className="inline-block bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600"
            >
              Add Products
            </Link>
          </Card> */}
        </div>
      </div>
    </section>
  );
}
