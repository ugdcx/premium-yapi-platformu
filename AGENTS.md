Repo kök dizinine AGENTS.md dosyası oluştur.

Bu dosya Codex’in bu projede her zaman takip edeceği kuralları içersin.

İçerik:

# BLAAG Construction and Architecture — Agent Guidelines

## Project Purpose
This project is a premium construction and renovation platform for BLAAG Construction and Architecture. It is not only a marketing website. It must support lead generation, project tracking, admin workflows, customer transparency, and worker photo uploads.

## Brand Positioning
BLAAG is a premium but understandable construction and renovation company. The tone should be professional, clear, trustworthy, and customer-friendly.

Main positioning:
“Tadilat ve inşaat sürecinizi fotoğraflı takip sistemiyle şeffaf hale getiriyoruz.”

## Main Product Difference
The key differentiator is the Project Tracking System:
- Customers receive a unique project tracking link.
- Customers do not need to register or log in.
- Workers receive a separate upload link.
- Workers can upload photos and notes.
- Admin manages applications, projects, payments, materials, documents, and status.

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
Use a premium construction/architecture style:
- Deep navy
- Warm off-white
- Stone gray
- Beige
- Subtle bronze/gold accents
- Clean cards
- Large spacing
- Strong typography
- High readability

## Technical Rules
- Use Next.js App Router if the project already uses it.
- Use TypeScript where possible.
- Use Tailwind CSS consistently.
- Keep components reusable.
- Do not hard-code duplicated UI.
- Keep mock data isolated in a data file.
- Do not break existing routes.
- Run lint/build checks after significant changes.
- Fix TypeScript and build errors before finishing.

## Required Main Routes
- /
- /hizmetler
- /hizmetler/anahtar-teslim-insaat
- /hizmetler/tadilat
- /hizmetler/villa-renovasyonu
- /hizmetler/deger-artirma
- /hizmetler/gurbetci-ev-takip
- /projeler
- /surec
- /teklif-al
- /proje-takip
- /iletisim
- /admin
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
Prefer clear Turkish.
Avoid long corporate paragraphs.
Use practical construction language.
Focus on trust, process, transparency, material quality, and controlled delivery.

## Build Discipline
Before completing any implementation:
- Check changed files.
- Run available lint/build/test commands.
- Report what changed.
- Report any remaining limitations.