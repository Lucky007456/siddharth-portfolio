"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface LoadingOverlayProps {
  /**
   * Page content wrapped by the overlay. Will be revealed after loading finishes.
   */
  children?: ReactNode;
  /**
   * Callback fired once loading animation completes and overlay is fully clipped out.
   */
  onComplete?: () => void;
  /**
   * Total counter duration in milliseconds. Defaults to 2000ms.
   */
  duration?: number;
  /**
   * Additional className for the content wrapper container.
   */
  className?: string;
  /**
   * Additional className for the overlay curtain.
   */
  overlayClassName?: string;
  /**
   * Optional custom brand title displayed in top header.
   */
  brandTitle?: string;
  /**
   * Optional custom brand subtitle.
   */
  brandSubtitle?: string;
}

export function LoadingOverlay({
  children,
  onComplete,
  duration = 2000,
  className,
  overlayClassName,
  brandTitle = "SIDDHARTH P.",
  brandSubtitle = "AI & DATA SCIENCE SPECIALIST",
}: LoadingOverlayProps) {
  const [percentage, setPercentage] = useState(0);
  const [isClipped, setIsClipped] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isFullyDone, setIsFullyDone] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    let animationFrameId: number;

    const animatePercentage = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentPercent = Math.round(progress * 100);

      setPercentage(currentPercent);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animatePercentage);
      } else {
        // Animation reached 100%
        setTimeout(() => {
          setIsClipped(true);
          setTimeout(() => {
            setIsContentVisible(true);
            if (onComplete) {
              onComplete();
            }
            // After clip-path transition completely finishes (0.55s), unmount overlay
            setTimeout(() => {
              setIsFullyDone(true);
            }, 600);
          }, 450);
        }, 120);
      }
    };

    animationFrameId = requestAnimationFrame(animatePercentage);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [duration, onComplete]);

  return (
    <>
      {/* ====================================================================
          DESIGNALI LOADING OVERLAY CURTAIN
          Fixed over the entire viewport; completely out of document flow
          ==================================================================== */}
      {!isFullyDone && (
        <div
          className={cn(
            "fixed inset-0 select-none",
            overlayClassName
          )}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 99999,
            clipPath: isClipped ? "inset(0 0 100% 0)" : "inset(0 0 0% 0)",
            pointerEvents: isClipped ? "none" : "auto",
            transition: "clip-path 0.55s cubic-bezier(0.77, 0, 0.175, 1)",
            willChange: "clip-path",
            backgroundColor: "#161616",
            color: "#f5f5f5",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflow: "hidden",
            margin: 0,
            padding: 0,
          }}
          aria-hidden={isClipped}
          role="status"
          aria-label={`Loading portfolio: ${percentage}% completed`}
        >
          {/* Subtle grid pattern background */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              pointerEvents: "none",
              opacity: 0.18,
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />

          {/* Ambient Warm Gradient Glow */}
          <div
            style={{
              position: "absolute",
              top: "-8rem",
              right: "-8rem",
              width: "24rem",
              height: "24rem",
              borderRadius: "9999px",
              pointerEvents: "none",
              opacity: 0.3,
              filter: "blur(48px)",
              background: "radial-gradient(circle, rgba(185, 139, 110, 0.45) 0%, transparent 70%)",
            }}
          />

          {/* Top Header Bar */}
          <div
            style={{
              position: "relative",
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "clamp(1.25rem, 3vw, 2.5rem)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div
                style={{
                  width: "0.625rem",
                  height: "0.625rem",
                  borderRadius: "9999px",
                  backgroundColor: "#b98b6e",
                }}
              />
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    color: "#b98b6e",
                    display: "block",
                  }}
                >
                  {brandTitle}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "0.6875rem",
                    letterSpacing: "0.08em",
                    color: "rgba(255, 255, 255, 0.5)",
                    display: "block",
                  }}
                >
                  {brandSubtitle}
                </span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.375rem 0.75rem",
                borderRadius: "9999px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(8px)",
              }}
            >
              <span
                style={{
                  width: "0.5rem",
                  height: "0.5rem",
                  borderRadius: "9999px",
                  backgroundColor: "#b98b6e",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "0.625rem",
                  letterSpacing: "0.15em",
                  color: "rgba(255, 255, 255, 0.7)",
                  textTransform: "uppercase",
                }}
              >
                {percentage < 100 ? "INITIALIZING SYSTEMS" : "READY"}
              </span>
            </div>
          </div>

          {/* Center Minimalist Brand Accent */}
          <div
            style={{
              position: "relative",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              paddingLeft: "1rem",
              paddingRight: "1rem",
            }}
          >
            <div style={{ width: "4rem", height: "1px", backgroundColor: "rgba(255, 255, 255, 0.2)", marginBottom: "1.5rem" }} />
            <h2
              style={{
                fontFamily: "var(--font-heading, sans-serif)",
                fontSize: "clamp(1.25rem, 3vw, 2rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "rgba(255, 255, 255, 0.9)",
                marginBottom: "0.5rem",
              }}
            >
              Turning Ideas Into Intelligent Systems.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "0.75rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255, 255, 255, 0.4)",
              }}
            >
              Machine Learning • NLP • Interactive AI
            </p>
            <div style={{ width: "4rem", height: "1px", backgroundColor: "rgba(255, 255, 255, 0.2)", marginTop: "1.5rem" }} />
          </div>

          {/* Bottom Section: Technical Footnote & Giant Percentage Counter */}
          <div
            style={{
              position: "relative",
              zIndex: 10,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              padding: "clamp(1.25rem, 3vw, 2.5rem)",
            }}
          >
            <div style={{ maxWidth: "24rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: "rgba(255, 255, 255, 0.4)",
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "0.6875rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "0.25rem",
                }}
              >
                <span>STATUS:</span>
                <span style={{ color: "#b98b6e", fontWeight: 600 }}>
                  {percentage < 40
                    ? "LOADING CORE ASSETS"
                    : percentage < 80
                    ? "PREPARING NEURAL MODELS"
                    : "CALIBRATING INTERACTION"}
                </span>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "0.625rem",
                  color: "rgba(255, 255, 255, 0.3)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                CHENNAI, IN • EST. 2026
              </div>
            </div>

            {/* Signature Designali Bottom-Right Percentage Display */}
            <div
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontWeight: 900,
                letterSpacing: "-0.05em",
                lineHeight: 1,
                userSelect: "none",
                textAlign: "right",
                fontVariantNumeric: "tabular-nums",
                color: "#ffffff",
                fontSize: "clamp(3.5rem, 10vw, 13rem)",
                textShadow: "0 10px 40px rgba(0,0,0,0.5)",
              }}
            >
              <span>{percentage}</span>
              <span style={{ color: "#b98b6e", fontWeight: 300, fontSize: "0.55em", marginLeft: "0.15em" }}>%</span>
            </div>
          </div>

          {/* Hairline Bottom Progress Bar */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "3px",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              zIndex: 20,
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${percentage}%`,
                background: "linear-gradient(90deg, #b98b6e, #e2a87f, #b98b6e)",
                boxShadow: "0 0 12px rgba(185, 139, 110, 0.8)",
                transition: "width 75ms ease-out",
              }}
            />
          </div>
        </div>
      )}

      {/* ====================================================================
          PAGE CONTENT REVEAL
          Fades and slides in smoothly once overlay clips away
          Always begins flush at the top of the viewport (y: 0)
          ==================================================================== */}
      <div
        className={className}
        style={{
          opacity: isContentVisible ? 1 : 0,
          transform: isContentVisible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          width: "100%",
          margin: 0,
          padding: 0,
        }}
      >
        {children}
      </div>
    </>
  );
}

export default LoadingOverlay;
