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

const GRAPH_LABELS = ['Next.js', 'React', 'TypeScript', 'Firebase', 'FastAPI', 'Python', 'scikit-learn', 'MongoDB']

function HeroArt() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current!, g = c.getContext('2d')!
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches
    const N = 40
    const nodes = Array.from({ length: N }, (_, i) => { const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = i * 2.399963; return { x: Math.cos(th) * r, y, z: Math.sin(th) * r } })
    const edges: [number, number][] = []
    for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) if (Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y, nodes[i].z - nodes[j].z) < 0.62) edges.push([i, j])
    const pulses: { e: number; t: number }[] = []
    let w = 0, ay = 0, ax = 0.3, mx = 0, my = 0, raf = 0, last = 0
    let ptr: { x: number; y: number } | null = null
    const size = () => { const d = Math.min(devicePixelRatio || 1, 2); w = c.clientWidth; c.width = w * d; c.height = w * d; g.setTransform(d, 0, 0, d, 0, 0) }
    const move = (ev: PointerEvent) => { const r = c.getBoundingClientRect(); ptr = { x: ev.clientX - r.left, y: ev.clientY - r.top }; mx = ev.clientX / innerWidth - 0.5; my = ev.clientY / innerHeight - 0.5 }
    const leave = () => { ptr = null }
    const frame = (t: number) => {
      const dt = Math.min(t - last, 50); last = t
      if (!still) { ay += dt * 0.00018 + mx * 0.004; ax += (0.25 + my * 0.7 - ax) * 0.04 }
      const R = w * 0.36, cx = w / 2
      g.clearRect(0, 0, w, w)
      const ca = Math.cos(ay), sa = Math.sin(ay), cb = Math.cos(ax), sb = Math.sin(ax)
      const P = nodes.map(n => { const x1 = n.x * ca + n.z * sa, z1 = -n.x * sa + n.z * ca, y2 = n.y * cb - z1 * sb, z2 = n.y * sb + z1 * cb, k = 1.9 / (1.9 - z2 * 0.7); return { sx: cx + x1 * R * k, sy: cx + y2 * R * k, z: z2, k } })
      let hot = -1, best = 70
      const q = ptr
      if (q) P.forEach((p, i) => { const d = Math.hypot(p.sx - q.x, p.sy - q.y); if (d < best) { best = d; hot = i } })
      edges.forEach(([a, b]) => {
        const A = P[a], B = P[b], on = a === hot || b === hot
        g.strokeStyle = on ? 'rgba(198,244,50,.85)' : `rgba(235,229,214,${0.05 + ((A.z + B.z) / 2 + 1) * 0.12})`
        g.lineWidth = on ? 1.4 : 1
        g.beginPath(); g.moveTo(A.sx, A.sy); g.lineTo(B.sx, B.sy); g.stroke()
      })
      if (!still && Math.random() < 0.05 && pulses.length < 6) pulses.push({ e: Math.floor(Math.random() * edges.length), t: 0 })
      for (let i = pulses.length - 1; i >= 0; i--) {
        const u = pulses[i]; u.t += dt * 0.0012
        if (u.t >= 1) { pulses.splice(i, 1); continue }
        const [a, b] = edges[u.e]
        g.fillStyle = '#c6f432'; g.beginPath(); g.arc(P[a].sx + (P[b].sx - P[a].sx) * u.t, P[a].sy + (P[b].sy - P[a].sy) * u.t, 2.2, 0, 6.283); g.fill()
      }
      g.font = '11px "JetBrains Mono", monospace'
      P.forEach((p, i) => {
        const al = 0.25 + (p.z + 1) * 0.37, lab = i % 5 === 0 && i / 5 < GRAPH_LABELS.length ? GRAPH_LABELS[i / 5] : ''
        g.fillStyle = i === hot || lab ? `rgba(198,244,50,${i === hot ? 1 : al})` : `rgba(235,229,214,${al})`
        g.beginPath(); g.arc(p.sx, p.sy, (i === hot ? 5 : lab ? 3.4 : 2) * p.k, 0, 6.283); g.fill()
        if (lab) { g.fillStyle = `rgba(235,229,214,${al})`; g.fillText(lab, p.sx + 9, p.sy + 4) }
      })
      if (!still) raf = requestAnimationFrame(frame)
    }
    const ro = new ResizeObserver(() => { size(); if (still) frame(0) })
    ro.observe(c); size(); frame(0)
    addEventListener('pointermove', move); document.documentElement.addEventListener('mouseleave', leave)
    return () => { cancelAnimationFrame(raf); ro.disconnect(); removeEventListener('pointermove', move); document.documentElement.removeEventListener('mouseleave', leave) }
  }, [])
  return <div className="art-hero" aria-hidden="true"><canvas ref={ref} /></div>
}

