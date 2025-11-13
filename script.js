/**
 * Ottawa Blockchain - Coming Soon Page
 * Countdown Timer Script
 * Target Date: November 20, 2025
 */

// ===================================
// Configuration
// ===================================

// Set the target launch date (November 20, 2025 at midnight)
const launchDate = new Date('November 20, 2025 00:00:00').getTime();

// Get countdown element references
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

// ===================================
// Countdown Logic
// ===================================

/**
 * Updates the countdown timer display
 * Calculates time remaining and updates DOM elements
 */
function updateCountdown() {
    // Get current time
    const now = new Date().getTime();
    
    // Calculate time remaining
    const timeRemaining = launchDate - now;
    
    // Check if countdown has finished
    if (timeRemaining < 0) {
        // Countdown finished - display zeros
        daysElement.textContent = '00';
        hoursElement.textContent = '00';
        minutesElement.textContent = '00';
        secondsElement.textContent = '00';
        
        // Optional: Update page to show launch message
        const launchText = document.querySelector('.launch-text');
        if (launchText) {
            launchText.textContent = '🚀 We have launched! Welcome to Ottawa Blockchain.';
        }
        
        // Stop the countdown interval
        clearInterval(countdownInterval);
        return;
    }
    
    // Calculate time units
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    
    // Update DOM with formatted values
    updateElement(daysElement, days);
    updateElement(hoursElement, hours);
    updateElement(minutesElement, minutes);
    updateElement(secondsElement, seconds);
}

/**
 * Updates a countdown element with animation
 * @param {HTMLElement} element - The DOM element to update
 * @param {number} value - The new value to display
 */
function updateElement(element, value) {
    // Format value with leading zero if needed
    const formattedValue = value < 10 ? `0${value}` : value.toString();
    
    // Only update if value has changed to prevent unnecessary DOM updates
    if (element.textContent !== formattedValue) {
        // Add pulse animation class
        element.classList.add('update');
        
        // Update the text content
        element.textContent = formattedValue;
        
        // Remove animation class after animation completes
        setTimeout(() => {
            element.classList.remove('update');
        }, 300);
    }
}

// ===================================
// Initialization
// ===================================

/**
 * Initialize the countdown timer
 * Runs immediately and then every second
 */
function initCountdown() {
    // Run countdown immediately on page load
    updateCountdown();
    
    // Update countdown every second (1000ms)
    return setInterval(updateCountdown, 1000);
}

// Start the countdown timer when page loads
const countdownInterval = initCountdown();

// ===================================
// Additional Animations & Effects
// ===================================

/**
 * Add scroll-triggered animations (optional enhancement)
 * Observes elements and adds animation classes when in viewport
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe animated elements
    const animatedElements = document.querySelectorAll('.countdown-item, .social-link');
    animatedElements.forEach(el => observer.observe(el));
}

/**
 * Add subtle parallax effect to logo (optional enhancement)
 */
function initLogoParallax() {
    const logo = document.querySelector('.logo');
    
    if (!logo) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        logo.style.transform = `translateY(${rate}px) scale(${1 + scrolled * 0.0001})`;
    });
}

/**
 * Performance optimization: Use requestAnimationFrame for smooth animations
 */
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Perform scroll-based animations here
            ticking = false;
        });
        ticking = true;
    }
});

// ===================================
// Event Listeners
// ===================================

/**
 * Initialize all features when DOM is fully loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('Ottawa Blockchain - Coming Soon Page Loaded');
    console.log(`Launch Date: ${new Date(launchDate).toLocaleDateString()}`);
    
    // Initialize optional enhancements
    // initScrollAnimations();
    // initLogoParallax();
    
    // Add keyboard accessibility for social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                link.click();
            }
        });
    });
});

/**
 * Handle visibility change to pause/resume countdown
 * Saves resources when tab is not visible
 */
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Page hidden - countdown continues in background');
    } else {
        console.log('Page visible - countdown active');
        // Force immediate update when page becomes visible
        updateCountdown();
    }
});

/**
 * Handle page unload
 */
window.addEventListener('beforeunload', () => {
    // Clean up interval
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
});

// ===================================
// Utility Functions
// ===================================

/**
 * Format time remaining as human-readable string
 * @param {number} milliseconds - Time in milliseconds
 * @returns {string} Formatted time string
 */
function formatTimeRemaining(milliseconds) {
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor((milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
        return `${days} day${days !== 1 ? 's' : ''} and ${hours} hour${hours !== 1 ? 's' : ''}`;
    } else if (hours > 0) {
        return `${hours} hour${hours !== 1 ? 's' : ''}`;
    } else {
        return 'Less than an hour';
    }
}

/**
 * Log time remaining to console (for debugging)
 */
function logTimeRemaining() {
    const now = new Date().getTime();
    const remaining = launchDate - now;
    
    if (remaining > 0) {
        console.log(`Time until launch: ${formatTimeRemaining(remaining)}`);
    }
}

// Log initial time remaining
logTimeRemaining();
