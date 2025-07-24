// Quick test script to verify extension functionality
// Run this in browser console on any AI website

console.log('🧪 Testing PromptImpact Extension...');

// Test 1: Check if content script loaded
if (typeof detectModel === 'function') {
    console.log('✅ Content script loaded successfully');
} else {
    console.log('❌ Content script not loaded');
}

// Test 2: Check model detection
const currentModel = localStorage.getItem('ai_model_detector_current_model');
console.log('🎯 Current detected model:', currentModel);

// Test 3: Check if background script communication works
chrome.runtime.sendMessage({ 
    action: 'estimate', 
    data: { 
        model: currentModel || 'test-model', 
        inputTokens: 10, 
        outputTokens: 20, 
        mode: 'text' 
    }
}, (response) => {
    if (response && response.success) {
        console.log('✅ Background communication working:', response);
    } else {
        console.log('❌ Background communication failed:', response);
    }
});

// Test 4: Check storage access
chrome.storage.local.get(['lastEstimate'], (data) => {
    console.log('💾 Storage data:', data);
});

console.log('🧪 Test complete - check results above');