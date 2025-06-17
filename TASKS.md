# Key Management App Implementation Tasks

Implementation roadmap for the Swedish housing cooperative key management application.

## 🔄 Task Breakdown System

### **Status Indicators:**

- ✅ **Complete** - Finished and tested
- ✅ **Broken down** - Task has detailed sub-tasks ready to work on
- ⏳ **Ready for breakdown** - High-level task ready to be detailed when needed
- 🔄 **In progress** - Currently being worked on

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

### ✅ **Initialize Next.js 15 project with TypeScript**

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

### ✅ **Set up Supabase project with EU region**

- [x] Create new Supabase project in EU region (Frankfurt/Ireland)
- [x] Configure database settings and enable RLS
- [x] Generate and save API keys securely
- [x] Create personal access token (PAT) for MCP server
- [x] Set up `.env.local` with Supabase credentials (URL and anon key)
- [x] Create `lib/supabase.ts` client configuration
- [x] Test database connection with API route (`/api/supabase-test`)
- [x] Enable Google OAuth in Supabase Auth settings
- [x] Configure authentication redirects for local development

> **Note:** All Supabase setup is complete and working.

### ✅ **Configure Supabase MCP Server for AI assistance**

- [x] Create `.cursor/mcp.json` file in project root
- [x] Add Supabase MCP server configuration with PAT
- [x] Test MCP connection by asking AI to fetch project config
- [x] Verify AI can list tables and run queries
- [x] Test schema generation and TypeScript type creation
- [x] Document MCP capabilities for team reference

> **Note:** MCP server connection is verified and the organization rule is enforced in `.cursor/rules/project-context.mdc`.

### ✅ **Configure Prisma with Supabase PostgreSQL**

- [x] Install Prisma CLI and client packages
- [x] Initialize Prisma: `npx prisma init`
- [x] Configure `schema.prisma` with Supabase connection
- [x] Import complete database schema from cursor rules
- [x] Generate Prisma client: `npx prisma generate`
- [x] Create `lib/prisma.ts` client singleton
- [x] Run initial migration: `npx prisma db push`
- [x] Test: Verify database schema is created correctly
- [x] Test: Basic CRUD operations work

### ✅ **Implement authentication with cooperative registration**

- [x] Create `app/auth/login/page.tsx` (login page)
- [x] Create `app/auth/register/page.tsx` (registration page)
  - [x] Implement registration form with server action and hashed password
  - [x] Show user feedback for errors and success
  - [x] Replace form with confirmation message after registration
  - [x] Hide Google sign up and divider after registration
  - [x] Show user-friendly error if email already exists
  - [x] Google Auth registration (now working with correct Supabase Auth helper)
- [x] Create `app/auth/confirmed/page.tsx` (email confirmation page)
  - [x] Show confirmation message and login button after email confirmation
  - [x] Update Supabase email template to redirect to /auth/confirmed
- [x] Create `app/auth/callback/route.ts` (OAuth callback handler)
- [x] Build cooperative name collection form in registration
- [x] Create server action for user profile creation
- [x] Implement session management with middleware
- [x] Create `middleware.ts` for route protection
- [x] Add login/logout functionality
- [x] Test: Email registration with cooperative name
- [x] Test: Google OAuth login flow
- [x] Test: Protected route access
- [x] Login form and server actions now use the correct Supabase Auth helpers for Next.js, ensuring server-side session access and secure authentication.

### ✅ **Complete profile setup for new users**

- [x] Create `app/auth/complete-profile/page.tsx` with cooperative name collection
- [x] Implement `updateProfile.ts` server action for profile completion
- [x] Add redirect logic to dashboard after profile completion
- [x] Handle cases where Google OAuth users need to complete profiles
- [x] Test: Profile completion flow works correctly
- [x] Test: Users are redirected appropriately after completion

### ✅ **Implement 15-minute inactivity logout (client-side idle detection)**

- [x] Create `useIdleLogout` hook with 15-minute timeout
- [x] Create `IdleLogoutProvider` component to wrap the app
- [x] Integrate hook in main layout via provider
- [x] Listen for user activity events (mouse, keyboard, touch)
- [x] Automatic logout and redirect to login page
- [x] Test: User is logged out after 15 minutes of inactivity
- [x] Test: Activity resets the timer

### ✅ **Create basic layout and navigation structure**

