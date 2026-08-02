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

## Lead Submission Flow

IntakeFlow collects the public offer request without exposing Supabase credentials to
the browser.

POST /api/leads receives the JSON payload, checks the content type, validates and
normalizes the submitted fields, and rejects unknown or invalid service selections.

Validation maps the current form fields to the database shape:

- fullName → leads.full_name
- normalized phone → leads.phone
- location → leads.city and leads.district when possible
- projectType label → leads.project_details.selectedProjectType
- description → leads.description
- selected service slugs → resolved server-side to services.id

leadService runs only on the server with the Supabase admin client. It creates the
leads row, writes selected services into lead_services, and deletes the lead record
if service relationship creation fails.

Supabase stores business-critical lead fields in normal leads columns and dynamic
form context in leads.project_details. Service relationships are stored in
lead_services.

Current temporary decisions and technical debt:

- project_type_id remains null in this sprint because the public form is not yet
  connected to the project_types catalog.
- The current form selection is stored as
  leads.project_details.selectedProjectType.
- A future backend migration sprint should resolve project_types.slug
  server-side and store the matching project_type_id.
- Lead creation and lead_services creation currently use compensating rollback
  instead of a real database transaction. If lead_services creation fails, the
  service attempts to delete the lead row and reports rollback failure with
  minimum operational context only. A future sprint should move this write path
  to a transactional Postgres RPC.
- startedAt is only low-cost bot friction. It is not real rate limiting and is
  client controlled.
- If the database write succeeds but the response is lost before reaching the
  browser, duplicate leads may be created by a retry.
- Durable duplicate protection requires a client-generated submission_id, a DB
  unique constraint and server-side rate limiting in a later backend migration
  sprint.

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
