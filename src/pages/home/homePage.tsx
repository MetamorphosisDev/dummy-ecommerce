import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

export function HomePage() {
  return (
    <main className="flex min-h-[calc(100svh-64px)] items-center justify-center px-6  bg-white">
      <section className="mx-auto max-w-2xl space-y-6 text-center">

        <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
          Welcome to MyStore
        </span>

        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Discover Products
          <span className="block text-primary">
            You’ll Love.
          </span>
        </h1>

        <p className="mx-auto max-w-lg text-base leading-relaxed text-gray-500 sm:text-lg">
          Find your favorite products with a simple and enjoyable shopping experience.
        </p>

        <div className="flex justify-center pt-2">
          <Link
            to="/product"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
          >
            Explore Products
            <ArrowRight size={18} />
          </Link>
        </div>

      </section>
    </main>
  )
}