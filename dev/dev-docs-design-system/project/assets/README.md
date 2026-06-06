# assets/

The dev-docs repo ships **no logo, wordmark image, or icon binaries**. This folder documents the brand's visual assets so designs stay faithful.

## Wordmark
There is no logo file. dev-docs presents as a plain **lowercase `dev-docs`** wordmark set in the system font (sans for marketing, mono on the dark rail), in `--slate-900` on light grounds and white on the dark rail. Render it as text — do not invent a logo graphic. See `guidelines/brand-wordmark.html`.

## Icons — Lucide
The app uses [**Lucide**](https://lucide.dev) exclusively via `lucide-react`. No icon font or sprite is bundled. For HTML artifacts, link icons from CDN:

- Static SVG: `https://unpkg.com/lucide-static@latest/icons/<name>.svg`
- React: `import { MessageSquare } from "lucide-react"`

Render at 16–20px, `stroke-width: 2`, `currentColor`. Names in real use: `message-square`, `folder-open`, `settings`, `send`. See `guidelines/brand-iconography.html` and the ICONOGRAPHY section of the root `readme.md`.

## Imagery
None. dev-docs has no photography, illustration, or gradient artwork. Use the product's own surfaces (plan trees, terminal logs, file paths) as hero imagery when a visual is needed.
