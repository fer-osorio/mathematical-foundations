/**
 * ============================================================================
 * CRYPTOGRAPHY PORTFOLIO - MAIN APPLICATION LOGIC
 *
 * SECURITY PRINCIPLES DEMONSTRATED HERE:
 * 1. No external tracking scripts
 * 2. Input validation (when handling user data)
 * 3. Content Security Policy compliance
 * 4. Safe document object model (DOM) manipulation (prevent XSS)
 * 5. Secure navigation handling
 *
 * JAVASCRIPT ORGANIZATION:
 * - Initialization: Code that runs when page loads
 * - Utility functions: Reusable helper functions
 * - Event handlers: Functions that respond to user interactions
 * - Security helpers: Functions for secure operations
 *
 * ============================================================================
 */

// ============================================================================
// INITIALIZATION: Runs when the page fully loads
// ============================================================================

// DOM Content Loaded: Ensures HTML is parsed before we manipulate it
document.addEventListener('DOMContentLoaded', function() {
    console.log('Application initialized');

    // Initialize interactive features
    setupNavigation();
    setupToolButtons();
});

// ============================================================================
// NAVIGATION UTILITIES
// ============================================================================

/**
 * setupNavigation - Initialize navigation interactivity
 *
 * This function:
 * 1. Sets the active nav link based on current page
 * 2. Adds smooth scroll behavior
 * 3. Handles link highlights
 *
 * Why separate this?
 * Following good software engineering: one function = one responsibility
 * (This is the Single Responsibility Principle, applies to all code)
 */
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');

    // Remove 'active' class from all links, then add to current
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

/**
 * navigateToTool - Safely navigate to a tool page
 *
 * SECURITY NOTE: We validate the filename to prevent path traversal attacks
 * Example of bad: navigateToTool('../../admin.html') - this would fail
 *
 * @param {string} toolPath - The path to the tool (e.g., 'rsa-tool.html')
 */
function navigateToTool(toolPath) {
    // Security: Validate that the path is safe
    // Only allow alphanumeric characters, hyphens, and .html extension
    const validPathRegex = /^[a-zA-Z0-9\-]+\.html$/;

    if (!validPathRegex.test(toolPath)) {
        console.error('Invalid tool path:', toolPath);
        alert('Invalid tool path. Security check failed.');
        return;
    }

    // If validation passes, navigate
    window.location.href = toolPath;
}

// ============================================================================
// TOOL BUTTON UTILITIES
// ============================================================================

/**
 * setupToolButtons - Initialize tool card buttons
 *
 * This finds all tool buttons and adds interactivity
 */
function setupToolButtons() {
    const toolButtons = document.querySelectorAll('.btn-primary');

    toolButtons.forEach(button => {
        button.addEventListener('mouseover', function() {
            if (!this.disabled) {
                this.style.cursor = 'pointer';
            }
        });
    });
}

// ============================================================================
// SECURE DOM MANIPULATION UTILITIES
// ============================================================================

/**
 * sanitizeHTML - Prevent XSS attacks by escaping HTML characters
 *
 * SECURITY CONCEPT: Cross-Site Scripting (XSS)
 *
 * Without sanitization, if user input contains:
 *   <img src=x onerror="alert('hacked')">
 * It could execute arbitrary code in the browser.
 *
 * This function converts dangerous characters to safe HTML entities:
 *   < becomes &lt;
 *   > becomes &gt;
 *   & becomes &amp;
 *   etc.
 *
 * @param {string} text - Raw user input
 * @returns {string} - Sanitized text safe to display
 *
 * EXAMPLE:
 *   Input:  <script>alert('xss')</script>
 *   Output: &lt;script&gt;alert('xss')&lt;/script&gt;
 *   Display: <script>alert('xss')</script> (shown as text, not executed)
 */
function sanitizeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;  // textContent is safer than innerHTML
    return div.innerHTML;
}

