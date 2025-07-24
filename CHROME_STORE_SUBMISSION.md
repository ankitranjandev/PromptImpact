# Chrome Web Store Submission - Privacy Practices

## Host Permission Justification

**Permission:** Host permissions for AI platform websites (ChatGPT, Claude, Gemini, Grok, Perplexity, Mistral, Copilot, Poe)

**Justification:**
PromptImpact requires host permissions for specific AI chatbot platforms to:
1. **Detect AI model types** - The extension reads publicly visible model information (e.g., "GPT-4", "Claude 3.5 Sonnet") displayed on these platforms to provide accurate environmental impact calculations
2. **Monitor interaction patterns** - Observes when users send messages or receive responses to calculate token usage and interaction frequency
3. **Inject impact display** - Shows real-time environmental impact estimates directly on the AI platform interfaces

These permissions are essential for the extension's core functionality of providing environmental impact awareness for AI usage. The extension only accesses publicly visible content and does not read private conversation content or personal data.

## Remote Code Justification

**Status:** No remote code is used

**Justification:**
PromptImpact does not use any remote code execution. All functionality is contained within:
- Static JavaScript files (background.js, content.js, popup.js)
- Local HTML/CSS (popup.html)
- No external script loading or remote code execution
- No eval() or similar dynamic code execution
- All code is packaged with the extension and reviewed during submission

## Storage Justification

**Permission:** Chrome Storage API (local storage only)

**Justification:**
PromptImpact uses Chrome's storage API to:
1. **Save environmental impact estimates** - Stores calculated energy, water, and carbon footprint data locally for user reference
2. **Maintain usage history** - Keeps a local record of AI interactions to show cumulative environmental impact over time
3. **Persist user preferences** - Stores user settings and display preferences

**Data stored:**
- Environmental impact calculations (energy in Wh, water in mL, carbon in grams)
- AI model names and interaction timestamps
- Cumulative usage statistics
- NO personal content, conversation data, or personally identifiable information

All data remains local to the user's browser and is never transmitted externally.

## Single Purpose Description

**Primary Purpose:** Environmental Impact Awareness for AI Usage

PromptImpact serves a single, focused purpose: to help users understand and track the environmental impact of their AI chatbot interactions. The extension calculates and displays real-time estimates of energy consumption, water usage, and carbon emissions for conversations with various AI models (GPT, Claude, Gemini, etc.).

**Core functionality:**
- Real-time environmental impact calculation during AI interactions
- Display of energy (Wh), water (mL), and carbon (grams) footprint
- Historical tracking of cumulative environmental impact
- Model-specific impact estimates based on AI model efficiency

This single purpose aligns with growing environmental consciousness and helps users make informed decisions about their AI usage patterns.

## Data Usage Compliance Certification

I certify that PromptImpact's data usage complies with Chrome Web Store Developer Program Policies:

✅ **Limited Data Collection**: Only collects minimal metadata necessary for environmental impact calculations (interaction counts, model types, timestamps)

✅ **No Personal Data**: Does not collect, store, or transmit personal information, conversation content, or user identification data

✅ **Local Storage Only**: All data is stored locally using Chrome's storage API with no external transmission

✅ **Transparent Privacy Policy**: Comprehensive privacy policy clearly explains data practices and user rights

✅ **User Control**: Users can view all stored data and clear it at any time using the "Clear History" function

✅ **Secure Handling**: Implements proper error handling and storage quota management to prevent data corruption

✅ **Justified Permissions**: All requested permissions are essential for core functionality and clearly justified

The extension enhances user privacy by operating entirely locally without any external data transmission or third-party integrations.

## Contact Information

**Developer Email:** ankitranjan.dev@gmail.com
**GitHub Repository:** https://github.com/ankitranjandev/PromptImpact
**Support:** Available via GitHub issues and direct email contact

---

*All information provided is accurate and complete as of the submission date. The extension has been thoroughly tested and meets all Chrome Web Store requirements.*