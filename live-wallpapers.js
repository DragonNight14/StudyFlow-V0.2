// Live Wallpapers - Premium Feature
// Supports MP4 video backgrounds and animated wallpapers

class LiveWallpapers {
    constructor(tracker) {
        this.tracker = tracker;
        this.isPro = localStorage.getItem('premium-user') === 'true';
        this.currentWallpaper = null;
        this.videoElement = null;
        this.initializeLiveWallpapers();
    }

    initializeLiveWallpapers() {
        // Restore saved live wallpaper if user has premium access
        if (this.isPro) {
            this.restoreSavedWallpaper();
        }
    }

    restoreSavedWallpaper() {
        const savedWallpaper = localStorage.getItem('live-wallpaper');
        const wallpaperType = localStorage.getItem('live-wallpaper-type');
        
        if (savedWallpaper && wallpaperType) {
            if (wallpaperType === 'video') {
                this.setVideoWallpaper(savedWallpaper);
            } else if (wallpaperType === 'animated') {
                this.setAnimatedWallpaper(savedWallpaper);
            }
        }
    }

    setVideoWallpaper(videoSource) {
        if (!this.isPro) {
            this.showUpgradePrompt();
            return;
        }

        // Remove existing wallpaper
        this.clearCurrentWallpaper();

        // Create video element
        this.videoElement = document.createElement('video');
        this.videoElement.className = 'live-wallpaper-video';
        this.videoElement.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            object-fit: cover;
            z-index: -10;
            pointer-events: none;
            opacity: 0.3;
        `;

        // Set video properties
        this.videoElement.autoplay = true;
        this.videoElement.loop = true;
        this.videoElement.muted = true;
        this.videoElement.playsInline = true;
        this.videoElement.src = videoSource;

        // Add to body
        document.body.appendChild(this.videoElement);

        // Save wallpaper settings
        localStorage.setItem('live-wallpaper', videoSource);
        localStorage.setItem('live-wallpaper-type', 'video');
        localStorage.setItem('background-type', 'live-video');

        // Handle video load
        this.videoElement.addEventListener('loadeddata', () => {
            this.videoElement.play().catch(e => {
                console.warn('Video autoplay failed:', e);
            });
        });

        this.currentWallpaper = this.videoElement;
        this.tracker.showNotification('🎬 Live video wallpaper applied!', 'success');
    }

    setAnimatedWallpaper(wallpaperName) {
        if (!this.isPro) {
            this.showUpgradePrompt();
            return;
        }

        // Remove existing wallpaper
        this.clearCurrentWallpaper();

        // Create animated wallpaper element
        const wallpaperElement = document.createElement('div');
        wallpaperElement.className = 'live-wallpaper-animated';
        wallpaperElement.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: -10;
            pointer-events: none;
            opacity: 0.2;
        `;

        // Apply specific animated wallpaper
        this.applyAnimatedWallpaper(wallpaperElement, wallpaperName);

        document.body.appendChild(wallpaperElement);

        // Save wallpaper settings
        localStorage.setItem('live-wallpaper', wallpaperName);
        localStorage.setItem('live-wallpaper-type', 'animated');
        localStorage.setItem('background-type', 'live-animated');

        this.currentWallpaper = wallpaperElement;
        this.tracker.showNotification(`✨ Animated wallpaper "${wallpaperName}" applied!`, 'success');
    }

    applyAnimatedWallpaper(element, wallpaperName) {
        const wallpapers = {
            'floating-particles': this.createFloatingParticles,
            'geometric-waves': this.createGeometricWaves,
            'matrix-rain': this.createMatrixRain,
            'aurora-lights': this.createAuroraLights,
            'neural-network': this.createNeuralNetwork,
            'cosmic-dust': this.createCosmicDust
        };

        const wallpaperFunction = wallpapers[wallpaperName];
        if (wallpaperFunction) {
            wallpaperFunction.call(this, element);
        }
    }

