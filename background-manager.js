// Background Manager - Pattern and Image Upload Functionality

class BackgroundManager {
    constructor(tracker) {
        this.tracker = tracker;
        this.patterns = {
            dots: this.generateDotsPattern,
            grid: this.generateGridPattern,
            waves: this.generateWavesPattern,
            hexagon: this.generateHexagonPattern
        };
    }

    applyBackground(type) {
        const body = document.body;
        
        // Save the background type
        localStorage.setItem('background-type', type);
        
        // Remove existing background classes
        body.classList.remove('pattern-bg', 'image-bg', 'solid-bg', 'video-bg');
        
        // Remove existing pattern elements and video backgrounds
        const existingPattern = document.querySelector('.background-pattern');
        if (existingPattern) {
            existingPattern.remove();
        }
        
        const existingVideo = document.querySelector('.background-video');
        const existingOverlay = document.querySelector('.video-overlay');
        if (existingVideo) {
            // Clean up resize handler
            if (existingVideo._resizeHandler) {
                window.removeEventListener('resize', existingVideo._resizeHandler);
            }
            existingVideo.remove();
        }
        if (existingOverlay) {
            existingOverlay.remove();
        }

        switch (type) {
            case 'gradient':
                this.applyGradientBackground();
                break;
            case 'pattern':
                this.applyPatternBackground();
                break;
            case 'image':
                this.applyImageBackground();
                break;
            case 'video':
                this.applyVideoBackground();
                break;
            case 'solid':
                this.applySolidBackground();
                break;
        }
    }

    applyGradientBackground() {
        const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
        const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color').trim();
        
        document.body.style.background = `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`;
    }

    applyPatternBackground() {
        const savedPattern = localStorage.getItem('background-pattern') || 'dots';
        this.applyPattern(savedPattern);
    }

    applyPattern(patternName) {
        if (!this.patterns[patternName]) return;

        const patternElement = document.createElement('div');
        patternElement.className = 'background-pattern';
        patternElement.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -2;
            opacity: 0.1;
        `;

        this.patterns[patternName](patternElement);
        document.body.appendChild(patternElement);
        document.body.classList.add('pattern-bg');

        localStorage.setItem('background-pattern', patternName);
    }

    generateDotsPattern(element) {
        element.style.background = `
            radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, white 2px, transparent 2px)
        `;
        element.style.backgroundSize = '50px 50px';
        element.style.backgroundPosition = '0 0, 25px 25px';
    }

    generateGridPattern(element) {
        element.style.background = `
            linear-gradient(white 1px, transparent 1px),
            linear-gradient(90deg, white 1px, transparent 1px)
        `;
        element.style.backgroundSize = '30px 30px';
    }

    generateWavesPattern(element) {
        const svg = `
            <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 30c15 0 15-30 30-30s15 30 30 30v30H0V30z" fill="white" opacity="0.3"/>
            </svg>
        `;
        const encodedSvg = encodeURIComponent(svg);
        element.style.backgroundImage = `url("data:image/svg+xml,${encodedSvg}")`;
        element.style.backgroundSize = '60px 60px';
    }

    generateHexagonPattern(element) {
        const svg = `
            <svg width="56" height="100" viewBox="0 0 56 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M28 66L0 50V16l28-16 28 16v34L28 66z" fill="none" stroke="white" stroke-width="2" opacity="0.3"/>
                <path d="M28 0L0 16v34l28 16 28-16V16L28 0z" fill="none" stroke="white" stroke-width="2" opacity="0.3"/>
            </svg>
        `;
        const encodedSvg = encodeURIComponent(svg);
        element.style.backgroundImage = `url("data:image/svg+xml,${encodedSvg}")`;
        element.style.backgroundSize = '56px 100px';
    }

    applyImageBackground() {
        const savedImage = localStorage.getItem('background-image');
        if (savedImage) {
            document.body.style.background = `url(${savedImage}) center/cover no-repeat`;
            document.body.classList.add('image-bg');
        }
    }

    applyVideoBackground() {
        const savedVideo = localStorage.getItem('background-video');
        if (savedVideo) {
            console.log('🎬 Applying video background from localStorage');
            document.body.classList.add('video-bg');
            this.createVideoBackground(savedVideo);
        } else {
            console.log('⚠️ No video background found in localStorage');
        }
    }

    createVideoBackground(videoData) {
        console.log('🎬 Creating video background...', {
            dataSize: videoData.length,
            dataType: videoData.substring(0, 50)
        });
        
        // Create video element
        const videoElement = document.createElement('video');
        videoElement.className = 'background-video';
        videoElement.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            object-fit: cover;
            object-position: center;
            z-index: -3;
            pointer-events: none;
            background: #000;
            transform: translateZ(0);
            -webkit-transform: translateZ(0);
        `;
        
