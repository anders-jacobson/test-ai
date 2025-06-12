# Modern Cursor Rules Setup (.mdc format)

Create these files in `.cursor/rules/` directory:

## 1. `.cursor/rules/project-context.mdc`
```mdc
---
type: always
description: Core context for Swedish housing cooperative key management app
---

# Key Management App Context

This is a Swedish housing cooperative key management app for nyckelansvariga (key managers) in bostadsrättsföreningar.

## Key Requirements
- Mobile-first web app using React + TypeScript + Supabase
- Track physical keys, borrowers, and lending records
- Swedish context: pensioner-friendly UI, GDPR compliance
- Authentication: Email + Google OAuth
- UI: Tailwind CSS + shadcn/ui components

## Core Features
1. Key lending/return workflow
2. Dashboard with stacked bar charts (recharts)
3. Key inventory management
4. Borrower tracking (separate table)
5. Mobile-responsive design

## Swedish Terms
- nyckelansvarig = key manager
- bostadsrättsförening = housing cooperative
- copies = key copies (physical duplicates)

## Technical Constraints
- No localStorage/sessionStorage (not supported in artifacts)
- EU data storage (GDPR compliance)
- Mobile-first responsive design
- Online-only (no offline capability)

Reference: @PRD.md for complete requirements
```

## 2. `.cursor/rules/tech-stack.mdc`
```mdc
---
type: always
description: Technology stack and dependencies for the key management app
---

# Technology Stack

## Frontend Stack
- **React 18** with TypeScript (strict mode)
- **Vite** for build tooling
- **Tailwind CSS** (core utilities only - no custom compiler)
- **shadcn/ui** for components
- **Recharts** for stacked bar charts
- **Lucide React** for icons

## Backend & Database
- **Supabase** (PostgreSQL + Auth + Real-time)
- **Row Level Security (RLS)** for data isolation
- **EU servers** for GDPR compliance

## Key Dependencies
```json
{
  "dependencies": {
    "react": "^18.0.0",
    "@supabase/supabase-js": "^2.0.0",
    "recharts": "^2.0.0",
    "lucide-react": "^0.263.1",
    "tailwindcss": "^3.0.0"
  }
}
```

## Architecture Patterns
- Functional components with hooks
- Custom hooks for Supabase operations
- Context for authentication state
- Mobile-first responsive design
- TypeScript for all files

## File Structure
```
src/
├── components/     # Reusable UI components
├── pages/         # Route components
├── hooks/         # Custom hooks for data
├── utils/         # Helper functions
├── types/         # TypeScript definitions
└── api/           # Supabase client setup
```
```

