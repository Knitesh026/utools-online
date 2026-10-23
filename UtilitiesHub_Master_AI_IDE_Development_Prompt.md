# UtilitiesHub — Master AI IDE Development Prompt

## ROLE

You are a senior full-stack product engineer, UI/UX designer, SEO engineer, application security engineer, accessibility engineer, QA engineer, and DevOps engineer.

You are responsible for building a complete production-ready online utilities platform called **UtilitiesHub**.

Build the actual working application — not a mockup, prototype, static HTML demo, or collection of placeholder screens.

The website must be:

- Fully functional
- Multi-page
- Multi-section
- Mobile-first
- Fully responsive
- Accessible
- SEO-friendly
- Fast
- Secure
- Production-ready
- Easy to maintain
- AdSense-policy-ready
- Designed for future monetization
- Designed for future expansion to 100+ tools

IMPORTANT:

No implementation can honestly guarantee Google AdSense approval. Build the site to follow Google's applicable publisher policies and provide substantial original value, but do not attempt to manipulate, bypass, or guarantee approval.

---

# 1. PRIMARY PRODUCT GOAL

Create a professional online utilities website where users can:

- Calculate
- Convert
- Generate
- Format
- Analyze
- Transform
- Optimize
- Validate
- Process common data

The website should feel like a real software product rather than a website created only for advertising.

Primary positioning:

> **Simple, Fast & Free Online Tools for Everyday Tasks**

Core UX principle:

> The user should be able to find a tool, use it, understand the result, and move to a related tool with minimal friction.

---

# 2. NON-NEGOTIABLE REQUIREMENTS

Do not:

- Create fake functionality.
- Use placeholder buttons for core features.
- Create dead links.
- Create empty tool pages.
- Generate dozens of thin pages solely for SEO.
- Copy articles from other websites.
- Add fake testimonials.
- Add fake reviews.
- Add fake statistics.
- Add fake company information.
- Add fake author credentials.
- Use misleading advertisements.
- Encourage users to click advertisements.
- Hide advertisements as navigation.
- Put advertisements over tool controls.
- Create fake download buttons.
- Use intrusive popups that interfere with the primary task.
- Collect unnecessary personal information.
- Upload files unnecessarily when browser-side processing is possible.

Every visible feature must either work or be intentionally omitted.

---

# 3. RECOMMENDED TECH STACK

Use a modern production stack.

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Accessible component primitives
- Modern CSS
- Server Components by default
- Client Components only when interactivity requires them

## Backend

Use Next.js server functionality/API routes where necessary.

## Database

Use PostgreSQL only for features that actually require persistence.

Potential database content:

- Tool metadata
- Guides
- Blog posts
- FAQs
- Contact submissions
- Admin users
- Feedback

Do not store normal calculator inputs/results unless there is a legitimate product requirement.

## Hosting

Architecture should be compatible with modern platforms such as:

- Vercel
- Cloudflare
- Similar production hosting

Do not hard-code provider-specific assumptions unless necessary.

---

# 4. BRAND AND VISUAL DIRECTION

Create a clean modern utility SaaS aesthetic.

## Primary colors

```text
Primary:       #2563EB
Dark:          #0F172A
Background:    #F8FAFC
Card:          #FFFFFF
Border:        #E2E8F0
Text:          #0F172A
Muted Text:    #64748B
Success:       #16A34A
Error:         #DC2626
```

Allow the theme to be centralized through design tokens so colors can be changed later.

## Visual characteristics

- Clean
- Modern
- Trustworthy
- Professional
- Minimal
- Fast
- Utility-focused
- Spacious but not wasteful

Avoid:

- Excessive gradients
- Excessive animations
- Glassmorphism everywhere
- Huge decorative graphics
- Distracting background effects
- Over-designed cards
- Excessive shadows

---

# 5. RESPONSIVE REQUIREMENTS

The entire website must be mobile-first.

Support at minimum:

```text
320px+
375px
390px
414px
768px
1024px
1280px
1440px
1920px
```

No horizontal scrolling should occur on normal pages.

All tool interfaces must work comfortably on mobile.

Inputs must be touch-friendly.

Buttons must have appropriate touch targets.

Tables must become responsive on small screens.

---

# 6. GLOBAL SITE STRUCTURE

Implement:

