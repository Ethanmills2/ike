import './About.css';

export default function About() {
  return (
    <section id="about">
      <div className="section-label">About</div>
      <h2 className="section-title reveal">Who I Am</h2>
      <div className="about-grid">
        <div className="about-bio reveal">
          <p>
            I am a first year <strong>mechatronics engineering technology</strong> student with a passion for{' '}
            <strong>robotics</strong>, and <strong>automation</strong>. I am eager to explore opportunities in{' '}
            <strong>engineering</strong>, <strong>technology</strong>, and <strong>research</strong> while demonstrating
            effective communication and organizational skills honed in collaborative, fast-paced environments. Outside
            academics, I love to <strong>dance</strong> and <strong>sing</strong> and <strong>explore new places</strong>.
          </p>
        </div>
        <div className="trait-grid reveal">
          {[
            { icon: '🧩', name: 'Problem Solver' },
            { icon: '🚀', name: 'Team Leader' },
            { icon: '🤖', name: 'Robotics Enthusiast' },
            { icon: '⚡', name: 'Fast Learner' },
          ].map(t => (
            <div className="trait-card" key={t.name}>
              <div className="trait-icon">{t.icon}</div>
              <div className="trait-name">{t.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
