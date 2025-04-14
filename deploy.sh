echo "🚀 Starting deployment..."

# Pull latest changes from Git
git pull

# Install PHP dependencies
composer install --optimize-autoloader --no-dev

# Run database migrations
php artisan migrate --force

# Install and build front-end assets
npm install
npm run build

# Cache config, routes, and views
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Clear previous caches just in case
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Optimize the app
php artisan optimize

# Build frontend again (optional, remove if not needed twice)
npm run build

# Re-cache again after clearing
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "✅ Deployment completed successfully!"