        // Video attributes for seamless loop
        videoElement.autoplay = true;
        videoElement.muted = true;
        videoElement.loop = true;
        videoElement.playsInline = true;
        videoElement.preload = 'metadata';
        
        // Set video source
        videoElement.src = videoData;
        
        // Add overlay for better text readability
        const overlay = document.createElement('div');
        overlay.className = 'video-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.3);
            z-index: -2;
            pointer-events: none;
        `;
        
        // Add debugging event listeners
        videoElement.addEventListener('loadstart', () => {
            console.log('🎬 Video loading started');
        });
        
        videoElement.addEventListener('loadedmetadata', () => {
            console.log('🎬 Video metadata loaded:', {
                duration: videoElement.duration,
                width: videoElement.videoWidth,
                height: videoElement.videoHeight
            });
        });
        
        videoElement.addEventListener('loadeddata', () => {
            console.log('🎬 Video data loaded');
        });
        
        videoElement.addEventListener('canplay', () => {
            console.log('🎬 Video can start playing');
            videoElement.play().then(() => {
                console.log('✅ Video background playing successfully!');
                this.tracker.showNotification('🎬 Video background active!', 'success');
            }).catch(e => {
                console.warn('⚠️ Video autoplay prevented:', e);
                this.tracker.showNotification('Click anywhere to start video background', 'info');
                
                // Try to play on user interaction
                document.addEventListener('click', () => {
                    videoElement.play().then(() => {
                        console.log('✅ Video started after user interaction');
                    }).catch(err => {
                        console.error('❌ Video play failed:', err);
                    });
                }, { once: true });
            });
        });
        
        videoElement.addEventListener('playing', () => {
            console.log('🎬 Video is now playing');
        });
        
        videoElement.addEventListener('pause', () => {
            console.log('⏸️ Video paused');
        });
        
        // Handle video load errors
        videoElement.addEventListener('error', (e) => {
            console.error('❌ Video background failed to load:', e);
            console.error('Video error details:', {
                error: videoElement.error,
                networkState: videoElement.networkState,
                readyState: videoElement.readyState
            });
            this.tracker.showNotification('Video background failed to load', 'error');
            this.applyGradientBackground(); // Fallback to gradient
        });
        
        // Add to DOM
        document.body.appendChild(videoElement);
        document.body.appendChild(overlay);
        document.body.classList.add('video-bg');
        
        // Handle screen resize to maintain proper fit
        const handleResize = () => {
            const windowAspect = window.innerWidth / window.innerHeight;
            const videoAspect = videoElement.videoWidth / videoElement.videoHeight;
            
            if (videoAspect > 0) { // Only adjust if video dimensions are available
                if (windowAspect > videoAspect) {
                    // Window is wider than video - fit to width
                    videoElement.style.width = '100vw';
                    videoElement.style.height = 'auto';
                } else {
                    // Window is taller than video - fit to height
                    videoElement.style.width = 'auto';
                    videoElement.style.height = '100vh';
                }
            }
        };
        
        // Listen for resize events
        window.addEventListener('resize', handleResize);
        
        // Apply initial sizing when video metadata loads
        videoElement.addEventListener('loadedmetadata', handleResize);
        
        // Store resize handler for cleanup
        videoElement._resizeHandler = handleResize;
        
        console.log('🎬 Video element added to DOM with responsive sizing');
    }

    applySolidBackground() {
        const savedColor = localStorage.getItem('background-solid-color') || '#0f172a';
        document.body.style.background = savedColor;
        document.body.classList.add('solid-bg');
    }

    updateSolidColor(color) {
        localStorage.setItem('background-solid-color', color);
        if (document.body.classList.contains('solid-bg')) {
            document.body.style.background = color;
        }
    }

    handleImageUpload(file) {
        if (!file || !file.type.startsWith('image/')) {
            this.tracker.showNotification('Please select a valid image file', 'error');
            return;
        }

        // Check file size (max 50MB for images)
        if (file.size > 50 * 1024 * 1024) {
            const sizeMB = (file.size / 1024 / 1024).toFixed(1);
            this.tracker.showNotification(`Image file too large (${sizeMB}MB). Please choose a file under 50MB`, 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const imageData = e.target.result;
            
            // Check if the base64 data will fit in localStorage
            const estimatedSize = imageData.length * 0.75; // Base64 is ~33% larger than binary
            const availableSpace = this.getAvailableLocalStorageSpace();
            
            if (estimatedSize > availableSpace) {
                const sizeMB = (estimatedSize / 1024 / 1024).toFixed(1);
                const availableMB = (availableSpace / 1024 / 1024).toFixed(1);
                this.tracker.showNotification(`Image too large for storage (${sizeMB}MB). Available space: ${availableMB}MB. Try a smaller file.`, 'error');
                return;
            }
            
            try {
                localStorage.setItem('background-image', imageData);
                localStorage.setItem('background-type', 'image');
                
                this.applyImageBackground();
                this.tracker.showNotification('🖼️ Background image updated successfully!', 'success');
            } catch (error) {
                console.error('Failed to save image to localStorage:', error);
                if (error.name === 'QuotaExceededError') {
                    this.tracker.showNotification('Storage quota exceeded. Please try a smaller image file or clear some data.', 'error');
                    this.showStorageCleanupOptions();
                } else {
                    this.tracker.showNotification('Failed to save background image. Please try again.', 'error');
                }
            }
        };
        
        reader.onerror = () => {
            this.tracker.showNotification('Failed to read image file. Please try again.', 'error');
        };
        
        reader.readAsDataURL(file);
    }

    handleVideoUpload(file) {
        if (!file || !file.type.startsWith('video/')) {
            this.tracker.showNotification('Please select a valid video file', 'error');
            return;
        }

        // Check file size (max 100MB for localStorage compatibility)
        const maxSize = 100 * 1024 * 1024; // 100MB
        if (file.size > maxSize) {
            const sizeMB = (file.size / 1024 / 1024).toFixed(1);
            this.tracker.showNotification(`Video file too large (${sizeMB}MB). Please choose a file under 100MB.`, 'error');
            return;
        }

        // Check video format
        const supportedFormats = ['video/mp4', 'video/webm', 'video/ogg'];
        if (!supportedFormats.includes(file.type)) {
            this.tracker.showNotification('Unsupported video format. Please use MP4, WebM, or OGG', 'error');
            return;
        }

        this.tracker.showNotification('Processing video background...', 'info');

        const reader = new FileReader();
        reader.onload = (e) => {
            const videoData = e.target.result;
            
            // Check if the base64 data will fit in localStorage
            const estimatedSize = videoData.length * 0.75; // Base64 is ~33% larger than binary
            const availableSpace = this.getAvailableLocalStorageSpace();
            
            if (estimatedSize > availableSpace) {
                const sizeMB = (estimatedSize / 1024 / 1024).toFixed(1);
                const availableMB = (availableSpace / 1024 / 1024).toFixed(1);
                this.tracker.showNotification(`Video too large for storage (${sizeMB}MB). Available space: ${availableMB}MB. Try a smaller file.`, 'error');
                return;
            }
            
            try {
                localStorage.setItem('background-video', videoData);
                localStorage.setItem('background-type', 'video');
                
                this.applyVideoBackground();
                this.tracker.showNotification('🎬 Video background updated successfully!', 'success');
            } catch (error) {
                console.error('Failed to save video to localStorage:', error);
                if (error.name === 'QuotaExceededError') {
                    this.tracker.showNotification('Storage quota exceeded. Please try a smaller video file or clear some data.', 'error');
                    this.showStorageCleanupOptions();
                } else {
                    this.tracker.showNotification('Failed to save video background. Please try again.', 'error');
                }
            }
        };
        
        reader.onerror = () => {
            this.tracker.showNotification('Failed to read video file. Please try again.', 'error');
        };
        
        reader.readAsDataURL(file);
    }

    getAvailableLocalStorageSpace() {
        // Estimate available localStorage space
        let totalSize = 0;
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                totalSize += localStorage[key].length + key.length;
            }
        }
        
        // Modern browsers support much larger localStorage limits
        // Chrome/Firefox: ~10MB, Safari: ~5MB, but we'll be optimistic
        const estimatedLimit = 100 * 1024 * 1024; // 100MB optimistic estimate
        return Math.max(0, estimatedLimit - totalSize);
    }

    showStorageCleanupOptions() {
        const modal = document.createElement('div');
        modal.className = 'storage-cleanup-modal';
        modal.innerHTML = `
            <div class="storage-cleanup-content glass-card">
                <div class="storage-cleanup-header">
                    <h3>💾 Storage Full</h3>
                    <button class="close-btn" onclick="this.closest('.storage-cleanup-modal').remove()">×</button>
                </div>
                <div class="storage-cleanup-body">
                    <p>Your browser's storage is full. To upload a video background, you can:</p>
                    <ul>
                        <li>Remove existing background images/videos</li>
                        <li>Clear assignment data</li>
                        <li>Use a smaller file (under 50MB recommended)</li>
                        <li>Try compressing your image/video</li>
                    </ul>
                    <div class="storage-info">
                        <strong>Current storage usage:</strong> ${this.calculateStorageUsage()}
                    </div>
                </div>
                <div class="storage-cleanup-actions">
                    <button class="btn btn-secondary" onclick="this.closest('.storage-cleanup-modal').remove()">Cancel</button>
                    <button class="btn btn-danger" onclick="backgroundManager.clearBackgroundData(); this.closest('.storage-cleanup-modal').remove()">Clear Background Data</button>
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

