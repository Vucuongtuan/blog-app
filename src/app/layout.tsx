import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "react-hot-toast";
import LayoutProvider from "@/components/layout";
import { cookies } from "next/headers";
import { GoogleAnalytics } from "@next/third-parties/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TC NEW | Công nghệ | Thể thao",
  description: "Trang tin tức mới nhất ",
  openGraph: {
    title: "TC NEW | Công nghệ | Thể thao",
    description: "Trang tin tức mới nhất ",
    images: [
      {
        url: "/TC News.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auth: boolean = cookies().get("access_token") ? true : false;

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LayoutProvider auth={auth}>
            {children}
            <Toaster
              position="top-right"
              reverseOrder={false}
              gutter={8}
              containerClassName=""
              containerStyle={{}}
              toastOptions={{
                // Define default options
                className: "mt-8",
                duration: 5000,
                style: {
                  background: "#363636",
                  color: "#fff",
                },

                success: {
                  duration: 3000,
                },
              }}
            />
          </LayoutProvider>
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId="G-8YSV7DTYN1" />
    </html>
  );
}
