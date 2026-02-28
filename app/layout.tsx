import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";

const raleway = Raleway({ subsets: ["latin"], weight: ["300", "400", "700", "800"] });

export const metadata: Metadata = {
  title: "DIANOIA",
  description: "",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={raleway.className}>{children}</body>
    </html>
  );
}
