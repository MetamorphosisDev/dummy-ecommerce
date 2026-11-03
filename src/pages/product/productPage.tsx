import { productsData } from "@/data/Posts.data"
import CardProduct from "@/components/cardProduct"

export function ProductPage() {
  return (
    <section className="min-h-screen bg-white px-6 py-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10">
          <p className="mb-2 text-sm font-medium text-gray-400">
            OUR COLLECTION
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Daftar Produk
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Temukan berbagai produk pilihan kami.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {productsData.map((item) => (
            <CardProduct
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              category={item.category}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </section>
  )
}