## 3. `.cursor/rules/database-schema.mdc`
```mdc
---
type: auto_attached
patterns: ["**/*supabase*", "**/*database*", "**/*schema*", "**/*migration*"]
description: Database schema and Supabase operations for key management
---

# Database Schema

## Core Tables

### key_types
```sql
CREATE TABLE key_types (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  access_area TEXT,
  total_copies INTEGER DEFAULT 0,
  cooperative_id UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### key_copies
```sql
CREATE TABLE key_copies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key_type_id UUID REFERENCES key_types(id) ON DELETE CASCADE,
  copy_number INTEGER NOT NULL,
  status VARCHAR(20) DEFAULT 'available', -- available, out, lost
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(key_type_id, copy_number)
);
```

### borrowers
```sql
CREATE TABLE borrowers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  company VARCHAR(100),
  cooperative_id UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### lending_records
```sql
CREATE TABLE lending_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key_copy_id UUID REFERENCES key_copies(id) ON DELETE CASCADE,
  borrower_id UUID REFERENCES borrowers(id) ON DELETE CASCADE,
  lent_date DATE NOT NULL DEFAULT CURRENT_DATE,
  end_date DATE,
  notes TEXT,
  id_checked BOOLEAN DEFAULT FALSE,
  returned_date DATE,
  cooperative_id UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## TypeScript Types
```typescript
export interface KeyType {
  id: string;
  name: string;
  access_area: string;
  total_copies: number;
  cooperative_id: string;
  created_at: string;
}

export interface KeyCopy {
  id: string;
  key_type_id: string;
  copy_number: number;
  status: 'available' | 'out' | 'lost';
  created_at: string;
}

export interface Borrower {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  cooperative_id: string;
  created_at: string;
}

export interface LendingRecord {
  id: string;
  key_copy_id: string;
  borrower_id: string;
  lent_date: string;
  end_date?: string;
  notes?: string;
  id_checked: boolean;
  returned_date?: string;
  cooperative_id: string;
  created_at: string;
}
```

## Custom Hook Patterns
```typescript
export function useKeyTypes() {
  const [data, setData] = useState<KeyType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Always include proper error handling and loading states
}
```
```

## 4. `.cursor/rules/coding-standards.mdc`
```mdc
---
type: auto_attached
patterns: ["**/*.tsx", "**/*.ts"]
description: Coding standards and patterns for React components and TypeScript
---

# Coding Standards

## File Naming Conventions
- Components: PascalCase (`KeyDashboard.tsx`)
- Hooks: camelCase with 'use' prefix (`useKeyTypes.ts`)
- Utils: camelCase (`formatDate.ts`)
- Types: PascalCase (`KeyType.ts`)

## Component Structure
```typescript
interface ComponentProps {
  /** JSDoc comment for each prop */
  keyId: string;
  onUpdate?: (key: KeyType) => void;
}

export default function ComponentName({ keyId, onUpdate }: ComponentProps) {
  // 1. Hooks first
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // 2. Event handlers
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Implementation with proper error handling
  };
  
  // 3. Effects
  useEffect(() => {
    // Side effects
  }, []);
  
  // 4. Render
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div className="mobile-first-tailwind-classes">
      {/* JSX content */}
    </div>
  );
}
```

## Error Handling Pattern
```typescript
try {
  const { data, error } = await supabase
    .from('table_name')
    .select('*');
    
  if (error) throw error;
  
  // Success handling
} catch (error) {
  console.error('Operation failed:', error);
  setError(error instanceof Error ? error.message : 'Unknown error');
}
```

## Tailwind CSS Guidelines
- Mobile-first approach: `class="text-sm md:text-base lg:text-lg"`
- Use core utilities only (no custom compiler)
- Responsive design: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- shadcn/ui components when available

## TypeScript Rules
- Strict mode enabled
- Explicit return types for functions
- Proper interface definitions
- No `any` types
- Use proper generic constraints

## Form Handling
```typescript
const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: ''
});

const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};
```
```

## 5. `.cursor/rules/key-features.mdc`
```mdc
---
type: manual
description: Implement specific key management features based on PRD requirements
---

# Key Management Features

## Dashboard Component Requirements
Create a dashboard showing:
- Stacked bar chart for each key type (available/out/lost) using recharts
- Sortable table of all key copies with current status
- Overview statistics
- Mobile-responsive layout

## Lending Workflow
1. Select key type and copy number
2. Capture borrower info: name, email, phone, company (optional), notes (optional)
3. Set optional end date with reminder
4. Checkbox for ID verification
5. Auto-timestamp the transaction
6. Update key status to "out"

## Return Workflow  
1. Search for borrowed keys
2. Select key to return
3. Mark as returned (clears lending record)
4. Key becomes available again
5. Keep borrower record for future use

## Data Validation Rules
- Name: Required, min 2 characters
- Email: Valid email format if provided
- Phone: Valid phone format if provided
- End date: Must be future date if set
- Key copy: Must be available to lend

## Mobile-First UI Requirements
- Touch-friendly buttons (min 44px)
- Easy form navigation
- Readable text sizes
- Swipe gestures for tables
- Bottom navigation for key actions

Reference the complete PRD: @PRD.md
```

## How to Set This Up:

1. **Create the directory structure:**
```bash
mkdir -p .cursor/rules
```

2. **Create each `.mdc` file** with the content above

3. **Use the new system:**
```bash
# This will automatically include project context
Cursor will read the rules automatically

# Manually invoke specific rules  
@key-features implement the dashboard component

# Auto-attached rules trigger when editing relevant files
# (e.g., database-schema.mdc when editing Supabase files)
```

## Key Benefits:
- **Automatic context** - No more `@filename` needed
- **Smart triggering** - Rules activate based on what you're working on  
- **Version controlled** - Rules are part of your codebase
- **Team sharing** - Rules travel with your project

This is much more powerful than the old `.cursorrules` system!