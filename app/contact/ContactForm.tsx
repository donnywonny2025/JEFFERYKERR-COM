"use client";

import React from 'react';

export default function ContactForm() {
  // EmailJS REST submission (no extra SDK needed)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    try {
      const formData = new FormData(form);
      const firstName = String(formData.get('firstName') || '');
      const lastName = String(formData.get('lastName') || '');
      const email = String(formData.get('email') || '');
      const message = String(formData.get('message') || '');

      const payload = {
        service_id: 'service_4lb6jx8',
        template_id: 'template_vscooeh',
        user_id: 'dp8XMtJ-9g8LWfPJM', // public key
        template_params: {
          firstName,
          lastName,
          email,
          message
        }
      };

      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => '');
        throw new Error(`EmailJS error ${res.status}: ${txt}`);
      }

      window.location.href = '/contact/success';
    } catch (error) {
      console.error('[ContactForm] EmailJS submit failed:', error);
      alert('Sorry, we could not send your message right now. Please try again later.');
    }
  };
  return (
    <form
      name="contact"
      method="POST"
      className="animate-fade-in-up contact-form"
      style={{
        display: 'grid',
        gap: '24px',
        marginTop: '20px'
      }}
      onSubmit={handleSubmit}
    >
      {/* EmailJS does not require hidden fields; keep UI identical */}
      {/* First/Last name row */}
      <div className="name-row row-2" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px'
      }}>
        <div>
          <label htmlFor="firstName" style={labelStyle}>First name</label>
          <input id="firstName" name="firstName" type="text" placeholder=""
            autoComplete="given-name"
            style={inputStyle} />
        </div>
        <div>
          <label htmlFor="lastName" style={labelStyle}>Last name</label>
          <input id="lastName" name="lastName" type="text" placeholder=""
            autoComplete="family-name"
            style={inputStyle} />
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" style={labelStyle}>Email</label>
        <input id="email" name="email" type="email" placeholder=""
          autoComplete="email"
          style={inputStyle} />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" style={labelStyle}>Message</label>
        <textarea id="message" name="message" rows={5} placeholder="Start typing here …"
          autoComplete="off"
          style={{ ...inputStyle, resize: 'vertical' }} />
      </div>

      {/* Submit */}
      <div style={{ marginTop: '32px', textAlign: 'center' }}>
        <button type="submit"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '12px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            padding: '8px 16px',
            borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.18)',
            background: 'rgba(173, 216, 230, 0.18)',
            color: '#ffffff',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            transition: 'background 0.25s ease, transform 0.15s ease',
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = 'translateY(1px)')}
          onMouseUp={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          Submit
        </button>
      </div>


      <style jsx>{`
        .contact-form input::placeholder, .contact-form textarea::placeholder { color: rgba(255,255,255,0.65); }
        .contact-form input, .contact-form textarea { min-height: 44px; transition: border-color 0.2s ease; }
        .contact-form input:focus, .contact-form textarea:focus {
          border-color: rgba(255,255,255,0.30) !important;
          box-shadow: 0 0 0 2px rgba(255,255,255,0.09) inset;
        }
        @media (max-width: 780px) {
          .name-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </form>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: "'Space Mono', monospace",
  fontSize: '13px',
  color: 'rgba(255,255,255,0.7)',
  marginBottom: '6px',
  fontWeight: 400
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '16px 18px',
  borderRadius: '10px',
  border: '1px solid rgba(255,255,255,0.18)',
  background: 'rgba(255,255,255,0.10)',
  color: 'rgba(255,255,255,0.95)',
  outline: 'none',
  fontFamily: "'Space Mono', monospace",
  fontSize: '15px',
};

const linkStyle: React.CSSProperties = {
  color: 'rgba(255,255,255,0.8)',
  textDecoration: 'underline'
};
