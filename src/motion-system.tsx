import { useEffect, useRef, useState, type ReactNode } from "react";
import "./motion-system.css";

/** Reusable, dependency-free motion primitives. All timings are centralized in CSS. */
export function MotionPage({ children }: { children: ReactNode }) {
  return <div className="ll-motion-page">{children}</div>;
}

export function ImageSheet({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const startY = useRef<number | null>(null);
  const [closing, setClosing] = useState(false);
  const close = () => setClosing(true);
  useEffect(() => {
    previousFocus.current = document.activeElement as HTMLElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.focus();
    const keyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); close(); }
      if (event.key === "Tab" && panel.current) {
        const controls = Array.from(panel.current.querySelectorAll<HTMLElement>('button, a[href], [tabindex]:not([tabindex="-1"])'));
        if (!controls.length) { event.preventDefault(); return; }
        const first = controls[0], last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", keyDown);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", keyDown); previousFocus.current?.focus(); };
  }, []);
  return <div className={`ll-sheet-layer ${closing ? "ll-sheet-closing" : ""}`} onAnimationEnd={(event) => { if (closing && event.target === event.currentTarget) onClose(); }}>
    <button className="ll-sheet-backdrop" type="button" aria-label="Close image preview" onClick={close} />
    <div className="ll-image-sheet" role="dialog" aria-modal="true" aria-label="Screenshot preview" ref={panel} tabIndex={-1}
      onTouchStart={(event) => { startY.current = event.touches[0]?.clientY ?? null; }}
      onTouchEnd={(event) => { if (startY.current !== null && (event.changedTouches[0]?.clientY ?? 0) - startY.current > 90) close(); startY.current = null; }}>
      <div className="ll-sheet-handle" aria-hidden="true" />
      <button className="ll-sheet-close" type="button" onClick={close} aria-label="Close preview">✕</button>
      <img src={src} alt={alt} />
      <p>Swipe down or press Escape to close</p>
    </div>
  </div>;
}
