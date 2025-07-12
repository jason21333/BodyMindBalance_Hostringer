# BMB Healthcare - Dual Website Architecture Documentation

## 📋 Overview

This document describes the dual-website architecture for BMB Healthcare, consisting of:
- **Main Website**: Public-facing patient portal (bmb-website.com)
- **Admin Website**: Staff-only administrative dashboard (admin.bmb-website.com)

## 🏗️ Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    BMB Healthcare System                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐    ┌─────────────────┐                   │
│  │   Main Website  │    │  Admin Website  │                   │
│  │  (bmb-website)  │    │ (admin.bmb.com) │                   │
│  │                 │    │                 │                   │
│  │ • Patient Portal│    │ • Admin Dashboard│                   │
│  │ • Appointment   │    │ • Patient Mgmt  │                   │
│  │   Booking       │    │ • Appointment   │                   │
│  │ • Service Info  │    │   Management    │                   │
│  │ • Contact Forms │    │ • Reports       │                   │
│  └─────────────────┘    └─────────────────┘                   │
│           │                       │                           │
│           └───────────┬───────────┘                           │
│                       │                                       │
│           ┌─────────────────────────┐                         │
│           │    Shared API Backend   │                         │
│           │  (appointments, users,  │                         │
│           │   doctors, services)    │                         │
│           └─────────────────────────┘                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 🎯 Key Features

### Main Website (Public)
- ✅ **Patient Appointment Booking**
- ✅ **Service Information**
- ✅ **Doctor Profiles**
- ✅ **Contact Forms**
- ✅ **Blog/Health Articles**
- ✅ **SEO Optimized**

### Admin Website (Staff Only)
- ✅ **Real-time Dashboard**
- ✅ **Appointment Management**
- ✅ **Patient Records**
- ✅ **Reports & Analytics**
- ✅ **Staff Management**
- ✅ **Secure Access Control**

## 🔄 Data Flow

### 1. Appointment Booking Flow
```
Patient → Main Website → API → Database → Admin Dashboard (Real-time)
```

### 2. Admin Management Flow
```
Admin → Admin Website → API → Database → Main Website (Real-time)
```

### 3. Real-time Updates
- **WebSocket Connections**: Both sites get live updates
- **Auto-refresh**: 30-second intervals
- **Event-driven**: Changes trigger updates everywhere

## 🛠️ Technical Implementation

### Shared Components

#### Database Layer
```javascript
// Both websites use the same database utilities
/lib/db.js
├── createUser()
├── createAppointment()
├── getAllAppointments()
├── updateAppointmentStatus()
├── getDashboardStats()
└── getInMemoryDB()
```

#### API Endpoints
```javascript
// Shared API structure
/api/appointments     // Create, read appointments
/api/admin/stats      // Dashboard statistics
/api/admin/appointments // Admin appointment management
/api/doctors          // Doctor information
/api/services         // Service catalog
```

### Security Features

#### Admin Website Security
- 🔒 **IP Whitelisting**: Only clinic IPs can access
- 🔐 **VPN Requirement**: Secure network access
- 🛡️ **Two-Factor Authentication**: Enhanced login security
- ⏰ **Session Timeouts**: Automatic logout
- 📝 **Audit Logging**: Track all admin actions

#### Data Protection
- 🔒 **Encrypted Storage**: All patient data encrypted
- 🚫 **No Public Access**: Admin routes not exposed
- 📊 **HIPAA Compliance**: Healthcare data standards
- 🔍 **Access Logs**: Monitor all data access

## 📁 Project Structure

### Main Website (`bmb-website/`)
```
bmb-website/
├── app/
│   ├── components/          # Shared UI components
│   ├── api/                # Public API endpoints
│   ├── admin/              # Admin routes (legacy)
│   └── page.js             # Public pages
├── lib/
│   └── db.js              # Database utilities
└── public/                # Static assets
```

### Admin Website (`admin-website/`)
```
admin-website/
├── src/
│   ├── app/
│   │   ├── dashboard/      # Admin dashboard
│   │   ├── appointments/   # Appointment management
│   │   ├── patients/       # Patient management
│   │   ├── reports/        # Analytics & reports
│   │   └── api/admin/      # Admin API endpoints
│   ├── components/         # Admin-specific components
│   └── lib/
│       └── db.js          # Shared database utilities
└── public/                # Admin assets
```

## 🚀 Deployment Strategy

### Production Setup
```bash
# Main Website
Domain: bmb-website.com
Hosting: Vercel/Netlify
SSL: Automatic

# Admin Website  
Domain: admin.bmb-website.com
Hosting: Vercel/Netlify
SSL: Automatic
IP Restrictions: Clinic IPs only
```

