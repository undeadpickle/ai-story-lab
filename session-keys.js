/**
 * Story Lab Session Key Management
 * Handles API keys for image and video generation (memory-only)
 */

class SessionKeyManager {
  constructor() {
    this.keys = {
      imageGeneration: null,
      videoGeneration: null
    };
    this.supportedProviders = {
      imageGeneration: [
        { id: 'openai-dalle', name: 'OpenAI DALL-E', placeholder: 'sk-...' },
        { id: 'stability-ai', name: 'Stability AI', placeholder: 'sk-...' },
        { id: 'midjourney', name: 'Midjourney (via API)', placeholder: 'mj-...' },
        { id: 'replicate', name: 'Replicate', placeholder: 'r8_...' },
        { id: 'custom', name: 'Custom API', placeholder: 'your-api-key' }
      ],
      videoGeneration: [
        { id: 'runwayml', name: 'RunwayML', placeholder: 'rwml-...' },
        { id: 'kling', name: 'Kling AI', placeholder: 'kling-...' },
        { id: 'pika', name: 'Pika Labs', placeholder: 'pk-...' },
        { id: 'custom', name: 'Custom API', placeholder: 'your-api-key' }
      ]
    };
    this.init();
  }

  /**
   * Initialize session key manager
   */
  init() {
    this.createKeyDialogs();
  }

