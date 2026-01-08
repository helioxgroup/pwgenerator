const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const lengthValueEl = document.getElementById('lengthValue');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');
const notificationEl = document.getElementById('notification');
const bulkToggleEl = document.getElementById('bulkToggle');
const bulkContentEl = document.getElementById('bulkContent');
const bulkCountEl = document.getElementById('bulkCount');
const exportCsvEl = document.getElementById('exportCsv');

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

// Toggle bulk export section
bulkToggleEl.addEventListener('click', () => {
    bulkToggleEl.classList.toggle('active');
    bulkContentEl.classList.toggle('show');
});

// Export CSV functionality
exportCsvEl.addEventListener('click', () => {
    const count = parseInt(bulkCountEl.value);
    
    // Validate count
    if (isNaN(count) || count < 1 || count > 500) {
        showNotification('Please enter a number between 1 and 500!', 'error');
        return;
    }
    
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;
    
    // Validate at least one option is selected
    if (!hasLower && !hasUpper && !hasNumber && !hasSymbol) {
        showNotification('Please select at least one character type!', 'error');
        return;
    }
    
    // Generate passwords
    const passwords = [];
    for (let i = 0; i < count; i++) {
        const password = createPassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
        passwords.push(password);
    }
    
    // Create CSV content
    const csvContent = generateCSV(passwords, length, hasLower, hasUpper, hasNumber, hasSymbol);
    
    // Download CSV
    downloadCSV(csvContent, `passwords_${count}_${new Date().toISOString().split('T')[0]}.csv`);
    
    showNotification(`Successfully exported ${count} passwords!`, 'success');
});

// Generate CSV content
function generateCSV(passwords, length, hasLower, hasUpper, hasNumber, hasSymbol) {
    // CSV Header
    let csv = 'Password,Length,Character Types,Generated Date\n';
    
    // Character types used
    const types = [];
    if (hasLower) types.push('Lowercase');
    if (hasUpper) types.push('Uppercase');
    if (hasNumber) types.push('Numbers');
    if (hasSymbol) types.push('Symbols');
    const typesStr = types.join(' + ');
    
    // Current date and time
    const now = new Date().toLocaleString();
    
    // Add each password as a row
    passwords.forEach(password => {
        csv += `"${password}",${length},"${typesStr}","${now}"\n`;
    });
    
    return csv;
}

// Download CSV file
function downloadCSV(content, filename) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    }
}

// Update length value display when slider changes
lengthEl.addEventListener('input', () => {
    lengthValueEl.textContent = lengthEl.value;
    generatePassword(); // Generate new password on slider change
});

// Generate password on page load
window.addEventListener('DOMContentLoaded', () => {
    generatePassword();
});

// Copy to clipboard with modern API
clipboardEl.addEventListener('click', async () => {
    const password = resultEl.innerText;
    
    if (!password || password === 'Generating...') {
        showNotification('No password to copy!', 'error');
        return;
    }
    
    try {
        // Use modern Clipboard API
        await navigator.clipboard.writeText(password);
        showNotification('Password copied to clipboard!', 'success');
        
        // Visual feedback - briefly change icon
        const icon = clipboardEl.querySelector('i');
        icon.classList.remove('fa-clipboard');
        icon.classList.add('fa-check');
        setTimeout(() => {
            icon.classList.remove('fa-check');
            icon.classList.add('fa-clipboard');
        }, 2000);
    } catch (err) {
        // Fallback for older browsers
        fallbackCopyToClipboard(password);
    }
});

// Fallback copy method for older browsers
function fallbackCopyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        document.execCommand('copy');
        showNotification('Password copied to clipboard!', 'success');
    } catch (err) {
        showNotification('Failed to copy password', 'error');
    }
    
    document.body.removeChild(textarea);
}

// Show notification instead of alert
function showNotification(message, type = 'success') {
    notificationEl.textContent = message;
    notificationEl.className = `notification ${type} show`;
    
    setTimeout(() => {
        notificationEl.classList.remove('show');
    }, 3000);
}

// Generate password on button click
generateEl.addEventListener('click', generatePassword);

// Generate password when checkboxes change
uppercaseEl.addEventListener('change', generatePassword);
lowercaseEl.addEventListener('change', generatePassword);
numbersEl.addEventListener('change', generatePassword);
symbolsEl.addEventListener('change', generatePassword);

// Generate password when Enter is pressed on checkboxes
document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            generatePassword();
        }
    });
});

// Generate password function
function generatePassword() {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;
    
    // Validate at least one option is selected
    if (!hasLower && !hasUpper && !hasNumber && !hasSymbol) {
        showNotification('Please select at least one character type!', 'error');
        resultEl.innerText = '';
        return;
    }
    
    // Validate length
    if (length < 6 || length > 32) {
        showNotification('Password length must be between 6 and 32!', 'error');
        return;
    }
    
    const password = createPassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
    
    // Animate password generation
    resultEl.style.opacity = '0';
    setTimeout(() => {
        resultEl.innerText = password;
        resultEl.style.opacity = '1';
    }, 150);
}

// Create password with crypto-secure randomness and proper shuffling
function createPassword(lower, upper, number, symbol, length) {
    let chars = '';
    let password = '';
    
    // Build character set
    if (lower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (number) chars += '0123456789';
    if (symbol) chars += '!@#$%^&*(){}[]=<>/,.';
    
    // Ensure at least one character from each selected type
    const types = [];
    if (lower) types.push(getRandomLower());
    if (upper) types.push(getRandomUpper());
    if (number) types.push(getRandomNumber());
    if (symbol) types.push(getRandomSymbol());
    
    // Add one of each required type first
    password = types.join('');
    
    // Fill the rest with random characters from the full set
    for (let i = password.length; i < length; i++) {
        password += chars[getSecureRandomInt(chars.length)];
    }
    
    // Shuffle the password to avoid predictable patterns
    return shuffleString(password);
}

// Shuffle string using Fisher-Yates algorithm with crypto-secure randomness
function shuffleString(str) {
    const arr = str.split('');
    for (let i = arr.length - 1; i > 0; i--) {
        const j = getSecureRandomInt(i + 1);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
}

// Get crypto-secure random integer
function getSecureRandomInt(max) {
    const randomBuffer = new Uint32Array(1);
    crypto.getRandomValues(randomBuffer);
    return randomBuffer[0] % max;
}

// Generate random lowercase letter
function getRandomLower() {
    return String.fromCharCode(getSecureRandomInt(26) + 97);
}

// Generate random uppercase letter
function getRandomUpper() {
    return String.fromCharCode(getSecureRandomInt(26) + 65);
}

// Generate random number
function getRandomNumber() {
    return String.fromCharCode(getSecureRandomInt(10) + 48);
}

// Generate random symbol
function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[getSecureRandomInt(symbols.length)];
}

// Add transition for password display
resultEl.style.transition = 'opacity 0.15s ease';
