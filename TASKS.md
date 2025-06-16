# Key Management App Implementation Tasks

Implementation roadmap for the Swedish housing cooperative key management application.

## 🔄 Task Breakdown System

### **Status Indicators:**

- ✅ **Broken down** - Task has detailed sub-tasks ready to work on
- ⏳ **Ready for breakdown** - High-level task ready to be detailed when needed
- 🔄 **In progress** - Currently being worked on
- ✅ **Complete** - Finished and tested

### **Workflow:**

1. **Work on broken-down tasks** with detailed sub-tasks
2. **When ready for next task:** Use `@TASKS.md break down [task name]`
3. **I'll automatically** replace the high-level task with detailed sub-tasks
4. **Continue development** with clear, actionable steps

### **Example Request:**

```
@TASKS.md break down "Create basic layout and navigation structure"
```

## Phase 1: Foundation & Authentication (Week 1-2)

### Completed Tasks

- [x] Create comprehensive PRD with user requirements
- [x] Define database schema with Prisma
- [x] Establish coding standards and cursor rules
- [x] Clarify authentication flow and data ownership

### In Progress Tasks

- [x] **Initialize Next.js 15 project with TypeScript**

  - [x] Run `npx create-next-app@latest src --typescript --tailwind --eslint --app`
  - [x] Migrate app from `src/` to root for single-app structure
  - [x] Move `app/`, `components/`, `lib/`, `hooks/`, and `public/` to root
  - [x] Move and merge `package.json`, `package-lock.json`, and all config files to root
  - [x] Clean up redundant files and remove `src/`
  - [x] Configure `tsconfig.json` with strict mode and path aliases
  - [x] Set up `next.config.js` with required configurations
  - [x] Create folder structure: `app/`, `components/`, `lib/`, `hooks/` (now at root)
  - [x] Install additional dependencies: Prisma, Supabase client, shadcn/ui
  - [x] Configure ESLint + Prettier with project rules
  - [x] Create basic `app/layout.tsx` with metadata and fonts
  - [x] Create placeholder `app/page.tsx` (landing page)
  - [x] Test: Verify dev server runs without errors (`npm run dev`)
  - [x] Test: Verify TypeScript compilation works (`npm run build`)
  - [x] Add root navigation bar (`components/NavbarRoot.tsx`) to layout as NavbarRoot (for landing/auth pages only; dashboard will use a separate navigation component)

> **Note:** The project is now a standard single-app Next.js 15 repo with all configs and folders at the root. All future development should follow this structure.

- [x] **Set up Supabase project with EU region**

  - [x] Create new Supabase project in EU region (Frankfurt/Ireland)
  - [x] Configure database settings and enable RLS
  - [x] Generate and save API keys securely
  - [x] Create personal access token (PAT) for MCP server
  - [x] Set up `.env.local` with Supabase credentials (URL and anon key)
  - [x] Create `lib/supabase.ts` client configuration
  - [x] Test database connection with API route (`/api/supabase-test`)
  - [ ] Enable Google OAuth in Supabase Auth settings
  - [ ] Configure authentication redirects for local development

> **Note:** The test endpoint currently requires a user table (e.g., `profiles`) to return data. Update the test once tables are created.

- [x] **Configure Supabase MCP Server for AI assistance**

  - [x] Create `.cursor/mcp.json` file in project root
  - [x] Add Supabase MCP server configuration with PAT
  - [x] Test MCP connection by asking AI to fetch project config
  - [x] Verify AI can list tables and run queries
  - [x] Test schema generation and TypeScript type creation
  - [x] Document MCP capabilities for team reference

> **Note:** MCP server connection is verified and the organization rule is enforced in `.cursor/rules/project-context.mdc`.

- [x] **Configure Prisma with Supabase PostgreSQL**

  - [x] Install Prisma CLI and client packages
  - [x] Initialize Prisma: `npx prisma init`
  - [x] Configure `schema.prisma` with Supabase connection
  - [x] Import complete database schema from cursor rules
  - [x] Generate Prisma client: `npx prisma generate`
  - [x] Create `lib/prisma.ts` client singleton
  - [x] Run initial migration: `npx prisma db push`
  - [x] Test: Verify database schema is created correctly
  - [x] Test: Basic CRUD operations work

- [x] **Implement authentication with cooperative registration**

  - [x] Create `app/auth/login/page.tsx` (login page)
  - [x] Create `app/auth/register/page.tsx` (registration page)
    - [x] Implement registration form with server action and hashed password
    - [x] Show user feedback for errors and success
    - [x] Replace form with confirmation message after registration
    - [x] Hide Google sign up and divider after registration
    - [x] Show user-friendly error if email already exists
    - [ ] Google Auth registration (pending)
  - [x] Create `app/auth/confirmed/page.tsx` (email confirmation page)
    - [x] Show confirmation message and login button after email confirmation
    - [x] Update Supabase email template to redirect to /auth/confirmed
  - [x] Create `app/auth/callback/route.ts` (OAuth callback handler)
  - [ ] Build cooperative name collection form in registration
  - [x] Create server action for user profile creation
  - [x] Implement session management with middleware
  - [x] Create `middleware.ts` for route protection
  - [x] Add login/logout functionality
  - [ ] Test: Email registration with cooperative name
  - [x] Test: Google OAuth login flow
  - [x] Test: Protected route access

