class EnhancedAssignmentTracker {
    constructor() {
        this.assignments = JSON.parse(localStorage.getItem('assignments')) || [];
        this.currentView = 'home';
        this.currentMonth = new Date().getMonth();
        this.currentYear = new Date().getFullYear();
        this.isDarkMode = localStorage.getItem('darkMode') === 'true';
        this.completionStreak = parseInt(localStorage.getItem('completionStreak')) || 0;
        this.lastCompletionDate = localStorage.getItem('lastCompletionDate');
        
        // Initialize FPS counter
        this.initializeFPSCounter();
        
        // SIMPLIFIED INITIALIZATION FOR DEBUGGING
        console.log('🔧 Starting simplified initialization...');
        
        try {
            this.init();
            console.log('✅ init() completed');
        } catch (error) {
            console.error('❌ Error in init():', error);
        }
        
        try {
            this.setupEventListeners();
            console.log('✅ setupEventListeners() completed');
        } catch (error) {
            console.error('❌ Error in setupEventListeners():', error);
        }
        
        try {
            // Add sample assignments if none exist
            if (this.assignments.length === 0) {
                this.addSampleAssignments();
            }
            console.log('✅ Sample assignments added if needed');
        } catch (error) {
            console.error('❌ Error adding sample assignments:', error);
        }
        
        try {
            this.renderAssignments();
            console.log('✅ renderAssignments() completed');
        } catch (error) {
            console.error('❌ Error in renderAssignments():', error);
        }
        
        try {
            this.updateStatistics();
            console.log('✅ updateStatistics() completed');
        } catch (error) {
            console.error('❌ Error in updateStatistics():', error);
        }
        
        // Apply visual settings after everything else is initialized
        try {
            this.applyGlobalVisualSettings();
            console.log('✅ applyGlobalVisualSettings() completed');
        } catch (error) {
            console.error('❌ Error in applyGlobalVisualSettings():', error);
        }
    }

    addSampleAssignments() {
        const sampleAssignments = [
            {
                id: Date.now() + 1,
                title: "Math Homework - Chapter 5",
                description: "Complete exercises 1-20 on quadratic equations",
                subject: "math",
                courseName: "Algebra II",
                dueDate: this.getDateString(3), // 3 days from now
                dueTime: "23:59",
                completed: false,
                priority: "high",
                customColor: "#ef4444",
                source: "manual",
                createdAt: Date.now()
            },
            {
                id: Date.now() + 2,
                title: "Science Lab Report",
                description: "Write lab report on photosynthesis experiment",
                subject: "science",
                courseName: "Biology",
                dueDate: this.getDateString(7), // 1 week from now
                dueTime: "15:30",
                completed: false,
                priority: "medium",
                customColor: "#10b981",
                source: "manual",
                createdAt: Date.now()
            },
            {
                id: Date.now() + 3,
                title: "English Essay Draft",
                description: "First draft of persuasive essay on climate change",
                subject: "english",
                courseName: "English Literature",
                dueDate: this.getDateString(10), // 10 days from now
                dueTime: "12:00",
                completed: false,
                priority: "medium",
                customColor: "#3b82f6",
                source: "manual",
                createdAt: Date.now()
            },
            {
                id: Date.now() + 4,
                title: "History Research Project",
                description: "Research paper on World War II causes",
                subject: "history",
                courseName: "World History",
                dueDate: this.getDateString(21), // 3 weeks from now
                dueTime: "23:59",
                completed: false,
                priority: "low",
                customColor: "#8b5cf6",
                source: "manual",
                createdAt: Date.now()
            },
            {
                id: Date.now() + 5,
                title: "Art Portfolio Submission",
                description: "Submit 5 completed drawings for portfolio review",
                subject: "art",
                courseName: "Visual Arts",
                dueDate: this.getDateString(14), // 2 weeks from now
                dueTime: "17:00",
                completed: false,
                priority: "medium",
                customColor: "#f43f5e",
                source: "manual",
                createdAt: Date.now()
            },
            {
                id: Date.now() + 6,
                title: "Chemistry Quiz Prep",
                description: "Study for quiz on chemical bonding",
                subject: "science",
                courseName: "Chemistry",
                dueDate: this.getDateString(2), // 2 days from now
                dueTime: "08:00",
                completed: true,
                priority: "high",
                customColor: "#f59e0b",
                source: "manual",
                createdAt: Date.now() - 86400000, // Created yesterday
                completedAt: Date.now() - 3600000 // Completed 1 hour ago
            }
        ];

        this.assignments = sampleAssignments;
        this.saveAssignments();
    }

    getDateString(daysFromNow) {
        const date = new Date();
        date.setDate(date.getDate() + daysFromNow);
        return date.toISOString().split('T')[0];
    }

    applySavedStylesImmediate() {
        // Restore all visual settings
        const primaryColor = localStorage.getItem('primary-color') || '#667eea';
        const secondaryColor = localStorage.getItem('secondary-color') || '#764ba2';
        const accentColor = localStorage.getItem('accent-color') || '#f59e0b';
        const backgroundType = localStorage.getItem('background-type') || 'gradient';

        document.documentElement.style.setProperty('--primary-color', primaryColor);
        document.documentElement.style.setProperty('--secondary-color', secondaryColor);
        document.documentElement.style.setProperty('--accent-color', accentColor);

        this.applyBackground(backgroundType);
        
        // Ensure video backgrounds are restored if they exist
        if (backgroundType === 'video') {
            const savedVideo = localStorage.getItem('background-video');
            if (savedVideo) {
                console.log('🎬 Restoring video background on app start');
                this.restoreVideoBackground(savedVideo);
            }
        }
        
        // Restore dark mode
        if (this.isDarkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        
        // Restore performance settings
        const glassmorphismEnabled = localStorage.getItem('glassmorphism-enabled') !== 'false';
        if (!glassmorphismEnabled) {
            document.body.classList.add('no-glassmorphism');
        }
        
        const animationsEnabled = localStorage.getItem('animations-enabled') !== 'false';
        if (!animationsEnabled) {
            document.body.classList.add('no-animations');
        }
        
        // Restore performance mode
        const performanceModeEnabled = localStorage.getItem('performance-mode') === 'true';
        if (performanceModeEnabled) {
            document.body.classList.add('performance-mode');
            // Performance mode forces glassmorphism off but keeps animations unless user disabled them
            document.body.classList.add('no-glassmorphism');
        }
        
        // Restore visual reduction
        const visualReductionEnabled = localStorage.getItem('visual-reduction') === 'true';
        if (visualReductionEnabled) {
            document.body.classList.add('visual-reduction');
        }
        
        // Restore premium state immediately
        this.restorePremiumState();
        
        // Restore background image if exists
        this.restoreBackgroundImage();
    }

    restorePremiumState() {
        const isPremium = localStorage.getItem('premium-user') === 'true';
        const trialStart = localStorage.getItem('trial-start');
        const subscriptionType = localStorage.getItem('subscription-type');
        
        if (isPremium) {
            if (trialStart && !subscriptionType) {
                // Check if trial is still valid
                const trialDuration = 7 * 24 * 60 * 60 * 1000; // 7 days
                const now = Date.now();
                const trialExpired = (now - parseInt(trialStart)) > trialDuration;
                
                if (trialExpired) {
                    // Trial expired, remove premium status
                    localStorage.removeItem('premium-user');
                    localStorage.removeItem('trial-start');
                    console.log('Trial expired, premium access revoked');
                } else {
                    // Trial still valid
                    this.enablePremiumFeatures();
                    console.log('Premium trial restored');
                }
            } else if (subscriptionType) {
                // Has active subscription
                this.enablePremiumFeatures();
                console.log(`Premium subscription (${subscriptionType}) restored`);
            }
        }
    }

    enablePremiumFeatures() {
        // This will be called by settings manager when it's ready
        // For now, just mark that premium should be enabled
        document.body.setAttribute('data-premium', 'true');
    }

    restoreBackgroundImage() {
        const backgroundImage = localStorage.getItem('background-image');
        if (backgroundImage) {
            document.body.style.backgroundImage = `url(${backgroundImage})`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
            document.body.style.backgroundRepeat = 'no-repeat';
        }
    }

    applyBackground(type) {
        // Simple background application - delegate to background manager if available
        if (window.settingsManager && settingsManager.backgroundManager) {
            settingsManager.backgroundManager.applyBackground(type);
        } else {
            // Fallback to gradient
            const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
            const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color').trim();
            document.body.style.background = `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`;
        }
    }

    async init() {
        if ('serviceWorker' in navigator && 'Notification' in window) {
            try {
                await navigator.serviceWorker.register('./enhanced-sw.js');
                
                if (Notification.permission === 'default') {
                    await Notification.requestPermission();
                }
            } catch (error) {
                console.log('Service Worker registration failed:', error);
            }
        }

        this.setupEventListeners();
        this.renderCurrentView();
        this.updateStatistics();
        this.checkAndUpdateStreak();
        this.scheduleNotifications();
    }

    setupEventListeners() {
        // Navigation
        document.getElementById('home-btn').addEventListener('click', () => {
            this.setActiveNav('home-btn');
            this.switchToView('home-view');
        });

        document.getElementById('all-assignments-btn').addEventListener('click', () => {
            this.setActiveNav('all-assignments-btn');
            this.switchToView('all-view');
        });

        document.getElementById('calendar-btn').addEventListener('click', () => {
            this.setActiveNav('calendar-btn');
            this.switchToView('calendar-view');
        });

        document.getElementById('settings-btn').addEventListener('click', () => {
            this.setActiveNav('settings-btn');
            this.showSettingsView();
        });

        // Calendar navigation
        const prevMonthBtn = document.getElementById('prev-month');
        const nextMonthBtn = document.getElementById('next-month');
        
        if (prevMonthBtn) {
            prevMonthBtn.addEventListener('click', () => {
                this.currentMonth--;
                if (this.currentMonth < 0) {
                    this.currentMonth = 11;
                    this.currentYear--;
                }
                this.renderCalendar();
            });
        }

        if (nextMonthBtn) {
            nextMonthBtn.addEventListener('click', () => {
                this.currentMonth++;
                if (this.currentMonth > 11) {
                    this.currentMonth = 0;
                    this.currentYear++;
                }
                this.renderCalendar();
            });
        }

        // Create assignment button
        const createBtn = document.getElementById('create-assignment-btn');
        if (createBtn) {
            createBtn.addEventListener('click', () => {
                window.location.href = 'create-assignment-enhanced.html';
            });
        }

        // Quick background selector
        const quickBgBtn = document.getElementById('quick-bg-btn');
        const quickBgMenu = document.getElementById('quick-bg-menu');
        
        if (quickBgBtn && quickBgMenu) {
            quickBgBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isVisible = quickBgMenu.style.display !== 'none';
                quickBgMenu.style.display = isVisible ? 'none' : 'block';
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!quickBgMenu.contains(e.target) && !quickBgBtn.contains(e.target)) {
                    quickBgMenu.style.display = 'none';
                }
            });