const slugs: Record<string, string> = { Java: 'openjdk', Python: 'python', TypeScript: 'typescript', JavaScript: 'javascript', C: 'c', R: 'r', 'Next.js': 'nextdotjs', React: 'react', Vite: 'vite', 'Node.js': 'nodedotjs', 'Express.js': 'express', 'Tailwind CSS': 'tailwindcss', Bootstrap: 'bootstrap', HTML5: 'html5', CSS3: 'css3', 'scikit-learn': 'scikitlearn', Pandas: 'pandas', NumPy: 'numpy', OpenCV: 'opencv', Matplotlib: 'matplotlib', PostgreSQL: 'postgresql', MongoDB: 'mongodb', MySQL: 'mysql', Firebase: 'firebase', 'Firebase Auth': 'firebase', 'Oracle Cloud (OCI)': 'oracle', Vercel: 'vercel', Git: 'git', GitHub: 'github', Postman: 'postman', ESLint: 'eslint' }

function SkillIcon({ name }: { name: string }) {
  const [bad, setBad] = useState(false)
  const slug = slugs[name]
  if (!slug || bad) return <span className="ic mono-ic" aria-hidden="true">{name[0]}</span>
  return (
    <span className="ic" aria-hidden="true">
      <img className="a" src={`https://cdn.simpleicons.org/${slug}/ebe5d6`} alt="" width="32" height="32" loading="lazy" onError={() => setBad(true)} />
      <img className="b" src={`https://cdn.simpleicons.org/${slug}/c6f432`} alt="" width="32" height="32" loading="lazy" onError={() => setBad(true)} />
    </span>
  )
}

function Skills() {
  return (
    <div className="skwrap">
      {Object.entries(skills).map(([c, list], n) => (
        <div key={c} className="skc">
          <p className="mono">{String(n + 1).padStart(2, '0')}</p>
          <h3>{c}</h3>
          <div className="pills">{list.map(s => <span key={s} className="pill"><SkillIcon name={s} />{s}</span>)}</div>
        </div>
      ))}
    </div>
  )
}

const eduHues = ['#c6f432', '#d98a4e', '#5fb3a1']

function Education() {
  return (
    <div className="idgrid">
      {education.map((e, n) => {
        const yrs = e.when.match(/\d{4}/g) ?? []
        const label = yrs.length > 1 ? `${yrs[0]}\u2013${yrs[yrs.length - 1].slice(2)}` : yrs[0] ?? ''
        return (
          <article key={e.what} className="idc" style={{ ['--h' as string]: eduHues[n % eduHues.length] }}>
            <div className="idtop"><span className="hole" aria-hidden="true" /><span className="mono">Record {String(n + 1).padStart(2, '0')}</span></div>
            <p className="idyear" aria-hidden="true">{label}</p>
            <h3>{e.school}</h3>
            <p>{e.what}</p>
            <p className="mono dim">{e.when}</p>
            <p className="mono dim">{e.grade}</p>
            <div className="barcode" aria-hidden="true" />
          </article>
        )
      })}
    </div>
  )
}

