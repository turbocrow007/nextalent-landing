import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'motion/react'
import { BriefcaseBusiness, Check, ChevronDown, Globe2, Mail, MessageCircle, Plus, X } from 'lucide-react'
import { assetUrl, contact, content, whatsappUrl } from './content'
import type { Locale } from './content'
import WorkforceFlow from './WorkforceFlow'
import PracticeVisual from './PracticeVisual'

const founders = [
  { name: 'Valentina Z.' },
  { name: 'Belén Z.' },
]

const journeyIds = ['about', 'partnership', 'approach', 'readiness', 'people', 'questions', 'contact']

function NextStep({ step, locale }: { step: number, locale: Locale }) {
  return <a className="button button-next" href={`#${journeyIds[step-1]}`}><span className="step-number" aria-hidden="true">{step}</span>{content[locale].journey.steps[step-1]}</a>
}

function initialLocale(): Locale {
  const query = new URLSearchParams(location.search).get('lang')
  if (query === 'en' || query === 'es') return query
  try { return localStorage.getItem('nextalent-language') === 'es' ? 'es' : 'en' } catch { return 'en' }
}

function Brand({ light = false }: { light?: boolean }) {
  return <a href="#home" className="brand" aria-label="NexTalent">
    <img className="brand-mark" src={assetUrl(`network${light ? '-light' : ''}.png`)} width="2115" height="2103" alt="" />
    <span className="brand-word"><img src={assetUrl(`wordmark${light ? '-light' : ''}.png`)} alt="NexTalent" width="2685" height="1041" /></span>
  </a>
}

