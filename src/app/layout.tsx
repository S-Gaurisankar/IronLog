import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "src/contexts/AuthContext";
import ServiceWorkerRegister from "src/components/ServiceWorkerRegister/ServiceWorkerRegister";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IronLog",
  description: "Your personalized fitness log, tracking your progress with precision and ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
