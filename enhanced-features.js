/**
 * Enhanced Features for Contact Form
 * Author: Yassir Rzigui - Full-Stack Developer & AI Specialist
 * Email: rziguiyassir@gmail.com
 * LinkedIn: https://linkedin.com/in/yassir-rzigui
 * GitHub: https://github.com/yazzy01
 */

// Dark mode functionality
function initDarkMode() {
    const toggleButton = document.createElement('button');
    toggleButton.id = 'dark-mode-toggle';
    toggleButton.innerHTML = '🌙';
    toggleButton.className = 'dark-mode-btn';
    toggleButton.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        font-size: 20px;
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(toggleButton);
    
    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        toggleButton.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
        
        // Save preference
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });
    
    // Load saved preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        toggleButton.innerHTML = '☀️';
    }
}

// Form data export functionality
function addExportFeature() {
    const exportButton = document.createElement('button');
    exportButton.type = 'button';
    exportButton.id = 'export-data';
    exportButton.className = 'btn btn-secondary';
    exportButton.textContent = 'Export Form Data';
    exportButton.style.marginLeft = '10px';
    
    const submitButton = document.getElementById('submit-btn');
    submitButton.parentNode.insertBefore(exportButton, submitButton.nextSibling);
    
    exportButton.addEventListener('click', () => {
        const formData = {
            firstName: document.getElementById('first-name').value,
            lastName: document.getElementById('last-name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value,
            timestamp: new Date().toISOString()
        };
        
        const dataStr = JSON.stringify(formData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `contact-form-data-${Date.now()}.json`;
        link.click();
    });
}

// Form analytics
function initFormAnalytics() {
    const analytics = {
        startTime: Date.now(),
        fieldInteractions: {},
        validationErrors: []
    };
    
    // Track field interactions
    Object.keys(document.querySelectorAll('.form-control')).forEach(key => {
        const input = document.querySelectorAll('.form-control')[key];
        if (input && input.id) {
            analytics.fieldInteractions[input.id] = {
                focused: 0,
                changed: 0,
                errors: 0
            };
            
            input.addEventListener('focus', () => {
                analytics.fieldInteractions[input.id].focused++;
            });
            
            input.addEventListener('change', () => {
                analytics.fieldInteractions[input.id].changed++;
            });
        }
    });
    
    // Export analytics
    window.getFormAnalytics = () => {
        analytics.completionTime = Date.now() - analytics.startTime;
        return analytics;
    };
}

// Character counter for message field
function addCharacterCounter() {
    const messageField = document.getElementById('message');
    const counter = document.createElement('div');
    counter.className = 'character-counter';
    counter.style.cssText = `
        font-size: 12px;
        color: #666;
        text-align: right;
        margin-top: 5px;
    `;
    
    messageField.parentNode.appendChild(counter);
    
    function updateCounter() {
        const current = messageField.value.length;
        const max = 50;
        counter.textContent = `${current}/${max} characters`;
        counter.style.color = current > max ? 'red' : current > max * 0.8 ? 'orange' : '#666';
    }
    
    messageField.addEventListener('input', updateCounter);
    updateCounter();
}

// Initialize all enhanced features
document.addEventListener('DOMContentLoaded', () => {
    // Wait for main form to load first
    setTimeout(() => {
        initDarkMode();
        addExportFeature();
        initFormAnalytics();
        addCharacterCounter();
        
        console.log('Enhanced features initialized by Yassir Rzigui');
    }, 100);
});
