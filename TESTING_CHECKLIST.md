# Chrome Extension Testing Checklist

## Installation Verification ✅
- [ ] Extension appears in Chrome extensions list
- [ ] Extension icon visible in browser toolbar
- [ ] No error messages in extensions page
- [ ] Extension shows as "Enabled"

## Basic Functionality Test 🧪
- [ ] Click extension icon opens popup
- [ ] Popup shows "No data available" initially
- [ ] UI elements load correctly (sections, buttons, table)

## ChatGPT Test (chat.openai.com) 🤖
- [ ] Visit https://chat.openai.com
- [ ] Log in if needed
- [ ] Send a message: "Hello, what's the weather like?"
- [ ] Wait for ChatGPT response
- [ ] Click extension icon
- [ ] Verify:
  - [ ] Model name detected (e.g., "GPT-4o", "GPT-4")
  - [ ] Mode shows "text"
  - [ ] Energy > 0 Wh
  - [ ] Water > 0 ml
  - [ ] Carbon > 0 g CO2e
  - [ ] Cumulative totals updated
  - [ ] Model appears in breakdown table

## Claude Test (claude.ai) 🎭
- [ ] Visit https://claude.ai
- [ ] Have a conversation
- [ ] Check extension shows Claude data

## Grok Test (grok.x.ai) 🚀
- [ ] Visit https://grok.x.ai (if accessible)
- [ ] Test interaction tracking

## Debug Console Check 🔍
- [ ] Open DevTools (F12) on AI site
- [ ] Check Console for content script message
- [ ] Look for: "AI Impact Estimator content script loaded on: [hostname]"
- [ ] No JavaScript errors

## Background Script Debug 🛠️
- [ ] Go to chrome://extensions/
- [ ] Find "AI Impact Estimator"
- [ ] Click "Inspect views: background page"
- [ ] Check Console for background script logs
- [ ] Look for: "AI Impact Estimator background script loaded"

## Advanced Features Test 🎯
- [ ] Test multiple conversations
- [ ] Verify cumulative totals increase
- [ ] Test "Clear History" button
- [ ] Confirm data resets after clear
- [ ] Test different AI platforms if available

## Performance Check ⚡
- [ ] Extension doesn't slow down websites
- [ ] Popup opens quickly (< 1 second)
- [ ] No memory leaks or high CPU usage

## Error Scenarios 🚨
- [ ] Test on unsupported website (should do nothing)
- [ ] Test with ad blockers enabled
- [ ] Test with other extensions disabled

---

## Troubleshooting Common Issues 🔧

### Extension Not Loading
- Check if all files are in build folder
- Verify manifest.json syntax
- Try disabling/re-enabling extension

### Not Detecting Interactions
- Check browser console for errors
- Verify you're on supported sites
- Try refreshing the page after extension loads

### No Data in Popup
- Wait 1-2 seconds after AI response
- Check background script console for errors
- Verify storage permissions

### Models Not Detected
- Check if AI platform changed their UI
- Look for console error messages
- Try different conversation types

---

## Success Criteria ✨
Extension is working correctly if:
- ✅ Installs without errors
- ✅ Detects at least one AI interaction
- ✅ Shows environmental impact data
- ✅ Tracks cumulative totals
- ✅ Clear history function works
- ✅ No performance issues

Ready to test! 🚀
