# Migration Plan: Package Updates

This document outlines the breaking changes and migration steps for updating from the current package versions to the latest versions.

## Overview

**Major Version Updates:**
- Next.js: 14.2.5 → 16.2.6
- React: 18 → 19.2.6
- React DOM: 18 → 19.2.6
- Prisma: 6.1.0 → 7.8.0
- Tailwind CSS: 3.4.1 → 4.0.0
- ESLint: 8 → 9
- Zod: 3.23.8 → 4.4.3
- Stripe: 16.10.0 → 22.1.1
- Recharts: 2.12.7 → 3.8.1
- Lucide React: 0.411.0 → 1.14.0
- Framer Motion: 11.15.0 → 12.38.0
- Resend: 4.0.0 → 6.12.3

---

## 1. Next.js 14 → 16 Migration

### Breaking Changes

#### Async Request APIs (CRITICAL)
- **Change**: All request-time APIs are now fully async. Synchronous access is completely removed.
- **Affected APIs**:
  - `cookies()`
  - `headers()`
  - `draftMode()`
  - `params` in layout.js, page.js, route.js, default.js, opengraph-image, twitter-image, icon, apple-icon
  - `searchParams` in page.js

**Migration Steps:**
```bash
# Use the official codemod
npx @next/codemod@latest async-request-api
```

**Manual Changes Required:**
```typescript
// Before
const cookies = cookies()
const params = params

// After
const cookies = await cookies()
const params = await params
```

#### next/image Changes
1. **Local Images with Query Strings**
   - Requires `images.localPatterns.search` configuration for local images with query strings
   - Add to `next.config.ts`:
   ```typescript
   images: {
     localPatterns: [
       { pathname: '/assets/**', search: '?v=1' }
     ]
   }
   ```

2. **minimumCacheTTL Default Changed**
   - Changed from 60 seconds to 4 hours (14400 seconds)
   - To revert to old behavior:
   ```typescript
   images: {
     minimumCacheTTL: 60
   }
   ```

3. **imageSizes Default Changed**
   - Removed 16 from default imageSizes array
   - To restore:
   ```typescript
   images: {
     imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
   }
   ```

4. **qualities Default Changed**
   - Changed from allowing all qualities to only [75]
   - To support multiple qualities:
   ```typescript
   images: {
     qualities: [50, 75, 100]
   }
   ```

#### Other Breaking Changes
- **AMP Support**: Removed
- **next lint Command**: Removed (use ESLint directly)
- **Runtime Configuration**: Removed
- **devIndicators Options**: Removed
- **experimental.dynamicIO**: Removed
- **unstable_rootParams**: Removed

#### New Features
- Turbopack is now the default bundler
- React 19.2 support
- React Compiler support
- Enhanced caching APIs

---

## 2. React 18 → 19 Migration

### Breaking Changes

#### Error Handling
- **Change**: Errors in render are no longer re-thrown
- **Impact**: May affect production error reporting
- **Migration**: Update error handling in createRoot/hydrateRoot:
```typescript
const root = createRoot(container, {
  onUncaughtError: (error, errorInfo) => {
    // log error report
  },
  onCaughtError: (error, errorInfo) => {
    // log error report
  }
});
```

#### Removed Deprecated APIs
1. **propTypes and defaultProps for functions**
   - propTypes removed from React package
   - defaultProps removed from function components
   - **Migration**:
   ```typescript
   // Before
   function Heading({text}) {
     return <h1>{text}</h1>;
   }
   Heading.defaultProps = { text: 'Hello, world!' };
   
   // After
   function Heading({text = 'Hello, world!'}: Props) {
     return <h1>{text}</h1>;
   }
   ```

#### TypeScript Changes
1. **useRef requires an argument**
   ```typescript
   // Before
   const ref = useRef<number>(null);
   
   // After
   const ref = useRef<number | null>(null);
   // or
   const ref = useRef<number>(undefined);
   ```

2. **Ref cleanups required**
   ```typescript
   // Before
   <div ref={current => (instance = current)} />
   
   // After
   <div ref={current => {instance = current}} />
   ```

3. **Removed deprecated TypeScript types**
   - Run codemod:
   ```bash
   npx types-react-codemod@latest preset-19 ./path-to-app
   ```

#### New Deprecations
- `element.ref` deprecated
- `react-test-renderer` deprecated

