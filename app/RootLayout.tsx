import { inter } from "./layout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme<NavBar> />
        <main>{children}</main>
      </body>
    </html>
  );
}
