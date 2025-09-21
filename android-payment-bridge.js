// Android Payment Bridge for Google Play Billing
// Interfaces with native Android code for in-app purchases

class AndroidPaymentBridge {
    constructor() {
        this.isAndroid = this.detectAndroidEnvironment();
        this.billingClient = null;
        this.availableProducts = [];
        this.initializeBridge();
    }

    detectAndroidEnvironment() {
        // Check if running in Android WebView/Capacitor
        return !!(window.AndroidBridge || 
                 window.webkit?.messageHandlers?.AndroidBridge ||
                 navigator.userAgent.includes('wv') ||
                 window.capacitor);
    }

    initializeBridge() {
        if (!this.isAndroid) {
            console.log('Not running on Android, payment bridge disabled');
            return;
        }

        // Initialize connection to native Android code
        this.setupNativeBridge();
        this.loadAvailableProducts();
    }

    setupNativeBridge() {
        // Setup communication with native Android layer
        if (window.AndroidBridge) {
            // Direct Android WebView interface
            this.billingClient = window.AndroidBridge;
        } else if (window.capacitor) {
            // Capacitor plugin interface
            this.setupCapacitorBridge();
        } else {
            // Fallback to postMessage communication
            this.setupPostMessageBridge();
        }
    }

    setupCapacitorBridge() {
        // Register Capacitor plugin for Google Play Billing
        // This would require a native Capacitor plugin
        if (window.Capacitor?.Plugins?.GooglePlayBilling) {
            this.billingClient = window.Capacitor.Plugins.GooglePlayBilling;
        }
    }

    setupPostMessageBridge() {
        // Setup postMessage communication with native WebView
        window.addEventListener('message', (event) => {
            if (event.data.type === 'BILLING_RESPONSE') {
                this.handleBillingResponse(event.data);
            }
        });
    }

    async loadAvailableProducts() {
        if (!this.billingClient) return;

        try {
            // Define available in-app products
            const productIds = [
                'studyflow_premium_monthly',
                'studyflow_premium_yearly',
                'studyflow_advanced_analytics',
                'studyflow_cloud_sync',
                'studyflow_live_wallpapers'
            ];

            // Request product details from Google Play
            const products = await this.queryProducts(productIds);
            this.availableProducts = products;
            
            console.log('Available products loaded:', products);
        } catch (error) {
            console.error('Failed to load products:', error);
        }
    }

    async queryProducts(productIds) {
        return new Promise((resolve, reject) => {
            if (this.billingClient?.queryProducts) {
                this.billingClient.queryProducts(productIds, (result) => {
                    if (result.success) {
                        resolve(result.products);
                    } else {
                        reject(new Error(result.error));
                    }
                });
            } else {
                // Fallback to mock data for development
                resolve(this.getMockProducts(productIds));
            }
        });
    }

    getMockProducts(productIds) {
        // Mock product data for development/testing
        return productIds.map(id => ({
            productId: id,
            price: this.getMockPrice(id),
            title: this.getMockTitle(id),
            description: this.getMockDescription(id)
        }));
    }

    getMockPrice(productId) {
        const prices = {
            'studyflow_premium_monthly': '$4.99',
            'studyflow_premium_yearly': '$39.99',
            'studyflow_advanced_analytics': '$1.99',
            'studyflow_cloud_sync': '$2.99',
            'studyflow_live_wallpapers': '$1.99'
        };
        return prices[productId] || '$0.99';
    }

    getMockTitle(productId) {
        const titles = {
            'studyflow_premium_monthly': 'StudyFlow Premium (Monthly)',
            'studyflow_premium_yearly': 'StudyFlow Premium (Yearly)',
            'studyflow_advanced_analytics': 'Advanced Analytics',
            'studyflow_cloud_sync': 'Cloud Sync',
            'studyflow_live_wallpapers': 'Live Wallpapers'
        };
        return titles[productId] || 'Premium Feature';
    }

    getMockDescription(productId) {
        const descriptions = {
            'studyflow_premium_monthly': 'Monthly subscription with all premium features',
            'studyflow_premium_yearly': 'Yearly subscription with all premium features (save 33%)',
            'studyflow_advanced_analytics': 'Detailed productivity insights and reports',
            'studyflow_cloud_sync': 'Sync your data across all devices',
            'studyflow_live_wallpapers': 'Animated and video backgrounds'
        };
        return descriptions[productId] || 'Premium feature for StudyFlow';
    }

    async purchaseProduct(productId) {
        if (!this.isAndroid) {
            // Fallback to web payment flow
            return this.fallbackToWebPayment(productId);
        }

        try {
            const result = await this.launchBillingFlow(productId);
            return this.handlePurchaseResult(result);
        } catch (error) {
            console.error('Purchase failed:', error);
            throw error;
        }
    }

