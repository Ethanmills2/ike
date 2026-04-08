import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Nav.css';

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isProjects = location.pathname === '/projects';

  const toggleMenu = useCallback((force?: boolean) => {
    setMenuOpen(prev => force !== undefined ? force : !prev);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      if (menuOpen) setMenuOpen(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [menuOpen]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      const ham = document.getElementById('nav-hamburger');
      const mob = document.getElementById('mobile-menu');
      if (menuOpen && ham && mob && !ham.contains(target) && !mob.contains(target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [menuOpen]);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [location]);

  const homeHref = (anchor: string) => isProjects ? `/${anchor}` : anchor;

  return (
    <>
      <nav style={{ background: scrolled ? 'rgba(5,8,16,0.95)' : 'rgba(5,8,16,0.7)' }}>
        <Link className="nav-logo" to="/">Isaac Ackun Jr</Link>
        <ul className="nav-links">
          <li><a href={homeHref('#about')}>About</a></li>
          <li><a href={homeHref('#experience')}>Experience</a></li>
          <li><Link to="/projects" className={isProjects ? 'active' : ''}>Projects</Link></li>
          <li><a href={homeHref('#skills')}>Skills</a></li>
          <li><a href={homeHref('#education')}>Education</a></li>
          <li><a href={homeHref('#contact-section')} className="nav-cta">Contact</a></li>
        </ul>
        <div
          id="nav-hamburger"
          className={menuOpen ? 'open' : ''}
          role="button"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => toggleMenu()}
        >
          <span /><span /><span />
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={menuOpen ? 'open' : ''}
        aria-hidden={!menuOpen}
      >
        <a href={homeHref('#about')} onClick={() => toggleMenu(false)}>
          <span>About</span><span className="menu-num">01</span>
        </a>
        <a href={homeHref('#experience')} onClick={() => toggleMenu(false)}>
          <span>Experience</span><span className="menu-num">02</span>
        </a>
        <Link to="/projects" onClick={() => toggleMenu(false)}>
          <span>Projects</span><span className="menu-num">03</span>
        </Link>
        <a href={homeHref('#skills')} onClick={() => toggleMenu(false)}>
          <span>Skills</span><span className="menu-num">04</span>
        </a>
        <a href={homeHref('#education')} onClick={() => toggleMenu(false)}>
          <span>Education</span><span className="menu-num">05</span>
        </a>
        <a href={homeHref('#awards')} onClick={() => toggleMenu(false)}>
          <span>Awards</span><span className="menu-num">06</span>
        </a>
        <a href={homeHref('#contact-section')} onClick={() => toggleMenu(false)}>
          <span>Contact</span><span className="menu-num">07</span>
        </a>
      </div>
    </>
  );
}
