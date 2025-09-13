import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './LiquidEther.css';

export default function LiquidEther({
  colors = ['#5227FF', '#FF9FFC', '#B19EEF'],
  style = {},
  className = '',
  // Refined star field configuration for smaller stars and proper rotation
  starLayers = 6,
  starDensity = 0.75,
  starDriftSpeed = 0.035,
  starRotationSpeed = 0.15,
  starBrightness = 3.5,
  starTwinkleSpeed = 3.2,
  enableStars = false
}) {
  console.log('LiquidEther: Component function called with colors:', colors);
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const materialRef = useRef(null);
  const animationRef = useRef(null);
  const velocityTexture1Ref = useRef(null);
  const velocityTexture2Ref = useRef(null);
  const timeRef = useRef(0);
  const cleanupRef = useRef(null);

  useEffect(() => {
    console.log('LiquidEther: useEffect triggered');

    const checkContainer = () => {
      if (!mountRef.current) {
        console.log('LiquidEther: No mountRef, waiting...');
        setTimeout(checkContainer, 100);
        return;
      }

      const container = mountRef.current;
      console.log('LiquidEther: Container found:', container);
      initializeLiquidEther(container);
    };

    const initializeLiquidEther = (container) => {
      let renderer, scene, camera, material, geometry, mesh;

      try {
        console.log('LiquidEther: Starting WebGL initialization...');

        // Initialize Three.js
        scene = new THREE.Scene();
        camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

        renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: false,
          powerPreference: 'high-performance'
        });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setClearColor(0x000000, 0);

        console.log('LiquidEther: WebGL renderer created');
        container.appendChild(renderer.domElement);
        console.log('LiquidEther: Canvas element added to DOM:', renderer.domElement);

        // Performance optimization: detect device capabilities
        const isLowEndDevice = navigator.hardwareConcurrency <= 4 ||
                              !renderer.capabilities.floatFragmentTextures ||
                              window.devicePixelRatio < 1.5;

        if (isLowEndDevice) {
          console.log('LiquidEther: Low-end device detected, reducing quality for performance');
          renderer.setPixelRatio(1.0); // Reduce pixel ratio for better performance
        }

        // Create palette texture from colors
        const paletteCanvas = document.createElement('canvas');
        paletteCanvas.width = colors.length;
        paletteCanvas.height = 1;
        const ctx = paletteCanvas.getContext('2d');

        colors.forEach((color, i) => {
          ctx.fillStyle = color;
          ctx.fillRect(i, 0, 1, 1);
        });

        const paletteTexture = new THREE.CanvasTexture(paletteCanvas);
        paletteTexture.magFilter = THREE.LinearFilter;
        paletteTexture.minFilter = THREE.LinearFilter;
        paletteTexture.wrapS = THREE.ClampToEdgeWrapping;
        paletteTexture.wrapT = THREE.ClampToEdgeWrapping;

        // Create velocity textures with balanced resolution for performance vs quality
        const textureSize = 48;
        const velocityData1 = new Float32Array(textureSize * textureSize * 4);
        const velocityData2 = new Float32Array(textureSize * textureSize * 4);

        const velocityTexture1 = new THREE.DataTexture(velocityData1, textureSize, textureSize, THREE.RGBAFormat, THREE.FloatType);
        const velocityTexture2 = new THREE.DataTexture(velocityData2, textureSize, textureSize, THREE.RGBAFormat, THREE.FloatType);

        velocityTexture1.magFilter = THREE.LinearFilter;
        velocityTexture1.minFilter = THREE.LinearFilter;
        velocityTexture2.magFilter = THREE.LinearFilter;
        velocityTexture2.minFilter = THREE.LinearFilter;

        velocityTexture1Ref.current = velocityTexture1;
        velocityTexture2Ref.current = velocityTexture2;

        // Shader material
        const vertexShader = `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `;

        const fragmentShader = `
          uniform float uTime;
          uniform vec2 uMouse;
          uniform vec2 uResolution;
          uniform sampler2D uPalette;
          uniform sampler2D uVelocity;
          uniform float uEnableStars;
          uniform float uStarLayers;
          uniform float uStarDensity;
          uniform float uStarDriftSpeed;
          uniform float uStarRotationSpeed;
          uniform float uStarBrightness;
          uniform float uStarTwinkleSpeed;
          varying vec2 vUv;

          // High-quality Perlin noise functions for smooth, non-pixelated results
          vec2 hash2(vec2 p) {
            p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
            return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
          }

          float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            vec2 u = f * f * (3.0 - 2.0 * f); // Smooth interpolation

            return mix(mix(dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
                           dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
                      mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
                           dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y);
          }

          float fbm(vec2 p) {
            float value = 0.0;
            float amplitude = 0.5;
            float frequency = 1.0;

            // Optimized to 3 octaves for performance while maintaining visual quality
            for(int i = 0; i < 3; i++) {
              value += amplitude * noise(p * frequency);
              amplitude *= 0.5;
              frequency *= 2.0;
            }
            return value;
          }

          // Ultra-smooth interpolation
          float smootherstep(float edge0, float edge1, float x) {
            x = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
            return x * x * x * (x * (x * 6.0 - 15.0) + 10.0);
          }

          // Optimized dithering for anti-aliasing with reduced frequency for performance
          float dither(vec2 uv, float time) {
            return (noise(uv * 32.0 + time * 0.1) - 0.5) * 0.001;
          }

          float waterFlow(vec2 p, float time, float layer) {
            // Add random timing offset for organic feel (ultra-smooth Perlin noise)
            float timeOffset = fbm(p * 4.0 + time * 0.1) * 6.28;
            float adjustedTime = time + timeOffset * 0.3;

            float flowSpeed = (0.08 + layer * 0.03) * 1.4;
            vec2 flow = vec2(
              sin(p.y * 3.5 + adjustedTime * flowSpeed) * 0.5,
              adjustedTime * flowSpeed * 0.6 + sin(p.x * 4.2 + adjustedTime * flowSpeed * 1.1) * 0.4
            );

            // Add turbulence with different directions (simplified for performance)
            flow.x += cos(p.y * 2.1 + adjustedTime * flowSpeed * 0.9) * 0.45;
            flow.y += sin(p.x * 2.8 + adjustedTime * flowSpeed * 1.0) * 0.35;

            // Add simplified chaotic turbulence
            float turbulence = sin(p.x * 7.0 + p.y * 4.5 + adjustedTime * 1.2) * 0.15;
            flow.x += turbulence * cos(p.y * 3.0 + adjustedTime * 0.8);

            vec2 flowPos = p + flow;

            // More organic noise layers
            float gradient = sin(flowPos.y * 4.5) * cos(flowPos.x * 3.8);
            gradient += sin(flowPos.y * 2.2 + flowPos.x * 1.9) * 0.9;
            gradient += cos(flowPos.y * 6.0 - flowPos.x * 1.3) * 0.7;
            gradient += sin(flowPos.x * flowPos.y * 3.2 + adjustedTime * 0.5) * 0.5;
            gradient += cos(flowPos.y * 7.5 + flowPos.x * 2.5) * 0.4;
            gradient += sin(flowPos.x * 4.0 + flowPos.y * 3.0 + adjustedTime * 0.4) * 0.3;

            // Add optimized organic noise with reduced frequency for performance
            gradient += fbm(flowPos * 4.0 + adjustedTime * 0.2) * 0.6;
            gradient += noise(flowPos * 8.0 + adjustedTime * 0.1) * 0.3;
            gradient += sin(flowPos.x * 6.0 + flowPos.y * 4.5 + adjustedTime * 0.4) * 0.2;

            gradient = gradient * 0.35 + 0.5;
            gradient = smootherstep(0.15, 0.85, gradient); // Ultra-smooth edges
            gradient += dither(p, time) * 0.05; // Subtle high-frequency dithering
            return gradient;
          }

          vec2 waterDistortion(vec2 p, float time) {
            // Add organic variation with ultra-smooth Perlin noise (no grid artifacts)
            float offset1 = fbm(p * 6.0 + time * 0.1) * 2.0;
            float offset2 = fbm(p * 8.0 + time * 0.15 + 1.0) * 1.5;

            float wave1 = sin(p.y * 12.0 + time * 0.8 + offset1) * 0.08;
            float wave2 = cos(p.x * 8.5 + time * 0.7 + offset2) * 0.07;
            float wave3 = sin((p.x + p.y) * 6.5 + time * 1.0 + offset1 * 0.5) * 0.06;
            float wave4 = cos(p.x * p.y * 15.0 + time * 0.6 + offset2 * 0.3) * 0.05;
            float wave5 = sin(p.y * 9.0 - p.x * 4.0 + time * 0.9 + offset1 * 0.7) * 0.04;
            float wave6 = cos(p.x * 7.0 + p.y * 5.0 + time * 0.5 + offset2 * 0.4) * 0.03;

            // Add more chaotic distortion
            float chaos1 = sin(p.x * 11.0 + p.y * 13.0 + time * 1.1) * 0.02;
            float chaos2 = cos(p.y * 14.0 - p.x * 8.0 + time * 0.9) * 0.025;

            return p + vec2(wave1 + wave3 + wave5 + chaos1, wave2 + wave4 + wave6 + chaos2);
          }

          vec4 generateStars(vec2 uv, float time, float layers, float density, float driftSpeed, float rotationSpeed, float brightness, float twinkleSpeed) {
            vec3 starColor = vec3(0.0);
            float starAlpha = 0.0;
            vec2 anchorPoint = vec2(1.0, 0.0);
            vec2 centerOffset = uv - anchorPoint;

            for(int layer = 0; layer < 7; layer++) {
              if(float(layer) >= layers) break;
              float depth = float(layer + 1);
              float layerScale = 20.0 + depth * 10.0;
              float orbitalAngle = time * rotationSpeed * 0.15;
              float cosOrbital = cos(orbitalAngle);
              float sinOrbital = sin(orbitalAngle);
              vec2 relativePos = uv - anchorPoint;
              vec2 rotatedPos = vec2(
                relativePos.x * cosOrbital - relativePos.y * sinOrbital,
                relativePos.x * sinOrbital + relativePos.y * cosOrbital
              );
              vec2 orbitalUv = rotatedPos + anchorPoint;
              vec2 starUv = orbitalUv * layerScale;
              vec2 starGrid = floor(starUv);
              vec2 starLocal = fract(starUv);
              float starValue = fbm(starGrid * 0.1);
              float starThreshold = density * 0.9 + depth * 0.05;
              float starPresence = smootherstep(starThreshold - 0.2, starThreshold + 0.2, starValue);
              vec2 starCenter = vec2(fbm(starGrid * 0.1 + 1.0), fbm(starGrid * 0.1 + 2.0));
              float distToStar = length(starLocal - starCenter);
              float starSize = (0.02 + fbm(starGrid * 0.1 + 3.0) * 0.03) / sqrt(depth);
              vec3 color = vec3(1.0, 1.0, 1.0);
              float twinklePhase = time * twinkleSpeed + fbm(starGrid * 0.1 + 4.0) * 6.28;
              float twinkle = 0.7 + 0.3 * sin(twinklePhase) + 0.1 * sin(twinklePhase * 2.0);
              float intensity = 1.0 - smoothstep(0.0, starSize, distToStar);
              intensity = pow(intensity, 0.5);
              intensity *= starPresence;
              intensity *= twinkle * brightness * 3.0;
              intensity *= (1.0 - depth * 0.03);
              starColor += color * intensity;
              starAlpha += intensity * 1.5;
            }
            return vec4(starColor, starAlpha);
          }

          void main() {
            vec2 uv = vUv;
            float time = uTime * 0.25;
            vec4 stars = vec4(0.0);
            if(uEnableStars > 0.0) {
              stars = generateStars(uv, time, uStarLayers, uStarDensity, uStarDriftSpeed, uStarRotationSpeed, uStarBrightness, uStarTwinkleSpeed);
            }
            vec2 waterUv = waterDistortion(uv, time);
            float water1 = waterFlow(waterUv, time, 0.0);
            float water2 = waterFlow(waterUv * 1.6, time * 0.8, 1.0);
            float water3 = waterFlow(waterUv * 0.7, time * 1.4, 2.0);
            float water4 = waterFlow(waterUv * 2.2, time * 0.6, 3.0);
            float water5 = waterFlow(waterUv * 0.4, time * 1.8, 4.0);
            float water6 = waterFlow(waterUv * 2.8, time * 0.4, 5.0);

            // Add organic mixing with turbulence
            float turbulence = sin(uv.x * 5.0 + uv.y * 3.0 + time * 0.7) * 0.1 + 0.9;
            float liquidField = mix(water1, water2, 0.6 * turbulence);
            liquidField = mix(liquidField, water3, 0.4 * (1.0 + sin(uv.x * 7.0 + time * 0.5) * 0.2));
            liquidField = mix(liquidField, water4, 0.25 * (1.0 + cos(uv.y * 4.0 + time * 0.6) * 0.15));
            liquidField = mix(liquidField, water5, 0.15 * (1.0 + sin(uv.x * uv.y * 8.0 + time * 0.4) * 0.1));
            liquidField = mix(liquidField, water6, 0.1 * (1.0 + cos(uv.x * 6.0 - uv.y * 5.0 + time * 0.8) * 0.12));
            float colorFlow1 = sin(waterUv.y * 3.0 + time * 0.4) * 0.5 + 0.5;
            float colorFlow2 = cos(waterUv.x * 2.5 + time * 0.5) * 0.5 + 0.5;
            float colorFlow3 = sin((waterUv.x + waterUv.y) * 2.0 + time * 0.35) * 0.5 + 0.5;
            float colorFlow4 = cos(waterUv.x * waterUv.y * 4.0 + time * 0.3) * 0.5 + 0.5;
            // Add optimized organic color variation with reduced frequency for performance
            float colorNoise1 = fbm(uv * 6.0 + time * 0.3) * 0.3;
            float colorNoise2 = fbm(uv * 8.0 + time * 0.2) * 0.2;
            float colorNoise3 = fbm(uv * 5.0 + time * 0.4) * 0.25;

            // Higher precision color sampling with smooth interpolation
            vec2 colorUV1 = vec2(smootherstep(0.0, 1.0, colorFlow1 * 0.9 + colorNoise1 * 0.1), 0.5);
            vec2 colorUV2 = vec2(smootherstep(0.0, 1.0, colorFlow2 * 0.7 + 0.15 + colorNoise2 * 0.08), 0.5);
            vec2 colorUV3 = vec2(smootherstep(0.0, 1.0, colorFlow3 * 0.5 + 0.3 + colorNoise3 * 0.06), 0.5);
            vec2 colorUV4 = vec2(smootherstep(0.0, 1.0, colorFlow4 * 0.3 + 0.5 + colorNoise1 * 0.04), 0.5);

            vec3 color1 = texture2D(uPalette, colorUV1).rgb * 1.5;
            vec3 color2 = texture2D(uPalette, colorUV2).rgb * 1.5;
            vec3 color3 = texture2D(uPalette, colorUV3).rgb * 1.5;
            vec3 color4 = texture2D(uPalette, colorUV4).rgb * 1.5;

            // Optimized 3-layer color mixing for performance while maintaining beauty
            vec3 liquidColor = mix(color1, color2, liquidField);
            liquidColor = mix(liquidColor, color3, water3 * 0.6 * (1.0 + colorNoise2 * 0.3));
            liquidColor = mix(liquidColor, color4, water4 * 0.4 * (1.0 + colorNoise3 * 0.2));

            // Add fade-in/fade-out cycles
            float fadeCycle = sin(time * 0.3) * 0.5 + 0.5;
            float secondaryFade = cos(time * 0.2 + 1.57) * 0.3 + 0.7;
            float atmosphericFade = fadeCycle * secondaryFade;

            // Much smoother masking with better precision
            float liquidMask = smootherstep(0.1, 0.7, liquidField);
            liquidMask *= smootherstep(-0.1, 0.5, water1 + water2 + water3 + water4 + water5 + water6);
            liquidMask *= atmosphericFade;

            // Add optimized organic edge variation with reduced frequency for performance
            float edgeNoise = fbm(uv * 8.0 + time * 0.2) * 0.3;
            liquidMask *= (1.0 + edgeNoise);
            liquidMask += dither(uv, time) * 0.5; // Reduced dithering intensity

            // Breathing effect with simplified organic variation
            float breath = sin(time * 0.15 + noise(uv * 2.0) * 2.0) * 0.15 + 0.85;
            liquidMask *= breath;

            liquidColor *= 0.8;
            float shimmer = 0.6 + 0.2 * sin(liquidField * 4.0 + time * 0.8 + noise(uv * 6.0) * 0.5);
            liquidColor *= shimmer;

            // Optimized edge fade with reduced noise frequency
            float edgeFade = 1.0 - smootherstep(0.0, 1.5, length(uv - vec2(0.5)));
            edgeFade += fbm(uv * 4.0 + time * 0.1) * 0.2;
            edgeFade = clamp(edgeFade, 0.0, 1.0);
            liquidMask *= edgeFade;

            float waterGlow = liquidField * 0.15;
            liquidColor += waterGlow;
            vec3 finalColor = liquidColor + stars.rgb * 1.0;
            float finalAlpha = liquidMask * 0.8 + stars.a * 0.4;
            gl_FragColor = vec4(finalColor, finalAlpha);
          }
        `;

        console.log('LiquidEther: Creating shader material...');
        material = new THREE.ShaderMaterial({
          vertexShader,
          fragmentShader,
          uniforms: {
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector2(0.5, 0.5) },
            uResolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
            uPalette: { value: paletteTexture },
            uVelocity: { value: velocityTexture1 },
            uStarLayers: { value: starLayers },
            uStarDensity: { value: starDensity },
            uStarDriftSpeed: { value: starDriftSpeed },
            uStarRotationSpeed: { value: starRotationSpeed },
            uStarBrightness: { value: starBrightness },
            uStarTwinkleSpeed: { value: starTwinkleSpeed },
            uEnableStars: { value: enableStars ? 1.0 : 0.0 }
          },
          transparent: true,
          blending: THREE.NormalBlending,
          depthWrite: false
        });
        console.log('LiquidEther: Shader material created successfully');

        geometry = new THREE.PlaneGeometry(2, 2);
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        sceneRef.current = scene;
        rendererRef.current = renderer;
        materialRef.current = material;

        let lastTime = 0;
        let frameCount = 0;
        let fps = 60;

        const animate = (currentTime) => {
          frameCount++;
          if (currentTime - lastTime >= 1000) {
            fps = frameCount;
            frameCount = 0;
            lastTime = currentTime;
          }

          timeRef.current += 0.016;
          if (material) {
            material.uniforms.uTime.value = timeRef.current;
            material.uniforms.uMouse.value.set(0.5, 0.5);
          }

          // Performance monitoring: skip frames if FPS drops below 30
          if (fps >= 30 || frameCount % 2 === 0) {
            if (renderer && scene && camera) {
              renderer.render(scene, camera);
            }
          }

          // Adaptive frame rate limiting
          const targetDelay = fps < 30 ? 32 : 16; // 30fps or 60fps
          setTimeout(() => {
            animationRef.current = requestAnimationFrame(animate);
          }, targetDelay);
        };

        animate();

        const handleResize = () => {
          const width = container.clientWidth;
          const height = container.clientHeight;
          if (renderer && material) {
            renderer.setSize(width, height);
            material.uniforms.uResolution.value.set(width, height);
          }
        };

        const resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(container);

        cleanupRef.current = () => {
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
          }
          resizeObserver.disconnect();
          if (renderer && container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement);
          }
          if (renderer) renderer.dispose();
          if (geometry) geometry.dispose();
          if (material) material.dispose();
          if (paletteTexture) paletteTexture.dispose();
          if (velocityTexture1) velocityTexture1.dispose();
          if (velocityTexture2) velocityTexture2.dispose();
        };

      } catch (error) {
        console.error('LiquidEther WebGL Error:', error);
        // Fallback to CSS
        container.style.background = `
          radial-gradient(circle at 30% 70%, ${colors[0]}88 0%, transparent 50%),
          radial-gradient(circle at 70% 30%, ${colors[1]}88 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, ${colors[2]}66 0%, transparent 60%),
          linear-gradient(45deg, ${colors[0]}22, ${colors[1]}22, ${colors[2]}22)
        `;
        container.style.backgroundSize = '400% 400%, 300% 300%, 200% 200%, 100% 100%';
        container.style.animation = 'liquidFlow 20s ease-in-out infinite';
        container.style.opacity = '0.7';
      }
    };

    checkContainer();

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, [colors, starLayers, starDensity, starDriftSpeed, starRotationSpeed, starBrightness, starTwinkleSpeed, enableStars]);

  console.log('LiquidEther: About to return JSX element');
  return (
    <div
      ref={mountRef}
      className={`liquid-ether-container ${className || ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        opacity: 0.5,
        ...style
      }}
    />
  );
}