import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Victor Kangombe",
  robots: { index: false },
};

export default function RootRedirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body style={{ background: "#0a0d14", color: "#edf0f4", fontFamily: "system-ui, sans-serif" }}>{children}</body>
    </html>
  );
}
