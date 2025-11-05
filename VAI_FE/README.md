# Vedang.AI Frontend

Frontend application for Vedang.AI - AI-Powered Retirement Planning Platform

## Features

- **Modern Landing Page**
  - Hero section with animated chat preview
  - Features showcase grid
  - How it works section
  - Interactive chat demo
  - Call-to-action sections

- **Authentication UI**
  - Modal-based login/signup
  - Social login buttons (Google, Apple, Facebook)
  - Email/password authentication forms
  - Form validation
  - Responsive mobile design

- **Interactive Chat Demo**
  - AI-powered conversation flow
  - Real-time retirement calculations
  - Risk assessment
  - Personalized plan generation
  - Context-aware responses

## Tech Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with custom properties
- **JavaScript (Vanilla)**: No framework dependencies
- **Google Fonts**: Inter font family

## File Structure

```
VAI_FE/
├── index.html          # Main landing page
├── styles.css          # All styling and responsive design
├── script.js           # Interactive functionality
└── README.md           # This file
```

## Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools or dependencies required!

### Running Locally

#### Option 1: Direct File Access
Simply open `index.html` in your browser:
```bash
cd VAI_FE
open index.html  # macOS
# or
start index.html  # Windows
# or
xdg-open index.html  # Linux
```

#### Option 2: Local Server (Recommended)

Using Python:
```bash
cd VAI_FE
python -m http.server 3000
# Visit http://localhost:3000
```

Using Node.js:
```bash
cd VAI_FE
npx http-server -p 3000
# Visit http://localhost:3000
```

Using PHP:
```bash
cd VAI_FE
php -S localhost:3000
# Visit http://localhost:3000
```

## Connecting to Backend

To connect the frontend to the backend API, update the JavaScript in `script.js`:

### Current Implementation (Demo Mode)
The frontend currently shows alert messages for authentication actions.

### Backend Integration

Replace the placeholder functions with actual API calls:

```javascript
// In script.js - AuthModal class

handleSocialLogin(provider) {
  // Replace this:
  alert(`${provider} authentication would be initiated here...`);

  // With this:
  window.location.href = `${API_URL}/api/auth/${provider.toLowerCase()}`;
}

async handleEmailSignup(form) {
  const formData = {
    name: form.signupName.value,
    email: form.signupEmail.value,
    password: form.signupPassword.value
  };

  // Validate inputs...

  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
      credentials: 'include'
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem('token', data.token);
      window.location.href = '/dashboard';
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('Signup error:', error);
    alert('Error creating account');
  }
}
```

### Configuration

Add this to the top of `script.js`:

```javascript
const API_URL = 'http://localhost:5000'; // Backend URL
```

## Features Overview

### Landing Page Sections

1. **Navigation**
   - Logo and branding
   - Feature links
   - Login/Signup buttons

2. **Hero Section**
   - Value proposition
   - Call-to-action buttons
   - Statistics showcase
   - Animated chat preview

3. **Features Grid**
   - 6 key features with icons
   - Hover animations
   - Color-coded backgrounds

4. **How It Works**
   - 3-step process
   - Connected flow diagram
   - Clear explanations

5. **Interactive Chat Demo**
   - Full conversation flow
   - Financial calculations
   - Plan generation
   - Reset functionality

6. **Call-to-Action**
   - Gradient background
   - Prominent CTA button

7. **Footer**
   - Links and navigation
   - Contact information
   - Copyright notice

### Authentication Modal

- **Features**:
  - Social login (Google, Apple, Facebook)
  - Email/password forms
  - Form validation
  - Toggle between login/signup
  - Smooth animations
  - Mobile responsive

- **Interactions**:
  - Click "Login" or "Sign Up" in nav
  - Click social login buttons
  - Fill email/password forms
  - Toggle between forms
  - Close with X, overlay, or Escape key

### Chat Demo

The chat demo simulates the retirement planning process:

1. **Information Gathering**:
   - Current age and retirement age
   - Desired annual income
   - Current savings
   - Monthly contribution

2. **Risk Assessment**:
   - Conservative (5% return)
   - Moderate (7% return)
   - Aggressive (9% return)

3. **Plan Generation**:
   - Future value calculations
   - Sustainable income (4% rule)
   - Goal achievement status
   - Recommendations

## Customization

### Colors

Edit CSS variables in `styles.css`:

```css
:root {
    --primary-color: #6366f1;      /* Main brand color */
    --primary-dark: #4f46e5;       /* Darker variant */
    --secondary-color: #8b5cf6;    /* Accent color */
    --text-dark: #1f2937;          /* Primary text */
    --text-light: #6b7280;         /* Secondary text */
}
```

### Chat Behavior

Modify the `VedangAI` class in `script.js`:
- Update conversation stages
- Modify financial calculations
- Change response formatting
- Adjust validation rules

### Authentication Flow

Update the `AuthModal` class in `script.js`:
- Modify form fields
- Change validation rules
- Update OAuth redirect URLs
- Customize success/error messages

## Responsive Design

The site is fully responsive with breakpoints:

- **Desktop**: > 768px
  - Full navigation
  - Two-column layouts
  - Large fonts and spacing

- **Tablet**: 480px - 768px
  - Stacked layouts
  - Medium fonts
  - Adjusted navigation

- **Mobile**: < 480px
  - Single column
  - Compact navigation
  - Mobile-optimized forms

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Initial load: < 1s on 3G
- Total page size: < 100KB
- No external dependencies (except Google Fonts)
- Optimized animations for 60fps
- Minimal JavaScript bundle

## Deployment

### Static Hosting

Deploy to any static hosting service:

**Netlify:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd VAI_FE
netlify deploy --prod
```

**Vercel:**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd VAI_FE
vercel --prod
```

**GitHub Pages:**
```bash
# Push to GitHub
git add .
git commit -m "Deploy frontend"
git push origin main

# Enable GitHub Pages in repository settings
```

### Environment Configuration

For production deployment:

1. Update API_URL to production backend URL
2. Configure CORS on backend to allow frontend domain
3. Update OAuth redirect URLs in provider settings
4. Enable HTTPS for secure cookies

## Future Enhancements

- [ ] TypeScript migration
- [ ] Build process with Vite/Webpack
- [ ] State management (Redux/Zustand)
- [ ] Progressive Web App (PWA)
- [ ] Offline support
- [ ] Advanced animations with Framer Motion
- [ ] Component library integration
- [ ] Automated testing (Jest, Cypress)
- [ ] Performance monitoring
- [ ] A/B testing framework

## Accessibility

- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Focus management
- Color contrast compliance
- Screen reader friendly

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.
