# NexTalent motion direction

## Source and purpose
Approved direction: human and confident, clear typography, restrained motion, existing navy/turquoise/circular brand. The motion-graphics-skills `motion-effects` flowing-paths recipe supplies cause-and-effect timing for the workforce diagram. Adapted to a live responsive website, not a looping launch film.

## Colour and type
All rendered colours come from tokens.css in OKLCH. Reference HEX roles: #06294C navy ground, #59C3D1 accent, #94DEEA light aqua, #FFFFFF light text. Accessible supporting ink/rule/error colours are defined centrally. Nunito body 16–20px, Manrope display 38–80px and section headings 30–54px. Logo files stay unchanged.

## Three primitives
1. A single hero entrance: 550ms opacity/12px translation, 90ms stagger, then hold. Immediate readable content in reduced motion.
2. Workforce path demonstration: one source passes through assessment, practice, and readiness to a partner. Deterministic 8-second timeline, play once on entry, holds from 6.6 seconds. Replay is explicit. A complete aqua chip with navy text and a check crossfades in on pulse arrival; the destination confirms with the same full fill. Mobile chips use the same clock and feedback. No ambient looping.
3. Interaction feedback: press translateY(1px) 100ms, panel crossfade 150ms. Focus rings appear instantly.

## Timing
Motion React uses the shared curve [0.16, 1, 0.3, 1]. UI only animates opacity and transforms. The diagram uses positions derived from a single time value, with no random values, and supports seeking via ?motionReview=1 for QA. No layout, blur, or shadow animation.

## Reduced motion and finish
Respect prefers-reduced-motion dynamically. Diagram shows the finished state, hero is static, panel changes use at most 150ms opacity. No gradients, glow, particles, typewriter, bounce, cursor follower, scroll hijack, or animation on every section. Static circles and thin lines echo the supplied identity.

## Example sequence
0 seconds: readable labels and all structural connectors. 0.25–1.8: talent connects to preparation routes; each complete chip changes from navy to aqua on arrival. 1.8–3.6: routes connect to the partner, whose destination changes to aqua with a check. 3.6–6.6: second pass reinforces the sequence. 6.6 onwards: finished still held. The replay control starts this sequence again.

## Guided navigation
Seven numbered, user-triggered next steps connect introduction, partnership, preparation, readiness, team, questions, and contact. The itinerary highlights the visible section. No automatic scrolling. Smooth anchor scrolling is disabled for reduced motion.
