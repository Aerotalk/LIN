export { metadata, viewport } from "next-sanity/studio";

export const runtime = "nodejs";

export default function StudioLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
