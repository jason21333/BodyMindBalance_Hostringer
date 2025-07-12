# Body Mind Balance - Wellness & Medical Center

A modern healthcare website with appointment booking functionality and a separate admin dashboard.

## 🏥 Features

- **Main Website** (Port 3000)
  - Professional healthcare landing page
  - Appointment booking system
  - Service showcase
  - Doctor profiles
  - Patient testimonials
  - Contact forms

- **Admin Website** (Port 3002)
  - Dashboard with real-time statistics
  - Appointment management
  - Patient management
  - Real-time updates from main website

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL (optional, uses in-memory storage for development)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd bmb-website
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the main website**
```bash
npm run dev
```
The main website will be available at [http://localhost:3000](http://localhost:3000)

4. **Start the admin website** (in a separate terminal)
```bash
cd admin-website
npm install
npm run dev
```
The admin website will be available at [http://localhost:3002](http://localhost:3002)

## 📁 Project Structure

```
bmb-website/
├── app/                    # Main website (Next.js App Router)
│   ├── components/         # React components
│   ├── api/               # API routes
│   └── ...
├── admin-website/          # Admin dashboard (separate Next.js app)
│   ├── src/
│   │   ├── app/           # Admin pages
│   │   ├── lib/           # Database utilities
│   │   └── ...
│   └── ...
└── lib/                   # Shared database utilities
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database (optional for development)
POSTGRES_URL=your_postgres_connection_string

# Admin website URL (for real-time sync)
ADMIN_WEBSITE_URL=http://localhost:3002
```

### Database Setup

For production, set up a PostgreSQL database and run:

```bash
npm run setup-db
```

For development, the app uses in-memory storage by default.

## 🎯 Key Features

### Real-time Sync
- Appointments booked on the main website automatically appear in the admin dashboard
- 30-second auto-refresh on admin pages
- Live statistics and activity feeds

### Appointment Booking
- Available time slot validation
- Email notifications
- Service mapping
- Doctor assignment

### Admin Dashboard
- Appointment management (confirm/cancel/edit)
- Patient management
- Real-time statistics
- Search and filtering

## 🛠️ Development

### Main Website
- Built with Next.js 15
- Tailwind CSS for styling
- Framer Motion for animations
- Vercel Postgres for database

### Admin Website
- Separate Next.js application
- TypeScript support
- Real-time data updates
- Professional admin interface

## 📦 Deployment

### Main Website
```bash
npm run build
npm start
```

### Admin Website
```bash
cd admin-website
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
