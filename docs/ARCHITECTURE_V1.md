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

## Database Access and RLS

All current public domain tables have Row Level Security enabled:

- profiles
- categories
- project_types
- services
- project_type_services
- leads
- lead_services

Direct table grants for anon and authenticated are revoked for these tables. No
anon or authenticated policies are defined in this sprint, so direct browser Data
API access is intentionally closed by default.

The public lead form uses only POST /api/leads. The route validates the payload
and writes leads through a server-only Supabase admin RPC. The browser does not
insert into leads or lead_services directly.

The admin UI uses only guarded /api/admin/* routes for lead access. Every admin
lead route must complete requireAdminSession before any service-role query runs.
The service-role key bypasses RLS, so route guards are a required security
boundary and must stay server-only.

profiles.role and profiles.is_active cannot be changed by normal clients. They
are managed only by trusted server or operational database actions.

Catalog data used by the current public frontend comes from static application
sources, not direct browser Supabase reads. If profile self-service access or
public catalog reads are needed later, add them through a separate migration with
explicit column grants and narrow policies.

Lead reliability functions are called only through trusted server routes with the
server-only admin client. Direct execute grants for public, anon and
authenticated are revoked from create_lead_submission and check_lead_rate_limit.
The lead_rate_limit_events table has RLS enabled and direct client grants
revoked.

SQL Editor and Table Editor can run with owner-level privileges and are not
sufficient RLS tests. RLS must be tested with anon and authenticated API
contexts, plus server-side service-role checks.

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

- submissionId → leads.submission_id idempotency key
- fullName → leads.full_name
- normalized phone → leads.phone
- location → leads.city and leads.district when possible
- projectTypeSlug → server-resolved project_types.id → leads.project_type_id
- projectType label → leads.project_details.selectedProjectType for context
- description → leads.description
- selected service slugs → resolved server-side to services.id

leadService runs only on the server with the Supabase admin client. It calls
public.create_lead_submission, which creates the leads row and lead_services rows
inside one PostgreSQL transaction.

Supabase stores business-critical lead fields in normal leads columns and dynamic
form context in leads.project_details. Service relationships are stored in
lead_services.

Lead reliability rules:

- submission_id is a client-generated UUID used only for idempotency. It is not a
  security boundary and is not treated as a database permission.
- A new submission returns HTTP 201 with created=true.
- A retry with the same submission_id returns HTTP 200 with created=false and the
  existing lead ID. No second lead or duplicate lead_services rows are created.
- Reusing the same submission_id with different normalized business payload is
  counted as an attempt and returns HTTP 409 with code IDEMPOTENCY_CONFLICT when
  the rate limit has not already been exceeded.
- project_type_id is resolved server-side from projectTypeSlug. Unknown project
  type slugs return INVALID_PROJECT_TYPE and no lead is created.
- Service slugs are resolved server-side. Unknown service slugs return
  INVALID_SERVICE_SELECTION and no lead is created.
- startedAt is only low-cost bot friction. It is not real rate limiting and is
  client controlled.

POST /api/leads also applies PostgreSQL-backed server-side rate limiting before
expensive lead creation work. The current policy allows up to 5 distinct
submission attempts per 10-minute window for the same hashed client key. Honeypot
and validation failures that pass request schema validation are counted. Exact
idempotent retries with the same existing submission_id and fingerprint are
returned before rate limiting, so network retries are not accidentally blocked.
All non-idempotent attempts insert a fresh rate-limit event.

Rate-limit keys are HMAC-SHA256 hashes of the resolved request IP using the
server-only LEAD_RATE_LIMIT_SECRET. Raw IP addresses are not stored. In production
the endpoint prefers the Vercel-provided x-vercel-forwarded-for header. On Vercel
it may fall back to x-forwarded-for as a platform-managed proxy header. In local
development only, x-forwarded-for or x-real-ip may be used as a fallback. The
endpoint does not expose the secret to the client bundle.

When the rate limit is exceeded, POST /api/leads returns HTTP 429 with code
RATE_LIMITED and a Retry-After header. Database and PostgreSQL exception details
are not returned to the browser.

## Admin Lead Flow

BLAGG Control uses Supabase email/password authentication for admin access. The
browser signs in with the publishable Supabase client, then verifies admin access
through /api/auth/me before navigating to /admin.

Supabase SSR cookies are read server-side through createSupabaseServerClient and
kept fresh by middleware on /admin, /api/admin, /api/auth/me and /control only.
Public marketing pages do not perform a Supabase auth refresh on every request.
Demo localStorage auth is not a security boundary and does not grant Admin API
access.

requireAdminSession validates the request with auth.getUser, then reads the
matching profiles row. The profile must be active and have one of these roles:

- super_admin
- project_manager

The BLAGG Control applications module reads real lead records from Supabase
through guarded admin API routes. The client component does not import the
Supabase admin client or any service-role secret.

GET /api/admin/leads parses page, pageSize, status, source, search and date range
query parameters before calling adminLeadService.listLeads. requireAdminSession
must complete before any service-role query runs. The service applies server-side
filters, default created_at descending order, pagination and selected service
loading through lead_services and services.

GET /api/admin/leads/[id] validates the UUID and returns a safe lead detail shape
with contact fields, description, budget fields, project_details and selected
services.

PATCH /api/admin/leads/[id] accepts only the status field. The status value must
match the lead_status enum from the migration. adminLeadService.updateLeadStatus
sets updated_at explicitly while updating the status. PATCH also requires a
same-origin Origin header before the update is accepted. The Origin header is
compared with the canonical application origin from NEXT_PUBLIC_APP_URL, not
with untrusted forwarded host headers.

Admin API auth response contract:

- 401 AUTH_REQUIRED when no valid Supabase user session exists.
- 403 FORBIDDEN when the user is authenticated but not allowed for lead admin.
- 500 AUTH_CHECK_FAILED when the auth/profile check cannot be completed.

Operational requirement: admin users must already exist in Supabase Auth and must
have profiles.role set to super_admin or project_manager with is_active=true.

Finance auth hardening debt: /admin/finance still uses the legacy demo
localStorage role guard. It is not yet protected at the same level as the real
Supabase admin model. Sensitive real finance data must not be connected there
until the page is protected server-side with requireAdminSession in a later
auth-hardening sprint.

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
