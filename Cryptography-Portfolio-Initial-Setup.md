# Cryptography Portfolio - Getting Started Guide

## Quick Start (5 minutes)

### 1. Set Up Your Project Directory

```bash
# Create a new directory for your project
mkdir cryptography-portfolio
cd cryptography-portfolio

# Initialize as a Git repository
git init

# Create the directory structure
mkdir css js/crypto-demos assets pages
```

### 2. Create Your Files

Save the provided templates:

- `index.html` - Main page (from the HTML template)
- `css/style.css` - Styling (from the CSS template)
- `js/app.js` - Main JavaScript (from the JS template)

### 3. Start a Local Server

**Option A: Python (easiest if you have Python 3)**

```bash
python3 -m http.server 8000
```

**Option B: Node.js with http-server**

```bash
npm install -g http-server
http-server
```

**Option C: VS Code Live Server extension**

- Install the "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

### 4. View Your Site

Open your browser to: `http://localhost:8000`

---

## Project Structure Explained

```
cryptography-portfolio/
├── index.html             ← Main entry point (start here)
├── css/
│   └── style.css          ← All styling (you don't touch HTML classes after this is set)
├── js/
│   ├── app.js             ← Main application logic
│   └── crypto-demos/
│       ├── rsa-demo.js    ← (You'll create this)
│       └── hash-demo.js   ← (You'll create this)
├── pages/
│   ├── rsa-tool.html      ← (You'll create this)
│   └── hash-tool.html     ← (You'll create this)
├── assets/
│   └── images/            ← Project screenshots, logos, etc.
├── .gitignore             ← Files Git should ignore
├── README.md              ← This file
└── package.json           ← (You'll create this when adding npm packages)
```

### Design Philosophy

Think of it like a C/C++ project:

- **index.html** = main.c (entry point)
- **js/*.js** = *.cpp files (individual modules)
- **css/*.css** = *.h files (defines how things look)
- **pages/*.html** = separate compilation units for different tools

---

## Understanding the Templates

### HTML Template: Semantic Structure

The HTML uses **semantic tags** (like `<header>`, `<nav>`, `<main>`, `<section>`):

- These tell browsers the *meaning* of content, not just layout
- Better for accessibility (screen readers)
- Better for SEO (search engines understand structure)
- Makes your code easier to understand

**Key sections:**

- **Hero**: Eye-catching introduction
- **Portfolio**: Your GitHub projects
- **Tools**: Interactive cryptographic demonstrations
- **About & Contact**: About you and how to reach you

### CSS Template: Mobile-First Responsive Design

**CSS Variables** (like `--color-primary`):

- Central "configuration" for colors, spacing, fonts
- Change one variable = changes everywhere it's used
- Like `#define` in C, but for styling

**CSS Grid & Flexbox**:

- `display: grid` = 2D layouts (cards in rows/columns)
- `display: flex` = 1D layouts (navigation bars, button groups)
- Both respond automatically to screen size with `auto-fit` and `minmax()`

**Responsive Breakpoints**:

```css
@media (max-width: 768px) { /* Tablets */ }
@media (max-width: 480px) { /* Mobile */ }
```

- These adapt layout for smaller screens
- Mobile-first approach: base styles work on mobile, then enhance for larger screens

### JavaScript Template: Functional & Secure

**Three security concepts are demonstrated:**

1. **Input Validation** (`sanitizeHTML`)
   
   - Never trust user input
   - Escape HTML characters to prevent XSS
   - Example: If a user enters `<script>`, it displays as text, not code

2. **Content Security Policy (CSP)**
   
   - Declared in HTML `<meta>` tag
   - Limits where scripts can come from
   - Prevents attackers from injecting malicious scripts

3. **Safe DOM Manipulation**
   
   - Use `textContent` instead of `innerHTML` when possible
   - Validate paths before navigation (`navigateToTool`)
   - Whitelist safe HTML attributes

---

## Next Steps: Your First Modifications

### Step 1: Customize Your Portfolio

Edit `index.html`:

- Replace `CryptoShop` with your name
- Update the hero section text
- Add your actual GitHub projects

Edit `js/app.js`:

- Change project descriptions
- Customize contact information

### Step 2: Create Your First Interactive Tool

Create `pages/rsa-tool.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RSA Tool - Cryptography Portfolio</title>
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>
    <header>
        <!-- Include navigation from main site -->
        <nav class="navbar">
            <div class="nav-container">
                <h1 class="logo">RSA Encryption Tool</h1>
                <ul class="nav-links">
                    <li><a href="../index.html">← Back to Home</a></li>
                </ul>
            </div>
        </nav>
    </header>

    <main>
        <section class="tool-content">
            <h1>RSA Key Generation & Encryption</h1>
            <p>Coming soon: Interactive RSA demonstrations</p>
        </section>
    </main>

    <script src="../js/app.js"></script>
    <script src="../js/crypto-demos/rsa-demo.js"></script>
