import { sanityClient } from "@/sanity/client";
import { allBlogPostsQuery } from "@/sanity/queries";
import BlogCard from "@/components/blog/BlogCard";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

interface BlogPostSummary {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: SanityImageSource;
  publishedAt: string;
  categories?: string[];
}

export const revalidate = 60; // ISR

export default async function BlogPage() {
  let posts: BlogPostSummary[] = [];
  try {
    posts = await sanityClient.fetch(allBlogPostsQuery);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
  }

  const [featuredPost, ...regularPosts] = posts;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-5xl font-extrabold text-transparent md:text-6xl">
            Blogs
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Insights, stories, and updates from our team
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-16">
            <BlogCard {...featuredPost} featured />
          </div>
        )}

        {/* Regular Posts Grid */}
        {regularPosts.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {regularPosts.map((post) => (
              <BlogCard key={post._id} {...post} />
            ))}
          </div>
        )}

        {posts.length === 0 && (
          <div className="rounded-xl bg-white p-12 text-center shadow-lg dark:bg-gray-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              No posts yet
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Check back later for new content!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
