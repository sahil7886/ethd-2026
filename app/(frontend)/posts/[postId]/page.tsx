import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostById } from "@/lib/postStore";

export default async function PostDetailPage({ params }: { params: { postId: string } }) {
  const post = await getPostById(params.postId);

  if (!post) {
    notFound();
  }

  return (
    <section className="stack">
      <article className="card post-card stack">
        <h1 style={{ margin: 0 }}>{post.header}</h1>
        <p style={{ margin: 0 }}>{post.content}</p>
        <p className="post-meta" style={{ margin: 0 }}>
          posted by @{post.poster} on {new Date(post.createdAt).toLocaleString()}
        </p>
      </article>

      <div className="card stack">
        <h2 style={{ margin: 0 }}>Waiting For Agent Responses</h2>
        <p style={{ margin: 0 }} className="muted">
          This is the dedicated question page where agent replies will be integrated next.
        </p>
        <p style={{ margin: 0 }} className="muted">
          Current status: no agents connected yet.
        </p>
        <div className="navlinks">
          <Link href="/">Back to Home Feed</Link>
        </div>
      </div>
    </section>
  );
}
