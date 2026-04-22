import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <body className="min-h-full flex flex-col">{children}</body>
      <Toaster />
    </div>
  );
}
