import { Inter } from "next/font/google";

import "@/styles/globals.css";
import Navbar from "@/components/navbar/Navbar";
import Providers from "@/components/providers/Providers";
import { Toaster } from "@/components/ui/Toaster";
import type { Metadata } from "next";

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
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />

          {authModal}

          {children}

          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
