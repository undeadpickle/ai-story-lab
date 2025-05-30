/**
 * Local Storage Core for Story Lab
 * Handles project CRUD operations and data persistence
 */

class StoryStorage {
  constructor() {
    this.STORAGE_KEY = 'storylab_projects';
    this.AUTOSAVE_INTERVAL = 10000; // 10 seconds
    this.currentProject = null;
    this.autosaveTimer = null;
  }

  /**
   * Project data model schema
   */
  createProjectSchema(logline = '') {
    return {
      id: this.generateId(),
      title: this.extractTitleFromLogline(logline) || 'Untitled Story',
      logline: logline,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      step: 1, // Current wizard step (1-4)
      outline: [],
      script: {
        enabled: true,
        scenes: []
      },
      scenes: [], // Visual scenes with prompts, images, videos
      cuts: {
        order: [],
        durations: {}
      },
      status: 'draft' // draft, completed
    };
  }

  /**
   * Generate unique project ID
   */
  generateId() {
    return 'story_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Extract a title from logline (first few words)
   */
  extractTitleFromLogline(logline) {
    if (!logline) return null;
    const words = logline.trim().split(' ').slice(0, 4);
    return words.join(' ').replace(/[.,!?]$/, '');
  }

  /**
   * Get all projects from localStorage
   */
  getAllProjects() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading projects:', error);
      return [];
    }
  }

  /**
   * Save all projects to localStorage
   */
  saveAllProjects(projects) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(projects));
      return true;
    } catch (error) {
      console.error('Error saving projects:', error);
      this.handleStorageError(error);
      return false;
    }
  }

  /**
   * Create a new project
   */
  createProject(logline = '') {
    const project = this.createProjectSchema(logline);
    const projects = this.getAllProjects();
    projects.unshift(project); // Add to beginning of list
    
    if (this.saveAllProjects(projects)) {
      this.currentProject = project;
      this.startAutosave();
      return project;
    }
    return null;
  }

  /**
   * Load a specific project by ID
   */
  loadProject(projectId) {
    const projects = this.getAllProjects();
    const project = projects.find(p => p.id === projectId);
    
    if (project) {
      this.currentProject = project;
      this.startAutosave();
      return project;
    }
    return null;
  }

  /**
   * Save current project
   */
  saveCurrentProject() {
    if (!this.currentProject) return false;
    
    const projects = this.getAllProjects();
    const index = projects.findIndex(p => p.id === this.currentProject.id);
    
    if (index !== -1) {
      this.currentProject.updatedAt = new Date().toISOString();
      projects[index] = this.currentProject;
      return this.saveAllProjects(projects);
    }
    return false;
  }

  /**
   * Delete a project
   */
  deleteProject(projectId) {
    const projects = this.getAllProjects();
    const filtered = projects.filter(p => p.id !== projectId);
    
    if (this.currentProject && this.currentProject.id === projectId) {
      this.currentProject = null;
      this.stopAutosave();
    }
    
    return this.saveAllProjects(filtered);
  }

  /**
   * Update current project data
   */
  updateCurrentProject(updates) {
    if (!this.currentProject) return false;
    
    Object.assign(this.currentProject, updates);
    this.currentProject.updatedAt = new Date().toISOString();
    return this.saveCurrentProject();
  }

  /**
   * Start autosave timer
   */
  startAutosave() {
    this.stopAutosave(); // Clear any existing timer
    
    this.autosaveTimer = setInterval(() => {
      if (this.currentProject) {
        this.saveCurrentProject();
        this.showAutosaveToast();
      }
    }, this.AUTOSAVE_INTERVAL);
  }

  /**
   * Stop autosave timer
   */
  stopAutosave() {
    if (this.autosaveTimer) {
      clearInterval(this.autosaveTimer);
      this.autosaveTimer = null;
    }
  }

  /**
   * Show autosave notification
   */
  showAutosaveToast() {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = 'Saved locally';
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 1500);
  }

  /**
   * Handle storage errors (quota exceeded, etc.)
   */
  handleStorageError(error) {
    if (error.name === 'QuotaExceededError') {
      alert('Storage is full. Please delete old stories to continue.');
    } else {
      console.error('Storage error:', error);
    }
  }

  /**
   * Get storage usage info
   */
  getStorageInfo() {
    const projects = this.getAllProjects();
    const totalSize = new Blob([JSON.stringify(projects)]).size;
    
    return {
      projectCount: projects.length,
      totalSize: totalSize,
      totalSizeFormatted: this.formatBytes(totalSize)
    };
  }

  /**
   * Format bytes for display
   */
  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Clear all projects (for testing)
   */
  clearAllProjects() {
    this.currentProject = null;
    this.stopAutosave();
    localStorage.removeItem(this.STORAGE_KEY);
    return true;
  }

  /**
   * Export project data as JSON
   */
  exportProject(projectId) {
    const project = projectId ? 
      this.getAllProjects().find(p => p.id === projectId) : 
      this.currentProject;
      
    if (project) {
      return JSON.stringify(project, null, 2);
    }
    return null;
  }
}

// Create global storage instance
window.storyStorage = new StoryStorage();