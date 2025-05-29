class ProgressBar {
    constructor(container, options = {}) {
        this.defaults = {
            size: 170,
            strokeWidth: 10,
            bgColor: '#f0f0f0',
            progressColor: 'blue',
            value: 0,
            animated: false,
            hidden: false
        };

        this.config = {...this.defaults, ...options};
        this.container = container;

        this.init();
    }

    init() {
        this.container.innerHTML = `
            <div class="container">
                <div id="progress-container" ${this.config.hidden ? 'style="display:none"' : ''}>
                    <svg width="${this.config.size}"
                        height="${this.config.size}"
                        viewBox="0 0 ${this.config.size} ${this.config.size}">
                        <circle class="progress-bg"
                                cx="${this.config.size/2}"
                                cy="${this.config.size/2}"
                                r="${this.config.size/2 - this.config.strokeWidth}" />
                        <circle class="progress-bar"
                                cx="${this.config.size/2}"
                                cy="${this.config.size/2}"
                                r="${this.config.size/2 - this.config.strokeWidth}"
                                id="progress" />
                    </svg>
                </div>
                <div class="settings-container">
                    <div class="input-container">
                        <input type="number"
                               class="percent"
                               id="percent"
                               value="${this.config.value}"
                               name="percent"
                               min="0"
                               max="100" />
                        <label for="percent">Value</label>
                    </div>
                <div class="switch-container">
                    <label class="switch">
                        <input type="checkbox" 
                               id="animate-toggle" 
                               ${this.config.animated ? 'checked' : ''} />
                        <span class="slider"></span>
                    </label>
                    <span>Animate</span>
                </div>
                <div class="switch-container">
                    <label class="switch">
                        <input type="checkbox" 
                               id="hide-toggle" 
                               ${this.config.hidden ? 'checked' : ''} />
                        <span class="slider"></span>
                    </label>
                    <span class="switch-label">Hide</span>
                </div>
            </div>
        </div>
        `;

        const circle = document.getElementById("progress");
        const input = document.getElementById("percent");
        const animateToggle = document.getElementById("animate-toggle");
        const hideToggle = document.getElementById("hide-toggle");
        const progressContainer = document.getElementById("progress-container");
        const radius = circle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;

    }
}