/**
 * Story Lab Outline Generation Engine
 * Generates structured outlines and scripts from loglines
 */

class OutlineEngine {
  constructor() {
    this.storyTemplates = this.initializeTemplates();
    this.characterTypes = this.initializeCharacterTypes();
    this.plotDevices = this.initializePlotDevices();
  }

  /**
   * Initialize story structure templates
   */
  initializeTemplates() {
    return {
      'threeAct': {
        name: 'Three Act Structure',
        scenes: [
          { type: 'setup', title: 'Setup & Introduction', description: 'Introduce the world and main character' },
          { type: 'inciting', title: 'Inciting Incident', description: 'The event that starts the adventure' },
          { type: 'rising', title: 'Rising Action', description: 'Challenges and obstacles arise' },
          { type: 'climax', title: 'Climax', description: 'The main confrontation or turning point' },
          { type: 'resolution', title: 'Resolution', description: 'Conclusion and new normal' }
        ]
      },
      'heroJourney': {
        name: 'Hero\'s Journey',
        scenes: [
          { type: 'ordinary', title: 'Ordinary World', description: 'Character in their normal environment' },
          { type: 'call', title: 'Call to Adventure', description: 'The quest begins' },
          { type: 'trials', title: 'Trials & Tribulations', description: 'Facing challenges and learning' },
          { type: 'revelation', title: 'Revelation', description: 'Character discovers their true power' },
          { type: 'return', title: 'Return Transformed', description: 'Character returns changed' }
        ]
      },
      'simple': {
        name: 'Simple Story',
        scenes: [
          { type: 'beginning', title: 'Beginning', description: 'How it all starts' },
          { type: 'middle', title: 'Middle', description: 'What happens next' },
          { type: 'end', title: 'End', description: 'How it concludes' }
        ]
      }
    };
  }

  /**
   * Initialize character type patterns
   */
  initializeCharacterTypes() {
    return {
      animal: ['cat', 'dog', 'rabbit', 'fox', 'bear', 'bird', 'dragon', 'unicorn', 'raccoon', 'elephant'],
      person: ['detective', 'teacher', 'chef', 'artist', 'scientist', 'musician', 'farmer', 'inventor', 'explorer'],
      fantasy: ['wizard', 'knight', 'fairy', 'elf', 'dwarf', 'princess', 'monster', 'ghost', 'vampire'],
      robot: ['robot', 'android', 'AI', 'cyborg', 'machine', 'computer'],
      profession: ['baker', 'librarian', 'doctor', 'pilot', 'sailor', 'gardener', 'photographer']
    };
  }

  /**
   * Initialize plot device patterns
   */
  initializePlotDevices() {
    return {
      goal: ['opens', 'starts', 'builds', 'creates', 'discovers', 'finds', 'learns', 'teaches', 'saves', 'helps'],
      place: ['bakery', 'school', 'library', 'garden', 'shop', 'restaurant', 'laboratory', 'studio', 'house'],
      setting: ['space', 'underwater', 'forest', 'city', 'village', 'castle', 'mountain', 'desert', 'future'],
      conflict: ['mystery', 'competition', 'adventure', 'rescue', 'discovery', 'friendship', 'challenge']
    };
  }

  /**
   * Generate outline from logline
   */
  generateOutline(logline) {
    if (!logline || logline.trim().length === 0) {
      return this.generateEmptyOutline();
    }

    const analysis = this.analyzeLogline(logline);
    const template = this.selectTemplate(analysis);
    const scenes = this.generateScenes(logline, template, analysis);

    return {
      logline: logline,
      template: template.name,
      analysis: analysis,
      scenes: scenes,
      generatedAt: new Date().toISOString()
    };
  }

  /**
   * Generate empty outline for new projects
   */
  generateEmptyOutline() {
    return {
      logline: '',
      template: 'Simple Story',
      scenes: this.storyTemplates.simple.scenes.map((scene, index) => ({
        id: `scene_${index + 1}`,
        title: scene.title,
        description: scene.description,
        content: '',
        visualPrompt: '',
        editable: true
      })),
      generatedAt: new Date().toISOString()
    };
  }

