import { Suspense } from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 w-full">
      <Suspense fallback={
        <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
      }>
        {children}
      </Suspense>
    </main>
  );
}
