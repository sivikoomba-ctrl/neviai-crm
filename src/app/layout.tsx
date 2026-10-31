import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Sidebar } from "./components/Sidebar";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "NeviAI CRM",
  description: "AI-Powered Customer Relationship Management",
  applicationName: "NeviAI CRM",
  appleWebApp: {
    capable: true,
    title: "NeviAI CRM",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full flex" suppressHydrationWarning>
        <Sidebar />
        <main className="flex-1 overflow-auto ml-64">
          <div className="p-8">{children}</div>
        </main>
      </body>
    </html>
  );
}
