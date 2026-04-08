import { useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const sendMail = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await emailjs.send(
        'service_id',       // replace with your EmailJS service ID
        'template_id',      // replace with your EmailJS template ID
        { name: form.name, email: form.email, subject: form.subject, message: form.message },
        'XPx9MhL6kXvAQZy_T' // public key
      );
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact-section" className="full">
      <div className="inner">
        <div className="section-label">Contact</div>
        <h2 className="section-title reveal">Let's Connect</h2>
        <div className="contact-grid">
          {/* Info */}
          <div className="contact-info reveal">
            <h3>Open to Opportunities</h3>
            <p>
              Whether it's internships, research collaborations, or just a conversation about robotics — I'm always
              eager to connect with fellow engineers and innovators.
            </p>
            <div className="contact-details">
              <div className="contact-detail">
                <div className="contact-detail-icon">📍</div>Rochester, New York Metropolitan Area
              </div>
              <div className="contact-detail">
                <div className="contact-detail-icon">🎓</div>RIT · Class of 2030
              </div>
            </div>
            <div className="social-links">
              <a href="https://www.linkedin.com/in/isaac-kelly-ackun-jr-a05407252" target="_blank" rel="noreferrer" className="social-link" title="LinkedIn">in</a>
              <a href="https://github.com/KellyJnr-code"                           target="_blank" rel="noreferrer" className="social-link" title="GitHub">⌥</a>
              <a href="https://wa.me/15857731758"                                   target="_blank" rel="noreferrer" className="social-link" title="WhatsApp">💬</a>
            </div>
          </div>

          {/* Form */}
          <form className="contact-form reveal" onSubmit={sendMail}>
            <div className="form-row">
              <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="Your name" value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="your@email.com" value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
              </div>
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input type="text" placeholder="What's this about?" value={form.subject}
                onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} required />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea rows={5} placeholder="Your message..." value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required />
            </div>
            <button type="submit" className="btn-primary btn-submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : status === 'sent' ? '✓ Sent!' : status === 'error' ? 'Error — try again' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