    calculateStorageUsage() {
        let totalSize = 0;
        const items = {};
        
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                const size = localStorage[key].length + key.length;
                totalSize += size;
                items[key] = (size / 1024).toFixed(1) + 'KB';
            }
        }
        
        return `${(totalSize / 1024).toFixed(1)}KB total`;
    }

    clearBackgroundData() {
        localStorage.removeItem('background-image');
        localStorage.removeItem('background-video');
        localStorage.removeItem('background-pattern');
        localStorage.removeItem('background-solid-color');
        
        // Remove existing backgrounds
        const existingVideo = document.querySelector('.background-video');
        const existingOverlay = document.querySelector('.video-overlay');
        if (existingVideo) existingVideo.remove();
        if (existingOverlay) existingOverlay.remove();
        
        document.body.classList.remove('video-bg', 'image-bg');
        this.applyGradientBackground();
        
        this.tracker.showNotification('Background data cleared. You can now try uploading your video again.', 'success');
    }

    updateSolidColor(color) {
        localStorage.setItem('background-solid-color', color);
        localStorage.setItem('background-type', 'solid');
        this.applySolidBackground();
    }

    // Initialize background on app load
    initializeBackground() {
        const backgroundType = localStorage.getItem('background-type') || 'gradient';
        console.log('🎨 Initializing background:', backgroundType);
        
        // Debug: Check if video background exists
        if (backgroundType === 'video') {
            const savedVideo = localStorage.getItem('background-video');
            console.log('🎬 Video background check:', {
                hasVideo: !!savedVideo,
                videoSize: savedVideo ? savedVideo.length : 0
            });
        }
        
        this.applyBackground(backgroundType);
    }

    // Create background preview for settings
    createPatternPreview(patternName) {
        const preview = document.createElement('div');
        preview.style.cssText = `
            width: 60px;
            height: 60px;
            border-radius: 8px;
            border: 2px solid var(--glass-border);
            overflow: hidden;
            position: relative;
            background: var(--glass-bg);
        `;

        const patternDiv = document.createElement('div');
        patternDiv.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0.5;
        `;

        if (this.patterns[patternName]) {
            this.patterns[patternName](patternDiv);
        }

        preview.appendChild(patternDiv);
        return preview;
    }

    // Export/Import background settings
    exportBackgroundSettings() {
        return {
            type: localStorage.getItem('background-type'),
            pattern: localStorage.getItem('background-pattern'),
            image: localStorage.getItem('background-image'),
            video: localStorage.getItem('background-video'),
            solidColor: localStorage.getItem('background-solid-color')
        };
    }

    importBackgroundSettings(settings) {
        if (settings.type) localStorage.setItem('background-type', settings.type);
        if (settings.pattern) localStorage.setItem('background-pattern', settings.pattern);
        if (settings.image) localStorage.setItem('background-image', settings.image);
        if (settings.video) localStorage.setItem('background-video', settings.video);
        if (settings.solidColor) localStorage.setItem('background-solid-color', settings.solidColor);
        
        this.initializeBackground();
    }

    // Remove video background
    removeVideoBackground() {
        localStorage.removeItem('background-video');
        const existingVideo = document.querySelector('.background-video');
        const existingOverlay = document.querySelector('.video-overlay');
        
        // Clean up resize handler
        if (existingVideo && existingVideo._resizeHandler) {
            window.removeEventListener('resize', existingVideo._resizeHandler);
        }
        
        if (existingVideo) existingVideo.remove();
        if (existingOverlay) existingOverlay.remove();
        
        document.body.classList.remove('video-bg');
        this.applyGradientBackground(); // Fallback to gradient
        this.tracker.showNotification('Video background removed', 'success');
    }

    // Debug helper for testing video backgrounds
    debugVideoBackground() {
        const savedVideo = localStorage.getItem('background-video');
        const videoElement = document.querySelector('.background-video');
        
        console.group('🎬 Video Background Debug Info');
        console.log('Saved video exists:', !!savedVideo);
        console.log('Video element exists:', !!videoElement);
        console.log('Body has video-bg class:', document.body.classList.contains('video-bg'));
        
        if (savedVideo) {
            console.log('Video data size:', savedVideo.length);
            console.log('Video data type:', savedVideo.substring(0, 50));
        }
        
        if (videoElement) {
            console.log('Video element state:', {
                src: videoElement.src ? 'Set' : 'Not set',
                readyState: videoElement.readyState,
                networkState: videoElement.networkState,
                paused: videoElement.paused,
                muted: videoElement.muted,
                loop: videoElement.loop,
                autoplay: videoElement.autoplay,
                currentTime: videoElement.currentTime,
                duration: videoElement.duration
            });
        }
        
        console.log('Background type:', localStorage.getItem('background-type'));
        console.groupEnd();
        
        return {
            hasVideo: !!savedVideo,
            hasElement: !!videoElement,
            isActive: document.body.classList.contains('video-bg')
        };
    }
}

// Add CSS for background patterns
const backgroundStyles = document.createElement('style');
backgroundStyles.textContent = `
    body.pattern-bg {
        position: relative;
    }

    body.image-bg::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
        z-index: -1;
        pointer-events: none;
    }

    body.solid-bg {
        background-attachment: fixed;
    }

    body.video-bg {
        position: relative;
        overflow-x: hidden; /* Prevent horizontal scroll */
    }

    .background-video {
        will-change: transform;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        /* Ensure video stays static and covers full screen */
        min-width: 100vw;
        min-height: 100vh;
        max-width: none;
        max-height: none;
        /* Prevent video from affecting layout */
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        /* Ensure proper aspect ratio handling */
        object-fit: cover !important;
        object-position: center center !important;
    }

    .video-overlay {
        backdrop-filter: blur(1px);
        -webkit-backdrop-filter: blur(1px);
        /* Ensure overlay is also static */
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
    }

    /* Performance optimizations for video backgrounds */
    body.video-bg.performance-mode .background-video {
        filter: blur(2px);
        transform: scale(1.05) translateZ(0); /* Slight scale for performance */
    }

    body.video-bg.performance-mode .video-overlay {
        background: rgba(0, 0, 0, 0.5) !important;
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
    }

    /* Responsive video background for different screen sizes */
    @media (max-aspect-ratio: 16/9) {
        .background-video {
            width: auto;
            height: 100vh;
        }
    }

    @media (min-aspect-ratio: 16/9) {
        .background-video {
            width: 100vw;
            height: auto;
        }
    }

    /* Mobile optimizations */
    @media (max-width: 768px) {
        .background-video {
            /* Ensure video doesn't cause performance issues on mobile */
            transform: translateZ(0) scale(1);
            -webkit-transform: translateZ(0) scale(1);
        }
        
        body.video-bg.performance-mode .background-video {
            filter: blur(3px);
            transform: scale(1.1) translateZ(0);
        }
    }

    /* Prevent video background from interfering with content */
    body.video-bg .main-content,
    body.video-bg .bottom-nav,
    body.video-bg .glass-card {
        position: relative;
        z-index: 1;
    }

    .background-pattern {
        animation: patternFloat 20s ease-in-out infinite;
    }

    @keyframes patternFloat {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-10px) rotate(1deg); }
    }

    /* Pattern options in settings */
    .pattern-option {
        position: relative;
        overflow: hidden;
    }

    .pattern-option::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0.2;
        pointer-events: none;
    }

    .pattern-option[data-pattern="dots"]::before {
        background: radial-gradient(circle at 25% 25%, currentColor 2px, transparent 2px),
                   radial-gradient(circle at 75% 75%, currentColor 2px, transparent 2px);
        background-size: 20px 20px;
        background-position: 0 0, 10px 10px;
    }

    .pattern-option[data-pattern="grid"]::before {
        background: linear-gradient(currentColor 1px, transparent 1px),
                   linear-gradient(90deg, currentColor 1px, transparent 1px);
        background-size: 15px 15px;
    }

    .pattern-option[data-pattern="waves"]::before {
        background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20c10 0 10-20 20-20s10 20 20 20v20H0V20z' fill='%23ffffff' opacity='0.3'/%3E%3C/svg%3E");
        background-size: 40px 40px;
    }

    .pattern-option[data-pattern="hexagon"]::before {
        background-image: url("data:image/svg+xml,%3Csvg width='28' height='50' viewBox='0 0 28 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14 33L0 25V8l14-8 14 8v17L14 33z' fill='none' stroke='%23ffffff' stroke-width='1' opacity='0.3'/%3E%3C/svg%3E");
        background-size: 28px 50px;
    }
