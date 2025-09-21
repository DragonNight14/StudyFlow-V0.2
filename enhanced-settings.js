// Enhanced Settings Management for HW Tracker

class SettingsManager {
    constructor(tracker) {
        this.tracker = tracker;
        this.colorPalettes = {
            ocean: { primary: '#0ea5e9', secondary: '#06b6d4', accent: '#0891b2' },
            sunset: { primary: '#f97316', secondary: '#ea580c', accent: '#dc2626' },
            forest: { primary: '#16a34a', secondary: '#15803d', accent: '#166534' },
            lavender: { primary: '#8b5cf6', secondary: '#7c3aed', accent: '#6d28d9' },
            rose: { primary: '#f43f5e', secondary: '#e11d48', accent: '#be123c' },
            midnight: { primary: '#1e293b', secondary: '#334155', accent: '#475569' }
        };
    }

    renderSettingsPage() {
        const settingsContainer = document.getElementById('settings-content');
        if (!settingsContainer) return;

        settingsContainer.innerHTML = `
            <section class="priority-section">
                <h2>⚙️ Settings</h2>
                
                <!-- API Integrations -->
                <div class="settings-section">
                    <h3>🔗 API Integrations</h3>
                    <div class="integration-item">
                        <div class="integration-info">
                            <strong>Canvas LMS</strong>
                            <div class="integration-details">
                                <span id="canvas-status" class="status ${this.tracker.canvasConnected ? 'connected' : 'disconnected'}">
                                    ${this.tracker.canvasConnected ? 'Connected' : 'Not connected'}
                                </span>
                                ${this.tracker.canvasConnected ? `<div class="account-info">
                                    <span class="account-name" id="canvas-account-name">${localStorage.getItem('canvas-user-name') || 'Loading...'}</span>
                                    <span class="account-email" id="canvas-account-email">${localStorage.getItem('canvas-user-email') || ''}</span>
                                </div>` : `
                                <div class="canvas-config" style="margin-top: 0.5rem;">
                                    <div class="config-row">
                                        <input type="url" id="canvas-url" placeholder="Canvas URL (e.g., https://school.instructure.com)" 
                                               value="${localStorage.getItem('canvasURL') || ''}" style="margin-bottom: 0.5rem; width: 100%;">
                                    </div>
                                    <div class="config-row">
                                        <input type="password" id="canvas-token" placeholder="Canvas API Token (Optional - for enhanced sync)" 
                                               value="${localStorage.getItem('canvasToken') || ''}" style="width: 100%;">
                                    </div>
                                    <small style="color: var(--text-secondary); font-size: 0.75rem;">
                                        API Token is optional. Without it, basic sync will be used. 
                                        <a href="#" id="canvas-help-link" style="color: var(--accent-color);">How to get API token?</a>
                                    </small>
                                </div>`}
                            </div>
                        </div>
                        <button id="canvas-settings-btn" class="btn ${this.tracker.canvasConnected ? 'btn-secondary' : 'btn-primary'}">
                            ${this.tracker.canvasConnected ? 'Disconnect' : 'Connect'}
                        </button>
                    </div>
                    <div class="integration-item">
                        <div class="integration-info">
                            <strong>Google Classroom</strong>
                            <div class="integration-details">
                                <span id="google-status" class="status ${this.tracker.googleConnected ? 'connected' : 'disconnected'}">
                                    ${this.tracker.googleConnected ? 'Connected' : 'Not connected'}
                                </span>
                                ${this.tracker.googleConnected ? `<div class="account-info">
                                    <span class="account-name" id="google-account-name">${localStorage.getItem('google-user-name') || 'Loading...'}</span>
                                    <span class="account-email" id="google-account-email">${localStorage.getItem('google-user-email') || ''}</span>
                                </div>` : ''}
                            </div>
                        </div>
                        <button id="google-settings-btn" class="btn ${this.tracker.googleConnected ? 'btn-secondary' : 'btn-primary'}">
                            ${this.tracker.googleConnected ? 'Disconnect' : 'Connect'}
                        </button>
                    </div>
                    <div class="integration-note" style="margin-top: 1rem; padding: 1rem; background: rgba(245, 158, 11, 0.1); border-radius: 8px; font-size: 0.875rem; color: var(--text-secondary);">
                        <strong>Note:</strong> API integrations sync your assignments automatically. No API keys required - we handle authentication securely.
                    </div>
                </div>

                <!-- Appearance Settings -->
                <div class="settings-section">
                    <h3>🎨 Appearance</h3>
                    <div class="setting-item">
                        <label for="dark-mode">Dark Mode</label>
                        <div class="toggle-switch ${this.tracker.isDarkMode ? 'active' : ''}" id="dark-mode-toggle"></div>
                    </div>
                    <div class="setting-item">
                        <label for="glassmorphism">Glassmorphism Effects</label>
                        <div class="toggle-switch ${localStorage.getItem('glassmorphism') !== 'false' ? 'active' : ''}" id="glassmorphism-toggle"></div>
                    </div>
                    <div class="setting-item">
                        <label for="animations">Smooth Animations</label>
                        <div class="toggle-switch ${localStorage.getItem('animations') !== 'false' ? 'active' : ''}" id="animations-toggle"></div>
                    </div>
                    <div class="setting-item">
                        <label for="performance-mode">Performance Mode</label>
                        <div class="toggle-switch ${localStorage.getItem('performance-mode') === 'true' ? 'active' : ''}" id="performance-toggle"></div>
                    </div>
                    <div class="setting-item">
                        <label for="visual-reduction">Reduce Visual Effects</label>
                        <div class="toggle-switch ${localStorage.getItem('visual-reduction') === 'true' ? 'active' : ''}" id="visual-reduction-toggle"></div>
                    </div>
                </div>

                <!-- Color Themes -->
                <div class="settings-section">
                    <h3>🎨 Color Themes</h3>
                    
                    <div class="color-palettes">
                        <h4>Quick Palettes</h4>
                        <div class="palette-grid">
                            <div class="palette-option" data-palette="ocean">
                                <div class="palette-preview">
                                    <div class="color-swatch" style="background: #667eea;"></div>
                                    <div class="color-swatch" style="background: #764ba2;"></div>
                                    <div class="color-swatch" style="background: #f093fb;"></div>
                                </div>
                                <span>Ocean</span>
                            </div>
                            <div class="palette-option" data-palette="sunset">
                                <div class="palette-preview">
                                    <div class="color-swatch" style="background: #ff9a9e;"></div>
                                    <div class="color-swatch" style="background: #fecfef;"></div>
                                    <div class="color-swatch" style="background: #fecfef;"></div>
                                </div>
                                <span>Sunset</span>
                            </div>
                            <div class="palette-option" data-palette="forest">
                                <div class="palette-preview">
                                    <div class="color-swatch" style="background: #134e5e;"></div>
                                    <div class="color-swatch" style="background: #71b280;"></div>
                                    <div class="color-swatch" style="background: #10b981;"></div>
                                </div>
                                <span>Forest</span>
                            </div>
                            <div class="palette-option" data-palette="lavender">
                                <div class="palette-preview">
                                    <div class="color-swatch" style="background: #8b5cf6;"></div>
                                    <div class="color-swatch" style="background: #a78bfa;"></div>
                                    <div class="color-swatch" style="background: #c4b5fd;"></div>
                                </div>
                                <span>Lavender</span>
                            </div>
                            <div class="palette-option" data-palette="rose">
                                <div class="palette-preview">
                                    <div class="color-swatch" style="background: #f43f5e;"></div>
                                    <div class="color-swatch" style="background: #fb7185;"></div>
                                    <div class="color-swatch" style="background: #fda4af;"></div>
                                </div>
                                <span>Rose Gold</span>
                            </div>
                            <div class="palette-option" data-palette="monochrome">
                                <div class="palette-preview">
                                    <div class="color-swatch" style="background: #374151;"></div>
                                    <div class="color-swatch" style="background: #6b7280;"></div>
                                    <div class="color-swatch" style="background: #9ca3af;"></div>
                                </div>
                                <span>Monochrome</span>
                            </div>
                        </div>
                    </div>

                    <div class="custom-colors premium-feature">
                        <h4>Custom Colors <span class="premium-badge">💎 Premium</span></h4>
                        <div class="premium-overlay">
                            <div class="premium-content">
                                <div class="premium-icon">🎨</div>
                                <h5>Unlock Custom Colors</h5>
                                <p>Create your own unique color schemes with unlimited customization options.</p>
                                <button class="btn btn-premium" onclick="settingsManager.showUpgradeModal('custom-colors')">Upgrade to Premium</button>
                            </div>
                        </div>
                        <div class="color-controls blurred">
                            <div class="control-group">
                                <label for="primary-color">Primary Color</label>
                                <input type="color" id="primary-color" value="${localStorage.getItem('primary-color') || '#667eea'}" disabled>
                            </div>
                            <div class="control-group">
                                <label for="secondary-color">Secondary Color</label>
                                <input type="color" id="secondary-color" value="${localStorage.getItem('secondary-color') || '#764ba2'}" disabled>
                            </div>
                            <div class="control-group">
                                <label for="accent-color">Accent Color</label>
                                <input type="color" id="accent-color" value="${localStorage.getItem('accent-color') || '#f59e0b'}" disabled>
                            </div>
                        </div>
                    </div>

                    <div class="background-options">
                        <h4>Background Style</h4>
                        <div class="background-selector">
                            <select id="background-type">
                                <option value="gradient">Gradient</option>
                                <option value="pattern">Pattern</option>
                                <option value="image">Custom Image</option>
                                <option value="video">Video Background (Premium)</option>
                                <option value="solid">Solid Color</option>
                            </select>
                            <input type="color" id="background-color" value="#0f172a" style="display: none;">
                        </div>
                        
                        <div class="pattern-options" id="pattern-options" style="display: none;">
                            <div class="pattern-grid">
                                <div class="pattern-option" data-pattern="dots">Dots</div>
                                <div class="pattern-option" data-pattern="grid">Grid</div>
                                <div class="pattern-option" data-pattern="waves">Waves</div>
                                <div class="pattern-option" data-pattern="hexagon">Hexagon</div>
                            </div>
                        </div>
                        
                        <div class="image-upload-section premium-feature" id="image-upload-section" style="display: none;">
                            <div class="premium-overlay">
                                <div class="premium-content">
                                    <div class="premium-icon">🖼️</div>
                                    <h5>Unlock Custom Images</h5>

                        <div class="video-upload-section" id="video-upload-section" style="display: none;">
                            <div class="premium-gate" id="video-premium-gate">
                                <div class="premium-content">
                                    <div class="premium-icon">🎬</div>
                                    <h5>Unlock Video Backgrounds</h5>
                                    <p>Transform your workspace with stunning live video wallpapers. Perfect for creating an immersive study environment.</p>
                                    <button class="btn btn-premium" onclick="settingsManager.showUpgradeModal('video-backgrounds')">Upgrade to Premium</button>
                                </div>
                            </div>
                            <div class="video-upload-area" id="video-upload-area" style="display: none;">
                                <div class="upload-dropzone" id="video-upload-dropzone">
                                    <div class="upload-icon">🎬</div>
                                    <p>Click to upload or drag & drop</p>
                                    <small>Supports MP4, WebM, OGG (max 100MB)</small>
                                    <div class="storage-tip">
                                        💡 <strong>Tip:</strong> Larger files may take longer to load. For best performance, keep videos under 50MB
                                    </div>
                                </div>
                                <input type="file" id="background-video-input" accept="video/*" style="display: none;" disabled>
                            </div>
                            <button class="btn btn-secondary blurred" id="remove-bg-video" style="display: none;" disabled>Remove Video</button>
                        </div>
                    </div>
                </div>

                <!-- Notifications -->
                <div class="settings-section">
                    <h3>🔔 Notifications</h3>
                    <div class="setting-item">
                        <label for="push-notifications">Push Notifications</label>
                        <div class="toggle-switch active" id="push-notifications-toggle"></div>
                    </div>
                    <div class="setting-item">
                        <label for="deadline-reminders">Deadline Reminders</label>
                        <div class="toggle-switch active" id="deadline-reminders-toggle"></div>
                    </div>
                    <div class="setting-item">
                        <label for="completion-celebrations">Completion Celebrations</label>
                        <div class="toggle-switch active" id="completion-celebrations-toggle"></div>
                    </div>
                </div>

                <!-- Data Management -->
                <div class="settings-section">
                    <h3>💾 Data Management</h3>
                    <div class="setting-item">
                        <label>Export Data</label>
                        <button class="btn btn-secondary" id="export-data-btn">Export JSON</button>
                    </div>
                    <div class="setting-item">
                        <label>Import Data</label>
                        <input type="file" id="import-data-input" accept=".json" style="display: none;">
                        <button class="btn btn-secondary" id="import-data-btn">Import JSON</button>
                    </div>
                    <div class="setting-item">
                        <label>Clear All Data</label>
                        <button id="clear-data-btn" class="btn danger-btn">Clear All</button>
                    </div>
                </div>

                <!-- Advanced Features (Paid) -->
                <div class="settings-section" style="border: 2px solid var(--accent-color); position: relative;">
                    <div style="position: absolute; top: -10px; right: 10px; background: var(--accent-color); color: white; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem; font-weight: 600;">PRO</div>
                    <h3>⭐ Advanced Features</h3>
                    <div class="setting-item">
                        <label>Advanced Analytics</label>
                        <button class="btn btn-primary" id="upgrade-analytics-btn">Upgrade</button>
                    </div>
                    <div class="setting-item">
                        <label>Cloud Sync</label>
                        <button class="btn btn-primary" id="upgrade-sync-btn">Upgrade</button>
                    </div>
                    <div class="setting-item">
                        <label>Custom Themes</label>
                        <button class="btn btn-primary" id="upgrade-themes-btn">Upgrade</button>
                    </div>
                </div>
            </section>
        `;

        this.initializeEventListeners();
        
        // Initialize background manager
        this.backgroundManager = new BackgroundManager(this.tracker);
        
        // Initialize background immediately to restore saved backgrounds
        this.backgroundManager.initializeBackground();
        
        // Apply saved settings on load
        this.applySavedSettings();
        
        // Initialize premium features
        this.initializePremiumFeatures();
        
        // Apply current visual settings to settings page
        this.applyCurrentVisualSettings();
    }