```text
/
 /tools
 /category/[category]
 /tools/[tool]
 /guides
 /guides/[slug]
 /blog
 /blog/[slug]
 /about
 /contact
 /privacy-policy
 /terms
 /cookie-policy
 /disclaimer
 /advertising-disclosure
 /accessibility
 /search
```

Potential admin area:

```text
/admin
/admin/tools
/admin/guides
/admin/blog
/admin/faqs
/admin/settings
```

Protect admin routes.

---

# 7. HEADER

Desktop header:

```text
Logo

Home
Tools
Categories
Guides
Blog
About
Contact

Search
```

Mobile:

```text
Logo
Search
Menu
```

Mobile menu should include:

- Home
- All Tools
- Categories
- Guides
- Blog
- About
- Contact

Header must remain accessible by keyboard.

---

# 8. FOOTER

Footer sections:

```text
UtilitiesHub

Tools
Calculators
Converters
Text Tools
Developer Tools
Image Tools
SEO Tools

Resources
Guides
Blog
FAQ

Company
About
Contact

Legal
Privacy Policy
Terms
Cookie Policy
Disclaimer
Accessibility
Advertising Disclosure
```

Include copyright notice.

Do not invent company details.

---

# 9. HOMEPAGE

Build the homepage with the following sections.

## Hero

Headline:

> Free Online Tools for Everyday Tasks

Supporting text:

> Calculate, convert, generate, format and simplify everyday tasks with fast, easy-to-use online tools.

Search:

```text
Search for a tool...
```

Buttons:

```text
Explore All Tools
Browse Categories
```

---

# 10. POPULAR TOOLS

Display useful tools such as:

- Percentage Calculator
- Age Calculator
- Word Counter
- QR Code Generator
- JSON Formatter
- Image Compressor
- Unit Converter
- Password Generator

Tool cards should include:

- Icon
- Name
- Short description
- Category
- Link

---

# 11. CATEGORY SECTION

Create category cards for:

```text
Calculators
Converters
Text Tools
Developer Tools
Image Tools
SEO Tools
Date & Time
Color Tools
Security & Random
```

Each category should show:

- Category name
- Description
- Tool count
- Icon
- View tools link

Do not show inaccurate tool counts. Generate counts from the actual tool registry.

---

# 12. FEATURED GUIDES

Show useful guides.

Examples:

- How to Calculate Percentage
- How to Convert Celsius to Fahrenheit
- How Does Compound Interest Work?
- How to Compress Images Without Losing Quality
- What Is JSON?
- How to Calculate Age From Date of Birth
- What Is a UUID?

Only display guides that actually exist.

---

# 13. WHY UTILITIESHUB

Create a concise trust/value section:

### Fast

Tools are optimized for quick interaction.

### Free

Core utilities are available without unnecessary registration.

### Privacy-focused

Process information locally whenever technically possible.

### Mobile-friendly

Tools work across phones, tablets, and desktops.

### Easy to use

Interfaces focus on the task instead of unnecessary complexity.

---

# 14. TOOL CATALOG

Implement at least the following initial tool set.

## Calculators

1. Percentage Calculator
2. Percentage Increase Calculator
3. Percentage Decrease Calculator
4. Discount Calculator
5. Tip Calculator
6. GST Calculator
7. Tax Calculator
8. Loan Calculator
9. EMI Calculator
10. Simple Interest Calculator
11. Compound Interest Calculator
12. Age Calculator
13. Date Difference Calculator
14. Time Duration Calculator
15. Average Calculator
16. Ratio Calculator
17. Fraction Calculator
18. Random Number Generator

## Unit Converters

19. Length Converter
20. Weight Converter
21. Temperature Converter
22. Area Converter
23. Volume Converter
24. Speed Converter
25. Data Storage Converter

## Time and Date

26. Business Days Calculator
27. Add Days to Date
28. Subtract Days from Date
29. Unix Timestamp Converter
30. Unix Timestamp Generator
31. Countdown Timer
32. Stopwatch
33. World Clock
34. Time Zone Converter

## Text

35. Word Counter
36. Character Counter
37. Sentence Counter
38. Case Converter
39. Remove Duplicate Lines
40. Remove Extra Spaces
41. Sort Lines
42. Reverse Text
43. Text Cleaner
44. Slug Generator
45. Lorem Ipsum Generator
46. Text Diff Checker

