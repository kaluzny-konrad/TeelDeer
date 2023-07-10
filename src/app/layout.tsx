import { Inter } from "next/font/google";

import "@/styles/globals.css";
import Navbar from "@/components/navbar/Navbar";
import Providers from "@/components/providers/Providers";
import { Toaster } from "@/components/ui/Toaster";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TeelDeer",
  description:
    "TeelDeer (tl;dr) - summaries of interesting articles - especially scientific articles, discussions on their interpretation.",
};

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode;
  authModal: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "bg-white text-slate-900 antialiased light",
        inter.className
      )}
    >
      <body className="min-h-screen pt-12 bg-slate-50 antialiased">
        <Providers>
          <Navbar />

          {authModal}

          <div className="container max-w-7xl mx-auto h-full pt-12">
            {children}
          </div>

          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
