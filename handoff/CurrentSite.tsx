'use client'

import React, { useEffect, useRef, useState } from 'react'

/**
 * CurrentSite.tsx — Single-file snapshot for handoff
 * Purpose: Give another agent everything needed (in one file) to adjust alignment,
 * navigation, and the flowing background. No external component imports.
 *
 * Includes:
 * - Header + hamburger overlay nav (alignment and interactions)
 * - Hero copy block (all text visible for editing)
 * - Featured video block (thumbnail + labels)
 * - Footer
 * - Flowing background shader implemented inline (loads Three.js at runtime) with CSS fallback
 *
 * Notes:
 * - Uses anchors instead of Next.js Link to avoid framework dependency in this handoff file.
 * - Three.js is loaded dynamically from a CDN; if unavailable or on mobile, a CSS gradient animation fallback is used.
 */
export default function CurrentSite() {
  const [menuOpen, setMenuOpen] = useState(false)
  const bgRef = useRef<HTMLDivElement | null>(null)

  // Close menu when clicking outside overlay
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!menuOpen) return
      const overlay = document.getElementById('menuOverlay')
      const hamburger = document.getElementById('hamburger')
      if (!overlay || !hamburger) return
      const target = e.target as Node
      if (overlay.contains(target) || target === hamburger) return
      setMenuOpen(false)
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [menuOpen])

  // Flowing background: WebGL shader via Three.js (dynamic) with CSS fallback
  useEffect(() => {
    const container = bgRef.current
    if (!container) return

    const colors = ['#0a0a0a', '#1a0b2e', '#2d1b4e', '#3d2a5f', '#1a4d72', '#6b46c1', '#c084fc']

    const cssFallback = () => {
      container.style.background = `
        radial-gradient(circle at 30% 70%, ${colors[0]}55 0%, transparent 50%),
        radial-gradient(circle at 70% 30%, ${colors[1]}55 0%, transparent 50%),
        linear-gradient(45deg, ${colors[0]}33, ${colors[1]}33)
      `
      container.style.backgroundSize = '300% 300%, 200% 200%, 100% 100%'
      container.style.animation = 'liquidFlow 15s ease-in-out infinite'
    }

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    if (isMobile) { cssFallback(); return }

    const script = document.createElement('script')
    script.src = 'https://unpkg.com/three@0.159.0/build/three.min.js'
    script.async = true

    let cleanup: (() => void) | null = null
    script.onload = () => {
      try {
        // @ts-ignore
        const THREE = (window as any).THREE
        if (!THREE) { cssFallback(); return }

        const scene = new THREE.Scene()
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
        const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'default' })
        renderer.setPixelRatio(0.5)
        renderer.setSize(container.clientWidth, container.clientHeight)
        renderer.setClearColor(0x000000, 0)
        container.appendChild(renderer.domElement)

        // Palette texture from color array
        const paletteCanvas = document.createElement('canvas')
        paletteCanvas.width = colors.length
        paletteCanvas.height = 1
        const ctx = paletteCanvas.getContext('2d')!
        colors.forEach((c, i) => { ctx.fillStyle = c; ctx.fillRect(i, 0, 1, 1) })
        const paletteTexture = new THREE.CanvasTexture(paletteCanvas)
        paletteTexture.magFilter = THREE.LinearFilter
        paletteTexture.minFilter = THREE.LinearFilter

        const vertexShader = `
          varying vec2 vUv;
          void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
        `
        const fragmentShader = `
          uniform float uTime; uniform sampler2D uPalette; varying vec2 vUv;
          float noise(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }
          float smoothNoise(vec2 p){ vec2 i=floor(p); vec2 f=fract(p); f=f*f*(3.0-2.0*f);
            float a=noise(i); float b=noise(i+vec2(1.0,0.0)); float c=noise(i+vec2(0.0,1.0)); float d=noise(i+vec2(1.0,1.0));
            return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);
          }
          void main(){ vec2 uv=vUv; float time=uTime*0.4; vec2 distortion=vec2(
            sin(uv.y*6.0+time*0.8)*0.03, cos(uv.x*5.0+time*0.7)*0.025);
            vec2 distortedUv=uv+distortion; float liquid1=sin(distortedUv.y*4.0+time)*cos(distortedUv.x*2.0+time*0.7)*0.5;
            float liquid2=cos(distortedUv.x*3.0+time*0.8)*sin(distortedUv.y*5.0+time*1.1)*0.4;
            float liquid3=sin((distortedUv.x+distortedUv.y)*2.5+time*1.3)*0.3; float wispy1=smoothNoise(distortedUv*8.0+time*0.2)*0.2;
            float wispy2=smoothNoise(distortedUv*12.0-time*0.15)*0.15; float liquid=(liquid1+liquid2+liquid3+wispy1+wispy2)*0.5+0.5;
            float turbulence=sin(distortedUv.x*7.0+distortedUv.y*4.0+time*0.6)*0.1; liquid+=turbulence;
            float colorFlow1=sin(distortedUv.y*3.0+time*0.5)*0.3+0.7; float colorFlow2=cos(distortedUv.x*2.5+time*0.4)*0.2+0.5;
            vec3 color1=texture2D(uPalette, vec2(colorFlow1,0.5)).rgb; vec3 color2=texture2D(uPalette, vec2(colorFlow2,0.5)).rgb;
            vec3 finalColor=mix(color1,color2,smoothstep(0.3,0.7,liquid)); finalColor*=1.6; float shimmer=1.0+sin(liquid*6.28+time)*0.1; finalColor*=shimmer;
            float mask=smoothstep(0.15,0.85,liquid); mask*=smoothstep(0.1,0.6,wispy1+wispy2+0.5);
            float edgeFade=1.0 - smoothstep(0.0,0.8,length(uv-vec2(0.5))); edgeFade += smoothNoise(uv*6.0)*0.1;
            gl_FragColor=vec4(finalColor, mask*edgeFade*0.7);
          }
        `

        const material = new THREE.ShaderMaterial({
          vertexShader, fragmentShader,
          uniforms: { uTime: { value: 0 }, uPalette: { value: paletteTexture } },
          transparent: true, depthWrite: false
        })
        const geometry = new THREE.PlaneGeometry(2,2)
        const mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)

        const resize = () => {
          const w = container.clientWidth || window.innerWidth
          const h = container.clientHeight || window.innerHeight
          renderer.setSize(w, h, false)
        }
        window.addEventListener('resize', resize)
        resize()

        let time = 0, lastFrame = 0
        const frameTime = 66 // ~15fps
        let raf = 0
        const animate = (now: number) => {
          if (now - lastFrame >= frameTime) {
            time += 0.016
            ;(material.uniforms as any).uTime.value = time
            renderer.render(scene, camera)
            lastFrame = now
          }
          raf = requestAnimationFrame(animate)
        }
        raf = requestAnimationFrame(animate)

        cleanup = () => {
          cancelAnimationFrame(raf)
          window.removeEventListener('resize', resize)
          if (renderer && container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
          renderer.dispose(); geometry.dispose(); material.dispose(); paletteTexture.dispose()
        }
      } catch (e) {
        cssFallback()
      }
    }
    script.onerror = () => cssFallback()
    document.head.appendChild(script)

    return () => {
      if (cleanup) cleanup()
      document.head.removeChild(script)
    }
  }, [])

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#0a0a0a', color: '#fff' }}>
      {/* Background Layer */}
      <div ref={bgRef} style={{ position: 'fixed', inset: 0, zIndex: 1, overflow: 'hidden' }} />

      {/* Header / Navigation */}
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, padding: '18px 24px', background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0))' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="#home" style={{ textDecoration: 'none', color: '#fff', fontWeight: 700, letterSpacing: '0.04em' }}>
            <span style={{ fontWeight: 800 }}>k</span>err
          </a>
          <button
            id="hamburger"
            onClick={(e) => { e.stopPropagation(); setMenuOpen(v => !v) }}
            aria-label="Open menu"
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', width: 24, height: 16, background: 'transparent', border: 'none', cursor: 'pointer' }}
          >
            {/* Simple hamburger icon */}
            <span style={{ width: 24, height: 2, background: '#a1a1aa', borderRadius: 1, transition: 'all .3s ease', transformOrigin: 'center', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <span style={{ width: 24, height: 2, background: '#a1a1aa', borderRadius: 1, transition: 'opacity .3s ease', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ width: 24, height: 2, background: '#a1a1aa', borderRadius: 1, transition: 'all .3s ease', transformOrigin: 'center', transform: menuOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none' }} />
          </button>
        </div>
      </header>

      {/* Overlay Menu */}
      <div id="menuOverlay" style={{ position: 'fixed', inset: 0, height: '100vh', zIndex: 45, display: menuOpen ? 'flex' : 'none', alignItems: 'flex-start', justifyContent: 'flex-end', paddingTop: 70, paddingRight: 60 }}>
        <div role="menu" aria-label="Main Menu" style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '20px 16px', minWidth: 140, boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
          <nav style={{ textAlign: 'right' }}>
            <a href="#home" style={menuItemStyle}>HOME</a>
            <a href="#backgrounds" style={menuItemStyle}>🎨 BACKGROUNDS</a>
            <a href="#work" style={menuItemStyle}>WORK</a>
            <a href="#contact" style={menuItemStyle}>CONTACT</a>
          </nav>
          <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.08)', textAlign: 'right' }}>
            <a href="mailto:colour8k@mac.com" style={{ fontFamily: 'Space Mono, monospace', fontSize: '.85rem', color: 'rgba(255,255,255,0.8)', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, padding: '8px 16px', display: 'inline-block', letterSpacing: '.6px', textDecoration: 'none' }}>colour8k@mac.com</a>
          </div>
        </div>
      </div>

      {/* Main content wrapper to center and align layout */}
      <div style={{ width: '100vw', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 20, minHeight: '100vh' }}>
        <div style={{ width: '100%', maxWidth: 1200, padding: '0 60px', margin: '0 auto' }}>

          {/* HERO COPY — this is the editable featured area text */}
          <section style={{ paddingTop: 140, marginBottom: 60 }}>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 400, lineHeight: 1.1, color: 'rgba(255,255,255,0.95)', marginBottom: 40, maxWidth: 750 }}>
              <div style={{ marginBottom: '.5rem', whiteSpace: 'nowrap' }}>I produce <span style={gradientText}>compelling visual content</span></div>
              <div style={{ marginBottom: '.5rem', whiteSpace: 'nowrap' }}>while building <span style={gradientText}>AI-enhanced workflows</span></div>
              <div style={{ whiteSpace: 'nowrap' }}>that change how <span style={gradientText}>creative work gets done</span>.</div>
            </div>

            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', fontSize: 11, color: '#cccccc', opacity: 0.6, fontFamily: 'Space Mono, monospace' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', position: 'relative' }}>
                <span style={{ display: 'inline-block', width: 14, height: 14, border: '1px solid rgba(255,255,255,0.5)', borderRadius: 2 }} />
                <span>Grand Rapids, Michigan / World</span>
              </div>
              <div>
                <a href="mailto:colour8k@mac.com" style={{ color: '#cccccc', textDecoration: 'none' }}>colour8k@mac.com</a>
              </div>
            </div>
          </section>

          {/* FEATURED VIDEO BLOCK — alignment and labels shown explicitly */}
          <section style={{ marginBottom: 24 }}>
            <div style={{ maxWidth: 750, width: '100%', aspectRatio: '16/9', background: '#000', position: 'relative', borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
              <img src="https://img.youtube.com/vi/I6U5zDpzLq8/hqdefault.jpg" alt="Featured Video" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '12px 24px', backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6, fontFamily: 'Space Mono, monospace', fontSize: 12, color: '#fff' }}>▶ PLAY</div>
            </div>
          </section>

          {/* METADATA UNDER FEATURED — explicit lines for editing */}
          <section style={{ marginBottom: 80 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 15, fontFamily: 'Space Mono, monospace', fontSize: 14, fontWeight: 300, color: '#ffffff', opacity: 0.8, maxWidth: 750 }}>
              <div style={gradRule} />
              <div>Gemini IPO Investigation — YouTube Video</div>
              <div style={gradRule} />
              <div>Featured Video</div>
              <div style={gradRule} />
              <div>2025</div>
            </div>
          </section>

        </div>
      </div>

      {/* Footer */}
      <div style={{ position: 'relative', background: '#000', overflow: 'hidden' }}>
        <footer style={{ position: 'relative' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px', display: 'grid', gridTemplateColumns: '1fr', gap: 16, alignItems: 'center' }}>
            <div style={{ fontWeight: 700, letterSpacing: '0.04em' }}><span style={{ fontWeight: 800 }}>k</span>err</div>
            <div style={gradRule} />
            <div><a href="mailto:colour8k@mac.com" style={{ color: '#fff', textDecoration: 'none' }}>colour8k@mac.com</a></div>
            <nav>
              <a href="#home" style={{ color: '#fff', textDecoration: 'none', marginRight: 16 }}>HOME</a>
              <a href="#backgrounds" style={{ color: '#fff', textDecoration: 'none', marginRight: 16 }}>🎨 BACKGROUNDS</a>
              <a href="#work" style={{ color: '#fff', textDecoration: 'none', marginRight: 16 }}>WORK</a>
              <a href="#contact" style={{ color: '#fff', textDecoration: 'none' }}>CONTACT</a>
            </nav>
            <div style={{ color: '#fff', opacity: 0.7 }}>2025 Jeff Kerr. Crafting visual stories that move the world forward.</div>
          </div>
        </footer>
      </div>

      {/* Tiny global CSS for gradient text animation */}
      <style>{`
        @keyframes liquidFlow { 0% { background-position: 0% 50%, 100% 50%, 50% 0%; } 50% { background-position: 100% 50%, 0% 50%, 50% 100%; } 100% { background-position: 0% 50%, 100% 50%, 50% 0%; } }
        @keyframes continuousFlow {
          0%, 100% { background-position: 0% 50%; }
          33% { background-position: 100% 50%; }
          66% { background-position: 200% 50%; }
        }
      `}</style>
    </div>
  )
}

// Reusable inline style blocks
const gradientText: React.CSSProperties = {
  background: 'linear-gradient(135deg, #00d4ff 0%, #8b5cf6 50%, #FF9FFC 100%)',
  backgroundSize: '300% 300%',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent' as any,
  backgroundClip: 'text',
  animation: 'continuousFlow 20s ease-in-out infinite'
}

const gradRule: React.CSSProperties = {
  width: '100%',
  height: 1,
  background: 'linear-gradient(90deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.2) 50%, transparent 100%)'
}

const menuItemStyle: React.CSSProperties = {
  display: 'block',
  color: '#ffffff',
  textDecoration: 'none',
  fontFamily: 'Space Mono, monospace',
  fontSize: '1rem',
  fontWeight: 400,
  margin: '8px 0',
  letterSpacing: '.8px',
  textTransform: 'uppercase'
}
