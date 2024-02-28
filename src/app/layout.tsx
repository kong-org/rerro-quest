import type { Metadata } from "next";
import "@/app/_styles/style.scss";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import classNames from "classnames";

export const metadata: Metadata = {
  title: "$RERRO Quest by Kongland",
  description:
    "Embark on the $RERRO QUEST for your chance to win prizes and glory!",
  metadataBase: new URL("https://rerro.quest"),
  openGraph: {
    images: ["/images/og.png"],
  },
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" type="image/svg+xml" href="/images/favicon.svg"></link>

      <body className={classNames(inter.className)}>{children}</body>
    </html>
  );
}
