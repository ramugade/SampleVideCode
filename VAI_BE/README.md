# Vedang.AI Backend API

Backend API server for Vedang.AI - AI-Powered Retirement Planning Platform

## Features

- **User Authentication**
  - Email/Password registration and login
  - OAuth 2.0 integration (Google, Apple, Facebook)
  - JWT-based authentication
  - Password reset and email verification

- **Retirement Planning**
  - Create, read, update, delete retirement plans
  - Automatic calculations for retirement projections
  - Risk tolerance assessment
  - Goal tracking and recommendations

- **Security**
  - Password hashing with bcrypt
  - JWT token authentication
  - HTTP-only cookies
  - Helmet.js security headers
  - Rate limiting
  - CORS protection

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Passport.js, JWT
- **Validation**: Express Validator
- **Security**: Helmet, bcrypt, CORS

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB (local or cloud instance)
- OAuth credentials (Google, Apple, Facebook) - optional

### Installation

1. Install dependencies:
```bash
cd VAI_BE
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Configure environment variables in `.env`:
```env
# Required
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vedang-ai
JWT_SECRET=your-secret-key
SESSION_SECRET=your-session-secret
FRONTEND_URL=http://localhost:3000

# Optional - OAuth providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
# ... (see .env.example for all options)
```

4. Start MongoDB (if running locally):
```bash
mongod
```

5. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register with email/password | Public |
| POST | `/api/auth/login` | Login with email/password | Public |
| GET | `/api/auth/logout` | Logout user | Private |
| GET | `/api/auth/me` | Get current user | Private |
| PUT | `/api/auth/update-details` | Update user details | Private |
| PUT | `/api/auth/update-password` | Update password | Private |
| POST | `/api/auth/forgot-password` | Request password reset | Public |
| PUT | `/api/auth/reset-password/:token` | Reset password | Public |
| GET | `/api/auth/verify-email/:token` | Verify email | Public |

### OAuth Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/auth/google` | Initiate Google OAuth |
| GET | `/api/auth/google/callback` | Google OAuth callback |
| GET | `/api/auth/facebook` | Initiate Facebook OAuth |
| GET | `/api/auth/facebook/callback` | Facebook OAuth callback |
| POST | `/api/auth/apple` | Initiate Apple OAuth |
| POST | `/api/auth/apple/callback` | Apple OAuth callback |

### Users

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/users` | Get all users | Admin |
| GET | `/api/users/:id` | Get user by ID | Private |
| PUT | `/api/users/:id` | Update user | Private |
| DELETE | `/api/users/:id` | Delete user | Private |

### Retirement Plans

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/plans` | Create retirement plan | Private |
| GET | `/api/plans` | Get all user's plans | Private |
| GET | `/api/plans/stats` | Get plan statistics | Private |
| GET | `/api/plans/:id` | Get plan by ID | Private |
| PUT | `/api/plans/:id` | Update plan | Private |
| DELETE | `/api/plans/:id` | Delete plan | Private |

## Request/Response Examples

### Register User

**Request:**
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepass123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": null,
    "role": "user",
    "provider": "local",
    "isEmailVerified": false
  }
}
```

### Create Retirement Plan

**Request:**
```json
POST /api/plans
Authorization: Bearer <token>
{
  "currentAge": 35,
  "retirementAge": 65,
  "desiredAnnualIncome": 80000,
  "currentSavings": 50000,
  "monthlyContribution": 1000,
  "riskTolerance": "moderate"
}
```

**Response:**
```json
{
  "success": true,
  "plan": {
    "_id": "507f1f77bcf86cd799439012",
    "user": "507f1f77bcf86cd799439011",
    "currentAge": 35,
    "retirementAge": 65,
    "desiredAnnualIncome": 80000,
    "currentSavings": 50000,
    "monthlyContribution": 1000,
    "riskTolerance": "moderate",
    "projectedRetirementFund": 1234567.89,
    "sustainableAnnualIncome": 49382.71,
    "goalMet": false,
    "shortfall": 30617.29,
    "recommendedMonthlyIncrease": 620.34,
    "status": "active",
    "createdAt": "2025-01-15T10:30:00.000Z",
    "updatedAt": "2025-01-15T10:30:00.000Z"
  }
}
```

## OAuth Setup Guide

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:5000/api/auth/google/callback`
6. Add Client ID and Secret to `.env`

### Facebook OAuth

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add Facebook Login product
4. Configure OAuth redirect URI: `http://localhost:5000/api/auth/facebook/callback`
5. Add App ID and Secret to `.env`

### Apple OAuth

1. Go to [Apple Developer Portal](https://developer.apple.com/)
2. Create a new Service ID
3. Configure Sign in with Apple
4. Download private key (.p8 file)
5. Add credentials to `.env`

## Database Models

### User Model
- Email/password authentication
- OAuth provider linking (Google, Facebook, Apple)
- Email verification
- Password reset functionality
- Role-based access control

### Retirement Plan Model
- User-specific retirement plans
- Automatic financial calculations
- Risk tolerance assessment
- Goal tracking and projections

## Security Features

- Password hashing with bcrypt (10 rounds)
- JWT tokens with configurable expiration
- HTTP-only cookies for token storage
- CORS protection with whitelist
- Helmet.js for security headers
- Rate limiting on API endpoints
- Input validation with express-validator
- Secure session management

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [] // Optional validation errors
}
```

Common status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

## Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## Production Deployment

1. Set environment to production:
```env
NODE_ENV=production
```

2. Use production database URI
3. Set strong JWT_SECRET and SESSION_SECRET
4. Configure CORS for production frontend URL
5. Enable HTTPS
6. Set up process manager (PM2):

```bash
npm install -g pm2
pm2 start server.js --name vedang-api
pm2 save
```

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.
