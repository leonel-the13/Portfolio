import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Victor Kangombe — Cyber DevOps Command Center",
  description:
    "Portfolio de Backend e DevOps com foco em Java, Spring e infraestrutura.",
  openGraph: {
    title: "Victor Kangombe — Cyber DevOps Command Center",
    description:
      "Portfolio de Backend e DevOps com foco em Java, Spring e infraestrutura.",
    images: ["/ea9e27d6-dbae-480c-bd4b-f10d7463b5a4.JPG"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Victor Kangombe — Cyber DevOps Command Center",
    description:
      "Portfolio de Backend e DevOps com foco em Java, Spring e infraestrutura.",
    images: ["/ea9e27d6-dbae-480c-bd4b-f10d7463b5a4.JPG"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
