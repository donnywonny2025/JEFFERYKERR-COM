export default function TestSuccessPage() {
  return (
    <main style={{ minHeight: '60vh', display: 'grid', placeItems: 'center', padding: '80px 24px' }}>
      <div style={{
        border: '1px solid rgba(255,255,255,0.18)',
        borderRadius: 12,
        padding: '24px 28px',
        background: 'rgba(255,255,255,0.06)',
        color: 'rgba(255,255,255,0.95)'
      }}>
        Test worked.
      </div>
    </main>
  );
}
