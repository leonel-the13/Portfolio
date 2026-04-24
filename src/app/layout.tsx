import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Victor Kangombe — Backend Engineer",
  description:
    "Backend Engineer specializing in Java, Spring Boot, Node.js, and DevOps. Building scalable APIs, real-time systems and containerized infrastructure.",
  openGraph: {
    title: "Victor Kangombe — Backend Engineer",
    description:
      "Backend Engineer specializing in Java, Spring Boot, Node.js, and DevOps. Building scalable APIs, real-time systems and containerized infrastructure.",
    images: ["/victor.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Victor Kangombe — Backend Engineer",
    description:
      "Backend Engineer specializing in Java, Spring Boot, Node.js, and DevOps. Building scalable APIs, real-time systems and containerized infrastructure.",
    images: ["/victor.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
