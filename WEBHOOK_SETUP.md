# 🔗 Webhook Auto-Deployment Setup Guide

## 🎯 **Method 1: Hostinger Git Integration (Recommended)**

### **Step 1: Connect GitHub Repository**
1. **Login to Hostinger Control Panel**
2. **Navigate to "Git" section** in the left sidebar
3. **Click "Connect Repository"**
4. **Configure settings:**
   ```
   Repository: jason21333/BodyMindBalance_Hostringer
   Branch: main
   Directory: /public_html
   Auto-deploy: ✅ Enable
   Deploy on push: ✅ Enable
   ```

### **Step 2: Test Auto-Deployment**
The repository is now connected! Every push to the `main` branch will automatically:
1. **Pull latest code** from GitHub
2. **Build the applications** (if build commands are configured)
3. **Deploy to your hosting**

## 🚀 **Method 2: Custom Webhook (Advanced)**

If Hostinger doesn't support Git integration, you can set up a custom webhook:

### **Step 1: Create Webhook Endpoint**
Create a PHP file in your Hostinger hosting:

```php
<?php
// webhook.php - Place this in your public_html directory
header('Content-Type: application/json');

// Verify webhook secret (optional but recommended)
$secret = 'your_webhook_secret';
$signature = $_SERVER['HTTP_X_HUB_SIGNATURE_256'] ?? '';

if (!hash_equals('sha256=' . hash_hmac('sha256', file_get_contents('php://input'), $secret), $signature)) {
    http_response_code(401);
    die('Unauthorized');
}

// Execute deployment script
$output = shell_exec('cd /home/username/public_html && git pull origin main 2>&1');
$output .= shell_exec('npm install 2>&1');
$output .= shell_exec('npm run build 2>&1');

// Log the deployment
file_put_contents('deployment.log', date('Y-m-d H:i:s') . " - " . $output . "\n", FILE_APPEND);

echo json_encode(['status' => 'success', 'output' => $output]);
?>
```

### **Step 2: Configure GitHub Webhook**
1. **Go to your GitHub repository**
2. **Settings → Webhooks → Add webhook**
3. **Configure:**
   ```
   Payload URL: https://yourdomain.com/webhook.php
   Content type: application/json
   Secret: your_webhook_secret
   Events: Just the push event
   ```

## 🔧 **Method 3: GitHub Actions (Alternative)**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Hostinger

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: |
        npm install
        cd admin-website && npm install
    
    - name: Build applications
      run: |
        npm run build
        cd admin-website && npm run build
    
    - name: Deploy to Hostinger
      uses: easingthemes/ssh-deploy@main
      env:
        SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}
        REMOTE_HOST: ${{ secrets.REMOTE_HOST }}
        REMOTE_USER: ${{ secrets.REMOTE_USER }}
        SOURCE: "./"
        TARGET: "/home/username/public_html/"
```

## 📋 **Hostinger-Specific Setup**

### **Step 1: Enable SSH Access**
1. **Contact Hostinger support** to enable SSH access
2. **Get SSH credentials** from your hosting panel
3. **Generate SSH key** for GitHub Actions

### **Step 2: Configure Build Commands**
In Hostinger control panel, add these build commands:

```bash
# Install dependencies
npm install
cd admin-website && npm install && cd ..

# Build main website
npm run build

# Build admin website
cd admin-website && npm run build && cd ..

# Copy files to correct locations
cp -r .next/out/* public_html/
cp -r admin-website/.next/out/* public_html/admin/
cp -r php-backend/* public_html/php-backend/
```

## 🔍 **Testing Your Webhook**

### **Test Method 1 (Git Integration)**
1. **Make a change** to any file
2. **Commit and push:**
   ```bash
   git add .
   git commit -m "Test auto-deployment"
   git push
   ```
3. **Check Hostinger** for deployment status

### **Test Method 2 (Custom Webhook)**
1. **Visit your webhook URL** directly
2. **Check deployment logs**
3. **Verify files are updated**

## 🛠️ **Troubleshooting**

### **Common Issues:**

1. **Webhook not triggering**
   - Check webhook URL is correct
   - Verify secret matches
   - Check GitHub webhook logs

2. **Deployment fails**
   - Check file permissions (755 for folders, 644 for files)
   - Verify SSH access is enabled
   - Check deployment logs

3. **Build errors**
   - Ensure Node.js is available on hosting
   - Check environment variables
   - Verify package.json exists

### **Debug Commands:**
```bash
# Check webhook logs
tail -f deployment.log

# Test SSH connection
ssh username@yourdomain.com

# Check file permissions
ls -la public_html/
```

## 📞 **Support**

If you encounter issues:
1. **Check Hostinger error logs**
2. **Verify webhook configuration**
3. **Test SSH connection**
4. **Contact Hostinger support**

## ✅ **Success Indicators**

Your webhook is working when:
- ✅ Pushing to GitHub triggers deployment
- ✅ Files are updated on your hosting
- ✅ Website reflects changes immediately
- ✅ No errors in deployment logs

## 🎉 **Complete Setup**

Once configured, your workflow will be:
1. **Edit code** locally
2. **Push to GitHub**
3. **Webhook triggers automatically**
4. **Hostinger deploys changes**
5. **Website updates live**

Your healthcare website is now fully automated! 🏥✨ 