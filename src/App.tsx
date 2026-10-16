import { useEffect, useRef, useState } from 'react'
import { profile, projects, education, skills, experience, certs, development, achievements, type Project } from './data'

const sections = ['about', 'education', 'skills', 'projects', 'experience', 'certifications', 'achievements', 'problem-solving', 'contact']

function Backdrop() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current!, x = c.getContext('2d')!
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let w = 0, h = 0, t = 0, raf = 0, mx = 0.5, my = 0.5
    const small = innerWidth < 700
    const dust = Array.from({ length: small ? 30 : 70 }, () => ({ x: Math.random(), y: Math.random(), v: 0.00005 + Math.random() * 0.0002 }))
    const size = () => { w = c.width = innerWidth; h = c.height = innerHeight }
    const move = (e: PointerEvent) => { mx = e.clientX / w; my = e.clientY / h }
    size(); addEventListener('resize', size); addEventListener('pointermove', move)
    const draw = () => {
      t += 0.003; x.clearRect(0, 0, w, h); x.lineWidth = 1
      for (let i = 0; i < 9; i++) { // slow contour lines
        x.beginPath(); x.strokeStyle = `rgba(198,244,50,${0.035 + i * 0.004})`
        for (let px = 0; px <= w; px += 24) {
          const y = h * (0.15 + i * 0.09) + Math.sin(px * 0.004 + t * 2 + i) * 40 + Math.sin(px * 0.011 - t + i * 2) * 14 + (my - 0.5) * 30 * i * 0.2
          px ? x.lineTo(px, y) : x.moveTo(px, y)
        }
        x.stroke()
      }
      x.fillStyle = 'rgba(233,226,208,0.35)'
      dust.forEach(d => { d.y -= d.v * 60; if (d.y < 0) d.y = 1; x.fillRect(d.x * w + (mx - 0.5) * 20, d.y * h, 1.4, 1.4) })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', size); removeEventListener('pointermove', move) }
  }, [])
  return <canvas ref={ref} className="bg" aria-hidden="true" />
}

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add('in')), { threshold: 0.12 })
    document.querySelectorAll('.rv').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function useActive() {
  const [a, setA] = useState('')
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setA(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    sections.forEach(s => { const el = document.getElementById(s); el && io.observe(el) })
    return () => io.disconnect()
  }, [])
  return a
}

function Roles() {
  const [i, setI] = useState(0)
  useEffect(() => { const id = setInterval(() => setI(n => (n + 1) % profile.roles.length), 2600); return () => clearInterval(id) }, [])
  return <p className="role" aria-live="off"><span key={i}>{profile.roles[i]}</span></p>
}

function Card({ p }: { p: Project }) {
  const [open, setOpen] = useState(false)
  return (
    <article className="proj" style={{ ['--h' as string]: p.hue }}>
      <div className="art" aria-hidden="true"><span>{p.title}</span><i /><i /><i /></div>
      <div className="pbody">
        <p className="mono">{p.cat}</p><h3>{p.title}</h3><p>{p.blurb}</p>
        <p className="prob"><b>Problem.</b> {p.problem}</p>
        <button className="link" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? 'Hide' : 'Show'} implementation</button>
        {open && <ul>{p.points.map(x => <li key={x}>{x}</li>)}</ul>}
        <div className="tags">{p.stack.map(s => <span key={s}>{s}</span>)}</div>
        <div className="acts">
          {p.live ? <a className="btn sm" href={p.live} target="_blank" rel="noreferrer">Live Demo</a> : null}
          <a className="btn sm ghost" href={p.repo} target="_blank" rel="noreferrer">View Source</a>
          {p.extra && <a className="btn sm ghost" href={p.extra[1]} target="_blank" rel="noreferrer">{p.extra[0]}</a>}
        </div>
        {!p.live && !p.extra && <p className="mono dim">No live deployment listed. Source only.</p>}
      </div>
    </article>
  )
}

