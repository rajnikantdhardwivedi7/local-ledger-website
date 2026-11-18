import { useEffect, useLayoutEffect, useRef, useState, type ReactNode, type PointerEvent as ReactPointerEvent } from "react";
import "./motion-system.css";

/** A small, dependency-free damped spring. Animates transforms without React renders per frame. */
function springTo(from: number, to: number, render: (value: number) => void, onDone?: () => void) {
  let value = from, velocity = 0, last = 0, raf = 0, active = true;
  const step = (time: number) => {
    if (!active) return;
    const dt = Math.min((time - (last || time)) / 1000, .032);
    last = time;
    const acceleration = -390 * (value - to) - 34 * velocity;
    velocity += acceleration * dt;
    value += velocity * dt;
    render(value);
    if (Math.abs(value - to) < .4 && Math.abs(velocity) < 3) { render(to); onDone?.(); }
    else raf = requestAnimationFrame(step);
  };
  raf = requestAnimationFrame(step);
  return () => { active = false; cancelAnimationFrame(raf); };
}

export function MotionPage({ children }: { children: ReactNode }) {
  return <div className="ll-motion-page">{children}</div>;
}

type Preview = { src: string; alt: string; origin?: DOMRect };
export type ImagePreview = Preview;

export function ImageSheet({ src, alt, origin, onClose }: Preview & { onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  const image = useRef<HTMLImageElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const dragging = useRef<{ start: number; time: number; last: number; lastTime: number } | null>(null);
  const cancelSpring = useRef<(() => void) | null>(null);
  const closeTimer = useRef<number | null>(null);
  const closing = useRef(false);
  const [isClosing, setIsClosing] = useState(false);
  const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const animateY = (from: number, to: number, done?: () => void) => {
    const node = panel.current;
    cancelSpring.current?.();
    if (!node) { done?.(); return; }
    if (reduced()) { node.style.transform = `translate3d(0,${to}px,0)`; done?.(); return; }
    cancelSpring.current = springTo(from, to, y => { node.style.transform = `translate3d(0,${y}px,0)`; }, done);
  };
  const close = (distance = 0) => {
    if (closing.current) return;
    closing.current = true;
    setIsClosing(true);
    cancelSpring.current?.();
    const node = panel.current;
    if (!node || reduced()) { onClose(); return; }
    const current = distance || Number(node.style.transform.match(/translate3d\(0,([\d.-]+)px/)?.[1] ?? 0);
    animateY(current, Math.max(window.innerHeight, node.clientHeight) + 60, onClose);
    closeTimer.current = window.setTimeout(onClose, 500);
  };
  useLayoutEffect(() => {
    const node = panel.current, img = image.current;
    if (!node) return;
    if (reduced()) return;
    node.style.transform = "translate3d(0,35px,0)";
    animateY(35, 0);
    let imageAnimation: Animation | undefined;
    const expand = () => {
      if (!origin || !img || reduced()) return;
      const target = img.getBoundingClientRect();
      if (!target.width || !target.height || !origin.width || !origin.height) return;
      const dx = origin.left + origin.width / 2 - (target.left + target.width / 2);
      const dy = origin.top + origin.height / 2 - (target.top + target.height / 2);
      const scale = Math.min(origin.width / target.width, origin.height / target.height);
      const frames: Keyframe[] = [];
      // Sample a critically damped spring into transform-only compositor frames.
      for (let i = 0; i <= 28; i++) {
        const t = i / 28 * .4;
        const progress = 1 - (1 + 18 * t) * Math.exp(-18 * t);
        frames.push({
          transform: `translate3d(${dx * (1 - progress)}px,${dy * (1 - progress)}px,0) scale(${scale + (1 - scale) * progress})`,
          opacity: .82 + .18 * progress,
          offset: i / 28
        });
      }
      imageAnimation = img.animate(frames, { duration: 400, easing: "linear" });
    };
    if (img) {
      if (img.complete && img.naturalWidth > 0) expand();
      else img.addEventListener("load", expand, { once: true });
    }
    return () => { cancelSpring.current?.(); imageAnimation?.cancel(); img?.removeEventListener("load", expand); };
  }, []);
  useEffect(() => {
    previousFocus.current = document.activeElement as HTMLElement;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLButtonElement>(".ll-sheet-close")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); close(); }
      if (event.key !== "Tab" || !panel.current) return;
      const controls = Array.from(panel.current.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'));
      if (!controls.length) { event.preventDefault(); return; }
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = oldOverflow;
      document.removeEventListener("keydown", onKey);
      cancelSpring.current?.();
      if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
      previousFocus.current?.focus();
    };
  }, []);
  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    dragging.current = { start: event.clientY, time: performance.now(), last: event.clientY, lastTime: performance.now() };
    cancelSpring.current?.();
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragging.current;
    if (!drag || !panel.current) return;
    const dy = Math.max(0, event.clientY - drag.start);
    panel.current.style.transform = `translate3d(0,${dy}px,0)`;
    drag.last = event.clientY;
    drag.lastTime = performance.now();
  };
  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragging.current;
    dragging.current = null;
    if (!drag) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    const distance = Math.max(0, event.clientY - drag.start);
    const velocity = distance / Math.max(performance.now() - drag.time, 1);
    if (distance > 115 || (distance > 35 && velocity > .65)) close(distance);
    else animateY(distance, 0);
  };
  return <div className={`ll-sheet-layer ${isClosing ? "ll-sheet-closing" : ""}`}>
    <button className="ll-sheet-backdrop" type="button" tabIndex={-1} aria-label="Close image preview" onClick={() => close()} />
    <div className="ll-image-sheet ll-physics-sheet" role="dialog" aria-modal="true" aria-label="Screenshot preview" ref={panel} tabIndex={-1}>
      <div className="ll-sheet-drag-zone" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp} aria-hidden="true"><span className="ll-sheet-handle" /></div>
      <button className="ll-sheet-close" type="button" onClick={() => close()} aria-label="Close preview">✕</button>
      <img ref={image} src={src} alt={alt} />
      <p>Drag down to close · Escape to dismiss</p>
    </div>
  </div>;
}
