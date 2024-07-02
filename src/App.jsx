import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import ProductsPage from "./pages/ProductsPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProductPage, { productLoader } from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./admin/components/AdminProtectedRoute";

import AdminLoginPage from "./admin/pages/AdminLoginPage";
import AdminProductPage, {
  adminProductLoader,
} from "./admin/pages/AdminProductPage";
import AdminProductsPage from "./admin/pages/AdminProductsPage";
import EditProductPage from "./admin/pages/EditProductPage";
import AdminDashboardPage from "./admin/pages/AdminDashboardPage";
import AddProductPage from "./admin/pages/AddProductPage";
import AdminOrdersPage from "./admin/pages/AdminOrdersPage";
import AdminOrderPage, {adminOrderLoader} from "./admin/pages/AdminOrderPage";
import AdminLayout from "./layouts/AdminLayout";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />

          <Route
            path="/product/:id"
            element={<ProductPage />}
            loader={productLoader}
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route path="/checkout" element={<OrderSuccessPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminLoginPage />} />
          <Route
            path="dashboard"
            element={
              <AdminProtectedRoute>
                <AdminDashboardPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="add-product"
            element={
              <AdminProtectedRoute>
                <AddProductPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="edit-product/:id"
            element={
              <AdminProtectedRoute>
                <EditProductPage />
              </AdminProtectedRoute>
            }
            loader={adminProductLoader}
          />
          <Route
            path="products"
            element={
              <AdminProtectedRoute>
                <AdminProductsPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="product/:id"
            element={
              <AdminProtectedRoute>
                <AdminProductPage />
              </AdminProtectedRoute>
            }
            loader={adminProductLoader}
          />
          <Route
            path="orders"
            element={
              <AdminProtectedRoute>
                <AdminOrdersPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="order/:id"
            element={
              <AdminProtectedRoute>
                <AdminOrderPage />
              </AdminProtectedRoute>
            }
            loader={adminOrderLoader}
          />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
}
