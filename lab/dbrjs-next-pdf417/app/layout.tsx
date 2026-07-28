import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "PDF417 Scanner — Dynamsoft Barcode Reader Next.js Sample",
  description: "Scan PDF417 barcodes from camera or image using a custom template with Dynamsoft Barcode Reader.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/scanner">Camera Scanner</Link>
          <Link href="/upload">Image Upload</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
