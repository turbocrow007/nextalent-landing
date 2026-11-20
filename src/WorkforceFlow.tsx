import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'motion/react'
import { Pause, Play, RotateCcw } from 'lucide-react'
import type { Locale } from './content'
import { content } from './content'

const routes = [100, 190, 280]
const ease = (v: number) => { const p = Math.max(0, Math.min(1, v)); return p * p * (3 - 2 * p) }
const bezier = (p: number, a: number, b: number, c: number, d: number) => (1-p)**3*a + 3*(1-p)**2*p*b + 3*(1-p)*p*p*c + p**3*d

/** Seed-free timeline: pixels depend only on seconds. Adapted from motion-effects / Flowing paths. */
function Pulse({ time, row, second, repeat }: { time: ReturnType<typeof useMotionValue<number>>, row: number, second: boolean, repeat: boolean }) {
  const start = (second ? 1.8 : .25) + row * .14 + (repeat ? 3.35 : 0)
  const x = useTransform(time, t => {
    const p = ease((t-start)/1.05)
    return second ? bezier(p, 300, 390, 420, 510) : bezier(p, 90, 180, 210, 300)
  })
  const y = useTransform(time, t => {
    const p = ease((t-start)/1.05)
    return second ? bezier(p, routes[row], routes[row], 190, 190) : bezier(p, 190, 190, routes[row], routes[row])
  })
  const opacity = useTransform(time, t => t >= start && t <= start+1.05 ? 1 : 0)
  return <motion.circle r="5" className="flow-pulse" style={{ x, y, opacity }} />
}

export default function WorkforceFlow({ locale }: { locale: Locale }) {
  const text = content[locale].flow
  const ref = useRef<HTMLDivElement>(null)
  const visible = useInView(ref, { once: true, amount: .45 })
  const reduced = useReducedMotion()
  const time = useMotionValue(0)
  const control = useRef<ReturnType<typeof animate> | null>(null)
  const [running, setRunning] = useState(false)
  const [paused, setPaused] = useState(false)
  const [review, setReview] = useState<number | null>(null)

  useEffect(() => {
    if (new URLSearchParams(location.search).has('motionReview')) setReview(6.6)
  }, [])

  useEffect(() => {
    if (!visible) return
    control.current?.stop()
    if (reduced || review !== null) {
      time.set(review ?? 6.6)
      setRunning(false)
      return
    }
    time.set(0)
    setRunning(true)
    control.current = animate(time, 6.6, { duration: 6.6, ease: 'linear', onComplete: () => setRunning(false) })
    return () => control.current?.stop()
  }, [visible, reduced, time, review])

  const play = () => {
    control.current?.stop()
    time.set(0)
    setPaused(false)
    setRunning(true)
    control.current = animate(time, 6.6, { duration: 6.6, ease: 'linear', onComplete: () => setRunning(false) })
  }
  const toggle = () => {
    if (paused) control.current?.play()
    else control.current?.pause()
    setPaused(!paused)
  }

  return <div className="flow-figure" ref={ref}>
    <svg className="flow-svg" viewBox="0 0 600 380" role="img" aria-labelledby="flow-title flow-description">
      <title id="flow-title">{text.title}</title>
      <desc id="flow-description">{text.source}: {text.middle.join(', ')}. {text.target}.</desc>
      {routes.map((y, i) => <g key={y} className="flow-connector">
        <path d={`M90,190 C180,190 210,${y} 300,${y}`} />
        <path d={`M300,${y} C390,${y} 420,190 510,190`} />
        {!reduced && <>
          <Pulse time={time} row={i} second={false} repeat={false} />
          <Pulse time={time} row={i} second repeat={false} />
          <Pulse time={time} row={i} second={false} repeat />
          <Pulse time={time} row={i} second repeat />
        </>}
      </g>)}
      <circle className="flow-source-ring flow-source-active" cx="90" cy="190" r="45" />
      <circle className="flow-node-core flow-core-active" cx="90" cy="190" r="8" />
      <text className="flow-label flow-label-end" x="90" y="265">{text.source}</text>
      {routes.map((y, i) => <PreparationNode key={y} y={y} row={i} time={time} label={text.middle[i]} />)}
      <PartnerNode time={time} />
      <text className="flow-label flow-label-end" x="510" y="265">{text.target}</text>
    </svg>
    <div className="flow-mobile" aria-hidden="true"><div className="flow-mobile-end flow-mobile-target">{text.source}</div><div className="flow-mobile-stem" /><div className="flow-mobile-stages">{text.middle.map((label, i) => <MobilePreparationNode key={i} row={i} time={time} label={label} />)}</div><div className="flow-mobile-stem" /><MobilePreparationNode row={12} time={time} label={text.target} /></div>
    <div className="flow-caption"><p>{text.caption}</p>
      {!reduced && review === null && <button className="icon-text-button" onClick={running ? toggle : play} aria-label={running ? (paused ? text.resume : text.pause) : text.replay}>
        {running ? (paused ? <Play size={16} /> : <Pause size={16} />) : <RotateCcw size={16} />}
        <span>{running ? (paused ? text.resume : text.pause) : text.replay}</span>
      </button>}
    </div>
    {review !== null && <label className="review-control">Motion review: {review.toFixed(2)}s<input type="range" min="0" max="8" step=".01" value={review} onChange={e => setReview(Number(e.target.value))} /></label>}
  </div>
}

function PreparationNode({ time, row, y, label }: { time: ReturnType<typeof useMotionValue<number>>, row: number, y: number, label: string }) {
  const opacity = useTransform(time, t => ease((t - (1.30 + row * .14))/.22))
  return <g><rect className="flow-middle" x="218" y={y-24} width="164" height="48" rx="24" /><text className="flow-label" x="306" y={y+5}>{label}</text><motion.g className="flow-completed-chip" style={{ opacity }} aria-hidden="true"><rect className="flow-complete-fill" x="218" y={y-24} width="164" height="48" rx="24" /><path className="flow-complete-check" d={`M232,${y} l4,4 l7,-8`} /><text className="flow-label flow-complete-label" x="306" y={y+5}>{label}</text></motion.g></g>
}

function PartnerNode({ time }: { time: ReturnType<typeof useMotionValue<number>> }) {
  const opacity = useTransform(time, t => ease((t - 3.13)/.25))
  return <g><circle className="flow-source-ring" cx="510" cy="190" r="45" /><circle className="flow-node-core" cx="510" cy="190" r="8" /><motion.g style={{ opacity }}><circle className="flow-target-ring" cx="510" cy="190" r="45" /><path className="flow-complete-check flow-partner-check" d="M496,190 l10,10 l20,-22" /></motion.g></g>
}

function MobilePreparationNode({ time, row, label }: { time: ReturnType<typeof useMotionValue<number>>, row: number, label: string }) {
  const opacity = useTransform(time, t => ease((t - (row === 12 ? 3.13 : 1.30 + row * .14))/.22))
  return <span className="flow-mobile-chip"><span>{label}</span><motion.span className="flow-mobile-complete" style={{ opacity }}>{label}</motion.span></span>
}
