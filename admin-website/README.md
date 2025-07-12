# BMB Healthcare Admin Website

This is the administrative dashboard for BMB Healthcare, providing staff with tools to manage appointments, patients, and clinic operations.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Access to the shared database

### Installation

1. **Clone and install dependencies**
```bash
cd admin-website
npm install
```

2. **Set up environment variables**
```bash
# Copy the environment variables from the main website
cp ../bmb-website/.env.local .env.local
```

3. **Start development server**
```bash
npm run dev
```

The admin website will be available at `http://localhost:3001`

## 🏗️ Architecture

This admin website works in harmony with the main BMB website:

- **Main Website**: `http://localhost:3000` (Patient portal)
- **Admin Website**: `http://localhost:3001` (Staff dashboard)
- **Shared Database**: Both sites use the same data

## 📊 Features

### Real-time Dashboard
- Live appointment statistics
- Recent activity feed
- Auto-refresh every 30 seconds
- Color-coded status indicators

### Appointment Management
- View all appointments
- Update appointment status
- Filter by status (pending, confirmed, cancelled)
- Real-time updates

### Patient Management
- View patient records
- Track appointment history
- Manage patient information

### Reports & Analytics
- Generate reports
- View clinic statistics
- Export data

## 🔐 Security

### Access Control
- IP whitelisting (production)
- VPN requirement (production)
- Two-factor authentication
- Session timeouts

### Data Protection
- Encrypted data storage
- HTTPS only
- Input validation
- Audit logging

## 🛠️ Development

### Available Scripts
```bash
npm run dev          # Start development server (port 3001)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript check
```

### Project Structure
```
src/
├── app/
│   ├── dashboard/           # Main dashboard
│   ├── appointments/        # Appointment management
│   ├── patients/           # Patient management
│   ├── reports/            # Reports & analytics
│   └── api/admin/          # Admin API endpoints
├── components/             # Reusable components
└── lib/
    └── db.js              # Database utilities
```

## 🔄 Real-time Features

### Auto-refresh
- Dashboard stats update every 30 seconds
- Recent activity refreshes automatically
- No manual refresh needed

### Live Updates
- Appointment status changes reflect immediately
- New bookings appear in real-time
- Patient data stays synchronized

## 📱 Responsive Design

The admin interface is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile devices

## 🚀 Deployment

### Production Setup
```bash
# Build the application
npm run build

# Deploy to Vercel/Netlify
# Configure environment variables
# Set up IP restrictions
```

### Environment Variables
```env
DATABASE_URL=postgresql://...
POSTGRES_URL=postgresql://...
ADMIN_IP_WHITELIST=192.168.1.0/24
ADMIN_VPN_REQUIRED=true
ADMIN_2FA_ENABLED=true
```

## 🔗 Integration

### Shared Database
Both websites use the same database utilities:
- `lib/db.js` - Database functions
- Real-time data synchronization
- Consistent data across both sites

### API Endpoints
```javascript
GET  /api/admin/stats      // Dashboard statistics
GET  /api/admin/appointments // All appointments
PATCH /api/admin/appointments // Update status
```

## 📞 Support

For technical support or questions:
- Check the main documentation: `../ADMIN_WEBSITE_DOCUMENTATION.md`
- Review the API documentation
- Contact the development team

## 📄 License

This project is proprietary to BMB Healthcare.

---

**Version**: 1.0.0  
**Last Updated**: December 2024  
**Status**: Production Ready
