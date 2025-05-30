/**
 * Story Lab Wizard Controller
 * Manages the 4-step wizard flow and interactions
 */

class StoryWizard {
  constructor() {
    this.currentStep = 1;
    this.totalSteps = 4;
    this.project = null;
    this.init();
  }

  /**
   * Initialize wizard
   */
  init() {
    this.bindEvents();
    this.updateUI();
  }

  /**
   * Start wizard with a project
   */
  startWizard(project) {
    this.project = project;
    this.currentStep = project.step || 1;
    this.updateUI();
    this.loadProjectData();
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    // Navigation buttons
    document.getElementById('next-btn').addEventListener('click', () => {
      this.nextStep();
    });

    document.getElementById('back-btn').addEventListener('click', () => {
      this.previousStep();
    });

    document.getElementById('skip-btn').addEventListener('click', () => {
      this.skipStep();
    });

    document.getElementById('wizard-home-btn').addEventListener('click', () => {
      this.exitWizard();
    });

    // Step-specific events
    this.bindStep1Events();
    this.bindStep2Events();
    this.bindStep3Events();
    this.bindStep4Events();

    // Progress step clicks (desktop)
    document.querySelectorAll('.step[data-step]').forEach(step => {
      step.addEventListener('click', () => {
        const stepNum = parseInt(step.dataset.step);
        if (stepNum <= this.getMaxAccessibleStep()) {
          this.goToStep(stepNum);
        }
      });
    });
  }

