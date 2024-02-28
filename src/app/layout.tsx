import type { Metadata } from "next";
import "@/app/_styles/style.scss";

export const metadata: Metadata = {
  title: "$RERRO Quest by Kongland",
  description:
    "Embark on the $RERRO QUEST for your chance to win prizes and glory!",
  metadataBase: new URL("https://rerro.quest"),
  openGraph: {
    images: ["/images/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" type="image/svg+xml" href="/images/favicon.svg"></link>

      <body>{children}</body>
    </html>
  );
}
