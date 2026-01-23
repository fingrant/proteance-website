# Proteance Website - Complete Documentation

## Project Overview

This is the official Proteance corporate website, a modern static website built with HTML, CSS, and JavaScript, deployed on Azure Static Web Apps with automated CI/CD through GitHub Actions.

**Live URLs:**
- Primary: https://www.proteance.com
- Apex: https://proteance.com (redirects to www)
- Azure Default: https://delightful-wave-03912960f.1.azurestaticapps.net

---

## Table of Contents

1. [File Structure](#file-structure)
2. [Azure Resources](#azure-resources)
3. [GitHub Integration](#github-integration)
4. [Domain Configuration](#domain-configuration)
5. [Website Features](#website-features)
6. [How to Make Changes](#how-to-make-changes)
7. [Deployment Process](#deployment-process)
8. [Important Files Reference](#important-files-reference)
9. [Contact Form Setup](#contact-form-setup)
10. [Troubleshooting](#troubleshooting)

---

## File Structure

```
D:\CorpWebSite\
├── index.html                          # Main homepage
├── about.html                          # About page with team profiles
├── dibop.html                          # OMDA/DIBOP product page
├── winloss.html                        # Proteance Win-Loss product page
├── styles.css                          # All website styling (1400+ lines)
├── script.js                           # JavaScript for navigation, forms, animations
├── staticwebapp.config.json            # Azure Static Web Apps routing configuration
├── proteance_logo_transparent.png      # Company logo
│
├── api/                                # Azure Functions (serverless backend)
│   └── contact/                        # Contact form email handler
│       ├── function.json               # Function configuration (v3 model)
│       └── index.js                    # Email sending logic using Azure Communication Services
│
├── WebsiteImages/                      # All images and media assets
│   ├── LogoDIBOP.png                   # DIBOP product logo
│   ├── LogoProteanceWinLoss.png        # Win-Loss product logo
│   ├── AnimatedBulb.png                # Animated lightbulb for vision section
│   ├── ECLAT_transparent.png           # Win-Loss methodology diagram
│   ├── ECLAT.jpg                       # Alternative ECLAT diagram
│   ├── AI-Powered.jpg                  # Vision section icon
│   ├── PIC-01.png, PIC-02.png, etc.    # Various section images
│   ├── ProfilePicFinbarr.png           # Team member photo
│   ├── ProfilePicDavid.jpg             # Team member photo
│   ├── ProfilePicAdrian.jpg            # Team member photo
│   └── ProfilePicMike.jpg              # Team member photo
│
├── Animations/                         # Video content
│   └── DIBOP Animation.mp4             # OMDA/DIBOP demo video
│
├── .github/                            # GitHub Actions workflows
│   └── workflows/
│       └── azure-static-web-apps-*.yml # Auto-generated deployment workflow
│
└── .git/                               # Git repository data

```

---

## Azure Resources

### Resource Group: **ProteanceWebsite**
Location: East US 2

### 1. Static Web App
- **Name:** proteance-website
- **Type:** Microsoft.Web/staticSites
- **SKU:** Free
- **Location:** East US 2
- **Default URL:** delightful-wave-03912960f.1.azurestaticapps.net
- **Custom Domains:**
  - www.proteance.com (Status: Ready)
  - proteance.com (Status: Ready)
- **API Support:** Azure Functions v3
- **Branch:** master

### 2. Azure Communication Services
- **Name:** ProteanceEmailService
- **Purpose:** Sends contact form emails
- **Email Domain:** 8e5eabf8-90f4-44bb-8115-24094b805646.azurecomm.net
- **Sender:** DoNotReply@8e5eabf8-90f4-44bb-8115-24094b805646.azurecomm.net
- **Recipient:** info@proteance.com
- **Data Location:** Canada

**Connection String:** Stored in Azure Static Web App Application Settings
- Key: `COMMUNICATION_SERVICES_CONNECTION_STRING`

---

## GitHub Integration

### Repository Details
- **Owner:** fingrant
- **Repository:** proteance-website
- **URL:** https://github.com/fingrant/proteance-website
- **Active Branch:** master
- **Default Branch:** main (not used)

### Automated Deployment
- **Workflow:** Azure Static Web Apps CI/CD
- **Trigger:** Push to master branch
- **Build Time:** ~1-2 minutes
- **Deployment:** Automatic to Azure Static Web App

### GitHub Actions Workflow
Located in: `.github/workflows/azure-static-web-apps-*.yml`
- Builds static website
- Deploys API functions
- Updates live site automatically

**View Deployments:**
```powershell
gh run list --limit 5
```

---

## Domain Configuration

### GoDaddy DNS Settings

**Domain:** proteance.com

#### DNS Records:
1. **CNAME (www subdomain)**
   - Type: CNAME
   - Name: www
   - Value: delightful-wave-03912960f.1.azurestaticapps.net
   - Purpose: Direct www.proteance.com to Azure

2. **TXT (Domain Verification)**
   - Type: TXT
   - Name: @
   - Value: _wj4mfu8qnsm89ymvtgyr1zg401rewtp
   - Purpose: Prove domain ownership to Azure

3. **Domain Forwarding (Apex Domain)**
   - proteance.com → https://www.proteance.com
   - Type: Permanent (301)
   - Purpose: Redirect apex domain to www subdomain

#### Other DNS Records (Pre-existing):
- MX records for email (Microsoft/Outlook)
- TXT records for SPF and email verification
- NS records for nameservers

### SSL Certificates
- **Provider:** Azure Static Web Apps (automatic, free)
- **Status:** Active for both www.proteance.com and proteance.com
- **Renewal:** Automatic
- **Provisioning Time:** 15 minutes to 48 hours after domain validation

---

## Website Features

### Pages

#### 1. Homepage (index.html)
**Sections:**
- Hero section with animated lightbulb
- Vision section (3 cards)
- Problem statement
- Approach grid
- Expertise cards
- Products & Services (DIBOP and Win-Loss)
- DIBOP Animation video (full-width banner)
- Solutions grid
- Call-to-action
- Contact form

#### 2. About Page (about.html)
**Sections:**
- Company overview
- Why Proteance (4-card grid)
- Leadership team (4 members, 2x2 grid)
  - Finbarr Grant - CTO
  - David Campbell - Strategic Client Advisor
  - Adrian Le Coyte - COO
  - Mike Reneau - Brand Strategist
- LinkedIn links for each team member
- Profile photos (200x200px circles)

#### 3. DIBOP/OMDA Page (dibop.html)
**Sections:**
- Hero with product name: OMDA (عمدة) Powered by DIBOP
- DIBOP Animation video (full-width banner)
- What DIBOP Is
- What Problem It Solves
- How It's Used
- What It Is Not (3-card grid)
- Key Benefits (4-card grid)
- Call-to-action

#### 4. Win-Loss Page (winloss.html)
**Sections:**
- Hero with tagline
- Introduction
- How It Works (with ECLAT methodology diagram)
- Insights & Analytics (3-card grid)
- Seamless Integration
- Why This Is Different (5 differentiator cards)
- Call-to-action

### Interactive Features

#### 1. Contact Form
- **Location:** Homepage footer
- **Fields:** Name, Email, Phone, Company, Message
- **Submission:** Sends to `/api/contact` Azure Function
- **Email Delivery:** Via Azure Communication Services to info@proteance.com
- **Validation:** Client-side JavaScript validation
- **Feedback:** Success/error messages displayed to user

#### 2. Navigation
- **Mobile Menu:** Hamburger menu for mobile devices
- **Smooth Scrolling:** Anchor links scroll smoothly to sections
- **Active States:** Current page highlighted in navigation
- **Responsive:** Adapts to all screen sizes

#### 3. Animations
- **Lightbulb:** Flicker-on effect on vision section (2-second animation)
- **DIBOP Video:** Auto-plays (muted), loops, has controls
- **Hover Effects:** Cards lift and show shadow on hover
- **Fade-in:** Hero section elements fade in on load

---

## How to Make Changes

### Prerequisites
- Git installed
- GitHub account with access to fingrant/proteance-website
- Code editor (VS Code recommended)
- Azure CLI (optional, for Azure resource management)

### Local Development Workflow

1. **Navigate to project directory:**
   ```powershell
   cd D:\CorpWebSite
   ```

2. **Pull latest changes:**
   ```powershell
   git pull
   ```

3. **Make your edits:**
   - Edit HTML files for content changes
   - Edit styles.css for styling changes
   - Add images to WebsiteImages/ folder
   - Test locally by opening HTML files in browser

4. **Commit changes:**
   ```powershell
   git add -A
   git commit -m "Description of your changes"
   ```

5. **Push to GitHub (triggers deployment):**
   ```powershell
   git push
   ```

6. **Verify deployment:**
   ```powershell
   gh run list --limit 1
   ```
   Wait 1-2 minutes, then check www.proteance.com

### Common Changes

#### Update Text Content
- Edit the relevant HTML file (index.html, about.html, etc.)
- Find the text you want to change
- Update it directly in the HTML
- Commit and push

#### Add/Change Images
1. Add image to `WebsiteImages/` folder
2. Reference it in HTML: `src="WebsiteImages/filename.jpg"`
3. Commit and push

#### Update Team Members
- Edit `about.html`
- Find the `.team-grid` section
- Add/edit team member cards
- Add profile photo to `WebsiteImages/`
- Commit and push

#### Modify Styling
- Edit `styles.css`
- Find the relevant CSS class
- Update colors, sizes, spacing, etc.
- Commit and push

---

## Deployment Process

### Automatic Deployment (Current Setup)

**Trigger:** Any push to master branch

**Process:**
1. Code pushed to GitHub
2. GitHub Actions workflow starts
3. Website files built and optimized
4. Azure Functions bundled
5. Deployed to Azure Static Web App
6. SSL certificates validated
7. Live at www.proteance.com

**Monitoring:**
```powershell
# Check latest deployment status
gh run list --limit 1

# Watch deployment in real-time
gh run watch
```

### Manual Deployment (Alternative)

If needed, you can deploy directly using Azure CLI:

```powershell
# Login to Azure
az login

# Deploy using Azure Static Web Apps CLI
# (requires swa CLI installed: npm install -g @azure/static-web-apps-cli)
swa deploy --app-location . --api-location api
```

---

## Important Files Reference

### Core Website Files

#### index.html (Main Homepage)
**Purpose:** Primary landing page with all main sections

**Key Sections:**
- Lines 14-37: Navigation
- Lines 39-53: Hero section with lightbulb animation
- Lines 55-91: Vision section (3 cards)
- Lines 93-108: Problem statement
- Lines 110-159: Approach grid (6 cards)
- Lines 161-187: Expertise section
- Lines 189-271: Products & Services (DIBOP, Win-Loss, video)
- Lines 273-301: CTA section
- Lines 303-338: Contact form

**Navigation Links:**
- `#vision` → Vision section
- `#approach` → Approach section
- `#expertise` → Expertise section
- `#products` → Products & Services section
- `about.html` → About page
- `dibop.html` → DIBOP product page
- `winloss.html` → Win-Loss product page
- `#contact` → Contact form

#### styles.css (All Styling)
**Purpose:** Complete website styling

**Key Sections:**
- Lines 1-60: CSS Variables and global styles
- Lines 62-145: Navigation styling
- Lines 147-250: Hero section
- Lines 252-350: Vision section
- Lines 352-450: Problem statement
- Lines 452-516: Approach section
- Lines 518-616: Solutions/Products section
- Lines 618-680: CTA section
- Lines 682-780: Contact form
- Lines 782-814: Footer
- Lines 816-958: About page styles
- Lines 960-1020: Team section (2x2 grid)
- Lines 1022-1166: Win-Loss page styles
- Lines 1168-1200: DIBOP animation (full-width banner)
- Lines 1202-1240: Animations (keyframes)
- Lines 1242-1448: Responsive media queries

**CSS Variables:**
```css
--primary-color: #FFD700 (Gold)
--secondary-color: #1a1a1a (Dark gray)
--text-dark: #1a1a1a
--text-light: #666666
--bg-light: #f8f9fa
--bg-white: #ffffff
```

#### script.js (JavaScript Functionality)
**Purpose:** Interactive features and form handling

**Functions:**
- Mobile menu toggle (hamburger)
- Smooth scrolling for anchor links
- Contact form submission handler
- Form validation
- Success/error message display
- Loading state management

**Event Listeners:**
- Hamburger menu click
- Navigation link clicks
- Contact form submit

#### staticwebapp.config.json (Azure Routing)
**Purpose:** Configure how Azure Static Web Apps handles routing

**Important:**
- Excludes .html files from fallback routing
- Allows direct access to about.html, dibop.html, winloss.html
- API routes handled by Azure Functions

### API Files (Contact Form Backend)

#### api/contact/function.json
**Purpose:** Azure Function v3 configuration

**Settings:**
- HTTP trigger (POST)
- Anonymous authentication (public endpoint)
- Route: `/api/contact`

#### api/contact/index.js
**Purpose:** Email sending logic

**Process:**
1. Receives form data (name, email, phone, company, message)
2. Validates required fields
3. Connects to Azure Communication Services
4. Sends email to info@proteance.com
5. Returns success/error response

**Dependencies:**
- @azure/communication-email (v1.0.0)

**Environment Variables Required:**
- `COMMUNICATION_SERVICES_CONNECTION_STRING`

---

## Contact Form Setup

### Azure Communication Services Configuration

#### Email Service Setup
1. **Resource:** Azure Communication Services
2. **Email Domain:** Managed by Azure (*.azurecomm.net)
3. **Sender Address:** DoNotReply@8e5eabf8-90f4-44bb-8115-24094b805646.azurecomm.net
4. **Recipient:** info@proteance.com

#### Application Settings (Environment Variables)
**Location:** Azure Static Web App → Configuration → Application Settings

**Required Setting:**
```
Name: COMMUNICATION_SERVICES_CONNECTION_STRING
Value: endpoint=https://...;accesskey=...
```

**How to Update:**
```powershell
az staticwebapp appsettings set \
  --name proteance-website \
  --resource-group ProteanceWebsite \
  --setting-names COMMUNICATION_SERVICES_CONNECTION_STRING="your-connection-string"
```

### Testing Contact Form

**Frontend Test:**
1. Visit www.proteance.com/#contact
2. Fill out all fields
3. Click "Send Message"
4. Verify success message appears

**Backend Test:**
1. Check info@proteance.com inbox
2. Verify email received with form data
3. Check Azure Function logs if issues occur

**View Function Logs:**
```powershell
az staticwebapp functions log \
  --name proteance-website \
  --resource-group ProteanceWebsite
```

---

## Troubleshooting

### Common Issues and Solutions

#### 1. Website Not Updating After Push

**Problem:** Changes pushed to GitHub but not appearing on live site

**Solutions:**
1. Check deployment status:
   ```powershell
   gh run list --limit 1
   ```
2. Wait 2-3 minutes for deployment to complete
3. Clear browser cache (Ctrl+Shift+R)
4. Check GitHub Actions for build errors

#### 2. Contact Form Not Working

**Problem:** Form submitted but email not received

**Checks:**
1. Verify Azure Communication Services connection string is set
2. Check Azure Function logs for errors
3. Verify info@proteance.com is correct recipient
4. Test Azure Communication Services directly in Azure Portal

**Debugging:**
```powershell
# Check function status
az staticwebapp functions list \
  --name proteance-website \
  --resource-group ProteanceWebsite

# View recent function executions
az monitor activity-log list \
  --resource-group ProteanceWebsite \
  --max-events 10
```

#### 3. Domain Not Resolving

**Problem:** proteance.com or www.proteance.com not loading

**Checks:**
1. Verify DNS records in GoDaddy
2. Check domain status in Azure:
   ```powershell
   az staticwebapp hostname list \
     --name proteance-website \
     --resource-group ProteanceWebsite
   ```
3. Wait for DNS propagation (up to 48 hours, usually 10 minutes)
4. Check SSL certificate status

**DNS Test:**
```powershell
nslookup www.proteance.com
nslookup proteance.com
```

#### 4. SSL Certificate Errors

**Problem:** "Your connection is not private" warning

**Causes:**
- Certificate still being provisioned (wait 15-30 minutes)
- Domain validation failed
- DNS records incorrect

**Solution:**
1. Verify TXT record exists in GoDaddy DNS
2. Check domain validation status in Azure
3. Wait for automatic certificate renewal
4. If persists after 48 hours, remove and re-add custom domain

#### 5. Page Shows 404 Error

**Problem:** Specific page (e.g., about.html) shows 404

**Solution:**
1. Check `staticwebapp.config.json` excludes .html files
2. Verify file exists in repository
3. Check file path is correct (case-sensitive)
4. Ensure file was included in deployment

#### 6. Images Not Loading

**Problem:** Broken image icons or missing images

**Checks:**
1. Verify image exists in `WebsiteImages/` folder
2. Check file path in HTML (relative path)
3. Verify file extension is correct (.jpg, .png, etc.)
4. Ensure image was committed and pushed to GitHub

**Correct Paths:**
```html
<!-- Correct -->
<img src="WebsiteImages/LogoDIBOP.png" alt="Logo">

<!-- Incorrect -->
<img src="/WebsiteImages/LogoDIBOP.png" alt="Logo">
<img src="D:/CorpWebSite/WebsiteImages/LogoDIBOP.png" alt="Logo">
```

#### 7. Deployment Fails

**Problem:** GitHub Actions workflow fails

**Debugging:**
1. View GitHub Actions logs
2. Check for syntax errors in HTML/CSS/JS
3. Verify Azure Function code is valid
4. Check Azure Static Web Apps deployment token is valid

**View Detailed Logs:**
- Go to https://github.com/fingrant/proteance-website/actions
- Click on failed workflow run
- Review error messages

---

## Collaboration & Access

### Adding Collaborators to GitHub Repository

1. Go to https://github.com/fingrant/proteance-website/settings/access
2. Click "Add people"
3. Enter their GitHub username or email
4. Choose permission level:
   - **Write** - Can push changes directly
   - **Read** - Can view and submit pull requests

### Pull Request Workflow (Recommended for Teams)

**For Collaborators:**
1. Create a new branch
2. Make changes
3. Push branch to GitHub
4. Create Pull Request
5. Request review
6. Merge after approval

**For Repository Owner:**
1. Review pull request
2. Test changes locally if needed
3. Approve or request changes
4. Merge to master (triggers deployment)

---

## Backup and Version Control

### Git Commits
All changes are tracked in Git history. To view:

```powershell
# View recent commits
git log --oneline -10

# View specific file history
git log --follow index.html

# Restore previous version
git checkout <commit-hash> -- <file-path>
```

### GitHub Releases
Create tagged releases for major versions:

```powershell
git tag -a v1.0 -m "Initial production release"
git push origin v1.0
```

### Azure Backups
Azure Static Web Apps doesn't require manual backups as all code is in GitHub repository.

---

## Performance and Monitoring

### Website Performance
- **Hosting:** Azure Static Web Apps (CDN-backed)
- **Global Distribution:** Yes, via Azure CDN
- **HTTPS:** Enabled by default
- **Compression:** Automatic
- **Caching:** Optimized by Azure

### Monitoring Tools
- **GitHub Actions:** Deployment history and logs
- **Azure Portal:** Resource health and metrics
- **Browser DevTools:** Performance testing
- **Google PageSpeed Insights:** Performance scoring

---

## Cost Information

### Azure Resources

**Static Web App (Free Tier):**
- Cost: $0/month
- Includes: 100 GB bandwidth, custom domains, SSL, API functions
- Limitations: Free tier limits on API executions and bandwidth

**Azure Communication Services:**
- Email sending: ~$0.50 per 1,000 emails
- Current usage: Minimal (contact form only)
- Estimated cost: <$5/month

**Total Estimated Monthly Cost:** $0-5

### Domain (GoDaddy)
- proteance.com registration: ~$20/year
- DNS management: Included
- Domain forwarding: Included

---

## Future Enhancements (Optional)

### Potential Features
1. **Blog Section** - Add blog posts with pagination
2. **Case Studies** - Showcase client success stories
3. **Newsletter Signup** - Email list building
4. **Analytics** - Google Analytics or Azure Application Insights
5. **Search Functionality** - Site-wide search
6. **Multi-language** - Support for additional languages
7. **Chat Widget** - Live chat integration

### Recommended Tools
- **Analytics:** Google Analytics 4 or Azure Application Insights
- **SEO:** Yoast SEO guidelines, schema markup
- **Performance:** Lighthouse audits, Web Vitals
- **Testing:** Browser testing across devices

---

## Support Contacts

### Azure Support
- Portal: https://portal.azure.com
- Documentation: https://docs.microsoft.com/azure/static-web-apps

### GitHub Support
- Repository: https://github.com/fingrant/proteance-website
- Documentation: https://docs.github.com

### Domain (GoDaddy)
- Portal: https://dcc.godaddy.com
- Support: GoDaddy customer service

---

## Quick Reference Commands

```powershell
# ===== Local Development =====
# Navigate to project
cd D:\CorpWebSite

# Pull latest changes
git pull

# Check status
git status

# View changes
git diff

# ===== Commit and Deploy =====
# Add all changes
git add -A

# Commit with message
git commit -m "Your message here"

# Push to GitHub (triggers deployment)
git push

# ===== Monitoring =====
# Check deployment status
gh run list --limit 1

# Watch deployment
gh run watch

# View commit history
git log --oneline -10

# ===== Azure CLI =====
# List custom domains
az staticwebapp hostname list --name proteance-website --resource-group ProteanceWebsite

# Show static web app details
az staticwebapp show --name proteance-website --resource-group ProteanceWebsite

# View application settings
az staticwebapp appsettings list --name proteance-website --resource-group ProteanceWebsite

# ===== DNS Testing =====
# Test domain resolution
nslookup www.proteance.com
nslookup proteance.com

# ===== Troubleshooting =====
# Clear local changes
git reset --hard origin/master

# Undo last commit (keep changes)
git reset --soft HEAD~1

# View file at specific commit
git show <commit-hash>:<file-path>
```

---

## Document Version

**Last Updated:** January 23, 2026
**Document Version:** 1.1
**Website Version:** Production
**Author:** Created during initial website development

---

## Changelog

### Version 1.1 - January 23, 2026
- Documentation committed to Git repository (commit 2effcc3)
- Ready for project handoff and future reference
- Verified all sections are current and accurate

### Version 1.0 - January 22, 2026
- Initial comprehensive documentation
- All sections complete
- Covers full website setup and deployment
- Includes troubleshooting guide
- Added collaboration workflows
