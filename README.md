# NexTalent

**Demo:** https://turbocrow007.github.io/nextalent-landing/

Landing biling?e de NexTalent para presentar sus servicios, recibir consultas de aliados y orientar a futuros int?rpretes.

English / Spanish landing page for clients and interpreter workforce partners. Built with React, TypeScript, Vite, and Motion React.

## Publicaci?n

Los cambios enviados a `main` se compilan y publican autom?ticamente en GitHub Pages mediante GitHub Actions. La compilaci?n usa `/nextalent-landing/` como ruta base.

## Run

```sh
npm ci
npm run dev
```

Production: `npm run build`. Output: `dist/`. Preview the build with `npm run preview`.

## Editing

- `src/content.ts`: all English and Spanish copy, official contact details, and WhatsApp draft URLs.
- `tokens.css`: shared colour, typography, spacing, and motion tokens.
- `src/styles.css`: responsive layout.
- `src/WorkforceFlow.tsx`: deterministic workforce motion diagram. `?motionReview=1` enables the review timeline. The default experience plays once, with pause/replay, then holds.
- `public/assets/`: original supplied logos and a neutral AI-generated interpreter hero image. Founder portraits have been removed from the website assets. The image generation prompt and provenance are saved beside the hero asset. Both fonts are self-hosted from the installed OFL font packages.
- `brand.md` and `MOTION.md`: source provenance and the agreed brand/motion direction. The motion graphics skill pack was installed under the user's Codex skills directory. Its Flowing paths effect informs the diagram's timing.

## Contact behavior

Primary calls to action lead to the on-page form. The form checks a required name and syntactically valid email, then opens a draft at WhatsApp +591 62335488. Visitors review and send it in WhatsApp. A fallback link appears if popups are blocked. This site has no enquiry database and never reports that a message was sent. Email links open a mail application addressed to operations@nextalentbo.com.

Language is saved locally and can also be selected using `?lang=en` or `?lang=es`. No analytics or advertising scripts are included.

## Guided journey and jobs

The Jobs header link leads to an interpreter opportunity section near the top. Until specific vacancies are confirmed, it invites enquiries about availability rather than claiming active openings. The Jobs action leads to the Connect form with Interpreter development preselected. Applicants enter their name and email there before continuing to a WhatsApp draft. The lower interpreter entry uses the same flow.

Seven numbered anchor steps connect Meet NexTalent, partnership responsibilities, preparation, readiness, the team, questions, and contact. A visible-section indicator follows scrolling; each section has a next-step link. On small screens the compact guide retains accessible labels. Anchor scrolling respects reduced motion.

The workforce animation crossfades each whole chip from navy to aqua with a check as its pulse arrives. It uses the same deterministic timeline on desktop and mobile, and the reduced-motion view shows the completed state.

## Checks completed

TypeScript and production build; English and Spanish layout checks from 320px to 1920px; keyboard training tabs; FAQ; native privacy dialog and Escape; required field and email validation; Unicode-safe WhatsApp draft composition; destination links; blocked-popup fallback; image loading; reduced motion; deterministic animation frames; axe WCAG 2.1 AA scans and contrast calculations. Automated accessibility checks supplement manual layout and keyboard inspection.

The contact destinations were supplied by the client. A WhatsApp draft was verified without sending a message. No mailbox deliverability or third-party message delivery is implied.
