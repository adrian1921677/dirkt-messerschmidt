// Hilfsfunktionen für WebGL Vektor-Typen
export const vec2 = (x: number, y: number): [number, number] => [x, y];
export const vec3 = (x: number, y: number, z: number): [number, number, number] => [x, y, z];
export const vec4 = (x: number, y: number, z: number, w: number): [number, number, number, number] => [x, y, z, w];

// Typen für bessere Typsicherheit
export type Vec2 = [number, number];
export type Vec3 = [number, number, number];
export type Vec4 = [number, number, number, number];
