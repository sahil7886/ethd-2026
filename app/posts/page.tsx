import { PostBoard } from "@/components/PostBoard";
import { listPosts } from "@/lib/postStore";

export default async function PostsPage() {
  const posts = await listPosts();
  return <PostBoard initialPosts={posts} />;
}