    async launchBillingFlow(productId) {
        return new Promise((resolve, reject) => {
            if (this.billingClient?.launchBillingFlow) {
                this.billingClient.launchBillingFlow(productId, (result) => {
                    if (result.success) {
                        resolve(result);
                    } else {
                        reject(new Error(result.error));
                    }
                });
            } else {
                // Mock successful purchase for development
                setTimeout(() => {
                    resolve({
                        success: true,
                        purchaseToken: 'mock_token_' + Date.now(),
                        productId: productId,
                        transactionId: 'mock_transaction_' + Date.now()
                    });
                }, 2000);
            }
        });
    }

    handlePurchaseResult(result) {
        if (result.success) {
            // Verify purchase with backend (recommended)
            this.verifyPurchase(result.purchaseToken, result.productId);
            
            // Grant premium access locally
            this.grantPremiumAccess(result.productId);
            
            return {
                success: true,
                productId: result.productId,
                transactionId: result.transactionId
            };
        } else {
            throw new Error('Purchase was not completed');
        }
    }

    async verifyPurchase(purchaseToken, productId) {
        // In a real app, send purchase token to your backend for verification
        // This prevents purchase fraud and ensures legitimate transactions
        try {
            const response = await fetch('/api/verify-purchase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    purchaseToken,
                    productId,
                    packageName: 'com.studyflow.app'
                })
            });
            
            const verification = await response.json();
            return verification.valid;
        } catch (error) {
            console.warn('Purchase verification failed:', error);
            // For development, assume valid
            return true;
        }
    }

    grantPremiumAccess(productId) {
        // Grant appropriate premium features based on product
        switch (productId) {
            case 'studyflow_premium_monthly':
            case 'studyflow_premium_yearly':
                localStorage.setItem('premium-user', 'true');
                localStorage.setItem('subscription-type', productId.includes('yearly') ? 'yearly' : 'monthly');
                localStorage.setItem('subscription-start', Date.now().toString());
                break;
            
            case 'studyflow_advanced_analytics':
            case 'studyflow_cloud_sync':
            case 'studyflow_live_wallpapers':
                const purchasedFeatures = JSON.parse(localStorage.getItem('purchased-features') || '[]');
                const featureName = productId.replace('studyflow_', '').replace(/_/g, '-');
                if (!purchasedFeatures.includes(featureName)) {
                    purchasedFeatures.push(featureName);
                    localStorage.setItem('purchased-features', JSON.stringify(purchasedFeatures));
                }
                break;
        }

        // Refresh app to apply premium features
        if (window.settingsManager) {
            settingsManager.enablePremiumFeatures();
        }
    }

    fallbackToWebPayment(productId) {
        // Fallback to web-based payment when not on Android
        console.log('Falling back to web payment for:', productId);
        
        // This would integrate with Stripe, PayPal, or other web payment providers
        // For now, simulate the existing payment flow
        if (window.settingsManager) {
            const planType = productId.includes('yearly') ? 'yearly' : 'monthly';
            return settingsManager.processPayment(planType);
        }
        
        return Promise.reject(new Error('Web payment not implemented'));
    }

    async restorePurchases() {
        if (!this.isAndroid || !this.billingClient) return;

        try {
            const purchases = await this.queryPurchases();
            purchases.forEach(purchase => {
                if (purchase.acknowledged) {
                    this.grantPremiumAccess(purchase.productId);
                }
            });
            
            return purchases;
        } catch (error) {
            console.error('Failed to restore purchases:', error);
            throw error;
        }
    }

    async queryPurchases() {
        return new Promise((resolve, reject) => {
            if (this.billingClient?.queryPurchases) {
                this.billingClient.queryPurchases((result) => {
                    if (result.success) {
                        resolve(result.purchases);
                    } else {
                        reject(new Error(result.error));
                    }
                });
            } else {
                resolve([]);
            }
        });
    }

    handleBillingResponse(data) {
        // Handle responses from native Android code
        switch (data.action) {
            case 'PURCHASE_COMPLETED':
                this.handlePurchaseResult(data.result);
                break;
            
            case 'PURCHASE_CANCELLED':
                console.log('Purchase was cancelled');
                break;
            
            case 'BILLING_ERROR':
                console.error('Billing error:', data.error);
                break;
        }
    }

    // Public API for the app
    getAvailableProducts() {
        return this.availableProducts;
    }

    isAndroidPaymentAvailable() {
        return this.isAndroid && !!this.billingClient;
    }

    async purchaseSubscription(type = 'monthly') {
        const productId = `studyflow_premium_${type}`;
        return this.purchaseProduct(productId);
    }

    async purchaseFeature(featureName) {
        const productId = `studyflow_${featureName.replace(/-/g, '_')}`;
        return this.purchaseProduct(productId);
    }
}

// Initialize Android payment bridge
let androidPaymentBridge;
document.addEventListener('DOMContentLoaded', () => {
    androidPaymentBridge = new AndroidPaymentBridge();
});