- [ ] **Create Row Level Security policies**

  - [ ] Design RLS policies for Profile table (user can only see own data)
  - [ ] Design RLS policies for KeyType table (filter by cooperativeId)
  - [ ] Design RLS policies for KeyCopy table (through KeyType relationship)
  - [ ] Design RLS policies for Borrower table (filter by cooperativeId)
  - [ ] Design RLS policies for LendingRecord table (filter by cooperativeId)
  - [ ] Implement policies in Supabase dashboard
  - [ ] Test: User can only access their cooperative's data
  - [ ] Test: Cross-cooperative data isolation works
  - [ ] Document RLS policies in cursor rules

- [ ] Implement 15-minute inactivity logout (client-side idle detection)
  - [ ] Create `useIdleLogout` hook
  - [ ] Integrate hook in main layout
  - [ ] Test: User is logged out after 15 minutes of inactivity
  - [ ] Test: Activity resets the timer

### Future Tasks

- [x] **Create basic layout and navigation structure**

  - [x] Use shadcn/ui dashboard-01 block as the base layout ([reference](https://ui.shadcn.com/blocks))
  - [x] Keep one card at the top of the dashboard for future use (e.g., buttons or summary info)
  - [x] Remove extra cards from the main content area
  - [x] Add stacked bar chart below the card (one bar per key type, stacked by status: Available, In Use, Lost)
  - [x] Set up sidebar navigation using AppSidebar (Dashboard, Keys, Borrowers, etc.)
  - [x] Implement top header with app name/logo and user menu
  - [x] Add skip-to-content link for accessibility
  - [x] Ensure layout is responsive and accessible (sidebar collapses on mobile, keyboard navigation, ARIA roles)
  - [x] The main data table on the dashboard should list all key copies (columns: Key Type, Copy Number, Status, Borrower, etc.)
  - [x] Document dashboard layout structure and shadcn/ui usage in coding standards

> **Note:** The dashboard structure (sidebar, header, cards, chart, table, navigation components) is now implemented as per the attached files in `components/dashboard/`. Future work should focus on refinement, integration, and enhancements.

- [ ] **Dashboard main content: chart and table**

  - [x] Add stacked bar chart at the top of the dashboard main area (use shadcn/ui Bar Chart - Stacked + Legend, [reference](https://ui.shadcn.com/charts/bar#charts))
  - [x] Configure chart to show one bar per key type, stacked by status (Lost, Available, In Use)
  - [ ] Connect chart data to key/copy data model
  - [x] Add data table below the chart (list all key copies with columns for type, status, borrower, etc.)
  - [ ] Ensure chart and table are accessible and responsive

- [ ] **Tailwind and CSS foundation**

  - [ ] Review and update tailwind.config.js for accessibility (font size, color contrast, touch targets)
  - [ ] Set up global styles in app/globals.css for theming and accessibility (base font size, color variables, focus states)
  - [ ] Import and configure any required fonts
  - [ ] Test base styles and components for accessibility (contrast, focus, keyboard navigation)
  - [ ] Document Tailwind and CSS conventions in coding standards

- [ ] **Implement user profile management** ⏳ _[Ready for breakdown]_
- [ ] **Set up shadcn/ui component library** ⏳ _[Ready for breakdown]_
- [ ] **Configure Tailwind with accessibility-focused settings** ⏳ _[Ready for breakdown]_

## Phase 2: Core Data Management (Week 3-4)

### In Progress Tasks

- [ ] **Key type CRUD operations with server actions**

  - [ ] Create `app/actions/keyTypes.ts` server actions file
  - [ ] Implement `createKeyType` action with bulk copy creation
  - [ ] Implement `updateKeyType` action
  - [ ] Implement `deleteKeyType` action (with cascade handling)
  - [ ] Create `app/keys/types/page.tsx` (key types management page)
  - [ ] Build key type creation form with validation
  - [ ] Build key type editing interface
  - [ ] Add copy quantity management (add/remove copies)
  - [ ] Test: Create key type with 30+ copies
  - [ ] Test: Update key type details
  - [ ] Test: Delete key type (ensure proper cascade)

- [ ] **Bulk key copy creation workflow**

  - [ ] Create `app/actions/keyCopies.ts` server actions
  - [ ] Implement batch copy creation with transaction
  - [ ] Create copy numbering logic (sequential 1, 2, 3...)
  - [ ] Build bulk creation UI component
  - [ ] Add copy removal functionality (mark as lost/destroyed)
  - [ ] Create copy status management
  - [ ] Test: Create 50+ copies efficiently
  - [ ] Test: Sequential numbering works correctly
  - [ ] Test: Individual copy status updates

- [ ] **Borrower management system**

  - [ ] Create `app/actions/borrowers.ts` server actions
  - [ ] Implement borrower CRUD operations
  - [ ] Create `app/borrowers/page.tsx` (borrower list page)
  - [ ] Create `app/borrowers/new/page.tsx` (add borrower page)
  - [ ] Build borrower search/autocomplete functionality
  - [ ] Add contact information validation
  - [ ] Implement borrower profile view
  - [ ] Add CSV import functionality for existing borrowers
  - [ ] Test: Add new borrower with all fields
  - [ ] Test: Search and autocomplete works
  - [ ] Test: CSV import processes correctly

- [ ] **Key lending workflow implementation**

  - [ ] Create `app/actions/lending.ts` server actions
  - [ ] Implement `lendKey` action with validation
  - [ ] Create `app/keys/lend/page.tsx` (key lending page)
  - [ ] Build key selection interface (by type, then copy)
  - [ ] Build borrower selection with quick-add
  - [ ] Create lending form with all required fields
  - [ ] Add ID verification checkbox requirement
  - [ ] Implement optional end date with validation
  - [ ] Add notes field for special circumstances
  - [ ] Test: Complete lending workflow
  - [ ] Test: Validation prevents double-lending
  - [ ] Test: All borrower data captured correctly

- [ ] **Key return workflow implementation**
  - [ ] Create `returnKey` server action
  - [ ] Create `app/keys/return/page.tsx` (key return page)
  - [ ] Build active loans list with search/filter
  - [ ] Create one-click return functionality
  - [ ] Implement bulk return for multiple keys
  - [ ] Add return confirmation dialogs
  - [ ] Update key status automatically on return
  - [ ] Preserve borrower records after return
  - [ ] Test: Single key return process
  - [ ] Test: Bulk return functionality
  - [ ] Test: Borrower data persists after return

### Future Tasks

- [ ] **Key status tracking (Available/Out/Lost)** ⏳ _[Ready for breakdown]_
- [ ] **Form validation with proper error handling** ⏳ _[Ready for breakdown]_
- [ ] **Mobile-optimized forms and inputs** ⏳ _[Ready for breakdown]_
- [ ] **Data import functionality (CSV)** ⏳ _[Ready for breakdown]_

## Phase 3: Dashboard & Visualization (Week 5-6)

### Future Tasks

- [ ] **Dashboard layout with stacked bar charts (Recharts)** ⏳ _[Ready for breakdown]_
- [ ] **Key inventory overview components** ⏳ _[Ready for breakdown]_
- [ ] **Active loans table with sorting/filtering** ⏳ _[Ready for breakdown]_
- [ ] **Overdue key notification system** ⏳ _[Ready for breakdown]_
- [ ] **Mobile-responsive dashboard optimization** ⏳ _[Ready for breakdown]_

## Phase 4: Advanced Features (Week 7+)

### Future Tasks

- [ ] **Borrower search and autocomplete** ⏳ _[Ready for breakdown]_
- [ ] **Multiple key lending workflow** ⏳ _[Ready for breakdown]_
- [ ] **Bulk return operations** ⏳ _[Ready for breakdown]_
- [ ] **Advanced reporting and analytics** ⏳ _[Ready for breakdown]_
- [ ] **Setup wizard for new users** ⏳ _[Ready for breakdown]_

## Implementation Plan

### Technical Architecture

- **Frontend**: Next.js 15 with App Router, TypeScript, Tailwind CSS
- **Backend**: Supabase PostgreSQL with Prisma ORM
- **Authentication**: Supabase Auth with Google OAuth
- **UI Components**: shadcn/ui with accessibility enhancements
- **Charts**: Recharts for dashboard visualizations

### Data Flow

1. **User Registration**: Collect cooperative name during signup
2. **Key Management**: CRUD operations with proper validation
3. **Lending Process**: Track borrower and key relationships
4. **Dashboard Updates**: Real-time status via Supabase subscriptions
5. **Data Isolation**: RLS policies ensure cooperative data separation

### Accessibility Focus

- **Font Sizes**: 16px minimum, scalable for seniors
- **Touch Targets**: 44px minimum for mobile interaction
- **Color Contrast**: WCAG AA compliance
- **Navigation**: Simple, predictable patterns
- **Error Handling**: Clear, actionable messages

## Relevant Files

### Core Application Structure

- `app/layout.tsx` - Root layout with navigation ✅
- `app/page.tsx` - Landing/dashboard page ✅
- `app/auth/` - Authentication pages ✅
- `app/dashboard/` - Main dashboard components ✅
- `app/keys/` - Key management pages ✅
- `app/borrowers/` - Borrower management pages ✅

### Database & API

- `prisma/schema.prisma` - Database schema ✅
- `lib/prisma.ts` - Prisma client setup ✅
- `lib/supabase.ts` - Supabase client configuration ✅
- `app/actions/` - Server actions for data operations ✅

### Components

- `components/ui/` - shadcn/ui base components ✅
- `components/dashboard/` - Dashboard-specific components
- `components/forms/` - Form components with validation
- `components/charts/` - Chart components with Recharts
- `components/NavbarRoot.tsx` - Root navigation bar for landing/auth pages ✅

### Configuration

- `tailwind.config.js`