export default function App() {
  const [filter, setFilter] = useState('All')
  const [menu, setMenu] = useState(false)
  const [copied, setCopied] = useState(false)
  const active = useActive()
  useReveal()
  const copy = async () => { try { await navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch { window.location.href = `mailto:${profile.email}` } }
  const L = profile.links
  return (
    <>
      <Backdrop />
      <a className="skip" href="#about">Skip to content</a>
      <header className="nav">
        <a href="#top" className="mark" aria-label="Vikas Tarlana, home">VT<b>.</b></a>
        <button className="burger" aria-label="Toggle menu" aria-expanded={menu} onClick={() => setMenu(!menu)}>Menu</button>
        <nav className={menu ? 'open' : ''} aria-label="Primary">
          {sections.filter(s => s !== 'problem-solving').map(s => <a key={s} href={`#${s}`} onClick={() => setMenu(false)} className={active === s ? 'on' : ''}>{s}</a>)}
        </nav>
      </header>
      <main id="top">
        <section className="hero">
          <p className="mono">Computer Science &amp; Engineering · VIT Amaravati</p>
          <h1><span>Vikas</span><span className="o">Tarlana</span></h1>
          <Roles />
          <p className="lede">{profile.summary}</p>
          <div className="acts">
            <a className="btn" href="#projects">Explore My Work</a>
            <a className="btn ghost" href={profile.resume} download>Download Resume</a>
          </div>
          <p className="soc">{['GitHub', 'LinkedIn', 'LeetCode'].map(k => <a key={k} href={L[k]} target="_blank" rel="noreferrer" aria-label={`${k} profile`}>{k}</a>)}</p>
          <p className="mono dim scroll">Scroll ↓</p>
        </section>

        <section id="about" className="rv"><h2><small>01</small>About</h2>
          <div className="two"><p className="big">I&rsquo;m a B.Tech CSE student who learns by building: real-time collaborative tools, role-based platforms and applications with machine learning behind them.</p>
            <div><p>My work centres on full-stack development with React, Next.js, Node.js and Firebase, and on applying AI where it helps, from multilingual content generation to skill-based matching. I hold Oracle certifications in generative AI, agentic AI, data platform and cloud foundations.</p>
              <p>Outside coursework, I&rsquo;ve been a member of the ACM and CSI chapters at VIT-AP and completed internships in web development and AI-powered data analysis.</p></div></div></section>

        <section id="education" className="rv"><h2><small>02</small>Education</h2>
          <ol className="tl">{education.map(e => <li key={e.what}><span className="mono">{e.when}</span><div><h3>{e.school}</h3><p>{e.what}</p></div><strong>{e.grade}</strong></li>)}</ol></section>

        <section id="skills" className="rv"><h2><small>03</small>Skills</h2>
          <div className="skills">{Object.entries(skills).map(([k, v]) => <div key={k}><h3 className="mono">{k}</h3><p>{v.map(s => <span key={s}>{s}</span>)}</p></div>)}</div></section>

        <section id="projects" className="rv"><h2><small>04</small>Projects</h2>
          <div className="filters" role="group" aria-label="Filter projects">{['All', 'AI/ML', 'Full Stack'].map(f => <button key={f} aria-pressed={filter === f} className={filter === f ? 'on' : ''} onClick={() => setFilter(f)}>{f}</button>)}</div>
          <div className="plist">{projects.filter(p => filter === 'All' || p.cat === filter).map(p => <Card key={p.id} p={p} />)}</div></section>

        <section id="experience" className="rv"><h2><small>05</small>Experience</h2>
          <ol className="tl">{experience.map(e => <li key={e.org}><span className="mono">{e.when}</span><div><h3>{e.org}</h3><p className="dim">{e.role}</p><ul>{e.points.map(x => <li key={x}>{x}</li>)}</ul>
            {e.stack.length > 0 && <div className="tags">{e.stack.map(s => <span key={s}>{s}</span>)}</div>}
            {e.doc && <a className="link" href={e.doc} target="_blank" rel="noreferrer">View certificate</a>}</div></li>)}</ol></section>

        <section id="certifications" className="rv"><h2><small>06</small>Certifications</h2>
          <p className="note">Credentials are listed as self-reported; verification links are not included here. See <a href={L.Credly} target="_blank" rel="noreferrer">Credly profile</a>.</p>
          <div className="certs">{certs.map(c => <Cert key={c.t} {...c} />)}</div>
          <h3 className="mono sub">Professional development</h3>
          <div className="certs"><Cert {...development} /></div></section>

        <section id="achievements" className="rv"><h2><small>07</small>Achievements</h2>
          <div className="ach">{achievements.map((a, i) => <div key={a.t} className={i === 0 ? 'first' : ''}><h3>{a.t}</h3><p className="mono">{a.s}</p>{a.n && <p>{a.n}</p>}</div>)}</div></section>

        <section id="problem-solving" className="rv"><h2><small>08</small>Problem solving</h2>
          <a className="btn ghost" href={L.LeetCode} target="_blank" rel="noreferrer">View my LeetCode profile</a></section>

        <section id="contact" className="rv"><h2><small>09</small>Contact</h2>
          <p className="big">Have something worth building? Let&rsquo;s talk.</p>
          <div className="acts"><a className="btn" href={`mailto:${profile.email}`}>{profile.email}</a>
            <button className="btn ghost" onClick={copy}>Copy email</button><a className="btn ghost" href="tel:+919375003148">{profile.phone}</a></div>
          <p role="status" className="mono">{copied ? 'Email copied to clipboard' : ''}</p>
          <p className="soc">{Object.entries(L).map(([k, v]) => <a key={k} href={v} target="_blank" rel="noreferrer" aria-label={`${k} profile`}>{k}</a>)}</p></section>
      </main>
      <footer>© {new Date().getFullYear()} Vikas Tarlana</footer>
      <a className="top" href="#top" aria-label="Back to top">↑</a>
    </>
  )
}

function Cert({ t, d, img, i }: { t: string; d: string; img?: string; i: string }) {
  const [bad, setBad] = useState(false)
  return (
    <div className="cert">
      {img && !bad ? <img src={img} alt={`${t} badge`} width="96" height="96" loading="lazy" onError={() => setBad(true)} /> : <div className="fb" aria-hidden="true">{i[0]}</div>}
      <div><p className="mono">{i}</p><h3>{t}</h3><p className="dim">{d}</p></div>
    </div>
  )
}
