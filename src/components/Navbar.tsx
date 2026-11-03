import { Link, NavLink } from "react-router-dom"
import { ShoppingBag, ShoppingCart } from "lucide-react"
import { getCart } from "@/service/sessionStorage"
import { useState, useEffect } from "react"

const Navbar = () => {

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Product", href: "/product" },
  ]
  const [totalCartQuantity, setTotalCartQuantity] = useState(0)

  useEffect(() => {
    const card = getCart().products

    setTotalCartQuantity(
      card.reduce((total, item) => total + item.quantity, 0)
    )
  }, [])
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-white">
            <ShoppingBag size={19} />
          </div>

          <span className="text-xl font-bold tracking-tight text-gray-900">
            MyStore
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === "/"}
              className={({ isActive }) =>
                `rounded-lg px-4 py-2 text-sm font-medium transition-colors ${isActive
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          {/* Cart */}
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `ml-2 flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${isActive
                ? "bg-primary/10 text-primary"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <span className="relative">
              <ShoppingCart size={19} />

              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold leading-none text-white">
                {totalCartQuantity}
              </span>
            </span>

            <span>Cart</span>
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

export default Navbar