---

## 3. Prisma 6 → 7 Migration

### Breaking Changes

#### Driver Adapters (CRITICAL)
- **Change**: All databases now require a driver adapter
- **Migration Required**: Update PrismaClient initialization

**Before:**
```typescript
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
  datasourceUrl: process.env.DATABASE_URL,
});
```

**After (PostgreSQL):**
```typescript
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ 
  connectionString: process.env.DATABASE_URL 
});

export const prisma = new PrismaClient({ adapter });
```

**After (SQLite):**
```typescript
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({ 
  url: process.env.DATABASE_URL || "file:./dev.db" 
});

export const prisma = new PrismaClient({ adapter });
```

**Required Package Installation:**
```bash
# For PostgreSQL
npm install @prisma/adapter-pg

# For SQLite
npm install @prisma/adapter-better-sqlite3

# For MySQL
npm install @prisma/adapter-mysql

# For other databases, check Prisma docs
```

#### Connection Pool Changes
- Driver adapters use connection pool settings from underlying Node.js drivers
- May differ significantly from Prisma v6 defaults
- **Example**: pg driver has no connection timeout by default (0), while v6 used 5 seconds
- **Action**: Configure driver adapter to match v6 behavior if needed

#### Other Breaking Changes
- **ESM support**: Enhanced ESM support
- **Schema changes**: Various schema syntax changes
- **Prisma Accelerate**: Changes to Accelerate integration
- **SSL certificate validation**: Changes to SSL validation
- **Environment variables**: Various environment variables removed/changed
- **Client middleware removed**: Client middleware API removed
- **Seeding changes**: Seeding syntax changes
- **Removed CLI flags**: Several CLI flags removed

---

## 4. Tailwind CSS 3 → 4 Migration

### Breaking Changes

#### Browser Requirements
- **New Requirements**: Safari 16.4+, Chrome 111+, Firefox 128+
- **Reason**: Depends on modern CSS features like `@property` and `color-mix()`
- **Action**: If you need older browser support, stick with v3.4

#### CSS Import Changes
**Before:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**After:**
```css
@import "tailwindcss";
```

#### Removed Deprecated Utilities
- `bg-opacity-*` → Use `bg-black/50` instead
- `text-opacity-*` → Use `text-black/50` instead
- `border-opacity-*` → Use `border-black/50` instead
- `divide-opacity-*` → Use `divide-black/50` instead
- `ring-opacity-*` → Use `ring-black/50` instead
- `placeholder-opacity-*` → Use `placeholder-black/50` instead
- `flex-shrink-*` → Use `shrink-*` instead
- `flex-grow-*` → Use `grow-*` instead
- `overflow-ellipsis` → Use `text-ellipsis` instead
- `decoration-slice` → Use `box-decoration-slice` instead
- `decoration-clone` → Use `box-decoration-clone` instead

#### Other Changes
- Renamed utilities
- Space-between selector changes
- Divide selector changes
- Container configuration changes
- Default border color changes
- Default ring width and color changes
- Preflight changes
- Variant stacking order changes
- Using a prefix changes
- The important modifier changes
- Adding custom utilities changes
- Variables in arbitrary values changes
- Arbitrary values in grid and object-position utilities changes
- Hover styles on mobile changes
- Transitioning outline-color changes
- Individual transform properties changes
- Disabling core plugins changes
- Using the theme() function changes
- Using a JavaScript config file changes

### Migration Tool
```bash
npx @tailwindcss/cli@next upgrade
```

---

## 5. ESLint 8 → 9 Migration

### Breaking Changes

#### Node.js Version Requirements
- **New Requirements**: Node.js v18.18.0+, v20.9.0+, or v21+
- **Action**: Upgrade Node.js if needed

#### New Default Config Format
- **Change**: `eslint.config.js` is now the default (flat config)
- **Old Format**: `.eslintrc` (deprecated)
- **Migration**: Use configuration migration guide
- **Temporary Fix**: Set `ESLINT_USE_FLAT_CONFIG=false` to use old format

#### Removed Formatters
The following formatters removed from core:
- `checkstyle` → Use `eslint-formatter-checkstyle`
- `compact` → Use `eslint-formatter-compact`
- `jslint-xml` → Use `eslint-formatter-jslint-xml`
- `junit` → Use `eslint-formatter-junit`
- `tap` → Use `eslint-formatter-tap`
- `unix` → Use `eslint-formatter-unix`
- `visualstudio` → Use `eslint-formatter-visualstudio`

