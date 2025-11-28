import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

interface BlogCardProps {
    title: string;
    slug: string;
    excerpt?: string;
    coverImage?: SanityImageSource;
    publishedAt: string;
    categories?: string[];
    featured?: boolean;
}

export default function BlogCard({
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt,
    categories = [],
    featured = false,
}: BlogCardProps) {
    const imageUrl = coverImage
        ? urlFor(coverImage).width(800).height(600).url()
        : "/placeholder-blog.jpg";

    const formattedDate = new Date(publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    if (featured) {
        return (
            <Link href={`/blog/${slug}`}>
                <article className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 p-1 shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl">
                    <div className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-900">
                        <div className="relative h-[400px] w-full overflow-hidden">
                            <Image
                                src={imageUrl}
                                alt={title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                sizes="(max-width: 1200px) 100vw, 1200px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                {categories.length > 0 && (
                                    <div className="mb-3 flex flex-wrap gap-2">
                                        {categories.map((category) => (
                                            <span
                                                key={category}
                                                className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-sm"
                                            >
                                                {category}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                <h2 className="mb-2 text-3xl font-bold md:text-4xl">
                                    {title}
                                </h2>
                                {excerpt && (
                                    <p className="mb-3 line-clamp-2 text-gray-200 md:text-lg">
                                        {excerpt}
                                    </p>
                                )}
                                <p className="text-sm text-gray-300">{formattedDate}</p>
                            </div>
                        </div>
                    </div>
                </article>
            </Link>
        );
    }

    return (
        <Link href={`/blog/${slug}`}>
            <article className="group h-full overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:bg-gray-800">
                <div className="relative h-48 w-full overflow-hidden">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
                <div className="p-6">
                    {categories.length > 0 && (
                        <div className="mb-3 flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <span
                                    key={category}
                                    className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                                >
                                    {category}
                                </span>
                            ))}
                        </div>
                    )}
                    <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                        {title}
                    </h3>
                    {excerpt && (
                        <p className="mb-3 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
                            {excerpt}
                        </p>
                    )}
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formattedDate}
                    </p>
                </div>
            </article>
        </Link>
    );
}
