import * as THREE from 'three';
import vertexShader from '../shaders/background.vert?raw';
import fragmentShader from '../shaders/background.frag?raw';
import { BACKGROUND } from '../config/background.js';

function hexToVec3(hex) {
  const n = parseInt(hex.replace('#', ''), 16);
  return new THREE.Vector3(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
}

export function initBackground() {
  const canvas = document.createElement('canvas');
  canvas.className = 'bg-canvas';
  canvas.setAttribute('aria-hidden', 'true');

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'low-power' });
  } catch (err) {
    // No WebGL: the static bg.jpg from the CSS stays in place.
    console.warn('WebGL unavailable, using the static background.', err);
    return;
  }
  document.body.appendChild(canvas);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, BACKGROUND.maxPixelRatio));

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const uniforms = {
    uTime: { value: 0 },
    uSeed: { value: 0 },
    uRes: { value: new THREE.Vector2(1, 1) },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uGrain: { value: BACKGROUND.grain },
    uMouseInfluence: { value: BACKGROUND.mouseInfluence },
    uBase: { value: hexToVec3(BACKGROUND.base) },
    uDeep: { value: hexToVec3(BACKGROUND.deep) },
    uPurple: { value: hexToVec3(BACKGROUND.purple) },
    uTeal: { value: hexToVec3(BACKGROUND.teal) },
    uPink: { value: hexToVec3(BACKGROUND.pink) }
  };

  scene.add(new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader })
  ));

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const target = new THREE.Vector2(0.5, 0.5);

  function resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h, false);
    uniforms.uRes.value.set(w, h);
    if (reduced) draw(12.0);
  }

  function draw(seconds) {
    uniforms.uTime.value = seconds * BACKGROUND.speed;
    uniforms.uSeed.value = (seconds * 60.0) % 997.0;
    renderer.render(scene, camera);
  }

  window.addEventListener('resize', resize);
  resize();

  if (reduced) return; // people who prefer less motion get one still frame

  window.addEventListener('pointermove', (e) => {
    target.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
  });

  const start = performance.now();
  function frame(now) {
    uniforms.uMouse.value.lerp(target, 0.04);
    draw((now - start) / 1000);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
