# BLAGG Studio — Agent Guidelines

## Project Purpose
This project is a premium architecture, renovation, lead generation, project tracking, field upload, and operations platform for BLAGG Studio. It is not only a marketing website. It must support customer transparency, project applications, project tracking, admin workflows, and worker photo uploads.

## Brand Positioning
BLAGG Studio is a premium but understandable architecture and renovation studio. The tone should be professional, clear, trustworthy, controlled, and customer-friendly.

Main positioning:
“Renovasyon sürecinizi tasarımdan teslimata kadar görünür hale getiriyoruz.”

Brand language:
“Design. Build. Track.”

Turkish equivalent:
“Tasarla. Uygula. Takip Et.”

## Product Ecosystem
- BLAGG Studio: public brand and service surface.
- BLAGG Remote: customer project tracking through a private link without login.
- BLAGG Field: worker upload screen for photos, notes, and work status.
- BLAGG Control: admin and operations panel for applications, quotes, projects, photos, finance, documents, and settings.
- BLAGG Signature: curated premium working model for selected projects.

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
Use a refined monochrome architecture style:
- Pure Black: #000000
- Studio Black: #050505
- Carbon: #0E0E0F
- Graphite: #1C1C1E
- Deep Gray: #2C2C2E
- System Gray: #636366
- Soft Gray: #A1A1A6
- Line Gray: #D1D1D6
- Cloud: #F5F5F7
- Pure White: #FFFFFF

Avoid brown, beige, taupe, bronze, champagne, sand, warm stone, espresso, gold, colorful cards, loud shadows, or decorative luxury styling.

## Technical Rules
- Use Next.js App Router if the project already uses it.
- Use TypeScript where possible.
- Use Tailwind CSS consistently.
- Keep components reusable.
- Do not hard-code duplicated UI.
- Keep mock data isolated in data files.
- Do not break existing routes.
- Run build checks after significant changes.
- Fix TypeScript and build errors before finishing.

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

Public language is Turkish for now. Do not show EN/DE language switchers until a full i18n system exists.

Use:
- BLAGG Studio
- BLAGG Remote
- BLAGG Control
- BLAGG Signature

Do not use old brand names, fake phone numbers, public WhatsApp buttons, demo/placeholder labels on polished public UI, or incomplete-looking public content.

## Build Discipline
Before completing any implementation:
- Check changed files.
- Run available build/test commands.
- Report what changed.
- Report any remaining limitations.
