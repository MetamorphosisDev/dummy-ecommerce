import { Check, ShoppingCart } from "lucide-react"
import { addCart, getCart } from "@/service/sessionStorage"
import { useState } from "react"

interface CardProductProps {
  id: number
  name: string
  price: number
  category: string
  image: string
}

const CardProduct = ({
  id,
  name,
  price,
  category,
  image,
}: CardProductProps) => {
  const [quantity, setQuantity] = useState(() => {
    return getCart().products.find((item) => item.id === id)?.quantity || 0
  })

  const handleAddCart = () => {
    addCart({
      id,
      name,
      price,
      category,
      image,
      description: "",
    })

    const cart = getCart()
    const product = cart.products.find((item) => item.id === id)

    setQuantity(product?.quantity || 0)
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="aspect-square bg-gray-50 p-5">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-contain"
        />
      </div>

      <div className="space-y-3 p-4">
        <p className="text-xs text-gray-500">{category}</p>

        <h3 className="font-semibold">{name}</h3>

        <p className="font-bold">
          Rp{price.toLocaleString("id-ID")}
        </p>

        <button
          onClick={handleAddCart}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-black px-4 py-3 text-sm font-medium text-white hover:bg-gray-800"
        >
          {quantity > 0 ? (
            <>
              <Check size={17} />
              Added to Cart ({quantity})
            </>
          ) : (
            <>
              <ShoppingCart size={17} />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default CardProduct