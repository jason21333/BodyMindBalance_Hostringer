# 🚀 Body Mind Balance - Hostinger Deployment Guide

## 📋 Prerequisites
- Hostinger hosting account
- Domain name configured
- MySQL database created

## 🔧 Step 1: Hostinger Git Setup

### 1.1 Access Hostinger Control Panel
1. Login to your Hostinger control panel
2. Navigate to **"Git"** section in the left sidebar

### 1.2 Connect GitHub Repository
1. Click **"Connect Repository"**
2. Configure settings:
   - **Repository**: `jason21333/BodyMindBalance_Hostringer`
   - **Branch**: `main`
   - **Directory**: `/public_html`
   - **Auto-deploy**: ✅ Enable
   - **Deploy on push**: ✅ Enable

## 🗄️ Step 2: Database Setup

### 2.1 Create MySQL Database
1. Go to **"Databases"** → **"MySQL Databases"**
2. Create a new database
3. Note down:
   - Database name
   - Username
   - Password
   - Host (usually `localhost`)

### 2.2 Import Database Schema
1. Go to **"phpMyAdmin"**
2. Select your database
3. Import the schema from `php-backend/db/schema.sql`

## ⚙️ Step 3: Environment Configuration

### 3.1 Update Environment Variables
In Hostinger control panel, set these environment variables:

```bash
NEXT_PUBLIC_API_BASE_URL=https://yourdomain.com/php-backend/api
```

### 3.2 Update Database Configuration
Edit `php-backend/includes/config.php` with your database credentials:

```php
$db_host = 'localhost'; // Your database host
$db_name = 'your_database_name';
$db_user = 'your_database_user';
$db_pass = 'your_database_password';
```

## 🏗️ Step 4: Build Configuration

### 4.1 Build Commands (if available in Hostinger)
If Hostinger supports build commands, add these:

```bash
# Install dependencies
npm install
cd admin-website && npm install && cd ..

# Build main website
npm run build

# Build admin website
cd admin-website && npm run build && cd ..
```

### 4.2 Manual Build (if needed)
If auto-build doesn't work, run these commands locally:

```bash
# Build main website
npm install
npm run build

# Build admin website
cd admin-website
npm install
npm run build
cd ..

# Upload the .next/out folders to Hostinger
```

## 📁 Step 5: File Structure

After deployment, your file structure should be:

```
public_html/
├── index.html (main website)
├── admin/
│   ├── index.html (admin dashboard)
│   └── assets/
├── php-backend/
│   ├── api/
│   │   ├── appointments.php
│   │   ├── admin/
│   │   └── ...
│   └── includes/
└── .htaccess
```

## 🔗 Step 6: URL Structure

- **Main Website**: `https://yourdomain.com/`
- **Admin Dashboard**: `https://yourdomain.com/admin/`
- **API Endpoints**: `https://yourdomain.com/php-backend/api/`

## ✅ Step 7: Testing

### 7.1 Test Main Website
1. Visit your domain
2. Test appointment booking
3. Verify form submission

### 7.2 Test Admin Dashboard
1. Visit `https://yourdomain.com/admin/`
2. Check if appointments appear
3. Test dashboard functionality

### 7.3 Test API
1. Visit `https://yourdomain.com/php-backend/api/appointments.php`
2. Should return JSON data

## 🛠️ Troubleshooting

### Common Issues:

1. **404 Errors**
   - Check `.htaccess` files are uploaded
   - Verify file permissions (755 for folders, 644 for files)

2. **API Not Working**
   - Check database connection
   - Verify PHP configuration
   - Check CORS headers

3. **Build Errors**
   - Ensure Node.js is available (if using build commands)
   - Check environment variables

4. **Database Connection**
   - Verify database credentials
   - Check if database exists
   - Ensure proper permissions

## 📞 Support

If you encounter issues:
1. Check Hostinger error logs
2. Verify all files are uploaded correctly
3. Test database connection manually
4. Contact Hostinger support if needed

## 🔄 Auto-Deployment

Once configured, every push to the `main` branch will automatically:
1. Pull the latest code
2. Build the applications
3. Deploy to your hosting

## 🎉 Success!

Your healthcare website is now live with:
- ✅ Patient appointment booking
- ✅ Admin dashboard
- ✅ Real-time data sync
- ✅ Mobile-responsive design
- ✅ Professional healthcare UI 