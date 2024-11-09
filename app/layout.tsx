// / The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; /* eslint-disable import/first */
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactQueryProvider from "@/@util/providers/ReactQueryProvider";
import NavbarContainer from './components/Navbar/NavbarContainer';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "유튜뷰 YoutuView",
  description: "궁금한 유튜브 영상을 자유롭게 분석하세요!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
            <NavbarContainer />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