## Developer

47. JSON Formatter
48. JSON Validator
49. JSON Minifier
50. XML Formatter
51. HTML Formatter
52. CSS Formatter
53. JavaScript Formatter
54. Base64 Encoder
55. Base64 Decoder
56. URL Encoder
57. URL Decoder
58. URL Parser
59. JWT Decoder
60. UUID Generator
61. Hash Generator
62. Regex Tester
63. Timestamp Converter
64. HEX to RGB
65. RGB to HEX
66. RGB to HSL
67. Markdown Previewer
68. HTML Entity Encoder
69. HTML Entity Decoder

## Image

70. Image Resizer
71. Image Compressor
72. Image Cropper
73. Image Converter
74. JPG to PNG
75. PNG to JPG
76. WebP Converter
77. Image Dimension Checker
78. Image File Size Checker
79. Favicon Generator
80. QR Code Generator

## SEO / Marketing

81. Meta Tag Generator
82. Meta Description Preview
83. Open Graph Preview
84. Twitter/X Card Preview
85. UTM Builder
86. Keyword Density Checker
87. Robots.txt Generator
88. Sitemap Generator
89. Canonical URL Generator
90. Schema Markup Generator

## Color

91. Color Picker
92. Color Contrast Checker
93. Gradient Generator
94. Color Palette Generator
95. Complementary Color Generator
96. Random Color Generator

## Security / Random

97. Password Generator
98. Random String Generator
99. Secure Random Number Generator

You may initially release 40–60 of these if the remaining tools are not sufficiently tested, but do not create empty placeholder pages.

---

# 15. TOOL REGISTRY ARCHITECTURE

Create a centralized tool registry.

Example:

```typescript
interface ToolDefinition {
  slug: string
  name: string
  category: ToolCategory
  shortDescription: string
  longDescription?: string
  keywords: string[]
  icon: string
  featured?: boolean
  popular?: boolean
  available: boolean
}
```

Each tool should reference:

- Tool metadata
- UI component
- Calculation/processing logic
- Validation
- Result formatter
- Content
- FAQ
- Related tools

Avoid duplicating tool metadata throughout the codebase.

---

# 16. STANDARD TOOL PAGE

Every tool page should follow this structure:

```text
Breadcrumb
↓
H1
↓
Short description
↓
Interactive tool
↓
Result
↓
Copy / Reset / relevant actions
↓
Advertisement slot
↓
What is this tool?
↓
How does it work?
↓
Formula / methodology
↓
Example
↓
How to use
↓
FAQ
↓
Related tools
↓
Relevant guide
```

The actual tool should appear before long explanatory content.

---

# 17. STANDARD TOOL UX

Every tool should support where relevant:

- Clear inputs
- Labels
- Helpful placeholders
- Validation
- Calculate/Convert/Generate action
- Reset
- Copy result
- Download where appropriate
- Error messages
- Empty state
- Success state

Never rely on color alone to communicate errors.

---

# 18. CALCULATOR ENGINE

Implement a reusable calculation architecture.

```text
Input
↓
Normalize
↓
Validate
↓
Calculate
↓
Round/format
↓
Result
```

Requirements:

- Avoid division by zero
- Handle empty inputs
- Handle invalid numbers
- Handle edge cases
- Handle floating point appropriately
- Use consistent decimal formatting
- Never silently return invalid results

---

# 19. UNIT CONVERTER ENGINE

Use a centralized conversion system.

```text
Source Value
↓
Source Unit
↓
Base Unit
↓
Target Unit
↓
Formatted Value
```

Keep conversion constants in one location.

Add automated tests for conversion accuracy.

---

# 20. TEXT TOOLS

Text tools should operate locally whenever possible.

Examples:

- Word Counter
- Character Counter
- Case Converter
- Duplicate Line Remover
- Sort Lines
- Reverse Text
- Slug Generator

Do not send normal text input to a remote server unnecessarily.

---

# 21. DEVELOPER TOOLS

Developer tools must be real implementations.

## JSON Formatter

Support:

- Pretty print
- Minify
- Validation
- Error location when practical
- Copy output

## Base64

Support:

- Encode
- Decode
- Unicode-safe behavior where appropriate

## URL Encoder

Use standards-compliant URL encoding.

## JWT Decoder

Clearly show:

