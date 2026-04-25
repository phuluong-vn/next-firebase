import AuthProvider from "./auth-provider";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
    <AuthProvider>
            {children}
    </AuthProvider>
  )
}