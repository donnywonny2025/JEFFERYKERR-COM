import "./globals.css"

export const metadata = {
  title: "Summer 2025 Website",
  description: "Created with Next.js",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
