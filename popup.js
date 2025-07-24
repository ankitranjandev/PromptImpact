function updatePopup() {
  chrome.storage.local.get(['lastEstimate', 'estimateHistory'], (data) => {
    try {
      if (chrome.runtime.lastError) {
        console.error('Storage error:', chrome.runtime.lastError);
        return;
      }

      const last = data.lastEstimate || {};
      
      // Update last estimate with safe fallbacks
      document.getElementById('lastModel').textContent = last.model || 'N/A';
      document.getElementById('lastMode').textContent = last.mode || 'N/A';
      document.getElementById('lastEnergy').textContent = last.energyWh ? last.energyWh.toFixed(2) : '0.00';
      document.getElementById('lastWater').textContent = last.waterMl ? last.waterMl.toFixed(2) : '0.00';
      document.getElementById('lastCarbon').textContent = last.carbonG ? last.carbonG.toFixed(2) : '0.00';

      const history = data.estimateHistory || [];
      
      // Cumulative totals with validation
      let totalEnergy = 0, totalWater = 0, totalCarbon = 0;
      const modelTotals = {};
      
      history.forEach(est => {
        if (est && typeof est.energyWh === 'number' && typeof est.waterMl === 'number' && typeof est.carbonG === 'number') {
          totalEnergy += est.energyWh;
          totalWater += est.waterMl;
          totalCarbon += est.carbonG;
          
          if (est.model) {
            if (!modelTotals[est.model]) {
              modelTotals[est.model] = { energy: 0, water: 0, carbon: 0 };
            }
            modelTotals[est.model].energy += est.energyWh;
            modelTotals[est.model].water += est.waterMl;
            modelTotals[est.model].carbon += est.carbonG;
          }
        }
      });
      
      // Update totals
      document.getElementById('totalEnergy').textContent = totalEnergy.toFixed(2);
      document.getElementById('totalWater').textContent = totalWater.toFixed(2);
      document.getElementById('totalCarbon').textContent = totalCarbon.toFixed(2);
      
      // Model-wise table with better formatting
      const tbody = document.querySelector('#modelTable tbody');
      if (tbody) {
        tbody.innerHTML = ''; // Clear existing rows
        
        if (Object.keys(modelTotals).length === 0) {
          const row = document.createElement('tr');
          row.innerHTML = '<td colspan="4" style="text-align: center; color: #666;">No data available</td>';
          tbody.appendChild(row);
        } else {
          Object.keys(modelTotals).sort().forEach(model => {
            const totals = modelTotals[model];
            const row = document.createElement('tr');
            row.innerHTML = `
              <td title="${model}">${model.length > 15 ? model.substring(0, 15) + '...' : model}</td>
              <td>${totals.energy.toFixed(2)}</td>
              <td>${totals.water.toFixed(2)}</td>
              <td>${totals.carbon.toFixed(2)}</td>
            `;
            tbody.appendChild(row);
          });
        }
      }
      
      // Update last interaction time if available
      if (last.timestamp) {
        const lastTime = new Date(last.timestamp);
        const now = new Date();
        const diffMinutes = Math.round((now - lastTime) / (1000 * 60));
        
        let timeText = '';
        if (diffMinutes < 1) {
          timeText = 'Just now';
        } else if (diffMinutes < 60) {
          timeText = `${diffMinutes}m ago`;
        } else if (diffMinutes < 1440) {
          timeText = `${Math.round(diffMinutes / 60)}h ago`;
        } else {
          timeText = `${Math.round(diffMinutes / 1440)}d ago`;
        }
        
        // Add or update time display
        let timeElement = document.getElementById('lastTime');
        if (!timeElement) {
          timeElement = document.createElement('p');
          timeElement.id = 'lastTime';
          timeElement.style.color = '#666';
          timeElement.style.fontSize = '0.9em';
          const section = document.querySelector('.section');
          if (section) {
            const h2 = section.querySelector('h2');
            if (h2 && h2.nextSibling) {
              section.insertBefore(timeElement, h2.nextSibling);
            } else if (h2) {
              h2.parentNode.appendChild(timeElement);
            }
          }
        }
        timeElement.textContent = `Last updated: ${timeText}`;
      }
      
    } catch (error) {
      console.error('Error updating popup:', error);
    }
  });
}

// Initial update
updatePopup();

// Refresh data every 5 seconds if popup is open
const refreshInterval = setInterval(updatePopup, 5000);

// Clear button with confirmation
document.getElementById('clearBtn').addEventListener('click', () => {
  if (confirm('Are you sure you want to clear all history? This cannot be undone.')) {
    chrome.runtime.sendMessage({ action: 'clearHistory' }, (response) => {
      if (chrome.runtime.lastError) {
        console.error('Error clearing history:', chrome.runtime.lastError);
        alert('Error clearing history. Please try again.');
      } else {
        updatePopup();
      }
    });
  }
});

// Clean up interval when popup closes
window.addEventListener('beforeunload', () => {
  clearInterval(refreshInterval);
});