  /**
   * Create key input dialogs
   */
  createKeyDialogs() {
    // Create modal backdrop
    const backdrop = document.createElement('div');
    backdrop.id = 'key-modal-backdrop';
    backdrop.className = 'modal-backdrop';
    backdrop.style.display = 'none';
    backdrop.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3 id="modal-title">API Key Required</h3>
          <button class="modal-close" onclick="sessionKeys.closeKeyDialog()">×</button>
        </div>
        <div class="modal-body">
          <div id="key-dialog-content"></div>
        </div>
        <div class="modal-footer">
          <button id="modal-cancel" class="btn btn-secondary" onclick="sessionKeys.closeKeyDialog()">Cancel</button>
          <button id="modal-save" class="btn btn-primary" onclick="sessionKeys.saveKey()">Save Key</button>
        </div>
      </div>
    `;
    document.body.appendChild(backdrop);
  }

  /**
   * Request API key for specific service
   */
  requestKey(serviceType, callback) {
    const providers = this.supportedProviders[serviceType];
    if (!providers) {
      console.error('Unknown service type:', serviceType);
      return;
    }

    this.currentRequest = { serviceType, callback };
    
    const serviceName = serviceType === 'imageGeneration' ? 'Image Generation' : 'Video Generation';
    document.getElementById('modal-title').textContent = `${serviceName} API Key`;
    
    const providerOptions = providers.map(provider => 
      `<option value="${provider.id}" data-placeholder="${provider.placeholder}">${provider.name}</option>`
    ).join('');

    document.getElementById('key-dialog-content').innerHTML = `
      <div class="key-input-form">
        <div class="form-group">
          <label for="provider-select">Choose Provider:</label>
          <select id="provider-select" onchange="sessionKeys.updateKeyPlaceholder()">
            ${providerOptions}
          </select>
        </div>
        
        <div class="form-group">
          <label for="api-key-input">API Key:</label>
          <input type="password" id="api-key-input" placeholder="${providers[0].placeholder}" />
          <button type="button" class="password-toggle" onclick="sessionKeys.togglePasswordVisibility()">👁️</button>
        </div>
        
        <div class="key-info">
          <p><strong>Privacy:</strong> Keys are stored only in memory for this session.</p>
          <p><strong>Security:</strong> Keys are cleared when you close the browser tab.</p>
          <p><strong>Alternative:</strong> You can paste image URLs directly instead.</p>
        </div>
        
        <div class="provider-info" id="provider-info">
          <p>Get your API key from the provider's website.</p>
        </div>
      </div>
    `;

    this.updateProviderInfo();
    this.showKeyDialog();
  }

  /**
   * Update key placeholder based on selected provider
   */
  updateKeyPlaceholder() {
    const select = document.getElementById('provider-select');
    const input = document.getElementById('api-key-input');
    const selectedOption = select.options[select.selectedIndex];
    
    input.placeholder = selectedOption.dataset.placeholder;
    this.updateProviderInfo();
  }

  /**
   * Update provider information
   */
  updateProviderInfo() {
    const select = document.getElementById('provider-select');
    const providerId = select.value;
    const infoDiv = document.getElementById('provider-info');
    
    const providerInfo = {
      'openai-dalle': 'Get your API key from OpenAI Platform (platform.openai.com). DALL-E 3 provides high-quality image generation.',
      'stability-ai': 'Get your API key from Stability AI (stability.ai). Known for Stable Diffusion models.',
      'midjourney': 'Midjourney requires a third-party API service. Check community resources for API access.',
      'replicate': 'Get your API key from Replicate (replicate.com). Access to various AI models including image generation.',
      'runwayml': 'Get your API key from RunwayML (runwayml.com). Specialized in video generation and editing.',
      'kling': 'Kling AI provides video generation services. Check their website for API access.',
      'pika': 'Pika Labs offers video generation. Check their platform for API availability.',
      'custom': 'Enter your custom API endpoint and key. Make sure it\'s compatible with the expected format.'
    };

    infoDiv.innerHTML = `<p>${providerInfo[providerId] || 'Select a provider to see more information.'}</p>`;
  }

  /**
   * Toggle password visibility
   */
  togglePasswordVisibility() {
    const input = document.getElementById('api-key-input');
    const button = document.querySelector('.password-toggle');
    
    if (input.type === 'password') {
      input.type = 'text';
      button.textContent = '🙈';
    } else {
      input.type = 'password';
      button.textContent = '👁️';
    }
  }

  /**
   * Show key dialog
   */
  showKeyDialog() {
    document.getElementById('key-modal-backdrop').style.display = 'flex';
    document.getElementById('api-key-input').focus();
  }

  /**
   * Close key dialog
   */
  closeKeyDialog() {
    document.getElementById('key-modal-backdrop').style.display = 'none';
    if (this.currentRequest && this.currentRequest.callback) {
      this.currentRequest.callback(null); // Cancelled
    }
    this.currentRequest = null;
  }

  /**
   * Save API key
   */
  saveKey() {
    const provider = document.getElementById('provider-select').value;
    const key = document.getElementById('api-key-input').value.trim();
    
    if (!key) {
      alert('Please enter an API key.');
      return;
    }

    // Store key in memory
    this.keys[this.currentRequest.serviceType] = {
      provider: provider,
      key: key,
      timestamp: Date.now()
    };

    // Call callback with success
    if (this.currentRequest.callback) {
      this.currentRequest.callback({
        provider: provider,
        key: key
      });
    }

    this.closeKeyDialog();
    this.showKeySuccessToast(this.currentRequest.serviceType);
  }

  /**
   * Show success toast
   */
  showKeySuccessToast(serviceType) {
    const serviceName = serviceType === 'imageGeneration' ? 'Image Generation' : 'Video Generation';
    const toast = document.createElement('div');
    toast.className = 'toast show';
    toast.textContent = `${serviceName} API key saved for this session`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 2000);
  }

  /**
   * Get stored key for service
   */
  getKey(serviceType) {
    return this.keys[serviceType];
  }

  /**
   * Check if key exists for service
   */
  hasKey(serviceType) {
    return this.keys[serviceType] !== null;
  }

  /**
   * Clear key for service
   */
  clearKey(serviceType) {
    this.keys[serviceType] = null;
  }

  /**
   * Clear all keys
   */
  clearAllKeys() {
    this.keys = {
      imageGeneration: null,
      videoGeneration: null
    };
  }

  /**
   * Get key status for UI display
   */
  getKeyStatus(serviceType) {
    const key = this.keys[serviceType];
    if (!key) return { status: 'none', display: '🔒 No API key' };
    
    const provider = this.supportedProviders[serviceType].find(p => p.id === key.provider);
    return {
      status: 'active',
      display: `🟢 ${provider ? provider.name : 'API'} connected`,
      provider: key.provider
    };
  }

  /**
   * Show key management panel
   */
  showKeyManagement() {
    const imageStatus = this.getKeyStatus('imageGeneration');
    const videoStatus = this.getKeyStatus('videoGeneration');
    
    const content = `
      <div class="key-management-panel">
        <h3>🔐 Session API Keys</h3>
        <div class="key-status-grid">
          <div class="key-status-item">
            <div class="status-header">
              <span class="status-label">Image Generation</span>
              <span class="status-indicator">${imageStatus.display}</span>
            </div>
            <div class="status-actions">
              <button class="btn btn-secondary" onclick="sessionKeys.requestKey('imageGeneration', ()=>{})">
                ${imageStatus.status === 'none' ? 'Add Key' : 'Update Key'}
              </button>
              ${imageStatus.status === 'active' ? '<button class="btn btn-secondary" onclick="sessionKeys.clearKey(\'imageGeneration\')">Remove</button>' : ''}
            </div>
          </div>
          
          <div class="key-status-item">
            <div class="status-header">
              <span class="status-label">Video Generation</span>
              <span class="status-indicator">${videoStatus.display}</span>
            </div>
            <div class="status-actions">
              <button class="btn btn-secondary" onclick="sessionKeys.requestKey('videoGeneration', ()=>{})">
                ${videoStatus.status === 'none' ? 'Add Key' : 'Update Key'}
              </button>
              ${videoStatus.status === 'active' ? '<button class="btn btn-secondary" onclick="sessionKeys.clearKey(\'videoGeneration\')">Remove</button>' : ''}
            </div>
          </div>
        </div>
        
        <div class="key-info">
          <p><strong>Session Only:</strong> Keys are stored in memory and cleared when you close the browser.</p>
          <p><strong>Privacy:</strong> Keys never leave your device or get stored permanently.</p>
        </div>
      </div>
    `;
    
    alert('Key management panel would open here:\n\n' + content.replace(/<[^>]*>/g, ''));
  }
}

// Create global session key manager
window.sessionKeys = new SessionKeyManager();