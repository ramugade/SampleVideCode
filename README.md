# Vedang.AI - AI-Powered Retirement Planning

![Vedang.AI](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## Overview

Vedang.AI is an intelligent retirement planning platform that combines cutting-edge artificial intelligence with expert financial planning principles. Our interactive chat-based advisor helps users create personalized retirement strategies tailored to their unique goals, risk profiles, and financial situations.

## Features

- **AI-Powered Analysis**: Advanced algorithms analyze user data to create optimal retirement strategies
- **Interactive Chat Interface**: Natural conversation flow for gathering client information
- **Risk Assessment**: Comprehensive risk profiling with three investment approaches (Conservative, Moderate, Aggressive)
- **Personalized Planning**: Customized retirement plans based on individual circumstances
- **Real-Time Calculations**: Instant projections using compound interest and financial planning formulas
- **Social Authentication**: Login/signup with Google, Apple, and Facebook (ready for OAuth integration)
- **Email Authentication**: Traditional email/password registration and login
- **Responsive Design**: Beautiful, modern UI that works seamlessly across all devices
- **Goal Tracking**: Clear visualization of whether retirement goals are achievable

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: Custom CSS with modern design patterns
- **Fonts**: Inter font family from Google Fonts
- **Architecture**: Single Page Application (SPA)

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools or dependencies required!

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ramugade/SampleVideCode.git
cd SampleVideCode
```

2. Open the landing page:
```bash
# Simply open index.html in your browser
# Or use a local server (recommended):
python -m http.server 8000
# Then visit http://localhost:8000
```

## File Structure

```
SampleVideCode/
├── index.html          # Main landing page
├── styles.css          # All styling and responsive design
├── script.js           # Interactive chat functionality
└── README.md           # Project documentation
```

## How It Works

### The Planning Process

1. **Information Gathering**: The AI chat collects essential information:
   - Current age
   - Target retirement age
   - Desired annual retirement income
   - Current savings
   - Monthly contribution capacity

2. **Risk Assessment**: Users select their investment risk profile:
   - Conservative (5% expected annual return)
   - Moderate (7% expected annual return)
   - Aggressive (9% expected annual return)

3. **Plan Generation**: The system calculates:
   - Future value of investments using compound interest
   - Projected retirement fund size
   - Sustainable annual income (4% withdrawal rule)
   - Gap analysis and recommendations

### Financial Calculations

The system uses standard financial formulas:

**Future Value Calculation:**
```
FV = PV(1 + r)^n + PMT × [(1 + r)^n - 1] / r
```

Where:
- FV = Future Value
- PV = Present Value (current savings)
- PMT = Periodic Payment (monthly contribution)
- r = Interest rate per period
- n = Number of periods

**Sustainable Income:**
```
Annual Income = Total Retirement Fund × 4%
```

## Authentication System

Vedang.AI includes a comprehensive authentication system with social login integration support for Google, Apple, and Facebook.

### Features

- **Modal-Based Authentication**: Clean, non-intrusive modal popup for login/signup
- **Social Login Integration**: Ready for OAuth integration with:
  - Google OAuth 2.0
  - Apple Sign In
  - Facebook Login
- **Email/Password Authentication**: Traditional email-based signup and login
- **Form Validation**: Client-side validation for email format and password strength
- **Responsive Design**: Mobile-friendly authentication forms
- **Smooth Animations**: Professional fade-in and slide-up effects

### How to Use

1. **Sign Up**: Click the "Sign Up" button in the navigation
2. **Login**: Click the "Login" button in the navigation
3. **Social Login**: Choose from Google, Apple, or Facebook buttons
4. **Email/Password**: Fill in the form with your credentials
5. **Switch Forms**: Toggle between login and signup using the links at the bottom

### Implementation Notes

The current implementation includes:
- Complete UI for authentication
- Form validation and error handling
- Modal management and interactions
- Placeholder handlers for OAuth flows

**For Production**: Backend integration is required for:
- OAuth provider credentials (Google, Apple, Facebook)
- User database and session management
- API endpoints for authentication
- Secure token handling and storage
- Email verification system

### Backend Integration Guide

To integrate with a backend, you'll need to:

1. **Set up OAuth Applications**:
   - Google: Create project in Google Cloud Console
   - Apple: Register in Apple Developer Portal
   - Facebook: Set up app in Facebook Developers

2. **Update JavaScript Handlers**:
   - Replace alert messages in `handleSocialLogin()` with actual OAuth redirects
   - Implement proper API calls in `handleEmailSignup()` and `handleEmailLogin()`
   - Add JWT token management
   - Implement session persistence

3. **Create Backend Endpoints**:
   ```
   POST /api/auth/signup
   POST /api/auth/login
   POST /api/auth/social/google
   POST /api/auth/social/apple
   POST /api/auth/social/facebook
   GET  /api/auth/logout
   ```

## Features Breakdown

### Hero Section
- Eye-catching gradient design
- Clear value proposition
- Interactive statistics
- Animated chat preview

### Features Grid
- Six key features highlighted
- Custom icons with color-coded backgrounds
- Hover animations for interactivity

### How It Works
- Step-by-step process visualization
- Connected flow diagram
- Clear, concise explanations

### Interactive Chat Demo
- Full conversation flow
- Context-aware responses
- Real-time calculations
- Comprehensive plan generation
- Reset functionality for testing

### Authentication Modal
- Social login buttons for Google, Apple, and Facebook
- Email/password registration and login forms
- Form validation and error handling
- Smooth modal animations
- Toggle between login and signup
- Responsive mobile design

### Call-to-Action
- Strategic placement
- High-contrast design
- Clear next steps

## Customization

### Colors

The design uses CSS custom properties (variables) for easy theming:

```css
:root {
    --primary-color: #6366f1;      /* Main brand color */
    --primary-dark: #4f46e5;       /* Darker variant */
    --secondary-color: #8b5cf6;    /* Accent color */
    --text-dark: #1f2937;          /* Primary text */
    --text-light: #6b7280;         /* Secondary text */
}
```

### Chat Responses

Modify the `VedangAI` class in `script.js` to customize:
- Conversation flow
- Questions asked
- Calculation methods
- Response formatting

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **Initial Load**: < 1s (on 3G)
- **Page Size**: < 100KB total
- **No external dependencies** (except Google Fonts)
- **Optimized animations** for smooth 60fps performance

## Future Enhancements

- [x] User authentication UI (Google, Apple, Facebook social login)
- [x] Email/password authentication UI
- [ ] Backend API integration for authentication
- [ ] OAuth provider integration (Google, Apple, Facebook)
- [ ] User database and session management
- [ ] User dashboard and profile management
- [ ] Data persistence for retirement plans
- [ ] PDF report generation and download
- [ ] Email plan delivery
- [ ] Advanced tax optimization strategies
- [ ] Monte Carlo simulations for risk analysis
- [ ] Social Security integration
- [ ] Healthcare cost projections
- [ ] Inflation adjustments
- [ ] Multi-currency support
- [ ] Portfolio rebalancing recommendations
- [ ] Integration with financial accounts

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This tool provides educational estimates only. The projections are simplified and do not constitute financial advice. Actual investment returns vary and are not guaranteed. Please consult with a qualified financial advisor for personalized retirement planning.

## Contact

For questions or support, please contact:
- Email: hello@vedang.ai
- Website: [Vedang.AI](https://vedang.ai)

## Acknowledgments

- Inspired by modern FinTech applications
- Design principles from leading SaaS platforms
- Financial calculations based on standard retirement planning formulas

---

Built with care for a secure financial future 🚀
