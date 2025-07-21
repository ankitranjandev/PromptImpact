# AI Impact Estimator Chrome Extension

A Chrome browser extension that estimates the environmental impact (energy, water, and carbon footprint) of AI interactions across various platforms.

## Features

- **Real-time Impact Tracking**: Monitors AI interactions on supported platforms
- **Multi-Platform Support**: Works with ChatGPT, Claude, Grok, Gemini, Mistral, and Meta AI
- **Environmental Metrics**: Tracks energy consumption (Wh), water usage (ml), and carbon emissions (g CO₂e)
- **Model-Specific Calculations**: Different impact calculations for various AI models
- **Multi-Modal Detection**: Handles text, image, and video interactions
- **Cumulative Statistics**: Shows total impact and model-wise breakdowns
- **Beautiful UI**: Modern, responsive popup interface

## Supported Platforms

- ChatGPT (chatgpt.com)
- Claude (claude.ai)
- Grok (grok.x.ai)
- Gemini (gemini.google.com)
- Mistral (chat.mistral.ai)
- Meta AI (meta.ai)

## Installation

### For Development/Testing

1. Clone or download this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the extension folder
5. The extension should now appear in your browser toolbar

### Building for Production

Run the build script to create a packaged extension:

```bash
./build.sh
```

This will create a `ai-impact-estimator.zip` file ready for Chrome Web Store submission.

## How It Works

1. **Content Detection**: The extension injects a content script into supported AI platforms
2. **Interaction Monitoring**: Uses MutationObserver to detect new AI responses
3. **Impact Calculation**: Estimates environmental impact based on:
   - Model type and capabilities
   - Interaction mode (text/image/video)
   - Token count estimation
4. **Data Storage**: Stores estimates locally for cumulative tracking
5. **UI Display**: Shows real-time and historical data in the popup

## Environmental Impact Methodology

### Energy Calculation
- **Text**: Based on token count and model-specific energy consumption
- **Image**: Fixed energy cost per image generation/processing
- **Video**: Energy cost multiplied by estimated duration

### Water Usage
- Calculated as: Energy (Wh) × 6.8 ml/Wh (industry average for data centers)

### Carbon Emissions
- Calculated as: Energy (kWh) × 350 g CO₂e/kWh (global average grid intensity)

## File Structure

- `manifest.json` - Extension configuration
- `background.js` - Service worker for calculations and storage
- `content.js` - Content script for page interaction detection
- `popup.html` - Popup UI template
- `popup.js` - Popup logic and data display

## Development

### Prerequisites
- Chrome browser
- Basic knowledge of Chrome extension development

### Local Development
1. Make changes to the source files
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension card
4. Test your changes

### Debugging
- Background script: `chrome://extensions/` → Extension details → Inspect views: background page
- Content script: Browser DevTools → Console
- Popup: Right-click extension icon → Inspect popup

## Privacy & Security

- **No External Requests**: All calculations are done locally
- **Local Storage Only**: Data is stored locally in Chrome storage
- **No User Data Collection**: Only interaction metadata is processed
- **Minimal Permissions**: Only requests necessary permissions for functionality

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues, questions, or feature requests, please open an issue on the GitHub repository.

## Changelog

### v1.0.0
- Initial release
- Support for major AI platforms
- Real-time impact tracking
- Cumulative statistics
- Modern UI design
