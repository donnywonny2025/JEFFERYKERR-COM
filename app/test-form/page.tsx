export default function TestFormPage() {
  return (
    <main style={{ minHeight: '60vh', display: 'grid', placeItems: 'center', padding: '80px 24px' }}>
      {/* Pure HTML-style Netlify form (no JS handlers) */}
      <form name="test" method="POST" action="/test-success" netlify style={{ display: 'grid', gap: 12, width: 'min(520px, 90vw)' }}>
        <input name="name" type="text" placeholder="Name" required style={inputStyle} />
        <input name="email" type="email" placeholder="Email" required style={inputStyle} />
        <button type="submit" style={buttonStyle}>Submit</button>
      </form>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  padding: '14px 16px',
  borderRadius: 10,
  border: '1px solid rgba(255,255,255,0.18)',
  background: 'rgba(255,255,255,0.10)',
  color: 'rgba(255,255,255,0.95)'
};

const buttonStyle: React.CSSProperties = {
  padding: '10px 16px',
  borderRadius: 10,
  border: '1px solid rgba(255,255,255,0.18)',
  background: 'rgba(173, 216, 230, 0.18)',
  color: '#fff',
  cursor: 'pointer'
};