```text
Decoded Header
Decoded Payload
```

and display:

> Decoding a JWT does not verify its signature.

Do not claim that decoded data is authentic.

---

# 22. IMAGE TOOLS

Prefer client-side processing.

Requirements:

- Drag and drop
- File picker
- Preview
- File validation
- Size limits
- Processing indicator
- Output preview
- Download
- Reset
- Error handling

Never permanently retain uploaded files unless explicitly required.

---

# 23. QR CODE GENERATOR

Provide:

- Text/URL input
- QR preview
- Size selection
- Error correction selection if supported
- Download PNG/SVG if supported
- Reset

Validate URLs where appropriate.

---

# 24. PASSWORD GENERATOR

Use cryptographically secure browser randomness.

Support:

- Length
- Uppercase
- Lowercase
- Numbers
- Symbols
- Exclude ambiguous characters where practical
- Generate
- Copy

Do not transmit generated passwords to the server.

---

# 25. GLOBAL SEARCH

Create a real search experience.

Search across:

- Tools
- Categories
- Guides
- Blog

Support:

- Partial matches
- Keyword matching
- Category filtering
- Keyboard navigation
- Empty state

Example:

```text
Search: percentage

Percentage Calculator
Percentage Increase Calculator
Percentage Decrease Calculator
Discount Calculator
```

---

# 26. SEO ARCHITECTURE

Every indexable page must have:

- Unique title
- Unique meta description
- Canonical URL
- H1
- Logical H2/H3 structure
- Breadcrumbs
- Internal links
- Open Graph metadata
- Twitter/X metadata
- Appropriate structured data
- Sitemap inclusion
- Correct robots directives

Generate metadata from centralized page/tool definitions where practical, but ensure every page can have unique content.

---

# 27. SEO URLS

Use:

```text
/tools/percentage-calculator
/tools/json-formatter
/tools/image-compressor
/category/calculators
/guides/how-to-calculate-percentage
/blog/example-article
```

Avoid unnecessary:

```text
/tool?id=123
```

for canonical public pages.

---

# 28. STRUCTURED DATA

Implement appropriate structured data only when it accurately represents visible page content.

Potential types:

- WebSite
- Organization
- BreadcrumbList
- Article
- FAQPage where applicable

Do not inject misleading schema.

---

# 29. SITEMAP

Generate `/sitemap.xml`.

Include:

- Homepage
- Tool pages
- Category pages
- Guides
- Blog posts
- Important static pages

Exclude:

- Admin pages
- Private pages
- Internal search URLs
- Duplicate pages

---

# 30. ROBOTS.TXT

Use an appropriate configuration similar to:

```text
User-agent: *
Allow: /

Disallow: /admin/
Disallow: /api/private/
```

Include the sitemap location.

Adjust based on the final deployment architecture.

---

# 31. CONTENT SYSTEM

Create content models for:

## Tool

```text
id
slug
name
category
shortDescription
longDescription
instructions
formula
examples
faq
keywords
status
createdAt
updatedAt
```

## Guide

```text
id
slug
title
excerpt
content
author
publishedAt
updatedAt
category
```

## Blog

```text
id
slug
title
excerpt
content
author
publishedAt
updatedAt
category
```

Do not invent authors or credentials.

---

# 32. CONTENT QUALITY

Each important tool should have useful supporting content.

Recommended sections:

1. What the tool does
2. How to use it
3. How the calculation works
4. Formula
5. Example
6. Common mistakes
7. Limitations
8. FAQ
9. Related tools

Do not generate repetitive SEO filler.

Do not copy competitor pages.

Do not mass-produce near-identical pages with only a few words changed.

---

# 33. GUIDES

Build an educational guide section.

Initial topics may include:

- How to Calculate Percentage
- Percentage Increase vs Decrease
- How Compound Interest Works
- How to Calculate GST
- How to Calculate Age
- How to Convert Celsius to Fahrenheit
- How to Compress Images
- What Is JSON?
- What Is Base64?
- What Is a UUID?
- How URL Encoding Works
- How to Use a QR Code

Guides should be original, practical, and useful.

---

# 34. BLOG

Create a blog architecture that can support genuinely useful articles.

Potential categories:

- Productivity
- Developer
- Finance Calculations
- Web Tools
- Design Tools
- Image Tools
- SEO
- How-to Guides