- [x] Use shadcn/ui dashboard-01 block as the base layout ([reference](https://ui.shadcn.com/blocks))
- [x] Create dashboard route group `(dashboard)` with separate layout
- [x] Implement sidebar navigation using AppSidebar (Dashboard, Keys, Borrowers, etc.)
- [x] Implement top header with app name/logo and user menu
- [x] Add skip-to-content link for accessibility
- [x] Ensure layout is responsive and accessible (sidebar collapses on mobile, keyboard navigation, ARIA roles)
- [x] Create all necessary navigation components: nav-main, nav-user, nav-documents, nav-secondary
- [x] Fetch user profile data server-side in dashboard layout
- [x] Document dashboard layout structure and shadcn/ui usage in coding standards

> **Note:** The dashboard structure (sidebar, header, cards, chart, table, navigation components) is now fully implemented as per the files in `components/dashboard/`.

### ✅ **Dashboard main content: chart and table**

- [x] Add stacked bar chart at the top of the dashboard main area (use shadcn/ui Bar Chart - Stacked + Legend)
- [x] Add pie chart showing total key status distribution
- [x] Configure charts to show key type data with status breakdown (Available, In Use, Lost)
- [x] Add data table below the charts (list all borrowed keys with borrower details)
- [x] Create server action `getKeyStatusSummary()` to fetch chart data
- [x] Create server action `getBorrowedKeysTableData()` to fetch table data
- [x] Update dashboard page to fetch and pass data server-side
- [x] Implement table columns with proper TypeScript types
- [x] Test: Charts display correct data from database
- [x] Test: Table displays borrowed keys with borrower information
- [x] Ensure charts and table are accessible and responsive

> **Note:** Both charts (bar and pie) and the data table are fully implemented and working with real database data.

### 🔄 **Create Row Level Security policies** (In Progress)

- [ ] Design RLS policies for Profile table (user can only see own data)
- [ ] Design RLS policies for KeyType table (filter by cooperativeId)
- [ ] Design RLS policies for KeyCopy table (through KeyType relationship)
- [ ] Design RLS policies for Borrower table (filter by cooperativeId)
- [ ] Design RLS policies for LendingRecord table (filter by cooperativeId)
- [ ] Implement policies in Supabase dashboard
- [ ] Test: User can only access their cooperative's data
- [ ] Test: Cross-cooperative data isolation works
- [ ] Document RLS policies in cursor rules

## Phase 2: Core Data Management (Week 3-4)

### Future Tasks

- [ ] **Key type CRUD operations with server actions** ⏳ _[Ready for breakdown]_
- [ ] **Bulk key copy creation workflow** ⏳ _[Ready for breakdown]_
- [ ] **Borrower management system** ⏳ _[Ready for breakdown]_
- [ ] **Key lending workflow implementation** ⏳ _[Ready for breakdown]_
- [ ] **Key return workflow implementation** ⏳ _[Ready for breakdown]_
- [ ] **Key status tracking (Available/Out/Lost)** ⏳ _[Ready for breakdown]_
- [ ] **Form validation with proper error handling** ⏳ _[Ready for breakdown]_
- [ ] **Mobile-optimized forms and inputs** ⏳ _[Ready for breakdown]_
- [ ] **Data import functionality (CSV)** ⏳ _[Ready for breakdown]_

## Phase 3: Dashboard & Visualization (Week 5-6)

### Future Tasks

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

- **Frontend**: Next.js 15 with App Router, TypeScript, Tailwind CSS ✅
- **Backend**: Supabase PostgreSQL with Prisma ORM ✅
- **Authentication**: Supabase Auth with Google OAuth ✅
- **UI Components**: shadcn/ui with accessibility enhancements ✅
- **Charts**: Recharts for dashboard visualizations ✅

### Data Flow

1. **User Registration**: Collect cooperative name during signup ✅
2. **Key Management**: CRUD operations with proper validation ⏳
3. **Lending Process**: Track borrower and key relationships ⏳
4. **Dashboard Updates**: Real-time status via Supabase subscriptions ✅
5. **Data Isolation**: RLS policies ensure cooperative data separation 🔄

### Accessibility Focus

- **Font Sizes**: 16px minimum, scalable for seniors ✅
- **Touch Targets**: 44px minimum for mobile interaction ✅
- **Color Contrast**: WCAG AA compliance ✅
- **Navigation**: Simple, predictable patterns ✅
- **Error Handling**: Clear, actionable messages ✅

## Relevant Files

### Core Application Structure

- `app/layout.tsx` - Root layout with idle logout provider ✅
- `app/(root)/page.tsx` - Landing page ✅
- `app/(dashboard)/layout.tsx` - Dashboard layout with sidebar ✅
- `app/(dashboard)/dashboard/page.tsx` - Main dashboard with charts and table ✅
- `app/auth/` - Authentication pages (login, register, complete-profile) ✅
- `app/keys/` - Key management pages ⏳
- `app/borrowers/` - Borrower management pages ⏳

### Database & API

- `prisma/schema.prisma` - Database schema ✅
- `lib/prisma.ts` - Prisma client setup ✅
- `utils/supabase/` - Supabase client configurations ✅
- `app/actions/dashboard.ts` - Dashboard server actions ✅
- `app/actions/registerUser.ts` - User registration action ✅
- `app/actions/updateProfile.ts` - Profile update action ✅

### Components

- `components/ui/` - shadcn/ui base components ✅
- `components/dashboard/` - Dashboard-specific components (sidebar, charts, table) ✅
- `components/root/` - Root-level components (IdleLogoutProvider, NavbarRoot) ✅
- `hooks/useIdleLogout.ts` - Idle logout hook ✅

### Configuration

- `middleware.ts` - Route protection middleware ✅
- `tailwind.config.js` - Tailwind configuration ✅
- `.cursor/rules/` - Development standards and cursor rules ✅
