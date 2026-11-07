precision highp float;

uniform float uTime;
uniform float uSeed;
uniform vec2  uRes;
uniform vec2  uMouse;
uniform float uGrain;
uniform float uMouseInfluence;
uniform vec3  uBase;
uniform vec3  uDeep;
uniform vec3  uPurple;
uniform vec3  uTeal;
uniform vec3  uPink;
varying vec2 vUv;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = p * 2.02 + vec2(17.3, 9.1);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 p = (vUv - 0.5) * vec2(uRes.x / uRes.y, 1.0);
  p += (uMouse - 0.5) * uMouseInfluence;

  float t = uTime;
  vec2 q = vec2(fbm(p * 1.6 + vec2(0.0, t)),
                fbm(p * 1.6 + vec2(5.2, -t)));
  vec2 r = vec2(fbm(p * 1.6 + 2.0 * q + vec2(1.7, 9.2) + t),
                fbm(p * 1.6 + 2.0 * q + vec2(8.3, 2.8) - t));
  float f = fbm(p * 1.4 + 2.2 * r);

  vec3 col = mix(uBase, uDeep, smoothstep(0.35, 0.75, f));
  col = mix(col, uPurple, smoothstep(0.30, 0.90, length(q)) * 0.65);
  col = mix(col, uTeal,   smoothstep(0.55, 0.90, r.x) * 0.70);
  col = mix(col, uPink,   smoothstep(0.60, 1.00, r.y) * 0.75);

  // soft vignette keeps the edges calm
  float d = distance(vUv, vec2(0.5));
  col *= 1.0 - 0.45 * d * d * 2.0;

  // animated film grain
  float g = hash(gl_FragCoord.xy + uSeed) - 0.5;
  col += g * uGrain;

  gl_FragColor = vec4(col, 1.0);
}