Do not create blog posts merely to increase page count.

---

# 35. LEGAL/TRUST PAGES

Implement:

```text
/about
/contact
/privacy-policy
/terms
/cookie-policy
/disclaimer
/advertising-disclosure
/accessibility
```

Pages should be written specifically for the actual website.

Do not use misleading claims.

Do not claim certifications that do not exist.

---

# 36. CONTACT SYSTEM

Contact form:

```text
Name
Email
Subject
Message
Submit
```

Implement:

- Client validation
- Server validation
- Rate limiting
- Spam protection
- Error states
- Success state
- Accessible labels

Never expose private backend credentials in frontend code.

---

# 37. ADMIN/CMS

Create an admin architecture if content management is included.

Admin sections:

```text
Dashboard
Tools
Categories
Guides
Blog
FAQs
Feedback
Settings
```

Admin capabilities:

- Create
- Edit
- Publish
- Unpublish
- Draft
- Delete
- Preview

Protect all admin routes.

Use secure authentication.

Never hard-code administrator passwords.

---

# 38. ANALYTICS

Support privacy-conscious analytics.

Track useful product events:

```text
page_view
tool_open
tool_calculation
tool_error
copy_result
download
search
search_result_click
contact_submit
```

Do not collect unnecessary sensitive information.

Do not send tool inputs to analytics unless there is a legitimate and privacy-compliant reason.

---

# 39. ADSENSE-READY AD SLOTS

Create reusable ad components without making the site dependent on ads.

Example:

```tsx
<AdSlot
  placement="tool-result-bottom"
/>
```

Possible placements:

```text
homepage-content
tool-result-bottom
tool-content-middle
guide-content
category-content
```

Ad components must:

- Reserve appropriate space to reduce layout shift
- Never cover controls
- Never imitate navigation
- Never encourage clicks
- Be clearly distinguishable from normal content
- Be removable without breaking the page

Do not fill the site with ads before the actual product experience is complete.

---

# 40. PERFORMANCE

Target:

```text
Lighthouse Performance: 90+
Accessibility: 95+
Best Practices: 95+
SEO: 95+
```

Target Core Web Vitals:

```text
LCP < 2.5s
INP < 200ms
CLS < 0.1
```

Treat these as engineering targets, not guarantees.

Optimize:

- Images
- JavaScript bundles
- Fonts
- Third-party scripts
- Hydration
- Rendering
- Caching
- CSS
- Client components

Do not load large libraries when a small native implementation is sufficient.

---

# 41. ACCESSIBILITY

Target WCAG 2.2 AA principles.

Requirements:

- Semantic HTML
- Keyboard navigation
- Visible focus
- Proper form labels
- Accessible buttons
- Accessible dialogs
- Screen-reader-friendly results
- Logical heading hierarchy
- Sufficient contrast
- Reduced-motion support
- No color-only status indicators
- Appropriate ARIA usage

Test with keyboard navigation.

---

# 42. SECURITY

Implement:

- HTTPS
- Secure headers
- CSP where compatible
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy
- HSTS in production
- Input validation
- Output encoding
- XSS protection
- CSRF protection where applicable
- Rate limiting
- Secure authentication
- Secure cookies
- Secret management
- Dependency updates

Never commit:

- API keys
- Passwords
- Database credentials
- Private tokens
- Service account keys

---

# 43. FILE SECURITY

For uploaded files:

- Validate MIME type
- Validate extension
- Validate file size
- Validate dimensions
- Reject unsupported types
- Prevent path traversal
- Avoid unsafe filenames
- Do not execute uploaded files
- Do not permanently store files unless required

Prefer browser-side processing for simple image utilities.

---

# 44. ERROR HANDLING

Every important operation needs a useful error state.

Bad:

```text
Error 500
```

Better:

```text
We couldn't calculate this result.

Please check your inputs and try again.
```

Implement:

- Error boundary
- Tool-level errors
- API errors
- Form errors
- Network errors
- Empty states
- Retry behavior where appropriate

---

# 45. 404 PAGE

Create a custom 404:

```text
404

This tool or page couldn't be found.

There are plenty of useful tools waiting for you.

[Explore All Tools]

[Go Home]
```

---

# 46. DESIGN SYSTEM

Create reusable tokens for:

