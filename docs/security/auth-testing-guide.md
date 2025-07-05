# 🔐 Authentication Workflow Testing Guide

## ✅ **What Was Updated**

Based on Context7 review of latest Supabase SSR patterns, we've made the following critical improvements:

### **Fixed Issues:**

1. **✅ Server Actions**: Updated `registerUser` to use server client instead of browser client
2. **✅ New Server Actions**: Created `app/actions/auth.ts` with proper login/logout functions
3. **✅ OAuth Integration**: Added server-side OAuth handling for Google authentication
4. **✅ Architecture Review**: Confirmed middleware and clients follow latest @supabase/ssr patterns

### **Environment Setup Required:**

Add this to your `.env.local` file:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

For production, update to your actual domain:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 🧪 **Testing Checklist**

### **1. User Registration Flow**

#### **Email/Password Registration:**

1. Start dev server: `npm run dev`
2. Navigate to `http://localhost:3000/auth/register`
3. **Test successful registration:**
   - Enter valid email, strong password (8+ chars), and cooperative name
   - Submit form
   - Verify success message appears
   - Check email for confirmation link
4. **Test validation:**
   - Try weak password (< 8 chars) → Should show error
   - Try empty fields → Should show "All fields required"
   - Try duplicate email → Should show "User already exists"

#### **Google OAuth Registration:**

1. Click "Sign in with Google" on register page
2. Complete Google OAuth flow
3. Should redirect to profile completion if first time
4. Complete cooperative name and submit
5. Should redirect to dashboard

#### **Database Verification:**

After registration, verify in your database:

- User exists in `auth.users` table (Supabase)
- User exists in `User` table (Prisma) with `auth_id` populated
- Cooperative name is correctly stored

### **2. Login/Logout Flow**

#### **Email/Password Login:**

1. Navigate to `http://localhost:3000/auth/login`
2. **Test successful login:**
   - Use registered email/password
   - Should redirect to `/dashboard`
   - Verify user data displays in dashboard
3. **Test error handling:**
   - Wrong password → Should show error message
   - Unconfirmed email → Should show "Please confirm your email"
   - Non-existent email → Should show error

#### **Google OAuth Login:**

1. Click "Sign in with Google" on login page
2. Complete OAuth flow
3. Should redirect to dashboard if user exists
4. Should redirect to profile completion if new user

#### **Logout Testing:**

1. While logged in, access user menu in dashboard
2. Click logout option
3. Should redirect to `/auth/login`
4. Try accessing `/dashboard` → Should redirect to login

### **3. Session Management & Middleware**

#### **Protected Route Access:**

1. **Without login:**
   - Try accessing `http://localhost:3000/dashboard`
   - Should redirect to `/auth/login`
2. **With login:**
   - Login first, then access dashboard
   - Should load normally with user data

#### **Session Persistence:**

1. Login to dashboard
2. Refresh browser → Should stay logged in
3. Open new tab to `/dashboard` → Should stay logged in
4. Close browser, reopen → Should stay logged in (until session expires)

#### **Idle Logout (15 minutes):**

1. Login to dashboard
2. Leave browser inactive for 15+ minutes
3. Should automatically logout and redirect to login
4. Test activity reset: Move mouse → Timer should reset

### **4. Row Level Security (RLS)**

#### **Data Isolation Testing:**

1. **Create test cooperatives:**
   - Register user A with "Cooperative A"
   - Register user B with "Cooperative B"
2. **Test data separation:**
   - Login as user A → Should only see Cooperative A data
   - Login as user B → Should only see Cooperative B data
   - No cross-cooperative data leakage

#### **CRUD Operations:**

1. As each user, try creating key types, borrowers, etc.
2. Verify users can only see their own cooperative's data
3. Test all dashboard queries work correctly

### **5. Profile Completion Flow**

#### **OAuth Users:**

1. New Google OAuth user completes registration
2. Should be redirected to `/auth/complete-profile`
3. Enter cooperative name and submit
4. Should redirect to dashboard
5. Verify profile is updated with cooperative info

### **6. Email Confirmation**

#### **Email Flow:**

1. Register new user with email/password
2. Check email inbox for Supabase confirmation
3. Click confirmation link
4. Should redirect to `/auth/confirmed`
5. Click "Go to Login" → Should redirect to login page
6. Now login should work without email confirmation error

## 🐛 **Common Issues & Solutions**

### **Environment Variables Missing:**

**Error:** OAuth redirect fails or shows wrong URL
**Solution:** Ensure `NEXT_PUBLIC_SITE_URL` is set in `.env.local`

### **Database Connection Issues:**

**Error:** Registration fails with database errors
**Solution:** Verify Supabase connection and Prisma schema is up to date:

```bash
npx prisma generate
npx prisma db push
```

### **Auth Policies Not Working:**

**Error:** Users see data from other cooperatives
**Solution:** Verify RLS policies are enabled and auth_id field is populated

### **Session Issues:**

**Error:** Users randomly logged out
**Solution:** Check middleware implementation and cookie handling

## ✅ **Success Criteria**

All tests above should pass with:

- ✅ **Registration**: Both email and OAuth work correctly
- ✅ **Login**: Email/password and OAuth authentication
- ✅ **Sessions**: Proper middleware protection and session management
- ✅ **RLS**: Complete data isolation between cooperatives
- ✅ **Profile**: OAuth users can complete their profiles
- ✅ **Security**: No unauthorized access to protected routes

## 🎯 **Next Steps After Testing**

Once all authentication tests pass:

1. Mark authentication testing tasks as complete in `TASKS.md`
2. Begin Phase 2: Core Data Management features
3. Start with key type CRUD operations

## 🔧 **Development Commands**

```bash
# Start development server
npm run dev

# Check database schema
npx prisma studio

# Regenerate Prisma client
npx prisma generate

# Push schema changes
npx prisma db push

# View server logs for debugging
# Check browser developer console for client errors
```
