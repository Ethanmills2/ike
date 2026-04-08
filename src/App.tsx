import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loader from './components/Loader';
import Nav from './components/Nav';
import GridCanvas from './components/GridCanvas';
import CursorGlow from './components/CursorGlow';
import DeviceBadge from './components/DeviceBadge';
import Home from './pages/Home';
import Projects from './pages/Projects';
import './index.css';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <BrowserRouter>
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      {loaded && (
        <>
          <GridCanvas />
          <CursorGlow />
          <Nav />
          <DeviceBadge />
          <Routes>
            <Route path="/"         element={<Home />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </>
      )}
    </BrowserRouter>
  );
}
