import { useEffect } from 'react';
import ProjectsPage from '../components/ProjectsPage';
import Footer from '../components/Footer';
import GridCanvas from '../components/GridCanvas';
import CursorGlow from '../components/CursorGlow';

export default function Projects() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <GridCanvas />
      <CursorGlow />
      <ProjectsPage />
      <Footer />
    </>
  );
}
