# BLAGG Studio — Agent Guidelines

## Project Purpose
This project is a premium construction, architecture, renovation, project tracking, field upload, and operations platform for BLAGG Studio. It is not only a marketing website. It must support lead generation, project tracking, admin workflows, customer transparency, and worker photo uploads.

## Brand Positioning
BLAGG Studio is a premium but understandable architecture and renovation studio. The tone should be professional, clear, trustworthy, controlled, and customer-friendly.

Main positioning:
“Renovasyon sürecinizi tasarımdan teslimata kadar görünür hale getiriyoruz.”

Short brand language:
“Design. Build. Track.”

Turkish equivalent:
“Tasarla. Uygula. Takip Et.”

## Product Ecosystem
- BLAGG Studio: public brand and service surface.
- BLAGG Remote: customer project tracking through a private link without login.
- BLAGG Field: worker upload screen for photos, notes, and work status.
- BLAGG Control: admin and operations panel for applications, quotes, projects, photos, finance, documents, and settings.
- BLAGG Signature: refined model for selected premium projects.

## UX Rules
- Mobile-first.
- Simple enough for a 65+ user.
- No dense text blocks.
- Large readable fonts.
- Large buttons.
- Clear contrast.
- One main action per section.
- No unnecessary animations.
- No overly corporate or cold language.
- Avoid fake scale or exaggerated claims.

## Design Direction
Use a high-end black, white, warm stone, and taupe architecture style:
- Obsidian Black: #0A0A0A
- Soft Ivory: #F6F1E8
- Warm Stone: #D8CDBF
- Champagne Taupe: #B9A58B
- Deep Espresso: #2A211B
- Muted Bronze: #8C7356
- Line Sand: #E5DACC
- Text Graphite: #2F2F2F
- Soft Gray: #8B837A

Avoid gold-heavy, shiny, ornamental, or exaggerated luxury styling.

## Technical Rules
- Use Next.js App Router if the project already uses it.
- Use TypeScript entity definitions where possible.
- Use Tailwind CSS consistently.
- Keep components reusable.
- Do not hard-code duplicated UI.
- Keep mock data isolated in data files.
- Keep service-layer files ready for future Supabase/PostgreSQL queries.
- Do not break existing routes.
- Run build checks after significant changes.
- Fix build errors before finishing.

## Required Main Routes
- /
- /hizmetler
- /hizmetler/anahtar-teslim-insaat
- /hizmetler/tadilat
- /hizmetler/villa-renovasyonu
- /hizmetler/deger-artirma
- /hizmetler/blagg-remote
- /projeler
- /surec
- /blagg-remote
- /deger-artirma
- /teklif-al
- /proje-takip
- /iletisim
- /admin
- /admin/finance
- /client/[slug]/proje-takip/[token]
- /field/[slug]/usta-takip/[token]

## Required Features
- Offer form with strict phone validation.
- Photo upload UI.
- Admin application board.
- Project creation from applications.
- Customer project tracking demo.
- Worker photo upload demo.
- Project portfolio filters.
- Before/after gallery structure.
- Material transparency section.
- Payment plan component.
- Document list component.
- Photo timeline component.
- Photo approval flow: worker upload, admin review, customer-visible approved records only.

## Phone Validation Rules
Accept:
- Turkish mobile numbers beginning with 05
- +90 mobile format

Reject:
- Empty numbers
- Too short numbers
- 1234567890
- 1111111111
- Repeated digit patterns
- Obvious fake numbers

## Content Rules
Prefer clear Turkish. Avoid long corporate paragraphs. Use practical construction language. Focus on trust, process, transparency, material quality, controlled delivery, and visible progress.

Do not use the old brand name or the old remote-tracking wording. Use:
- BLAGG Studio
- BLAGG Remote
- Uzaktan Proje Yönetimi

## Build Discipline
Before completing any implementation:
- Check changed files.
- Run available build/test commands.
- Report what changed.
- Report any remaining limitations.
