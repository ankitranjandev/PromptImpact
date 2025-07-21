const bases = {
  // Grok models
  'grok-4': { text: 0.8, image: 1.2, video: 150 },
  'grok-4-heavy': { text: 2.0, image: 3.0, video: 200 },
  'grok-3': { text: 0.6, image: 0.9, video: 120 },
  'grok-3-mini': { text: 0.4, image: 0.7, video: 100 },
  'grok-2': { text: 0.5, image: 0.8, video: 110 },
  'grok-1.5v': { text: 0.7, image: 1.0, video: 130 },
  'grok-1.5': { text: 0.6, image: 0.9, video: 120 },
  'grok-1': { text: 0.5, image: 0.8, video: 110 },
  
  // OpenAI models (case variations)
  'gpt-4o': { text: 0.6, image: 2.9, video: 189 },
  'gpt-4o-mini': { text: 0.4, image: 1.5, video: 120 },
  'gpt-4': { text: 0.8, image: 3.0, video: 200 },
  'gpt-4-1': { text: 0.9, image: 3.2, video: 210 },
  'gpt-3.5': { text: 0.3, image: 1.0, video: 80 },
  'gpt-3': { text: 0.2, image: 0.8, video: 70 },
  // Case variations
  'GPT-4o': { text: 0.6, image: 2.9, video: 189 },
  'GPT-4o-mini': { text: 0.4, image: 1.5, video: 120 },
  'GPT-4': { text: 0.8, image: 3.0, video: 200 },
  'GPT-3.5': { text: 0.3, image: 1.0, video: 80 },
  
  // Claude models (case variations)
  'claude-3 opus': { text: 1.6, image: 5.5, video: 220 },
  'claude-3 sonnet': { text: 1.2, image: 4.0, video: 180 },
  'claude-3 haiku': { text: 0.8, image: 2.5, video: 140 },
  'claude-3.5 sonnet': { text: 1.3, image: 4.2, video: 185 },
  'claude-2': { text: 1.0, image: 3.0, video: 160 },
  'Claude 3 Opus': { text: 1.6, image: 5.5, video: 220 },
  'Claude 3 Sonnet': { text: 1.2, image: 4.0, video: 180 },
  'Claude 3.5 Sonnet': { text: 1.3, image: 4.2, video: 185 },
  'Claude 3 Haiku': { text: 0.8, image: 2.5, video: 140 },
  'Claude 2': { text: 1.0, image: 3.0, video: 160 },
  
  // Gemini models (case variations)
  'gemini 1.5 pro': { text: 1.5, image: 3.0, video: 200 },
  'gemini 2.0 flash': { text: 1.2, image: 2.5, video: 180 },
  'gemini advanced': { text: 1.8, image: 3.5, video: 220 },
  'gemini pro': { text: 1.3, image: 2.8, video: 190 },
  'gemini': { text: 1.0, image: 2.5, video: 180 },
  'Gemini 1.5 Pro': { text: 1.5, image: 3.0, video: 200 },
  'Gemini 2.0 Flash': { text: 1.2, image: 2.5, video: 180 },
  'Gemini Advanced': { text: 1.8, image: 3.5, video: 220 },
  'Gemini Pro': { text: 1.3, image: 2.8, video: 190 },
  'Gemini': { text: 1.0, image: 2.5, video: 180 },
  
  // Llama models
  'llama-3': { text: 1.5, image: 3.5, video: 190 },
  'llama-3.1-70b': { text: 1.8, image: 4.0, video: 200 },
  'llama-3.1-405b': { text: 3.5, image: 10.0, video: 300 },
  'llama-3.2-vision-90b': { text: 1.7, image: 5.5, video: 220 },
  
  // Mistral models (case variations)
  'mistral': { text: 1.2, image: 2.8, video: 170 },
  'mixtral': { text: 1.6, image: 3.2, video: 190 },
  'mistral-7b': { text: 0.8, image: 2.0, video: 140 },
  'mixtral-8x7b': { text: 1.6, image: 3.2, video: 190 },
  'mistral-large': { text: 1.6, image: 3.2, video: 190 },
  'Mistral 7B': { text: 0.8, image: 2.0, video: 140 },
  'Mixtral 8x7B': { text: 1.6, image: 3.2, video: 190 },
  
  // Legacy fallbacks
  'grok-3-beta': { text: 0.6, image: 0.9, video: 120 },
  'claude-3.7-sonnet': { text: 1.4, image: 5.0, video: 200 },
  'gemini-2.5': { text: 1.5, image: 3.0, video: 200 },
  'gemini-1.5': { text: 1.0, image: 2.5, video: 180 },
  
  // Default fallback
  'unknown': { text: 0.5, image: 1.5, video: 100 }
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  try {
    if (request.action === 'estimate') {
      const { model, inputTokens, outputTokens, mode } = request.data;
      
      console.log('🔄 Background: Received estimate request:', {
        model,
        inputTokens,
        outputTokens,
        mode,
        url: sender.tab?.url
      });
      
      // Validate input data
      if (!model || typeof inputTokens !== 'number' || typeof outputTokens !== 'number') {
        console.error('❌ Background: Invalid data received:', request.data);
        sendResponse({ success: false, error: 'Invalid data' });
        return;
      }

      const totalTokens = inputTokens + outputTokens;
      console.log(`📊 Background: Total tokens: ${totalTokens}`);
      
      // Try exact match first, then case-insensitive search
      let modelBases = bases[model];
      if (!modelBases) {
        console.log(`🔍 Background: Exact match not found for "${model}", trying case-insensitive...`);
        const modelKey = Object.keys(bases).find(key => 
          key.toLowerCase() === model.toLowerCase()
        );
        if (modelKey) {
          modelBases = bases[modelKey];
          console.log(`✅ Background: Found case-insensitive match: "${modelKey}"`);
        }
      }
      
      // Final fallback
      if (!modelBases) {
        console.log(`⚠️ Background: No match found for "${model}", using default`);
        modelBases = bases['unknown'];
      }
      
      console.log(`📈 Background: Using model bases:`, modelBases);

      let energyWh;
      if (mode === 'image') {
        energyWh = modelBases.image;
        console.log(`🖼️ Background: Image mode - Energy: ${energyWh}Wh`);
      } else if (mode === 'video') {
        const assumedSeconds = 5;
        energyWh = modelBases.video * assumedSeconds;
        console.log(`🎥 Background: Video mode - Energy: ${energyWh}Wh (${assumedSeconds}s)`);
      } else {
        energyWh = (totalTokens / 1000) * modelBases.text;
        console.log(`📝 Background: Text mode - Energy: ${energyWh}Wh (${totalTokens} tokens)`);
      }

      const waterMl = energyWh * 6.8;
      const carbonG = (energyWh / 1000) * 350;

      const estimate = { 
        energyWh: Number(energyWh.toFixed(4)), 
        waterMl: Number(waterMl.toFixed(2)), 
        carbonG: Number(carbonG.toFixed(4)), 
        model, 
        mode,
        timestamp: Date.now()
      };
      
      console.log('📋 Background: Final estimate:', estimate);

      // Save last estimate
      chrome.storage.local.set({ lastEstimate: estimate }, () => {
        if (chrome.runtime.lastError) {
          console.error('❌ Background: Error saving last estimate:', chrome.runtime.lastError);
        } else {
          console.log('✅ Background: Last estimate saved');
        }
      });

      // Append to history for totals
      chrome.storage.local.get({ estimateHistory: [] }, (data) => {
        if (chrome.runtime.lastError) {
          console.error('❌ Background: Error getting history:', chrome.runtime.lastError);
          sendResponse({ success: false, error: chrome.runtime.lastError.message });
          return;
        }
        
        const history = data.estimateHistory || [];
        history.push(estimate);
        
        // Keep only last 1000 entries to prevent storage bloat
        if (history.length > 1000) {
          history.splice(0, history.length - 1000);
          console.log('🧹 Background: Trimmed history to 1000 entries');
        }
        
        chrome.storage.local.set({ estimateHistory: history }, () => {
          if (chrome.runtime.lastError) {
            console.error('❌ Background: Error saving history:', chrome.runtime.lastError);
            sendResponse({ success: false, error: chrome.runtime.lastError.message });
          } else {
            console.log(`✅ Background: History saved (${history.length} entries)`);
            sendResponse({ success: true, estimate });
          }
        });
      });
    } else if (request.action === 'clearHistory') {
      console.log('🗑️ Background: Clearing history...');
      chrome.storage.local.set({ estimateHistory: [], lastEstimate: null }, () => {
        if (chrome.runtime.lastError) {
          console.error('❌ Background: Error clearing history:', chrome.runtime.lastError);
          sendResponse({ success: false, error: chrome.runtime.lastError.message });
        } else {
          console.log('✅ Background: History cleared');
          sendResponse({ success: true });
        }
      });
    }
  } catch (error) {
    console.error('❌ Background: Error in message handler:', error);
    sendResponse({ success: false, error: error.message });
  }
  
  return true; // Keep message channel open for async response
});

// Console log for debugging
console.log('🚀 AI Impact Estimator background script loaded');
console.log('📊 Available models:', Object.keys(bases).length);