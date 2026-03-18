import React, { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle, Texture } from 'ogl';
import './PrismaticBurst.css';

const vertexShader = `#version 300 es
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = `#version 300 es
precision highp float;
precision highp int;

out vec4 fragColor;

uniform vec2  uResolution;
uniform float uTime;

uniform float uIntensity;
uniform float uAlpha;
uniform float uSpeed;
uniform int   uAnimType;
uniform vec2  uMouse;
uniform int   uColorCount;
uniform float uDistort;
uniform vec2  uOffset;
uniform sampler2D uGradient;
uniform float uNoiseAmount;
uniform int   uRayCount;
uniform float uWaveDistortion;
uniform float uParticleDensity;
uniform float uRenderQuality;

float hash21(vec2 p){
    p = floor(p);
    float f = 52.9829189 * fract(dot(p, vec2(0.065, 0.005)));
    return fract(f);
}

mat2 rot30(){ return mat2(0.8, -0.5, 0.5, 0.8); }

float layeredNoise(vec2 fragPx){
  // Balanced noise with variation but cleaner than original
  vec2 p = mod(fragPx + vec2(uTime * 6.0, -uTime * 4.0), 1024.0);
  vec2 q = rot30() * p;
  float n = 0.0;
  n += 0.4 * hash21(q);
  n += 0.2 * hash21(q * 2.0 + 17.0);
  n += 0.1 * hash21(q * 4.0 + 47.0);
  return n * 0.7;
}

// Enhanced particle field with brightness cycles
float particleField(vec3 pos, float time, float waveIntensity) {
  // Remove restrictive early exit - let particles render more freely
  if (waveIntensity > 0.95) return 0.0; // Only exit on extreme wave intensity
  
  vec3 p = pos * 0.8; // Slightly denser particle field
  p.xy += vec2(sin(time * 0.3 + p.z), cos(time * 0.25 + p.x)) * 0.3;
  
  // Multi-layer particle system for better visibility
  float particles1 = hash21(floor(p.xy * 8.0) + p.z * 3.0);
  float particles2 = hash21(floor(p.xy * 4.0) + p.z * 1.5 + 23.0);
  
  // More generous particle distribution
  particles1 = smoothstep(0.85, 0.92, particles1);
  particles2 = smoothstep(0.88, 0.94, particles2);
  
  // Combine particle layers
  float particles = max(particles1, particles2 * 0.7);
  
  // Dynamic brightness cycles - particles that brighten and fade
  float brightnessCycle = 0.7 + 0.4 * sin(time * 0.4 + p.x + p.y);
  brightnessCycle += 0.2 * sin(time * 0.6 + p.z * 2.0);
  
  // Less aggressive wave interference - preserve negative space but show particles
  particles *= mix(1.0, 0.3, waveIntensity * waveIntensity);
  
  return particles * brightnessCycle * 1.2; // Brighter particles
}

vec3 rayDir(vec2 frag, vec2 res, vec2 offset, float dist){
    float focal = res.y * max(dist, 1e-3);
    return normalize(vec3(2.0 * (frag - offset) - res, focal));
}

float edgeFade(vec2 frag, vec2 res, vec2 offset){
    vec2 toC = frag - 0.5 * res - offset;
    float r = length(toC) / (0.5 * min(res.x, res.y));
    float x = clamp(r, 0.0, 1.0);
    
    // Clean edge fade with moderate smoothing
    float q = x * x * x * (x * (x * 6.0 - 15.0) + 10.0);
    float s = q * 0.4;
    s = pow(s, 1.2);
    
    // Smooth tail without over-processing
    float tail = 1.0 - pow(1.0 - s, 1.8);
    s = mix(s, tail, 0.15);
    
    return clamp(s, 0.0, 1.0);
}

mat3 rotX(float a){ float c = cos(a), s = sin(a); return mat3(1.0,0.0,0.0, 0.0,c,-s, 0.0,s,c); }
mat3 rotY(float a){ float c = cos(a), s = sin(a); return mat3(c,0.0,s, 0.0,1.0,0.0, -s,0.0,c); }
mat3 rotZ(float a){ float c = cos(a), s = sin(a); return mat3(c,-s,0.0, s,c,0.0, 0.0,0.0,1.0); }

vec3 sampleGradient(float t){
    t = clamp(t, 0.0, 1.0);
    return texture(uGradient, vec2(t, 0.5)).rgb;
}

vec2 rot2(vec2 v, float a){
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c) * v;
}

