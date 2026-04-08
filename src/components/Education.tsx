import './Education.css';

export default function Education() {
  return (
    <section id="education">
      <div className="section-label">Education</div>
      <h2 className="section-title reveal">Academic Journey</h2>
      <div className="edu-grid">
        <div className="edu-card reveal">
          <div className="edu-school">Rochester Institute of Technology</div>
          <div className="edu-degree">BSc Mechatronics, Robotics & Automation Engineering Technology</div>
          <div className="edu-meta">
            <span className="edu-badge blue">Aug 2025 – May 2030</span>
            <span className="edu-badge">GPA: 3.6</span>
            <span className="edu-badge blue">First Year</span>
          </div>
          <div className="edu-orgs">
            <div className="edu-orgs-label">Activities & Societies</div>
            <div className="edu-org">National Society of Black Engineers (NSBE)</div>
            <div className="edu-org">Organization of African Students</div>
            <div className="edu-org">RIT Presidential Scholarship</div>
          </div>
        </div>
        <div className="edu-card reveal">
          <div className="edu-school">Morgan International Community School</div>
          <div className="edu-degree">High School Diploma, International Baccalaureate (IB) Diploma</div>
          <div className="edu-meta">
            <span className="edu-badge">IB Class of 2025</span>
            <span className="edu-badge blue">Valedictorian</span>
            <span className="edu-badge">Sep 2023 – Jun 2025</span>
            <span className="edu-badge blue">Grade: 12</span>
          </div>
        </div>
      </div>
    </section>
  );
}
