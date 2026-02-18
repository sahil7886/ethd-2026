export type Post = {
  id: string;
  poster: string;
  header: string;
  content: string;
  createdAt: string;
};

export function createPost(input: { poster: string; header: string; content: string }): Post {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    poster: input.poster.trim() || "anonymous",
    header: input.header.trim(),
    content: input.content.trim(),
    createdAt: new Date().toISOString()
  };
}