    initializePremiumFeatures() {
        if (this.isPremiumUser()) {
            // Enable image uploads
            const imageUploadArea = document.getElementById('upload-area');
            const imageInput = document.getElementById('background-image-input');
            const imagePremiumGate = document.getElementById('image-premium-gate');
            
            if (imageUploadArea) imageUploadArea.classList.remove('blurred');
            if (imageInput) imageInput.disabled = false;
            if (imagePremiumGate) imagePremiumGate.style.display = 'none';
            
            // Enable video uploads
            const videoUploadArea = document.getElementById('video-upload-area');
            const videoInput = document.getElementById('background-video-input');
            const videoPremiumGate = document.getElementById('video-premium-gate');
            const removeVideoBtn = document.getElementById('remove-bg-video');
            
            if (videoUploadArea) {
                videoUploadArea.style.display = 'block';
                videoUploadArea.classList.remove('blurred');
            }
            if (videoInput) videoInput.disabled = false;
            if (videoPremiumGate) videoPremiumGate.style.display = 'none';
            if (removeVideoBtn) {
                removeVideoBtn.disabled = false;
                removeVideoBtn.classList.remove('blurred');
            }
            
            console.log('🎬 Premium features enabled - Video backgrounds available');
        } else {
            console.log('🔒 Premium features locked - Upgrade to unlock video backgrounds');
            console.log('💡 To test video backgrounds, run: tracker.unlockPremium()');
        }
    }

