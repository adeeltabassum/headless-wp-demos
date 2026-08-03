import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-16">
      <h1 className="text-3xl font-bold text-[#0c0d0e]">Headless WP</h1>
      <p className="mt-4 text-[#475467]">
        Website recreations built in Next.js. Use the demos gallery to browse
        every project from one place.
      </p>
      <Link
        href="/demos"
        className="mt-8 inline-flex w-fit rounded-lg bg-[#0b5fff] px-5 py-3 text-sm font-semibold text-white hover:bg-[#094fd6]"
      >
        Open project demos →
      </Link>
    </main>
  );
}