#### Removed Rules
- `require-jsdoc` → Use replacement rules in `eslint-plugin-jsdoc`
- `valid-jsdoc` → Use replacement rules in `eslint-plugin-jsdoc`

#### Other Breaking Changes
- `eslint:recommended` has been updated
- `--quiet` no longer runs rules set to "warn"
- `--output-file` now writes a file to disk even with empty output
- Change in behavior when no patterns are passed to CLI
- `/* eslint */` comments with only severity now retain options from config file
- Multiple `/* eslint */` comments for same rule now disallowed
- Stricter `/* exported */` parsing
- Various rule schema changes
- Context methods removed
- Function-style rules no longer supported
- `meta.schema` required for rules with options

---

## 6. Zod 3 → 4 Migration

### Breaking Changes

#### Error Customization
1. **Deprecated `message` parameter**
   ```typescript
   // Before
   z.string().min(5, { message: "Too short." });
   
   // After
   z.string().min(5, { error: "Too short." });
   ```

2. **Dropped `invalid_type_error` and `required_error`**
   ```typescript
   // Before
   z.string({ 
     invalid_type_error: "Not a string",
     required_error: "This field is required" 
   });
   
   // After
   z.string({ 
     error: (issue) => issue.input === undefined 
       ? "This field is required" 
       : "Not a string" 
   });
   ```

3. **Dropped `errorMap`**
   ```typescript
   // Before
   z.string().min(5, { 
     errorMap: (issue, ctx) => { /* ... */ } 
   });
   
   // After
   z.string().min(5, { 
     error: (issue) => { /* ... */ } 
   });
   ```

#### ZodError Changes
- **Deprecated `.format()`** → Use `z.treeifyError()` instead
- **Deprecated `.flatten()`** → Use `z.treeifyError()` instead
- **Dropped `.formErrors`**
- **Dropped `.errors`** → Use `.issues` instead
- **Deprecated `.addIssue()` and `.addIssues()`** → Push to `err.issues` directly

#### z.number() Changes
- No infinite values
- `.safe()` no longer accepts floats
- `.int()` accepts safe integers only

#### z.string() Updates
- Deprecated `.email()`, `.url()`, etc.
- Stricter `.uuid()`
- No padding in `.base64url()`
- Dropped `z.string().ip()`
- Updated `z.string().ipv6()`
- Dropped `z.string().cidr()`

#### z.object() Changes
- Defaults applied within optional fields
- Deprecated `.strict()` and `.passthrough()`
- Deprecated `.strip()`
- Dropped `.nonstrict()`
- Dropped `.deepPartial()`
- Changes to `z.unknown()` optionality
- Deprecated `.merge()`

#### Other Changes
- `z.nativeEnum()` deprecated
- `z.array()` changes to `.nonempty()` type
- `z.promise()` deprecated
- `z.function()` adds `.implementAsync()`
- `.refine()` ignores type predicates, drops `ctx.path`, drops function as second argument
- `z.ostring()`, etc. dropped
- `z.literal()` drops symbol support
- Static `.create()` factories dropped
- `z.record()` drops single argument usage
- `z.intersection()` throws Error on merge conflict

---

## 7. Stripe 16 → 22 Migration

### Breaking Changes

#### Typing Changes
- **types/ directory removed**: Types now generated using TypeScript compiler
- **Stripe.StripeContext no longer exported as type**
- **Stripe.errors.StripeError type usage changed**

#### Runtime Changes
- **Remove Callback support for service methods**
  ```typescript
  // Before
  stripe.customers.list(customers => { /* ... */ });
  
  // After
  const customers = await stripe.customers.list();
  ```

- **No longer allow setting host per-request**
- **RequestOptions must be the last arg (if present)**
- **Remove support for string API key arguments**
  ```typescript
  // Before
  stripe.customers.retrieve('cus_123', 'sk_test_123');
  
  // After
  stripe.customers.retrieve('cus_123');
  ```

- **Stripe is now a proper ES6 class (not a factory function)**
- **CJS Imports have changed**
- **Removed some methods from StripeResource**

---

## 8. Recharts 2 → 3 Migration

