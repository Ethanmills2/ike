import { useEffect, useRef } from 'react';
import './GridCanvas.css';

export default function GridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const size = 60;
      ctx.strokeStyle = 'rgba(59,142,255,0.12)';
      ctx.lineWidth = 0.5;
      for (let x = 0; x < canvas.width; x += size) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += size) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }
      const t = Date.now() / 1000;
      for (let x = 0; x <= canvas.width; x += size) {
        for (let y = 0; y <= canvas.height; y += size) {
          const wave = Math.sin(x * 0.02 + t) * Math.cos(y * 0.02 + t * 0.7);
          const alpha = ((wave + 1) / 2) * 0.5;
          ctx.fillStyle = `rgba(59,142,255,${alpha})`;
          ctx.beginPath(); ctx.arc(x, y, 1.5, 0, Math.PI * 2); ctx.fill();
        }
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} id="grid-canvas" />;
}
