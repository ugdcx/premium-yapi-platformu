# BLAGG Studio Architecture v1

## Product Scope

BLAGG Studio consists of four connected systems:

1. Marketing Website
2. Lead and Sales Management
3. Project and Field Management
4. Customer Portal

AI is a supporting service. It does not make financial, legal, engineering or contractual decisions.

Audio, voice recording, voice transcription and voice assistant features are out of scope.

---

## Core Business Flow

Advertising or organic traffic
→ Landing page
→ Project request form or AI chat
→ Lead
→ Admin qualification
→ Site visit or meeting
→ Quote
→ Customer approval
→ Project creation
→ Team assignment
→ Project updates
→ Customer portal
→ Handover and completion

---

## User Roles

### super_admin

- Full system access
- User and role management
- Project assignment
- Customer management
- Audit log access
- Financial visibility

### project_manager

- Manage assigned projects
- Manage project phases
- Publish customer-visible updates
- Approve project media
- Manage project documents
- Request customer decisions

### field_engineer

- Access assigned projects
- Upload site photos
- Add internal progress notes
- Update operational progress
- Cannot publish directly to customers
- Cannot access customer financial data

### customer

- Access assigned projects
- View published updates
- View approved media
- View customer-visible documents
- Respond to approval requests
- Cannot access internal notes

---

## Main Entities

### profiles

Application identity and role record linked to Supabase Auth.

### customers

Commercial customer record. A customer may have one or more projects.

### leads

Potential customer requests collected from forms, advertising, WhatsApp or AI chat.

### quotes

Commercial proposals linked to leads and customers.

### projects

Confirmed construction, renovation, architecture or interior projects.

### project_members

Users assigned to projects.

### project_phases

Planned and actual project stages.

### project_updates

Internal and customer-visible project progress records.

### project_media

Project photos, videos and document metadata.

### documents

Contracts, plans, payment documents and customer-visible files.

### approval_requests

Customer decisions for materials, revisions, additional work and budget changes.

### notifications

Portal and external notification records.

### audit_logs

Security and operational action history.

---

## Lead Lifecycle

new
→ contacted
→ qualified
→ site_visit_planned
→ quote_preparing
→ quote_sent
→ negotiation
→ won
→ converted_to_project

Alternative terminal states:

- lost
- unsuitable
- archived

A won lead may create:

- customer
- quote
- project

Conversion must be performed by an authorized server-side service.

---

## Project Lifecycle

lead
→ planning
→ design
→ permitting
→ active
→ paused
→ completed

Alternative terminal state:

- cancelled

---

## Data Access Rules

- Every public table must use Row Level Security.
- Browser clients use the Supabase publishable key.
- Normal server requests use the authenticated server client.
- The secret-key admin client is restricted to trusted server-only operations.
- React components must not query Supabase directly.
- Components call services.
- Services call repositories.
- Repositories access Supabase.
- Customers only see explicitly published or approved data.
- Field engineers cannot publish customer-visible content directly.

---

## Application Layers

UI Component
→ Server Action or Route Handler
→ Validation
→ Service
→ Repository
→ Supabase

Business logic must not be placed inside React components or route handlers.

---

## Storage Scope

Private buckets:

- project-media
- project-documents
- avatars

No public project buckets.

File access uses short-lived signed URLs.

Audio and voice-note buckets are not used.

---

## Initial Module Order

1. Authentication and profiles
2. Customers
3. Leads
4. Projects
5. Project members
6. Project phases
7. Project updates
8. Project media
9. Documents
10. Customer approvals
11. Notifications
12. Audit logs
13. Quotes
14. AI lead assistant

---

## Initial Release Exclusions

- Voice assistant
- Voice notes
- Audio transcription
- BIM viewer
- Full accounting system
- Payroll
- Inventory management
- Automated construction pricing guarantee
- Automated legal or engineering decisions
- Native mobile application
