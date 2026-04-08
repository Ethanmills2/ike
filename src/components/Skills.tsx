import { useEffect, useRef } from 'react';
import './Skills.css';

const groups = [
  {
    title: '// Programming & Engineering',
    items: ['Robotics Programming', 'Python', 'Java', 'MATLAB'],
  },
  {
    title: '// Tools',
    items: ['Arduino IDE', 'Fusion 360', 'Excel', 'BeyondTrust'],
  },
  {
    title: '// Leadership',
    items: ['Teamwork', 'Leadership', 'Communication'],
  },
];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.querySelectorAll<HTMLElement>('.skill-fill').forEach((bar, i) => {
              setTimeout(() => { bar.style.width = bar.getAttribute('data-pct') + '%'; }, i * 150);
            });
          }
        });
      },
      { threshold: 0.3 }
    );
    const groups = containerRef.current?.querySelectorAll('.skill-group') ?? [];
    groups.forEach(g => io.observe(g));
    return () => io.disconnect();
  }, []);

  return (
    <section id="skills">
      <div className="section-label">Skills</div>
      <h2 className="section-title reveal">Capabilities</h2>
      <div className="skills-container" ref={containerRef}>
        {groups.map(group => (
          <div className="skill-group reveal" key={group.title}>
            <div className="skill-group-title">{group.title}</div>
            {group.items.map(name => (
              <div className="skill-item" key={name}>
                <div className="skill-meta">
                  <span className="skill-name">{name}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