- Colors
- Typography
- Spacing
- Border radius
- Shadows
- Breakpoints
- Component sizes

Suggested radius:

```text
Small: 8px
Medium: 12px
Large: 16px
```

Use consistent spacing throughout.

---

# 47. TOOL CARD

Each ToolCard should support:

```text
Icon
Tool name
Description
Category
Arrow/link
```

Hover behavior should be subtle.

On mobile, cards must remain compact and easy to tap.

---

# 48. TOOL INPUT COMPONENT

Reusable input component should support:

- Label
- Description
- Placeholder
- Error
- Help text
- Prefix
- Suffix
- Required state
- Disabled state

Never use placeholder text as the only label.

---

# 49. RESULT COMPONENT

Reusable result component:

```text
Result
Value
Explanation
Copy
Download if applicable
```

For long output:

- Scrollable output
- Monospace font where appropriate
- Copy button
- Clear formatting

---

# 50. TESTING REQUIREMENTS

Write automated tests.

## Unit tests

Test:

- Calculations
- Conversions
- Validators
- Formatters
- Utility functions

## Integration tests

Test:

- Tool interactions
- Forms
- Search
- Navigation
- File processing
- Copy behavior

## End-to-end tests

Test major flows:

```text
Home → Tool → Calculate → Result
Home → Search → Tool
Category → Tool
Tool → Related Tool
Contact → Submit
Mobile navigation
```

Use a modern E2E framework such as Playwright.

---

# 51. QUALITY ASSURANCE

Before declaring the project complete:

Check:

- All routes
- All buttons
- All forms
- All calculators
- All converters
- All tool outputs
- Search
- Mobile navigation
- Desktop navigation
- Footer links
- Legal links
- 404
- Error states
- Loading states
- Empty states
- Accessibility
- SEO metadata
- Sitemap
- Robots
- Structured data
- Analytics
- Ad slots
- Security headers

---

# 52. CROSS-BROWSER TESTING

Verify in current versions of:

- Chrome
- Edge
- Firefox
- Safari

Also test mobile browsers.

---

# 53. MOBILE QA

Test at:

```text
320px
360px
375px
390px
414px
```

Verify:

- No horizontal overflow
- Inputs fit
- Buttons fit
- Text wraps correctly
- Navigation works
- Tool results remain readable
- Ads do not cover content
- Keyboard does not break layout

---

# 54. SEO QA

For every public page verify:

```text
Unique title
Unique description
Canonical URL
H1
Correct headings
Internal links
Breadcrumbs
Open Graph
Twitter metadata
Structured data where appropriate
Indexability
Sitemap
```

Do not index:

- Admin
- Internal search results if not intended
- Private pages
- Duplicate URLs

---

# 55. ADSENSE READINESS CHECKLIST

Before requesting review:

## Website

- [ ] Custom domain
- [ ] HTTPS
- [ ] Website fully live
- [ ] No "coming soon" pages
- [ ] No broken links
- [ ] No placeholder content
- [ ] Responsive design
- [ ] Clear navigation
- [ ] Search works
- [ ] Tools actually work

## Content

- [ ] Original tool descriptions
- [ ] Original guides
- [ ] Useful FAQs
- [ ] Practical examples
- [ ] No scraped articles
- [ ] No spun content
- [ ] No thin mass-generated pages
- [ ] No misleading claims

## Trust

- [ ] About
- [ ] Contact
- [ ] Privacy Policy
- [ ] Terms
- [ ] Cookie Policy
- [ ] Disclaimer
- [ ] Accessibility
- [ ] Advertising Disclosure

## Technical

- [ ] Sitemap
- [ ] Robots.txt
- [ ] Canonicals
- [ ] Search Console
- [ ] Analytics
- [ ] Good performance
- [ ] Accessible navigation
- [ ] No major console errors
- [ ] Security headers

## Advertising

- [ ] Ads clearly distinguishable
- [ ] No incentivized clicks
- [ ] No deceptive placements
- [ ] No fake download buttons
- [ ] No ads covering tools
- [ ] No excessive advertising
- [ ] No ads presented as navigation

---

# 56. INITIAL CONTENT PLAN

Do not launch with hundreds of weak pages.

Recommended first production release:

```text
40–60 fully functional tools
+
30–50 useful guides
+
10–20 quality supporting articles
+
Complete legal/trust pages
+
Strong internal linking
```

