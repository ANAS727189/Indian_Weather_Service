import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TemperatureProvider } from "@/context/TemperatureContext";
import { ClerkProvider } from "@clerk/nextjs";


export const metadata: Metadata = {
  title: "Indian Weather Service",
  description: "Providing accurate and timely weather information",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <TemperatureProvider>
            <Header />
            {children}
            <Footer />
          </TemperatureProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}