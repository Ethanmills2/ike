import { useState, useEffect } from 'react';
import './ProjectsPage.css';

interface Project {
  id: string;
  number: string;
  status: 'done' | 'wip' | 'planned';
  statusLabel: string;
  name: string;
  tags: { label: string; variant?: 'purple' | 'blue' }[];
  desc: string;
  tagsData: string;
  color?: 'orange' | 'green' | 'purple';
  placeholder?: boolean;
  placeholderIcon?: string;
  placeholderText?: string;
}

const projects: Project[] = [
  {
    id: 'p1', number: '// PROJECT 001', status: 'done', statusLabel: 'Completed',
    name: 'MICS Library Management System',
    tags: [
      { label: 'Fusion 360' },
      { label: 'Teamwork', variant: 'purple' },
      { label: 'Manufacturing Process' },
    ],
    desc: 'Developed a full functional, accessible web-based library management system to optimize book cataloging, file organization and circulation process within the high school library. This project was undertaken over a span of 3 months and improved the efficiency of the library management by 30%.',
    tagsData: ' software team',
  },
  {
    id: 'p2', number: '// PROJECT 002', status: 'done', statusLabel: 'Completed', color: 'orange',
    name: 'Automated Greenhouse System',
    tags: [
      { label: 'Arduino IDE' },
      { label: 'MATLAB', variant: 'purple' },
      { label: 'C' },
      { label: 'Manufacturing Processes', variant: 'purple' },
      { label: 'Team Collaboration' },
    ],
    desc: 'Collaborated with a multidisciplinary team to design and develop an Arduino based greenhouse system. The system integrated 5 sensors to monitor environmental parameters. The system executed automated responses using 3 actuators to maintain optimal plant growth conditions.',
    tagsData: 'software team',
  },
  {
    id: 'p3', number: '// PROJECT 003', status: 'planned', statusLabel: 'Planned', color: 'green', placeholder: true,
    name: 'Coming Soon',
    tags: [{ label: 'Robotics' }],
    desc: '',
    tagsData: 'robotics',
    placeholderIcon: '🤖',
    placeholderText: 'Robotics project\nin the pipeline.',
  },
];

const filters = ['All Projects', 'Robotics', 'Software', 'Team'];
const filterKeys = ['all', 'robotics', 'software', 'team'];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    // scroll reveal for cards
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.proj-card').forEach((el, i) => {
      (el as HTMLElement).style.transitionDelay = `${(i % 3) * 0.1}s`;
      io.observe(el);
    });
    return () => io.disconnect();
  }, [activeFilter]);

  const visible = (p: Project) => {
    if (activeFilter === 'all') return true;
    return p.tagsData.includes(activeFilter);
  };

  return (
    <>
      {/* PAGE HERO */}
      <div className="page-hero">
        <div className="page-hero-inner">
          <a href="/" className="page-back">← Back to Portfolio</a>
          <div className="page-hero-label">Engineering Portfolio</div>
          <h1 className="page-hero-title">What I've<br /><span className="accent">Built.</span></h1>
          <p className="page-hero-sub">
            A growing collection of robotics, automation, and software projects — from academic coursework to independent builds.
          </p>
          <div className="page-hero-stats">
            <div><div className="page-stat-val">2+</div><div className="page-stat-lbl">Completed</div></div>
            <div className="page-stat-div" />
            <div><div className="page-stat-val">∞</div><div className="page-stat-lbl">In Progress</div></div>
            <div className="page-stat-div" />
            <div><div className="page-stat-val">3</div><div className="page-stat-lbl">Tech Stacks</div></div>
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="proj-filters">
        {filters.map((f, i) => (
          <button
            key={f}
            className={`filter-btn${activeFilter === filterKeys[i] ? ' active' : ''}`}
            onClick={() => setActiveFilter(filterKeys[i])}
          >{f}</button>
        ))}
      </div>

      {/* GRID */}
      <div className="projects-section">
        <div className="proj-grid" id="proj-grid">
          {projects.filter(visible).map(p => (
            <div
              key={p.id}
              className={`proj-card${p.color ? ` ${p.color}` : ''}${p.placeholder ? ' placeholder' : ''}`}
              data-tags={p.tagsData}
            >
              <div className="proj-top">
                <div className="proj-number">{p.number}</div>
                <span className={`proj-status ${p.status}`}>{p.statusLabel}</span>
              </div>
              <h3 className="proj-name">{p.name}</h3>
              <div className="proj-tags">
                {p.tags.map(t => (
                  <span key={t.label} className={`proj-tag${t.variant ? ` ${t.variant}` : ''}`}>{t.label}</span>
                ))}
              </div>
              {p.placeholder ? (
                <div className="placeholder-inner">
                  <div className="placeholder-icon">{p.placeholderIcon}</div>
                  <div className="placeholder-text">{p.placeholderText}</div>
                </div>
              ) : (
                <>
                  <p className="proj-desc">{p.desc}</p>
                  <div className="proj-btns">
                    <a href="#" className="btn-sm btn-sm-primary" onClick={e => e.preventDefault()}>View Details</a>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