Expand after validating quality and demand.

---

# 57. DEVELOPMENT PHASES

## Phase 1 — Foundation

Implement:

- Project setup
- TypeScript
- Tailwind
- Design system
- Routing
- Header
- Footer
- Mobile navigation
- SEO framework
- Error handling
- Analytics architecture

## Phase 2 — Tool engine

Implement:

- Tool registry
- Calculator engine
- Conversion engine
- Result system
- Validation system
- Copy system
- Reset system

## Phase 3 — Core tools

Build the highest-value initial tools.

## Phase 4 — Developer tools

Build formatting, encoding, conversion, and validation utilities.

## Phase 5 — Image tools

Implement browser-side image processing.

## Phase 6 — Content

Create:

- Tool descriptions
- Guides
- FAQs
- Examples
- Blog architecture

## Phase 7 — Trust and legal

Implement all required public trust/legal pages.

## Phase 8 — Admin/CMS

Implement only if needed for ongoing content management.

## Phase 9 — Monetization

Add responsible ad slots.

## Phase 10 — QA

Run complete:

- Unit tests
- Integration tests
- E2E tests
- Accessibility tests
- Security checks
- Performance checks
- SEO checks

## Phase 11 — Production deployment

Configure:

- Domain
- HTTPS
- Environment variables
- Database
- Analytics
- Search Console
- Sitemap
- Robots
- Monitoring
- Error tracking

---

# 58. DEFINITION OF DONE

A tool is complete only when:

```text
✓ UI implemented
✓ Desktop responsive
✓ Mobile responsive
✓ Input validation
✓ Calculation/processing verified
✓ Error states
✓ Loading states where required
✓ Reset button
✓ Copy result
✓ Download where appropriate
✓ Accessibility
✓ SEO metadata
✓ Breadcrumb
✓ Explanation
✓ Formula/method where appropriate
✓ Examples
✓ FAQ
✓ Related tools
✓ Analytics events
✓ No console errors
✓ Performance tested
✓ Security reviewed
✓ Automated tests
```

---

# 59. DEVELOPMENT WORKFLOW

Follow this order:

1. Inspect repository.
2. Determine existing architecture.
3. Create or update project structure.
4. Create design system.
5. Build global layout.
6. Build tool registry.
7. Build reusable tool components.
8. Build calculation/conversion engines.
9. Implement tools in small tested groups.
10. Implement content.
11. Implement SEO.
12. Implement legal/trust pages.
13. Implement search.
14. Implement analytics.
15. Implement ad slots.
16. Implement admin only if required.
17. Run tests.
18. Run security checks.
19. Run accessibility checks.
20. Run performance checks.
21. Fix issues.
22. Re-test.
23. Prepare deployment.

Do not stop after creating the UI.

---

# 60. AI IDE EXECUTION RULES

When working in an AI IDE:

## Inspect before modifying

First inspect:

- Existing files
- package.json
- configuration
- routing
- components
- styles
- environment files
- database configuration
- tests
- deployment configuration

Do not blindly overwrite an existing project.

## Preserve working functionality

If existing functionality is correct, do not unnecessarily replace it.

## Make incremental changes

Prefer small verifiable changes.

## After each major feature

Run:

```bash
npm run lint
npm run typecheck
npm test
```

If scripts do not exist, create appropriate scripts.

Run E2E tests where configured.

---

# 61. PACKAGE MANAGEMENT

Use stable, maintained packages.

Before adding a dependency:

1. Check whether native browser APIs can solve the problem.
2. Check bundle size and maintenance status.
3. Avoid unnecessary dependencies.
4. Avoid duplicate libraries doing the same thing.

Keep dependencies current and review security advisories.

---

# 62. ENVIRONMENT VARIABLES

Create:

```text
.env.example
```

Never commit real secrets.

Document variables such as:

```text
DATABASE_URL=
NEXT_PUBLIC_SITE_URL=
ANALYTICS_ID=
CONTACT_EMAIL=
```

Only expose variables prefixed for public use when they are actually safe to expose.

---

# 63. DATABASE MIGRATIONS

If PostgreSQL is used:

- Use migrations
- Define schemas
- Add indexes where needed
- Validate inputs
- Use parameterized queries/ORM
- Never construct SQL from raw user input

---

# 64. CACHING