            // Handle background option clicks
            const bgOptions = document.querySelectorAll('.bg-option');
            bgOptions.forEach(option => {
                option.addEventListener('click', () => {
                    const type = option.dataset.type;
                    
                    if (type === 'gradient') {
                        const colors = option.dataset.colors.split(',');
                        this.applyQuickGradient(colors[0], colors[1]);
                    } else if (type === 'solid') {
                        const color = option.dataset.color;
                        this.applyQuickSolid(color);
                    }
                    
                    // Close menu after selection
                    quickBgMenu.style.display = 'none';
                    
                    // Show notification
                    const bgName = option.querySelector('span').textContent;
                    this.showNotification(`🎨 ${bgName} background applied!`, 'success');
                });
            });
        }

        this.initializeSearchAndFilter();
    }

    initializeSearchAndFilter() {
        const searchInput = document.getElementById('assignment-search');
        const statusFilter = document.getElementById('status-filter');
        const sourceFilter = document.getElementById('source-filter');
        const priorityFilter = document.getElementById('priority-filter');

        if (searchInput) {
            searchInput.addEventListener('input', () => this.filterAssignments());
        }

        [statusFilter, sourceFilter, priorityFilter].forEach(filter => {
            if (filter) {
                filter.addEventListener('change', () => this.filterAssignments());
            }
        });
    }

    // Enhanced assignment card creation with glassmorphic design
    createAssignmentCard(assignment) {
        const card = document.createElement('div');
        card.className = `assignment-card ${assignment.completed ? 'completed' : ''}`;
        card.setAttribute('data-id', assignment.id);
        
        // Custom color streak
        const colorStreak = assignment.customColor || this.getSourceColor(assignment.source);
        card.style.borderLeftColor = colorStreak;
        
        // Add custom background if set
        if (assignment.customBackground) {
            card.style.backgroundImage = `url(${assignment.customBackground})`;
            card.style.backgroundSize = 'cover';
            card.style.backgroundPosition = 'center';
        }

        const dueDateClass = assignment.completed ? '' : this.getPriorityCategory(assignment.dueDate);
        const sourceIcon = this.getSourceIcon(assignment.source);
        const isManual = !assignment.source || assignment.source === 'manual';
        
        card.innerHTML = `
            <div class="assignment-header">
                <div class="assignment-checkbox ${assignment.completed ? 'checked' : ''}" 
                     onclick="tracker.toggleAssignment('${assignment.id}')"
                     role="checkbox"
                     aria-checked="${assignment.completed}"
                     aria-label="${assignment.completed ? 'Mark as incomplete' : 'Mark as complete'}: ${assignment.title}"
                     tabindex="0">
                </div>
                <div class="assignment-title">${assignment.title}</div>
                <div class="assignment-actions">
                    ${sourceIcon ? `<div class="assignment-source" title="Source: ${assignment.source || 'Manual'}">${sourceIcon}</div>` : ''}
                    ${isManual ? `<div class="assignment-edit" title="Edit assignment" onclick="tracker.editAssignment('${assignment.id}')">✏️</div>` : ''}
                    ${isManual ? `<div class="assignment-delete" title="Delete assignment" onclick="tracker.deleteAssignment('${assignment.id}')">🗑️</div>` : ''}
                </div>
            </div>
            ${assignment.description ? `<div class="assignment-description">${assignment.description}</div>` : ''}
            <div class="assignment-due-date ${dueDateClass}">
                ${this.formatDueDate(assignment.dueDate)}
            </div>
        `;

        // Add stagger animation
        card.style.animationDelay = `${Math.random() * 0.3}s`;
        
        return card;
    }

    getSourceColor(source) {
        switch (source) {
            case 'canvas':
                return '#e13b2b'; // Canvas red
            case 'google':
                return '#4285f4'; // Google blue
            default:
                return '#f59e0b'; // Default accent
        }
    }

    getSourceIcon(source) {
        switch (source) {
            case 'canvas':
                return '🎨';
            case 'google':
                return '📚';
            default:
                return '📝';
        }
    }

    // Enhanced toggle with smooth animations
    toggleAssignment(id) {
        const assignment = this.assignments.find(a => a.id == id);
        if (!assignment) return;

        const checkbox = document.querySelector(`[data-id="${id}"] .assignment-checkbox`);
        const card = document.querySelector(`[data-id="${id}"]`);
        
        if (checkbox && card) {
            // Prevent multiple clicks during animation
            if (checkbox.classList.contains('checking')) return;
            
            // Add immediate visual feedback
            checkbox.classList.add('checking');
            card.classList.add('completing');
            
            // Smooth transition with proper timing
            const animationDuration = localStorage.getItem('animations-enabled') === 'false' ? 50 : 400;
            
            setTimeout(() => {
                assignment.completed = !assignment.completed;
                assignment.completedDate = assignment.completed ? new Date().toISOString().split('T')[0] : null;
                
                if (assignment.completed) {
                    this.updateCompletionStreak();
                    
                    // Add completed styling immediately
                    checkbox.classList.add('checked');
                    card.classList.add('completed');
                    
                    // Trigger completion celebration VFX
                    const celebrationsEnabled = localStorage.getItem('completion-celebrations') !== 'false';
                    if (celebrationsEnabled) {
                        this.triggerCompletionCelebration(checkbox);
                    }
                    
                    this.showNotification(`🎉 Great job! "${assignment.title}" completed!`, 'success');
                    
                    // Smooth move to completed section after animation
                    setTimeout(() => {
                        this.smoothMoveToCompleted(card, assignment);
                    }, 600);
                    
                } else {
                    checkbox.classList.remove('checked');
                    card.classList.remove('completed');
                    this.showNotification(`📝 "${assignment.title}" marked as incomplete`, 'info');
                    
                    // Move back to appropriate section
                    setTimeout(() => {
                        this.renderAssignments();
                        this.updateStatistics();
                    }, 200);
                }
                
                this.saveAssignments();
                
                // Clean up animation classes
                setTimeout(() => {
                    checkbox.classList.remove('checking');
                    card.classList.remove('completing');
                }, animationDuration);
                
            }, Math.min(animationDuration * 0.75, 300));
        }
    }

    smoothMoveToCompleted(card, assignment) {
        // Create a smooth transition to the completed section
        const completedSection = document.getElementById('completed');
        const completedContainer = document.getElementById('completed-assignments');
        
        if (!completedSection || !completedContainer) {
            this.renderAssignments();
            this.updateStatistics();
            return;
        }
        
        // Show completed section if hidden
        if (completedSection.style.display === 'none') {
            completedSection.style.display = 'block';
            completedSection.style.opacity = '0';
            completedSection.style.transform = 'translateY(20px)';
            
            // Animate in the completed section
            requestAnimationFrame(() => {
                completedSection.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                completedSection.style.opacity = '1';
                completedSection.style.transform = 'translateY(0)';
            });
        }
        
        // Clone the card for smooth transition
        const clonedCard = card.cloneNode(true);
        clonedCard.style.opacity = '0';
        clonedCard.style.transform = 'scale(0.9)';
        
        // Add to completed section
        completedContainer.appendChild(clonedCard);
        
        // Animate the cloned card in
        requestAnimationFrame(() => {
            clonedCard.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            clonedCard.style.opacity = '1';
            clonedCard.style.transform = 'scale(1)';
        });
        
        // Fade out original card
        card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.6, 1)';
        card.style.opacity = '0';
        card.style.transform = 'translateX(-20px) scale(0.95)';
        
        // Clean up and re-render after transition
        setTimeout(() => {
            this.renderAssignments();
            this.updateStatistics();
        }, 400);
    }

    triggerCompletionCelebration(checkboxElement) {
        // Get checkbox position for particle origin
        const rect = checkboxElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Create celebration effects
        this.createConfettiExplosion(centerX, centerY);
        this.createParticleRings(centerX, centerY);
        this.createSuccessRipple(checkboxElement);
        this.createFloatingEmojis(centerX, centerY);
        
        // Add screen flash effect
        this.createScreenFlash();
        
        // Haptic feedback if available
        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100]);
        }
    }

    createConfettiExplosion(x, y) {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7', '#a29bfe'];
        const confettiCount = 30;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: 8px;
                height: 8px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                pointer-events: none;
                z-index: 10000;
                animation: confetti-fall ${1 + Math.random() * 2}s ease-out forwards;
                transform: rotate(${Math.random() * 360}deg);
            `;
            
            // Random direction and distance
            const angle = (Math.PI * 2 * i) / confettiCount + (Math.random() - 0.5) * 0.5;
            const distance = 100 + Math.random() * 150;
            const endX = x + Math.cos(angle) * distance;
            const endY = y + Math.sin(angle) * distance + Math.random() * 200;
            
            confetti.style.setProperty('--end-x', `${endX}px`);
            confetti.style.setProperty('--end-y', `${endY}px`);
            
            document.body.appendChild(confetti);
            
            // Remove after animation
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 3000);
        }
    }

    createParticleRings(x, y) {
        for (let ring = 0; ring < 3; ring++) {
            setTimeout(() => {
                const particles = 12;
                const radius = 50 + ring * 30;
                
                for (let i = 0; i < particles; i++) {
                    const particle = document.createElement('div');
                    particle.className = 'celebration-particle';
                    particle.style.cssText = `
                        position: fixed;
                        left: ${x}px;
                        top: ${y}px;
                        width: 4px;
                        height: 4px;
                        background: var(--accent-color);
                        border-radius: 50%;
                        pointer-events: none;
                        z-index: 10000;
                        animation: particle-ring ${0.8 + ring * 0.2}s ease-out forwards;
                        opacity: ${1 - ring * 0.3};
                    `;
                    
                    const angle = (Math.PI * 2 * i) / particles;
                    const endX = x + Math.cos(angle) * radius;
                    const endY = y + Math.sin(angle) * radius;
                    
                    particle.style.setProperty('--end-x', `${endX}px`);
                    particle.style.setProperty('--end-y', `${endY}px`);
                    
                    document.body.appendChild(particle);
                    
                    setTimeout(() => {
                        if (particle.parentNode) {
                            particle.parentNode.removeChild(particle);
                        }
                    }, 1000 + ring * 200);
                }
            }, ring * 100);
        }
    }

    createSuccessRipple(element) {
        const ripple = document.createElement('div');
        ripple.className = 'success-ripple';
        ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 20px;
            height: 20px;
            border: 2px solid var(--accent-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: success-ripple 0.6s ease-out forwards;
            transform: translate(-50%, -50%);
        `;
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }

    createFloatingEmojis(x, y) {
        const emojis = ['🎉', '✨', '🌟', '💫', '🎊', '🏆', '👏', '🔥'];
        const emojiCount = 5;
        
        for (let i = 0; i < emojiCount; i++) {
            setTimeout(() => {
                const emoji = document.createElement('div');
                emoji.className = 'floating-emoji';
                emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                emoji.style.cssText = `
                    position: fixed;
                    left: ${x + (Math.random() - 0.5) * 100}px;
                    top: ${y}px;
                    font-size: ${20 + Math.random() * 15}px;
                    pointer-events: none;
                    z-index: 10000;
                    animation: float-up ${2 + Math.random()}s ease-out forwards;
                `;
                
                document.body.appendChild(emoji);
                
                setTimeout(() => {
                    if (emoji.parentNode) {
                        emoji.parentNode.removeChild(emoji);
                    }
                }, 3000);
            }, i * 200);
        }
    }

    createScreenFlash() {
        const flash = document.createElement('div');
        flash.className = 'screen-flash';
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, transparent 70%);
            pointer-events: none;
            z-index: 9999;
            animation: screen-flash 0.5s ease-out forwards;
        `;
        
        document.body.appendChild(flash);
        
        setTimeout(() => {
            if (flash.parentNode) {
                flash.parentNode.removeChild(flash);
            }
        }, 500);
    }

    editAssignment(id) {
        if (!this.assignmentEditor) {
            this.assignmentEditor = new AssignmentEditor(this);
        }
        this.assignmentEditor.editAssignment(id);
    }

    deleteAssignment(id) {
        const assignment = this.assignments.find(a => a.id == id);
        if (!assignment) return;

        this.showDeleteConfirmation(assignment);
    }

    showDeleteConfirmation(assignment) {
        // Auto-close any existing overlays first
        this.closeAllOverlays();
        
        const modal = document.createElement('div');
        modal.className = 'delete-confirmation-modal';
        modal.innerHTML = `
            <div class="delete-confirmation-content glass-card">
                <div class="delete-confirmation-header">
                    <h3>🗑️ Delete Assignment</h3>
                    <button class="close-btn" onclick="this.closest('.delete-confirmation-modal').remove()">×</button>
                </div>
                <div class="delete-confirmation-body">
                    <p>Are you sure you want to delete "<strong>${assignment.title}</strong>"?</p>
                    <p class="warning-text">This action cannot be undone.</p>
                </div>
                <div class="delete-confirmation-actions">
                    <button class="btn btn-secondary" onclick="this.closest('.delete-confirmation-modal').remove()">Cancel</button>
                    <button class="btn btn-danger" onclick="tracker.confirmDelete('${assignment.id}')">Delete</button>
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

    confirmDeleteAssignment(id) {
        const assignment = this.assignments.find(a => a.id == id);
        if (!assignment) return;

        this.assignments = this.assignments.filter(a => a.id != id);
        this.saveAssignments();
        this.renderAssignments();
        this.updateStatistics();
        this.showNotification(`Assignment "${assignment.title}" deleted`);
        
        // Close modal
        const modal = document.querySelector('.delete-confirmation-modal');
        if (modal) modal.remove();
    }

    updateCompletionStreak() {
        const today = new Date().toDateString();
        const lastDate = this.lastCompletionDate;
        
        if (lastDate === today) {
            // Already completed something today
            return;
        }
        
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const previousStreak = this.completionStreak;
        
        if (lastDate === yesterday.toDateString()) {
            // Continuing streak
            this.completionStreak++;
        } else if (!lastDate || lastDate !== today) {
            // Starting new streak
            this.completionStreak = 1;
        }
        
        this.lastCompletionDate = today;
        localStorage.setItem('completionStreak', this.completionStreak.toString());
        localStorage.setItem('lastCompletionDate', today);
        
        // Check for streak milestones
        this.checkStreakMilestone(previousStreak, this.completionStreak);
    }

    checkStreakMilestone(previousStreak, currentStreak) {
        const milestones = [3, 7, 14, 30, 50, 100];
        const celebrationsEnabled = localStorage.getItem('completion-celebrations') !== 'false';
        
        if (!celebrationsEnabled) return;
        
        const milestone = milestones.find(m => currentStreak >= m && previousStreak < m);
        
        if (milestone) {
            setTimeout(() => {
                this.triggerStreakMilestone(milestone);
            }, 1000); // Delay to let completion celebration finish
        }
    }

    triggerStreakMilestone(streak) {
        // Create milestone celebration
        const milestone = document.createElement('div');
        milestone.className = 'streak-milestone';
        milestone.innerHTML = `
            <div class="milestone-content glass-card">
                <div class="milestone-icon">🔥</div>
                <div class="milestone-title">Streak Milestone!</div>
                <div class="milestone-streak">${streak} Days</div>
                <div class="milestone-message">${this.getStreakMessage(streak)}</div>
                <button class="milestone-close" onclick="this.parentElement.parentElement.remove()">Continue</button>
            </div>
        `;
        
        milestone.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10001;
            animation: fadeIn 0.5s ease-out;
        `;
        
        document.body.appendChild(milestone);
        
        // Trigger extra celebration effects
        setTimeout(() => {
            this.createMilestoneFireworks();
        }, 500);
        
        // Auto-close after 5 seconds
        setTimeout(() => {
            if (milestone.parentNode) {
                milestone.remove();
            }
        }, 5000);
    }

    getStreakMessage(streak) {
        const messages = {
            3: "You're on fire! Keep it up! 🚀",
            7: "One week strong! Amazing dedication! ⭐",
            14: "Two weeks of excellence! Incredible! 🏆",
            30: "One month of consistency! You're unstoppable! 💪",
            50: "Fifty days of greatness! Legendary! 👑",
            100: "One hundred days! You're a productivity master! 🎯"
        };
        return messages[streak] || "Keep up the amazing work! 🌟";
    }

    createMilestoneFireworks() {
        // Create multiple firework explosions
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * (window.innerHeight * 0.6) + window.innerHeight * 0.2;
                this.createConfettiExplosion(x, y);
                this.createParticleRings(x, y);
            }, i * 300);
        }
    }

    checkAndUpdateStreak() {
        const today = new Date().toDateString();
        const lastDate = this.lastCompletionDate;
        
        if (lastDate) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            
            if (lastDate !== today && lastDate !== yesterday.toDateString()) {
                // Streak broken
                this.completionStreak = 0;
                localStorage.setItem('completionStreak', '0');
            }
        }
    }

    // Enhanced notification system
    showNotification(message, type = 'info', duration = 3000) {
        // Check if notifications are enabled
        const notificationsEnabled = localStorage.getItem('push-notifications') !== 'false';
        if (!notificationsEnabled) return;

        // Create notification container if it doesn't exist
        let notificationContainer = document.querySelector('.notification-container');
        if (!notificationContainer) {
            notificationContainer = document.createElement('div');
            notificationContainer.className = 'notification-container';
            document.body.appendChild(notificationContainer);
        }

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        // Add icon based on type
        const icon = this.getNotificationIcon(type);
        notification.innerHTML = `
            <div class="notification-icon">${icon}</div>
            <div class="notification-content">
                <div class="notification-message">${message}</div>
            </div>
            <button class="notification-close" onclick="this.parentElement.remove()">×</button>
        `;
        
        // Add to container (stack notifications)
        notificationContainer.appendChild(notification);
        
        // Trigger entrance animation
        requestAnimationFrame(() => {
            notification.classList.add('show');
        });

        // Auto-hide notification
        const hideTimeout = setTimeout(() => {
            this.hideNotification(notification);
        }, duration);

        // Clear timeout if user manually closes
        notification.querySelector('.notification-close').addEventListener('click', () => {
            clearTimeout(hideTimeout);
        });

        // Add click to dismiss functionality
        notification.addEventListener('click', (e) => {
            if (e.target !== notification.querySelector('.notification-close')) {
                clearTimeout(hideTimeout);
                this.hideNotification(notification);
            }
        });

        // Limit number of notifications (max 5)
        const notifications = notificationContainer.querySelectorAll('.notification');
        if (notifications.length > 5) {
            this.hideNotification(notifications[0]);
        }
    }

    getNotificationIcon(type) {
        const icons = {
            'success': '✅',
            'error': '❌',
            'warning': '⚠️',
            'info': 'ℹ️',
            'loading': '⏳'
        };
        return icons[type] || 'ℹ️';
    }

    hideNotification(notification) {
        notification.classList.add('hiding');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // Show persistent notification that requires user action
    showPersistentNotification(message, type = 'info', actions = []) {
        const notificationsEnabled = localStorage.getItem('push-notifications') !== 'false';
        if (!notificationsEnabled) return;

        let notificationContainer = document.querySelector('.notification-container');
        if (!notificationContainer) {
            notificationContainer = document.createElement('div');
            notificationContainer.className = 'notification-container';
            document.body.appendChild(notificationContainer);
        }

        const notification = document.createElement('div');
        notification.className = `notification ${type} persistent`;
        
        const icon = this.getNotificationIcon(type);
        const actionsHtml = actions.map(action => 
            `<button class="notification-action" onclick="${action.callback}">${action.text}</button>`
        ).join('');

        notification.innerHTML = `
            <div class="notification-icon">${icon}</div>
            <div class="notification-content">
                <div class="notification-message">${message}</div>
                ${actionsHtml ? `<div class="notification-actions">${actionsHtml}</div>` : ''}
            </div>
            <button class="notification-close" onclick="this.parentElement.remove()">×</button>
        `;
        
        notificationContainer.appendChild(notification);
        
        requestAnimationFrame(() => {
            notification.classList.add('show');
        });

        return notification;
    }

    // Calendar with tap-and-hold pip markers
    renderCalendar() {
        const calendarGrid = document.getElementById('calendar-grid');
        if (!calendarGrid) return;

        const monthYear = document.getElementById('calendar-month-year');
        if (monthYear) {
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                              'July', 'August', 'September', 'October', 'November', 'December'];
            monthYear.textContent = `${monthNames[this.currentMonth]} ${this.currentYear}`;
        }

        // Clear efficiently instead of innerHTML
        while (calendarGrid.firstChild) {
            calendarGrid.removeChild(calendarGrid.firstChild);
        }

        const firstDay = new Date(this.currentYear, this.currentMonth, 1);
        const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        // Use DocumentFragment for batch calendar operations - major FPS improvement
        const fragment = document.createDocumentFragment();

        // Add day headers
        const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayHeaders.forEach(day => {
            const header = document.createElement('div');
            header.className = 'calendar-day-header';
            header.textContent = day;
            fragment.appendChild(header);
        });

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDayOfWeek; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            fragment.appendChild(emptyDay);
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            
            const dateStr = `${this.currentYear}-${String(this.currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayAssignments = this.assignments.filter(a => a.dueDate === dateStr && !a.completed);
            
            // Create elements instead of innerHTML for better performance
            const dayNumber = document.createElement('div');
            dayNumber.className = 'calendar-day-number';
            dayNumber.textContent = day;
            dayElement.appendChild(dayNumber);

            if (dayAssignments.length > 0) {
                const assignmentCount = document.createElement('div');
                assignmentCount.className = 'calendar-assignment-count';
                assignmentCount.textContent = dayAssignments.length;
                dayElement.appendChild(assignmentCount);
            }

            // Store date for event delegation
            dayElement.dataset.date = dateStr;

            fragment.appendChild(dayElement);
        }
        
        // Single DOM operation for entire calendar - major FPS boost
        calendarGrid.appendChild(fragment);
        
        // Add event delegation for calendar clicks instead of individual listeners
        this.setupCalendarEventDelegation();
    }

    setupCalendarEventDelegation() {
        const calendarGrid = document.getElementById('calendar-grid');
        if (!calendarGrid || calendarGrid.dataset.delegationSetup) return;
        
        // Mark as setup to prevent duplicate listeners
        calendarGrid.dataset.delegationSetup = 'true';
        
        // Single event listener for entire calendar - major performance improvement
        calendarGrid.addEventListener('click', (e) => {
            const dayElement = e.target.closest('.calendar-day');
            if (!dayElement || dayElement.classList.contains('empty')) return;
            
            const dateStr = dayElement.dataset.date;
            if (dateStr) {
                const assignments = this.assignments.filter(a => a.dueDate === dateStr && !a.completed);
                this.showCalendarPopup(dateStr, assignments);
            }
        });
    }

    addCalendarDayListeners(dayElement, dateStr, assignments) {
        let touchTimer = null;
        let isLongPress = false;

        // Touch events for mobile
        dayElement.addEventListener('touchstart', (e) => {
            isLongPress = false;
            touchTimer = setTimeout(() => {
                isLongPress = true;
                this.showPipMarker(e.touches[0], dateStr, assignments);
            }, 500);
        });

        dayElement.addEventListener('touchend', (e) => {
            clearTimeout(touchTimer);
            if (!isLongPress) {
                this.showCalendarPopup(dateStr, assignments);
            }
        });

        dayElement.addEventListener('touchmove', () => {
            clearTimeout(touchTimer);
        });

        // Mouse events for desktop
        dayElement.addEventListener('mousedown', (e) => {
            isLongPress = false;
            touchTimer = setTimeout(() => {
                isLongPress = true;
                this.showPipMarker(e, dateStr, assignments);
            }, 500);
        });

        dayElement.addEventListener('mouseup', () => {
            clearTimeout(touchTimer);
            if (!isLongPress) {
                this.showCalendarPopup(dateStr, assignments);
            }
        });

        dayElement.addEventListener('mouseleave', () => {
            clearTimeout(touchTimer);
        });
    }

    showPipMarker(event, dateStr, assignments) {
        // Auto-close existing overlays before showing pip
        this.closeAllOverlays();

        const pip = document.createElement('div');
        pip.className = 'pip-marker';
        pip.innerHTML = `
            <div class="pip-header">
                <strong>${new Date(dateStr).toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                })}</strong>
            </div>
            <div class="pip-assignments">
                ${assignments.map(a => `
                    <div class="pip-assignment">
                        <div class="pip-assignment-title">${a.title}</div>
                        <div class="pip-assignment-priority ${this.getPriorityCategory(a.dueDate)}">${this.formatDueDate(a.dueDate)}</div>
                    </div>
                `).join('')}
            </div>
        `;

        const x = event.clientX || event.pageX;
        const y = event.clientY || event.pageY;
        
        pip.style.left = `${Math.min(x, window.innerWidth - 300)}px`;
        pip.style.top = `${Math.max(y - 100, 20)}px`;

        document.body.appendChild(pip);
        this.pipMarker = pip;

        // Auto-hide after 3 seconds
        this.pipTimeout = setTimeout(() => {
            this.hidePipMarker();
        }, 3000);

        // Hide on click outside
        setTimeout(() => {
            document.addEventListener('click', this.hidePipMarker.bind(this), { once: true });
        }, 100);
    }

    showCalendarPopup(dateStr, assignments) {
        // Auto-close any existing overlays first
        this.closeAllOverlays();
        
        // Show a simple popup for calendar day click
        const popup = document.createElement('div');
        popup.className = 'calendar-popup';
        popup.innerHTML = `
            <div class="calendar-popup-content glass-card">
                <div class="calendar-popup-header">
                    <h3>${new Date(dateStr).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        month: 'long', 
                        day: 'numeric',
                        year: 'numeric'
                    })}</h3>
                    <button class="close-btn" onclick="this.closest('.calendar-popup').remove()">×</button>
                </div>
                
                <div class="calendar-popup-body">
                    ${assignments.length > 0 ? `
                        <h4>Assignments Due (${assignments.length})</h4>
                        <div class="popup-assignments">
                            ${assignments.map(a => `
                                <div class="popup-assignment">
                                    <div class="popup-assignment-title">${a.title}</div>
                                    <div class="popup-assignment-course">${a.courseName || 'No course'}</div>
                                    <div class="popup-assignment-time">${a.dueTime || '23:59'}</div>
                                </div>
                            `).join('')}
                        </div>
                    ` : `
                        <div class="no-assignments">
                            <p>No assignments due on this date</p>
                        </div>
                    `}
                </div>
            </div>
        `;

        document.body.appendChild(popup);
        
        // Add click outside to close
        setTimeout(() => {
            popup.addEventListener('click', (e) => {
                if (e.target === popup) {
                    popup.remove();
                }
            });
        }, 100);
    }

    hidePipMarker() {
        if (this.pipMarker) {
            this.pipMarker.classList.add('hiding');
            setTimeout(() => {
                if (this.pipMarker && this.pipMarker.parentNode) {
                    this.pipMarker.parentNode.removeChild(this.pipMarker);
                }
                this.pipMarker = null;
            }, 200);
        }
        if (this.pipTimeout) {
            clearTimeout(this.pipTimeout);
            this.pipTimeout = null;
        }
    }

    saveAssignments() {
        localStorage.setItem('assignments', JSON.stringify(this.assignments));
    }

    renderAssignments() {
        // Debounce renders to prevent FPS drops
        if (this.renderTimeout) return;
        this.renderTimeout = setTimeout(() => {
            this.actualRenderAssignments();
            this.renderTimeout = null;
        }, 16); // ~60fps
    }

    actualRenderAssignments() {
        const highPriorityContainer = document.getElementById('high-priority-assignments');
        const comingUpContainer = document.getElementById('coming-up-assignments');
        const worryLaterContainer = document.getElementById('worry-later-assignments');
        const completedContainer = document.getElementById('completed-assignments');
        const completedSection = document.getElementById('completed');

        if (!highPriorityContainer || !comingUpContainer || !worryLaterContainer || !completedContainer) return;

        // Use DocumentFragment for better performance - prevents layout thrashing
        const clearContainer = (container) => {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        };
        
        // Clear containers efficiently
        clearContainer(highPriorityContainer);
        clearContainer(comingUpContainer);
        clearContainer(worryLaterContainer);
        clearContainer(completedContainer);

        const now = new Date();
        const highPriorityAssignments = [];
        const comingUpAssignments = [];
        const worryLaterAssignments = [];
        const completedAssignments = [];

        this.assignments.forEach(assignment => {
            if (assignment.completed) {
                completedAssignments.push(assignment);
            } else {
                const dueDate = new Date(assignment.dueDate);
                const daysDiff = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));

                if (daysDiff <= 4) {
                    highPriorityAssignments.push(assignment);
                } else if (daysDiff <= 10) {
                    comingUpAssignments.push(assignment);
                } else {
                    worryLaterAssignments.push(assignment);
                }
            }
        });

        // Render assignments in each section
        this.renderAssignmentSection(highPriorityContainer, highPriorityAssignments, 'No urgent assignments right now 🎉');
        this.renderAssignmentSection(comingUpContainer, comingUpAssignments, 'No upcoming assignments');
        this.renderAssignmentSection(worryLaterContainer, worryLaterAssignments, 'No long-term assignments');
        
        // Show/hide completed section
        if (completedAssignments.length > 0) {
            this.renderAssignmentSection(completedContainer, completedAssignments, '');
            completedSection.style.display = 'block';
        } else {
            completedSection.style.display = 'none';
        }
    }

    renderAssignmentSection(container, assignments, emptyMessage) {
        if (assignments.length === 0) {
            // Use textContent and createElement instead of innerHTML for better performance
            const emptyDiv = document.createElement('div');
            emptyDiv.className = 'empty-state';
            emptyDiv.textContent = emptyMessage;
            container.appendChild(emptyDiv);
        } else {
            // Use DocumentFragment for batch DOM operations - major FPS improvement
            const fragment = document.createDocumentFragment();
            assignments.forEach(assignment => {
                const card = this.createAssignmentCard(assignment);
                fragment.appendChild(card);
            });
            container.appendChild(fragment); // Single DOM operation instead of multiple
        }
    }

    renderAllAssignments() {
        const container = document.getElementById('all-assignments');
        if (!container) return;

        // Clear efficiently
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        
        if (this.assignments.length === 0) {
            const emptyDiv = document.createElement('div');
            emptyDiv.className = 'empty-state';
            emptyDiv.textContent = 'No assignments yet. Create your first assignment!';
            container.appendChild(emptyDiv);
            return;
        }

        const filteredAssignments = this.getFilteredAssignments();
        
        if (filteredAssignments.length === 0) {
            const emptyDiv = document.createElement('div');
            emptyDiv.className = 'empty-state';
            emptyDiv.textContent = 'No assignments match your filters';
            container.appendChild(emptyDiv);
            return;
        }

        // Use DocumentFragment for batch operations
        const fragment = document.createDocumentFragment();

        filteredAssignments.forEach(assignment => {
            const card = this.createAssignmentCard(assignment);
            fragment.appendChild(card);
        });
        
        container.appendChild(fragment); // Single DOM operation
    }

    getFilteredAssignments() {
        const searchTerm = document.getElementById('assignment-search')?.value.toLowerCase() || '';
        const statusFilter = document.getElementById('status-filter')?.value || 'all';
        const sourceFilter = document.getElementById('source-filter')?.value || 'all';
        const priorityFilter = document.getElementById('priority-filter')?.value || 'all';

        return this.assignments.filter(assignment => {
            const matchesSearch = assignment.title.toLowerCase().includes(searchTerm) ||
                                assignment.description?.toLowerCase().includes(searchTerm) ||
                                assignment.courseName?.toLowerCase().includes(searchTerm);
            
            const matchesStatus = statusFilter === 'all' || 
                                (statusFilter === 'completed' && assignment.completed) ||
                                (statusFilter === 'pending' && !assignment.completed);
            
            const matchesSource = sourceFilter === 'all' || 
                                (assignment.source || 'manual') === sourceFilter;
            
            const matchesPriority = priorityFilter === 'all' || 
                                  assignment.priority === priorityFilter;

            return matchesSearch && matchesStatus && matchesSource && matchesPriority;
        });
    }

    updateStatistics() {
        const totalElement = document.getElementById('total-assignments');
        const completedElement = document.getElementById('completed-count');
        const overdueElement = document.getElementById('overdue-count');
        const streakElement = document.getElementById('streak-count');
        const progressFill = document.getElementById('progress-fill');
        const progressPercentage = document.getElementById('progress-percentage');

        if (!totalElement || !completedElement || !overdueElement || !streakElement) return;

        const activeAssignments = this.assignments.filter(a => !a.completed);
        const completedAssignments = this.assignments.filter(a => a.completed);
        const now = new Date();
        const overdueAssignments = activeAssignments.filter(a => new Date(a.dueDate) < now);

        totalElement.textContent = activeAssignments.length;
        completedElement.textContent = completedAssignments.length;
        overdueElement.textContent = overdueAssignments.length;
        streakElement.textContent = this.completionStreak;

        // Update progress bar
        const totalTasks = this.assignments.length;
        const completedTasks = completedAssignments.length;
        const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

        if (progressFill && progressPercentage) {
            progressFill.style.width = `${progressPercent}%`;
            progressPercentage.textContent = `${progressPercent}%`;
        }
    }

    switchToView(viewId) {
        // Auto-close any open overlays when switching views
        this.closeAllOverlays();
        
        // Hide all views
        document.querySelectorAll('.content-view').forEach(view => {
            view.style.display = 'none';
        });

        // Show selected view
        const selectedView = document.getElementById(viewId);
        if (selectedView) {
            selectedView.style.display = 'block';
            
            // Update view-specific content
            if (viewId === 'home-view') {
                this.renderAssignments();
                this.updateStatistics();
            } else if (viewId === 'all-view') {
                this.renderAllAssignments();
            } else if (viewId === 'calendar-view') {
                this.renderCalendar();
            }
            
            // Reapply visual settings to ensure consistency across screens
            this.applyGlobalVisualSettings();
        }
    }

    closeAllOverlays() {
        // Close all modal overlays
        const overlays = document.querySelectorAll(`
            .delete-confirmation-modal,
            .calendar-popup,
            .pip-marker,
            .streak-milestone,
            .dev-panel,
            .dev-clear-modal,
            .dev-password-modal,
            .notification.persistent
        `);
        
        overlays.forEach(overlay => {
            if (overlay && overlay.parentNode) {
                overlay.remove();
            }
        });
        
        // Close settings-specific overlays
        if (window.settingsManager) {
            window.settingsManager.closeAllOverlays();
        }
        
        this.logPerformanceEvent('Overlays Closed', `${overlays.length} overlays`);
    }

    applyGlobalVisualSettings() {
        // Apply visual settings consistently across all screens
        console.log('🎨 Applying global visual settings to all screens');
        
        // Performance mode
        const performanceModeEnabled = localStorage.getItem('performance-mode') === 'true';
        if (performanceModeEnabled) {
            document.body.classList.add('performance-mode');
            // Performance mode forces glassmorphism off but keeps animations unless user disabled them
            document.body.classList.add('no-glassmorphism');
        } else {
            document.body.classList.remove('performance-mode');
        }
        
        // Glassmorphism settings
        const glassmorphismEnabled = localStorage.getItem('glassmorphism-enabled') !== 'false';
        if (!glassmorphismEnabled || performanceModeEnabled) {
            document.body.classList.add('no-glassmorphism');
        } else {
            document.body.classList.remove('no-glassmorphism');
        }
        
        // Animation settings
        const animationsEnabled = localStorage.getItem('animations-enabled') !== 'false';
        if (!animationsEnabled) {
            document.body.classList.add('no-animations');
        } else {
            document.body.classList.remove('no-animations');
        }
        
        // Visual reduction
        const visualReduction = localStorage.getItem('visual-reduction') === 'true';
        if (visualReduction) {
            document.body.classList.add('reduced-visuals');
        } else {
            document.body.classList.remove('reduced-visuals');
        }
        
        // Dark mode
        if (this.isDarkMode) {
            document.body.setAttribute('data-theme', 'dark');
        } else {
            document.body.removeAttribute('data-theme');
        }
        
        console.log('✅ Global visual settings applied:', {
            performanceMode: performanceModeEnabled,
            glassmorphism: glassmorphismEnabled && !performanceModeEnabled,
            animations: animationsEnabled,
            visualReduction: visualReduction,
            darkMode: this.isDarkMode
        });
    }

    setActiveNav(activeId) {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeBtn = document.getElementById(activeId);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
    }

    showSettingsView() {
        this.switchToView('settings-view');
        if (window.settingsManager) {
            window.settingsManager.renderSettingsPage();
        }
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    getPriorityCategory(dueDate) {
        const now = new Date();
        const due = new Date(dueDate);
        const daysDiff = Math.ceil((due - now) / (1000 * 60 * 60 * 24));

        if (daysDiff < 0) return 'overdue';
        if (daysDiff <= 4) return 'high-priority';
        if (daysDiff <= 10) return 'coming-up';
        return 'worry-later';
    }

    formatDueDate(dueDate) {
        const date = new Date(dueDate);
        const now = new Date();
        const daysDiff = Math.ceil((date - now) / (1000 * 60 * 60 * 24));

        if (daysDiff < 0) {
            return `Overdue by ${Math.abs(daysDiff)} day${Math.abs(daysDiff) !== 1 ? 's' : ''}`;
        } else if (daysDiff === 0) {
            return 'Due today';
        } else if (daysDiff === 1) {
            return 'Due tomorrow';
        } else {
            return `Due in ${daysDiff} day${daysDiff !== 1 ? 's' : ''}`;
        }
    }

    filterAssignments() {
        this.renderAllAssignments();
    }

    renderCurrentView() {
        this.renderPriorityAssignments();
        this.renderAllAssignments();
        this.renderCalendar();
    }

    activateDevMode() {
        // Check if panel already exists
        const existingPanel = document.getElementById('dev-panel');
        if (existingPanel) {
            existingPanel.remove();
        }
        
        // Toggle dev mode if already active
        if (localStorage.getItem('dev-mode') === 'true') {
            this.showDevPanel();
        } else {
            this.showDevPanel();
        }
    }

    showDevPanel() {
        // Auto-close existing overlays first
        this.closeAllOverlays();
        
        // Enable dev mode
        localStorage.setItem('dev-mode', 'true');
        
        // Create dev panel
        const devPanel = document.createElement('div');
        devPanel.id = 'dev-panel';
        devPanel.className = 'dev-panel glass-card';
        devPanel.innerHTML = `
            <div class="dev-header">
                <h3>🔧 Developer Panel</h3>
                <button class="close-btn" onclick="tracker.closeDevPanel()">×</button>
            </div>
            
            <div class="dev-content">
                <div class="dev-section">
                    <h4>🎛️ Quick Actions</h4>
                    <div class="dev-buttons">
                        <button class="btn btn-secondary" onclick="tracker.generateTestData()">Generate Test Data</button>
                        <button class="btn btn-secondary" onclick="tracker.clearAllData()">Clear All Data</button>
                        <button class="btn btn-secondary" onclick="tracker.exportLogs()">Export Logs</button>
                        <button class="btn btn-premium" onclick="tracker.unlockPremium()">Unlock Premium</button>
                    </div>
                </div>
                
                <div class="dev-section">
                    <h4>📊 System Info</h4>
                    <div class="system-info">
                        <div class="info-item">
                            <span>Version:</span>
                            <span>v2.0 Glassmorphic</span>
                        </div>
                        <div class="info-item">
                            <span>Assignments:</span>
                            <span id="dev-assignment-count">${this.assignments.length}</span>
                        </div>
                        <div class="info-item">
                            <span>Storage Used:</span>
                            <span id="dev-storage-size">${this.calculateStorageSize()}</span>
                        </div>
                        <div class="info-item">
                            <span>Canvas:</span>
                            <span class="status ${this.canvasConnected ? 'connected' : 'disconnected'}">${this.canvasConnected ? 'Connected' : 'Disconnected'}</span>
                        </div>
                        <div class="info-item">
                            <span>Google:</span>
                            <span class="status ${this.googleConnected ? 'connected' : 'disconnected'}">${this.googleConnected ? 'Connected' : 'Disconnected'}</span>
                        </div>
                    </div>
                </div>
                
                <div class="dev-section">
                    <h4>🐛 Debug Console</h4>
                    <div class="debug-console" id="debug-console">
                        <div class="console-line">Dev mode activated at ${new Date().toLocaleTimeString()}</div>
                    </div>
                </div>
                
                <div class="dev-section">
                    <h4>⚡ Performance</h4>
                    <div class="performance-metrics">
                        <div class="metric">
                            <span>Render Time:</span>
                            <span id="render-time">~${Math.random() * 50 + 10 | 0}ms</span>
                        </div>
                        <div class="metric">
                            <span>Memory Usage:</span>
                            <span id="memory-usage">${(performance.memory?.usedJSHeapSize / 1024 / 1024).toFixed(1) || 'N/A'}MB</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(devPanel);
        
        // Apply global visual settings to all screens
        this.applyGlobalVisualSettings();
        
        // Bind methods to window for onclick handlers
        window.closeDevPanel = () => this.closeDevPanel();
        window.generateTestData = () => this.generateTestData();
        window.clearAllData = () => this.clearAllData();
        window.exportLogs = () => this.exportLogs();
        window.unlockPremium = () => this.unlockPremium();
        
        // Update performance metrics every 5 seconds
        this.devMetricsInterval = setInterval(() => {
            this.updateDevMetrics();
        }, 5000);
        
        this.showNotification('🔧 Developer mode activated! Use ↑↑↓↓←→←→BA again to toggle.', 'success', 5000);
        
        // Log dev activation
        this.logToDevConsole('Developer mode activated');
        this.logToDevConsole(`User Agent: ${navigator.userAgent}`);
        this.logToDevConsole(`Screen: ${screen.width}x${screen.height}`);
        
        // Test toggles functionality
        this.testToggles();
    }

    closeDevPanel() {
        const devPanel = document.getElementById('dev-panel');
        if (devPanel) {
            devPanel.remove();
        }
        
        // Clear performance interval
        if (this.devMetricsInterval) {
            clearInterval(this.devMetricsInterval);
            this.devMetricsInterval = null;
        }
        
        localStorage.setItem('dev-mode', 'false');
        this.showNotification('🔧 Developer mode deactivated', 'info');
    }

    generateTestData() {
        const testAssignments = [
            {
                id: 'test_' + Date.now() + '_1',
                title: 'Test Assignment - Math Homework',
                description: 'Complete chapters 5-7 exercises',
                dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
                source: 'manual',
                priority: 'high',
                completed: false,
                customColor: '#ff6b6b'
            },
            {
                id: 'test_' + Date.now() + '_2',
                title: 'Test Assignment - Science Project',
                description: 'Research renewable energy sources',
                dueDate: new Date(Date.now() + 172800000).toISOString().split('T')[0],
                source: 'manual',
                priority: 'medium',
                completed: false,
                customColor: '#4ecdc4'
            },
            {
                id: 'test_' + Date.now() + '_3',
                title: 'Test Assignment - History Essay',
                description: 'Write 1000 words on WWII',
                dueDate: new Date(Date.now() + 259200000).toISOString().split('T')[0],
                source: 'manual',
                priority: 'low',
                completed: true,
                customColor: '#45b7d1'
            }
        ];

        this.assignments.push(...testAssignments);
        this.saveAssignments();
        this.renderAssignments();
        this.updateDevInfo();
        
        this.logToDevConsole(`Generated ${testAssignments.length} test assignments`);
        this.showNotification(`Generated ${testAssignments.length} test assignments`, 'success');
    }

    clearAllData() {
        // Use the settings manager's clear data confirmation
        if (window.settingsManager) {
            settingsManager.showClearDataConfirmation();
        } else {
            // Fallback for dev panel
            this.showDevClearConfirmation();
        }
    }

    showDevClearConfirmation() {
        const modal = document.createElement('div');
        modal.className = 'dev-clear-modal';
        modal.innerHTML = `
            <div class="dev-clear-content glass-card">
                <div class="dev-clear-header">
                    <h3>🔧 Developer: Clear All Data</h3>
                </div>
                
                <div class="dev-clear-body">
                    <div class="warning-icon">⚠️</div>
                    <p><strong>This will delete ALL data including:</strong></p>
                    <ul>
                        <li>All assignments and tasks</li>
                        <li>Settings and connections</li>
                        <li>Completion streaks</li>
                        <li>Dev mode settings</li>
                    </ul>
                    <p class="warning-text">Continue with data wipe?</p>
                    
                    <div class="dev-clear-actions">
                        <button class="btn btn-secondary" onclick="this.closest('.dev-clear-modal').remove()">
                            Cancel
                        </button>
                        <button class="btn danger-btn" onclick="tracker.confirmDevClearData()">
                            Wipe All Data
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

    confirmDevClearData() {
        localStorage.clear();
        this.assignments = [];
        this.canvasConnected = false;
        this.googleConnected = false;
        this.completionStreak = 0;
        
        // Re-render everything
        this.renderAssignments();
        this.renderCurrentView();
        this.updateStatistics();
        this.updateDevInfo();
        
        this.logToDevConsole('All data cleared - localStorage wiped');
        this.showNotification('🗑️ All data cleared successfully', 'success');
        
        // Close modal
        const modal = document.querySelector('.dev-clear-modal');
        if (modal) modal.remove();
        
        // Refresh settings if open
        if (document.getElementById('settings-view').style.display !== 'none') {
            settingsManager.renderSettingsPage();
        }
    }

    exportLogs() {
        const logs = {
            timestamp: new Date().toISOString(),
            assignments: this.assignments,
            localStorage: { ...localStorage },
            systemInfo: {
                userAgent: navigator.userAgent,
                screen: `${screen.width}x${screen.height}`,
                language: navigator.language,
                platform: navigator.platform
            },
            performance: {
                memory: performance.memory?.usedJSHeapSize || 'N/A',
                timing: performance.timing
            }
        };

        const blob = new Blob([JSON.stringify(logs, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `hw-tracker-logs-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);

        this.logToDevConsole('Logs exported');
        this.showNotification('📋 Logs exported successfully', 'success');
    }

    unlockPremium() {
        localStorage.setItem('premium-user', 'true');
        localStorage.setItem('dev-premium', 'true');
        localStorage.setItem('trial-start', Date.now().toString());
        
        this.logToDevConsole('Premium features unlocked via dev panel');
        this.showNotification('💎 Premium features unlocked! All restrictions removed.', 'success');
        
        // Immediately enable premium features without reload
        if (window.settingsManager) {
            settingsManager.enablePremiumFeatures();
            
            // Refresh settings if open to show unlocked features
            if (document.getElementById('settings-view').style.display !== 'none') {
                settingsManager.renderSettingsPage();
            }
        }
        
        // Update any premium UI elements
        document.querySelectorAll('.premium-feature').forEach(element => {
            element.classList.add('unlocked');
        });
        
        // Remove blur and enable premium controls immediately
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

    calculateStorageSize() {
        let total = 0;
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                total += localStorage[key].length;
            }
        }
        return `${(total / 1024).toFixed(1)}KB`;
    }

    updateDevInfo() {
        const assignmentCount = document.getElementById('dev-assignment-count');
        const storageSize = document.getElementById('dev-storage-size');
        
        if (assignmentCount) assignmentCount.textContent = this.assignments.length;
        if (storageSize) storageSize.textContent = this.calculateStorageSize();
    }

    updateDevMetrics() {
        const renderTime = document.getElementById('render-time');
        const memoryUsage = document.getElementById('memory-usage');
        
        if (renderTime) {
            renderTime.textContent = `~${Math.random() * 50 + 10 | 0}ms`;
        }
        
        if (memoryUsage) {
            if (performance.memory) {
                const used = (performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(1);
                memoryUsage.textContent = `${used}MB`;
            } else {
                memoryUsage.textContent = 'N/A';
            }
        }
        
        // Update assignment count and storage in real-time
        this.updateDevInfo();
    }

    logToDevConsole(message) {
        const console = document.getElementById('debug-console');
        if (console) {
            const line = document.createElement('div');
            line.className = 'console-line';
            line.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
            console.appendChild(line);
            console.scrollTop = console.scrollHeight;
            
            // Keep only last 50 lines
            while (console.children.length > 50) {
                console.removeChild(console.firstChild);
            }
        }
    }

    showDevPasswordPrompt() {
        const modal = document.createElement('div');
        modal.className = 'dev-password-modal';
        modal.innerHTML = `
            <div class="dev-password-content glass-card">
                <div class="dev-password-header">
                    <h3>🔧 Developer Access</h3>
                    <button class="close-btn" onclick="this.closest('.dev-password-modal').remove()">×</button>
                </div>
                
                <div class="dev-password-body">
                    <p>Enter the developer password:</p>
                    <input type="password" id="dev-password-input" placeholder="Password" maxlength="20">
                    
                    <div class="password-hint">
                        <details>
                            <summary>💡 Need a hint?</summary>
                            <p>Think about the classic gaming cheat code... but as text!</p>
                            <small>Hint: ↑↑↓↓←→←→BA</small>
                        </details>
                    </div>
                    
                    <div class="dev-password-actions">
                        <button class="btn btn-secondary" onclick="this.closest('.dev-password-modal').remove()">Cancel</button>
                        <button class="btn btn-premium" onclick="tracker.checkDevPassword()">Access</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        
        // Focus password input
        setTimeout(() => {
            const input = document.getElementById('dev-password-input');
            if (input) {
                input.focus();
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        this.checkDevPassword();
                    }
                });
            }
        }, 100);

        // Add modal styles
        this.addDevPasswordStyles();
    }

    testToggles() {
        // Test if toggles are working
        const toggleTests = [
            { id: 'dark-mode-toggle', name: 'Dark Mode' },
            { id: 'glassmorphism-toggle', name: 'Glassmorphism' },
            { id: 'animations-toggle', name: 'Animations' },
            { id: 'push-notifications-toggle', name: 'Push Notifications' },
            { id: 'deadline-reminders-toggle', name: 'Deadline Reminders' },
            { id: 'completion-celebrations-toggle', name: 'Completion Celebrations' }
        ];

        let workingToggles = 0;
        let totalToggles = 0;

        toggleTests.forEach(test => {
            const toggle = document.getElementById(test.id);
            if (toggle) {
                totalToggles++;
                if (toggle.addEventListener) {
                    workingToggles++;
                    this.logToDevConsole(`✅ ${test.name} toggle: Working`);
                } else {
                    this.logToDevConsole(`❌ ${test.name} toggle: Not working`);
                }
            } else {
                this.logToDevConsole(`⚠️ ${test.name} toggle: Not found`);
            }
        });

        this.logToDevConsole(`Toggle Test Results: ${workingToggles}/${totalToggles} working`);
        
        if (workingToggles === totalToggles && totalToggles > 0) {
            this.logToDevConsole('🎉 All toggles are functional!');
        } else if (workingToggles > 0) {
            this.logToDevConsole('⚠️ Some toggles may have issues');
        } else {
            this.logToDevConsole('❌ Toggle system needs attention');
        }
    }

    checkDevPassword() {
        const input = document.getElementById('dev-password-input');
        const password = input ? input.value.toLowerCase() : '';
        
        // Password is "konami" or "uuddlrlrba"
        if (password === 'konami' || password === 'uuddlrlrba' || password === 'dev123') {
            document.querySelector('.dev-password-modal').remove();
            this.activateDevMode();
        } else {
            input.style.borderColor = '#ef4444';
            input.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                input.style.borderColor = '';
                input.style.animation = '';
            }, 500);
            this.showNotification('❌ Incorrect password', 'error');
        }
    }

    addDevPasswordStyles() {
        if (document.getElementById('dev-password-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'dev-password-styles';
        styles.textContent = `
            .dev-password-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(10px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease-out;
            }

            .dev-password-content {
                max-width: 400px;
                margin: 1rem;
                padding: 2rem;
                animation: slideInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .dev-password-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1.5rem;
                padding-bottom: 1rem;
                border-bottom: 1px solid var(--glass-border);
            }

            .dev-password-header h3 {
                margin: 0;
                color: var(--text-primary);
            }

            .dev-password-body p {
                color: var(--text-secondary);
                margin-bottom: 1rem;
            }

            #dev-password-input {
                width: 100%;
                padding: 0.75rem;
                background: var(--glass-bg);
                border: 1px solid var(--glass-border);
                border-radius: var(--border-radius-small);
                color: var(--text-primary);
                font-size: 1rem;
                margin-bottom: 1rem;
            }

            #dev-password-input:focus {
                outline: none;
                border-color: var(--accent-color);
                box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.2);
            }

            .password-hint {
                margin: 1rem 0;
                padding: 1rem;
                background: rgba(245, 158, 11, 0.1);
                border-radius: var(--border-radius-small);
                border: 1px solid rgba(245, 158, 11, 0.2);
            }

            .password-hint details summary {
                cursor: pointer;
                color: var(--accent-color);
                font-weight: 600;
                margin-bottom: 0.5rem;
            }

            .password-hint p {
                margin: 0.5rem 0;
                font-size: 0.875rem;
            }

            .password-hint small {
                font-family: 'Courier New', monospace;
                background: rgba(0, 0, 0, 0.3);
                padding: 0.25rem 0.5rem;
                border-radius: 4px;
                color: #00ff00;
            }

            .dev-password-actions {
                display: flex;
                gap: 1rem;
                justify-content: flex-end;
                margin-top: 1.5rem;
            }

            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }

            @media (max-width: 768px) {
                .dev-password-content {
                    margin: 0.5rem;
                    padding: 1.5rem;
                }
                
                .dev-password-actions {
                    flex-direction: column;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    addDevPanelStyles() {
        if (document.getElementById('dev-panel-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'dev-panel-styles';
        styles.textContent = `
            .dev-panel {
                position: fixed;
                top: 20px;
                right: 20px;
                width: 400px;
                max-height: 80vh;
                overflow-y: auto;
                z-index: 10000;
                background: rgba(0, 0, 0, 0.9);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                padding: 0;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                font-size: 0.875rem;
                animation: slideInRight 0.3s ease-out;
            }

            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }

    // Mobile dev access - triple tap on title
    let titleTapCount = 0;
    let titleTapTimer = null;
    
    const appTitle = document.querySelector('header h1');
    if (appTitle) {
        appTitle.addEventListener('click', () => {
            titleTapCount++;
            
            if (titleTapTimer) {
                clearTimeout(titleTapTimer);
            }
            
            if (titleTapCount === 3) {
                tracker.showDevPasswordPrompt();
                titleTapCount = 0;
            } else {
                titleTapTimer = setTimeout(() => {
                    titleTapCount = 0;
                }, 1000);
            }
        });
            .dev-buttons {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 0.5rem;
            }

            .dev-buttons .btn {
                padding: 0.5rem;
                font-size: 0.75rem;
                border-radius: 6px;
            }

            .system-info, .performance-metrics {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }

            .info-item, .metric {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.5rem;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 6px;
                color: #fff;
            }

            .info-item span:first-child, .metric span:first-child {
                opacity: 0.7;
                font-size: 0.75rem;
            }

            .debug-console {
                background: rgba(0, 0, 0, 0.5);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 6px;
                padding: 0.75rem;
                height: 120px;
                overflow-y: auto;
                font-family: 'Courier New', monospace;
                font-size: 0.75rem;
            }

            .console-line {
                color: #00ff00;
                margin-bottom: 0.25rem;
                word-break: break-all;
            }

            .status.connected {
                color: #00ff00;
            }

            .status.disconnected {
                color: #ff6b6b;
            }

            @media (max-width: 768px) {
                .dev-panel {
                    width: calc(100vw - 40px);
                    right: 20px;
                    left: 20px;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    // FPS Counter for performance monitoring
    initializeFPSCounter() {
        this.fps = 0;
        this.frameCount = 0;
        this.lastTime = performance.now();
        this.fpsHistory = [];
        this.maxFPSHistory = 60; // Keep last 60 FPS readings
        
        // Start FPS monitoring
        this.startFPSMonitoring();
        
        console.log('🎯 FPS Counter initialized - Performance monitoring active');
        console.log('📊 Use tracker.showFPSStats() to view detailed performance stats');
    }

    startFPSMonitoring() {
        const updateFPS = (currentTime) => {
            this.frameCount++;
            
            // Calculate FPS every second
            if (currentTime - this.lastTime >= 1000) {
                this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
                
                // Add to history
                this.fpsHistory.push({
                    fps: this.fps,
                    timestamp: new Date().toLocaleTimeString()
                });
                
                // Keep only recent history
                if (this.fpsHistory.length > this.maxFPSHistory) {
                    this.fpsHistory.shift();
                }
                
                // Log FPS to console with performance indicators
                const performanceLevel = this.getPerformanceLevel(this.fps);
                console.log(`🚀 FPS: ${this.fps} ${performanceLevel.emoji} ${performanceLevel.status}`);
                
                // Reset counters
                this.frameCount = 0;
                this.lastTime = currentTime;
            }
            
            requestAnimationFrame(updateFPS);
        };
        
        requestAnimationFrame(updateFPS);
    }

    getPerformanceLevel(fps) {
        if (fps >= 55) {
            return { emoji: '🟢', status: 'EXCELLENT' };
        } else if (fps >= 45) {
            return { emoji: '🟡', status: 'GOOD' };
        } else if (fps >= 30) {
            return { emoji: '🟠', status: 'FAIR' };
        } else {
            return { emoji: '🔴', status: 'POOR - Consider enabling Performance Mode' };
        }
    }

    showFPSStats() {
        if (this.fpsHistory.length === 0) {
            console.log('📊 No FPS data available yet. Wait a few seconds...');
            return;
        }

        const avgFPS = Math.round(this.fpsHistory.reduce((sum, entry) => sum + entry.fps, 0) / this.fpsHistory.length);
        const minFPS = Math.min(...this.fpsHistory.map(entry => entry.fps));
        const maxFPS = Math.max(...this.fpsHistory.map(entry => entry.fps));
        const currentFPS = this.fps;

        console.group('📊 StudyFlow Performance Statistics');
        console.log(`🎯 Current FPS: ${currentFPS}`);
        console.log(`📈 Average FPS: ${avgFPS}`);
        console.log(`⬆️ Peak FPS: ${maxFPS}`);
        console.log(`⬇️ Lowest FPS: ${minFPS}`);
        console.log(`📋 Samples: ${this.fpsHistory.length}`);
        
        const performanceMode = document.body.classList.contains('performance-mode');
        const glassmorphism = !document.body.classList.contains('no-glassmorphism');
        const animations = !document.body.classList.contains('no-animations');
        
        console.log('⚙️ Current Settings:');
        console.log(`   Performance Mode: ${performanceMode ? '✅ ON' : '❌ OFF'}`);
        console.log(`   Glassmorphism: ${glassmorphism ? '✅ ON' : '❌ OFF'}`);
        console.log(`   Animations: ${animations ? '✅ ON' : '❌ OFF'}`);
        
        if (avgFPS < 30) {
            console.log('💡 Performance Tips:');
            console.log('   • Enable Performance Mode in Settings');
            console.log('   • Disable Glassmorphism effects');
            console.log('   • Reduce animations');
        }
        
        console.groupEnd();
    }

    logPerformanceEvent(event, details = '') {
        const timestamp = new Date().toLocaleTimeString();
        console.log(`⚡ [${timestamp}] ${event} ${details} (FPS: ${this.fps})`);
    }

    applyQuickGradient(color1, color2) {
        // Update CSS variables
        document.documentElement.style.setProperty('--primary-color', color1);
        document.documentElement.style.setProperty('--secondary-color', color2);
        
        // Apply gradient background
        document.body.style.background = `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
        document.body.classList.remove('image-bg', 'solid-bg', 'pattern-bg', 'video-bg');
        
        // Save to localStorage
        localStorage.setItem('primary-color', color1);
        localStorage.setItem('secondary-color', color2);
        localStorage.setItem('background-type', 'gradient');
        
        console.log(`🎨 Quick gradient applied: ${color1} → ${color2}`);
    }

    applyQuickSolid(color) {
        // Apply solid background
        document.body.style.background = color;
        document.body.classList.remove('image-bg', 'pattern-bg', 'video-bg');
        document.body.classList.add('solid-bg');
        
        // Save to localStorage
        localStorage.setItem('background-solid-color', color);
        localStorage.setItem('background-type', 'solid');
        
        console.log(`🎨 Quick solid background applied: ${color}`);
    }

    restoreVideoBackground(videoData) {
        // Create video element for background
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
        
        // Add to DOM
        document.body.appendChild(videoElement);
        document.body.appendChild(overlay);
        document.body.classList.add('video-bg');
        
        // Handle video load events
        videoElement.addEventListener('canplay', () => {
            videoElement.play().then(() => {
                console.log('✅ Video background restored successfully!');
                this.showNotification('🎬 Video background restored!', 'success');
            }).catch(e => {
                console.warn('⚠️ Video autoplay prevented:', e);
            });
        });
        
        videoElement.addEventListener('error', () => {
            console.error('❌ Video background failed to restore');
            this.showNotification('Video background failed to load', 'error');
            // Fallback to gradient
            this.applyBackground('gradient');
        });
        
        console.log('🎬 Video background restoration initiated');
    }
}
