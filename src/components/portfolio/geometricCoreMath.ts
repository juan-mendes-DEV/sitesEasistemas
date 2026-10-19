/** Geometria original: icosaedro, gaiola externa e órbitas em coordenadas 3D.
 * Projeção em SVG (sem WebGL, texturas, modelos ou números aleatórios).
 * A mesma pose inicial é usada no servidor, hidratação e fallback estático. */
export type Vec3 = readonly [number, number, number];
export type Tilt = { x: number; y: number };

const PHI = (1 + Math.sqrt(5)) / 2;
const LENGTH = Math.hypot(1, PHI);
export const VERTICES: Vec3[] = [
  [-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0],
  [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI],
  [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1],
].map(([x, y, z]) => [x / LENGTH, y / LENGTH, z / LENGTH]);

export const FACES = [
  [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
  [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
  [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
  [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
] as const;

export const EDGES: [number, number][] = Array.from(new Set(
  FACES.flatMap(([a, b, c]) => [[a, b], [b, c], [c, a]].map((pair) => pair.sort((x, y) => x - y).join(","))),
)).map((edge) => edge.split(",").map(Number) as [number, number]);

export function rotate([x, y, z]: Vec3, ax: number, ay: number, az: number): Vec3 {
  const y1 = y * Math.cos(ax) - z * Math.sin(ax);
  const z1 = y * Math.sin(ax) + z * Math.cos(ax);
  const x2 = x * Math.cos(ay) + z1 * Math.sin(ay);
  const z2 = -x * Math.sin(ay) + z1 * Math.cos(ay);
  return [x2 * Math.cos(az) - y1 * Math.sin(az), x2 * Math.sin(az) + y1 * Math.cos(az), z2];
}

export function project([x, y, z]: Vec3, lift = 0): [number, number] {
  const perspective = 5.6 / (5.6 - z);
  return [250 + x * 113 * perspective, 250 - y * 113 * perspective + lift];
}

const coords = (point: Vec3, lift: number) => project(point, lift).map((n) => n.toFixed(2)).join(",");
const scale = (point: Vec3, value: number): Vec3 => [point[0] * value, point[1] * value, point[2] * value];
const line = (a: Vec3, b: Vec3, lift: number) => `M${coords(a, lift)}L${coords(b, lift)}`;

export function createCoreFrame(time = 0, tilt: Tilt = { x: 0, y: 0 }, segments = 48) {
  const lift = Math.sin(time * .55) * 5;
  const orient = (p: Vec3) => rotate(p, tilt.x, tilt.y, -.12);
  const core = VERTICES.map((point) => orient(rotate(scale(point, .73), .34 + time * .075, .46 + time * .13, .12)));
  const faces = FACES.map((face, index) => {
    const points = face.map((i) => core[i]);
    const [a, b, c] = points;
    const u = b.map((n, i) => n - a[i]);
    const v = c.map((n, i) => n - a[i]);
    const normal = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
    const length = Math.hypot(...normal);
    const light = Math.max(0, (normal[0] * -.4 + normal[1] * .6 + normal[2] * .7) / length);
    const silver = index % 4 === 0;
    const base = silver ? [72, 97, 118] : [12, 40, 66];
    const amount = silver ? 124 : 66;
    return {
      points: points.map((point) => coords(point, lift)).join(" "),
      fill: `rgb(${base.map((channel) => Math.round(channel + light * amount)).join(",")})`,
      depth: points.reduce((sum, p) => sum + p[2], 0) / 3,
    };
  }).sort((a, b) => a.depth - b.depth);

  const cage = VERTICES.map((point) => orient(rotate(scale(point, 1.16), -.27 - time * .045, -.1 + time * .065, .28)));
  const cageBack = EDGES.filter(([a, b]) => cage[a][2] + cage[b][2] < 0).map(([a, b]) => line(cage[a], cage[b], lift)).join("");
  const cageFront = EDGES.filter(([a, b]) => cage[a][2] + cage[b][2] >= 0).map(([a, b]) => line(cage[a], cage[b], lift)).join("");

  const rings = [
    { radius: 1.67, x: 1.16, y: .18, z: .08, speed: .11 },
    { radius: 1.48, x: .44, y: .99, z: -.64, speed: .085 },
    { radius: 1.83, x: -.78, y: -.41, z: .54, speed: -.07 },
  ].map((ring, index) => {
    const pointAt = (angle: number) => orient(rotate(
      [Math.cos(angle) * ring.radius, Math.sin(angle) * ring.radius, 0],
      ring.x + Math.sin(time * .09 + index) * .08, ring.y, ring.z + time * ring.speed,
    ));
    const points = Array.from({ length: segments }, (_, i) => pointAt(i * Math.PI * 2 / segments));
    const front: string[] = [], back: string[] = [];
    points.forEach((point, i) => {
      const next = points[(i + 1) % points.length];
      (point[2] + next[2] >= 0 ? front : back).push(line(point, next, lift));
    });
    const marker = pointAt(time * ring.speed * 1.7 + index * 2.1);
    return { front: front.join(""), back: back.join(""), marker: project(marker, lift), depth: marker[2] };
  });

  const dots = cage.map((point, i) => ({
    point: project(point, lift),
    opacity: (.4 + (point[2] + 1.16) / 4 + Math.sin(time * 1.2 + i * .7) * .1).toFixed(3),
    radius: (1.65 + Math.sin(time * 1.2 + i * .7) * .25).toFixed(2),
  }));
  return { faces, cageBack, cageFront, rings, dots };
}

export const STATIC_CORE_FRAME = createCoreFrame();
