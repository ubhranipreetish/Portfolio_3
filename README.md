# Preetish Ubhrani — Portfolio

A personal portfolio for an AI/ML engineer and full-stack developer, built as a
dark, editorial, motion-driven single page. The design language is the in-house
**"Signal"** system: a near-black canvas, warm bone text, and a single
chartreuse accent, with an oscilloscope / instrument motif running through the
interactive sections.

**Live:** https://preetish-ubhrani-portfolio.vercel.app

---

## Tech stack

| Area      | Choices                                                                   |
| --------- | ------------------------------------------------------------------------- |
| Framework | [Next.js 16](https://nextjs.org) (App Router), React 19                    |
| Styling   | Tailwind CSS v4                                                            |
| Motion    | Framer Motion, [Lenis](https://lenis.darkroom.engineering) smooth scroll   |
| 3D        | three.js + @react-three/fiber (hero scene)                                 |
| Email     | [Resend](https://resend.com) (contact form API route)                     |
| Icons     | lucide-react                                                              |
| Deploy    | Vercel                                                                    |

## Sections

- **Hero** — kinetic name, roles, and value line over a three.js scene
- **Process** — a four-step scrollytelling pipeline (data → models → agents → products)
- **Featured Work** — five flagship projects (desktop split-screen index, mobile card deck) with framed key-art posters
- **Experience** — internship timeline, company-first hierarchy
- **Capabilities** — "The Trailhead": an editorial index of four disciplines with a sticky readout (desktop) / accordion (mobile)
- **About**, **Contact** (Resend-backed form), and **Footer**

## Project structure

```
src/
├── app/
│   ├── page.js              # section composition
│   ├── layout.js            # metadata, fonts, OG tags
│   ├── globals.css          # "Signal" design tokens + utilities
│   ├── opengraph-image.js   # generated social share card
│   ├── icon.svg / *.png     # favicons (signal-pulse mark)
│   └── api/contact/route.js # Resend email endpoint
├── components/              # one file per section + shared pieces
└── config/
    └── userData.js          # ALL content: bio, work, experience, capabilities…
```

To edit any copy, project, or link, change **`src/config/userData.js`** — the
components render from it.

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint
```

## Environment

The contact form uses Resend. Create `.env.local`:

```bash
RESEND_API_KEY=your_key_here
```

See `EMAIL_SETUP.md` for the full setup. Env files are git-ignored.

## Assets

- Project key art lives in `public/images/projects/` (`*-key.png`).
- Résumé is served at `/resume.pdf` (`public/resume.pdf`) and linked from the nav.

---

Built with Next.js and Claude Code.
