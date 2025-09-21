// Translation System for StudyFlow v0.2
// Free feature - supports multiple languages

class TranslationManager {
    constructor() {
        this.currentLanguage = localStorage.getItem('app-language') || this.detectBrowserLanguage();
        this.translations = {};
        this.loadTranslations();
        this.initializeLanguageSelector();
    }

    detectBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        const supportedLanguages = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'ko', 'zh'];
        const langCode = browserLang.substring(0, 2);
        return supportedLanguages.includes(langCode) ? langCode : 'en';
    }

    loadTranslations() {
        this.translations = {
            en: {
                // App Title & Navigation
                appTitle: 'StudyFlow',
                version: 'v0.2',
                home: 'Home',
                allAssignments: 'All',
                calendar: 'Calendar',
                settings: 'Settings',
                create: 'Create',

                // Statistics Dashboard
                activeTasks: 'Active Tasks',
                completed: 'Completed',
                overdue: 'Overdue',
                dayStreak: 'Day Streak',
                overallProgress: 'Overall Progress',

                // Priority Sections
                highPriority: '🔥 High Priority',
                highPrioritySubtitle: 'Due within 4 days - Handle these first!',
                comingUp: '⏰ Coming Up',
                comingUpSubtitle: 'Due within 1.5 weeks - Plan ahead',
                worryLater: '📅 Worry About Later',
                worryLaterSubtitle: 'Due in 3+ weeks - Future planning',
                completedSection: '✅ Completed',
                completedSubtitle: 'Great job! Keep up the momentum',

                // Empty States
                noUrgentAssignments: 'No urgent assignments right now 🎉',
                noUpcomingAssignments: 'No upcoming assignments',
                noLongTermAssignments: 'No long-term assignments',

                // Assignment Actions
                markComplete: 'Mark as complete',
                markIncomplete: 'Mark as incomplete',
                editAssignment: 'Edit assignment',
                deleteAssignment: 'Delete assignment',

                // Settings
                appearance: '🎨 Appearance',
                darkMode: 'Dark Mode',
                glassmorphismEffects: 'Glassmorphism Effects',
                smoothAnimations: 'Smooth Animations',
                performanceMode: 'Performance Mode',
                visualReduction: 'Reduce Visual Effects',
                language: '🌐 Language',
                notifications: '🔔 Notifications',
                pushNotifications: 'Push Notifications',
                deadlineReminders: 'Deadline Reminders',
                completionCelebrations: 'Completion Celebrations',

                // API Integration
                apiIntegrations: '🔗 API Integrations',
                canvasLMS: 'Canvas LMS',
                googleClassroom: 'Google Classroom',
                connected: 'Connected',
                notConnected: 'Not connected',
                connect: 'Connect',
                disconnect: 'Disconnect',

                // Premium Features
                premiumFeatures: '⭐ Advanced Features',
                advancedAnalytics: 'Advanced Analytics',
                cloudSync: 'Cloud Sync',
                customThemes: 'Custom Themes',
                upgrade: 'Upgrade',
                startTrial: 'Start Trial',
                freeTrial: 'Free Trial',

                // Create Assignment
                createAssignment: 'Create Assignment',
                assignmentDetails: '📝 Assignment Details',
                title: 'Title',
                description: 'Description',
                subject: 'Subject',
                dueDate: 'Due Date',
                dueTime: 'Due Time',
                appearance: '🎨 Appearance',
                colorTheme: 'Color Theme',
                additionalOptions: '⚙️ Additional Options',
                setReminder: 'Set reminder notification',
                recurringAssignment: 'Recurring assignment',
                cancel: 'Cancel',
                save: 'Save',

                // Notifications
                assignmentCompleted: '🎉 Great job! "{title}" completed!',
                assignmentIncomplete: '📝 "{title}" marked as incomplete',
                settingsUpdated: 'Settings updated successfully!',
                canvasSynced: '✅ Synced {count} assignments from Canvas',
                trialStarted: '🎉 Premium trial started! Enjoy all features for 7 days.',
                trialExpired: '⏰ Your free trial has expired. Upgrade to continue using premium features!',
                paymentSuccessful: '🎉 Payment successful! Welcome to StudyFlow Premium!',

                // Time & Dates
                today: 'Today',
                tomorrow: 'Tomorrow',
                yesterday: 'Yesterday',
                daysAgo: '{days} days ago',
                daysLeft: '{days} days left',
                overdueDays: '{days} days overdue',
                
                // Subjects
                mathematics: 'Mathematics',
                science: 'Science',
                english: 'English',
                history: 'History',
                art: 'Art',
                physicalEducation: 'Physical Education',
                music: 'Music',
                other: 'Other'
            },

            es: {
                // App Title & Navigation
                appTitle: 'StudyFlow',
                version: 'v0.2',
                home: 'Inicio',
                allAssignments: 'Todas',
                calendar: 'Calendario',
                settings: 'Ajustes',
                create: 'Crear',

                // Statistics Dashboard
                activeTasks: 'Tareas Activas',
                completed: 'Completadas',
                overdue: 'Atrasadas',
                dayStreak: 'Racha de Días',
                overallProgress: 'Progreso General',

                // Priority Sections
                highPriority: '🔥 Alta Prioridad',
                highPrioritySubtitle: 'Vencen en 4 días - ¡Manéjalas primero!',
                comingUp: '⏰ Próximas',
                comingUpSubtitle: 'Vencen en 1.5 semanas - Planifica con anticipación',
                worryLater: '📅 Para Después',
                worryLaterSubtitle: 'Vencen en 3+ semanas - Planificación futura',
                completedSection: '✅ Completadas',
                completedSubtitle: '¡Buen trabajo! Mantén el impulso',

                // Settings
                appearance: '🎨 Apariencia',
                darkMode: 'Modo Oscuro',
                glassmorphismEffects: 'Efectos de Glassmorfismo',
                smoothAnimations: 'Animaciones Suaves',
                performanceMode: 'Modo Rendimiento',
                visualReduction: 'Reducir Efectos Visuales',
                language: '🌐 Idioma',
                notifications: '🔔 Notificaciones',

                // Create Assignment
                createAssignment: 'Crear Tarea',
                assignmentDetails: '📝 Detalles de la Tarea',
                title: 'Título',
                description: 'Descripción',
                subject: 'Materia',
                dueDate: 'Fecha de Vencimiento',
                dueTime: 'Hora de Vencimiento',
                cancel: 'Cancelar',
                save: 'Guardar',

                // Subjects
                mathematics: 'Matemáticas',
                science: 'Ciencias',
                english: 'Inglés',
                history: 'Historia',
                art: 'Arte',
                physicalEducation: 'Educación Física',
                music: 'Música',
                other: 'Otro'
            },

            fr: {
                // App Title & Navigation
                appTitle: 'StudyFlow',
                version: 'v0.2',
                home: 'Accueil',
                allAssignments: 'Toutes',
                calendar: 'Calendrier',
                settings: 'Paramètres',
                create: 'Créer',

                // Statistics Dashboard
                activeTasks: 'Tâches Actives',
                completed: 'Terminées',
                overdue: 'En Retard',
                dayStreak: 'Série de Jours',
                overallProgress: 'Progrès Global',

                // Settings
                appearance: '🎨 Apparence',
                darkMode: 'Mode Sombre',
                glassmorphismEffects: 'Effets de Glassmorphisme',
                smoothAnimations: 'Animations Fluides',
                performanceMode: 'Mode Performance',
                language: '🌐 Langue',

                // Create Assignment
                createAssignment: 'Créer un Devoir',
                title: 'Titre',
                description: 'Description',
                subject: 'Matière',
                cancel: 'Annuler',
                save: 'Sauvegarder',

                // Subjects
                mathematics: 'Mathématiques',
                science: 'Sciences',
                english: 'Anglais',
                history: 'Histoire',
                art: 'Art',
                music: 'Musique',
                other: 'Autre'
            },

            de: {
                // App Title & Navigation
                appTitle: 'StudyFlow',
                version: 'v0.2',
                home: 'Startseite',
                allAssignments: 'Alle',
                calendar: 'Kalender',
                settings: 'Einstellungen',
                create: 'Erstellen',

                // Statistics Dashboard
                activeTasks: 'Aktive Aufgaben',
                completed: 'Abgeschlossen',
                overdue: 'Überfällig',
                dayStreak: 'Tage-Serie',
                overallProgress: 'Gesamtfortschritt',

                // Settings
                appearance: '🎨 Erscheinungsbild',
                darkMode: 'Dunkler Modus',
                language: '🌐 Sprache',

                // Create Assignment
                createAssignment: 'Aufgabe Erstellen',
                title: 'Titel',
                description: 'Beschreibung',
                subject: 'Fach',
                cancel: 'Abbrechen',
                save: 'Speichern',

                // Subjects
                mathematics: 'Mathematik',
                science: 'Naturwissenschaften',
                english: 'Englisch',
                history: 'Geschichte',
                art: 'Kunst',
                music: 'Musik',
                other: 'Andere'
            }
        };
    }

    initializeLanguageSelector() {
        // This will be called when settings are rendered
        this.addLanguageSettingToPage();
    }

    addLanguageSettingToPage() {
        // Add language selector to settings page
        const settingsContainer = document.getElementById('settings-content');
        if (settingsContainer) {
            const languageSection = document.createElement('div');
            languageSection.className = 'settings-section';
            languageSection.innerHTML = `
                <h3>${this.t('language')}</h3>
                <div class="setting-item">
                    <label for="language-select">${this.t('language')}</label>
                    <select id="language-select" class="language-selector">
                        <option value="en" ${this.currentLanguage === 'en' ? 'selected' : ''}>English</option>
                        <option value="es" ${this.currentLanguage === 'es' ? 'selected' : ''}>Español</option>
                        <option value="fr" ${this.currentLanguage === 'fr' ? 'selected' : ''}>Français</option>
                        <option value="de" ${this.currentLanguage === 'de' ? 'selected' : ''}>Deutsch</option>
                        <option value="it" ${this.currentLanguage === 'it' ? 'selected' : ''}>Italiano</option>
                        <option value="pt" ${this.currentLanguage === 'pt' ? 'selected' : ''}>Português</option>
                        <option value="ja" ${this.currentLanguage === 'ja' ? 'selected' : ''}>日本語</option>
                        <option value="ko" ${this.currentLanguage === 'ko' ? 'selected' : ''}>한국어</option>
                        <option value="zh" ${this.currentLanguage === 'zh' ? 'selected' : ''}>中文</option>
                    </select>
                </div>
            `;
            
            // Insert after appearance section
            const appearanceSection = settingsContainer.querySelector('.settings-section');
            if (appearanceSection) {
                appearanceSection.insertAdjacentElement('afterend', languageSection);
            }

            // Add event listener
            const languageSelect = document.getElementById('language-select');
            if (languageSelect) {
                languageSelect.addEventListener('change', (e) => {
                    this.changeLanguage(e.target.value);
                });
            }
        }
    }

    changeLanguage(langCode) {
        this.currentLanguage = langCode;
        localStorage.setItem('app-language', langCode);
        
        // Update HTML lang attribute
        document.documentElement.lang = langCode;
        
        // Translate the page
        this.translatePage();
        
        // Show notification
        if (window.tracker) {
            tracker.showNotification(this.t('settingsUpdated'), 'success');
        }
    }

    t(key, params = {}) {
        const translation = this.translations[this.currentLanguage]?.[key] || 
                          this.translations['en'][key] || 
                          key;
        
        // Replace parameters in translation
        return translation.replace(/\{(\w+)\}/g, (match, paramKey) => {
            return params[paramKey] || match;
        });
    }

    translatePage() {
        // Translate all elements with data-translate attribute
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.t(key);
            
            if (element.tagName === 'INPUT' && element.type === 'text') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        });

        // Translate specific UI elements
        this.translateStaticElements();
    }

    translateStaticElements() {
        // Navigation
        const homeBtn = document.querySelector('#home-btn .nav-label');
        if (homeBtn) homeBtn.textContent = this.t('home');
        
        const allBtn = document.querySelector('#all-assignments-btn .nav-label');
        if (allBtn) allBtn.textContent = this.t('allAssignments');
        
        const calendarBtn = document.querySelector('#calendar-btn .nav-label');
        if (calendarBtn) calendarBtn.textContent = this.t('calendar');
        
        const settingsBtn = document.querySelector('#settings-btn .nav-label');
        if (settingsBtn) settingsBtn.textContent = this.t('settings');

        // Statistics labels
        const statLabels = document.querySelectorAll('.stat-label');
        if (statLabels.length >= 4) {
            statLabels[0].textContent = this.t('activeTasks');
            statLabels[1].textContent = this.t('completed');
            statLabels[2].textContent = this.t('overdue');
            statLabels[3].textContent = this.t('dayStreak');
        }

        // Progress label
        const progressLabel = document.querySelector('.progress-label span');
        if (progressLabel) progressLabel.textContent = this.t('overallProgress');

        // Section headers
        const highPriorityHeader = document.querySelector('#high-priority h2');
        if (highPriorityHeader) highPriorityHeader.textContent = this.t('highPriority');

        const comingUpHeader = document.querySelector('#coming-up h2');
        if (comingUpHeader) comingUpHeader.textContent = this.t('comingUp');

        const worryLaterHeader = document.querySelector('#worry-later h2');
        if (worryLaterHeader) worryLaterHeader.textContent = this.t('worryLater');

        const completedHeader = document.querySelector('#completed h2');
        if (completedHeader) completedHeader.textContent = this.t('completedSection');
    }

    initializeTranslations() {
        // Set initial language
        document.documentElement.lang = this.currentLanguage;
        
        // Translate page on load
        setTimeout(() => {
            this.translatePage();
        }, 100);
    }
}

// Initialize translation manager
let translationManager;
document.addEventListener('DOMContentLoaded', () => {
    translationManager = new TranslationManager();
    translationManager.initializeTranslations();
});
