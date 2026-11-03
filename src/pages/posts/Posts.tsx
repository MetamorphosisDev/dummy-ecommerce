import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"
import { postsData } from "../../data/Posts.data"

export function Posts() {
  return (
    <main className="mx-auto w-full max-w-6xl space-y-8">
      {/* Heading */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          All Posts
        </h1>

        <p className="text-sm text-muted-foreground">
          Explore all our latest articles and stories.
        </p>
      </div>

      {/* Posts List */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {postsData.map((post) => (
          <article
            key={post.id}
            className="group flex flex-col rounded-xl border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex-1 space-y-3">
              <span className="text-xs font-medium text-primary">
                POST #{post.id}
              </span>

              <h2 className="text-xl font-semibold">
                {post.title}
              </h2>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {post.description}
              </p>
            </div>

            <Link
              to={`/posts/${post.id}`}
              className="mt-6 flex w-fit items-center gap-2 text-sm font-medium text-primary"
            >
              View Details
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </article>
        ))}
      </div>
    </main>
  )
}