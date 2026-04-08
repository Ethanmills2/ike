import { useEffect, useRef, useState } from 'react';
import './Loader.css';

const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#';
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

const phrases = [
  'Initializing systems...',
  'Loading robotics core...',
  'Calibrating sensors...',
  'Compiling portfolio...',
  'Welcome, engineer.',
];

interface QueueItem {
  from: string; to: string;
  start: number; end: number;
  char: string;
}

interface LoaderProps {
  onDone: () => void;
}

export default function Loader({ onDone }: LoaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [titleHtml, setTitleHtml] = useState('Initializing...');
  const [progress, setProgress]   = useState(0);
  const [pctText, setPctText]     = useState('0%');

  useEffect(() => {
    // ── RAIN CANVAS ──
    const lc = canvasRef.current!;
    const lctx = lc.getContext('2d')!;
    lc.width  = window.innerWidth;
    lc.height = window.innerHeight;
    const cols  = Math.floor(lc.width / 28);
    const drops = Array.from({ length: cols }, () => Math.random() * -50);

    let rainId: number;
    const drawRain = () => {
      lctx.fillStyle = 'rgba(5,8,16,0.18)';
      lctx.fillRect(0, 0, lc.width, lc.height);
      for (let i = 0; i < drops.length; i++) {
        const bright = Math.random() > 0.95;
        lctx.fillStyle = bright ? '#3b8eff' : 'rgba(59,142,255,0.18)';
        lctx.font = `${bright ? 'bold ' : ''}16px DM Mono, monospace`;
        lctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], i * 28, drops[i] * 20);
        if (drops[i] * 20 > lc.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      rainId = requestAnimationFrame(drawRain);
    };
    rainId = requestAnimationFrame(drawRain);

    // ── SCRAMBLE ──
    let frame = 0;
    let queue: QueueItem[] = [];
    let rafId: number;
    let resolveFn: (() => void) | null = null;

    const scrambleUpdate = () => {
      let out = '';
      let complete = 0;
      for (let i = 0; i < queue.length; i++) {
        const q = queue[i];
        if (frame >= q.end) { complete++; out += q.to; }
        else if (frame >= q.start) {
          if (!q.char || Math.random() < 0.28) {
            q.char = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          }
          out += `<span class="dud">${q.char}</span>`;
        } else { out += q.from; }
      }
      setTitleHtml(out);
      if (complete === queue.length) { resolveFn?.(); }
      else { frame++; rafId = requestAnimationFrame(scrambleUpdate); }
    };

    const scrambleTo = (text: string, oldText: string) =>
      new Promise<void>(res => {
        resolveFn = res;
        queue = [];
        frame = 0;
        cancelAnimationFrame(rafId);
        const len = Math.max(oldText.length, text.length);
        for (let i = 0; i < len; i++) {
          const start = Math.floor(Math.random() * 25);
          queue.push({ from: oldText[i] || '', to: text[i] || '', start, end: start + Math.floor(Math.random() * 25), char: '' });
        }
        rafId = requestAnimationFrame(scrambleUpdate);
      });

    // ── PROGRESS ──
    const animateTo = (target: number, current: { val: number }) =>
      new Promise<void>(res => {
        const ticker = setInterval(() => {
          if (current.val >= target) { clearInterval(ticker); res(); return; }
          current.val = Math.min(current.val + 1.5, target);
          setProgress(current.val);
          setPctText(Math.floor(current.val) + '%');
        }, 18);
      });

    const steps = [
      { p: 20,  phrase: phrases[0] },
      { p: 42,  phrase: phrases[1] },
      { p: 64,  phrase: phrases[2] },
      { p: 85,  phrase: phrases[3] },
      { p: 100, phrase: phrases[4] },
    ];

    const run = async () => {
      const prog = { val: 0 };
      let prev = 'Initializing...';
      for (const step of steps) {
        await scrambleTo(step.phrase, prev);
        prev = step.phrase;
        await animateTo(step.p, prog);
        if (step.p < 100) await new Promise(r => setTimeout(r, 400));
      }
      await new Promise(r => setTimeout(r, 700));
      cancelAnimationFrame(rainId);
      onDone();
    };
    run();

    return () => {
      cancelAnimationFrame(rainId);
      cancelAnimationFrame(rafId);
    };
  }, []); // eslint-disable-line

  return (
    <div id="loader">
      <canvas ref={canvasRef} id="loader-canvas" />
      <div className="loader-inner">
        <div className="loader-logo">ISAAC ACKUN JR</div>
        <div id="loader-title" dangerouslySetInnerHTML={{ __html: titleHtml }} />
        <div className="loader-sub">Mechatronics · Robotics · Engineering</div>
        <div className="loader-bar-wrap">
          <div className="loader-bar" style={{ width: `${progress}%` }} />
        </div>
        <div className="loader-pct">{pctText}</div>
      </div>
    </div>
  );
}
