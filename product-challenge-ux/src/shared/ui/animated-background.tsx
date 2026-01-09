import { useEffect, useRef, useState } from "react";

interface MousePosition {
  x: number;
  y: number;
}

export function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0.5, y: 0.5 });
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef<MousePosition>({ x: 0.5, y: 0.5 });

  useEffect(() => {
    // Only enable mouse tracking on devices that support hover (desktop)
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };

    const animate = () => {
      setMousePosition((prev) => ({
        x: prev.x + (targetRef.current.x - prev.x) * 0.08,
        y: prev.y + (targetRef.current.y - prev.y) * 0.08,
      }));
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const orbOffset = (base: number, intensity: number = 100) => {
    return (base - 0.5) * intensity * 2;
  };

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Mobile static background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 via-background to-background md:hidden" />

      {/* Base gradient for desktop */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background hidden md:block" />

      {/* Deep violet orb */}
      <div className="absolute top-[5%] left-[10%] hidden md:block md:animate-float-1 md:will-change-transform">
        <div
          className="w-[700px] h-[700px] rounded-full opacity-40 dark:opacity-25 blur-[120px]"
          style={{
            background: "radial-gradient(circle, #7c3aed 0%, #6d28d9 50%, transparent 70%)",
            transform: `translate3d(${orbOffset(mousePosition.x, 120)}px, ${orbOffset(
              mousePosition.y,
              100
            )}px, 0)`,
            transition: "transform 0.3s cubic-bezier(0.33, 1, 0.68, 1)",
          }}
        />
      </div>

      {/* Purple/fuchsia orb */}
      <div className="absolute top-[40%] right-[5%] hidden md:block md:animate-float-2 md:will-change-transform">
        <div
          className="w-[600px] h-[600px] rounded-full opacity-35 dark:opacity-20 blur-[100px]"
          style={{
            background: "radial-gradient(circle, #a855f7 0%, #9333ea 50%, transparent 70%)",
            transform: `translate3d(${orbOffset(mousePosition.x, -100)}px, ${orbOffset(
              mousePosition.y,
              -80
            )}px, 0)`,
            transition: "transform 0.4s cubic-bezier(0.33, 1, 0.68, 1)",
          }}
        />
      </div>

      {/* Indigo-violet orb */}
      <div className="absolute bottom-[0%] left-[25%] hidden md:block md:animate-float-3 md:will-change-transform">
        <div
          className="w-[550px] h-[550px] rounded-full opacity-30 dark:opacity-20 blur-[100px]"
          style={{
            background: "radial-gradient(circle, #8b5cf6 0%, #7c3aed 50%, transparent 70%)",
            transform: `translate3d(${orbOffset(mousePosition.x, 80)}px, ${orbOffset(
              mousePosition.y,
              -90
            )}px, 0)`,
            transition: "transform 0.35s cubic-bezier(0.33, 1, 0.68, 1)",
          }}
        />
      </div>

      {/* Light violet orb */}
      <div className="absolute top-[55%] left-[0%] hidden md:block md:animate-float-4 md:will-change-transform">
        <div
          className="w-[400px] h-[400px] rounded-full opacity-25 dark:opacity-15 blur-[80px]"
          style={{
            background: "radial-gradient(circle, #c4b5fd 0%, #a78bfa 50%, transparent 70%)",
            transform: `translate3d(${orbOffset(mousePosition.x, 60)}px, ${orbOffset(
              mousePosition.y,
              70
            )}px, 0)`,
            transition: "transform 0.45s cubic-bezier(0.33, 1, 0.68, 1)",
          }}
        />
      </div>

      {/* Soft lavender orb */}
      <div className="absolute top-[20%] right-[20%] hidden md:block md:animate-float-5 md:will-change-transform">
        <div
          className="w-[300px] h-[300px] rounded-full opacity-30 dark:opacity-15 blur-[70px]"
          style={{
            background: "radial-gradient(circle, #ddd6fe 0%, #c4b5fd 50%, transparent 70%)",
            transform: `translate3d(${orbOffset(mousePosition.x, -70)}px, ${orbOffset(
              mousePosition.y,
              50
            )}px, 0)`,
            transition: "transform 0.5s cubic-bezier(0.33, 1, 0.68, 1)",
          }}
        />
      </div>

      {/* Noise texture overlay for depth */}
      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-radial-[at_50%_50%] from-transparent via-transparent to-background/50" />
    </div>
  );
}
