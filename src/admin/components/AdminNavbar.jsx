import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { AdminAuthContext } from "../AdminAuthContext";
import { useContext } from "react";
import { FaUser } from "react-icons/fa";

export default function AdminNavbar() {
  const { admin, loginStatus } = useContext(AdminAuthContext);

  const destination = loginStatus ? "/admin/dashboard" : "/admin";
  const LinkClass = ({ isActive }) =>
    isActive
      ? "text-white bg-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
      : "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2";

  return (
    <nav className="bg-indigo-700 border-b border-indigo-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <NavLink
              className="flex flex-shrink-0 items-center mr-4"
              to={destination}
            >
              <img className="h-10 w-auto" src={logo} alt="Ecommerce Store" />
              <span className="hidden md:block text-white text-2xl font-bold ml-2">
                Webstore Admin Section
              </span>
            </NavLink>
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <NavLink to="/admin/dashboard" className={LinkClass}>
                  Dashboard
                </NavLink>
                <NavLink to="/admin/products" className={LinkClass}>
                  Products
                </NavLink>
                <NavLink to="/admin/add-product" className={LinkClass}>
                  Create Product
                </NavLink>
                {loginStatus ? (
                  <span className="text-white grid grid-rows-2 items-center justify-items-center">
                    <FaUser className="text-white" />
                    {admin.name}
                  </span>
                ) : (
                  <NavLink to="/admin" className={LinkClass}>
                    Login
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
