import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/provider";
import { NavBar } from "@/components/base/NavBar";
import { getCookieUserId } from "@/cookies/cookies";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Learnwell - EdTech",
  description: "Watch Educational Videos",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookiesId = await getCookieUserId()

  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>{
          <div className="flex flex-col h-screen">
            <NavBar userId={cookiesId?.value} />
            {children}
          </div>
        }
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
