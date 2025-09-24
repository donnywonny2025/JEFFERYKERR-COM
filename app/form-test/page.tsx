export default function FormTest() {
  return (
    <div style={{ padding: '50px', maxWidth: '500px', margin: '0 auto' }}>
      <h1>Netlify Form Test</h1>
      <form name="netlify-test" method="POST" action="/form-test/success" netlify>
        <div style={{ marginBottom: '20px' }}>
          <label>Name: <input name="name" type="text" required /></label>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label>Email: <input name="email" type="email" required /></label>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label>Message: <textarea name="message" required></textarea></label>
        </div>
        <button type="submit">Submit Test</button>
      </form>
    </div>
  );
}
