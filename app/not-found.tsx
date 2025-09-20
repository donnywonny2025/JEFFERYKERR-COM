export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a0a',
        color: '#ffffff',
        fontFamily: "'Space Mono', monospace"
      }}
    >
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Page not found</h1>
      <p style={{ opacity: 0.7 }}>The page you’re looking for doesn’t exist.</p>
    </div>
  );
}
