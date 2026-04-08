import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PHOTO from '../assets/photo.jpg';
import './Hero.css';

const icons = [
  { svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="m8 21 4-4 4 4"/><path d="M12 17v4"/></svg>`, label: 'Robotics',     bg: 'rgba(59,142,255,0.18)',  color: '#3b8eff',  glow: 'rgba(59,142,255,0.6)' },
  { svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`, label: 'Code',        bg: 'rgba(168,85,247,0.18)',  color: '#a855f7',  glow: 'rgba(168,85,247,0.6)' },
  { svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>`, label: 'Arduino',     bg: 'rgba(0,161,137,0.18)',  color: '#00a189',  glow: 'rgba(0,161,137,0.6)' },
  { svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`, label: 'MATLAB',      bg: 'rgba(249,115,22,0.18)',  color: '#f97316',  glow: 'rgba(249,115,22,0.6)' },
  { svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/></svg>`, label: 'Systems',     bg: 'rgba(96,165,250,0.18)',  color: '#60a5fa',  glow: 'rgba(96,165,250,0.6)' },
  { svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="12" rx="10" ry="4"/><path d="M2 12c0 4.418 4.477 8 10 8s10-3.582 10-8"/><line x1="12" y1="2" x2="12" y2="22"/></svg>`, label: 'Python',      bg: 'rgba(234,179,8,0.18)',  color: '#eab308',  glow: 'rgba(234,179,8,0.6)' },
  { svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`, label: 'NSBE',        bg: 'rgba(192,132,252,0.18)',  color: '#c084fc',  glow: 'rgba(192,132,252,0.6)' },
  { svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`, label: "Dean's List", bg: 'rgba(251,146,60,0.18)',  color: '#fb923c',  glow: 'rgba(251,146,60,0.6)' },
];

export default function Hero() {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const buildOrbit = () => {
    const wrap  = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;
    track.innerHTML = '';
    const size = wrap.offsetWidth;
    const iconSize = size < 240 ? 34 : size < 290 ? 38 : 46;
    const radius = size / 2 - iconSize / 2 - 2;
    const toRad  = (d: number) => (Math.PI / 180) * d;
    const DURATION = '22s';

    icons.forEach((icon, i) => {
      const angle = (360 / icons.length) * i;
      const cx = size / 2 - iconSize / 2 + radius * Math.cos(toRad(angle));
      const cy = size / 2 - iconSize / 2 + radius * Math.sin(toRad(angle));

      const wrapper = document.createElement('div');
      wrapper.className = 'hero-orbit-icon-wrap';
      wrapper.style.cssText = `left:${cx}px;top:${cy}px;width:${iconSize}px;height:${iconSize}px;animation-duration:${DURATION};`;

      const iconEl = document.createElement('div');
      iconEl.className = 'hero-orbit-icon';
      iconEl.style.cssText = `width:${iconSize}px;height:${iconSize}px;background:${icon.bg};color:${icon.color};`;
      const svgSize = Math.round(iconSize * 0.48);
      iconEl.innerHTML = icon.svg.replace('<svg ', `<svg width="${svgSize}" height="${svgSize}" `);
      iconEl.addEventListener('mouseenter', () => {
        iconEl.style.boxShadow = `0 0 20px ${icon.glow}, 0 0 8px ${icon.glow}`;
        iconEl.style.borderColor = icon.color;
        iconEl.style.transform = 'scale(1.22)';
      });
      iconEl.addEventListener('mouseleave', () => {
        iconEl.style.boxShadow = '';
        iconEl.style.borderColor = '';
        iconEl.style.transform = '';
      });

      const tip = document.createElement('div');
      tip.className = 'hero-orbit-tooltip';
      tip.textContent = icon.label;
      tip.style.color = icon.color;
      tip.style.borderColor = `${icon.color}40`;

      wrapper.appendChild(iconEl);
      wrapper.appendChild(tip);
      track.appendChild(wrapper);
    });
    track.style.animationDuration = DURATION;
  };

  useEffect(() => {
    buildOrbit();
    let debounce: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(debounce); debounce = setTimeout(buildOrbit, 180); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []); // eslint-disable-line

  return (
    <section id="hero" className="full">
      <div className="hero-inner">
        {/* Text side */}
        <div className="hero-text">
          <div className="hero-eyebrow"><span></span>Mechatronics Engineering Technology · RIT</div>
          <h1 className="hero-name">Isaac Kelly <span className="last">Ackun Jr</span></h1>
          <p className="hero-title">Aspiring Robotics Engineer</p>
          <p className="hero-tagline">Building intelligent systems through engineering, innovation, and leadership</p>
          <div className="hero-btns">
            <Link to="/projects" className="btn-primary">View Projects</Link>
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn-secondary">My Resume ↓</a>
          </div>
          <div className="hero-stats">
            <div><div className="stat-val">3.6</div><div className="stat-label">GPA at RIT</div></div>
            <div className="stat-divider" />
            <div><div className="stat-val">2×</div><div className="stat-label">Awards & Honours</div></div>
            <div className="stat-divider" />
            <div><div className="stat-val">3+</div><div className="stat-label">Certifications</div></div>
          </div>
        </div>

        {/* Orbit photo */}
        <div className="hero-photo-col">
          <div className="hero-orbit-wrap" ref={wrapRef}>
            <div className="hero-orbit-ring-outer" />
            <div className="hero-orbit-ring-mid" />
            <div className="hero-orbit-pulse" />
            <div className="hero-orbit-track" ref={trackRef} />
            <div className="hero-orbit-center">
              <img src={PHOTO} alt="Isaac Kelly Ackun Jr" />
            </div>
            <div className="hero-photo-tag tag-rit">
              <div className="tag-dot" style={{ background: 'var(--orange)' }} />RIT · Class of 2030
            </div>
            <div className="hero-photo-tag tag-gpa">
              <div className="tag-dot" style={{ background: 'var(--blue)' }} />GPA 3.6 · Dean's List
            </div>
            <div className="hero-photo-tag tag-loc">
              <div className="tag-dot" style={{ background: 'var(--purple)' }} />Rochester, NY
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