float bendAngle(vec3 q, float t){
    float a = 0.8 * sin(q.x * 0.55 + t * 0.4)
            + 0.7 * sin(q.y * 0.50 - t * 0.3)
            + 0.6 * sin(q.z * 0.60 + t * 0.5);
    return a;
}


void main(){
    vec2 frag = gl_FragCoord.xy;
    vec2 uv = frag / uResolution.xy;
    float t = uTime * uSpeed;
    float jitterAmp = 0.1 * clamp(uNoiseAmount, 0.0, 1.0);
    vec3 dir = rayDir(frag, uResolution, uOffset, 1.0);
    float marchT = 0.0;
    vec3 col = vec3(0.0);
    float n = layeredNoise(frag);
    vec4 c = cos(t * 0.12 + vec4(0.0, 33.0, 11.0, 0.0));
    mat2 M2 = mat2(c.x, c.y, c.z, c.w);
    float amp = clamp(uDistort, 0.0, 50.0) * 0.15;

    mat3 rot3dMat = mat3(1.0);
    if(uAnimType == 1){
      vec3 ang = vec3(t * 0.18, t * 0.12, t * 0.10);
      rot3dMat = rotZ(ang.z) * rotY(ang.y) * rotX(ang.x);
    }
    mat3 hoverMat = mat3(1.0);
    if(uAnimType == 2){
      vec2 m = uMouse * 2.0 - 1.0;
      vec3 ang = vec3(m.y * 0.6, m.x * 0.6, 0.0);
      hoverMat = rotY(ang.y) * rotX(ang.x);
    }

  // Further optimized march steps for maximum performance
  for (int i = 0; i < 8; ++i) {
        vec3 P = marchT * dir;
        P.z -= 2.0;
        float rad = length(P);
        vec3 Pl = P * (10.0 / max(rad, 1e-6));

        if(uAnimType == 0){
            Pl.xz *= M2;
        } else if(uAnimType == 1){
      Pl = rot3dMat * Pl;
        } else {
      Pl = hoverMat * Pl;
        }

        // Multiple early exit conditions for maximum performance
        if (rad > 3.5) break;
        if (marchT > 6.0) break;
        
        float stepLen = min(rad - 0.15, n * jitterAmp) + 0.15;

        float grow = smoothstep(0.35, 3.0, marchT);
        float a1 = amp * grow * bendAngle(Pl * 0.6, t);
        float a2 = 0.5 * amp * grow * bendAngle(Pl.zyx * 0.5 + 3.1, t * 0.9);
        vec3 Pb = Pl;
        Pb.xz = rot2(Pb.xz, a1);
        Pb.xy = rot2(Pb.xy, a2);

    // Enhanced wave pattern with dynamic sharp highlights
    float waveScale = 1.5 + uWaveDistortion * 0.5;
    float wave1 = sin(Pb.x * waveScale + t * (0.4 * uRenderQuality));
    float wave2 = cos(Pb.z * (waveScale * 0.9) + t * (0.6 * uRenderQuality));
    float wave3 = sin(Pb.y * (waveScale * 0.8) + t * (0.3 * uRenderQuality));
    
    // Distortion-controlled perpendicular flow
    float crossFlow = sin(Pb.x * Pb.y * (0.3 + uWaveDistortion * 0.2) + t * 0.2);
    
    float basePattern = (wave1 * wave2 + wave3 * 0.8 + crossFlow * 0.3) * (0.7 + uRenderQuality * 0.1);
    
    // Dynamic sharp beam highlights that light up elegantly
    float highlightPhase1 = sin(marchT * 0.3 + t * 0.15) * cos(Pb.x * 0.8 + t * 0.12);
    float highlightPhase2 = cos(marchT * 0.25 + t * 0.18) * sin(Pb.z * 0.6 + t * 0.14);
    float sharpHighlight = (highlightPhase1 + highlightPhase2 * 0.7) * 0.4;
    
    // Slow wavy brightness variations
    float brightness = 0.8 + 0.3 * sin(marchT * 0.2 + t * 0.1) * cos(marchT * 0.15 + t * 0.08);
    
    basePattern = basePattern * brightness + sharpHighlight * smoothstep(0.2, 0.8, basePattern);
    
    // Clean anti-aliasing with sharp highlights and smooth whisper edges
    float rayPattern = smoothstep(0.15, 0.85, basePattern); // Clean edge transitions
    rayPattern = pow(rayPattern, 1.1); // Refined curve for elegance
    
    // Add occasional sharp brightness spikes for dramatic effect
    float sharpSpike = pow(smoothstep(0.7, 0.9, basePattern), 3.0) * 0.6;
    rayPattern = rayPattern + sharpSpike;
    
    // Store wave intensity for particle interaction
    float waveIntensity = clamp(rayPattern, 0.0, 1.0);

        if (uRayCount > 0) {
            float ang = atan(Pb.y, Pb.x);
            // Add organic distortion to ray angles
            float distortion = sin(ang * 3.0 + t * 0.3) * 0.25 + cos(ang * 2.0 + t * 0.4) * 0.18;
            ang += distortion;

            float comb = 0.5 + 0.5 * cos(float(uRayCount) * ang);
            comb = pow(comb, 1.8); // Even softer for more organic rays
            rayPattern *= smoothstep(0.05, 0.95, comb); // Ultra-wide smoothstep for maximum organic flow
        }

    // Cool cyan-enhanced spectral colors with elegant transitions
    vec3 spectralDefault = vec3(
      0.5 + 0.3 * cos(marchT * 2.0 + 0.5), // Cooler red channel
      0.7 + 0.4 * cos(marchT * 2.3 + 1.8), // Enhanced cyan-blue
      0.9 + 0.4 * cos(marchT * 2.6 + 2.8)  // Rich cyan-purple
    );

        float saw = fract(marchT * 0.25);
        float tRay = saw * saw * (3.0 - 2.0 * saw);
        vec3 userGradient = 2.0 * sampleGradient(tRay);
        vec3 spectral = (uColorCount > 0) ? userGradient : spectralDefault;
        // Main wave contribution
        vec3 base = (0.05 / (0.4 + stepLen))
                  * smoothstep(5.0, 0.0, rad)
                  * spectral;

        vec3 waveContrib = base * rayPattern;
        
        // Enhanced particle system with better visibility
        vec3 particleContrib = vec3(0.0);
        float maxParticleRad = 3.0 + uParticleDensity * 1.0; // Extended particle range
        if (rad < maxParticleRad && i < int(6.0 + uRenderQuality * 3.0) && uParticleDensity > 0.05) {
          float particles = particleField(Pb, t, waveIntensity) * uParticleDensity;
          vec3 particleColor = spectral * (0.12 + uParticleDensity * 0.08); // Brighter particles
          particleContrib = particleColor * particles * (0.6 + uRenderQuality * 0.2) / (1.0 + stepLen * 0.5);
        }
        
        // Simplified blending for performance
        col += waveContrib + particleContrib * smoothstep(2.5, 0.0, rad);
        marchT += stepLen;
    }


  // Optimized brightness with enhanced edge fade for whisper effects
  col = pow(clamp(col, 0.0, 1.0), vec3(0.95)); // Slightly softer gamma for smoother gradients
  
  // Enhanced edge fade with whisper effects
  float fade = edgeFade(frag, uResolution, uOffset);
  float whisperFade = pow(fade, 0.8); // Softer edge transitions
  
  col *= whisperFade;
  col *= uIntensity * 1.3; // Optimized intensity for better performance balance

  // final alpha used for compositing; keep color channels controlled
  fragColor = vec4(col, clamp(uAlpha, 0.0, 1.0));
}`;

const hexToRgb01 = hex => {
  let h = hex.trim();
  if (h.startsWith('#')) h = h.slice(1);
  if (h.length === 3) {
    const r = h[0],
      g = h[1],
      b = h[2];
    h = r + r + g + g + b + b;
  }
  const intVal = parseInt(h, 16);
  if (isNaN(intVal) || (h.length !== 6 && h.length !== 8)) return [1, 1, 1];
  const r = ((intVal >> 16) & 255) / 255;
  const g = ((intVal >> 8) & 255) / 255;
  const b = (intVal & 255) / 255;
  return [r, g, b];
};

const toPx = v => {
  if (v == null) return 0;
  if (typeof v === 'number') return v;
  const s = String(v).trim();
  const num = parseFloat(s.replace('px', ''));
  return isNaN(num) ? 0 : num;
};

const PrismaticBurst = ({
  intensity = 0.6,
  alpha = 0.12,
  speed = 0.5,
  animationType = 'rotate3d',
  colors,
  distort = 0,
  paused = false,
  offset = { x: 0, y: 0 },
  hoverDampness = 0,
  rayCount,
  mixBlendMode = 'lighten',
  className = '', // NEW: Support for custom CSS classes
  // Performance-friendly distortion parameters
  waveDistortion = 1.0,    // Controls wave complexity (0.5-2.0 range)
  particleDensity = 1.0,   // Controls particle density (0.0-2.0 range)
  renderQuality = 1.0      // Overall quality multiplier (0.5-1.5 range)
}) => {
  const containerRef = useRef(null);
  const programRef = useRef(null);
  const rendererRef = useRef(null);
  const mouseTargetRef = useRef([0.5, 0.5]);
  const mouseSmoothRef = useRef([0.5, 0.5]);
  const pausedRef = useRef(paused);
  const gradTexRef = useRef(null);
  const hoverDampRef = useRef(hoverDampness);
  const isVisibleRef = useRef(true);
  const meshRef = useRef(null);
  const triRef = useRef(null);

  useEffect(() => { pausedRef.current = paused; }, [paused]);
  useEffect(() => { hoverDampRef.current = hoverDampness; }, [hoverDampness]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

  // cap DPR to reduce GPU cost on high-density displays while keeping quality
  const dpr = Math.min(window.devicePixelRatio || 1, 1.0);
  // enable alpha so the canvas can be composited softly over the page
  const renderer = new Renderer({ dpr, alpha: true, antialias: true });
    rendererRef.current = renderer;

    const gl = renderer.gl;
    gl.canvas.style.position = 'absolute';
    gl.canvas.style.inset = '0';
    gl.canvas.style.width = '100%';
    gl.canvas.style.height = '100%';
    gl.canvas.style.mixBlendMode = mixBlendMode && mixBlendMode !== 'none' ? mixBlendMode : '';
    container.appendChild(gl.canvas);

    const white = new Uint8Array([255, 255, 255, 255]);
    const gradientTex = new Texture(gl, {
      image: white,
      width: 1,
      height: 1,
      generateMipmaps: false,
      flipY: false
    });

    gradientTex.minFilter = gl.LINEAR;
    gradientTex.magFilter = gl.LINEAR;
    gradientTex.wrapS = gl.CLAMP_TO_EDGE;
    gradientTex.wrapT = gl.CLAMP_TO_EDGE;
    gradTexRef.current = gradientTex;

  const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uResolution: { value: [1, 1] },
        uTime: { value: 0 },

    uIntensity: { value: 1 },
    uAlpha: { value: 1 },
        uSpeed: { value: 1 },
        uAnimType: { value: 0 },
        uMouse: { value: [0.5, 0.5] },
        uColorCount: { value: 0 },
        uDistort: { value: 0 },
        uOffset: { value: [0, 0] },
        uGradient: { value: gradientTex },
        uNoiseAmount: { value: 0.6 },
        uRayCount: { value: 0 },
        uWaveDistortion: { value: 1.0 },
        uParticleDensity: { value: 1.0 },
        uRenderQuality: { value: 1.0 }
      }
    });

    programRef.current = program;

    const triangle = new Triangle(gl);
    const mesh = new Mesh(gl, { geometry: triangle, program });
    triRef.current = triangle;
    meshRef.current = mesh;

    const resize = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      renderer.setSize(w, h);
      program.uniforms.uResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight];
    };

    let ro = null;
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(resize);
      ro.observe(container);
    } else {
      window.addEventListener('resize', resize);
    }
    resize();

    const onPointer = e => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / Math.max(rect.width, 1);
      const y = (e.clientY - rect.top) / Math.max(rect.height, 1);
      mouseTargetRef.current = [Math.min(Math.max(x, 0), 1), Math.min(Math.max(y, 0), 1)];
    };
    container.addEventListener('pointermove', onPointer, { passive: true });

    let io = null;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(entries => { if (entries[0]) isVisibleRef.current = entries[0].isIntersecting; }, { root: null, threshold: 0.01 });
      io.observe(container);
    }

    const onVis = () => {};
    document.addEventListener('visibilitychange', onVis);

    let raf = 0;
    let last = performance.now();
    let accumTime = 0;

    const update = now => {
      const dt = Math.max(0, now - last) * 0.001;
      last = now;
      const visible = isVisibleRef.current && !document.hidden;
      if (!pausedRef.current) accumTime += dt;

      if (!visible) {
        raf = requestAnimationFrame(update);
        return;
      }

      const tau = 0.02 + Math.max(0, Math.min(1, hoverDampRef.current)) * 0.5;
      const alpha = 1 - Math.exp(-dt / tau);
      const tgt = mouseTargetRef.current;
      const sm = mouseSmoothRef.current;
      sm[0] += (tgt[0] - sm[0]) * alpha;
      sm[1] += (tgt[1] - sm[1]) * alpha;

      program.uniforms.uMouse.value = sm;
      program.uniforms.uTime.value = accumTime;

      renderer.render({ scene: meshRef.current });
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);

    // fade the canvas in to the requested alpha and hint compositing
    const canvas = rendererRef.current?.gl?.canvas;
    if (canvas) {
      // ensure a gentle transition (CSS fallback + explicit set)
      canvas.style.transition = 'opacity 1200ms ease-in-out, filter 900ms ease-in-out';
      canvas.style.opacity = String(alpha ?? 0.12);
      canvas.style.willChange = 'opacity, transform';
      canvas.style.pointerEvents = 'none';
    }

    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener('pointermove', onPointer);
      ro?.disconnect();
      if (!ro) window.removeEventListener('resize', resize);
      io?.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      try { container.removeChild(gl.canvas); } catch {}
      try { meshRef.current?.remove?.(); } catch {}
      try { triRef.current?.remove?.(); } catch {}
      try { programRef.current?.remove?.(); } catch {}
      try { const glCtx = rendererRef.current?.gl; if (glCtx && gradTexRef.current?.texture) glCtx.deleteTexture(gradTexRef.current.texture); } catch {}
      programRef.current = null; rendererRef.current = null; gradTexRef.current = null; meshRef.current = null; triRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const canvas = rendererRef.current?.gl?.canvas;
    if (canvas) {
      canvas.style.mixBlendMode = mixBlendMode && mixBlendMode !== 'none' ? mixBlendMode : '';
      // also ensure opacity follows the alpha prop so we can fade the background down
      canvas.style.opacity = String(alpha ?? 0.12);
      canvas.style.pointerEvents = 'none';
    }
  }, [mixBlendMode]);

  useEffect(() => {
    const program = programRef.current;
    const renderer = rendererRef.current;
    const gradTex = gradTexRef.current;
    if (!program || !renderer || !gradTex) return;

  program.uniforms.uIntensity.value = intensity ?? 1;
  program.uniforms.uAlpha.value = alpha ?? 1;
  program.uniforms.uSpeed.value = speed ?? 1;

    const animTypeMap = { rotate: 0, rotate3d: 1, hover: 2 };
    program.uniforms.uAnimType.value = animTypeMap[animationType ?? 'rotate'];

    program.uniforms.uDistort.value = typeof distort === 'number' ? distort : 0;

    const ox = toPx(offset?.x);
    const oy = toPx(offset?.y);
    program.uniforms.uOffset.value = [ox, oy];
    program.uniforms.uRayCount.value = Math.max(0, Math.floor(rayCount ?? 0));

    let count = 0;
    if (Array.isArray(colors) && colors.length > 0) {
      const gl = renderer.gl;
      const capped = colors.slice(0, 64);
      count = capped.length;
      const data = new Uint8Array(count * 4);
      for (let i = 0; i < count; i++) {
        const [r, g, b] = hexToRgb01(capped[i]);
        data[i * 4 + 0] = Math.round(r * 255);
        data[i * 4 + 1] = Math.round(g * 255);
        data[i * 4 + 2] = Math.round(b * 255);
        data[i * 4 + 3] = 255;
      }
      gradTex.image = data;
      gradTex.width = count;
      gradTex.height = 1;
      gradTex.minFilter = gl.LINEAR;
      gradTex.magFilter = gl.LINEAR;
      gradTex.wrapS = gl.CLAMP_TO_EDGE;
      gradTex.wrapT = gl.CLAMP_TO_EDGE;
      gradTex.flipY = false;
      gradTex.generateMipmaps = false;
      gradTex.format = gl.RGBA;
      gradTex.type = gl.UNSIGNED_BYTE;
      gradTex.needsUpdate = true;
    } else {
      count = 0;
    }
    program.uniforms.uColorCount.value = count;
    
    // Update performance-friendly distortion parameters
    program.uniforms.uWaveDistortion.value = Math.max(0.5, Math.min(2.0, waveDistortion ?? 1.0));
    program.uniforms.uParticleDensity.value = Math.max(0.0, Math.min(2.0, particleDensity ?? 1.0));
    program.uniforms.uRenderQuality.value = Math.max(0.5, Math.min(1.5, renderQuality ?? 1.0));
  }, [intensity, speed, animationType, colors, distort, offset, rayCount, waveDistortion, particleDensity, renderQuality]);

  return <div className={`prismatic-burst-container ${className}`} ref={containerRef} />;
};

export default PrismaticBurst;
