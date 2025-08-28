// Admin Configuration - IMPORTANT: Change these before deploying to Firebase!
const ADMIN_CONFIG = {
    // Change these credentials before going live
    username: 'sahejpreet_admin',
    password: 'MySecurePass2025!',
    
    // Optional: Add IP restrictions (for extra security)
    allowedIPs: [], // Leave empty to allow all IPs
    
    // Session timeout (in minutes)
    sessionTimeout: 60
};

// Export for use in admin.html
if (typeof window !== 'undefined') {
    window.ADMIN_CONFIG = ADMIN_CONFIG;
}