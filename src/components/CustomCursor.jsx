import React, { useEffect, useRef } from 'react';

/* ==========================================================================
   CUSTOM CURSOR SYSTEM
   High-performance desktop cursor with smooth lerped easing via requestAnimationFrame.
   Zero React state updates on pointer moves to guarantee 60 FPS performance.
   ========================================================================== */

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    // Only enable on devices with a mouse/fine pointer and no reduced-motion preference
    if (typeof window === 'undefined') return;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || prefersReducedMotion) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isVisible = false;
    let currentMode = 'default'; // 'default' | 'link' | 'button' | 'view' | 'text'
    let rafId = null;

    const updatePosition = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }
    };

    const handlePointerOver = (e) => {
      const target = e.target;
      if (!target || !(target instanceof Element)) return;

      // Check text inputs first
      if (target.closest('input, textarea, [contenteditable="true"]')) {
        currentMode = 'text';
        ring.className = 'j-cursor-ring is-hidden';
        dot.className = 'j-cursor-dot is-hidden';
        return;
      }

      // Project card / view trigger
      if (target.closest('.j-work-card, [data-cursor="view"]')) {
        currentMode = 'view';
        ring.className = 'j-cursor-ring is-view';
        dot.className = 'j-cursor-dot is-hidden';
        label.textContent = 'VIEW';
        return;
      }

      // Buttons / primary CTAs
      if (target.closest('button, .j-btn-cta, .j-btn-outline, [role="button"], [data-cursor="button"]')) {
        currentMode = 'button';
        ring.className = 'j-cursor-ring is-button';
        dot.className = 'j-cursor-dot is-button';
        label.textContent = '';
        return;
      }

      // Links / Nav items
      if (target.closest('a, .j-nav-link, [data-cursor="link"]')) {
        currentMode = 'link';
        ring.className = 'j-cursor-ring is-link';
        dot.className = 'j-cursor-dot is-link';
        label.textContent = '';
        return;
      }

      // Reset to default
      currentMode = 'default';
      ring.className = 'j-cursor-ring';
      dot.className = 'j-cursor-dot';
      label.textContent = '';
    };

    const handlePointerOut = (e) => {
      const toEl = e.relatedTarget;
      if (!toEl) {
        // Leaving window
        isVisible = false;
        dot.style.opacity = '0';
        ring.style.opacity = '0';
      }
    };

    const render = () => {
      // Immediate transform for precision center dot
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

      // Smooth damped lerp for outer atmospheric ring
      const ease = currentMode === 'view' ? 0.18 : 0.22;
      ringX += (mouseX - ringX) * ease;
      ringY += (mouseY - ringY) * ease;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;

      rafId = requestAnimationFrame(render);
    };

    window.addEventListener('pointermove', updatePosition, { passive: true });
    document.addEventListener('mouseover', handlePointerOver, { passive: true });
    document.addEventListener('mouseout', handlePointerOut, { passive: true });
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('pointermove', updatePosition);
      document.removeEventListener('mouseover', handlePointerOver);
      document.removeEventListener('mouseout', handlePointerOut);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="j-cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="j-cursor-ring" aria-hidden="true">
        <span ref={labelRef} className="j-cursor-label" />
      </div>
    </>
  );
}
