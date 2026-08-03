import type { Metadata } from "next";
import { Mulish, Roboto } from "next/font/google";
import "@/styles/niche-blog/niche-blog.css";

const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-muli",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  icons: { icon: "/niche-blog/images/favicon.png" },
};

export default function NicheBlogLayout({ children }: { children: React.ReactNode }) {
  return <div className={`nb-page ${mulish.variable} ${roboto.variable}`}>{children}</div>;
}
