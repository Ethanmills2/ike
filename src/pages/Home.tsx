import { useEffect } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import ProjectsTeaser from '../components/ProjectsTeaser';
import Skills from '../components/Skills';
import Education from '../components/Education';
import Awards from '../components/Awards';
import Certifications from '../components/Certifications';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import '../components/Footer.css';

export default function Home() {
  useEffect(() => {
    // Smooth scroll for anchor links
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A') {
        const href = target.getAttribute('href');
        if (href?.startsWith('#')) {
          const el = document.querySelector(href);
          if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
        }
      }
    };
    document.addEventListener('click', handler);

    // Scroll reveal
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal, .tl-item, .proj-card, .award-card').forEach(el => io.observe(el));

    return () => {
      document.removeEventListener('click', handler);
      io.disconnect();
    };
  }, []);

  return (
    <>
      <Hero />
      <About />
      <Experience />
      <ProjectsTeaser />
      <Skills />
      <Education />
      <Awards />
      <Certifications />
      <Contact />
      <Footer />
    </>
  );
}
