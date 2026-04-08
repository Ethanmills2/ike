import { Link } from 'react-router-dom';
import './ProjectsTeaser.css';

export default function ProjectsTeaser() {
  return (
    <section id="projects">
      <div className="section-label">Projects</div>
      <h2 className="section-title reveal">What I've Built</h2>
      <div className="proj-teaser reveal">
        <div className="proj-teaser-bg" />
        <div className="proj-teaser-left">
          <h3>I Build Systems, Not Just Code</h3>
          <p>
            Exploring the intersection of code, electronics, and intelligent systems through hands-on projects in
            robotics, automation, and software engineering.
          </p>
          <div className="proj-counter">
            <div className="proj-count-item"><div className="count-num">2+</div><div className="count-lbl">Completed</div></div>
            <div className="proj-count-item"><div className="count-num">∞</div><div className="count-lbl">In Progress</div></div>
            <div className="proj-count-item"><div className="count-num">7</div><div className="count-lbl">Tech Stacks</div></div>
          </div>
        </div>
        <div className="proj-teaser-right">
          <div className="proj-preview-tag"><div className="dot" />Arduino · Fusion 360 ·</div>
          <div className="proj-preview-tag"><div className="dot" style={{ background: 'var(--purple)' }} />Python · MATLAB · Java</div>
          <div className="proj-preview-tag"><div className="dot" style={{ background: 'var(--orange)' }} />Robotics · BeyondTrust</div>
          <Link to="/projects" className="btn-primary" style={{ textAlign: 'center', marginTop: '0.5rem' }}>View All Projects →</Link>
        </div>
      </div>
    </section>
  );
}
