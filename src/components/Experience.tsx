import './Experience.css';

const items = [
  {
    org: 'Rochester Institute of Technology',
    role: 'ITS Student Trainee',
    date: 'Feb 2026 – Present',
    bullets: [
      'Executed remote imaging and data backup assistance for five clients using BeyondTrust, TCTools and SentinelOne within two weeks.',
      'Acquired proficiency in troubleshooting computer hardware and imaging software, successfully imaging 5 computers in person independently within 2 weeks.',
      'Strengthened problem-solving skills by engaging in hands-on challenging assignments including hardware repairs and system troubleshooting.',
    ],
  },
  {
    org: 'Council for Scientific and Industrial Research (CSIR) Ghana',
    role: 'Engineering Intern',
    date: 'Jun 2023 – Jul 2023',
    bullets: [
      'Assisted engineers in developing robotics and automation prototypes',
      'Gained hands-on experience with tools, sensors, and microcontrollers in a makerspace environment',
      'Applied Python for programming control systems and testing robot functionality',
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience">
      <div className="section-label">Experience</div>
      <h2 className="section-title reveal">Timeline</h2>
      <div className="timeline">
        {items.map(item => (
          <div className="tl-item reveal" key={item.org}>
            <div className="tl-dot" />
            <div className="tl-card">
              <div className="tl-header">
                <div>
                  <div className="tl-org">{item.org}</div>
                  <div className="tl-role">{item.role}</div>
                </div>
                <div className="tl-date">{item.date}</div>
              </div>
              <ul className="tl-list">
                {item.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