  /**
   * Analyze logline to extract story elements
   */
  analyzeLogline(logline) {
    const lower = logline.toLowerCase();
    const words = lower.split(/\s+/);
    
    const analysis = {
      character: this.extractCharacter(lower, words),
      action: this.extractAction(lower, words),
      setting: this.extractSetting(lower, words),
      genre: this.determineGenre(lower, words),
      complexity: this.determineComplexity(logline),
      keywords: words.filter(word => word.length > 3)
    };

    return analysis;
  }

  /**
   * Extract main character from logline
   */
  extractCharacter(lower, words) {
    // Check for character types
    for (const [type, chars] of Object.entries(this.characterTypes)) {
      for (const char of chars) {
        if (lower.includes(char)) {
          return { type, name: char };
        }
      }
    }

    // Default to first noun-like word
    return { type: 'person', name: words.find(word => word.length > 2) || 'character' };
  }

  /**
   * Extract main action/goal
   */
  extractAction(lower, words) {
    for (const action of this.plotDevices.goal) {
      if (lower.includes(action)) {
        return action;
      }
    }
    return 'embarks on an adventure';
  }

  /**
   * Extract setting information
   */
  extractSetting(lower, words) {
    const settings = [];
    
    for (const setting of this.plotDevices.setting) {
      if (lower.includes(setting)) {
        settings.push(setting);
      }
    }
    
    for (const place of this.plotDevices.place) {
      if (lower.includes(place)) {
        settings.push(place);
      }
    }

    return settings.length > 0 ? settings : ['an interesting place'];
  }

  /**
   * Determine story genre
   */
  determineGenre(lower, words) {
    if (lower.includes('space') || lower.includes('robot') || lower.includes('future')) {
      return 'sci-fi';
    }
    if (lower.includes('dragon') || lower.includes('magic') || lower.includes('wizard')) {
      return 'fantasy';
    }
    if (lower.includes('mystery') || lower.includes('detective') || lower.includes('solve')) {
      return 'mystery';
    }
    if (lower.includes('adventure') || lower.includes('journey') || lower.includes('quest')) {
      return 'adventure';
    }
    return 'slice-of-life';
  }

  /**
   * Determine story complexity
   */
  determineComplexity(logline) {
    const length = logline.length;
    const words = logline.split(/\s+/).length;
    
    if (words <= 5 || length <= 30) return 'simple';
    if (words <= 10 || length <= 60) return 'medium';
    return 'complex';
  }

  /**
   * Select appropriate template
   */
  selectTemplate(analysis) {
    if (analysis.complexity === 'simple') {
      return this.storyTemplates.simple;
    }
    if (analysis.genre === 'adventure' || analysis.genre === 'fantasy') {
      return this.storyTemplates.heroJourney;
    }
    return this.storyTemplates.threeAct;
  }

  /**
   * Generate detailed scenes
   */
  generateScenes(logline, template, analysis) {
    return template.scenes.map((sceneTemplate, index) => {
      const scene = this.generateSceneContent(sceneTemplate, analysis, index, template.scenes.length);
      return {
        id: `scene_${index + 1}`,
        title: scene.title,
        description: sceneTemplate.description,
        content: scene.content,
        visualPrompt: scene.visualPrompt,
        editable: true,
        type: sceneTemplate.type
      };
    });
  }

  /**
   * Generate content for individual scene
   */
  generateSceneContent(sceneTemplate, analysis, sceneIndex, totalScenes) {
    const character = analysis.character.name;
    const action = analysis.action;
    const setting = Array.isArray(analysis.setting) ? analysis.setting[0] : analysis.setting;
    
    let title = sceneTemplate.title;
    let content = '';
    let visualPrompt = '';

    switch (sceneTemplate.type) {
      case 'setup':
      case 'ordinary':
      case 'beginning':
        title = `Meet ${character}`;
        content = `We meet ${character} in their everyday world. Everything seems normal, but something is about to change.`;
        visualPrompt = `${character} in ${setting}, looking contemplative, everyday scene`;
        break;

      case 'inciting':
      case 'call':
        title = `The Adventure Begins`;
        content = `${character} discovers an opportunity to ${action}. This is the moment that changes everything.`;
        visualPrompt = `${character} discovering something exciting, moment of realization`;
        break;

      case 'rising':
      case 'trials':
      case 'middle':
        title = `Challenges Arise`;
        content = `${character} faces obstacles while trying to ${action}. Things don't go as planned.`;
        visualPrompt = `${character} facing difficulties, dramatic lighting, tension`;
        break;

      case 'climax':
      case 'revelation':
        title = `The Big Moment`;
        content = `This is the most important moment. ${character} must use everything they've learned.`;
        visualPrompt = `${character} in action, dramatic scene, high energy`;
        break;

      case 'resolution':
      case 'return':
      case 'end':
        title = `New Beginning`;
        content = `${character} succeeds in their goal to ${action}. Life is different now, but in a good way.`;
        visualPrompt = `${character} satisfied and changed, peaceful scene, resolution`;
        break;

      default:
        content = `Scene ${sceneIndex + 1}: ${character} continues their journey.`;
        visualPrompt = `${character} in ${setting}`;
    }

    return { title, content, visualPrompt };
  }

