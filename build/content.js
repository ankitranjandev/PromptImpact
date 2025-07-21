// ==========================
// PER-SITE MODEL DETECTION
// ==========================

function detectModelForChatGPT() {
    console.log('🔍 ChatGPT: Starting model detection...');
    let model = null;
    const selectors = [
        '[data-testid="model-switcher-button"]',
        'button[aria-haspopup="listbox"] > div',
        'nav[aria-label="Chat history"] [data-testid]',
        '.model-switcher',
        '[class*="model"]',
        // Additional selectors for chatgpt.com
        '[data-testid*="model"]',
        'button[data-testid*="model"] span',
        '.flex.items-center [data-testid*="model"]',
        // Model dropdown selectors
        'select[data-testid="model-selector"]',
        '[role="combobox"] span',
        '.model-selector-button',
        // Header selectors
        'header [class*="model"]',
        'nav [class*="model"]'
    ];
    
    for (const selector of selectors) {
        const el = document.querySelector(selector);
        console.log(`🔍 ChatGPT: Checking selector "${selector}":`, el?.textContent?.trim() || 'not found');
        if (el && el.textContent) {
            model = el.textContent.trim();
            console.log(`✅ ChatGPT: Found model via selector "${selector}": ${model}`);
            break;
        }
    }
    
    if (!model) {
        console.log('🔍 ChatGPT: No model found via selectors, trying regex...');
        const bodyText = document.body.innerText;
        console.log('🔍 ChatGPT: Body text sample:', bodyText.substring(0, 500));
        const match = bodyText.match(/GPT-4o-mini|GPT-4o|GPT-4-turbo|GPT-4|GPT-3\.5-turbo|GPT-3\.5|GPT-3/i);
        if (match) {
            model = match[0];
            console.log(`✅ ChatGPT: Found model via regex: ${model}`);
        } else {
            console.log('❌ ChatGPT: No model found via regex');
        }
    }
    
    const finalModel = model || "Unknown";
    console.log(`📝 ChatGPT: Setting model to: ${finalModel}`);
    window.localStorage.setItem('ai_model_detector_current_model', finalModel);
}
function observeModelForChatGPT() {
    detectModelForChatGPT();
    const observer = new MutationObserver(() => detectModelForChatGPT());
    observer.observe(document.body, { childList: true, subtree: true });
}

function detectModelForClaude() {
  console.log('🔍 Claude: Starting model detection...');
  let model = null;
  const selectors = [
    '.model-indicator',
    '[class*="model"]',
    '[data-testid*="model"]',
    '.model-selector',
    '.header [class*="model"]'
  ];
  
  for (const selector of selectors) {
    const el = document.querySelector(selector);
    console.log(`🔍 Claude: Checking selector "${selector}":`, el?.textContent?.trim() || 'not found');
    if (el && el.textContent?.trim()) {
      model = el.textContent.trim();
      console.log(`✅ Claude: Found model via selector "${selector}": ${model}`);
      break;
    }
  }
  
  if (!model) {
    console.log('🔍 Claude: No model found via selectors, trying regex...');
    const bodyText = document.body.innerText;
    console.log('🔍 Claude: Body text sample:', bodyText.substring(0, 500));
    const match = bodyText.match(/Claude\s?3\.5\s?Sonnet|Claude\s?3\s?Opus|Claude\s?3\s?Haiku|Claude\s?3\.\d\s?Sonnet|Claude\s?2/i);
    if (match) {
      model = match[0].trim();
      console.log(`✅ Claude: Found model via regex: ${model}`);
    } else {
      console.log('❌ Claude: No model found via regex');
    }
  }
  
  const finalModel = model || "Unknown";
  console.log(`📝 Claude: Setting model to: ${finalModel}`);
  window.localStorage.setItem('ai_model_detector_current_model', finalModel);
}
function observeModelForClaude() {
  detectModelForClaude();
  const o = new MutationObserver(detectModelForClaude);
  o.observe(document.body, { childList: true, subtree: true });
}

function detectModelForPoe() {
  let model = null;
  const el = document.querySelector('.sidebar [class*="ModelSelector"]');
  if (el && el.textContent?.trim()) {
    model = el.textContent.trim();
  } else {
    const match = document.body.innerText.match(/GPT[-\s]?4(\.1)?|Claude\s?Opus\s?4/i);
    if (match) model = match[0].trim();
  }
  window.localStorage.setItem('ai_model_detector_current_model', model || "Unknown");
}
function observeModelForPoe() {
  detectModelForPoe();
  const o = new MutationObserver(detectModelForPoe);
  o.observe(document.body, { childList: true, subtree: true });
}