    applyCurrentVisualSettings() {
        // Get current visual settings from body classes and localStorage
        const performanceMode = document.body.classList.contains('performance-mode');
        const glassmorphismDisabled = document.body.classList.contains('no-glassmorphism');
        const animationsDisabled = document.body.classList.contains('no-animations');
        const visualReduction = localStorage.getItem('visual-reduction') === 'true';

        console.log('🎨 Applying visual settings to settings page:', {
            performanceMode,
            glassmorphismDisabled,
            animationsDisabled,
            visualReduction
        });

        // Apply performance mode styles to settings
        if (performanceMode) {
            document.body.classList.add('settings-performance-mode');
            this.applyPerformanceModeToSettings();
        }

        // Apply glassmorphism settings
        if (glassmorphismDisabled) {
            document.body.classList.add('settings-no-glass');
            this.disableGlassmorphismInSettings();
        }

        // Apply animation settings
        if (animationsDisabled) {
            document.body.classList.add('settings-no-animations');
            this.disableAnimationsInSettings();
        }

        // Apply visual reduction
        if (visualReduction) {
            document.body.classList.add('settings-reduced-visuals');
            this.applyVisualReductionToSettings();
        }
    }

    applyPerformanceModeToSettings() {
        // Make settings elements more performance-friendly
        const glassCards = document.querySelectorAll('#settings-content .glass-card');
        glassCards.forEach(card => {
            card.style.backdropFilter = 'none';
            card.style.webkitBackdropFilter = 'none';
            card.style.background = 'rgba(255, 255, 255, 0.1)';
            card.style.border = '1px solid rgba(255, 255, 255, 0.2)';
        });

        // Simplify premium gates
        const premiumGates = document.querySelectorAll('.premium-gate');
        premiumGates.forEach(gate => {
            gate.style.backdropFilter = 'none';
            gate.style.background = 'rgba(0, 0, 0, 0.2)';
        });

        console.log('⚡ Performance mode applied to settings');
    }

    disableGlassmorphismInSettings() {
        // Remove glass effects from settings elements
        const settingsContainer = document.getElementById('settings-content');
        if (settingsContainer) {
            settingsContainer.classList.add('no-glass-effects');
        }

        // Apply solid backgrounds instead of glass
        const glassElements = document.querySelectorAll('#settings-content .glass-card');
        glassElements.forEach(element => {
            element.style.backdropFilter = 'none';
            element.style.webkitBackdropFilter = 'none';
            element.style.background = getComputedStyle(document.documentElement)
                .getPropertyValue('--card-bg-solid').trim() || 'rgba(255, 255, 255, 0.95)';
        });

        console.log('🚫 Glassmorphism disabled in settings');
    }

    disableAnimationsInSettings() {
        // Disable animations in settings
        const settingsContainer = document.getElementById('settings-content');
        if (settingsContainer) {
            settingsContainer.classList.add('no-animations');
        }

        // Remove transitions from interactive elements
        const interactiveElements = document.querySelectorAll(`
            #settings-content .btn,
            #settings-content .toggle-switch,
            #settings-content .palette-option,
            #settings-content .pattern-option
        `);

        interactiveElements.forEach(element => {
            element.style.transition = 'none';
            element.style.animation = 'none';
        });

        console.log('⏸️ Animations disabled in settings');
    }

    applyVisualReductionToSettings() {
        // Apply visual reduction to settings
        const settingsContainer = document.getElementById('settings-content');
        if (settingsContainer) {
            settingsContainer.classList.add('reduced-visuals');
        }

        // Reduce visual complexity
        const decorativeElements = document.querySelectorAll(`
            #settings-content .premium-icon,
            #settings-content .upload-icon,
            #settings-content .color-swatch
        `);

        decorativeElements.forEach(element => {
            element.style.opacity = '0.7';
            element.style.filter = 'grayscale(0.3)';
        });

        // Simplify shadows and effects
        const cards = document.querySelectorAll('#settings-content .glass-card');
        cards.forEach(card => {
            card.style.boxShadow = 'none';
            card.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        });

        console.log('👁️ Visual reduction applied to settings');
    }

    updateSettingsVisuals() {
        // Clear existing visual classes
        document.body.classList.remove(
            'settings-performance-mode',
            'settings-no-glass',
            'settings-no-animations',
            'settings-reduced-visuals'
        );

        // Reapply current visual settings
        setTimeout(() => {
            this.applyCurrentVisualSettings();
        }, 50); // Small delay to ensure DOM updates
    }

