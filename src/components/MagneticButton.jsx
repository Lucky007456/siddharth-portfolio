import React, { useRef } from 'react';

/* ==========================================================================
   MAGNETIC BUTTON COMPONENT
   Subtle pointer pull micro-interaction for primary CTAs.
   Uses transform: translate3d with spring reset.
   ========================================================================== */

export default function MagneticButton({ as: Component = 'button', children, className = '', style = {}, strength = 0.2, onClick, ...props }) {
  const elRef = useRef(null);

  const handlePointerMove = (e) => {
    // Only apply for mouse pointers
    if (e.pointerType !== 'mouse') return;
    const el = elRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = (e.clientX - centerX) * strength;
    const dy = (e.clientY - centerY) * strength;

    // Constrain maximum displacement
    const maxOffset = 8;
    const clampedX = Math.max(-maxOffset, Math.min(maxOffset, dx));
    const clampedY = Math.max(-maxOffset, Math.min(maxOffset, dy));

    el.style.transform = `translate3d(${clampedX}px, ${clampedY}px, 0)`;
  };

  const handlePointerLeave = () => {
    const el = elRef.current;
    if (!el) return;
    el.style.transform = 'translate3d(0, 0, 0)';
  };

  return (
    <Component
      ref={elRef}
      className={`j-magnetic-btn ${className}`}
      style={{
        ...style,
        transition: 'transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.2s ease, border-color 0.2s ease'
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={onClick}
      {...props}
    >
      {children}
    </Component>
  );
}
