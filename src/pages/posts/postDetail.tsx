import { Link, useParams } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { postsData } from "../../data/Posts.data"

export function PostDetail() {
  const { id } = useParams()
  const post = postsData.find(
    (item) => item.id === Number(id)
  )

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl space-y-4 py-10">
        <h1 className="text-2xl font-bold">
          Post Not Found
        </h1>

        <p className="text-muted-foreground">
          The post you are looking for does not exist.
        </p>

        <Link
          to="/posts"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary"
        >
          <ArrowLeft size={16} />
          Back to Posts
        </Link>
      </div>
    )
  }

  return (
    <main className="mx-auto w-full max-w-3xl space-y-8 py-6">
      <Link
        to="/posts"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft size={16} />
        Back to Posts
      </Link>

      <article className="space-y-6">
        <div className="space-y-3">
          <span className="text-sm font-medium text-primary">
            POST #{post.id}
          </span>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {post.title}
          </h1>

          <p className="text-base leading-relaxed text-muted-foreground">
            {post.description}
          </p>
        </div>

        <div className="border-t pt-6">
          <p className="text-base leading-8 text-foreground">
            {post.content}
          </p>
        </div>
      </article>
    </main>
  )
}