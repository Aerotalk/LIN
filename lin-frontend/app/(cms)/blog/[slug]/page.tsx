import { sanityClient } from "@/sanity/client";
import { blogPostBySlugQuery, allBlogPostsQuery } from "@/sanity/queries";
import { PortableText } from "next-sanity";

interface BlogPost {
  title: string;
  content: any;
}

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const posts = await sanityClient.fetch<{ slug: string }[]>(
      allBlogPostsQuery
    );
    return posts.map((post) => ({ slug: post.slug }));
  } catch (error) {
    console.error("Error fetching blog posts for static params:", error);
    return [];
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await sanityClient.fetch<BlogPost>(blogPostBySlugQuery, {
    slug,
  });

  if (!post) {
    return <div className="p-10">Post not found</div>;
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-4 text-3xl font-bold">{post.title}</h1>
      <PortableText value={post.content} />
    </main>
  );
}
