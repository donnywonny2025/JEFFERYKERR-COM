import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';

const LiquidEtherSimple = React.memo(function LiquidEtherSimple({
  colors = ['#4A1FA3', '#E640E6', '#7B2CBF', '#00A8CC', '#6B46C1'],
  style = {},
  className = ''
}) {
  const mountRef = useRef(null);
  const cleanupRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    let renderer, scene, camera, material, mesh, animationId;

    // Mobile detection - use CSS fallback
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      container.style.background = `
        radial-gradient(circle at 30% 70%, ${colors[0]}44 0%, transparent 60%),
        radial-gradient(circle at 70% 30%, ${colors[1]}44 0%, transparent 60%),
        linear-gradient(45deg, ${colors[0]}33, ${colors[1]}33, ${colors[2]}33)
      `;
      container.style.backgroundSize = '400% 400%, 300% 300%, 100% 100%';
      container.style.animation = 'liquidFlow 20s ease-in-out infinite';
      return;
    }

    try {
      // Simple WebGL setup
      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
        powerPreference: 'default'
      });
      
      renderer.setPixelRatio(0.5); // Low pixel ratio for performance
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      // Create simple color palette
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

      // Simple shaders
      const vertexShader = `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `;

      const fragmentShader = `
        uniform float uTime;
        uniform sampler2D uPalette;
        varying vec2 vUv;

        // Simple but effective noise function
        float noise(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }

        float smoothNoise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f); // Smooth interpolation
          
          float a = noise(i);
          float b = noise(i + vec2(1.0, 0.0));
          float c = noise(i + vec2(0.0, 1.0));
          float d = noise(i + vec2(1.0, 1.0));
          
          return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
        }

        void main() {
          vec2 uv = vUv;
          float time = uTime * 0.4;
          
          // Add distortion for more organic flow
          vec2 distortion = vec2(
            sin(uv.y * 6.0 + time * 0.8) * 0.03,
            cos(uv.x * 5.0 + time * 0.7) * 0.025
          );
          vec2 distortedUv = uv + distortion;
          
          // Multiple liquid layers with different scales and speeds
          float liquid1 = sin(distortedUv.y * 4.0 + time) * cos(distortedUv.x * 2.0 + time * 0.7) * 0.5;
          float liquid2 = cos(distortedUv.x * 3.0 + time * 0.8) * sin(distortedUv.y * 5.0 + time * 1.1) * 0.4;
          float liquid3 = sin((distortedUv.x + distortedUv.y) * 2.5 + time * 1.3) * 0.3;
          
          // Add wispy details with noise
          float wispy1 = smoothNoise(distortedUv * 8.0 + time * 0.2) * 0.2;
          float wispy2 = smoothNoise(distortedUv * 12.0 - time * 0.15) * 0.15;
          
          // Combine all layers
          float liquid = (liquid1 + liquid2 + liquid3 + wispy1 + wispy2) * 0.5 + 0.5;
          
          // Add flowing turbulence
          float turbulence = sin(distortedUv.x * 7.0 + distortedUv.y * 4.0 + time * 0.6) * 0.1;
          liquid += turbulence;
          
          // Color sampling with variation
          float colorFlow1 = sin(distortedUv.y * 3.0 + time * 0.5) * 0.3 + 0.7;
          float colorFlow2 = cos(distortedUv.x * 2.5 + time * 0.4) * 0.2 + 0.5;
          
          vec2 colorUV1 = vec2(colorFlow1, 0.5);
          vec2 colorUV2 = vec2(colorFlow2, 0.5);
          
          vec3 color1 = texture2D(uPalette, colorUV1).rgb;
          vec3 color2 = texture2D(uPalette, colorUV2).rgb;
          
          // Mix colors based on liquid flow
          vec3 finalColor = mix(color1, color2, smoothstep(0.3, 0.7, liquid));
          
          // Boost colors and add shimmer
          finalColor *= 1.6;
          float shimmer = 1.0 + sin(liquid * 6.28 + time) * 0.1;
          finalColor *= shimmer;
          
          // More organic masking
          float mask = smoothstep(0.15, 0.85, liquid);
          mask *= smoothstep(0.1, 0.6, wispy1 + wispy2 + 0.5);
          
          // Softer edge fade
          float edgeFade = 1.0 - smoothstep(0.0, 0.8, length(uv - vec2(0.5)));
          edgeFade += smoothNoise(uv * 6.0) * 0.1; // Add organic edge variation
          
          gl_FragColor = vec4(finalColor, mask * edgeFade * 0.7);
        }
      `;

      // Create material
      material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uPalette: { value: paletteTexture }
        },
        transparent: true,
        depthWrite: false
      });

      // Create mesh
      const geometry = new THREE.PlaneGeometry(2, 2);
      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // Simple animation - 15fps
      let time = 0;
      let lastFrame = 0;
      const frameTime = 66; // ~15fps

      const animate = (currentTime) => {
        if (currentTime - lastFrame >= frameTime) {
          time += 0.016;
          material.uniforms.uTime.value = time;
          renderer.render(scene, camera);
          lastFrame = currentTime;
        }
        animationId = requestAnimationFrame(animate);
      };
      animate();

      // Cleanup
      cleanupRef.current = () => {
        if (animationId) cancelAnimationFrame(animationId);
        if (renderer && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        if (renderer) renderer.dispose();
        if (geometry) geometry.dispose();
        if (material) material.dispose();
        if (paletteTexture) paletteTexture.dispose();
      };

    } catch (error) {
      // CSS fallback
      container.style.background = `
        radial-gradient(circle at 30% 70%, ${colors[0]}55 0%, transparent 50%),
        radial-gradient(circle at 70% 30%, ${colors[1]}55 0%, transparent 50%),
        linear-gradient(45deg, ${colors[0]}33, ${colors[1]}33)
      `;
      container.style.backgroundSize = '300% 300%, 200% 200%, 100% 100%';
      container.style.animation = 'liquidFlow 15s ease-in-out infinite';
    }

    return cleanupRef.current;
  }, [colors]);

  const containerStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: -1,
    pointerEvents: 'none',
    opacity: 0.5,
    ...style
  };

  return (
    <>
      <style jsx>{`
        @keyframes liquidFlow {
          0% { background-position: 0% 50%, 100% 50%, 50% 0%; }
          50% { background-position: 100% 50%, 0% 50%, 50% 100%; }
          100% { background-position: 0% 50%, 100% 50%, 50% 0%; }
        }
      `}</style>
      <div
        ref={mountRef}
        className={className}
        style={containerStyles}
      />
    </>
  );
});

LiquidEtherSimple.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string),
  style: PropTypes.object,
  className: PropTypes.string
};

export default LiquidEtherSimple;