    createFloatingParticles(container) {
        container.innerHTML = `
            <style>
                .floating-particle {
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%);
                    border-radius: 50%;
                    animation: floatUp 15s linear infinite;
                }
                @keyframes floatUp {
                    0% { transform: translateY(100vh) translateX(0px); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { transform: translateY(-100px) translateX(100px); opacity: 0; }
                }
            </style>
        `;

        // Create particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (10 + Math.random() * 10) + 's';
            container.appendChild(particle);
        }
    }

    createGeometricWaves(container) {
        container.innerHTML = `
            <style>
                .wave-container {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                }
                .wave {
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    width: 200%;
                    height: 200%;
                    margin-left: -100%;
                    border-radius: 45%;
                    background: linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
                    animation: waveRotate 20s linear infinite;
                }
                .wave:nth-child(2) {
                    animation-duration: 25s;
                    animation-direction: reverse;
                    background: linear-gradient(45deg, rgba(118, 75, 162, 0.05), rgba(102, 126, 234, 0.05));
                }
                @keyframes waveRotate {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            </style>
            <div class="wave-container">
                <div class="wave"></div>
                <div class="wave"></div>
            </div>
        `;
    }

    createMatrixRain(container) {
        container.innerHTML = `
            <style>
                .matrix-column {
                    position: absolute;
                    top: -100px;
                    color: rgba(0, 255, 0, 0.3);
                    font-family: 'Courier New', monospace;
                    font-size: 14px;
                    line-height: 14px;
                    animation: matrixFall linear infinite;
                }
                @keyframes matrixFall {
                    0% { transform: translateY(-100px); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { transform: translateY(100vh); opacity: 0; }
                }
            </style>
        `;

        // Create matrix columns
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        for (let i = 0; i < 30; i++) {
            const column = document.createElement('div');
            column.className = 'matrix-column';
            column.style.left = (i * 3.33) + '%';
            column.style.animationDuration = (5 + Math.random() * 10) + 's';
            column.style.animationDelay = Math.random() * 5 + 's';
            
            let columnText = '';
            for (let j = 0; j < 20; j++) {
                columnText += chars[Math.floor(Math.random() * chars.length)] + '<br>';
            }
            column.innerHTML = columnText;
            
            container.appendChild(column);
        }
    }

    createAuroraLights(container) {
        container.innerHTML = `
            <style>
                .aurora {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(45deg, 
                        rgba(0, 255, 127, 0.1) 0%,
                        rgba(0, 191, 255, 0.1) 25%,
                        rgba(138, 43, 226, 0.1) 50%,
                        rgba(255, 20, 147, 0.1) 75%,
                        rgba(0, 255, 127, 0.1) 100%);
                    background-size: 400% 400%;
                    animation: auroraShift 15s ease-in-out infinite;
                }
                @keyframes auroraShift {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
            </style>
            <div class="aurora"></div>
        `;
    }

    createNeuralNetwork(container) {
        // This would create an animated neural network visualization
        // Implementation would be more complex with canvas or SVG
        container.innerHTML = `
            <style>
                .neural-node {
                    position: absolute;
                    width: 6px;
                    height: 6px;
                    background: rgba(102, 126, 234, 0.6);
                    border-radius: 50%;
                    animation: pulse 3s ease-in-out infinite;
                }
                @keyframes pulse {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.5); }
                }
            </style>
        `;

        // Create neural nodes
        for (let i = 0; i < 20; i++) {
            const node = document.createElement('div');
            node.className = 'neural-node';
            node.style.left = Math.random() * 100 + '%';
            node.style.top = Math.random() * 100 + '%';
            node.style.animationDelay = Math.random() * 3 + 's';
            container.appendChild(node);
        }
    }

    createCosmicDust(container) {
        container.innerHTML = `
            <style>
                .cosmic-particle {
                    position: absolute;
                    background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%);
                    border-radius: 50%;
                    animation: cosmicDrift 20s linear infinite;
                }
                @keyframes cosmicDrift {
                    0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { transform: translate(200px, -200px) rotate(360deg); opacity: 0; }
                }
            </style>
        `;

        // Create cosmic dust particles
        for (let i = 0; i < 100; i++) {
            const particle = document.createElement('div');
            particle.className = 'cosmic-particle';
            const size = Math.random() * 3 + 1;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            container.appendChild(particle);
        }
    }

    clearCurrentWallpaper() {
        // Remove existing live wallpaper
        const existingVideo = document.querySelector('.live-wallpaper-video');
        const existingAnimated = document.querySelector('.live-wallpaper-animated');
        
        if (existingVideo) {
            existingVideo.remove();
        }
        if (existingAnimated) {
            existingAnimated.remove();
        }
        
        this.currentWallpaper = null;
        this.videoElement = null;
    }

    handleVideoUpload(file) {
        if (!this.isPro) {
            this.showUpgradePrompt();
            return;
        }

        if (!file || !file.type.startsWith('video/')) {
            this.tracker.showNotification('Please select a valid video file (MP4, WebM)', 'error');
            return;
        }

        // Check file size (max 50MB for videos)
        if (file.size > 50 * 1024 * 1024) {
            this.tracker.showNotification('Video file too large. Please choose a file under 50MB', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const videoData = e.target.result;
            this.setVideoWallpaper(videoData);
        };
        reader.readAsDataURL(file);
    }

    showUpgradePrompt() {
        const modal = document.createElement('div');
        modal.className = 'upgrade-modal';
        modal.innerHTML = `
            <div class="upgrade-content glass-card">
                <h2>🎬 Live Wallpapers - Premium Feature</h2>
                <p>Transform your workspace with stunning live wallpapers!</p>
                <div class="feature-list">
                    <div class="feature-item">🎥 MP4 Video Backgrounds</div>
                    <div class="feature-item">✨ Animated Wallpapers</div>
                    <div class="feature-item">🌊 Geometric Waves</div>
                    <div class="feature-item">🌌 Aurora Lights</div>
                    <div class="feature-item">🔮 Neural Networks</div>
                    <div class="feature-item">⭐ Cosmic Dust</div>
                </div>
                <div class="upgrade-buttons">
                    <button class="btn btn-premium" onclick="settingsManager.startTrial()">Start Free Trial</button>
                    <button class="btn btn-secondary" onclick="this.parentElement.parentElement.remove()">Maybe Later</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    getAvailableWallpapers() {
        return [
            { id: 'floating-particles', name: 'Floating Particles', type: 'animated' },
            { id: 'geometric-waves', name: 'Geometric Waves', type: 'animated' },
            { id: 'matrix-rain', name: 'Matrix Rain', type: 'animated' },
            { id: 'aurora-lights', name: 'Aurora Lights', type: 'animated' },
            { id: 'neural-network', name: 'Neural Network', type: 'animated' },
            { id: 'cosmic-dust', name: 'Cosmic Dust', type: 'animated' }
        ];
    }

    disable() {
        this.clearCurrentWallpaper();
        localStorage.removeItem('live-wallpaper');
        localStorage.removeItem('live-wallpaper-type');
        this.tracker.showNotification('Live wallpaper disabled', 'info');
    }
}