    initializeEventListeners() {
        // Initialize all toggle switches
        this.initializeToggleSwitches();
        
        // Dark mode toggle (already working, but keeping for consistency)
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', () => {
                this.tracker.isDarkMode = !this.tracker.isDarkMode;
                localStorage.setItem('darkMode', this.tracker.isDarkMode.toString());
                
                if (this.tracker.isDarkMode) {
                    document.documentElement.setAttribute('data-theme', 'dark');
                } else {
                    document.documentElement.removeAttribute('data-theme');
                }
                
                darkModeToggle.classList.toggle('active');
                this.tracker.showNotification('Theme updated successfully!');
            });
        }

        // Color palette selection
        document.querySelectorAll('.palette-option').forEach(option => {
            option.addEventListener('click', () => {
                const palette = option.dataset.palette;
                this.applyColorPalette(palette);
                
                // Update visual selection
                document.querySelectorAll('.palette-option').forEach(p => p.classList.remove('selected'));
                option.classList.add('selected');
            });
        });

        // Custom color inputs - Premium feature check
        ['primary-color', 'secondary-color', 'accent-color'].forEach(colorType => {
            const input = document.getElementById(colorType);
            if (input) {
                input.addEventListener('click', (e) => {
                    if (!this.isPremiumUser()) {
                        e.preventDefault();
                        this.showUpgradeModal('custom-colors');
                        return false;
                    }
                });
                
                input.addEventListener('change', (e) => {
                    if (!this.isPremiumUser()) {
                        e.preventDefault();
                        return false;
                    }
                    const color = e.target.value;
                    document.documentElement.style.setProperty(`--${colorType}`, color);
                    localStorage.setItem(colorType, color);
                });
            }
        });

        // Background type change handler
        const backgroundType = document.getElementById('background-type');
        if (backgroundType) {
            backgroundType.addEventListener('change', (e) => {
                this.handleBackgroundTypeChange(e.target.value);
            });
        }

        // Image upload functionality
        const uploadArea = document.getElementById('upload-area');
        const imageInput = document.getElementById('background-image-input');
        const removeBgBtn = document.getElementById('remove-bg-image');

        // Video upload functionality
        const videoUploadArea = document.getElementById('video-upload-dropzone');
        const videoInput = document.getElementById('background-video-input');
        const removeVideoBtn = document.getElementById('remove-bg-video');

        if (uploadArea && imageInput) {
            uploadArea.addEventListener('click', () => {
                if (!this.isPremiumUser()) {
                    this.showUpgradeModal('custom-images');
                    return;
                }
                imageInput.click();
            });
            
            uploadArea.addEventListener('dragover', (e) => {
                if (!this.isPremiumUser()) {
                    e.preventDefault();
                    this.showUpgradeModal('custom-images');
                    return;
                }
                e.preventDefault();
                uploadArea.classList.add('drag-over');
            });
            
            uploadArea.addEventListener('dragleave', () => {
                uploadArea.classList.remove('drag-over');
            });
            
            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.classList.remove('drag-over');
                if (!this.isPremiumUser()) {
                    this.showUpgradeModal('custom-images');
                    return;
                }
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    this.backgroundManager.handleImageUpload(files[0]);
                }
            });
            
            imageInput.addEventListener('change', (e) => {
                if (!this.isPremiumUser()) {
                    this.showUpgradeModal('custom-images');
                    return;
                }
                if (e.target.files.length > 0) {
                    this.backgroundManager.handleImageUpload(e.target.files[0]);
                }
            });
        }

        if (removeBgBtn) {
            removeBgBtn.addEventListener('click', () => {
                localStorage.removeItem('background-image');
                this.backgroundManager.applyBackground('gradient');
                removeBgBtn.style.display = 'none';
                this.tracker.showNotification('Background image removed', 'success');
            });
        }

        // Video upload event listeners
        if (videoUploadArea && videoInput) {
            videoUploadArea.addEventListener('click', () => {
                if (!this.isPremiumUser()) {
                    this.showUpgradeModal('video-backgrounds');
                    return;
                }
                videoInput.click();
            });
            
            videoUploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                if (!this.isPremiumUser()) return;
                videoUploadArea.style.borderColor = 'var(--accent-color)';
                videoUploadArea.style.background = 'rgba(var(--accent-color-rgb), 0.1)';
            });
            
            videoUploadArea.addEventListener('dragleave', (e) => {
                e.preventDefault();
                videoUploadArea.style.borderColor = '';
                videoUploadArea.style.background = '';
            });
            
            videoUploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                videoUploadArea.style.borderColor = '';
                videoUploadArea.style.background = '';
                
                if (!this.isPremiumUser()) {
                    this.showUpgradeModal('video-backgrounds');
                    return;
                }
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    this.backgroundManager.handleVideoUpload(files[0]);
                }
            });
            
            videoInput.addEventListener('change', (e) => {
                if (!this.isPremiumUser()) {
                    this.showUpgradeModal('video-backgrounds');
                    return;
                }
                const file = e.target.files[0];
                if (file) {
                    this.backgroundManager.handleVideoUpload(file);
                }
            });
        }

        if (removeVideoBtn) {
            removeVideoBtn.addEventListener('click', () => {
                this.backgroundManager.removeVideoBackground();
                removeVideoBtn.style.display = 'none';
            });
        }

        // Pattern selection
        const patternOptions = document.querySelectorAll('.pattern-option');
        patternOptions.forEach(option => {
            option.addEventListener('click', () => {
                patternOptions.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                this.backgroundManager.applyPattern(option.dataset.pattern);
            });
        });

        // Solid color picker
        const backgroundColorInput = document.getElementById('background-color');
        if (backgroundColorInput) {
            backgroundColorInput.addEventListener('change', (e) => {
                this.backgroundManager.updateSolidColor(e.target.value);
            });
        }

        // API Integration buttons
        const canvasBtn = document.getElementById('canvas-settings-btn');
        const googleBtn = document.getElementById('google-settings-btn');
        
        if (canvasBtn) {
            canvasBtn.addEventListener('click', () => this.toggleCanvasIntegration());
        }
        
        if (googleBtn) {
            googleBtn.addEventListener('click', () => this.toggleGoogleIntegration());
        }

        // Canvas help link
        const canvasHelpLink = document.getElementById('canvas-help-link');
        if (canvasHelpLink) {
            canvasHelpLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.showCanvasHelp();
            });
        }

        // Save Canvas URL and token when changed
        const canvasUrl = document.getElementById('canvas-url');
        const canvasToken = document.getElementById('canvas-token');
        
        if (canvasUrl) {
            canvasUrl.addEventListener('blur', () => {
                localStorage.setItem('canvasURL', canvasUrl.value);
            });
        }
        
        if (canvasToken) {
            canvasToken.addEventListener('blur', () => {
                localStorage.setItem('canvasToken', canvasToken.value);
            });
        }

        // Data management
        const exportBtn = document.getElementById('export-data-btn');
        const importBtn = document.getElementById('import-data-btn');
        const importInput = document.getElementById('import-data-input');
        const clearBtn = document.getElementById('clear-data-btn');

        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportData());
        }

        if (importBtn && importInput) {
            importBtn.addEventListener('click', () => importInput.click());
            importInput.addEventListener('change', (e) => this.importData(e));
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearAllData());
        }

        // Upgrade button handlers
        const upgradeAnalyticsBtn = document.getElementById('upgrade-analytics-btn');
        const upgradeSyncBtn = document.getElementById('upgrade-sync-btn');
        const upgradeThemesBtn = document.getElementById('upgrade-themes-btn');

        if (upgradeAnalyticsBtn) {
            upgradeAnalyticsBtn.addEventListener('click', () => this.purchaseFeature('advanced-analytics'));
        }

        if (upgradeSyncBtn) {
            upgradeSyncBtn.addEventListener('click', () => this.purchaseFeature('cloud-sync'));
        }

        if (upgradeThemesBtn) {
            upgradeThemesBtn.addEventListener('click', () => this.purchaseFeature('premium-themes'));
        }
    }

    initializeToggleSwitches() {
        // Glassmorphism toggle
        const glassmorphismToggle = document.getElementById('glassmorphism-toggle');
        if (glassmorphismToggle) {
            const isEnabled = localStorage.getItem('glassmorphism-enabled') !== 'false';
            if (!isEnabled) glassmorphismToggle.classList.remove('active');
            
            glassmorphismToggle.addEventListener('click', () => {
                const enabled = glassmorphismToggle.classList.contains('active');
                if (enabled) {
                    glassmorphismToggle.classList.remove('active');
                    localStorage.setItem('glassmorphism-enabled', 'false');
                    document.body.classList.add('no-glassmorphism');
                    // Force enable performance mode when glassmorphism is disabled
                    this.enablePerformanceMode();
                    this.tracker.showNotification('Glassmorphism disabled - Performance mode enabled');
                } else {
                    glassmorphismToggle.classList.add('active');
                    localStorage.setItem('glassmorphism-enabled', 'true');
                    document.body.classList.remove('no-glassmorphism');
                    // Force disable performance mode when glassmorphism is enabled
                    this.disablePerformanceMode();
                    this.tracker.showNotification('Glassmorphism enabled - Performance mode disabled');
                }
                
                // Update settings visuals immediately
                this.updateSettingsVisuals();
            });
        }

        // Animations toggle
        const animationsToggle = document.getElementById('animations-toggle');
        if (animationsToggle) {
            const isEnabled = localStorage.getItem('animations-enabled') !== 'false';
            if (!isEnabled) animationsToggle.classList.remove('active');
            
            animationsToggle.addEventListener('click', () => {
                const enabled = animationsToggle.classList.contains('active');
                if (enabled) {
                    animationsToggle.classList.remove('active');
                    localStorage.setItem('animations-enabled', 'false');
                    document.body.classList.add('no-animations');
                } else {
                    animationsToggle.classList.add('active');
                    localStorage.setItem('animations-enabled', 'true');
                    document.body.classList.remove('no-animations');
                    this.tracker.showNotification(`Animations ${enabled ? 'disabled' : 'enabled'}`);
                }
                
                // Update settings visuals immediately
                this.updateSettingsVisuals();
            });
        }

        // Push notifications toggle
        const pushNotificationsToggle = document.getElementById('push-notifications-toggle');
        if (pushNotificationsToggle) {
            const isEnabled = localStorage.getItem('push-notifications') !== 'false';
            if (!isEnabled) pushNotificationsToggle.classList.remove('active');
            
            pushNotificationsToggle.addEventListener('click', () => {
                const enabled = pushNotificationsToggle.classList.contains('active');
                if (enabled) {
                    pushNotificationsToggle.classList.remove('active');
                    localStorage.setItem('push-notifications', 'false');
                    this.tracker.showNotification('Push notifications disabled');
                } else {
                    pushNotificationsToggle.classList.add('active');
                    localStorage.setItem('push-notifications', 'true');
                    this.tracker.showNotification('Push notifications enabled');
                }
            });
        }

        // Deadline reminders toggle
        const deadlineRemindersToggle = document.getElementById('deadline-reminders-toggle');
        if (deadlineRemindersToggle) {
            const isEnabled = localStorage.getItem('deadline-reminders') !== 'false';
            if (!isEnabled) deadlineRemindersToggle.classList.remove('active');
            
            deadlineRemindersToggle.addEventListener('click', () => {
                const enabled = deadlineRemindersToggle.classList.contains('active');
                if (enabled) {
                    deadlineRemindersToggle.classList.remove('active');
                    localStorage.setItem('deadline-reminders', 'false');
                    this.tracker.showNotification('Deadline reminders disabled');
                } else {
                    deadlineRemindersToggle.classList.add('active');
                    localStorage.setItem('deadline-reminders', 'true');
                    this.tracker.showNotification('Deadline reminders enabled');
                }
            });
        }

        // Completion celebrations toggle
        const completionCelebrationsToggle = document.getElementById('completion-celebrations-toggle');
        if (completionCelebrationsToggle) {
            const isEnabled = localStorage.getItem('completion-celebrations') !== 'false';
            if (!isEnabled) completionCelebrationsToggle.classList.remove('active');
            
            completionCelebrationsToggle.addEventListener('click', () => {
                const enabled = completionCelebrationsToggle.classList.contains('active');
                if (enabled) {
                    completionCelebrationsToggle.classList.remove('active');
                    localStorage.setItem('completion-celebrations', 'false');
                    this.tracker.showNotification('Completion celebrations disabled');
                } else {
                    completionCelebrationsToggle.classList.add('active');
                    localStorage.setItem('completion-celebrations', 'true');
                    this.tracker.showNotification('Completion celebrations enabled');
                }
            });
        }

        // Performance mode toggle
        const performanceToggle = document.getElementById('performance-toggle');
        if (performanceToggle) {
            const isEnabled = localStorage.getItem('performance-mode') === 'true';
            if (!isEnabled) performanceToggle.classList.remove('active');
            
            performanceToggle.addEventListener('click', () => {
                const enabled = performanceToggle.classList.contains('active');
                if (enabled) {
                    this.disablePerformanceMode();
                } else {
                    this.enablePerformanceMode();
                }
            });
        }

        // Visual reduction toggle
        const visualReductionToggle = document.getElementById('visual-reduction-toggle');
        if (visualReductionToggle) {
            const isEnabled = localStorage.getItem('visual-reduction') === 'true';
            if (!isEnabled) visualReductionToggle.classList.remove('active');
            
            visualReductionToggle.addEventListener('click', () => {
                const enabled = visualReductionToggle.classList.contains('active');
                if (enabled) {
                    visualReductionToggle.classList.remove('active');
                    localStorage.setItem('visual-reduction', 'false');
                    document.body.classList.remove('visual-reduction');
                    this.tracker.showNotification('Visual reduction disabled');
                } else {
                    visualReductionToggle.classList.add('active');
                    localStorage.setItem('visual-reduction', 'true');
                    document.body.classList.add('visual-reduction');
                    this.tracker.showNotification('Visual reduction enabled for accessibility');
                }
            });
        }
    }

    applySavedSettings() {
        // Apply glassmorphism setting
        const glassmorphismEnabled = localStorage.getItem('glassmorphism-enabled') !== 'false';
        if (!glassmorphismEnabled) {
            document.body.classList.add('no-glassmorphism');
        }
        
        // Apply animations setting
        const animationsEnabled = localStorage.getItem('animations-enabled') !== 'false';
        if (!animationsEnabled) {
            document.body.classList.add('no-animations');
        }
        
        // Apply performance mode
        const performanceModeEnabled = localStorage.getItem('performance-mode') === 'true';
        if (performanceModeEnabled) {
            document.body.classList.add('performance-mode');
            // Performance mode only disables blur, not animations or glassmorphism automatically
            // Force glassmorphism off in performance mode
            document.body.classList.add('no-glassmorphism');
        }
        
        // Apply visual reduction
        const visualReductionEnabled = localStorage.getItem('visual-reduction') === 'true';
        if (visualReductionEnabled) {
            document.body.classList.add('visual-reduction');
        }
        
        // Apply dark mode if saved
        if (this.tracker.isDarkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        
        // Restore premium features if user has access
        if (this.isPremiumUser()) {
            this.enablePremiumFeatures();
        }
        
        // Restore background settings
        this.restoreBackgroundSettings();
    }

    restoreBackgroundSettings() {
        const backgroundType = localStorage.getItem('background-type');
        const backgroundImage = localStorage.getItem('background-image');
        const backgroundColor = localStorage.getItem('background-color');
        const selectedPattern = localStorage.getItem('selected-pattern');
        
        if (backgroundType) {
            const backgroundSelect = document.getElementById('background-type');
            if (backgroundSelect) {
                backgroundSelect.value = backgroundType;
                // Only show/hide UI elements, don't reapply background
                this.showBackgroundOptions(backgroundType);
            }
        }
        
        if (backgroundImage) {
            const removeBgBtn = document.getElementById('remove-bg-image');
            if (removeBgBtn) {
                removeBgBtn.style.display = 'block';
            }
        }

        const backgroundVideo = localStorage.getItem('background-video');
        if (backgroundVideo) {
            const removeVideoBtn = document.getElementById('remove-bg-video');
            if (removeVideoBtn) {
                removeVideoBtn.style.display = 'block';
                // Enable the button for premium users
                if (this.isPremiumUser()) {
                    removeVideoBtn.disabled = false;
                    removeVideoBtn.classList.remove('blurred');
                }
            }
            
            // Show video upload area for premium users
            if (this.isPremiumUser()) {
                const videoUploadArea = document.getElementById('video-upload-area');
                const videoPremiumGate = document.getElementById('video-premium-gate');
                const videoInput = document.getElementById('background-video-input');
                
                if (videoUploadArea) videoUploadArea.style.display = 'block';
                if (videoPremiumGate) videoPremiumGate.style.display = 'none';
                if (videoInput) videoInput.disabled = false;
            }
        }
        
        if (backgroundColor) {
            const backgroundColorInput = document.getElementById('background-color');
            if (backgroundColorInput) {
                backgroundColorInput.value = backgroundColor;
            }
        }
        
        if (selectedPattern) {
            const patternOptions = document.querySelectorAll('.pattern-option');
            patternOptions.forEach(option => {
                if (option.dataset.pattern === selectedPattern) {
                    option.classList.add('selected');
                }
            });
        }
    }

    showBackgroundOptions(type) {
        const patternOptions = document.getElementById('pattern-options');
        const imageUploadSection = document.getElementById('image-upload-section');
        const videoUploadSection = document.getElementById('video-upload-section');
        const backgroundColor = document.getElementById('background-color');

        // Hide all options first
        if (patternOptions) patternOptions.style.display = 'none';
        if (imageUploadSection) imageUploadSection.style.display = 'none';
        if (videoUploadSection) videoUploadSection.style.display = 'none';
        if (backgroundColor) backgroundColor.style.display = 'none';

        // Show relevant options without changing background
        switch (type) {
            case 'pattern':
                if (patternOptions) patternOptions.style.display = 'block';
                break;
            case 'image':
                if (imageUploadSection) imageUploadSection.style.display = 'block';
                break;
            case 'video':
                if (videoUploadSection) videoUploadSection.style.display = 'block';
                break;
            case 'solid':
                if (backgroundColor) backgroundColor.style.display = 'inline-block';
                break;
        }
    }

    applyColorPalette(paletteName) {
        const palette = this.colorPalettes[paletteName];
        if (!palette) return;

        document.documentElement.style.setProperty('--primary-color', palette.primary);
        document.documentElement.style.setProperty('--secondary-color', palette.secondary);
        document.documentElement.style.setProperty('--accent-color', palette.accent);

        localStorage.setItem('primary-color', palette.primary);
        localStorage.setItem('secondary-color', palette.secondary);
        localStorage.setItem('accent-color', palette.accent);

        // Update color inputs
        const primaryInput = document.getElementById('primary-color');
        const secondaryInput = document.getElementById('secondary-color');
        const accentInput = document.getElementById('accent-color');

        if (primaryInput) primaryInput.value = palette.primary;
        if (secondaryInput) secondaryInput.value = palette.secondary;
        if (accentInput) accentInput.value = palette.accent;

        this.tracker.showNotification(`${paletteName.charAt(0).toUpperCase() + paletteName.slice(1)} palette applied!`);
    }

    isPremiumUser() {
        const isPremium = localStorage.getItem('premium-user') === 'true';
        const trialStart = localStorage.getItem('trial-start');
        const subscriptionType = localStorage.getItem('subscription-type');
        
        if (isPremium) {
            if (subscriptionType) {
                // Has active subscription
                return true;
            } else if (trialStart) {
                // Check trial expiration
                const trialDuration = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
                const now = Date.now();
                const trialExpired = (now - parseInt(trialStart)) > trialDuration;
                
                if (trialExpired) {
                    // Trial expired, remove premium status
                    localStorage.removeItem('premium-user');
                    localStorage.removeItem('trial-start');
                    this.tracker.showNotification('⏰ Your free trial has expired. Upgrade to continue using premium features!', 'warning');
                    return false;
                }
                return true;
            }
        }
        
        return isPremium;
    }

    showUpgradeModal(feature) {
        // Auto-close existing overlays first
        this.closeAllOverlays();
        
        const modal = document.createElement('div');
        modal.className = 'upgrade-modal';
        modal.innerHTML = `
            <div class="upgrade-content glass-card">
                <div class="upgrade-header">
                    <h2>💎 Upgrade to Premium</h2>
                    <button class="close-btn" onclick="this.closest('.upgrade-modal').remove()">×</button>
                </div>
                
                <div class="upgrade-body">
                    <div class="feature-highlight">
                        ${this.getFeatureContent(feature)}
                    </div>
                    
                    <div class="premium-benefits">
                        <h3>Premium Benefits Include:</h3>
                        <ul>
                            <li>🎨 Custom color schemes</li>
                            <li>🖼️ Custom background images</li>
                            <li>📊 Advanced analytics</li>
                            <li>☁️ Cloud sync across devices</li>
                            <li>✨ Premium themes & effects</li>
                            <li>🔔 Enhanced notifications</li>
                        </ul>
                    </div>
                    
                    <div class="pricing">
                        <div class="price-tag">
                            <span class="price">$4.99</span>
                            <span class="period">/month</span>
                        </div>
                        <p class="price-note">Cancel anytime • 7-day free trial</p>
                    </div>
                </div>
                
                <div class="upgrade-actions">
                    <button class="btn btn-secondary" onclick="this.closest('.upgrade-modal').remove()">
                        Maybe Later
                    </button>
                    <button class="btn btn-premium" onclick="settingsManager.startTrial()">
                        Start Free Trial
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        
        // Add click outside to close
        setTimeout(() => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        }, 100);
    }

    getFeatureContent(feature) {
        switch (feature) {
            case 'custom-colors':
                return `
                    <div class="feature-icon">🎨</div>
                    <h4>Custom Color Schemes</h4>
                    <p>Create unlimited custom color palettes to match your personal style and preferences.</p>
                `;
            case 'custom-images':
                return `
                    <div class="feature-icon">🖼️</div>
                    <h4>Custom Background Images</h4>
                    <p>Upload your own photos and images to create a truly personalized workspace.</p>
                `;
            default:
                return `
                    <div class="feature-icon">💎</div>
                    <h4>Premium Features</h4>
                    <p>Unlock advanced customization and productivity features.</p>
                `;
        }
    }

    startTrial() {
        // Check if trial was already used
        const trialUsed = localStorage.getItem('trial-used');
        if (trialUsed === 'true') {
            this.showPaymentModal();
            return;
        }
        
        // Start trial
        localStorage.setItem('premium-user', 'true');
        localStorage.setItem('trial-start', Date.now().toString());
        localStorage.setItem('trial-used', 'true');
        
        // Close modal
        const modal = document.querySelector('.upgrade-modal, .purchase-modal');
        if (modal) modal.remove();
        
        // Show success message
        this.tracker.showNotification('🎉 Premium trial started! Enjoy all features for 7 days.', 'success');
        
        // Refresh settings to show unlocked features without reload
        this.renderSettingsPage();
        
        // Enable premium features immediately
        this.enablePremiumFeatures();
        
        // Set reminder for trial expiration
        this.setTrialReminder();
    }

    showPaymentModal() {
        const modal = document.createElement('div');
        modal.className = 'payment-modal';
        modal.innerHTML = `
            <div class="payment-content glass-card">
                <div class="payment-header">
                    <h2>💳 Choose Your Plan</h2>
                    <button class="close-btn" onclick="this.closest('.payment-modal').remove()">×</button>
                </div>
                
                <div class="payment-body">
                    <div class="trial-notice">
                        <p>Your free trial has been used. Choose a plan to continue using premium features:</p>
                    </div>
                    
                    <div class="payment-options">
                        <div class="plan-card">
                            <h4>Monthly Plan</h4>
                            <div class="price">$4.99<span class="period">/month</span></div>
                            <ul class="features">
                                <li>✅ Advanced Analytics</li>
                                <li>✅ Cloud Sync</li>
                                <li>✅ Premium Themes</li>
                                <li>✅ Custom Colors & Images</li>
                                <li>✅ Priority Support</li>
                            </ul>
                            <button class="btn btn-premium" onclick="settingsManager.processPayment('monthly')">
                                Subscribe Monthly
                            </button>
                        </div>
                        
                        <div class="plan-card recommended">
                            <div class="recommended-badge">Best Value</div>
                            <h4>Yearly Plan</h4>
                            <div class="price">$39.99<span class="period">/year</span></div>
                            <div class="savings">Save 33%!</div>
                            <ul class="features">
                                <li>✅ All Monthly Features</li>
                                <li>✅ 4 Months Free</li>
                                <li>✅ Exclusive Yearly Themes</li>
                                <li>✅ Advanced Export Options</li>
                            </ul>
                            <button class="btn btn-premium" onclick="settingsManager.processPayment('yearly')">
                                Subscribe Yearly
                            </button>
                        </div>
                    </div>
                    
                    <div class="payment-security">
                        <p>🔒 Secure payment processing • Cancel anytime • 30-day money-back guarantee</p>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        }, 100);
    }

    processPayment(planType) {
        // In a real app, this would integrate with payment processor
        // For now, simulate successful payment
        const modal = document.createElement('div');
        modal.className = 'payment-processing-modal';
        modal.innerHTML = `
            <div class="processing-content glass-card">
                <div class="processing-spinner">
                    <div class="spinner"></div>
                </div>
                <h3>Processing Payment...</h3>
                <p>Please wait while we process your payment securely.</p>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Simulate payment processing
        setTimeout(() => {
            modal.remove();
            
            // For demo purposes, show success
            localStorage.setItem('premium-user', 'true');
            localStorage.setItem('subscription-type', planType);
            localStorage.setItem('subscription-start', Date.now().toString());
            localStorage.removeItem('trial-start'); // Remove trial data
            
            this.tracker.showNotification(`🎉 Payment successful! Welcome to StudyFlow Premium (${planType})!`, 'success');
            
            // Close payment modal
            const paymentModal = document.querySelector('.payment-modal');
            if (paymentModal) paymentModal.remove();
            
            // Refresh settings
            this.renderSettingsPage();
            this.enablePremiumFeatures();
        }, 3000);
    }

    setTrialReminder() {
        // Set reminders for trial expiration
        const trialStart = parseInt(localStorage.getItem('trial-start'));
        const trialDuration = 7 * 24 * 60 * 60 * 1000; // 7 days
        const reminderTime = trialStart + (5 * 24 * 60 * 60 * 1000); // 5 days after start
        
        const now = Date.now();
        if (now < reminderTime) {
            setTimeout(() => {
                this.tracker.showNotification('⏰ Your free trial expires in 2 days. Upgrade to keep your premium features!', 'warning');
            }, reminderTime - now);
        }
    }

    enablePremiumFeatures() {
        // Remove blur and enable premium controls
        document.querySelectorAll('.blurred').forEach(element => {
            element.classList.remove('blurred');
            const inputs = element.querySelectorAll('input, button');
            inputs.forEach(input => input.disabled = false);
        });
        
        // Hide premium overlays
        document.querySelectorAll('.premium-overlay').forEach(overlay => {
            overlay.style.display = 'none';
        });
        
        // Mark body as premium for CSS targeting
        document.body.setAttribute('data-premium', 'true');
        
        // Update any premium status indicators
        this.updatePremiumStatusIndicators();
    }

    updatePremiumStatusIndicators() {
        // Update any UI elements that show premium status
        const premiumBadges = document.querySelectorAll('.premium-badge');
        premiumBadges.forEach(badge => {
            badge.textContent = 'Premium';
            badge.style.display = 'block';
        });
    }

    async connectToCanvas(canvasUrl, canvasToken) {
        try {
            // Validate URL format
            if (!canvasUrl || !canvasUrl.startsWith('http')) {
                throw new Error('Please enter a valid Canvas URL (e.g., https://yourschool.instructure.com)');
            }

            // Remove trailing slash if present
            canvasUrl = canvasUrl.replace(/\/$/, '');
            
            // Test the connection by fetching user data
            const response = await fetch(`${canvasUrl}/api/v1/users/self`, {
                headers: {
                    'Authorization': `Bearer ${canvasToken || ''}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Invalid API token. Please check your token and try again.');
                } else if (response.status === 404) {
                    throw new Error('Invalid Canvas URL. Please check the URL and try again.');
                } else {
                    throw new Error(`Canvas API error: ${response.status} ${response.statusText}`);
                }
            }

            const userData = await response.json();
            
            // Store the actual user data
            localStorage.setItem('canvas-user-name', userData.name || 'Canvas User');
            localStorage.setItem('canvas-user-email', userData.login_id || userData.email || '');
            localStorage.setItem('canvas-user-id', userData.id);
            
            // Store the connection details
            localStorage.setItem('canvasURL', canvasUrl);
            if (canvasToken) {
                localStorage.setItem('canvasToken', canvasToken);
            }
            
            // Update the UI
            document.getElementById('canvas-status').textContent = 'Connected';
            document.getElementById('canvas-status').className = 'status connected';
            
            // Update account info display
            const accountName = document.getElementById('canvas-account-name');
            const accountEmail = document.getElementById('canvas-account-email');
            if (accountName) accountName.textContent = userData.name || 'Canvas User';
            if (accountEmail) accountEmail.textContent = userData.login_id || userData.email || '';
            
            // Enable sync button if available
            const syncButton = document.getElementById('sync-now-btn');
            if (syncButton) {
                syncButton.disabled = false;
            }
            
            return userData;
            
        } catch (error) {
            console.error('Canvas connection error:', error);
            
            // Clear any stored credentials on error
            localStorage.removeItem('canvasToken');
            localStorage.removeItem('canvas-user-name');
            localStorage.removeItem('canvas-user-email');
            localStorage.removeItem('canvas-user-id');
            
            // Update UI to show error state
            const statusElement = document.getElementById('canvas-status');
            if (statusElement) {
                statusElement.textContent = 'Connection failed';
                statusElement.className = 'status error';
            }
            
            throw error; // Re-throw to be caught by the caller
        }
    }

    handleBackgroundTypeChange(type) {
        // Show/hide UI options
        this.showBackgroundOptions(type);

        // Apply the background change
        switch (type) {
            case 'pattern':
                this.backgroundManager.applyBackground('pattern');
                break;
            case 'image':
                this.backgroundManager.applyBackground('image');
                break;
            case 'video':
                this.backgroundManager.applyBackground('video');
                break;
            case 'solid':
                this.backgroundManager.applyBackground('solid');
                break;
            case 'gradient':
                this.backgroundManager.applyBackground('gradient');
                break;
        }

        localStorage.setItem('background-type', type);
        this.tracker.logPerformanceEvent('Background Changed', type);
    }

    closeAllOverlays() {
        // Close settings-specific overlays and modals
        const settingsOverlays = document.querySelectorAll(`
            .upgrade-modal,
            .premium-modal,
            .canvas-help-modal,
            .color-picker-modal,
            .import-export-modal,
            .backup-modal
        `);
        
        settingsOverlays.forEach(overlay => {
            if (overlay && overlay.parentNode) {
                overlay.remove();
            }
        });
        
        // Close any open dropdowns or tooltips
        const dropdowns = document.querySelectorAll('.dropdown.open, .tooltip.visible');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('open', 'visible');
        });
        
        console.log(`🔒 Settings overlays closed: ${settingsOverlays.length} modals`);
    }

    enablePerformanceMode() {
        const performanceToggle = document.getElementById('performance-toggle');
        if (performanceToggle) performanceToggle.classList.add('active');
        
        localStorage.setItem('performance-mode', 'true');
        document.body.classList.add('performance-mode');
        
        // Force disable glassmorphism when performance mode is enabled
        const glassmorphismToggle = document.getElementById('glassmorphism-toggle');
        if (glassmorphismToggle) glassmorphismToggle.classList.remove('active');
        localStorage.setItem('glassmorphism-enabled', 'false');
        document.body.classList.add('no-glassmorphism');
        
        // Apply visual settings
        if (this.tracker && this.tracker.applyGlobalVisualSettings) {
            this.tracker.applyGlobalVisualSettings();
        }
        
        // Update settings visuals immediately
        this.updateSettingsVisuals();
        
        this.tracker.showNotification('Performance mode enabled - Glassmorphism disabled');
    }

    disablePerformanceMode() {
        const performanceToggle = document.getElementById('performance-toggle');
        if (performanceToggle) performanceToggle.classList.remove('active');
        
        localStorage.setItem('performance-mode', 'false');
        document.body.classList.remove('performance-mode');
        
        // Force enable glassmorphism when performance mode is disabled
        const glassmorphismToggle = document.getElementById('glassmorphism-toggle');
        if (glassmorphismToggle) glassmorphismToggle.classList.add('active');
        localStorage.setItem('glassmorphism-enabled', 'true');
        document.body.classList.remove('no-glassmorphism');
        
        // Apply visual settings
        if (this.tracker && this.tracker.applyGlobalVisualSettings) {
            this.tracker.applyGlobalVisualSettings();
        }
        
        // Update settings visuals immediately
        this.updateSettingsVisuals();
        
        this.tracker.showNotification('Performance mode disabled - Glassmorphism enabled');
    }

    async toggleCanvasIntegration() {
        if (this.tracker.canvasConnected) {
            // Disconnect
            this.tracker.canvasConnected = false;
            localStorage.setItem('canvasConnected', 'false');
            localStorage.removeItem('canvas-user-name');
            localStorage.removeItem('canvas-user-email');
            this.tracker.showNotification('Canvas LMS disconnected');
        } else {
            // Connect
            const canvasUrl = document.getElementById('canvas-url')?.value;
            const canvasToken = document.getElementById('canvas-token')?.value;
            
            if (!canvasUrl) {
                this.tracker.showNotification('Please enter your Canvas URL', 'error');
                return;
            }
            
            try {
                // Save the URL and token
                localStorage.setItem('canvasURL', canvasUrl);
                if (canvasToken) {
                    localStorage.setItem('canvasToken', canvasToken);
                }
                
                await this.connectToCanvas(canvasUrl, canvasToken);
                this.tracker.canvasConnected = true;
                localStorage.setItem('canvasConnected', 'true');
                this.tracker.showNotification('Canvas LMS connected successfully!');
            } catch (error) {
                this.tracker.showNotification('Failed to connect to Canvas LMS: ' + error.message, 'error');
            }
        }
        this.renderSettingsPage();
    }

    async toggleGoogleIntegration() {
        if (this.tracker.googleConnected) {
            // Disconnect
            this.tracker.googleConnected = false;
            localStorage.setItem('googleConnected', 'false');
            this.tracker.showNotification('Google Classroom disconnected');
        } else {
            // Connect
            try {
                await this.connectToGoogle();
                this.tracker.googleConnected = true;
                localStorage.setItem('googleConnected', 'true');
                this.tracker.showNotification('Google Classroom connected successfully!');
            } catch (error) {
                this.tracker.showNotification('Failed to connect to Google Classroom', 'error');
            }
        }
        this.renderSettingsPage();
    }

    async connectToGoogle() {
        // Simulate Google Classroom API connection
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // In a real implementation, this would handle Google OAuth
                resolve();
            }, 1000);
        });
    }

    showCanvasHelp() {
        const helpModal = document.createElement('div');
        helpModal.className = 'help-modal';
        helpModal.innerHTML = `
            <div class="help-content glass-card">
                <div class="help-header">
                    <h2>🎨 Canvas API Token Setup</h2>
                    <button class="close-btn" onclick="this.closest('.help-modal').remove()">×</button>
                </div>
                
                <div class="help-body">
                    <h3>How to get your Canvas API Token:</h3>
                    <ol>
                        <li>Log into your Canvas account</li>
                        <li>Go to <strong>Account → Settings</strong></li>
                        <li>Scroll down to <strong>Approved Integrations</strong></li>
                        <li>Click <strong>+ New Access Token</strong></li>
                        <li>Enter a purpose (e.g., "StudyFlow Integration")</li>
                        <li>Set expiration date (optional)</li>
                        <li>Click <strong>Generate Token</strong></li>
                        <li>Copy the token and paste it here</li>
                    </ol>
                    
                    <div class="help-note">
                        <strong>Note:</strong> The API token is optional but provides enhanced features like:
                        <ul>
                            <li>Automatic assignment sync</li>
                            <li>Real-time updates</li>
                            <li>Grade information</li>
                            <li>Course details</li>
                        </ul>
                        Without the token, basic sync will still work using your Canvas URL.
                    </div>
                </div>
                
                <div class="help-actions">
                    <button class="btn btn-primary" onclick="this.closest('.help-modal').remove()">
                        Got it!
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(helpModal);
        
        // Add click outside to close
        setTimeout(() => {
            helpModal.addEventListener('click', (e) => {
                if (e.target === helpModal) {
                    helpModal.remove();
                }
            });
        }, 100);
    }

    exportData() {
        const data = {
            assignments: this.tracker.assignments,
            settings: {
                darkMode: this.tracker.isDarkMode,
                primaryColor: localStorage.getItem('primary-color'),
                secondaryColor: localStorage.getItem('secondary-color'),
                accentColor: localStorage.getItem('accent-color'),
                backgroundType: localStorage.getItem('background-type')
            },
            exportDate: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `hw-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.tracker.showNotification('Data exported successfully!');
    }

    importData(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                
                if (data.assignments) {
                    this.tracker.assignments = data.assignments;
                    this.tracker.saveAssignments();
                }

                if (data.settings) {
                    Object.entries(data.settings).forEach(([key, value]) => {
                        if (value !== null && value !== undefined) {
                            localStorage.setItem(key, value.toString());
                        }
                    });
                }

                this.tracker.renderAssignments();
                this.tracker.showNotification('Data imported successfully!');
                
                // Refresh the page to apply all settings
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
                
            } catch (error) {
                this.tracker.showNotification('Failed to import data. Invalid file format.', 'error');
            }
        };
        reader.readAsText(file);
    }

    clearAllData() {
        this.showClearDataConfirmation();
    }

    showClearDataConfirmation() {
        const modal = document.createElement('div');
        modal.className = 'clear-data-modal';
        modal.innerHTML = `
            <div class="clear-data-content glass-card">
                <div class="clear-data-header">
                    <h3>⚠️ Clear All Data</h3>
                </div>
                
                <div class="clear-data-body">
                    <div class="warning-icon">🗑️</div>
                    <p><strong>This will permanently delete:</strong></p>
                    <ul>
                        <li>All assignments and tasks</li>
                        <li>Settings and preferences</li>
                        <li>API connections</li>
                        <li>Completion streaks</li>
                        <li>All stored data</li>
                    </ul>
                    <p class="warning-text">This action cannot be undone!</p>
                    
                    <div class="clear-data-actions">
                        <button class="btn btn-secondary" onclick="this.closest('.clear-data-modal').remove()">
                            Cancel
                        </button>
                        <button class="btn danger-btn" onclick="settingsManager.confirmClearAllData()">
                            Clear All Data
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        }, 100);
    }

    confirmClearAllData() {
        localStorage.clear();
        this.tracker.assignments = [];
        this.tracker.renderAssignments();
        this.tracker.showNotification('All data cleared successfully!');
        
        // Close modal
        const modal = document.querySelector('.clear-data-modal');
        if (modal) modal.remove();
        
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    // Add method to handle individual feature purchases
    purchaseFeature(featureName) {
        const modal = document.createElement('div');
        modal.className = 'purchase-modal';
        modal.innerHTML = `
            <div class="purchase-content glass-card">
                <div class="purchase-header">
                    <h2>💳 Purchase Feature</h2>
                    <button class="close-btn" onclick="this.closest('.purchase-modal').remove()">×</button>
                </div>
                
                <div class="purchase-body">
                    <div class="feature-info">
                        <h3>${this.getFeatureName(featureName)}</h3>
                        <p>${this.getFeatureDescription(featureName)}</p>
                    </div>
                    
                    <div class="purchase-options">
                        <div class="option-card">
                            <h4>Individual Feature</h4>
                            <div class="price">$1.99</div>
                            <p>One-time purchase</p>
                            <button class="btn btn-primary" onclick="settingsManager.buyIndividualFeature('${featureName}')">
                                Buy Now
                            </button>
                        </div>
                        
                        <div class="option-card recommended">
                            <div class="recommended-badge">Best Value</div>
                            <h4>Premium Bundle</h4>
                            <div class="price">$4.99<span class="period">/month</span></div>
                            <p>All premium features</p>
                            <button class="btn btn-premium" onclick="settingsManager.startTrial()">
                                Start Trial
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        }, 100);
    }

    getFeatureName(feature) {
        const names = {
            'custom-colors': 'Custom Color Schemes',
            'custom-images': 'Custom Background Images',
            'advanced-analytics': 'Advanced Analytics',
            'cloud-sync': 'Cloud Sync',
            'premium-themes': 'Premium Themes'
        };
        return names[feature] || 'Premium Feature';
    }

    getFeatureDescription(feature) {
        const descriptions = {
            'custom-colors': 'Create unlimited custom color palettes to personalize your workspace.',
            'custom-images': 'Upload your own background images for a unique experience.',
            'advanced-analytics': 'Detailed insights into your productivity and study patterns.',
            'cloud-sync': 'Sync your data across all devices automatically.',
            'premium-themes': 'Access exclusive themes and visual effects.'
        };
        return descriptions[feature] || 'Unlock this premium feature to enhance your experience.';
    }

    buyIndividualFeature(featureName) {
        // Simulate individual feature purchase
        const purchasedFeatures = JSON.parse(localStorage.getItem('purchased-features') || '[]');
        if (!purchasedFeatures.includes(featureName)) {
            purchasedFeatures.push(featureName);
            localStorage.setItem('purchased-features', JSON.stringify(purchasedFeatures));
        }
        
        // Close modal
        const modal = document.querySelector('.purchase-modal');
        if (modal) modal.remove();
        
        // Show success message
        this.tracker.showNotification(`🎉 ${this.getFeatureName(featureName)} purchased successfully!`, 'success');
        
        // Refresh settings
        this.renderSettingsPage();
    }

    hasFeatureAccess(featureName) {
        // Check if user has premium or purchased individual feature
        const isPremium = this.isPremiumUser();
        const purchasedFeatures = JSON.parse(localStorage.getItem('purchased-features') || '[]');
        return isPremium || purchasedFeatures.includes(featureName);
    }
}