`;

document.head.appendChild(backgroundStyles);

// Make debug function globally accessible
window.debugVideoBackground = function() {
    if (window.settingsManager && window.settingsManager.backgroundManager) {
        return window.settingsManager.backgroundManager.debugVideoBackground();
    } else {
        console.error('Background manager not available');
        return null;
    }
};

// Make background manager globally accessible for cleanup functions
window.backgroundManager = {
    clearBackgroundData: function() {
        if (window.settingsManager && window.settingsManager.backgroundManager) {
            return window.settingsManager.backgroundManager.clearBackgroundData();
        } else {
            console.error('Background manager not available');
        }
    }
};

// Test video background with sample video
window.testVideoBackground = function() {
    console.log('🎬 Testing video background...');
    
    // Create a test video URL (you can replace this with any video URL)
    const testVideoUrl = 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4';
    
    if (window.settingsManager && window.settingsManager.backgroundManager) {
        // Temporarily store test video
        localStorage.setItem('background-video', testVideoUrl);
        localStorage.setItem('background-type', 'video');
        
        // Apply video background
        window.settingsManager.backgroundManager.applyVideoBackground();
        
        console.log('✅ Test video background applied! Check console for debug info.');
        return true;
    } else {
        console.error('❌ Background manager not available');
        return false;
    }
};
