import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import LayoutBodyClient from "@/app/ui/LayoutBodyClient";
import BottomTab from "@/shared/widgets/BottomTab";
import Header from "@/shared/widgets/Header";
import { LayoutChromeVisibilityProvider } from "@/shared/hooks";
import ToastProvider from "@/shared/components/ToastProvider";

const DEFAULT_SITE_URL = "http://localhost:3000";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;
const DEFAULT_GTM_ID = "GTM-MMJPPM5Z";
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? DEFAULT_GTM_ID;
const DEFAULT_GA4_ID = "G-W71BFR2FT7";
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? DEFAULT_GA4_ID;

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
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA4_ID}');`}
        </Script>
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      </head>

      <body
        className={`antialiased flex h-dvh w-full flex-col overflow-hidden`}
      >
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

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
