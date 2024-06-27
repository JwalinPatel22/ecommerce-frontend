import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

// export default function Navbar() {
//   const {user} = useContext(AuthContext);
//   const LinkClass = ({ isActive }) =>
//     isActive
//       ? "text-white bg-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
//       : "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2";
//   return (
//     <nav className="bg-indigo-700 border-b border-indigo-500">
//       <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
//         <div className="flex h-20 items-center justify-between">
//           <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
//             <NavLink
//               className="flex flex-shrink-0 items-center mr-4"
//               to="/"
//             >
//               <img
//                 className="h-10 w-auto"
//                 src={logo}
//                 alt="Ecommerce Store"
//               />
//               <span className="hidden md:block text-white text-2xl font-bold ml-2">
//                 ECommerce WebStore
//               </span>
//             </NavLink>
//             <div className="md:ml-auto">
//               <div className="flex space-x-2">
//               <span className="hidden md:block text-white text-2xl font-bold ml-2">
//                 {AuthContext}
//               </span>
//                 <NavLink to="/" className={LinkClass}>
//                   Home
//                 </NavLink>
//                 <NavLink to="/products" className={LinkClass}>
//                   Products
//                 </NavLink>
//                 {/* <NavLink to="/add-product" className={LinkClass}>
//                   Add Product
//                 </NavLink> */}
//                 <NavLink to="/cart" className={LinkClass}>
//                   Cart
//                 </NavLink>
//                 {user ? (
//                   <span className="hidden md:block text-white text-2xl font-bold ml-2">
//                   {user.name}
//                 </span>
//                 ) : <span></span>}
                
//                 <NavLink to="/login" className={LinkClass}>
//                   Login
//                 </NavLink>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }


export default function Navbar() {
  const { user, loginStatus } = useContext(AuthContext);

  const LinkClass = ({ isActive }) =>
    isActive
      ? "text-white bg-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
      : "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2";

  return (
    <nav className="bg-indigo-700 border-b border-indigo-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
              <img className="h-10 w-auto" src={logo} alt="Ecommerce Store" />
              <span className="hidden md:block text-white text-2xl font-bold ml-2">
                ECommerce WebStore
              </span>
            </NavLink>
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <NavLink to="/" className={LinkClass}>
                  Home
                </NavLink>
                <NavLink to="/products" className={LinkClass}>
                  Products
                </NavLink>
                <NavLink to="/cart" className={LinkClass}>
                  Cart
                </NavLink>
                {loginStatus ? (
                  <span className="hidden md:block text-white text-2xl font-bold ml-2">
                    {user.name}
                  </span>
                ) : (
                  <NavLink to="/login" className={LinkClass}>
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
