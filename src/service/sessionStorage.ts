
import type { Product } from "@/data/Posts.data"
import type { checkoutCartType } from "./localStorage"

export interface Cart {
  IdCart: string
  products: (Product & { quantity: number })[]
}

const CART_KEY = "store-cart"

export const getCart = (): Cart => {
  const cart = sessionStorage.getItem(CART_KEY)

  if (cart) {
    return JSON.parse(cart)
  }

  return {
    IdCart: crypto.randomUUID(),
    products: [],
  }
}

export const saveCart = (cart: Cart) => {
  sessionStorage.setItem(CART_KEY, JSON.stringify(cart))
}

export const addCart = (product: Product) => {
  const cart = getCart()

  const existingProduct = cart.products.find(
    (item) => item.id === product.id
  )

  if (existingProduct) {
    existingProduct.quantity += 1
  } else {
    cart.products.push({
      ...product,
      quantity: 1,
    })
  }

  saveCart(cart)
}

export const clearCart = () => {
  const cart = getCart()
  cart.products = []
  saveCart(cart)
}

export const removeCart = (id: number) => {
  const cart = getCart()

  cart.products = cart.products.filter(
    (item) => item.id !== id
  )

  saveCart(cart)
}

export const updateCartQuantity = (id: number, quantity: number) => {
  const cart = getCart()

  if (quantity <= 0) {
    cart.products = cart.products.filter(
      (item) => item.id !== id
    )
  } else {
    const product = cart.products.find(
      (item) => item.id === id
    )

    if (product) {
      product.quantity = quantity
    }
  }

  saveCart(cart)
}