  /**
   * Generate script content for scenes
   */
  generateScriptContent(outline) {
    if (!outline || !outline.scenes) return [];

    return outline.scenes.map(scene => {
      const script = this.generateSceneScript(scene, outline.analysis);
      return {
        sceneId: scene.id,
        title: scene.title,
        script: script
      };
    });
  }

  /**
   * Generate script for individual scene
   */
  generateSceneScript(scene, analysis) {
    const character = analysis.character.name.toUpperCase();
    const setting = Array.isArray(analysis.setting) ? analysis.setting[0] : analysis.setting;

    let script = '';

    // Scene header
    script += `${scene.title.toUpperCase()}\n\n`;
    script += `FADE IN:\n\n`;
    script += `INT/EXT. ${setting.toUpperCase()} - DAY\n\n`;

    // Scene description
    script += `${scene.content}\n\n`;

    // Simple dialogue based on scene type
    switch (scene.type) {
      case 'setup':
      case 'ordinary':
        script += `${character}\n(to themselves)\nAnother ordinary day... or is it?\n\n`;
        break;
      case 'inciting':
      case 'call':
        script += `${character}\n(excited)\nThis could be exactly what I've been looking for!\n\n`;
        break;
      case 'rising':
      case 'trials':
        script += `${character}\n(determined)\nI won't give up. There has to be a way.\n\n`;
        break;
      case 'climax':
      case 'revelation':
        script += `${character}\n(with confidence)\nI know what I have to do.\n\n`;
        break;
      case 'resolution':
      case 'return':
        script += `${character}\n(satisfied)\nIt wasn't easy, but it was worth it.\n\n`;
        break;
    }

    script += `FADE OUT.\n`;

    return script;
  }

  /**
   * Regenerate outline with different template
   */
  regenerateWithTemplate(logline, templateName) {
    const analysis = this.analyzeLogline(logline);
    const template = this.storyTemplates[templateName] || this.storyTemplates.threeAct;
    const scenes = this.generateScenes(logline, template, analysis);

    return {
      logline: logline,
      template: template.name,
      analysis: analysis,
      scenes: scenes,
      generatedAt: new Date().toISOString()
    };
  }

  /**
   * Update scene content
   */
  updateScene(outline, sceneId, updates) {
    const scene = outline.scenes.find(s => s.id === sceneId);
    if (scene) {
      Object.assign(scene, updates);
    }
    return outline;
  }

  /**
   * Add new scene to outline
   */
  addScene(outline, afterSceneId = null) {
    const newSceneIndex = afterSceneId ? 
      outline.scenes.findIndex(s => s.id === afterSceneId) + 1 : 
      outline.scenes.length;

    const newScene = {
      id: `scene_${Date.now()}`,
      title: `New Scene`,
      description: 'Custom scene',
      content: 'What happens in this scene?',
      visualPrompt: 'Description for image generation',
      editable: true,
      type: 'custom'
    };

    outline.scenes.splice(newSceneIndex, 0, newScene);
    return outline;
  }

  /**
   * Remove scene from outline
   */
  removeScene(outline, sceneId) {
    const index = outline.scenes.findIndex(s => s.id === sceneId);
    if (index !== -1 && outline.scenes.length > 1) {
      outline.scenes.splice(index, 1);
    }
    return outline;
  }
}

// Create global outline engine instance
window.outlineEngine = new OutlineEngine();