</body>
</html>
```

### Step 3: Deploy to GitHub Pages

1. Push to GitHub:
   
   ```bash
   git add .
   git commit -m "Initial cryptography portfolio"
   git push origin main
   ```

2. Enable GitHub Pages:
   
   - Go to your repository Settings
   - Scroll to "GitHub Pages"
   - Select "Deploy from a branch"
   - Choose "main" branch, root folder
   - Your site is now live at `https://yourusername.github.io/cryptography-portfolio`

---

## Security Checklist

Before deploying:

- [ ] Update all placeholder text (project names, contact info)
- [ ] Verify CSP header is set in HTML
- [ ] Test on multiple browsers (Chrome, Firefox, Safari)
- [ ] Check console for errors (F12 → Console tab)
- [ ] Test responsive design (F12 → Toggle device toolbar)
- [ ] Validate HTML: https://validator.w3.org/
- [ ] Test keyboard navigation (Tab through all links)
- [ ] Ensure all links work

---

## Common Issues & Solutions

### "Cannot find module" or "Mixed Content" errors

**Problem:** Browser blocks resources because of HTTP vs HTTPS
**Solution:** Use `python3 -m http.server` to run locally over proper HTTP

### Styling looks weird on mobile

**Problem:** Viewport meta tag missing
**Solution:** Ensure this is in your HTML `<head>`:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### JavaScript console shows errors

**Problem:** Script runs before HTML loads
**Solution:** Ensure this is at the end of your HTML `<body>`:

```html
<script src="js/app.js"></script>
```

### Want to use external libraries?

**Example:** Using a cryptography library

1. Create `package.json`:
   
   ```bash
   npm init -y
   ```

2. Install library:
   
   ```bash
   npm install tweetnacl  # Or your library of choice
   ```

3. Import in your HTML:
   
   ```html
   <script src="node_modules/tweetnacl/nacl.min.js"></script>
   ```

---

## Learning Resources

### Fundamental Concepts

- **HTML Semantics**: MDN - [Semantic HTML](https://developer.mozilla.org/en-US/docs/Glossary/semantic_HTML)
- **CSS Flexbox/Grid**: CSS-Tricks - [A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- **JavaScript Security**: OWASP - [DOM based XSS](https://owasp.org/www-community/attacks/DOM_Based_XSS)

### Web Security (Your Focus)

- **Content Security Policy**: [CSP Reference](https://content-security-policy.com/)
- **OWASP Top 10**: [Web Security Risks](https://owasp.org/www-project-top-ten/)
- **Web Cryptography API**: MDN - [SubtleCrypto](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto)

### Tools

- **Browser DevTools**: F12 or Cmd+Option+I
  - Console: Run JavaScript, see errors
  - Network: See HTTP requests
  - Application: Inspect storage, cookies (important for security!)
  - Security: Check HTTPS certificate, CSP violations

---

## Development Workflow (7 hours/week)

```
Day 1: Learn concept + read examples
       ↓
Day 2-3: Implement in your portfolio
         ↓
Day 4: Test + debug
       ↓
Day 5-6: Experiment + extend
         ↓
Day 7: Polish + commit to Git
```

---

## Progress Tracking

Track your learning in this template:

```
Week 1-2: ✓ Set up project structure
          ✓ Customize portfolio page
          ✓ Deploy to GitHub Pages

Week 3-4: ☐ Learn JavaScript fundamentals
          ☐ Add interactivity to navigation
          ☐ Understand event handling

Week 5-6: ☐ Learn HTTPS & SSL/TLS
          ☐ Implement CSP headers
          ☐ Study XSS vulnerabilities

Week 7-8: ☐ Learn Web Cryptography API
          ☐ Build RSA demonstration
          ☐ Implement secure key generation

Week 9-10: ☐ Build additional crypto tools
           ☐ Security audit of site
           ☐ Write documentation
```

---

## Questions?

Keep these principles in mind:

1. **Learn by doing**: Don't just read—build and experiment
2. **Understand the why**: Know *why* security matters, not just *that* it matters
3. **Test everything**: Use browser DevTools constantly (F12)
4. **Version control**: Commit frequently so you can see progress
5. **Build incrementally**: Add one feature, test it, commit it, then move on

Good luck! Your cryptographic expertise + web development skills = powerful security knowledge.
