import { describe, expect, it } from "vitest";
import { createCoreFrame, EDGES, FACES, project, rotate, STATIC_CORE_FRAME, VERTICES } from "./geometricCoreMath";

describe("Núcleo Geométrico — matemática 3D", () => {
  it("forma um icosaedro regular: 12 vértices, 30 arestas e 20 faces", () => {
    expect(VERTICES).toHaveLength(12);
    expect(EDGES).toHaveLength(30);
    expect(FACES).toHaveLength(20);
    for (const p of VERTICES) expect(Math.hypot(...p)).toBeCloseTo(1);
    for (const [a, b] of EDGES) expect(Math.hypot(...VERTICES[a].map((v, i) => v - VERTICES[b][i]))).toBeCloseTo(2 / Math.hypot(1, (1 + Math.sqrt(5)) / 2));
  });
  it("a rotação preserva distâncias nos três eixos", () => {
    expect(Math.hypot(...rotate([1, 2, 3], .8, -.3, 2))).toBeCloseTo(Math.sqrt(14));
  });
  it("a perspectiva amplia pontos próximos da câmera", () => {
    expect(project([1, 0, 1])[0]).toBeGreaterThan(project([1, 0, -1])[0]);
  });
  it("produz um fallback estático determinístico para SSR e hidratação", () => {
    expect(createCoreFrame()).toEqual(STATIC_CORE_FRAME);
    expect(JSON.stringify(STATIC_CORE_FRAME)).not.toMatch(/NaN|Infinity/);
  });
  it("anima núcleo, três órbitas e vértices sem perder a ordenação em profundidade", () => {
    const next = createCoreFrame(3);
    expect(next.faces).toHaveLength(20);
    expect(next.rings).toHaveLength(3);
    expect(next.dots).toHaveLength(12);
    expect(next.faces).not.toEqual(STATIC_CORE_FRAME.faces);
    next.rings.forEach((ring, i) => expect(ring.front).not.toBe(STATIC_CORE_FRAME.rings[i].front));
    expect(next.dots).not.toEqual(STATIC_CORE_FRAME.dots);
    expect(next.faces.map((f) => f.depth)).toEqual(next.faces.map((f) => f.depth).sort((a, b) => a - b));
  });
  it("reduz pela metade os segmentos orbitais para dispositivos limitados", () => {
    const full = createCoreFrame(1, { x: 0, y: 0 }, 48);
    const low = createCoreFrame(1, { x: 0, y: 0 }, 24);
    full.rings.forEach((ring, i) => {
      expect((ring.front + ring.back).match(/M/g)).toHaveLength(48);
      expect((low.rings[i].front + low.rings[i].back).match(/M/g)).toHaveLength(24);
    });
  });
  it("inclina o conjunto sem alterar a geometria, em resposta ao mouse", () => {
    const normal = createCoreFrame(2);
    const tilted = createCoreFrame(2, { x: .08, y: -.12 });
    expect(tilted.faces).toHaveLength(normal.faces.length);
    expect(tilted.faces[0].points).not.toBe(normal.faces[0].points);
    expect(tilted.rings[0].front).not.toBe(normal.rings[0].front);
  });
  it("mantém coordenadas dentro da área visual durante rotação e inclinação máximas", () => {
    for (const time of [0, 10, 50, 200]) {
      const frame = createCoreFrame(time, { x: .14, y: .18 });
      for (const point of [...frame.dots.map((dot) => dot.point), ...frame.rings.map((ring) => ring.marker)]) {
        for (const coordinate of point) expect(coordinate).toBeGreaterThan(10);
        for (const coordinate of point) expect(coordinate).toBeLessThan(490);
      }
    }
  });
});
