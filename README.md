# 🚗 Rentify - Modern Car Rental Platform

A full-stack car rental platform built with Next.js, TypeScript, and Supabase. Rentify provides a seamless car rental experience with modern UI, real-time booking, and comprehensive fleet management.

![Rentify Platform](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-15.4.1-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![Supabase](https://img.shields.io/badge/Database-Supabase-green)

## 🌟 Features

### 🔥 Core Features
- **Modern Car Fleet Management** - Comprehensive car inventory with detailed specifications
- **Real-time Booking System** - Instant booking with availability checking
- **Multi-language Support** - Internationalization with English and Spanish
- **Responsive Design** - Mobile-first approach with beautiful UI
- **Advanced Search & Filtering** - Find the perfect car with smart filters
- **Pricing Comparison** - Multi-provider pricing with best deals highlighting
- **User Authentication** - Secure JWT-based authentication system
- **Admin Dashboard** - Complete fleet and booking management
- **Analytics & Reporting** - Comprehensive business insights

### 🎨 UI/UX Features
- **Glassmorphism Design** - Modern glass-effect hero sections
- **3D Animations** - Interactive orbital elements and smooth transitions
- **Professional Components** - Radix UI with custom styling
- **Dark/Light Mode** - Seamless theme switching
- **Loading States** - Skeleton loaders and smooth transitions
- **Toast Notifications** - Real-time feedback for user actions

### 🔧 Technical Features
- **TypeScript Full-Stack** - End-to-end type safety
- **RESTful API** - Well-structured backend with Express.js
- **Database Relations** - Normalized PostgreSQL schema
- **File Upload** - Cloudinary integration for car images
- **Input Validation** - Comprehensive validation with Joi schemas
- **Error Handling** - Centralized error management
- **Logging System** - Winston logger with file rotation
- **Security** - Helmet, CORS, rate limiting, and bcrypt
- **Testing Ready** - Structured for unit and integration tests

## 🏗️ Architecture

```
Rentify/
├── Rentify-frontend/          # Next.js 15 Frontend
│   ├── src/
│   │   ├── app/              # App Router pages
│   │   ├── components/       # Reusable UI components
│   │   ├── contexts/         # React contexts
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utilities and configurations
│   │   └── types/           # TypeScript type definitions
│   └── public/              # Static assets
└── Rentify-backend/          # Express.js Backend
    ├── src/
    │   ├── controllers/      # Route controllers
    │   ├── middleware/       # Custom middleware
    │   ├── models/          # Database models
    │   ├── routes/          # API routes
    │   ├── services/        # Business logic
    │   ├── types/           # TypeScript types
    │   └── utils/           # Helper functions
    ├── sql/                 # Database schemas
    └── scripts/             # Setup and utility scripts
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- Supabase account and project
- Cloudinary account (for image uploads)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/rentify.git
cd rentify
```

### 2. Backend Setup
```bash
cd Rentify-backend
npm install

# Create environment file
cp .env.example .env
# Edit .env with your configuration
```

**Backend Environment Variables:**
```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Database
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Authentication
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

# File Upload
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

# Email Service (Optional)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

```bash
# Setup database and start server
npm run setup
npm run dev
```

### 3. Frontend Setup
```bash
cd ../Rentify-frontend
npm install

# Create environment file
cp .env.example .env.local
# Edit .env.local with your configuration
```

**Frontend Environment Variables:**
```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Supabase (Frontend)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

```bash
# Setup and start development server
npm run setup
npm run dev
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api
- **API Documentation**: http://localhost:3001/api/docs

## 📱 Pages & Features

### Public Pages
- **🏠 Homepage** - Hero section with featured cars and search
- **🚗 Explore Cars** - Complete car catalog with advanced filtering
- **📋 Car Details** - Detailed car information and booking
- **📞 Contact** - Contact form and information
- **ℹ️ About** - Company information and mission

### User Dashboard
- **👤 Profile Management** - Personal information and preferences
- **📅 My Bookings** - Current and past reservations
- **⭐ Reviews** - Rate and review rental experiences
- **💳 Payment History** - Transaction history and invoices

### Admin Panel
- **📊 Analytics Dashboard** - Business metrics and insights
- **🚙 Fleet Management** - Add, edit, and manage vehicles
- **📋 Booking Management** - View and manage all reservations
- **👥 User Management** - Customer account administration
- **📈 Reports** - Generate business reports

## 🛠️ API Documentation

### Authentication Endpoints
```
POST   /api/auth/register     # User registration
POST   /api/auth/login        # User login
POST   /api/auth/logout       # User logout
GET    /api/auth/me           # Get current user
PUT    /api/auth/profile      # Update profile
```

### Car Management
```
GET    /api/cars              # Get all cars
GET    /api/cars/:id          # Get car by ID
POST   /api/cars              # Create car (Admin)
PUT    /api/cars/:id          # Update car (Admin)
DELETE /api/cars/:id          # Delete car (Admin)
POST   /api/cars/:id/images   # Upload car images
```

### Booking System
```
GET    /api/bookings          # Get user bookings
POST   /api/bookings          # Create booking
GET    /api/bookings/:id      # Get booking details
PUT    /api/bookings/:id      # Update booking
DELETE /api/bookings/:id      # Cancel booking
```

### Analytics & Reports
```
GET    /api/analytics/overview    # Dashboard overview
GET    /api/analytics/bookings    # Booking analytics
GET    /api/analytics/revenue     # Revenue analytics
GET    /api/analytics/cars        # Car performance
```

## 🎨 UI Components

### Core Components
- **Hero3D** - Interactive 3D hero section with glassmorphism
- **CarCard** - Feature-rich car display cards
- **EnhancedPricingCard** - Professional pricing comparison
- **Header** - Responsive navigation with authentication
- **Footer** - Comprehensive footer with links

### Form Components
- **Input** - Styled input fields with validation
- **Select** - Custom dropdown selectors
- **DatePicker** - Advanced date selection
- **FileUpload** - Drag-and-drop file uploads

### Layout Components
- **Sidebar** - Collapsible navigation sidebar
- **Modal** - Accessible modal dialogs
- **Carousel** - Touch-friendly image carousels
- **Pagination** - Smart pagination controls

## 📊 Database Schema

### Core Tables
```sql
-- Users table
users (
  id, email, password_hash, first_name, last_name,
  phone, role, created_at, updated_at
)

-- Cars table
cars (
  id, make, model, year, price_per_day, category,
  transmission, fuel_type, seats, status, images,
  features, created_at, updated_at
)

-- Bookings table
bookings (
  id, user_id, car_id, start_date, end_date,
  total_amount, status, payment_status,
  created_at, updated_at
)
```

## 🔧 Development

### Available Scripts

#### Backend Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run setup        # Initialize database and setup
npm run migrate      # Run database migrations
npm run test         # Run tests
npm run lint         # Run ESLint
```

#### Frontend Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run setup        # Setup project dependencies
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

### Code Style & Standards
- **TypeScript** - Strict mode enabled
- **ESLint** - Configured for Next.js and Node.js
- **Prettier** - Code formatting
- **Husky** - Git hooks for quality checks

## 🚀 Deployment

### Frontend (Vercel)
```bash
# Deploy to Vercel
npm run build
vercel --prod
```

### Backend (Railway/Heroku)
```bash
# Build and deploy
npm run build
# Configure your deployment platform with environment variables
```

### Environment Configuration
Ensure all environment variables are properly configured in your deployment platform.

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt for secure password storage
- **Input Validation** - Comprehensive validation with Joi schemas
- **CORS Protection** - Configured for specific origins
- **Rate Limiting** - API rate limiting to prevent abuse
- **Helmet.js** - Security headers and protection
- **SQL Injection Prevention** - Parameterized queries
- **XSS Protection** - Input sanitization and CSP headers

## 📈 Performance

- **Next.js Optimization** - Automatic code splitting and optimization
- **Image Optimization** - Next.js Image component with lazy loading
- **Caching Strategy** - Smart caching for API responses
- **Bundle Analysis** - Webpack bundle analyzer integration
- **Lighthouse Score** - 90+ performance score target

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript strict mode
- Write tests for new features
- Update documentation for API changes
- Follow the existing code style
- Create meaningful commit messages

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Lead Developer** - Full-stack development and architecture
- **UI/UX Designer** - User interface and experience design
- **DevOps Engineer** - Deployment and infrastructure

## 📞 Support

For support, email faizanafzaal868@gmail.com.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Supabase](https://supabase.com/) - Backend as a service
- [Radix UI](https://www.radix-ui.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Lucide React](https://lucide.dev/) - Icon library

---

**Built with ❤️ for the modern car rental experience**