function detectModelForGemini() {
  console.log('🔍 Gemini: Starting model detection...');
  let model = null;
  const selectors = [
    '[data-testid="model-chip"]',
    '[class*="modelChip"]',
    '[class*="model"]',
    '.model-selector',
    '.header [class*="model"]'
  ];
  
  for (const selector of selectors) {
    const el = document.querySelector(selector);
    console.log(`🔍 Gemini: Checking selector "${selector}":`, el?.textContent?.trim() || 'not found');
    if (el && el.textContent?.trim()) {
      model = el.textContent.trim();
      console.log(`✅ Gemini: Found model via selector "${selector}": ${model}`);
      break;
    }
  }
  
  if (!model) {
    console.log('🔍 Gemini: No model found via selectors, trying regex...');
    const bodyText = document.body.innerText;
    console.log('🔍 Gemini: Body text sample:', bodyText.substring(0, 500));
    const match = bodyText.match(/Gemini\s?2\.0\s?Flash|Gemini\s?1\.5\s?Pro|Gemini\s?Advanced|Gemini\s?Pro|Gemini/i);
    if (match) {
      model = match[0].trim();
      console.log(`✅ Gemini: Found model via regex: ${model}`);
    } else {
      console.log('❌ Gemini: No model found via regex');
    }
  }
  
  const finalModel = model || "Unknown";
  console.log(`📝 Gemini: Setting model to: ${finalModel}`);
  window.localStorage.setItem('ai_model_detector_current_model', finalModel);
}
function observeModelForGemini() {
  detectModelForGemini();
  const o = new MutationObserver(detectModelForGemini);
  o.observe(document.body, { childList: true, subtree: true });
}

function detectModelForPerplexity() {
  let model = null;
  const el = document.querySelector('button[data-testid="model-selector-button"]') ||
             document.querySelector('[class*="ModelSelector"]');
  if (el && el.textContent?.trim()) {
    model = el.textContent.trim();
  } else {
    const match = document.body.innerText.match(/GPT[-\s]?4|Claude\s?Opus\s?4|Gemini/i);
    if (match) model = match[0].trim();
  }
  window.localStorage.setItem('ai_model_detector_current_model', model || "Unknown");
}
function observeModelForPerplexity() {
  detectModelForPerplexity();
  const o = new MutationObserver(detectModelForPerplexity);
  o.observe(document.body, { childList: true, subtree: true });
}

function detectModelForCopilot() {
  let model = null;
  const el = document.querySelector('[class*="model-badge"]') ||
             document.querySelector('.gpt-model');
  if (el && el.textContent?.trim()) {
    model = el.textContent.trim();
  } else {
    const match = document.body.innerText.match(/GPT[-\s]?4o?|GPT[-\s]?4/i);
    if (match) model = match[0].trim();
  }
  window.localStorage.setItem('ai_model_detector_current_model', model || "Unknown");
}
function observeModelForCopilot() {
  detectModelForCopilot();
  const o = new MutationObserver(detectModelForCopilot);
  o.observe(document.body, { childList: true, subtree: true });
}

function detectModelForMistral() {
  let model = null;
  const el = document.querySelector('.model-dropdown') ||
             document.querySelector('select[data-model]');
  if (el?.value) model = el.value.trim();
  else if (el?.textContent) model = el.textContent.trim();
  else {
    const match = document.body.innerText.match(/Mistral[-\s]?\d+B/i);
    if (match) model = match[0].trim();
  }
  window.localStorage.setItem('ai_model_detector_current_model', model || "Unknown");
}
function observeModelForMistral() {
  detectModelForMistral();
  const o = new MutationObserver(detectModelForMistral);
  o.observe(document.body, { childList: true, subtree: true });
}

