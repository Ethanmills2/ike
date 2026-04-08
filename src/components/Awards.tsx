import './Awards.css';

const awards = [
  { icon: '🏆', name: "Dean's List",          src: 'RIT · Fall 2025' },
  { icon: '🎓', name: 'Valedictorian',         src: 'IB Class of 2025' },
  { icon: '🌟', name: 'Presidential Scholarship', src: 'Rochester Institute of Technology' },
];

export default function Awards() {
  return (
    <section id="awards">
      <div className="section-label">Achievements</div>
      <h2 className="section-title reveal">Awards & Honours</h2>
      <div className="awards-grid">
        {awards.map(a => (
          <div className="award-card reveal" key={a.name}>
            <div className="award-icon">{a.icon}</div>
            <div className="award-name">{a.name}</div>
            <div className="award-src">{a.src}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
