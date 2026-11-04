# Samatvam

Website for **Samatvam Endocrinology Diabetes** and **Jnana Sanjeevini**, run by Samatvam: Science and Research for
Human Welfare Trust, Bangalore. This is a port of the old samatvam.org (a 2020 create-react-app SPA) to a modern static
stack.

**Live:** https://alphazero4.github.io/Samatvam/

## Stack

| Piece       | Choice                                                                                                                |
| ----------- | --------------------------------------------------------------------------------------------------------------------- |
| Framework   | [Astro 7](https://astro.build): every page is prerendered static HTML                                                 |
| Styling     | Tailwind CSS 4 + `@tailwindcss/typography`, design tokens in `src/styles/global.css`                                  |
| Transitions | View Transitions API through Astro's `<ClientRouter />`, plus scroll-reveal and micro-interactions                    |
| Dark mode   | Class-based (`html.dark`). Follows the OS setting until the visitor toggles it; the choice is saved in `localStorage` |
| Images      | `astro:assets` generates responsive WebP from `src/assets/media`                                                      |
| Content     | Markdown content collection (`src/content/pages`) + typed data (`src/data`)                                           |
| Hosting     | GitHub Pages, deployed by GitHub Actions                                                                              |

Motion respects `prefers-reduced-motion`. Without JavaScript, all content is still visible.

## Run locally

Requires Node ≥ 22.12 (CI uses Node 24, see `.nvmrc`).

```bash
npm install
npm run dev        # http://localhost:4321/Samatvam/
npm run build      # outputs dist/
npm run preview
```

`npm run ci` runs the full pipeline locally: format check, type check, build and internal-link check.

## Editing content

| What                                   | Where                                                  |
| -------------------------------------- | ------------------------------------------------------ |
| Long-form pages (About, Diabetes, ...) | `src/content/pages/<slug>.md`, each becomes `/<slug>/` |
| Navigation, addresses, helplines       | `src/data/site.ts`                                     |
| Home slides, doctors, gallery, PDFs    | `src/data/content.ts`                                  |
| Testimonials                           | `src/data/testimonials.ts`                             |
| Images                                 | `src/assets/media/` (reference by file name)           |
| PDFs (newsletters, press)              | `public/docs/`                                         |

Old hash links such as `samatvam.org/#/about-us` redirect to the matching page.

## CI/CD

- **`.github/workflows/ci.yml`**: on pull requests and non-`main` branches, runs format check, `astro check`,
  build and the link checker.
- **`.github/workflows/deploy.yml`**: on every push to `main`, runs the same checks, then publishes `dist/` to
  GitHub Pages.
- **Dependabot** opens weekly npm and monthly Actions update PRs.

Repository variables (Settings → Secrets and variables → Actions → Variables), all optional:

| Variable               | Default                        | Purpose                                                                                         |
| ---------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------- |
| `SITE_URL`             | `https://alphazero4.github.io` | Canonical origin                                                                                |
| `SITE_BASE`            | `/Samatvam`                    | Sub-path. Use `/` for a custom domain                                                           |
| `PUBLIC_CONTACT_EMAIL` | `samatvam@gmail.com`           | Contact form recipient                                                                          |
| `PUBLIC_FORM_ENDPOINT` | _(empty)_                      | JSON POST endpoint for the form (e.g. Formspree). Empty means the form opens a pre-filled email |

### Moving to samatvam.org

1. Set `SITE_URL=https://samatvam.org` and `SITE_BASE=/` as repository variables.
2. Add the custom domain under Settings → Pages, then point the domain's DNS at GitHub Pages.

## Notes on the port

- Content was extracted from the old site's JavaScript bundle and kept as close to the original as possible. A few
  obvious typos were fixed.
- Patient phone numbers and email addresses shown alongside testimonials on the old site are **not** republished.
- The old contact form posted to a third-party email relay. The new form opens a pre-filled email by default, or posts
  to `PUBLIC_FORM_ENDPOINT` if one is configured.
- Images were re-encoded from about 107 MB of PNG/JPEG to about 11 MB of WebP sources. Astro then generates
  responsive sizes at build time.