function detectModelForGrok() {
  console.log('🔍 Grok: Starting model detection...');
  let model = null;
  const selectors = [
    '[data-model]', '.model-name', '[class*="model"]', 'h1', 'h2', '.header',
    '.model-selector', '[data-testid*="model"]'
  ];
  
  for (const s of selectors) {
    const el = document.querySelector(s);
    if (!el || !el.textContent) {
      console.log(`🔍 Grok: Selector "${s}": not found`);
      continue;
    }
    
    const txt = el.textContent.trim().toLowerCase();
    console.log(`🔍 Grok: Checking selector "${s}": "${txt}"`);
    
    if (/grok\s*4\s*heavy/i.test(txt)) {
      model = 'grok-4-heavy';
      console.log(`✅ Grok: Found grok-4-heavy via selector "${s}"`);
      window.localStorage.setItem('ai_model_detector_current_model', model);
      return;
    }
    if (/grok\s*4/i.test(txt)) {
      model = 'grok-4';
      console.log(`✅ Grok: Found grok-4 via selector "${s}"`);
      window.localStorage.setItem('ai_model_detector_current_model', model);
      return;
    }
    if (/grok\s*3\s*mini/i.test(txt)) {
      model = 'grok-3-mini';
      console.log(`✅ Grok: Found grok-3-mini via selector "${s}"`);
      window.localStorage.setItem('ai_model_detector_current_model', model);
      return;
    }
    if (/grok\s*3/i.test(txt)) {
      model = 'grok-3';
      console.log(`✅ Grok: Found grok-3 via selector "${s}"`);
      window.localStorage.setItem('ai_model_detector_current_model', model);
      return;
    }
    if (/grok\s*2/i.test(txt)) {
      model = 'grok-2';
      console.log(`✅ Grok: Found grok-2 via selector "${s}"`);
      window.localStorage.setItem('ai_model_detector_current_model', model);
      return;
    }
    if (/grok\s*1\.5v/i.test(txt)) {
      model = 'grok-1.5v';
      console.log(`✅ Grok: Found grok-1.5v via selector "${s}"`);
      window.localStorage.setItem('ai_model_detector_current_model', model);
      return;
    }
    if (/grok\s*1\.5/i.test(txt)) {
      model = 'grok-1.5';
      console.log(`✅ Grok: Found grok-1.5 via selector "${s}"`);
      window.localStorage.setItem('ai_model_detector_current_model', model);
      return;
    }
    if (/grok\s*1/i.test(txt)) {
      model = 'grok-1';
      console.log(`✅ Grok: Found grok-1 via selector "${s}"`);
      window.localStorage.setItem('ai_model_detector_current_model', model);
      return;
    }
  }

  // Fallback regex on body
  console.log('🔍 Grok: No model found via selectors, trying body regex...');
  const bodyText = document.body.innerText;
  console.log('🔍 Grok: Body text sample:', bodyText.substring(0, 500));
  const match = bodyText.match(/Grok[-\s]4\s*Heavy|Grok[-\s]4|Grok[-\s]3\s*Mini|Grok[-\s]3|Grok[-\s]2|Grok[-\s]1\.5V|Grok[-\s]1\.5|Grok[-\s]1/i);
  const m = match ? match[0].toLowerCase().replace(/\s+/g,'') : "unknown";
  console.log(`📝 Grok: Setting model via regex to: ${m}`);
  window.localStorage.setItem('ai_model_detector_current_model', m);
}

function observeModelForGrok() {
    detectModelForGrok();
    const observer = new MutationObserver(() => detectModelForGrok());
    observer.observe(document.body, { childList: true, subtree: true });
}

// ==========================
// PLATFORM SWITCH
// ==========================

const host = window.location.hostname;
console.log(`🌐 AI Impact Estimator: Loaded on ${host}`);

if (host === "chat.openai.com" || host === "chatgpt.com" || host.includes("openai.com")) {
    console.log('🚀 Initializing ChatGPT detection...');
    observeModelForChatGPT();
} else if (host === "claude.ai" || host.includes("anthropic.com")) {
    console.log('🚀 Initializing Claude detection...');
    observeModelForClaude();
} else if (host === "poe.com") {
    console.log('🚀 Initializing Poe detection...');
    observeModelForPoe();
} else if (host === "gemini.google.com" || host.includes("bard.google.com")) {
    console.log('🚀 Initializing Gemini detection...');
    observeModelForGemini();
} else if (host === "perplexity.ai") {
    console.log('🚀 Initializing Perplexity detection...');
    observeModelForPerplexity();
} else if (host === "copilot.microsoft.com") {
    console.log('🚀 Initializing Copilot detection...');
    observeModelForCopilot();
} else if (host === "chat.mistral.ai") {
    console.log('🚀 Initializing Mistral detection...');
    observeModelForMistral();
} else if (
    host === "grok.x.ai" ||
    host === "grok.com" ||
    (host.endsWith("x.com") && window.location.pathname.includes("grok"))
) {
    console.log('🚀 Initializing Grok detection...');
    observeModelForGrok();
} else {
    console.log(`⚠️ Unknown host: ${host} - No specific model detection configured`);
}

console.log('AI Impact Estimator content script loaded on:', window.location.hostname);

// ==========================
// DEBOUNCE FUNCTION
// ==========================
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ==========================
// ROBUST TEXT EXTRACTION
// ==========================
function extractText(element) {
  if (!element) return '';
  const clone = element.cloneNode(true);
  const scripts = clone.querySelectorAll('script, style');
  scripts.forEach(script => script.remove());
  return clone.textContent || clone.innerText || '';
}

// ==========================
// IMPROVED TOKEN ESTIMATION
// ==========================
function estimateTokens(text) {
  if (!text || typeof text !== 'string') return 0;
  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  const charCount = text.length;
  const wordBasedTokens = Math.ceil(words.length / 0.75);
  const charBasedTokens = Math.ceil(charCount / 4);
  return Math.max(1, Math.round((wordBasedTokens + charBasedTokens) / 2));
}

