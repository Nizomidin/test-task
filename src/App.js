import React from "react";
import RegisterPage from "./Register";
import "./App.css"; 
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Products from "./Products";
import Login from "./Login";
export function App() {
    return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="register" element={<RegisterPage />} />
          <Route path="products" element={<Products />} />
          <Route path="/" element={<Login />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}