  /**
   * Step 1: Idea events
   */
  bindStep1Events() {
    const loglineInput = document.getElementById('logline-input');
    const counter = document.getElementById('logline-counter');

    loglineInput.addEventListener('input', () => {
      const length = loglineInput.value.length;
      counter.textContent = length;
      
      // Update project data
      if (this.project) {
        this.project.logline = loglineInput.value;
        this.project.title = window.storyStorage.extractTitleFromLogline(loglineInput.value) || 'Untitled Story';
        this.saveProject();
        
        // Update wizard title
        const wizardTitle = document.getElementById('wizard-title');
        wizardTitle.textContent = this.project.title;
      }

      // Enable/disable next button and generate button
      this.updateNavigationButtons();
      this.updateGenerateButton();
    });

    loglineInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.ctrlKey) {
        this.nextStep();
      }
    });
  }

  /**
   * Step 2: Script events
   */
  bindStep2Events() {
    const scriptToggle = document.getElementById('script-enabled');
    const scriptContainer = document.getElementById('script-container');
    const generateBtn = document.getElementById('generate-outline-btn');
    const regenerateBtn = document.getElementById('regenerate-outline-btn');
    const templateSelector = document.getElementById('template-selector');

    scriptToggle.addEventListener('change', () => {
      const enabled = scriptToggle.checked;
      
      if (enabled) {
        scriptContainer.classList.add('script-enabled');
      } else {
        scriptContainer.classList.remove('script-enabled');
      }

      // Update project
      if (this.project) {
        this.project.script.enabled = enabled;
        this.saveProject();
      }

      // Regenerate script if outline exists
      if (this.project && this.project.outline) {
        this.displayScript();
      }

      this.updateNavigationButtons();
    });

    generateBtn.addEventListener('click', () => {
      this.generateOutline();
    });

    regenerateBtn.addEventListener('click', () => {
      this.regenerateOutline();
    });

    templateSelector.addEventListener('change', () => {
      this.regenerateOutlineWithTemplate();
    });
  }

  /**
   * Step 3: Visual events
   */
  bindStep3Events() {
    const styleLockBtn = document.getElementById('style-lock-btn');
    const loadScenesBtn = document.getElementById('load-scenes-btn');
    const keyManagementBtn = document.getElementById('key-management-btn');
    
    styleLockBtn.addEventListener('click', () => {
      this.toggleGlobalStyle();
    });

    loadScenesBtn.addEventListener('click', () => {
      this.loadScenesForVisuals();
    });

    keyManagementBtn.addEventListener('click', () => {
      window.sessionKeys.showKeyManagement();
    });
  }

  /**
   * Step 4: Cuts events
   */
  bindStep4Events() {
    const previewBtn = document.getElementById('preview-btn');
    const exportBtn = document.getElementById('export-btn');

    previewBtn.addEventListener('click', () => {
      this.previewStory();
    });

    exportBtn.addEventListener('click', () => {
      this.exportStory();
    });
  }

  /**
   * Navigate to specific step
   */
  goToStep(stepNumber) {
    if (stepNumber < 1 || stepNumber > this.totalSteps) return;
    if (stepNumber > this.getMaxAccessibleStep()) return;

    this.currentStep = stepNumber;
    this.updateUI();
    
    if (this.project) {
      this.project.step = this.currentStep;
      this.saveProject();
    }
  }

  /**
   * Go to next step
   */
  nextStep() {
    if (!this.canProceedFromCurrentStep()) {
      this.showValidationMessage();
      return;
    }

    if (this.currentStep < this.totalSteps) {
      this.goToStep(this.currentStep + 1);
    }
  }

  /**
   * Go to previous step
   */
  previousStep() {
    if (this.currentStep > 1) {
      this.goToStep(this.currentStep - 1);
    }
  }

  /**
   * Skip current step
   */
  skipStep() {
    // Mark step as skipped in project data
    if (this.project) {
      if (!this.project.skippedSteps) {
        this.project.skippedSteps = [];
      }
      if (!this.project.skippedSteps.includes(this.currentStep)) {
        this.project.skippedSteps.push(this.currentStep);
      }
    }

    this.nextStep();
  }

  /**
   * Check if user can proceed from current step
   */
  canProceedFromCurrentStep() {
    switch (this.currentStep) {
      case 1:
        const logline = document.getElementById('logline-input').value.trim();
        return logline.length > 0;
      case 2:
        return true; // Always can proceed from script step
      case 3:
        return true; // Always can proceed from visuals step
      case 4:
        return true; // Final step
      default:
        return true;
    }
  }

  /**
   * Update generate button state
   */
  updateGenerateButton() {
    const generateBtn = document.getElementById('generate-outline-btn');
    const logline = document.getElementById('logline-input').value.trim();
    
    if (generateBtn) {
      generateBtn.disabled = logline.length === 0;
    }
  }

  /**
   * Get maximum step user can access
   */
  getMaxAccessibleStep() {
    // For now, allow access to any step they've reached or next step
    return Math.min(this.currentStep + 1, this.totalSteps);
  }

  /**
   * Show validation message
   */
  showValidationMessage() {
    switch (this.currentStep) {
      case 1:
        alert('Please enter your story idea before continuing.');
        document.getElementById('logline-input').focus();
        break;
      default:
        alert('Please complete this step before continuing.');
    }
  }

  /**
   * Update the entire UI based on current step
   */
  updateUI() {
    this.updateProgressBar();
    this.updateProgressSteps();
    this.updateStepVisibility();
    this.updateNavigationButtons();
  }

  /**
   * Update progress bar
   */
  updateProgressBar() {
    const progressFill = document.querySelector('.progress-fill');
    const percentage = (this.currentStep / this.totalSteps) * 100;
    progressFill.style.width = `${percentage}%`;
  }

  /**
   * Update progress steps
   */
  updateProgressSteps() {
    document.querySelectorAll('.step').forEach((step, index) => {
      const stepNumber = index + 1;
      step.classList.remove('active', 'completed');
      
      if (stepNumber === this.currentStep) {
        step.classList.add('active');
      } else if (stepNumber < this.currentStep) {
        step.classList.add('completed');
      }
    });
  }

  /**
   * Update step visibility
   */
  updateStepVisibility() {
    document.querySelectorAll('.wizard-step').forEach((step, index) => {
      const stepNumber = index + 1;
      step.classList.remove('active');
      
      if (stepNumber === this.currentStep) {
        step.classList.add('active');
      }
    });
  }

  /**
   * Update navigation buttons
   */
  updateNavigationButtons() {
    const backBtn = document.getElementById('back-btn');
    const nextBtn = document.getElementById('next-btn');
    const skipBtn = document.getElementById('skip-btn');

    // Back button
    backBtn.disabled = this.currentStep === 1;

    // Next button
    const canProceed = this.canProceedFromCurrentStep();
    nextBtn.disabled = !canProceed;
    
    if (this.currentStep === this.totalSteps) {
      nextBtn.textContent = 'Finish';
      nextBtn.innerHTML = 'Finish <span class="btn-icon">✓</span>';
    } else {
      nextBtn.innerHTML = 'Next <span class="btn-icon">→</span>';
    }

    // Skip button
    const skipAllowed = this.isSkipAllowed();
    skipBtn.style.display = skipAllowed ? 'block' : 'none';
  }

  /**
   * Check if skip is allowed for current step
   */
  isSkipAllowed() {
    // Allow skipping script step (step 2)
    return this.currentStep === 2;
  }

  /**
   * Load project data into wizard forms
   */
  loadProjectData() {
    if (!this.project) return;

    // Update wizard title
    const wizardTitle = document.getElementById('wizard-title');
    wizardTitle.textContent = this.project.title;

    // Step 1: Logline
    const loglineInput = document.getElementById('logline-input');
    if (this.project.logline) {
      loglineInput.value = this.project.logline;
      document.getElementById('logline-counter').textContent = this.project.logline.length;
    }

    // Step 2: Script toggle
    const scriptToggle = document.getElementById('script-enabled');
    scriptToggle.checked = this.project.script.enabled !== false;
    
    const scriptContainer = document.getElementById('script-container');
    if (this.project.script.enabled !== false) {
      scriptContainer.classList.add('script-enabled');
    } else {
      scriptContainer.classList.remove('script-enabled');
    }

    // Load existing outline if present
    if (this.project.outline) {
      this.displayOutline();
      this.displayScript();
      this.updateLoadScenesButton();
    }

    this.updateUI();
    this.updateGenerateButton();
  }

  /**
   * Save current project
   */
  saveProject() {
    if (this.project) {
      window.storyStorage.saveCurrentProject();
    }
  }

  /**
   * Toggle global style lock
   */
  toggleGlobalStyle() {
    const banner = document.getElementById('global-style-banner');
    const btn = document.getElementById('style-lock-btn');
    const text = banner.querySelector('.style-text');

    if (banner.classList.contains('locked')) {
      // Unlock
      banner.classList.remove('locked');
      text.textContent = 'Global Style: Not set';
      btn.textContent = 'Set Style';
    } else {
      // Lock
      banner.classList.add('locked');
      text.textContent = 'Global Style: Locked';
      btn.textContent = 'Change Style';
    }
  }

  /**
   * Preview story (placeholder)
   */
  previewStory() {
    alert('Preview functionality will be implemented next!\n\nThis will show a full-screen preview of your story with hard-cut transitions.');
  }

  /**
   * Export story (placeholder)
   */
  exportStory() {
    if (!this.project) return;
    
    alert(`Export functionality will be implemented next!\n\nThis will create a ZIP bundle containing:\n- scripts/story.txt\n- img/scene01.jpg, scene02.jpg...\n- vid/scene01.mp4, scene02.mp4...\n- storylab_preview.html\n\nProject: "${this.project.title}"`);
  }

  /**
   * Exit wizard and return to home
   */
  exitWizard() {
    if (window.app) {
      window.app.showScreen('home');
      window.app.loadProjects();
    }
  }

  /**
   * Generate outline from logline
   */
  generateOutline() {
    if (!this.project) return;

    const logline = this.project.logline;
    if (!logline || logline.trim().length === 0) {
      alert('Please enter your story idea first!');
      this.goToStep(1);
      return;
    }

    // Show loading state
    const generateBtn = document.getElementById('generate-outline-btn');
    const originalText = generateBtn.innerHTML;
    generateBtn.innerHTML = '<span class="btn-icon">⏳</span> Generating...';
    generateBtn.disabled = true;

    // Generate outline
    setTimeout(() => {
      try {
        const outline = window.outlineEngine.generateOutline(logline);
        this.project.outline = outline;
        this.saveProject();
        
        this.displayOutline();
        this.displayScript();
        
        // Show regenerate controls
        document.getElementById('regenerate-outline-btn').style.display = 'inline-flex';
        document.getElementById('template-selector').style.display = 'inline-block';
        
        // Reset button
        generateBtn.innerHTML = originalText;
        generateBtn.disabled = false;
        
      } catch (error) {
        console.error('Error generating outline:', error);
        alert('Error generating outline. Please try again.');
        generateBtn.innerHTML = originalText;
        generateBtn.disabled = false;
      }
    }, 800); // Simulate generation time
  }

  /**
   * Regenerate outline with current settings
   */
  regenerateOutline() {
    if (!this.project || !this.project.logline) return;
    
    const confirm = window.confirm('This will replace your current outline. Continue?');
    if (!confirm) return;
    
    this.generateOutline();
  }

  /**
   * Regenerate outline with selected template
   */
  regenerateOutlineWithTemplate() {
    if (!this.project || !this.project.logline) return;
    
    const templateSelector = document.getElementById('template-selector');
    const templateName = templateSelector.value;
    
    try {
      const outline = window.outlineEngine.regenerateWithTemplate(this.project.logline, templateName);
      this.project.outline = outline;
      this.saveProject();
      
      this.displayOutline();
      this.displayScript();
    } catch (error) {
      console.error('Error regenerating outline:', error);
      alert('Error regenerating outline. Please try again.');
    }
  }

  /**
   * Display outline in the interface
   */
  displayOutline() {
    const container = document.getElementById('outline-container');
    const outline = this.project.outline;
    
    if (!outline || !outline.scenes) {
      container.innerHTML = '<div class="outline-placeholder"><p>📝 No outline generated yet</p></div>';
      return;
    }

    const scenesHtml = outline.scenes.map((scene, index) => `
      <div class="scene-card" data-scene-id="${scene.id}">
        <div class="scene-header">
          <div class="scene-number">${index + 1}</div>
          <div class="scene-title">${this.escapeHtml(scene.title)}</div>
          <div class="scene-actions">
            <button class="scene-action-btn" onclick="wizard.editScene('${scene.id}')" title="Edit">✏️</button>
            <button class="scene-action-btn" onclick="wizard.deleteScene('${scene.id}')" title="Delete">🗑️</button>
          </div>
        </div>
        <div class="scene-content" id="content-${scene.id}">
          ${this.escapeHtml(scene.content)}
        </div>
        <div class="scene-meta">
          <span class="scene-type">Type: ${scene.type || 'scene'}</span>
          <span class="scene-visual-prompt">${this.escapeHtml(scene.visualPrompt || '')}</span>
        </div>
      </div>
    `).join('');

    container.innerHTML = `
      <div class="outline-info">
        <p><strong>Template:</strong> ${outline.template} | <strong>Scenes:</strong> ${outline.scenes.length}</p>
      </div>
      <div class="outline-scenes">
        ${scenesHtml}
      </div>
      <div class="outline-actions">
        <button class="btn btn-secondary" onclick="wizard.addScene()">
          <span class="btn-icon">+</span> Add Scene
        </button>
      </div>
    `;
  }

  /**
   * Display script content
   */
  displayScript() {
    const container = document.getElementById('script-container');
    const scriptToggle = document.getElementById('script-enabled');
    
    if (!scriptToggle.checked) {
      container.innerHTML = '<div class="script-placeholder"><p>📄 Script mode is disabled</p></div>';
      return;
    }

    const outline = this.project.outline;
    if (!outline || !outline.scenes) {
      container.innerHTML = '<div class="script-placeholder"><p>📄 Generate an outline first to see scripts</p></div>';
      return;
    }

    try {
      const scripts = window.outlineEngine.generateScriptContent(outline);
      
      const scriptsHtml = scripts.map((script, index) => `
        <div class="script-card">
          <div class="script-header">
            <div class="scene-number">${index + 1}</div>
            <div class="script-title">${this.escapeHtml(script.title)}</div>
          </div>
          <div class="script-content">${this.escapeHtml(script.script)}</div>
        </div>
      `).join('');

      container.innerHTML = `
        <div class="script-info">
          <p><strong>Script Format:</strong> Basic screenplay format</p>
        </div>
        <div class="script-scenes">
          ${scriptsHtml}
        </div>
      `;
    } catch (error) {
      console.error('Error generating script:', error);
      container.innerHTML = '<div class="script-placeholder"><p>📄 Error generating script content</p></div>';
    }
  }

  /**
   * Edit scene content
   */
  editScene(sceneId) {
    const contentElement = document.getElementById(`content-${sceneId}`);
    const scene = this.project.outline.scenes.find(s => s.id === sceneId);
    
    if (!scene || !contentElement) return;

    const currentContent = scene.content;
    contentElement.innerHTML = `
      <textarea class="scene-edit-textarea" 
                onblur="wizard.saveSceneEdit('${sceneId}', this.value)"
                onkeydown="if(event.key==='Enter'&&event.ctrlKey) this.blur()"
      >${this.escapeHtml(currentContent)}</textarea>
    `;
    
    const textarea = contentElement.querySelector('textarea');
    textarea.focus();
    textarea.select();
  }

  /**
   * Save scene edit
   */
  saveSceneEdit(sceneId, newContent) {
    const scene = this.project.outline.scenes.find(s => s.id === sceneId);
    if (!scene) return;

    scene.content = newContent.trim();
    this.saveProject();
    this.displayOutline();
  }

  /**
   * Delete scene
   */
  deleteScene(sceneId) {
    if (this.project.outline.scenes.length <= 1) {
      alert('Cannot delete the last scene!');
      return;
    }

    const confirm = window.confirm('Delete this scene?');
    if (!confirm) return;

    this.project.outline = window.outlineEngine.removeScene(this.project.outline, sceneId);
    this.saveProject();
    this.displayOutline();
    this.displayScript();
  }

  /**
   * Add new scene
   */
  addScene() {
    if (this.project.outline.scenes.length >= 5) {
      alert('Maximum 5 scenes allowed in MVP!');
      return;
    }

    this.project.outline = window.outlineEngine.addScene(this.project.outline);
    this.saveProject();
    this.displayOutline();
    this.displayScript();
  }

  /**
   * Update load scenes button state
   */
  updateLoadScenesButton() {
    const loadScenesBtn = document.getElementById('load-scenes-btn');
    
    if (loadScenesBtn) {
      const hasOutline = this.project && this.project.outline && this.project.outline.scenes;
      loadScenesBtn.disabled = !hasOutline;
    }
  }

  /**
   * Load scenes for visual generation
   */
  loadScenesForVisuals() {
    if (!this.project || !this.project.outline || !this.project.outline.scenes) {
      alert('Please generate an outline first!');
      this.goToStep(2);
      return;
    }

    // Initialize visual scenes if not present
    if (!this.project.visualScenes) {
      this.project.visualScenes = this.project.outline.scenes.map((scene, index) => ({
        id: scene.id,
        sceneNumber: index + 1,
        title: scene.title,
        prompt: scene.visualPrompt || scene.content,
        globalStyle: null,
        customStyle: null,
        selectedImage: null,
        generatedImages: [],
        imageUrl: null
      }));
      this.saveProject();
    }

    this.displayVisualScenes();
  }

  /**
   * Display visual scenes interface
   */
  displayVisualScenes() {
    const container = document.getElementById('scenes-container');
    const visualScenes = this.project.visualScenes;
    
    if (!visualScenes || visualScenes.length === 0) {
      container.innerHTML = '<div class="scenes-placeholder"><p>🎬 No scenes loaded for visual generation</p></div>';
      return;
    }

    const scenesHtml = visualScenes.map((scene, index) => this.createVisualSceneCard(scene, index)).join('');

    container.innerHTML = `
      <div class="visual-scenes">
        ${scenesHtml}
      </div>
    `;
  }

  /**
   * Create visual scene card HTML
   */
  createVisualSceneCard(scene, index) {
    const styleStatus = this.getSceneStyleStatus(scene);
    const hasApiKey = window.sessionKeys.hasKey('imageGeneration');
    const keyStatus = window.sessionKeys.getKeyStatus('imageGeneration');

    return `
      <div class="visual-scene-card" data-scene-id="${scene.id}">
        <div class="visual-scene-header">
          <div class="visual-scene-number">${scene.sceneNumber}</div>
          <div class="visual-scene-title">${this.escapeHtml(scene.title)}</div>
          <div class="scene-style-indicator ${styleStatus.class}">
            ${styleStatus.label}
          </div>
        </div>

        <div class="visual-prompt-section">
          <label class="visual-prompt-label">Visual Description</label>
          <div class="visual-prompt-container">
            <textarea 
              class="visual-prompt-input" 
              placeholder="Describe what this scene should look like..."
              onchange="wizard.updateScenePrompt('${scene.id}', this.value)"
            >${this.escapeHtml(scene.prompt || '')}</textarea>
            <div class="prompt-actions">
              <button class="prompt-action-btn" onclick="wizard.enhancePrompt('${scene.id}')" title="Enhance prompt">✨</button>
              <button class="prompt-action-btn" onclick="wizard.resetPrompt('${scene.id}')" title="Reset to original">🔄</button>
            </div>
          </div>
        </div>

        <div class="image-generation-section">
          <div class="generation-controls">
            <button 
              class="generate-image-btn" 
              onclick="wizard.generateImages('${scene.id}')"
              ${!hasApiKey ? 'disabled' : ''}
            >
              <span class="btn-icon">🎨</span>
              ${hasApiKey ? 'Generate Images' : 'API Key Required'}
            </button>
            <button class="url-input-btn" onclick="wizard.showUrlInput('${scene.id}')">
              <span class="btn-icon">🔗</span>
              Paste Image URL
            </button>
            <div class="api-status">
              <span class="status-indicator">${keyStatus.display}</span>
            </div>
          </div>

          <div class="image-options-grid" id="images-${scene.id}">
            ${this.createImageOptions(scene)}
          </div>

          <div class="url-input-section" id="url-section-${scene.id}">
            <label>Paste Image URL:</label>
            <input type="url" class="url-input-field" placeholder="https://example.com/image.jpg" />
            <div class="url-input-actions">
              <button class="btn btn-secondary" onclick="wizard.hideUrlInput('${scene.id}')">Cancel</button>
              <button class="btn btn-primary" onclick="wizard.addImageFromUrl('${scene.id}')">Add Image</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Create image options HTML
   */
  createImageOptions(scene) {
    let optionsHtml = '';

    // Show generated images
    if (scene.generatedImages && scene.generatedImages.length > 0) {
      scene.generatedImages.forEach((image, index) => {
        const isSelected = scene.selectedImage === image.url;
        optionsHtml += `
          <div class="image-option ${isSelected ? 'selected' : ''}" onclick="wizard.selectImage('${scene.id}', '${image.url}')">
            <img src="${image.url}" alt="Generated option ${index + 1}" />
            <div class="image-option-label">Generated ${index + 1}</div>
            ${isSelected ? '<div class="image-option-selected">✓</div>' : ''}
          </div>
        `;
      });
    }

    // Show URL image if present
    if (scene.imageUrl && !scene.generatedImages.some(img => img.url === scene.imageUrl)) {
      const isSelected = scene.selectedImage === scene.imageUrl;
      optionsHtml += `
        <div class="image-option ${isSelected ? 'selected' : ''}" onclick="wizard.selectImage('${scene.id}', '${scene.imageUrl}')">
          <img src="${scene.imageUrl}" alt="Custom image" />
          <div class="image-option-label">Custom Image</div>
          ${isSelected ? '<div class="image-option-selected">✓</div>' : ''}
        </div>
      `;
    }

    // Add empty slots if needed
    const totalImages = (scene.generatedImages?.length || 0) + (scene.imageUrl ? 1 : 0);
    const emptySlots = Math.max(0, 4 - totalImages);
    
    for (let i = 0; i < emptySlots; i++) {
      optionsHtml += `
        <div class="image-option">
          <div class="image-placeholder">📷</div>
          <div class="image-option-label">Empty Slot</div>
        </div>
      `;
    }

    return optionsHtml;
  }

  /**
   * Get scene style status
   */
  getSceneStyleStatus(scene) {
    if (scene.customStyle) {
      return { class: 'override', label: 'Custom Style' };
    }
    if (scene.globalStyle || this.hasGlobalStyle()) {
      return { class: 'global', label: 'Global Style' };
    }
    return { class: '', label: 'No Style' };
  }

  /**
   * Check if global style is set
   */
  hasGlobalStyle() {
    // Check the global style banner state
    const banner = document.getElementById('global-style-banner');
    return banner && banner.classList.contains('locked');
  }

  /**
   * Update scene prompt
   */
  updateScenePrompt(sceneId, newPrompt) {
    const scene = this.project.visualScenes.find(s => s.id === sceneId);
    if (scene) {
      scene.prompt = newPrompt.trim();
      this.saveProject();
    }
  }

  /**
   * Enhance prompt with AI suggestions
   */
  enhancePrompt(sceneId) {
    const scene = this.project.visualScenes.find(s => s.id === sceneId);
    if (!scene) return;

    // Simple prompt enhancement
    const enhancements = [
      'detailed, high quality, cinematic lighting',
      'vibrant colors, professional photography',
      'dramatic composition, depth of field',
      'artistic style, beautiful aesthetic',
      'sharp focus, award-winning photography'
    ];

    const currentPrompt = scene.prompt || '';
    if (!currentPrompt.includes('detailed')) {
      const enhancement = enhancements[Math.floor(Math.random() * enhancements.length)];
      scene.prompt = `${currentPrompt}, ${enhancement}`;
      this.saveProject();
      this.displayVisualScenes();
    }
  }

  /**
   * Reset prompt to original
   */
  resetPrompt(sceneId) {
    const scene = this.project.visualScenes.find(s => s.id === sceneId);
    const originalScene = this.project.outline.scenes.find(s => s.id === sceneId);
    
    if (scene && originalScene) {
      scene.prompt = originalScene.visualPrompt || originalScene.content;
      this.saveProject();
      this.displayVisualScenes();
    }
  }

  /**
   * Generate images for scene
   */
  generateImages(sceneId) {
    const scene = this.project.visualScenes.find(s => s.id === sceneId);
    if (!scene) return;

    if (!scene.prompt || scene.prompt.trim().length === 0) {
      alert('Please enter a visual description first!');
      return;
    }

    // Check if we need API key
    if (!window.sessionKeys.hasKey('imageGeneration')) {
      window.sessionKeys.requestKey('imageGeneration', (keyData) => {
        if (keyData) {
          this.generateImages(sceneId); // Retry after key is set
        }
      });
      return;
    }

    // Show loading state
    const button = document.querySelector(`[onclick="wizard.generateImages('${sceneId}')"]`);
    const originalText = button.innerHTML;
    button.innerHTML = '<span class="btn-icon">⏳</span> Generating...';
    button.disabled = true;

    // Simulate image generation (replace with real API call)
    setTimeout(() => {
      try {
        // Mock generated images (replace with real API results)
        const mockImages = this.generateMockImages(scene.prompt);
        
        if (!scene.generatedImages) {
          scene.generatedImages = [];
        }
        
        // Add new images (limit to 4 total)
        mockImages.forEach(img => {
          if (scene.generatedImages.length < 4) {
            scene.generatedImages.push(img);
          }
        });

        // Auto-select first image if none selected
        if (!scene.selectedImage && scene.generatedImages.length > 0) {
          scene.selectedImage = scene.generatedImages[0].url;
        }

        this.saveProject();
        this.displayVisualScenes();

      } catch (error) {
        console.error('Error generating images:', error);
        alert('Error generating images. Please try again.');
      } finally {
        button.innerHTML = originalText;
        button.disabled = false;
      }
    }, 2000); // Simulate generation time
  }

  /**
   * Generate mock images for testing
   */
  generateMockImages(prompt) {
    const colors = ['e74c3c', '3498db', '2ecc71', 'f39c12', '9b59b6'];
    const sizes = ['400x300', '400x300', '400x300', '400x300'];
    
    return sizes.slice(0, 2).map((size, index) => ({
      url: `https://via.placeholder.com/${size}/${colors[index]}/ffffff?text=Generated+${index + 1}`,
      prompt: prompt,
      generatedAt: new Date().toISOString()
    }));
  }

  /**
   * Show URL input section
   */
  showUrlInput(sceneId) {
    const section = document.getElementById(`url-section-${sceneId}`);
    if (section) {
      section.classList.add('show');
      section.querySelector('.url-input-field').focus();
    }
  }

  /**
   * Hide URL input section
   */
  hideUrlInput(sceneId) {
    const section = document.getElementById(`url-section-${sceneId}`);
    if (section) {
      section.classList.remove('show');
      section.querySelector('.url-input-field').value = '';
    }
  }

  /**
   * Add image from URL
   */
  addImageFromUrl(sceneId) {
    const section = document.getElementById(`url-section-${sceneId}`);
    const urlInput = section.querySelector('.url-input-field');
    const imageUrl = urlInput.value.trim();
    
    if (!imageUrl) {
      alert('Please enter an image URL!');
      return;
    }

    // Basic URL validation
    try {
      new URL(imageUrl);
    } catch {
      alert('Please enter a valid URL!');
      return;
    }

    const scene = this.project.visualScenes.find(s => s.id === sceneId);
    if (scene) {
      scene.imageUrl = imageUrl;
      
      // Auto-select if no image selected
      if (!scene.selectedImage) {
        scene.selectedImage = imageUrl;
      }
      
      this.saveProject();
      this.displayVisualScenes();
      this.hideUrlInput(sceneId);
    }
  }

  /**
   * Select image for scene
   */
  selectImage(sceneId, imageUrl) {
    const scene = this.project.visualScenes.find(s => s.id === sceneId);
    if (scene) {
      scene.selectedImage = imageUrl;
      this.saveProject();
      this.displayVisualScenes();
    }
  }

  /**
   * Escape HTML for display
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Create global wizard instance
window.storyWizard = new StoryWizard();
window.wizard = window.storyWizard; // Global reference for onclick handlers