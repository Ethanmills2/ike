import './Certifications.css';

const certs = [
  { name: 'Momentum I',                         issuer: 'Rochester Institute of Technology', date: 'Issued Oct 2025', badge: 'Academic' },
  { name: 'Communication within Teams',          issuer: 'LinkedIn Learning',                 date: 'Issued Aug 2025', badge: 'Professional' },
  { name: 'International General Certificate Secondary Education (IGCSE)', issuer: 'Cambridge Assessment International Education', date: 'Issued Oct 2023', badge: 'International' },
];

export default function Certifications() {
  return (
    <section id="certifications">
      <div className="section-label">Certifications</div>
      <h2 className="section-title reveal">Credentials</h2>
      <div className="cert-list">
        {certs.map(c => (
          <div className="cert-item reveal" key={c.name}>
            <div>
              <div className="cert-name">{c.name}</div>
              <div className="cert-issuer">{c.issuer}</div>
              <div className="cert-issuer">{c.date}</div>
            </div>
            <div className="cert-badge">{c.badge}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
