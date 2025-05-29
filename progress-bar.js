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
    }
}