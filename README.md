# Vedang.AI - AI-Powered Retirement Planning

![Vedang.AI](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## Overview

Vedang.AI is an intelligent retirement planning platform that combines cutting-edge artificial intelligence with expert financial planning principles. Our interactive chat-based advisor helps users create personalized retirement strategies tailored to their unique goals, risk profiles, and financial situations.

This repository contains both the frontend and backend applications for the complete Vedang.AI platform.

## Project Structure

```
SampleVideCode/
├── VAI_FE/                 # Frontend Application
│   ├── index.html          # Landing page
│   ├── styles.css          # Styling
│   ├── script.js           # Interactive features
│   └── README.md           # Frontend documentation
│
├── VAI_BE/                 # Backend API
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions
│   ├── server.js           # Main server file
│   ├── package.json        # Dependencies
│   ├── .env.example        # Environment template
│   └── README.md           # Backend documentation
│
└── README.md               # This file
```

## Features

### Frontend
- **Modern Landing Page**: Hero, features, how-it-works sections
- **Authentication UI**: Modal-based login/signup with social providers
- **Interactive Chat Demo**: AI-powered retirement planning conversation
- **Responsive Design**: Mobile-first, works on all devices
- **No Dependencies**: Pure HTML/CSS/JavaScript

### Backend
- **RESTful API**: Express.js server with MongoDB
- **User Authentication**: JWT + OAuth 2.0 (Google, Apple, Facebook)
- **Retirement Planning**: CRUD operations for retirement plans
- **Automatic Calculations**: Compound interest, projections, recommendations
- **Security**: bcrypt, Helmet, CORS, rate limiting
- **Email Features**: Verification and password reset (ready to integrate)

## Technology Stack

### Frontend
- HTML5, CSS3, JavaScript (Vanilla)
- Google Fonts (Inter)
- No build process required

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: Passport.js, JWT, bcrypt
- **Validation**: Express Validator
- **Security**: Helmet, CORS

## Quick Start

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd VAI_FE
```

2. Serve with a local server:
```bash
# Using Python
python -m http.server 3000

# Using Node.js
npx http-server -p 3000
```

3. Open browser to `http://localhost:3000`

For detailed frontend instructions, see [VAI_FE/README.md](VAI_FE/README.md)

### Backend Setup

1. Navigate to backend directory:
```bash
cd VAI_BE
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start MongoDB (if running locally):
```bash
mongod
```

5. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

6. Server runs on `http://localhost:5000`

For detailed backend instructions, see [VAI_BE/README.md](VAI_BE/README.md)

## Environment Configuration

### Backend (.env)

Required variables:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vedang-ai
JWT_SECRET=your-secret-key
SESSION_SECRET=your-session-secret
FRONTEND_URL=http://localhost:3000
```

Optional OAuth variables:
```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret
APPLE_CLIENT_ID=your-apple-client-id
APPLE_TEAM_ID=your-apple-team-id
```

See `VAI_BE/.env.example` for complete list.

### Frontend Configuration

Update API URL in `VAI_FE/script.js`:
```javascript
const API_URL = 'http://localhost:5000';
```

## API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register with email/password |
| POST | `/api/auth/login` | Login with email/password |
| GET | `/api/auth/logout` | Logout user |
| GET | `/api/auth/me` | Get current user |
| GET | `/api/auth/google` | Google OAuth login |
| GET | `/api/auth/facebook` | Facebook OAuth login |
| POST | `/api/auth/apple` | Apple OAuth login |

### Retirement Plan Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/plans` | Create retirement plan |
| GET | `/api/plans` | Get all user plans |
| GET | `/api/plans/:id` | Get specific plan |
| PUT | `/api/plans/:id` | Update plan |
| DELETE | `/api/plans/:id` | Delete plan |
| GET | `/api/plans/stats` | Get plan statistics |

Full API documentation available in [VAI_BE/README.md](VAI_BE/README.md)

## OAuth Setup

### Google OAuth
1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create project and enable Google+ API
3. Create OAuth 2.0 credentials
4. Add redirect URI: `http://localhost:5000/api/auth/google/callback`
5. Add credentials to `.env`

### Facebook OAuth
1. Visit [Facebook Developers](https://developers.facebook.com/)
2. Create app and add Facebook Login
3. Add redirect URI: `http://localhost:5000/api/auth/facebook/callback`
4. Add credentials to `.env`

### Apple OAuth
1. Visit [Apple Developer Portal](https://developer.apple.com/)
2. Create Service ID
3. Configure Sign in with Apple
4. Download private key (.p8)
5. Add credentials to `.env`

## Database Models

### User Model
- Email/password or OAuth authentication
- Profile information (name, avatar, role)
- Email verification
- Password reset tokens
- Account status

### Retirement Plan Model
- User-specific plans
- Financial data (age, income, savings, contributions)
- Risk tolerance
- Calculated projections
- Goal tracking

## Development Workflow

1. **Start Backend** (Terminal 1):
```bash
cd VAI_BE
npm run dev
```

2. **Start Frontend** (Terminal 2):
```bash
cd VAI_FE
python -m http.server 3000
```

3. **Access Application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - API Health: http://localhost:5000/api/health

## Testing

### Backend Tests
```bash
cd VAI_BE
npm test
```

### Frontend
- Manual testing in browser
- Check console for errors
- Test responsive design
- Verify all interactions

## Deployment

### Frontend Deployment
Deploy to static hosting (Netlify, Vercel, GitHub Pages):
```bash
cd VAI_FE
netlify deploy --prod
```

### Backend Deployment
Deploy to Node.js hosting (Heroku, AWS, DigitalOcean):
```bash
cd VAI_BE
# Set environment variables
# Deploy using platform-specific commands
```

See individual READMEs for detailed deployment instructions.

## Security Considerations

- [ ] Use strong JWT_SECRET in production
- [ ] Enable HTTPS for both frontend and backend
- [ ] Configure CORS properly for production domains
- [ ] Use secure session secrets
- [ ] Enable rate limiting
- [ ] Validate all user inputs
- [ ] Keep dependencies updated
- [ ] Use environment variables for secrets
- [ ] Implement proper error handling
- [ ] Add logging and monitoring

## Features Roadmap

- [x] User authentication (email/password)
- [x] OAuth integration (Google, Apple, Facebook)
- [x] Retirement plan CRUD
- [x] Financial calculations
- [ ] Email service integration
- [ ] PDF report generation
- [ ] Dashboard UI
- [ ] Real-time notifications
- [ ] Advanced analytics
- [ ] Tax optimization
- [ ] Social Security integration
- [ ] Investment portfolio tracking
- [ ] Mobile app (React Native)

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## Troubleshooting

### Backend Issues

**MongoDB connection fails:**
- Check if MongoDB is running
- Verify MONGODB_URI in .env
- Ensure MongoDB is accessible

**OAuth not working:**
- Verify credentials in .env
- Check redirect URIs match
- Ensure callbacks are configured

### Frontend Issues

**API calls failing:**
- Check if backend is running
- Verify API_URL in script.js
- Check CORS configuration
- Inspect browser console

**Authentication not working:**
- Check if cookies are enabled
- Verify token storage
- Check network requests

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions and support:
- Email: hello@vedang.ai
- GitHub Issues: [Create an issue](https://github.com/ramugade/SampleVideCode/issues)

## Acknowledgments

- Inspired by modern FinTech applications
- Design principles from leading SaaS platforms
- Financial calculations based on standard retirement planning formulas
- OAuth implementation following best practices

---

**Built with ❤️ for a secure financial future**
