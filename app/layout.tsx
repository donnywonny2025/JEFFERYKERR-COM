import "./globals.css"

export const metadata = {
  title: "Jeff Kerr — Director & Creative",
  description: "Portfolio of Jeff Kerr — director, cinematographer, and creative director.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
          <Prism
            animationType="rotate"
            timeScale={0.3}
            height={2}
            baseWidth={3}
            scale={360}
            offset={{ x: 0, y: 0 }}
            hueShift={0.0}
            colorFrequency={0.8}
            noise={0}
            glow={1.2}
            suspendWhenOffscreen={true}
          />
        </div> */}
        {children}
      </body>
    </html>
  )
}