/**
 * createSecureElement - Safely create and configure DOM elements
 *
 * Instead of using innerHTML (which can execute code), we use
 * textContent and setAttribute to build elements safely.
 *
 * @param {string} tag - HTML tag name (e.g., 'div', 'p')
 * @param {string} text - Text content (automatically escaped)
 * @param {object} attributes - Object with attributes to set
 * @returns {HTMLElement} - Newly created element
 */
function createSecureElement(tag, text = '', attributes = {}) {
    const element = document.createElement(tag);

    // Set text content safely
    if (text) {
        element.textContent = text;
    }

    // Set attributes safely
    Object.keys(attributes).forEach(key => {
        // Whitelist of safe attributes to prevent injection
        const safeAttributes = ['class', 'id', 'data-', 'aria-', 'alt', 'title'];
        const isSafe = safeAttributes.some(safe => key.startsWith(safe));

        if (isSafe) {
            element.setAttribute(key, attributes[key]);
        }
    });

    return element;
}

// ============================================================================
// UTILITY FUNCTIONS FOR COMMON TASKS
// ============================================================================

/**
 * logEvent - Secure logging (no personally identifiable information)
 *
 * PRIVACY NOTE: This logs events but NO user data, timestamps, or IP addresses
 * See: Your portfolio respects user privacy
 *
 * @param {string} eventName - Name of the event
 * @param {object} data - Event data (never include PII)
 */
function logEvent(eventName, data = {}) {
    // Only log in development (when console is open by developer)
    // Production logging should use server-side analytics respecting privacy
    if (process.env.NODE_ENV === 'development' || typeof DEBUG !== 'undefined') {
        console.log(`[${eventName}]`, data);
    }
}

/**
 * formatDate - Format a date for display
 *
 * @param {Date} date - JavaScript Date object
 * @returns {string} - Formatted date string
 */
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}

/**
 * isSecureContext - Check if running in a secure context
 *
 * SECURITY: Cryptographic operations should only run in secure contexts
 * (HTTPS, localhost, etc.), not on plain HTTP
 *
 * @returns {boolean} - True if secure (HTTPS or localhost)
 */
function isSecureContext() {
    return window.isSecureContext || window.location.protocol === 'https:' || window.location.hostname === 'localhost';
}

// ============================================================================
// CONTENT SECURITY POLICY (CSP) UTILITIES
// ============================================================================

/**
 * checkCSPCompliance - Verify CSP header is properly set
 *
 * CSP (Content Security Policy) is a security header that prevents XSS
 * It's set in the <meta> tag in the HTML <head>
 *
 * WHY: Only scripts from approved sources can run
 * This is crucial when your site has user-generated content
 */
function checkCSPCompliance() {
    // The browser enforces CSP - we just verify it's active
    const metaCSP = document.querySelector('meta[http-equiv="Content-Security-Policy"]');

    if (metaCSP) {
        console.log('✓ CSP is active:', metaCSP.getAttribute('content'));
    } else {
        console.warn('⚠ CSP meta tag not found. Consider adding it.');
    }
}

// ============================================================================
// ERROR HANDLING & DEBUGGING
// ============================================================================

/**
 * handleError - Global error handler
 *
 * Catches unexpected errors and logs them safely
 * Never expose sensitive information in error messages to users
 */
window.addEventListener('error', function(event) {
    console.error('Global error caught:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        // Never log the full error stack to users (security)
    });

    // Optionally send to a server for monitoring (with user consent)
    // sendErrorToServer(event);
});

/**
 * handleUnhandledRejection - Handle unhandled Promise rejections
 *
 * Similar to error handler but for async operations
 */
window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled Promise rejection:', event.reason);
});

// ============================================================================
// INITIALIZATION CHECK
// ============================================================================

/**
 * Initialize security checks on page load
 */
document.addEventListener('DOMContentLoaded', function() {
    checkCSPCompliance();

    if (!isSecureContext()) {
        console.warn('⚠ Not in a secure context. Cryptographic operations may be limited.');
    } else {
        console.log('✓ Running in secure context');
    }
});
