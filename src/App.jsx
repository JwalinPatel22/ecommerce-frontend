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
import AddProductPage from "./pages/AddProductPage";
import EditProductPage from "./pages/EditProductPage";
import axios from "axios";

export default function App() {
  //Add new job
  const addProduct = async (newProduct) => {
    const res = await axios.post("http://localhost:3000/api/product", {
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    return;
  };

  //delete product
  const deleteProduct = async (id) => {
    const res = await axios.delete(
      `http://localhost:3000/api/product/${product._id}`
    );
    return;
  };

  // //update product
  // const updateProduct = async (product) => {
  //   const res = await axios.put(`http://localhost:3000/api/product/${product.id}`, product, {
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //   });
  //   return;
  // };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route
          path="/add-product"
          element={<AddProductPage addProductSubmit={addProduct} />}
        />
        <Route
          path="/product/:id"
          element={<ProductPage deleteProduct={deleteProduct} />}
          loader={productLoader}
        />
        <Route
          path="/edit-product/:id"
          element={
            <EditProductPage
            //  updateProductSubmit={updateProduct}
            />
          }
          loader={productLoader}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
