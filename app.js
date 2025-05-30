/**
 * Story Lab Main Application
 * Handles UI interactions and app state management
 */

class StoryLabApp {
  constructor() {
    this.currentScreen = 'home';
    this.init();
  }

  /**
   * Initialize the application
   */
  init() {
    this.bindEvents();
    this.loadProjects();
    this.showScreen('home');
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    // Navigation
    document.getElementById('nav-home').addEventListener('click', () => {
      this.showScreen('home');
      this.loadProjects();
    });

    document.getElementById('nav-wizard').addEventListener('click', () => {
      this.showScreen('wizard');
    });

    document.getElementById('nav-test').addEventListener('click', () => {
      this.showScreen('test');
    });

    // New story button
    document.getElementById('new-story-btn').addEventListener('click', () => {
      this.createNewStory();
    });

    // Test interface buttons
    document.getElementById('test-create').addEventListener('click', () => {
      this.testCreateProject();
    });

    document.getElementById('test-list').addEventListener('click', () => {
      this.testListProjects();
    });

    document.getElementById('test-clear').addEventListener('click', () => {
      this.testClearProjects();
    });
  }

  /**
   * Show specific screen
   */
  showScreen(screenName) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
      screen.classList.remove('active');
    });

    // Show target screen
    document.getElementById(`${screenName}-screen`).classList.add('active');

    // Update navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    document.getElementById(`nav-${screenName}`).classList.add('active');

    this.currentScreen = screenName;
  }

  /**
   * Load and display projects
   */
  loadProjects() {
    const projects = window.storyStorage.getAllProjects();
    const container = document.getElementById('projects-container');
    
    if (projects.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <p>No stories yet. Create your first story to get started!</p>
        </div>
      `;
      return;
    }

    container.innerHTML = projects.map(project => `
      <div class="project-card" onclick="app.loadProject('${project.id}')">
        <h3>${this.escapeHtml(project.title)}</h3>
        <p class="project-logline">${this.escapeHtml(project.logline || 'No description')}</p>
        <div class="project-meta">
          <span class="project-status">${this.getStatusLabel(project.status)}</span>
          <span class="project-date">${this.formatDate(project.updatedAt)}</span>
          <span class="project-scenes">${project.scenes ? project.scenes.length : 0} scenes</span>
        </div>
      </div>
    `).join('');
  }

  /**
   * Create a new story
   */
  createNewStory() {
    const project = window.storyStorage.createProject('');
    if (project) {
      this.openWizard(project);
    } else {
      alert('Error creating project. Please try again.');
    }
  }

  /**
   * Load a specific project
   */
  loadProject(projectId) {
    const project = window.storyStorage.loadProject(projectId);
    if (project) {
      this.openWizard(project);
    } else {
      alert('Error loading project.');
    }
  }

  /**
   * Open wizard with project
   */
  openWizard(project) {
    this.showScreen('wizard');
    if (window.storyWizard) {
      window.storyWizard.startWizard(project);
    }
  }

  /**
   * Get step name for display
   */
  getStepName(step) {
    const steps = {
      1: 'Idea',
      2: 'Script & Outline', 
      3: 'Visuals',
      4: 'Cuts & Export'
    };
    return steps[step] || 'Unknown';
  }

  /**
   * Get status label for display
   */
  getStatusLabel(status) {
    const labels = {
      'draft': 'Draft',
      'completed': 'Complete'
    };
    return labels[status] || 'Draft';
  }

  /**
   * Format date for display
   */
  formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString();
  }

  /**
   * Escape HTML to prevent XSS
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Test interface methods
  testCreateProject() {
    const loglines = [
      "A robot learns to paint watercolors",
      "Time travelers run a coffee shop",
      "A cat detective solves neighborhood mysteries",
      "Dragons start a delivery service"
    ];
    
    const randomLogline = loglines[Math.floor(Math.random() * loglines.length)];
    const project = window.storyStorage.createProject(randomLogline);
    
    if (project) {
      this.testOutput(`✅ Created project: "${project.title}"\nID: ${project.id}\nLogline: ${project.logline}`);
    } else {
      this.testOutput('❌ Failed to create project');
    }
  }

  testListProjects() {
    const projects = window.storyStorage.getAllProjects();
    const storageInfo = window.storyStorage.getStorageInfo();
    
    let output = `📊 Storage Info:\n`;
    output += `Projects: ${storageInfo.projectCount}\n`;
    output += `Total Size: ${storageInfo.totalSizeFormatted}\n\n`;
    
    if (projects.length === 0) {
      output += '📭 No projects found';
    } else {
      output += '📚 Projects:\n\n';
      projects.forEach((project, index) => {
        output += `${index + 1}. "${project.title}"\n`;
        output += `   ID: ${project.id}\n`;
        output += `   Status: ${project.status}\n`;
        output += `   Updated: ${this.formatDate(project.updatedAt)}\n`;
        output += `   Scenes: ${project.scenes ? project.scenes.length : 0}\n\n`;
      });
    }
    
    this.testOutput(output);
  }

  testClearProjects() {
    if (confirm('Clear all projects? This cannot be undone.')) {
      window.storyStorage.clearAllProjects();
      this.testOutput('🗑️ All projects cleared');
      if (this.currentScreen === 'home') {
        this.loadProjects();
      }
    }
  }

  testOutput(message) {
    const output = document.getElementById('test-output');
    const timestamp = new Date().toLocaleTimeString();
    output.textContent = `[${timestamp}]\n${message}\n\n${output.textContent}`;
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.app = new StoryLabApp();
});