// ==========================
// MAIN INTERACTION PROCESSOR
// ==========================
const processInteraction = debounce((responseNode) => {
  try {
    if (!responseNode) return;
    const response = extractText(responseNode);
    if (!response || response.length < 10) return;
    
    console.log('💬 Processing AI interaction...');
    console.log('💬 Response length:', response.length);
    
    let input = '';
    const inputSelectors = [
      'textarea[placeholder*="message" i]',
      'textarea[placeholder*="chat" i]',
      'textarea[data-id="root"]',
      '.prompt-textarea',
      'textarea',
      'input[type="text"]',
      '[contenteditable="true"]'
    ];
    for (const selector of inputSelectors) {
      const inputElement = document.querySelector(selector);
      if (inputElement) {
        input = extractText(inputElement) || inputElement.value || '';
        if (input.length > 0) {
          console.log(`💬 Found input via "${selector}":`, input.substring(0, 100));
          break;
        }
      }
    }

    let mode = 'text';
    const hasImages = responseNode.querySelector('img') || 
                     responseNode.querySelector('[alt*="image" i]') ||
                     responseNode.querySelector('.image') ||
                     response.toLowerCase().includes('image generated') ||
                     response.toLowerCase().includes('generated image');
    const hasVideo = responseNode.querySelector('video') || 
                    responseNode.querySelector('[alt*="video" i]') ||
                    responseNode.querySelector('.video') ||
                    response.toLowerCase().includes('video generated') ||
                    response.toLowerCase().includes('generated video');
    if (hasVideo) {
      mode = 'video';
    } else if (hasImages) {
      mode = 'image';
    }

    const inputTokens = estimateTokens(input);
    const outputTokens = estimateTokens(response);
    const model = detectModel();
    
    console.log('💬 Interaction details:', {
      model,
      mode,
      inputTokens,
      outputTokens,
      hasImages,
      hasVideo
    });

    if (inputTokens > 0 || outputTokens > 0) {
      console.log('📤 Sending message to background script...');
      chrome.runtime.sendMessage({ 
        action: 'estimate', 
        data: { model, inputTokens, outputTokens, mode }
      }, (response) => {
        if (chrome.runtime.lastError) {
          console.error('❌ Error sending message:', chrome.runtime.lastError);
        } else {
          console.log('✅ Message sent successfully:', response);
        }
      });
    } else {
      console.log('⚠️ No tokens to process');
    }
  } catch (error) {
    console.error('❌ Error processing interaction:', error);
  }
}, 1000);

// ==========================
// GLOBAL RESPONSE OBSERVER
// ==========================
const observer = new MutationObserver((mutations) => {
  try {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const isAIResponse = node.matches && (
              node.matches('[data-message-author-role="assistant"]') ||
              node.matches('.message-content') ||
              node.matches('.response') ||
              node.matches('[class*="assistant"]') ||
              node.matches('[class*="ai"]') ||
              node.matches('[class*="bot"]')
            );
            if (isAIResponse || node.textContent?.length > 50) {
              processInteraction(node);
            }
          }
        });
      }
    });
  } catch (error) {
    console.error('Error in mutation observer:', error);
  }
});

if (document.body) {
  observer.observe(document.body, { childList: true, subtree: true });
} else {
  document.addEventListener('DOMContentLoaded', () => {
    observer.observe(document.body, { childList: true, subtree: true });
  });
}

// ==========================
// UNIFIED MODEL DETECTION
// ==========================
function detectModel() {
  const rawModel = window.localStorage.getItem('ai_model_detector_current_model') || 'unknown';
  console.log('🎯 Raw detected model:', rawModel);
  
  // Normalize model names to match the background script database
  let normalizedModel = rawModel.toLowerCase();
  
  // ChatGPT normalizations
  if (normalizedModel.includes('chatgpt 4.1') || normalizedModel.includes('chatgpt 4')) {
    normalizedModel = 'gpt-4';
  } else if (normalizedModel.includes('chatgpt 3.5')) {
    normalizedModel = 'gpt-3.5';
  } else if (normalizedModel.includes('gpt-4o-mini') || normalizedModel.includes('gpt 4o mini')) {
    normalizedModel = 'gpt-4o-mini';
  } else if (normalizedModel.includes('gpt-4o') || normalizedModel.includes('gpt 4o')) {
    normalizedModel = 'gpt-4o';
  } else if (normalizedModel.includes('gpt-4') || normalizedModel.includes('gpt 4')) {
    normalizedModel = 'gpt-4';
  } else if (normalizedModel.includes('gpt-3.5') || normalizedModel.includes('gpt 3.5')) {
    normalizedModel = 'gpt-3.5';
  }
  
  console.log('🎯 Normalized model:', normalizedModel);
  return normalizedModel;
}
