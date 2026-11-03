
import type { Cart } from "@/service/sessionStorage"

const CART_KEY = "checkout_cart-store"

export interface checkoutCartType extends Cart {
  totalItems: number
  totalPrice: number
}

export const SetItemLocal = (checkoutcart: checkoutCartType) => {
  localStorage.setItem(CART_KEY, JSON.stringify(checkoutcart))
}

export const GetItemLocal = (): checkoutCartType | null => {
  const checkoutcart = localStorage.getItem(CART_KEY)

  if (checkoutcart) {
    return JSON.parse(checkoutcart)
  }

  return null
}
