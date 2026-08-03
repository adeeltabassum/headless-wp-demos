import type { Metadata } from "next";
import Link from "next/link";
import { demoProjects } from "@/lib/demos";

export const metadata: Metadata = {
  title: "Project Demos | Headless WP",
  description: "Browse all recreated website demos in one place.",
};

export default function DemosPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f5] text-[#141414]">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#666]">
          Client demos
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
          Project gallery
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#444]">
          Open any project below. One public link for everything — no temporary
          tunnels needed after this site is deployed.
        </p>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {demoProjects.map((project) => (
            <li key={project.id}>
              <Link
                href={project.href}
                className="group flex h-full flex-col rounded-2xl border border-[#e4e4e0] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#cfcfc8] hover:shadow-md"
              >
                <span className="inline-flex w-fit rounded-full bg-[#f0f0ec] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#555]">
                  {project.tag}
                </span>
                <h2 className="mt-4 text-xl font-bold group-hover:text-[#0b5fff]">
                  {project.name}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#555]">
                  {project.description}
                </p>
                <span className="mt-6 inline-flex items-center text-sm font-semibold text-[#0b5fff]">
                  Open project
                  <span className="ml-1 transition group-hover:translate-x-0.5">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-12 text-sm text-[#666]">
          Share this page after deploy:{" "}
          <code className="rounded bg-white px-1.5 py-0.5 text-[#222]">
            your-domain.com/demos
          </code>
        </p>
      </div>
    </main>
  );
}
