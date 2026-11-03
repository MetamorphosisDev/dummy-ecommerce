
import { useState } from "react"
import { Link } from "react-router-dom"
import {
  ShoppingCart,
  Trash2,
  ArrowLeft,
  ShoppingBag,
  Minus,
  Plus,
} from "lucide-react"

import {
  clearCart,
  getCart,
  removeCart,
  updateCartQuantity,
  type Cart,
} from "@/service/sessionStorage"

import {
  SetItemLocal,
  type checkoutCartType,
} from "@/service/localStorage"

export function CartPage() {
  const [cart, setCart] = useState<Cart>(() => getCart())

  const totalItems = cart.products.reduce(
    (total, item) => total + item.quantity,
    0
  )

  const totalPrice = cart.products.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const formatPrice = (price: number) => {
    return `Rp${price.toLocaleString("id-ID")}`
  }

  const refreshCart = () => {
    setCart(getCart())
    window.dispatchEvent(new Event("cartUpdated"))
  }

  const handleRemove = (id: number) => {
    removeCart(id)
    refreshCart()
  }

  const handleQuantity = (id: number, quantity: number) => {
    updateCartQuantity(id, quantity)
    refreshCart()
  }

  const checkoutReload = () => {
    const checkoutData: checkoutCartType = {
      ...cart,
      totalItems,
      totalPrice,
    }

    SetItemLocal(checkoutData)
    clearCart()
    refreshCart()
  }

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <Link
            to="/product"
            className="mb-5 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-black"
          >
            <ArrowLeft size={16} />
            Continue Shopping
          </Link>

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-black p-3 text-white">
              <ShoppingCart size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Shopping Cart
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Review your selected products before checkout.
              </p>
            </div>
          </div>
        </div>

        {/* Empty Cart */}
        {cart.products.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white px-6 py-16 text-center">
            <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-gray-100">
              <ShoppingBag size={28} className="text-gray-400" />
            </div>

            <h2 className="text-xl font-semibold text-gray-900">
              Your cart is empty
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              You haven't added any products to your cart yet.
            </p>

            <Link
              to="/product"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Explore Products
              <ArrowLeft size={16} className="rotate-180" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_340px]">

            {/* Product List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">
                  Cart Items
                </h2>

                <span className="text-sm text-gray-500">
                  {totalItems} items
                </span>
              </div>

              {cart.products.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-4 sm:flex-row sm:items-center"
                >
                  {/* Product Image */}
                  <div className="flex size-24 shrink-0 items-center justify-center rounded-xl bg-gray-50 p-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  {/* Product Information */}
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-400">
                      {item.category}
                    </p>

                    <h3 className="mt-1 font-semibold text-gray-900">
                      {item.name}
                    </h3>

                    <p className="mt-2 text-sm font-medium text-gray-700">
                      {formatPrice(item.price)}
                    </p>

                    {/* Quantity Control */}
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex items-center overflow-hidden rounded-lg border border-gray-200">
                        <button
                          type="button"
                          onClick={() =>
                            handleQuantity(item.id, item.quantity - 1)
                          }
                          className="flex size-9 items-center justify-center text-gray-600 transition hover:bg-gray-100 active:bg-gray-200"
                          aria-label={`Kurangi jumlah ${item.name}`}
                        >
                          <Minus size={16} />
                        </button>

                        <span className="flex h-9 min-w-10 items-center justify-center border-x border-gray-200 px-3 text-sm font-semibold text-gray-900">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            handleQuantity(item.id, item.quantity + 1)
                          }
                          className="flex size-9 items-center justify-center text-gray-600 transition hover:bg-gray-100 active:bg-gray-200"
                          aria-label={`Tambah jumlah ${item.name}`}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Subtotal and Remove */}
                  <div className="flex items-center justify-between border-t border-gray-100 pt-3 sm:flex-col sm:items-end sm:border-0 sm:pt-0">
                    <p className="font-semibold text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </p>

                    <button
                      type="button"
                      onClick={() => handleRemove(item.id)}
                      className="mt-2 inline-flex items-center gap-1.5 text-sm text-red-500 transition hover:text-red-700"
                    >
                      <Trash2 size={15} />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <aside className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-lg font-semibold text-gray-900">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Total Items</span>

                  <span className="font-medium text-gray-900">
                    {totalItems}
                  </span>
                </div>

                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>

                  <span className="font-medium text-gray-900">
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">
                      Total
                    </span>

                    <span className="text-lg font-bold text-gray-900">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                onClick={checkoutReload}
                disabled={cart.products.length === 0}
                className="mt-6 w-full rounded-lg bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                Checkout
              </button>

              <p className="mt-3 text-center text-xs text-gray-400">
                Review your order before proceeding.
              </p>
            </aside>
          </div>
        )}
      </div>
    </section>
  )
}
