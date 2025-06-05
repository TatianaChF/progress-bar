/**
 * Класс ProgressBar - создает интерактивный круговой прогресс-бар
 * с возможностью управления через UI или программный API.
 */
class ProgressBar {
    /**
     * Конструктор класса
     * @param {HTMLElement} container - Контейнер для размещения прогресс-бара
     * @param {Object} [options={}] - Настройки прогресс-бара
     */
    constructor(container, options = {}) {
        this.defaults = {
            size: 170,
            strokeWidth: 10,
            value: 0,
            animated: false,
            hidden: false
        };

        // Объединение пользовательских настроек с настройками по умолчанию
        this.config = {...this.defaults, ...options};
        this.container = container;

        // Инициализация компонента
        this.init();
    }

    /**
     * Инициализация компонента:
     * - Создание DOM-структуры
     * - Настройка начального состояния
     * - Применение стилей
     * - Навешивание обработчиков событий
     */
    init() {
        this.container.innerHTML = `
            
        `;

        // Получение ссылок на DOM-элементы
        this.circle = document.getElementById("progress");
        this.input = document.getElementById("percent");
        this.animateToggle = document.getElementById("animate-toggle");
        this.hideToggle = document.getElementById("hide-toggle");
        this.progressContainer = document.getElementById("progress-container");

        // Расчет геометрии прогресс-бара
        this.radius = this.circle.r.baseVal.value;
        this.circumference = 2 * Math.PI * this.radius;

        // Инициализация стилей прогресс-бара
        this.circle.style.strokeDasharray = `${this.circumference}`;
        this.circle.style.strokeDashoffset = this.circumference;

        // Применение кастомных стилей
        this.applyStyle();

        // Настройка обработчиков событий
        this.setupEventListeners();
    }

    /**
     * Динамическое создание и применение стилей компонента
     */
    applyStyle() {
        const style = document.createElement("style");
            style.textContent = `
                
        `;
        this.container.appendChild(style);
    }

    /**
     * Настройка обработчиков событий для элементов управления
     */
    setupEventListeners() {
        // Обработчик изменения значения в поле ввода
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

        // Обработчик переключения анимации
        this.animateToggle.addEventListener("change", () => {
            if (this.animateToggle.checked) {
                this.startAnimation();
            } else {
                this.stopAnimation();
            }
        })

        // Обработчик переключения видимости
        this.hideToggle.addEventListener("change", () => {
            if (this.hideToggle.checked) {
                this.hide();
            } else {
                this.show();
            }
        })
    }

    /**
     * Установка значения прогресса
     * @param {number} percent - Значение от 0 до 100
     */
    setProgress(percent) {
        const offset = this.circumference - (percent / 100) * this.circumference;
        this.circle.style.strokeDashoffset = offset;
        this.input.value = percent;
    }

    /**
     * Запуск анимации вращения
     */
    startAnimation() {
        this.circle.classList.add("animated");
        this.animateToggle.checked = true;
    }

    /**
     * Остановка анимации вращения
     */
    stopAnimation() {
        this.circle.classList.remove("animated");
        this.animateToggle.checked = false;
    }

    /**
     * Отображение компонента
     */
    show() {
        this.progressContainer.classList.remove("hidden");
        this.hideToggle.checked = false;
    }

    /**
     * Скрытие компонента
     */
    hide() {
        this.progressContainer.classList.add("hidden");
        this.hideToggle.checked = true;
    }
}