export default function App() {
  const [filter, setFilter] = useState('All')
  const [menu, setMenu] = useState(false)
  const [copied, setCopied] = useState(false)
  const active = useActive()
  const heroRef = useRef<HTMLElement>(null)
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
        <section className="hero" ref={heroRef} onPointerMove={ev => { const r = heroRef.current!.getBoundingClientRect(); const el = heroRef.current!.style; el.setProperty('--mx', `${ev.clientX - r.left}px`); el.setProperty('--my', `${ev.clientY - r.top}px`); el.setProperty('--tx', String((ev.clientX - r.left) / r.width - 0.5)); el.setProperty('--ty', String((ev.clientY - r.top) / r.height - 0.5)) }}>
          <div className="hcopy">
            <p className="mono">Computer Science &amp; Engineering · VIT Amaravati</p>
            <h1 aria-label="Vikas Tarlana">{['Vikas', 'Tarlana'].map((w, l) => <span key={w} className={l ? 'o' : ''} aria-hidden="true">{w.split('').map((c, i) => <span key={i} className="ch" style={{ ['--i' as string]: i + l * 4 }}>{c}</span>)}</span>)}</h1>
            <Roles />
            <p className="lede">{profile.summary}</p>
            <p className="status"><i />Building at the intersection of software and AI</p>
            <div className="acts">
              <a className="btn" href="#projects">Explore My Work</a>
              <a className="btn ghost" href={profile.resume} download>Download Resume</a>
            </div>
            <p className="soc">{['GitHub', 'LinkedIn', 'LeetCode'].map(k => <a key={k} href={L[k]} target="_blank" rel="noreferrer" aria-label={`${k} profile`}>{k}</a>)}</p>
            <dl className="stats">
              <div><dt>Projects</dt><dd>{String(projects.length).padStart(2, '0')}</dd></div>
              <div><dt>Credentials</dt><dd>{String(certs.length + 1).padStart(2, '0')}</dd></div>
              <div><dt>Internships</dt><dd>{String(experience.filter(x => x.doc).length).padStart(2, '0')}</dd></div>
              <div className="sc"><dt>Scroll</dt><dd>↓</dd></div>
            </dl>
          </div>
          <HeroArt />
        </section>

        <section id="about" className="rv"><h2><small>01</small>About</h2>
          <div className="ab">
            <div>
              <p className="big">I&rsquo;m a B.Tech CSE student who learns by <mark>building</mark>: real-time collaborative tools, role-based platforms and applications with <mark>machine learning</mark> behind them.</p>
              <p className="abp">My work centres on full-stack development with React, Next.js, Node.js and Firebase, and on applying AI where it helps, from multilingual content generation to skill-based matching. I hold Oracle certifications in generative AI, agentic AI, data platform and cloud foundations.</p>
              <p className="abp">Outside coursework, I&rsquo;ve been a member of the ACM and CSI chapters at VIT-AP and completed internships in web development and AI-powered data analysis.</p>
            </div>
            <dl className="facts">
              <div><dt>Studying</dt><dd>B.Tech CSE (Core), VIT Amaravati</dd></div>
              <div><dt>Focus</dt><dd>Full-stack and AI/ML applications</dd></div>
              <div><dt>Core stack</dt><dd>Next.js · React · TypeScript · Firebase</dd></div>
              <div><dt>Certified</dt><dd>Oracle OCI Generative AI Professional</dd></div>
              <div><dt>Clubs</dt><dd>ACM · CSI, VIT-AP</dd></div>
              <div><dt>Experience</dt><dd>{experience.filter(x => x.doc).length} internships</dd></div>
            </dl>
          </div>
          <div className="how">{[
            ['01', 'Real-time systems', 'Live Grid supports concurrent editing with presence, and the Oeja SwasthSetu work used WebSockets for live communication.'],
            ['02', 'Role-based platforms', 'Dashboards and access for different users in Oeja SwasthSetu, Alumni Connect and Skill2Hire.'],
            ['03', 'Applied AI', 'Content generation in Janova, similarity matching in Skill2Hire and prediction models in Pulse.']
          ].map(([n, t, d]) => <div key={n}><span className="mono">{n}</span><h3>{t}</h3><p>{d}</p></div>)}</div></section>

        <section id="education" className="rv"><h2><small>02</small>Education</h2><Education /></section>

        <section id="skills" className="rv"><h2><small>03</small>Skills</h2><Skills /></section>

        <section id="projects" className="rv"><h2><small>04</small>Projects</h2>
          <div className="filters" role="group" aria-label="Filter projects">{['All', 'AI/ML', 'Full Stack'].map(f => <button key={f} aria-pressed={filter === f} className={filter === f ? 'on' : ''} onClick={() => setFilter(f)}>{f}</button>)}</div>
          <div className="plist">{projects.filter(p => filter === 'All' || p.cat === filter).map(p => <Card key={p.id} p={p} />)}</div></section>

        <section id="experience" className="rv"><h2><small>05</small>Experience</h2>
          <ol className="xp">{experience.map(e => (
            <li key={e.org} className={e.doc ? 'intern' : 'club'}>
              <span className="node" aria-hidden="true" />
              <div className="xcard">
                <div className="xtop"><span className="chip">{e.doc ? 'Internship' : 'Club'}</span><span className="mono">{e.when}</span></div>
                <h3>{e.org}</h3><p className="xrole">{e.role}</p>
                <ul>{e.points.map(x => <li key={x}>{x}</li>)}</ul>
                {e.stack.length > 0 && <div className="tags">{e.stack.map(s => <span key={s}>{s}</span>)}</div>}
                {e.doc && <a className="btn sm ghost" href={e.doc} target="_blank" rel="noreferrer">View certificate</a>}
              </div>
            </li>))}</ol></section>

        <section id="certifications" className="rv"><h2><small>06</small>Certifications</h2>
          <p className="note">Click a card to flip it, then use Verify credential to open the issuer\u2019s page. More on my <a href={L.Credly} target="_blank" rel="noreferrer">Credly profile</a>.</p>
          <div className="certs">{certs.map(c => <Cert key={c.t} {...c} />)}</div>
          <h3 className="mono sub">Professional development</h3>
          <div className="certs"><Cert {...development} /></div></section>

        <section id="achievements" className="rv"><h2><small>07</small>Achievements</h2>
          <div className="aw">
            <div className="podium"><span className="rank" aria-hidden="true">3<sup>rd</sup></span><div><p className="mono">{achievements[0].s}</p><h3>{achievements[0].t}</h3>{achievements[0].n && <p>{achievements[0].n}</p>}</div></div>
            <div className="tickets">{achievements.slice(1).map(x => <div key={x.t} className="ticket"><p className="mono">{x.s}</p><h3>{x.t}</h3>{x.n && <p>{x.n}</p>}</div>)}</div>
          </div></section>

        <section id="problem-solving" className="rv"><h2><small>08</small>Problem solving</h2>
          <div className="ps">
            <div>
              <p className="big">Breaking hard problems into small, testable steps.</p>
              <p className="dim">I keep my practice on LeetCode. The code card is only an illustration.</p>
              <p className="tags">{['Java', 'Python', 'C', 'TypeScript'].map(s => <span key={s}>{s}</span>)}</p>
              <a className="btn" href={L.LeetCode} target="_blank" rel="noreferrer">Open LeetCode profile ↗</a>
            </div>
            <figure className="term" aria-hidden="true">
              <figcaption><i /><i /><i /><span>two_sum.py</span></figcaption>
              <pre>{`def two_sum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        if target - n in seen:
            return [seen[target - n], i]
        seen[n] = i`}<span className="cur" /></pre>
            </figure>
          </div></section>

        <section id="contact" className="rv"><h2><small>09</small>Contact</h2>
          <p className="cbig">Let&rsquo;s build<br />something <em>worth it.</em></p>
          <a className="cmail" href={`mailto:${profile.email}`}>{profile.email}<span aria-hidden="true">↗</span></a>
          <div className="acts"><button className="btn" onClick={copy}>Copy email</button><a className="btn ghost" href="tel:+919375003148">Call {profile.phone}</a></div>
          <p role="status" className="mono">{copied ? 'Email copied to clipboard' : ''}</p>
          <div className="clinks">{Object.entries(L).map(([k, v]) => <a key={k} href={v} target="_blank" rel="noreferrer" aria-label={`${k} profile`}><span>{k}</span><i aria-hidden="true">↗</i></a>)}</div></section>
      </main>
      <footer>© {new Date().getFullYear()} Vikas Tarlana</footer>
      <a className="top" href="#top" aria-label="Back to top">↑</a>
    </>
  )
}

function Cert({ t, d, img, i, url }: { t: string; d: string; img?: string; i: string; url?: string }) {
  const [bad, setBad] = useState(false)
  const [flip, setFlip] = useState(false)
  return (
    <div className={`flip${flip ? ' on' : ''}`}>
      <button className="face front" aria-pressed={flip} tabIndex={flip ? -1 : 0} onClick={() => setFlip(true)}>
        {img && !bad ? <img src={img} alt={`${t} badge`} width="110" height="110" loading="lazy" onError={() => setBad(true)} /> : <span className="fb" aria-hidden="true">{i[0]}</span>}
        <span className="mono">{i}</span><strong>{t}</strong>
      </button>
      <div className="face back" aria-hidden={!flip}>
        <span className="mono">{i}</span><strong>{d}</strong>
        {url && <a className="btn sm" href={url} target="_blank" rel="noreferrer" tabIndex={flip ? 0 : -1}>Verify credential</a>}
        <button className="link" tabIndex={flip ? 0 : -1} onClick={() => setFlip(false)}>Flip back</button>
      </div>
    </div>
  )
}