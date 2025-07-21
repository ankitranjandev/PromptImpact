# 🐛 Debug Guide: Model Detection Issues

## 🔍 **Your Extension Now Has Comprehensive Debug Logging!**

### **How to Debug Model Detection:**

## 1. **Install the Updated Extension**
```bash
# The extension is ready in the build folder
# Load it as an unpacked extension in Chrome
```

## 2. **Enable Console Logging**

### **For Content Script (On AI Websites):**
1. Visit an AI website (ChatGPT, Claude, Gemini, etc.)
2. Open DevTools (F12)
3. Go to **Console** tab
4. Look for debug messages starting with 🔍, ✅, ❌

### **For Background Script:**
1. Go to `chrome://extensions/`
2. Find "AI Impact Estimator"
3. Click **"Inspect views: background page"**
4. Check Console for background logs

## 3. **Debug Log Categories**

### **🌐 Platform Detection:**
```
🌐 AI Impact Estimator: Loaded on chat.openai.com
🚀 Initializing ChatGPT detection...
```

### **🔍 Model Detection Process:**
```
🔍 ChatGPT: Starting model detection...
🔍 ChatGPT: Checking selector "[data-testid="model-switcher-button"]": GPT-4o
✅ ChatGPT: Found model via selector: GPT-4o
📝 ChatGPT: Setting model to: GPT-4o
```

### **💬 Interaction Processing:**
```
💬 Processing AI interaction...
💬 Response length: 1250
💬 Found input via "textarea": Hello, how are you?
💬 Interaction details: {model: "GPT-4o", mode: "text", inputTokens: 15, outputTokens: 167}
📤 Sending message to background script...
✅ Message sent successfully
```

### **🔄 Background Processing:**
```
🔄 Background: Received estimate request: {model: "GPT-4o", inputTokens: 15, outputTokens: 167, mode: "text"}
📊 Background: Total tokens: 182
✅ Background: Found case-insensitive match: "GPT-4o"
📈 Background: Using model bases: {text: 0.6, image: 2.9, video: 189}
📝 Background: Text mode - Energy: 0.1092Wh (182 tokens)
📋 Background: Final estimate: {energyWh: 0.1092, waterMl: 0.74, carbonG: 0.0382, model: "GPT-4o", mode: "text"}
```

## 4. **Common Issues & Solutions**

### **❌ "Unknown host" Message:**
```
⚠️ Unknown host: example.com - No specific model detection configured
```
**Solution:** Make sure you're on a supported AI platform

### **❌ "No model found via selectors":**
```
🔍 ChatGPT: Checking selector "[data-testid="model-switcher-button"]": not found
🔍 ChatGPT: No model found via selectors, trying regex...
```
**Solution:** The website may have changed its DOM structure

### **❌ "No model found via regex":**
```
❌ ChatGPT: No model found via regex
📝 ChatGPT: Setting model to: Unknown
```
**Solution:** The model name may not be visible in the page text

## 5. **Testing Steps**

### **Test 1: Check Platform Detection**
1. Visit ChatGPT, Claude, or Gemini
2. Open Console
3. Look for: `🌐 AI Impact Estimator: Loaded on [hostname]`
4. Should see: `🚀 Initializing [Platform] detection...`

### **Test 2: Check Model Detection**
1. On the AI website, trigger model detection by refreshing
2. Look for: `🔍 [Platform]: Starting model detection...`
3. Check each selector attempt
4. Verify final model setting: `📝 [Platform]: Setting model to: [model]`

### **Test 3: Check Interaction Processing**
1. Have a conversation with the AI
2. Look for: `💬 Processing AI interaction...`
3. Check if message is sent: `📤 Sending message to background script...`
4. Verify success: `✅ Message sent successfully`

### **Test 4: Check Background Processing**
1. Open background script console
2. Look for: `🔄 Background: Received estimate request`
3. Check model matching: `✅ Background: Found case-insensitive match`
4. Verify calculation: `📋 Background: Final estimate`

## 6. **Model Detection Debugging**

### **If Model Shows as "Unknown":**

1. **Check Console Logs:**
   - What selectors were tried?
   - What text was found?
   - Did regex matching work?

2. **Manual DOM Inspection:**
   ```javascript
   // Run in browser console on AI website
   console.log('Model selectors found:');
   ['[data-testid="model-switcher-button"]', '.model-indicator', '[class*="model"]'].forEach(sel => {
     const el = document.querySelector(sel);
     console.log(sel + ':', el?.textContent?.trim() || 'not found');
   });
   ```

3. **Check Page Text:**
   ```javascript
   // Search for model names in page text
   const text = document.body.innerText;
   const models = text.match(/(GPT-4o|Claude|Gemini|Grok)/gi);
   console.log('Found models in text:', models);
   ```

## 7. **Report Issues**

When reporting issues, please include:

1. **Platform:** Which AI website?
2. **Browser Console Logs:** Copy the debug messages
3. **Expected vs Actual:** What model should be detected?
4. **DOM Structure:** Use browser inspector to check model UI elements

## 8. **Advanced Debugging**

### **Test Model Storage:**
```javascript
// Check what model is stored
console.log('Stored model:', localStorage.getItem('ai_model_detector_current_model'));
```

### **Test Background Script Connection:**
```javascript
// Test message sending
chrome.runtime.sendMessage({action: 'test'}, response => {
  console.log('Background response:', response);
});
```

### **Check Extension Storage:**
```javascript
// View stored estimates
chrome.storage.local.get(null, data => {
  console.log('Extension storage:', data);
});
```

---

## 🎯 **Next Steps:**

1. **Install the updated extension**
2. **Test on different AI platforms**
3. **Check console logs for each platform**
4. **Report what you find!**

The debug logs will show you exactly what's happening with model detection! 🚀
