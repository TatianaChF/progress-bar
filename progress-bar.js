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

        this.circle = document.getElementById("progress");
        this.input = document.getElementById("percent");
        this.animateToggle = document.getElementById("animate-toggle");
        this.hideToggle = document.getElementById("hide-toggle");
        this.progressContainer = document.getElementById("progress-container");
        this.radius = this.circle.r.baseVal.value;
        this.circumference = 2 * Math.PI * this.radius;

        this.circle.style.strokeDasharray = `${this.circumference}`;
        this.circle.style.strokeDashoffset = this.circumference;

        this.applyStyle();
        this.setupEventListeners();
    }

    applyStyle() {
        const style = document.createElement("style");
            style.textContent = `
                .container {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    gap: 90px;
                }
                
                #progress-container {
                    position: relative;
                    width: 170px;
                    height: 170px;
                    margin: 50px auto;
                    transition: all 0.5s ease;
                }
                
                .progress-bg {
                    fill: none;
                    stroke: #f0f0f0;
                    stroke-width: 12;
                }
    
                .progress-bar {
                    fill: none;
                    stroke: blue;
                    stroke-width: 12;
                    stroke-linecap: butt;
                    transform: rotate(-90deg);
                    transform-origin: 50% 50%;
                    transition: stroke-dashoffset 0.5s ease;
                }
                
                .input-container {
                    display: flex;
                    align-items: center;
                    gap: 30px;
                }
    
                .percent {
                    width: 42px;
                    border-radius: 20px;
                    border: 1px solid black;
                    padding: 5px;
                    text-align: center;
                    font-size: 18px;
    
                    -moz-appearance: textfield;
                }
    
                .percent::-webkit-outer-spin-button,
                .percent::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
    
                .switch-container {
                    display: flex;
                    align-items: center;
                    gap: 30px;
                }
    
                .switch {
                    position: relative;
                    display: inline-block;
                    width: 58px;
                    height: 34px;
                }
    
                .switch input {
                    opacity: 0;
                    width: 0;
                    height: 0;
                }
    
                .slider {
                    position: absolute;
                    cursor: pointer;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: #e3e3ed;
                    transition: .4s;
                    border-radius: 34px;
                }
    
                .slider:before {
                    position: absolute;
                    content: "";
                    height: 27px;
                    width: 27px;
                    left: 3px;
                    bottom: 4px;
                    background-color: white;
                    transition: .4s;
                    border-radius: 50%;
                }
    
                input:checked + .slider {
                    background-color: blue;
                }
    
                input:checked + .slider:before {
                    transform: translateX(26px);
                }
    
                .switch-label {
                    font-size: 16px;
                }
    
                .settings-container {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }
    
                .hidden {
                    opacity: 0;
                    pointer-events: none;
                    transform: scale(0.9);
                    height: 0;
                    overflow: hidden;
                    margin: 0;
                    padding: 0;
                }
                
                @keyframes rotate {
                    from {
                        transform: rotate(-90deg);
                    }
                    to {
                        transform: rotate(270deg);
                    }
                }
                
                .animated {
                    animation: rotate 2s linear infinite;
                }
                
                @media (max-width: 480px) {
                    .container {
                        flex-direction: column;
                        justify-content: space-between;
                    }
                }
        `
    }

    setupEventListeners() {
        this.input.addEventListener("input", () => {
            let value = this.input.value;

            if (value < 0) {
                value = 0;
                this.input.value = 0;
            } else if (value > 100) {
                value = 100;
                this.input.value = 100;
            }

            this.setProgress(value);
        })

        this.animateToggle.addEventListener("change", () => {
            if (this.animateToggle.checked) {
                this.startAnimation();
            } else {
                this.stopAnimation();
            }
        })

        this.hideToggle.addEventListener("change", () => {
            if (this.hideToggle.checked) {
                this.show();
            } else {
                this.hide();
            }
        })
    }

    setProgress(percent) {
        const offset = this.circumference - (percent / 100) * this.circumference;
        this.circle.style.strokeDashoffset = offset;
        this.input.value = percent;
    }

    startAnimation() {
        this.circle.classList.add("animated");
        this.animateToggle.checked = true;
    }

    stopAnimation() {
        this.circle.classList.remove("animated");
        this.animateToggle.checked = false;
    }

    show() {
        this.progressContainer.classList.add("hidden");
        this.hideToggle.checked = false;
    }

    hide() {
        this.progressContainer.classList.remove("hidden");
        this.hideToggle.checked = true;
    }
}