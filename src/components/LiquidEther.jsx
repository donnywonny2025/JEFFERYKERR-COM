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
          preserveDrawingBuffer: false
        });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setClearColor(0x000000, 0);

        console.log('LiquidEther: WebGL renderer created');
        container.appendChild(renderer.domElement);

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

        // Create velocity textures
        const textureSize = 64;
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

          float waterFlow(vec2 p, float time, float layer) {
            float flowSpeed = 0.2 + layer * 0.08;
            vec2 flow = vec2(
              sin(p.y * 1.5 + time * flowSpeed) * 0.4,
              time * flowSpeed * 0.5 + sin(p.x * 2.0 + time * flowSpeed * 0.8) * 0.3
            );
            flow.x += cos(p.y * 0.8 + time * flowSpeed * 0.6) * 0.35;
            flow.y += sin(p.x * 1.2 + time * flowSpeed * 0.7) * 0.25;
            vec2 flowPos = p + flow;
            float gradient = sin(flowPos.y * 2.0) * cos(flowPos.x * 1.8);
            gradient += sin(flowPos.y * 0.8 + flowPos.x * 0.9) * 0.8;
            gradient += cos(flowPos.y * 3.0 - flowPos.x * 0.6) * 0.6;
            gradient += sin(flowPos.x * flowPos.y * 1.5 + time * 0.3) * 0.4;
            gradient = gradient * 0.6 + 0.4;
            gradient = smoothstep(0.1, 0.9, gradient);
            return gradient;
          }

          vec2 waterDistortion(vec2 p, float time) {
            float wave1 = sin(p.y * 6.0 + time * 0.6) * 0.06;
            float wave2 = cos(p.x * 4.0 + time * 0.5) * 0.05;
            float wave3 = sin((p.x + p.y) * 3.0 + time * 0.7) * 0.04;
            float wave4 = cos(p.x * p.y * 8.0 + time * 0.4) * 0.03;
            return p + vec2(wave1 + wave3, wave2 + wave4);
          }

          float hash(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
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
              float starValue = hash(starGrid);
              float starThreshold = density * 0.9 + depth * 0.05;
              float starPresence = smoothstep(starThreshold - 0.2, starThreshold + 0.2, starValue);
              vec2 starCenter = vec2(hash(starGrid + 1.0), hash(starGrid + 2.0));
              float distToStar = length(starLocal - starCenter);
              float starSize = (0.02 + hash(starGrid + 3.0) * 0.03) / sqrt(depth);
              vec3 color = vec3(1.0, 1.0, 1.0);
              float twinklePhase = time * twinkleSpeed + hash(starGrid + 4.0) * 6.28;
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
            float water2 = waterFlow(waterUv * 1.4, time * 0.7, 1.0);
            float water3 = waterFlow(waterUv * 0.6, time * 1.3, 2.0);
            float water4 = waterFlow(waterUv * 1.8, time * 0.5, 3.0);
            float liquidField = mix(water1, water2, 0.7);
            liquidField = mix(liquidField, water3, 0.5);
            liquidField = mix(liquidField, water4, 0.3);
            float colorFlow1 = sin(waterUv.y * 3.0 + time * 0.4) * 0.5 + 0.5;
            float colorFlow2 = cos(waterUv.x * 2.5 + time * 0.5) * 0.5 + 0.5;
            float colorFlow3 = sin((waterUv.x + waterUv.y) * 2.0 + time * 0.35) * 0.5 + 0.5;
            float colorFlow4 = cos(waterUv.x * waterUv.y * 4.0 + time * 0.3) * 0.5 + 0.5;
            vec3 color1 = texture2D(uPalette, vec2(colorFlow1 * 0.9, 0.5)).rgb;
            vec3 color2 = texture2D(uPalette, vec2(colorFlow2 * 0.7 + 0.15, 0.5)).rgb;
            vec3 color3 = texture2D(uPalette, vec2(colorFlow3 * 0.5 + 0.3, 0.5)).rgb;
            vec3 color4 = texture2D(uPalette, vec2(colorFlow4 * 0.3 + 0.5, 0.5)).rgb;
            vec3 liquidColor = mix(color1, color2, liquidField);
            liquidColor = mix(liquidColor, color3, water3 * 0.6);
            liquidColor = mix(liquidColor, color4, water4 * 0.4);
            float liquidMask = smoothstep(0.05, 0.7, liquidField);
            liquidMask *= smoothstep(0.0, 0.5, water1 + water2 + water3 + water4);
            liquidColor *= 1.4;
            float shimmer = 0.8 + 0.4 * sin(liquidField * 4.0 + time * 0.8);
            liquidColor *= shimmer;
            float edgeFade = 1.0 - smoothstep(0.0, 1.2, length(uv - vec2(0.5)));
            liquidMask *= edgeFade;
            float waterGlow = liquidField * 0.3;
            liquidColor += waterGlow;
            vec3 finalColor = liquidColor + stars.rgb * 2.0;
            float finalAlpha = liquidMask * 0.55 + stars.a * 0.9;
            gl_FragColor = vec4(finalColor, finalAlpha);
          }
        `;

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

        geometry = new THREE.PlaneGeometry(2, 2);
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        sceneRef.current = scene;
        rendererRef.current = renderer;
        materialRef.current = material;

        const animate = () => {
          timeRef.current += 0.016;
          if (material) {
            material.uniforms.uTime.value = timeRef.current;
            material.uniforms.uMouse.value.set(0.5, 0.5);
          }
          if (renderer && scene && camera) {
            renderer.render(scene, camera);
          }
          animationRef.current = requestAnimationFrame(animate);
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