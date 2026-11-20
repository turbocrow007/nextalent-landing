import { BookOpen, Check, ClipboardList, Headphones, MessageCircle, PenLine, Stethoscope, UserRound } from 'lucide-react'
import { content } from './content'
import type { Locale } from './content'

/** A curriculum illustration: recognisable tools and activities, rather than abstract decoration. */
export default function PracticeVisual({ week, locale }: { week: number, locale: Locale }) {
  const approach = content[locale].approach
  const visual = approach.visuals[week]
  const people = [Stethoscope, Headphones, UserRound]

  return <figure className={`practice-art practice-${week}`} aria-labelledby="practice-visual-title">
    <div className="practice-visual-header"><span>{approach.week} {week+1} / 4</span><span className="practice-progress" aria-hidden="true">{[0,1,2,3].map(i => <span key={i} className={i<=week ? 'is-reached' : undefined} />)}</span></div>
    <figcaption id="practice-visual-title">{visual.title}</figcaption>

    {week === 0 && <div className="call-essentials"><div className="headset-illustration" aria-hidden="true"><Headphones size={64} strokeWidth={1.5} /><MessageCircle className="headset-speech" size={24} /></div><div className="practice-activity"><p className="practice-object-label"><BookOpen size={16} aria-hidden="true" />{visual.label}</p><ul>{visual.items.map(item => <li key={item}><Check size={16} aria-hidden="true" /><span>{item}</span></li>)}</ul></div></div>}

    {week === 1 && <div className="practice-notepad"><div className="notepad-heading"><span>{visual.label}</span><PenLine size={24} aria-hidden="true" /></div><ul>{visual.items.map(item => <li key={item}><span>{item}</span><span className="notepad-rule" aria-hidden="true" /></li>)}</ul></div>}

    {week === 2 && <div className="mock-call"><p className="practice-object-label">{visual.label}</p><ol className="conversation-path">{visual.items.map((item, i) => { const Icon = people[i]; return <li key={item}><span className={`conversation-person person-${i}`}><Icon size={32} strokeWidth={1.5} aria-hidden="true" /></span><span>{item}</span></li> })}</ol><div className="conversation-exchange" aria-hidden="true"><MessageCircle size={20} /><span /><MessageCircle size={20} /></div></div>}

    {week === 3 && <div className="practice-checklist"><div className="checklist-heading"><ClipboardList size={24} aria-hidden="true" /><span>{visual.label}</span></div><ul>{visual.items.map(item => <li key={item}><span className="practice-check-box"><Check size={16} aria-hidden="true" /></span><span>{item}</span></li>)}</ul></div>}
  </figure>
}
