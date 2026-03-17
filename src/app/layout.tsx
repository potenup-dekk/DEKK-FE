import type { Metadata } from "next";
import "./globals.css";
import LayoutBodyClient from "@/app/ui/LayoutBodyClient";
import BottomTab from "@/shared/widgets/BottomTab";
import Header from "@/shared/widgets/Header";
import { LayoutChromeVisibilityProvider } from "@/shared/hooks";
import ToastProvider from "@/shared/components/ToastProvider";

const DEFAULT_SITE_URL = "http://localhost:3000";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;

export const metadata: Metadata = {
  title: "DEKK",
  applicationName: "DEKK",
  description: "나에게 꼭 맞는 맞춤 핏을 탐색하고 수집하세요!",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/main",
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
    shortcut: [{ url: "/favicon.ico", type: "image/x-icon" }],
  },
  openGraph: {
    title: "DEKK",
    description: "나에게 꼭 맞는 맞춤 핏을 탐색하고 수집하세요!",
    siteName: "DEKK",
    type: "website",
    images: [
      {
        url: "/og.jpg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DEKK",
    description: "나에게 꼭 맞는 맞춤 핏을 탐색하고 수집하세요!",
    images: ["/og.jpg"],
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko">
      <body
        className={`antialiased flex h-dvh w-full flex-col overflow-hidden`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "DEKK",
              alternateName: "데크",
              url: SITE_URL,
            }),
          }}
        />
        <LayoutChromeVisibilityProvider>
          <div className="mx-auto flex h-full w-full max-w-md flex-col">
            <Header />

            <LayoutBodyClient>{children}</LayoutBodyClient>

            <BottomTab />
          </div>
          <ToastProvider />
        </LayoutChromeVisibilityProvider>
      </body>
    </html>
  );
};

export default RootLayout;