### Breaking Changes

#### New Minimum Requirements
- React 16.8+
- TypeScript 5.x+
- Node.js v18+
- Change TS target to es6

#### Breaking Code Changes

1. **No more CategoricalChartState**
   - Internal state completely rewritten
   - Use hooks instead (e.g., `useActiveTooltipLabel`)
   - Most applications won't need changes

2. **<Customized /> no longer receives extra props**
   - No longer receives internal state props
   - Use hooks to access internal state

3. **Removal of internal props**
   - Removed props that were only used internally
   - Examples: Scatter points, Area points, Legend payload
   - Should not require changes (props weren't doing anything)

4. **Removed dependencies**
   - Removed `recharts-scale` dependency
   - Removed `react-smooth` dependency
   - All functionality now maintained within recharts

5. **activeIndex prop removed**
   - Use Tooltip instead for active index functionality
   - See: https://recharts.github.io/en-US/guide/activeIndex

---

## 9. Lucide React 0.411 → 1.14 Migration

### Breaking Changes

#### Brand Icons Removed
The following brand icons are removed in v1:
- Chromium
- Codepen
- Codesandbox
- Dribbble
- Facebook
- Figma
- Framer
- Github
- Gitlab
- Instagram
- LinkedIn
- Pocket
- RailSymbol
- Slack

**Migration**: Replace with:
- Official SVG icons from brand websites
- Icons from Simple Icons (https://simpleicons.org/)

---

## 10. Framer Motion 11 → 12 Migration

### Breaking Changes

#### Package Rename
- **No breaking changes for React** in version 12
- Package renamed from `framer-motion` to `motion/react`

**Migration:**
```bash
npm uninstall framer-motion
npm install motion
```

**Import Changes:**
```typescript
// Before
import { motion } from "framer-motion"

// After
import { motion } from "motion/react"
```

---

## 11. Other Minor Updates

### Resend 4 → 6
- Check Resend documentation for specific breaking changes
- Likely API changes and new features

### Zustand 4 → 5
- Check Zustand documentation for breaking changes
- Likely performance improvements and API refinements

### UUID 10 → 14
- Check UUID documentation for breaking changes
- Likely performance improvements

### Vaul 0.9 → 1.1
- Check Vaul documentation for breaking changes

### date-fns 3 → 4
- Check date-fns documentation for breaking changes
- Likely new features and performance improvements

### @hookform/resolvers 3 → 5
- Check documentation for breaking changes
- Likely Zod resolver updates

---

## Migration Steps Summary

### Phase 1: Pre-Migration Preparation
1. **Backup your project**
2. **Create a new branch**: `git checkout -b migration-upgrade`
3. **Run tests**: Ensure all tests pass before migration
4. **Check Node.js version**: Ensure Node.js v18.18.0+ for ESLint 9

### Phase 2: Core Framework Updates (Do Together)
1. **Update Next.js and React together** (they're interdependent)
2. **Run Next.js codemods**:
   ```bash
   npx @next/codemod@latest async-request-api
   ```
3. **Run React codemods**:
   ```bash
   npx types-react-codemod@latest preset-19 ./path-to-app
   ```
4. **Update next.config.ts** for image configuration changes
5. **Update error handling** in createRoot/hydrateRoot
6. **Fix TypeScript errors** from React 19 changes

### Phase 3: Database Layer
1. **Install Prisma adapter** based on your database
2. **Update PrismaClient initialization** to use driver adapter
3. **Update Prisma schema** if needed
4. **Regenerate Prisma client**: `npx prisma generate`
5. **Test database operations**

### Phase 4: Styling
1. **Run Tailwind upgrade tool**:
   ```bash
   npx @tailwindcss/cli@next upgrade
   ```
2. **Update CSS imports** from `@tailwind` to `@import`
3. **Replace deprecated utility classes**
4. **Update Tailwind config** if using JavaScript config
5. **Test styling in development**

### Phase 5: Linting
1. **Migrate ESLint config** to flat config format
2. **Install removed formatters** if needed
3. **Update rule configurations**
4. **Install eslint-plugin-jsdoc** if using require-jsdoc/valid-jsdoc
5. **Test linting**

### Phase 6: Validation & Other Libraries
1. **Update Zod schemas**:
   - Replace `message` with `error`
   - Replace `invalid_type_error`/`required_error` with `error` function
   - Replace `errorMap` with `error`
   - Update error handling to use `z.treeifyError()` instead of `.format()`/`.flatten()`
   - Replace `.errors` with `.issues`
   - Update string/number/object validations
2. **Update Stripe integration**:
   - Remove callback patterns
   - Update method signatures
   - Update imports
3. **Update Recharts**:
   - Remove use of CategoricalChartState
   - Update Customized components
   - Replace removed internal props
   - Use hooks for internal state access
4. **Update Lucide icons**:
   - Replace removed brand icons
   - Update imports if needed
5. **Update Framer Motion**:
   - Change package from `framer-motion` to `motion/react`
   - Update imports
6. **Update other libraries** (Resend, Zustand, UUID, etc.)

### Phase 7: Testing & Verification
1. **Run all tests** and fix failures
2. **Run development server**: `npm run dev`
3. **Test all pages and routes**
4. **Test database operations**
5. **Test styling** across different pages
6. **Test third-party integrations** (Stripe, Resend, etc.)
7. **Check console for errors and warnings**
8. **Test build**: `npm run build`
9. **Test production build locally**: `npm start`

### Phase 8: Post-Migration
1. **Update documentation** if needed
2. **Commit changes** with clear message
3. **Create pull request**
4. **Deploy to staging** for thorough testing
5. **Monitor for issues** in production after deployment

---

## Estimated Timeline

- **Phase 1**: 30 minutes
- **Phase 2**: 2-4 hours (Next.js + React + TypeScript fixes)
- **Phase 3**: 1-2 hours (Prisma)
- **Phase 4**: 1-2 hours (Tailwind)
- **Phase 5**: 1-2 hours (ESLint)
- **Phase 6**: 2-4 hours (Zod + other libraries)
- **Phase 7**: 2-4 hours (Testing)
- **Phase 8**: 1 hour

**Total Estimated Time**: 10.5 - 19.5 hours

---

## Risk Assessment

### High Risk
- **Next.js 14 → 16**: Major breaking changes, async APIs
- **Prisma 6 → 7**: Driver adapter requirement affects all database operations
- **React 18 → 19**: TypeScript changes, error handling changes

### Medium Risk
- **Tailwind CSS 3 → 4**: CSS syntax changes, browser requirements
- **Zod 3 → 4**: Significant API changes
- **ESLint 8 → 9**: Config format changes

### Low Risk
- **Framer Motion**: Just package rename
- **Lucide React**: Only brand icons removed
- **Recharts**: Internal state changes, most apps unaffected
- **Stripe**: API signature changes, type checker will help

---

## Rollback Plan

If migration fails:
1. **Revert to previous branch**: `git checkout previous-branch`
2. **Restore package.json**: `git checkout HEAD -- package.json package-lock.json`
3. **Reinstall dependencies**: `rm -rf node_modules && npm install`
4. **Restore config files** (next.config.ts, tailwind.config.js, eslint.config.js, etc.)
5. **Test that application works** with previous versions

---

## Resources

- [Next.js 16 Upgrade Guide](https://nextjs.org/docs/app/guides/upgrading/version-16)
- [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)
- [Prisma 7 Upgrade Guide](https://www.prisma.io/docs/guides/upgrade-prisma-orm/v7)
- [Tailwind CSS 4 Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide)
- [ESLint 9 Migration Guide](https://eslint.org/docs/latest/use/migrate-to-9.0.0)
- [Zod 4 Migration Guide](https://zod.dev/v4/changelog)
- [Stripe v22 Migration Guide](https://github.com/stripe/stripe-node/wiki/Migration-guide-for-v22)
- [Recharts 3.0 Migration Guide](https://github.com/recharts/recharts/wiki/3.0-migration-guide)
- [Lucide v1 Migration Guide](https://lucide.dev/guide/react/migration)
- [Motion Upgrade Guide](https://motion.dev/docs/react-upgrade-guide)

---

## Notes

- This migration involves crossing multiple major version boundaries simultaneously
- Consider doing incremental upgrades if possible (e.g., Next 14 → 15 → 16)
- Some packages may have intermediate versions that could ease migration
- Test thoroughly in development before deploying to production
- Monitor error logs closely after deployment
- Keep this document updated with any issues encountered during migration
