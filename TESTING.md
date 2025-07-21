# Testing Guide for AI Impact Estimator Chrome Extension

## Quick Installation Instructions

### Method 1: Load Unpacked Extension (Recommended for Testing)
1. Open Chrome browser
2. Navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top-right corner)
4. Click "Load unpacked"
5. Select the `build` folder in your project directory
6. The extension should now appear in your extensions list and toolbar

### Method 2: Install from ZIP
1. Go to `chrome://extensions/`
2. Enable "Developer mode"
3. Drag and drop the `dist/ai-impact-estimator.zip` file onto the page
4. Confirm installation

## Testing the Extension

### 1. Verify Installation
- ✅ Extension icon appears in browser toolbar
- ✅ Clicking icon opens the popup
- ✅ Popup shows "No data available" initially

### 2. Test on Supported Sites

#### ChatGPT (chatgpt.com)
1. Visit `https://chatgpt.com`
2. Log in to your account
3. Start a conversation with ChatGPT
4. After receiving a response, click the extension icon
5. ✅ Should show energy/water/carbon estimates
6. ✅ Model should be detected (e.g., "gpt-4o")

#### Claude (claude.ai)
1. Visit `https://claude.ai`
2. Log in and start a conversation
3. Check extension popup after responses
4. ✅ Should track Claude interactions

#### Grok (grok.x.ai)
1. Visit `https://grok.x.ai`
2. Interact with Grok
3. Verify tracking in extension popup

#### Other Sites
- Test similarly on Gemini, Mistral, and Meta AI

### 3. Test Different Interaction Types

#### Text Interactions
1. Send text-only prompts
2. ✅ Mode should show "text"
3. ✅ Energy calculation based on token count

#### Image Interactions
1. Upload an image or request image generation
2. ✅ Mode should show "image"
3. ✅ Higher energy consumption than text

#### Video Interactions (if supported)
1. Generate or process video content
2. ✅ Mode should show "video"
3. ✅ Highest energy consumption

### 4. Test Data Persistence
1. Interact with AI multiple times
2. ✅ Cumulative totals should increase
3. ✅ Model-wise breakdown should show different models
4. Close browser and reopen
5. ✅ Data should persist between sessions

### 5. Test Clear History Feature
1. Click "Clear History" button
2. ✅ Confirm dialog should appear
3. ✅ After confirmation, all data should reset to zero

## Debugging

### Common Issues and Solutions

#### Extension Not Loading
- Check for errors in `chrome://extensions/`
- Ensure all files are in the build folder
- Verify manifest.json syntax

#### Not Detecting Interactions
- Open browser DevTools (F12)
- Check Console tab for content script errors
- Verify you're on a supported site
- Try refreshing the page

#### Popup Not Showing Data
- Check Background page console in `chrome://extensions/`
- Verify storage permissions
- Look for JavaScript errors in popup

### Debug Tools

#### Background Script Console
1. Go to `chrome://extensions/`
2. Find "AI Impact Estimator"
3. Click "Inspect views: background page"
4. Check Console tab for errors

#### Content Script Console
1. Open DevTools on a supported AI site (F12)
2. Check Console tab for content script messages
3. Look for "AI Impact Estimator content script loaded" message

#### Popup Console
1. Right-click extension icon
2. Select "Inspect popup"
3. Check Console tab for popup-related errors

## Expected Behavior

### Normal Operation
- Extension should work silently in background
- No noticeable impact on website performance
- Popup should update within 1-2 seconds of AI interaction
- Data should accumulate over multiple interactions

### Performance Expectations
- Fast popup loading (< 500ms)
- Minimal memory usage (< 10MB)
- No interference with website functionality

## Test Scenarios

### Scenario 1: New User Experience
1. Install extension
2. Visit ChatGPT
3. Have first conversation
4. Check popup - should show first estimate

### Scenario 2: Heavy Usage
1. Have 10+ interactions across different models
2. Check cumulative totals
3. Verify model breakdown table

### Scenario 3: Multi-Modal Usage
1. Use text, image, and video features
2. Verify different modes are detected
3. Check energy differences between modes

### Scenario 4: Long-Term Usage
1. Use extension for several days
2. Verify data persistence
3. Test performance with large history

## Troubleshooting

### If Extension Doesn't Work:
1. Check Chrome version (Manifest V3 requires Chrome 88+)
2. Verify all permissions are granted
3. Try disabling/re-enabling the extension
4. Check for conflicting extensions
5. Clear browser cache and reload

### If Data Seems Incorrect:
1. Verify model detection is working
2. Check token estimation accuracy
3. Compare with expected energy values
4. Look for calculation errors in background script

## Security Testing

### Privacy Verification
- ✅ No external network requests
- ✅ Data stays local in Chrome storage
- ✅ No user content is transmitted
- ✅ Only interaction metadata is processed

### Permissions Audit
- ✅ Only requests necessary permissions
- ✅ No excessive data access
- ✅ Clear purpose for each permission

## Performance Testing

### Memory Usage
- Monitor Chrome task manager
- Extension should use < 10MB RAM
- No memory leaks over time

### CPU Usage
- Should have minimal CPU impact
- No continuous high CPU usage
- Efficient DOM observation

## Ready for Production?

Before publishing to Chrome Web Store:
- [ ] All test scenarios pass
- [ ] No console errors
- [ ] Good performance metrics
- [ ] Privacy compliance verified
- [ ] Icon and description finalized
- [ ] README documentation complete

Congratulations! Your AI Impact Estimator extension is ready for testing and use! 🎉
