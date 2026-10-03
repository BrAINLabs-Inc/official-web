import { useEffect, useRef } from 'react';

// Subtle animated neural-network backdrop shown behind every page.
//
// Kept cheap on purpose: every line is added to a single path and stroked once per
// frame, dots are filled in one call, distances are compared squared (no sqrt), the
// particle count scales with screen size, and the loop stops while the tab is hidden.

const LINK_DISTANCE = 150;
const MOUSE_DISTANCE = 200;
const MAX_PARTICLES = 80;
const AREA_PER_PARTICLE = 18000; // px² of screen per particle
const LINE_COLOR = 'rgba(0, 0, 0, 0.06)';
const DOT_COLOR = 'rgba(0, 0, 0, 0.08)';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

export const NeuralBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let frame: number | null = null;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      const count = Math.min(MAX_PARTICLES, Math.round((width * height) / AREA_PER_PARTICLE));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.6,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const linkSq = LINK_DISTANCE * LINK_DISTANCE;
      const mouseSq = MOUSE_DISTANCE * MOUSE_DISTANCE;

      const lines = new Path2D();
      const dots = new Path2D();

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!reduceMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x += width;
          else if (p.x > width) p.x -= width;
          if (p.y < 0) p.y += height;
          else if (p.y > height) p.y -= height;
        }

        dots.moveTo(p.x + p.r, p.y);
        dots.arc(p.x, p.y, p.r, 0, Math.PI * 2);

        const mdx = mouse.x - p.x;
        const mdy = mouse.y - p.y;
        if (mdx * mdx + mdy * mdy < mouseSq) {
          lines.moveTo(p.x, p.y);
          lines.lineTo(mouse.x, mouse.y);
        }

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          if (dx * dx + dy * dy < linkSq) {
            lines.moveTo(p.x, p.y);
            lines.lineTo(q.x, q.y);
          }
        }
      }

      ctx.strokeStyle = LINE_COLOR;
      ctx.lineWidth = 1;
      ctx.stroke(lines);
      ctx.fillStyle = DOT_COLOR;
      ctx.fill(dots);
    };

    const loop = () => {
      draw();
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (frame === null && !reduceMotion && !document.hidden) loop();
    };
    const stop = () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
    };

    const onResize = () => {
      resize();
      draw();
    };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    resize();
    draw();
    start();

    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stop();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 h-screen w-screen"
    />
  );
};
