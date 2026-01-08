# Password Generator

A modern, secure password generator built with vanilla JavaScript, HTML, and CSS. Generate cryptographically strong passwords with customizable options and export multiple passwords to CSV format.

## Overview

This password generator was created by Edward Jaeger at Heliox Group to provide a simple, fast, and secure way to create strong passwords directly in your browser. All password generation happens client-side, meaning your passwords never leave your device.

## Features

### Core Functionality
- **Cryptographically Secure Generation** - Uses Web Crypto API for truly random passwords
- **Real-Time Generation** - Passwords update instantly as you adjust settings
- **Customizable Length** - Generate passwords from 6 to 32 characters
- **Character Type Selection** - Choose from uppercase, lowercase, numbers, and symbols
- **One-Click Copy** - Copy passwords to clipboard with visual feedback

### Bulk Export
- **CSV Export** - Generate and download up to 500 passwords at once
- **Metadata Included** - CSV files include password length, character types, and generation timestamp
- **Collapsible Interface** - Clean design that doesn't clutter the main interface

### Security Features
- **Client-Side Only** - No server communication, all generation happens locally
- **Fisher-Yates Shuffle** - Ensures true randomness without predictable patterns
- **Guaranteed Character Types** - At least one character from each selected type
- **No Password Storage** - Passwords are never logged or stored anywhere

## Technical Details

### Technologies Used
- Pure JavaScript (ES6+)
- HTML5
- CSS3 with modern features (CSS Grid, Flexbox, Custom Properties)
- Web Crypto API
- Font Awesome icons

### Browser Support
- Chrome/Edge 90 and above
- Firefox 88 and above
- Safari 14 and above
- Mobile browsers (iOS Safari, Chrome Mobile)

### Security Implementation
All passwords are generated using the Web Crypto API's `crypto.getRandomValues()` method, which provides cryptographically strong random values. The Fisher-Yates shuffle algorithm is applied to ensure no predictable patterns exist in the generated passwords.

## Installation

### Option 1: Direct Use
Simply open `index.html` in any modern web browser. No build process or installation required.

### Option 2: Local Web Server
If you prefer to run it through a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js with http-server
npx http-server

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000` in your browser.

## Usage

### Generating a Single Password
1. Adjust the password length using the slider (6-32 characters)
2. Select which character types to include
3. Click "Generate Password" or simply adjust any setting to auto-generate
4. Click the clipboard icon to copy the password

### Exporting Multiple Passwords
1. Click "Bulk Export to CSV" to expand the section
2. Enter the number of passwords you want (1-500)
3. Adjust your password settings as desired
4. Click "Export CSV"
5. The file will download automatically with the naming format: `passwords_[count]_[date].csv`

### CSV File Format
Each exported CSV contains the following columns:
- Password
- Length
- Character Types (e.g., "Uppercase + Lowercase + Numbers + Symbols")
- Generated Date

## File Structure

```
password-generator/
├── index.html          # Main HTML structure
├── style.css           # All styling and responsive design
├── script.js           # Password generation and UI logic
├── README.md           # This file
└── LICENSE            # Usage terms and restrictions
```

## Customization

While the code itself cannot be modified per the license terms, you can customize the appearance by:
- Changing the company logo (update the image source in `index.html`)
- Adjusting company colors in the CSS custom properties (lines 10-13 in `style.css`)

## Best Practices

### Using Generated Passwords
- Use unique passwords for every account
- Store passwords in a reputable password manager
- Never share passwords via email or unencrypted channels
- Change passwords regularly for sensitive accounts

### CSV Export Security
- Delete CSV files immediately after importing to your password manager
- Never store CSV files in unsecured locations
- Be cautious when generating large batches of passwords
- Treat exported files as highly sensitive data

## Known Limitations

- Maximum password length is 32 characters (sufficient for most use cases)
- Bulk export limited to 500 passwords per file (performance consideration)
- No password history or storage (by design for security)
- Requires modern browser with JavaScript enabled

## Performance

The password generator is highly optimized for performance:
- Single password generation: Instant (less than 1ms)
- 100 passwords: Under 10ms
- 500 passwords: Under 50ms

All generation happens synchronously without blocking the UI thread for typical use cases.

## Privacy

This application respects your privacy:
- No analytics or tracking
- No external API calls
- No data collection
- No cookies or local storage
- All operations are performed locally in your browser

## Accessibility

The password generator follows WCAG accessibility guidelines:
- Full keyboard navigation support
- Screen reader compatible with ARIA labels
- High contrast mode support
- Reduced motion support for animations
- Semantic HTML structure

## Contributing

This project uses a proprietary license that does not permit modifications. However, if you find bugs or have suggestions for improvements, please open an issue on GitHub. We appreciate feedback and bug reports.

## License

Copyright 2026 Edward Jaeger, Heliox Group. All rights reserved.

This software is provided for use as-is. You may use this software freely, but you may not modify, adapt, or create derivative works. See the LICENSE file for complete terms.

## Credits

**Developer**: Edward Jaeger   
**Year**: 2022

## Support

For questions, issues, or feature requests, please visit:
- Developer: https://sites.google.com/helioxgroup.com/edwardjaeger

## Version History

### Version 1.2.8 (January 2026)
- Initial release
- Single password generation with customization
- Bulk CSV export feature
- Modern responsive design
- Cryptographically secure random generation
- Full accessibility support

---

Built with care by Edward Jaeger