### Environment Variables
```env
# Shared Database
DATABASE_URL=postgresql://...
POSTGRES_URL=postgresql://...

# Admin Website Only
ADMIN_IP_WHITELIST=192.168.1.0/24
ADMIN_VPN_REQUIRED=true
ADMIN_2FA_ENABLED=true
```

## 🔧 Development Workflow

### 1. Local Development
```bash
# Main Website
cd bmb-website
npm run dev
# http://localhost:3000

# Admin Website
cd admin-website  
npm run dev
# http://localhost:3001
```

### 2. Database Sync
```bash
# Both sites use same database
# Changes in one site reflect in the other
# Real-time updates via API calls
```

### 3. Testing
```bash
# Test appointment booking on main site
# Verify admin dashboard updates
# Check real-time synchronization
```

## 📊 Monitoring & Analytics

### Dashboard Metrics
- **Total Appointments**: Real-time count
- **Pending Appointments**: Awaiting confirmation
- **Active Patients**: Unique patients with appointments
- **New Patients This Month**: Monthly growth

### Real-time Features
- ⚡ **Live Updates**: 30-second refresh intervals
- 📈 **Dynamic Stats**: Auto-updating numbers
- 🔄 **Status Changes**: Instant appointment updates
- 📱 **Mobile Responsive**: Works on all devices

## 🔐 Security Best Practices

### Access Control
1. **IP Restrictions**: Only clinic networks
2. **VPN Access**: Secure network connection
3. **2FA Authentication**: Enhanced login security
4. **Session Management**: Automatic timeouts
5. **Audit Trails**: Complete action logging

### Data Protection
1. **Encryption**: All data encrypted at rest
2. **HTTPS Only**: Secure connections
3. **Input Validation**: Prevent injection attacks
4. **Rate Limiting**: Prevent abuse
5. **Backup Strategy**: Regular data backups

## 🚀 Future Enhancements

### Phase 1: Core Features ✅
- [x] Separate admin website
- [x] Real-time dashboard
- [x] Appointment management
- [x] Patient records

### Phase 2: Advanced Features 🚧
- [ ] Advanced reporting
- [ ] Email notifications
- [ ] SMS reminders
- [ ] Payment integration

### Phase 3: Enterprise Features 📋
- [ ] Multi-location support
- [ ] Advanced analytics
- [ ] Mobile app
- [ ] Telemedicine integration

## 🛠️ Troubleshooting

### Common Issues

#### 1. Real-time Updates Not Working
```bash
# Check API endpoints
curl http://localhost:3000/api/admin/stats
curl http://localhost:3001/api/admin/stats

# Verify database connection
npm run db:check
```

#### 2. Admin Access Issues
```bash
# Check IP restrictions
# Verify VPN connection
# Clear browser cache
# Check session timeout
```

#### 3. Data Sync Problems
```bash
# Restart both applications
# Check database connection
# Verify API endpoints
# Clear browser cache
```

## 📞 Support & Maintenance

### Development Team
- **Frontend**: React/Next.js specialists
- **Backend**: Node.js/PostgreSQL experts
- **DevOps**: Deployment & security
- **QA**: Testing & quality assurance

### Maintenance Schedule
- **Daily**: Database backups
- **Weekly**: Security updates
- **Monthly**: Performance optimization
- **Quarterly**: Feature updates

## 📚 API Documentation

### Main Website APIs
```javascript
POST /api/appointments     // Book appointment
GET  /api/doctors          // Get doctors
GET  /api/services         // Get services
POST /api/contact          // Contact form
```

### Admin Website APIs
```javascript
GET  /api/admin/stats      // Dashboard statistics
GET  /api/admin/appointments // All appointments
PATCH /api/admin/appointments // Update status
GET  /api/admin/patients   // Patient records
```

## 🎯 Benefits of This Architecture

### For Patients
- ✅ **Consistent Experience**: Same booking flow
- ✅ **Real-time Updates**: See appointment status instantly
- ✅ **Reliable Data**: No discrepancies between sites

### For Admins
- ✅ **Focused Interface**: Clean, admin-only features
- ✅ **Better Security**: Isolated admin environment
- ✅ **Professional Tools**: Advanced management features

### For Development
- ✅ **Shared Codebase**: Common utilities and components
- ✅ **Easier Maintenance**: One backend to maintain
- ✅ **Cost Effective**: Shared hosting and infrastructure

---

**Last Updated**: December 2024
**Version**: 1.0.0
**Status**: Production Ready 