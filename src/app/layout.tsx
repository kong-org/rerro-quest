import type { Metadata } from "next";
import "@/app/_styles/style.scss";

export const metadata: Metadata = {
  title: "$RERRO Quest by Kongland",
  description: "Win prizes!",
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
