"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createCoreFrame, STATIC_CORE_FRAME, type Tilt } from "./geometricCoreMath";
import styles from "./geometricCore.module.css";

const COLORS = ["#c7d0d9", "#32c8f4", "#168bea"];

/** SVG com projeção perspectiva real: sem contexto WebGL ou bibliotecas 3D.
 * Os nós são atualizados imperativamente: zero re-render React por quadro. */
export function GeometricCore() {
  const stage = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const clock = useRef(0);
  const orientation = useRef<Tilt>({ x: 0, y: 0 });
  const [paused, setPaused] = useState(false);
  const id = useId().replace(/:/g, "");

  useEffect(() => {
    const element = stage.current;
    const drawing = svg.current;
    if (!element || !drawing || !window.matchMedia) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia("(max-width: 700px)");
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const device = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
    const limited = (device.hardwareConcurrency > 0 && device.hardwareConcurrency <= 4) || (device.deviceMemory !== undefined && device.deviceMemory <= 4) || device.connection?.saveData;
    const faces = Array.from(drawing.querySelectorAll<SVGPolygonElement>("[data-face]"));
    const backs = Array.from(drawing.querySelectorAll<SVGPathElement>("[data-ring-back]"));
    const fronts = Array.from(drawing.querySelectorAll<SVGPathElement>("[data-ring-front]"));
    const markers = Array.from(drawing.querySelectorAll<SVGCircleElement>("[data-marker]"));
    const dots = Array.from(drawing.querySelectorAll<SVGCircleElement>("[data-vertex]"));
    const backCage = drawing.querySelector<SVGPathElement>("[data-cage-back]")!;
    const frontCage = drawing.querySelector<SVGPathElement>("[data-cage-front]")!;
    let frameId: number | null = null;
    let visible = false;
    let previous = 0;
    let time = clock.current;
    let target: Tilt = { x: 0, y: 0 };
    const tilt = orientation.current;

    function paint(t: number) {
      const frame = createCoreFrame(t, tilt, compact.matches || limited ? 24 : 48);
      faces.forEach((node, i) => { node.setAttribute("points", frame.faces[i].points); node.setAttribute("fill", frame.faces[i].fill); });
      backCage.setAttribute("d", frame.cageBack);
      frontCage.setAttribute("d", frame.cageFront);
      frame.rings.forEach((ring, i) => {
        backs[i].setAttribute("d", ring.back);
        fronts[i].setAttribute("d", ring.front);
        markers[i].setAttribute("cx", String(ring.marker[0]));
        markers[i].setAttribute("cy", String(ring.marker[1]));
        markers[i].setAttribute("opacity", ring.depth < 0 ? ".4" : "1");
      });
      frame.dots.forEach((dot, i) => {
        dots[i].setAttribute("cx", String(dot.point[0]));
        dots[i].setAttribute("cy", String(dot.point[1]));
        dots[i].setAttribute("r", dot.radius);
        dots[i].setAttribute("opacity", dot.opacity);
      });
    }

    function tick(now: number) {
      frameId = null;
      const interval = compact.matches || limited ? 1000 / 24 : 1000 / 30;
      if (!previous) previous = now;
      const elapsed = now - previous;
      if (elapsed >= interval) {
        const dt = Math.min(elapsed / 1000, .08);
        time += dt;
        clock.current = time;
        const ease = 1 - Math.exp(-dt * 4);
        tilt.x += (target.x - tilt.x) * ease;
        tilt.y += (target.y - tilt.y) * ease;
        paint(time);
        previous = now;
      }
      frameId = requestAnimationFrame(tick);
    }

    function sync() {
      if (frameId !== null) cancelAnimationFrame(frameId);
      frameId = null;
      previous = 0;
      if (reduced.matches) {
        tilt.x = tilt.y = 0;
        target = { x: 0, y: 0 };
        time = 0;
        clock.current = 0;
        paint(0);
      } else if (visible && !document.hidden && !paused) {
        frameId = requestAnimationFrame(tick);
      }
    }

    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    }, { threshold: .05 });
    if (observer) observer.observe(element);
    // Sem observação de viewport, a representação estática continua disponível.
    const move = (event: PointerEvent) => {
      if (!pointer.matches || reduced.matches || paused || event.pointerType === "touch") return;
      const rect = element!.getBoundingClientRect();
      target = { x: Math.max(-.14, Math.min(.14, (event.clientY - rect.top - rect.height / 2) / rect.height * .28)), y: Math.max(-.18, Math.min(.18, (event.clientX - rect.left - rect.width / 2) / rect.width * .36)) };
    };
    const leave = () => { target = { x: 0, y: 0 }; };
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    compact.addEventListener("change", sync);
    pointer.addEventListener("change", leave);
    element.addEventListener("pointermove", move, { passive: true });
    element.addEventListener("pointerleave", leave);
    sync();
    return () => {
      if (frameId !== null) cancelAnimationFrame(frameId);
      observer?.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
      compact.removeEventListener("change", sync);
      pointer.removeEventListener("change", leave);
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", leave);
    };
  }, [paused]);

  const initial = STATIC_CORE_FRAME;
  return <div ref={stage} className={styles.stage}>
    <span className={styles.caption}>Núcleo Geométrico — A Magia da Tecnologia. Escultura tridimensional com poliedro central e três anéis orbitais.</span>
    <svg ref={svg} className={styles.sculpture} viewBox="0 0 500 500" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`${id}-light`}><stop offset="0" stopColor="#168bea" stopOpacity=".13" /><stop offset="1" stopColor="#168bea" stopOpacity="0" /></radialGradient>
        <radialGradient id={`${id}-floor`}><stop offset="0" stopColor="#32c8f4" stopOpacity=".14" /><stop offset="1" stopColor="#32c8f4" stopOpacity="0" /></radialGradient>
      </defs>
      <circle cx="250" cy="245" r="220" fill={`url(#${id}-light)`} />
      <ellipse cx="250" cy="440" rx="125" ry="15" fill={`url(#${id}-floor)`} />
      <g className={styles.guide}>
        <path d="M250 30V51M250 449V470M30 250H51M449 250H470M94 94L107 107M393 393L406 406M94 406L107 393M393 107L406 94" />
        <circle cx="250" cy="250" r="213" strokeDasharray="2 16" />
        <path d="M235 250H265M250 235V265" />
      </g>
      {initial.rings.map((ring, i) => <path key={i} data-ring-back="" d={ring.back} stroke={COLORS[i]} className={styles.backRing} />)}
      <path data-cage-back="" d={initial.cageBack} className={styles.cageBack} />
      {initial.faces.map((face, i) => <polygon key={i} data-face="" points={face.points} fill={face.fill} className={styles.face} />)}
      <path data-cage-front="" d={initial.cageFront} className={styles.cageFront} />
      {initial.rings.map((ring, i) => <path key={i} data-ring-front="" d={ring.front} stroke={COLORS[i]} className={styles.frontRing} />)}
      {initial.dots.map((dot, i) => <circle key={i} data-vertex="" cx={dot.point[0]} cy={dot.point[1]} r={dot.radius} opacity={dot.opacity} className={styles.dot} />)}
      {initial.rings.map((ring, i) => <circle key={i} data-marker="" cx={ring.marker[0]} cy={ring.marker[1]} r="2.8" className={styles.marker} />)}
    </svg>
    <button type="button" className={styles.control} aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? "Retomar animação" : "Pausar animação"}</button>
  </div>;
}