export default function App() {
  const [locale, setLocale] = useState<Locale>(initialLocale)
  const [activeWeek, setActiveWeek] = useState(0)
  const [formInterest, setFormInterest] = useState(0)
  const [journeyStep, setJourneyStep] = useState(0)
  const privacyDialog = useRef<HTMLDialogElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const reduced = useReducedMotion()
  const t = content[locale]

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const entry = entries.filter(item => item.isIntersecting).sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))[0]
      if (entry) setJourneyStep(journeyIds.indexOf(entry.target.id))
    }, { rootMargin: '-20% 0px -55% 0px' })
    journeyIds.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
    document.title = t.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', t.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', t.description)
    try { localStorage.setItem('nextalent-language', locale) } catch { /* Private browsing can deny storage. */ }
    const url = new URL(location.href)
    url.searchParams.set('lang', locale)
    history.replaceState(null, '', url)
  }, [locale, t.title, t.description])

  const entrance = (delay = 0) => ({
    initial: reduced ? false as const : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: .55, delay, ease: [.16, 1, .3, 1] as [number, number, number, number] },
  })

  return <MotionConfig reducedMotion="user" transition={{ duration: .18, ease: [.16, 1, .3, 1] }}>
    <a className="skip-link" href="#main">{t.skip}</a>
    <div className="opening" id="home">
      <header className="site-header container">
        <Brand light />
        <div className="header-actions">
          <a className="header-jobs" href="#jobs"><BriefcaseBusiness size={16} aria-hidden="true" /><span>{t.jobs.nav}</span></a>
          <div className="language-switch" role="group" aria-label={t.language}>
            <Globe2 size={16} aria-hidden="true" />
            <button lang="en" aria-label="EN — English" aria-pressed={locale === 'en'} onClick={() => setLocale('en')}>EN</button>
            <span aria-hidden="true">/</span>
            <button lang="es" aria-label="ES — Español" aria-pressed={locale === 'es'} onClick={() => setLocale('es')}>ES</button>
          </div>
          <a className="button button-header" href="#contact"><MessageCircle size={16} aria-hidden="true" />{t.talk}</a>
        </div>
      </header>

      <main id="main">
        <section className="hero container" aria-labelledby="hero-title">
          <div className="hero-copy">
            <motion.p className="hero-label" {...entrance()}>{t.hero.label}</motion.p>
            <motion.h1 id="hero-title" {...entrance(.09)}>{t.hero.line1}<br /><span>{t.hero.line2}</span></motion.h1>
            <motion.p className="hero-description" {...entrance(.18)}>{t.hero.body}</motion.p>
            <motion.div className="hero-actions" {...entrance(.27)}>
              <a className="button button-aqua" href="#about"><span className="step-number" aria-hidden="true">1</span>{t.hero.primary}</a>
              <a className="text-link text-link-light" href="#contact" onClick={() => setFormInterest(0)}>{t.hero.secondary}</a>
            </motion.div>
            <motion.p className="hero-note" {...entrance(.33)}><span aria-hidden="true" className="note-line" />{t.hero.note}</motion.p>
          </div>
          <motion.figure className="hero-interpreters" {...entrance(.2)}>
            <img className="interpreter-photo" src={assetUrl('interpreters-hero.webp')} alt={t.hero.imageAlt} width="1536" height="1024" fetchPriority="high" />
            <figcaption><MessageCircle size={20} aria-hidden="true" /><span>{t.hero.photoNote}</span></figcaption>
          </motion.figure>
        </section>
        <div className="hero-foundation container" role="group" aria-label={t.hero.label}>
          {t.hero.foundation.map((label, i) => <div key={label}><span className={`foundation-shape shape-${i}`} aria-hidden="true" />{label}</div>)}
        </div>
        <div className="light-content">
          <section className="jobs-section" id="jobs" aria-labelledby="jobs-title"><div className="container jobs-layout"><div className="jobs-intro"><p className="jobs-label"><BriefcaseBusiness size={20} aria-hidden="true" />{t.jobs.nav}</p><h2 id="jobs-title">{t.jobs.title}</h2><p>{t.jobs.body}</p><a className="button button-outline" href="#contact" onClick={() => setFormInterest(2)}>{t.jobs.cta}</a></div><div className="jobs-pathways"><h3>{t.jobs.role}</h3><div><h4>{t.jobs.experienced}</h4><p>{t.jobs.experiencedBody}</p></div><div><h4>{t.jobs.learning}</h4><p>{t.jobs.learningBody}</p><a className="text-link" href="#approach">{t.jobs.learn}</a></div><p className="jobs-note">{t.jobs.note}</p></div></div></section>
          <nav className="journey-nav" aria-label={t.journey.label}><div className="container"><ol>{journeyIds.map((id, i) => <li key={id}><a href={`#${id}`} aria-current={journeyStep === i ? 'step' : undefined} title={t.journey.steps[i]}><span className="step-number">{i+1}</span>{' '}<span className="journey-link-label">{t.journey.short[i]}</span></a></li>)}</ol><p className="journey-current" aria-hidden="true">{journeyStep+1}. {t.journey.steps[journeyStep]}</p></div></nav>
          <section className="intro container section-pad" id="about" aria-labelledby="intro-title">
            <h2 id="intro-title">{t.intro.title}</h2>
            <div className="intro-body"><p className="lead">{t.intro.body}</p><p>{t.intro.detail}</p><NextStep step={2} locale={locale} /></div>
          </section>

          <section className="partnership-section" id="partnership" aria-labelledby="partnership-title">
            <div className="container partnership-layout">
              <div className="partnership-copy"><h2 id="partnership-title" className="preserve-lines">{t.partnership.title}</h2><p>{t.partnership.body}</p><div className="partnership-symbol" aria-hidden="true"><span /><span /><span /></div></div>
              <div className="responsibilities">
                <div className="responsibility responsibility-ours"><div className="responsibility-heading"><span className="small-wordmark">NexTalent</span><h3>{t.partnership.ours}</h3></div><ul>{t.partnership.ourItems.map(item => <li key={item}><Check size={16} aria-hidden="true" /><span>{item}</span></li>)}</ul></div>
                <div className="responsibility"><div className="responsibility-heading"><span className="small-wordmark partner-wordmark">{locale === 'en' ? 'Your team' : 'Tu equipo'}</span><h3>{t.partnership.theirs}</h3></div><ul>{t.partnership.theirItems.map(item => <li key={item}><Check size={16} aria-hidden="true" /><span>{item}</span></li>)}</ul></div>
                <p className="partnership-foot">{t.partnership.foot}</p>
                <div className="partnership-next"><NextStep step={3} locale={locale} /></div>
              </div>
            </div>
          </section>

          <section className="approach container section-pad" id="approach" aria-labelledby="approach-title">
            <div className="approach-intro"><h2 id="approach-title">{t.approach.title}</h2><p className="lead">{t.approach.body}</p></div>
            <div className="training-layout">
              <div className="week-tabs" role="tablist" aria-label={t.approach.title} aria-orientation="vertical">
                {t.approach.weeks.map((week, i) => <button key={i} role="tab" id={`week-${i}`} aria-selected={activeWeek === i} aria-controls="week-content" tabIndex={activeWeek === i ? 0 : -1} ref={el => { tabRefs.current[i] = el }} className={`week-tab ${activeWeek === i ? 'is-selected' : ''}`} onClick={() => setActiveWeek(i)} onKeyDown={e => {
                  let next: number | undefined
                  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (i+1)%4
                  if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (i+3)%4
                  if (e.key === 'Home') next = 0
                  if (e.key === 'End') next = 3
                  if (next !== undefined) { e.preventDefault(); setActiveWeek(next); tabRefs.current[next]?.focus({ preventScroll: true }) }
                }}><span className="week-label">{t.approach.week} {i+1}</span><span className="week-title">{week}</span><Plus size={20} aria-hidden="true" /></button>)}
              </div>
              <div className="week-panel" id="week-content" role="tabpanel" aria-labelledby={`week-${activeWeek}`} tabIndex={0}>
                <PracticeVisual week={activeWeek} locale={locale} />
                <AnimatePresence mode="wait" initial={false}><motion.div key={`${locale}-${activeWeek}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .12 }} className="week-copy"><h3>{t.approach.weeks[activeWeek]}</h3><p>{t.approach.details[activeWeek]}</p></motion.div></AnimatePresence>
              </div>
            </div>
            <p className="training-note">{t.approach.note}</p>
            <div className="continuous-support"><span className="support-symbol" aria-hidden="true"><MessageCircle size={24} /></span><div><h3>{t.approach.continuous}</h3><p>{t.approach.continuousBody}</p></div></div>
            <div className="section-next"><NextStep step={4} locale={locale} /></div>
          </section>

          <section className="readiness-section" id="readiness" aria-labelledby="readiness-title"><div className="container readiness-layout">
            <div className="readiness-copy"><h2 id="readiness-title">{t.readiness.title}</h2><p>{t.readiness.body}</p><div className="readiness-list">{t.readiness.items.map(([heading, body]) => <div key={heading}><Check size={20} aria-hidden="true" /><div><h3>{heading}</h3><p>{body}</p></div></div>)}</div></div>
            <div className="flow-area"><h3>{t.flow.title}</h3><p>{t.flow.body}</p><WorkforceFlow locale={locale} /></div>
          </div><div className="container section-next"><NextStep step={5} locale={locale} /></div></section>

          <section className="people container section-pad" id="people" aria-labelledby="people-title">
            <div className="people-intro"><h2 id="people-title" className="preserve-lines">{t.people.title}</h2><p className="lead">{t.people.body}</p></div>
            <div className="founder-stories">{founders.map((founder, i) => <article key={founder.name} className="founder-story founder-story-text"><div><p className="founder-role">{t.hero.roles[i]}</p><h3>{founder.name}</h3><p>{t.people.bios[i]}</p></div></article>)}</div>
            <p className="people-philosophy">{t.people.philosophy}</p>
            <div className="section-next"><NextStep step={6} locale={locale} /></div>
          </section>

          <aside className="careers-band"><div className="container careers-inner"><div><h2>{t.careers.title}</h2><p>{t.careers.body}</p></div><a className="button button-outline" href="#contact" onClick={() => setFormInterest(2)}>{t.careers.cta}</a></div></aside>

          <section className="faq container section-pad" id="questions" aria-labelledby="faq-title"><h2 id="faq-title">{t.faq.title}</h2><div className="faq-list">{t.faq.items.map(([q, a]) => <details key={q}><summary><span>{q}</span><ChevronDown size={20} aria-hidden="true" /></summary><p>{a}</p></details>)}<div className="section-next"><NextStep step={7} locale={locale} /></div></div></section>

          <section className="contact-section" id="contact" aria-labelledby="contact-title"><div className="container contact-layout"><div className="contact-copy"><h2 id="contact-title">{formInterest === 2 ? t.jobs.connectTitle : t.form.title}</h2><p>{formInterest === 2 ? t.jobs.connectBody : t.form.body}</p><div className="direct-contact"><span>{t.form.direct}</span><a href={whatsappUrl(t.form.partnerMessage)} target="_blank" rel="noopener noreferrer"><MessageCircle size={20} aria-hidden="true" />{contact.displayPhone}</a><a href={`mailto:${contact.email}`}><Mail size={20} aria-hidden="true" />{contact.email}</a></div><img className="contact-network" src={assetUrl('network-light.png')} alt="" width="2115" height="2103" loading="lazy" /></div><ContactForm locale={locale} interest={formInterest} setInterest={setFormInterest} /></div></section>
        </div>
      </main>

      <footer className="site-footer"><div className="container"><p className="footer-statement">{t.footer.line}</p><div className="footer-main"><Brand /><span className="footer-location">{t.footer.location}</span><a className="text-link" href="#home">{t.footer.top}</a></div><div className="footer-meta"><span>© {new Date().getFullYear()} NexTalent. {t.footer.rights}</span><button onClick={() => privacyDialog.current?.showModal()}>{t.footer.privacy}</button></div></div></footer>
    </div>

    <dialog ref={privacyDialog} className="privacy-dialog" onClick={e => { if (e.target === privacyDialog.current) privacyDialog.current.close() }} aria-labelledby="privacy-title"><div className="privacy-content"><h2 id="privacy-title">{t.privacy.title}</h2><p>{t.privacy.body}</p><p>{t.privacy.preference}</p><p>{t.privacy.contact} <a href={`mailto:${contact.email}`}>{contact.email}</a>.</p><button className="button button-navy" onClick={() => privacyDialog.current?.close()}><X size={16} aria-hidden="true" />{t.privacy.close}</button></div></dialog>
  </MotionConfig>
}

function ContactForm({ locale, interest, setInterest }: { locale: Locale, interest: number, setInterest: (v: number) => void }) {
  const t = content[locale].form
  const emailLabel = interest === 2 ? content[locale].jobs.email : t.email
  const [values, setValues] = useState({ name: '', email: '', company: '', message: '' })
  const [touched, setTouched] = useState({ name: false, email: false })
  const [prepared, setPrepared] = useState('')
  const [formState, setFormState] = useState<'default' | 'loading' | 'success' | 'error'>('default')
  useEffect(() => { setPrepared(''); setFormState('default') }, [interest, locale])
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const validEmail = () => Boolean(values.email.trim()) && Boolean(emailRef.current?.validity.valid)
  const update = (key: keyof typeof values, value: string) => { setValues(v => ({ ...v, [key]: value })); setFormState('default'); setPrepared('') }

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setTouched({ name: true, email: true })
    if (!values.name.trim()) { nameRef.current?.focus(); return }
    if (!validEmail()) { emailRef.current?.focus(); return }
    const message = [interest === 2 ? t.interpreterMessage : t.partnerMessage, '', `${t.name}: ${values.name.trim()}`, `${emailLabel}: ${values.email.trim()}`, values.company.trim() ? `${t.company}: ${values.company.trim()}` : '', `${t.interest}: ${t.interests[interest]}`, '', values.message.trim()].filter((line, i, a) => line || (i > 0 && a[i-1])).join('\n')
    const url = whatsappUrl(message)
    setFormState('loading')
    try {
      const opened = window.open('about:blank', '_blank')
      if (opened) { opened.opener = null; opened.location.href = url; setFormState('success') }
      else setFormState('error')
    } catch { setFormState('error') }
    setPrepared(url)
  }
  const nameError = touched.name && !values.name.trim()
  const emailError = touched.email && !validEmail()

  return <form className="contact-form" onSubmit={submit} noValidate data-state={formState}>
    <div className="form-field"><label htmlFor="name">{t.name}</label><input ref={nameRef} id="name" name="name" value={values.name} onChange={e => update('name', e.target.value)} onBlur={() => setTouched(v => ({ ...v, name: true }))} autoComplete="name" required maxLength={120} placeholder={t.namePlaceholder} aria-invalid={nameError || undefined} aria-describedby="name-error" /><span id="name-error" className="field-helper" aria-live="polite">{nameError ? t.errors.name : ''}</span></div>
    <div className="form-field"><label htmlFor="email">{emailLabel}</label><input ref={emailRef} id="email" type="email" name="email" value={values.email} onChange={e => update('email', e.target.value)} onBlur={() => setTouched(v => ({ ...v, email: true }))} autoComplete="email" required maxLength={254} placeholder={t.emailPlaceholder} aria-invalid={emailError || undefined} aria-describedby="email-error" /><span id="email-error" className="field-helper" aria-live="polite">{emailError ? t.errors.email : ''}</span></div>
    <div className="form-field"><label htmlFor="company">{t.company} <span>({t.optional})</span></label><input id="company" name="company" value={values.company} onChange={e => update('company', e.target.value)} autoComplete="organization" maxLength={160} placeholder={t.companyPlaceholder} /></div>
    <div className="form-field"><label htmlFor="interest">{t.interest}</label><div className="select-wrap"><select id="interest" value={interest} onChange={e => { setInterest(Number(e.target.value)); setFormState('default'); setPrepared('') }}>{t.interests.map((item, i) => <option key={i} value={i}>{item}</option>)}</select><ChevronDown size={16} aria-hidden="true" /></div></div>
    <div className="form-field form-field-full"><label htmlFor="message">{t.message} <span>({t.optional})</span></label><textarea id="message" name="message" rows={3} value={values.message} onChange={e => update('message', e.target.value)} maxLength={2000} placeholder={t.messagePlaceholder} /></div>
    <div className="form-submit form-field-full"><button type="submit" className="button button-navy" disabled={formState === 'loading'} aria-busy={formState === 'loading'}><MessageCircle size={20} aria-hidden="true" />{t.submit}</button><a href={`mailto:${contact.email}?subject=${encodeURIComponent(t.mailSubject)}`} className="text-link">{t.emailCta}</a></div>
    <p className="form-privacy form-field-full">{t.privacy}</p>
    <div className="form-feedback form-field-full" role="status">{prepared && <><p>{formState === 'error' ? t.blocked : t.ready}</p><a className="text-link" href={prepared} target="_blank" rel="noopener noreferrer">{t.open}</a></>}</div>
  </form>
}
