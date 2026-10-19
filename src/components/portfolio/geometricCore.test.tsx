import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GeometricCore } from "./geometricCore";
import { createCoreFrame } from "./geometricCoreMath";

function media(matches = false) {
  const handlers = new Set<() => void>();
  return { matches, addEventListener: vi.fn((_event: string, fn: () => void) => handlers.add(fn)), removeEventListener: vi.fn((_event: string, fn: () => void) => handlers.delete(fn)), change(value: boolean) { this.matches = value; handlers.forEach((fn) => fn()); } };
}

let reduced: ReturnType<typeof media>;
let compact: ReturnType<typeof media>;
let observer: (entries: { isIntersecting: boolean }[]) => void;
let disconnect: ReturnType<typeof vi.fn>;
let callbacks: Map<number, FrameRequestCallback>;
let hidden = false;
let counter = 0;

function visible(value = true) { act(() => observer([{ isIntersecting: value }])); }
function step(now: number) {
  const pending = [...callbacks.values()];
  callbacks.clear();
  act(() => pending.forEach((callback) => callback(now)));
}

beforeEach(() => {
  reduced = media(); compact = media(); disconnect = vi.fn(); callbacks = new Map(); counter = 0; hidden = false;
  vi.stubGlobal("matchMedia", (query: string) => query.includes("reduced-motion") ? reduced : query.includes("max-width") ? compact : media(true));
  vi.stubGlobal("requestAnimationFrame", vi.fn((callback: FrameRequestCallback) => { callbacks.set(++counter, callback); return counter; }));
  vi.stubGlobal("cancelAnimationFrame", vi.fn((id: number) => callbacks.delete(id)));
  vi.stubGlobal("IntersectionObserver", class { constructor(callback: typeof observer) { observer = callback; } observe() {} disconnect = disconnect; });
  vi.spyOn(document, "hidden", "get").mockImplementation(() => hidden);
  vi.spyOn(navigator, "hardwareConcurrency", "get").mockReturnValue(8);
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

describe("Núcleo Geométrico — ciclo de vida", () => {
  it("renderiza a escultura estática antes da observação, sem canvas ou WebGL", () => {
    const { container } = render(<GeometricCore />);
    expect(container.querySelectorAll("[data-face]")).toHaveLength(20);
    expect(container.querySelectorAll("[data-ring-front]")).toHaveLength(3);
    expect(container.querySelector("canvas")).toBeNull();
    expect(requestAnimationFrame).not.toHaveBeenCalled();
  });
  it("só anima na viewport e limita atualizações a 30 fps", () => {
    const { container } = render(<GeometricCore />);
    const face = container.querySelector("[data-face]")!;
    const first = face.getAttribute("points");
    visible(); step(100); step(116);
    expect(face.getAttribute("points")).toBe(first);
    step(135);
    expect(face.getAttribute("points")).not.toBe(first);
    visible(false);
    expect(callbacks.size).toBe(0);
  });
  it("mantém pose estática com movimento reduzido e acompanha mudanças de preferência", () => {
    reduced.matches = true;
    render(<GeometricCore />);
    visible();
    expect(callbacks.size).toBe(0);
    act(() => reduced.change(false));
    expect(callbacks.size).toBe(1);
    act(() => reduced.change(true));
    expect(callbacks.size).toBe(0);
  });
  it("pausa enquanto a aba está oculta e retoma sem avançar o relógio oculto", () => {
    render(<GeometricCore />); visible(); step(100); step(140);
    hidden = true;
    act(() => document.dispatchEvent(new Event("visibilitychange")));
    expect(callbacks.size).toBe(0);
    hidden = false;
    act(() => document.dispatchEvent(new Event("visibilitychange")));
    expect(callbacks.size).toBe(1);
  });
  it("permite pausar e retomar pelo botão acessível", () => {
    render(<GeometricCore />); visible();
    fireEvent.click(screen.getByRole("button", { name: "Pausar animação" }));
    expect(callbacks.size).toBe(0);
    expect(screen.getByRole("button", { name: "Retomar animação" })).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(screen.getByRole("button", { name: "Retomar animação" }));
    visible();
    expect(callbacks.size).toBe(1);
  });
  it("reduz segmentos no mobile sem impedir rolagem", () => {
    compact.matches = true;
    const { container } = render(<GeometricCore />); visible(); step(100); step(150);
    const paths = [container.querySelector("[data-ring-front]"), container.querySelector("[data-ring-back]")].map((node) => node!.getAttribute("d")).join("");
    expect(paths.match(/M/g)).toHaveLength(24);
    expect(container.querySelector("svg")).not.toHaveAttribute("tabindex");
  });
  it("inclina com mouse e retorna gradualmente ao centro ao sair", () => {
    const { container } = render(<GeometricCore />);
    const stage = container.firstElementChild!;
    vi.spyOn(stage, "getBoundingClientRect").mockReturnValue({ top: 0, left: 0, width: 400, height: 400 } as DOMRect);
    visible(); step(100);
    const event = new Event("pointermove");
    Object.defineProperties(event, { clientX: { value: 400 }, clientY: { value: 0 }, pointerType: { value: "mouse" } });
    fireEvent(stage, event); step(140);
    const ease = 1 - Math.exp(-.04 * 4);
    const tilt = { x: -.14 * ease, y: .18 * ease };
    const face = container.querySelector("[data-face]")!;
    expect(face.getAttribute("points")).toBe(createCoreFrame(.04, tilt).faces[0].points);
    fireEvent.pointerLeave(stage); step(180);
    expect(face.getAttribute("points")).toBe(createCoreFrame(.08, { x: tilt.x * (1 - ease), y: tilt.y * (1 - ease) }).faces[0].points);
  });
  it("continua estático se o navegador não disponibiliza IntersectionObserver", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    const { container } = render(<GeometricCore />);
    expect(container.querySelectorAll("[data-vertex]")).toHaveLength(12);
    expect(callbacks.size).toBe(0);
  });
  it("cancela quadros e remove observadores e listeners ao desmontar", () => {
    const { unmount } = render(<GeometricCore />); visible();
    unmount();
    expect(callbacks.size).toBe(0);
    expect(disconnect).toHaveBeenCalledOnce();
    expect(reduced.removeEventListener).toHaveBeenCalledWith("change", expect.any(Function));
    expect(compact.removeEventListener).toHaveBeenCalledWith("change", expect.any(Function));
  });
});
