# BMB Website Deployment Guide for Hostinger

## Project Structure
```
yourdomain.com/
├── public_html/           # Hostinger web root
│   ├── index.html        # React app entry point
│   ├── static/           # React build files
│   └── php-backend/      # PHP API endpoints
│       ├── includes/
│       │   └── config.php
│       └── api/
│           ├── appointments.php
│           ├── patients.php
│           ├── contact.php
│           └── admin/
│               └── dashboard.php
└── database.sql          # MySQL schema
```

## Step 1: Set Up Database on Hostinger

1. **Login to Hostinger hPanel**
2. **Go to Databases → MySQL Databases**
3. **Create a new database:**
   - Database name: `bmb_clinic`
   - Username: `bmb_user`
   - Password: `your_secure_password`
4. **Import the database schema:**
   - Go to phpMyAdmin
   - Select your database
   - Import the `database.sql` file

## Step 2: Configure PHP Backend

1. **Upload PHP files to Hostinger:**
   - Upload the entire `php-backend/` folder to `public_html/`
2. **Update database credentials:**
   - Edit `public_html/php-backend/includes/config.php`
   - Replace placeholders with your actual Hostinger database credentials:
   ```php
   $dbname = 'bmb_clinic';
   $username = 'bmb_user';
   $password = 'your_secure_password';
   ```

## Step 3: Build and Deploy React Frontend

1. **Build the React app:**
   ```bash
   npm run build
   ```
2. **Upload React build files:**
   - Upload all files from `out/` or `build/` to `public_html/`
   - Make sure `index.html` is in the root of `public_html/`

## Step 4: Update API URLs

Replace `https://yourdomain.com` with your actual domain in these files:
- `app/components/AppointmentForm.js`
- `app/components/Contact.js`
- `admin-website/src/app/dashboard/page.tsx`
- `admin-website/src/app/appointments/page.tsx`
- `admin-website/src/app/patients/page.tsx`

## Step 5: Test the Deployment

1. **Test the main website:** `https://yourdomain.com`
2. **Test appointment booking:** Fill out the appointment form
3. **Test contact form:** Send a test message
4. **Test admin dashboard:** `https://yourdomain.com/admin`

## Database Schema (database.sql)

```sql
CREATE TABLE patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    date DATE NOT NULL,
    time TIME NOT NULL,
    service VARCHAR(50) NOT NULL,
    status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE doctors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    specialty VARCHAR(100),
    email VARCHAR(100)
);

CREATE TABLE services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2)
);

-- Insert sample data
INSERT INTO doctors (name, specialty, email) VALUES
('Dr. John Smith', 'Cardiology', 'john.smith@bmbclinic.com'),
('Dr. Sarah Johnson', 'Dermatology', 'sarah.johnson@bmbclinic.com');

INSERT INTO services (name, description, price) VALUES
('General Checkup', 'Comprehensive health assessment', 150.00),
('Cardiology Consultation', 'Heart health evaluation', 200.00),
('Dermatology Consultation', 'Skin condition assessment', 180.00);
```

## Troubleshooting

### Common Issues:

1. **404 Errors on API calls:**
   - Check that PHP files are in the correct location
   - Verify file permissions (644 for files, 755 for directories)

2. **Database Connection Errors:**
   - Verify database credentials in `config.php`
   - Check that MySQL is enabled in Hostinger

3. **CORS Errors:**
   - PHP files already include CORS headers
   - If issues persist, contact Hostinger support

4. **React App Not Loading:**
   - Ensure `index.html` is in the root of `public_html/`
   - Check that all static files are uploaded

## Security Notes

1. **Database Security:**
   - Use strong passwords for database
   - Limit database user permissions

2. **File Security:**
   - Keep `config.php` outside web root if possible
   - Use HTTPS for all API calls

3. **Input Validation:**
   - PHP endpoints include basic validation
   - Consider adding more robust validation

## Support

If you encounter issues:
1. Check Hostinger error logs
2. Test API endpoints directly in browser
3. Verify database connection
4. Contact Hostinger support if needed 