import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Content Template Generator",
  description: "Generate structured content from prompts using templates"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
