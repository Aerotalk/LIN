import { sanityClient } from "@/sanity/client";
import { allBlogPostsQuery } from "@/sanity/queries";

interface BlogPostSummary {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
}

export const revalidate = 60; // ISR

export default async function BlogPage() {
  let posts: BlogPostSummary[] = [];
  try {
    posts = await sanityClient.fetch(allBlogPostsQuery);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">Blog</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post._id} className="border-b pb-4">
            <a href={`/blog/${post.slug}`} className="block">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              {post.excerpt && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {post.excerpt}
                </p>
              )}
            </a>
          </article>
        ))}
      </div>
    </main>
  );
}
