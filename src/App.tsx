import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import { HomePage } from "./pages/home/homePage"
import { ProductPage } from "./pages/product/productPage"
import { CartPage } from "./pages/cart/cartPage"

export default function App() {
  return (
    <div className="min-h-svh bg-white">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </div>
  )
}