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
                        <label for="glassmorphism">Glassmorphism Effects (high end device recommended)</label>
                        <div class="toggle-switch active" id="glassmorphism-toggle"></div>
                    </div>
                    <div class="setting-item">
                        <label for="animations">Smooth Animations</label>
                        <div class="toggle-switch active" id="animations-toggle"></div>
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
                                    <p>Upload your own background images for a truly personalized experience.</p>
                                    <button class="btn btn-premium" onclick="settingsManager.showUpgradeModal('custom-images')">Upgrade to Premium</button>
                                </div>
                            </div>
                            <div class="upload-area blurred" id="upload-area">
                                <div class="upload-content">
                                    <span class="upload-icon">📷</span>
                                    <p>Click to upload or drag & drop</p>
                                    <small>Supports JPG, PNG, GIF (max 5MB)</small>
                                </div>
                                <input type="file" id="background-image-input" accept="image/*" style="display: none;" disabled>
                            </div>
                            <button class="btn btn-secondary blurred" id="remove-bg-image" style="display: none;" disabled>Remove Image</button>
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
        
        // Apply saved settings on load
        this.applySavedSettings();
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
                    this.tracker.showNotification('Glassmorphism effects disabled');
                } else {
                    glassmorphismToggle.classList.add('active');
                    localStorage.setItem('glassmorphism-enabled', 'true');
                    document.body.classList.remove('no-glassmorphism');
                    this.tracker.showNotification('Glassmorphism effects enabled');
                }
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
                    this.tracker.showNotification('Animations disabled');
                } else {
                    animationsToggle.classList.add('active');
                    localStorage.setItem('animations-enabled', 'true');
                    document.body.classList.remove('no-animations');
                    this.tracker.showNotification('Animations enabled');
                }
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
        
        // Apply dark mode if saved
        if (this.tracker.isDarkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
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
        
        if (isPremium && trialStart) {
            const trialDuration = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
            const now = Date.now();
            const trialExpired = (now - parseInt(trialStart)) > trialDuration;
            
            if (trialExpired) {
                // Trial expired, remove premium status
                localStorage.removeItem('premium-user');
                localStorage.removeItem('trial-start');
                return false;
            }
        }
        
        return isPremium;
    }

    showUpgradeModal(feature) {
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
        // Simulate starting trial
        localStorage.setItem('premium-user', 'true');
        localStorage.setItem('trial-start', Date.now().toString());
        
        // Close modal
        const modal = document.querySelector('.upgrade-modal');
        if (modal) modal.remove();
        
        // Show success message
        this.tracker.showNotification('🎉 Premium trial started! Enjoy all features for 7 days.', 'success');
        
        // Refresh settings to show unlocked features without reload
        this.renderSettingsPage();
        
        // Enable premium features immediately
        this.enablePremiumFeatures();
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
        const patternOptions = document.getElementById('pattern-options');
        const imageUploadSection = document.getElementById('image-upload-section');
        const backgroundColor = document.getElementById('background-color');

        // Hide all options first
        if (patternOptions) patternOptions.style.display = 'none';
        if (imageUploadSection) imageUploadSection.style.display = 'none';
        if (backgroundColor) backgroundColor.style.display = 'none';

        switch (type) {
            case 'pattern':
                if (patternOptions) patternOptions.style.display = 'block';
                this.backgroundManager.applyBackground('pattern');
                break;
            case 'image':
                if (imageUploadSection) imageUploadSection.style.display = 'block';
                this.backgroundManager.applyBackground('image');
                break;
            case 'solid':
                if (backgroundColor) backgroundColor.style.display = 'inline-block';
                this.backgroundManager.applyBackground('solid');
                break;
            case 'gradient':
                this.backgroundManager.applyBackground('gradient');
                break;
        }

        localStorage.setItem('background-type', type);
        this.tracker.applyBackground(type);
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