Cache static content where appropriate.

Potential cache candidates:

- Tool metadata
- Categories
- Guides
- Blog content
- Static pages

Do not cache personalized/private responses publicly.

---

# 65. INTERNATIONALIZATION

Architect text/content so future localization is possible.

Initial release may use English.

Do not hard-code user-facing strings throughout complex components if easy centralized localization will materially improve maintainability.

---

# 66. PRIVACY PRINCIPLES

Collect only data that is necessary.

For client-side tools:

```text
User input
↓
Browser
↓
Result
```

No unnecessary server transmission.

For uploaded files:

```text
User file
↓
Browser processing
↓
Output
```

where technically possible.

Clearly explain data handling in the privacy policy.

---

# 67. COOKIE / CONSENT ARCHITECTURE

If cookies or analytics technologies require consent in the applicable user's jurisdiction, implement an appropriate consent mechanism.

Do not hide important privacy information.

Do not make consent choices deceptive.

---

# 68. MONITORING

Production should have monitoring for:

- Server errors
- Client errors
- Failed API requests
- Performance regressions
- Broken tool calculations
- Contact form failures

Do not log sensitive user input unnecessarily.

---

# 69. DEPLOYMENT CHECKLIST

Before production:

```text
[ ] Production build succeeds
[ ] TypeScript passes
[ ] Lint passes
[ ] Unit tests pass
[ ] E2E tests pass
[ ] Environment variables configured
[ ] Database migrations complete
[ ] HTTPS active
[ ] Domain configured
[ ] Sitemap working
[ ] Robots working
[ ] Canonicals working
[ ] Analytics configured
[ ] Error monitoring configured
[ ] Security headers verified
[ ] Mobile QA complete
[ ] Accessibility QA complete
[ ] SEO QA complete
[ ] Ad slots verified
```

---

# 70. FINAL QUALITY GATE

Before saying the project is complete, independently verify:

### Product

- Are the tools genuinely useful?
- Does every primary button work?
- Are results accurate?
- Are errors handled?
- Is the user journey clear?

### Design

- Is the UI consistent?
- Is it professional?
- Does it work on mobile?
- Is typography readable?
- Are forms easy to use?

### SEO

- Are pages indexable where intended?
- Are metadata unique?
- Are internal links useful?
- Is content original?
- Are there thin pages?

### AdSense readiness

- Is there substantial useful content?
- Is navigation clear?
- Are legal/trust pages present?
- Are ads separated from controls?
- Is there any deceptive placement?
- Does the site provide value even with ads removed?

### Security

- Are secrets protected?
- Are inputs validated?
- Are uploads safe?
- Are admin routes protected?
- Are dependencies checked?

### Accessibility

- Can the site be used with a keyboard?
- Are form fields labeled?
- Are results announced appropriately?
- Is contrast sufficient?

### Performance

- Is JavaScript minimized?
- Are images optimized?
- Are third-party scripts controlled?
- Is layout shift minimized?

---

# 71. MOST IMPORTANT PRODUCT PRINCIPLE

Build this website as:

> **A useful utilities platform that happens to monetize with advertising.**

Not:

> **An advertising platform that happens to contain tools.**

The user should still find the website valuable if all advertisements were temporarily removed.

---

# 72. FINAL AI IDE INSTRUCTION

Now begin implementation.

Do not merely explain what should be built.

Inspect the repository first and then implement the product.

If the repository is empty, initialize the project using the recommended architecture.

If an existing application exists, preserve useful functionality and integrate UtilitiesHub into the existing architecture where appropriate.

Work systematically.

For every feature:

1. Implement it.
2. Test it.
3. Verify it.
4. Fix issues.
5. Continue.

Do not leave TODO placeholders for core functionality.

Do not claim a feature is complete until it has been tested.

At the end, provide a concise implementation report containing:

```text
1. What was implemented
2. Tools completed
3. Pages completed
4. SEO implementation
5. AdSense-readiness work
6. Security work
7. Accessibility work
8. Tests executed
9. Test results
10. Known limitations
11. Remaining work
12. Production deployment instructions
```

If you encounter a decision that does not materially affect security, legal compliance, or architecture, choose the most sensible production-ready option and continue rather than repeatedly asking for confirmation.

The final result must be a polished, functional, maintainable, mobile-responsive production website — not a prototype.
