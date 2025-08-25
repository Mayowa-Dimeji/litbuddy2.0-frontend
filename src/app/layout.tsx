import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "LitBuddy",
  description: "Your Reading Buddy",
  icons: {
    icon: "https://img.icons8.com/?size=100&id=D45ofLrj1Mp5&format=png&color=000000",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
          <div className="mx-auto max-w-md px-4 h-12 flex items-center justify-between">
            <Link href="/" className="font-semibold">
              <div className="flex flex-row items-center flex-wrap gap-2">
                <Image
                  src="/lit.png"
                  alt="brand"
                  width={50}
                  height={50}
                  priority
                />{" "}
                LitBuddy
              </div>
            </Link>
            <nav className="text-sm text-slate-500"> </nav>
          </div>
        </header>
        <main className="mx-auto max-w-md px-4 py-4">{children}</main>
      </body>
    </html>
  );
}
