import template from './progress-bar.html?raw';
import "./progress.css";

/**
 * Класс ProgressBar - создает интерактивный круговой прогресс-бар
 * с возможностью управления через UI или программный API.
 */
export class ProgressBar {
    /**
     * Конструктор класса
     * @param {HTMLElement} container - Контейнер для размещения прогресс-бара
     * @param {Object} [options={}] - Настройки прогресс-бара
     */
    constructor(container, options = {}) {
        this.defaults = {
            value: 0,
            animated: false,
            hidden: false
        };

        this.config = {...this.defaults, ...options};
        this.container = container;

        // Привязка контекста для обработчиков
        this.handleInput = this.handleInput.bind(this);
        this.handleAnimateToggle = this.handleAnimateToggle.bind(this);
        this.handleHideToggle = this.handleHideToggle.bind(this);

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
        this.container.innerHTML = template;

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

        // Применение начальных значений
        this.setProgress(this.config.value);
        this.config.animated ? this.startAnimation() : this.stopAnimation();
        this.config.hidden ? this.hide() : this.show();

        // Настройка обработчиков событий
        this.setupEventListeners();
    }

    /**
     * Настройка обработчиков событий для элементов управления
     */
    setupEventListeners() {
        // Обработчик изменения значения в поле ввода
        this.input.addEventListener("input", this.handleInput);

        // Обработчик переключения анимации
        this.animateToggle.addEventListener("change", this.handleAnimateToggle)

        // Обработчик переключения видимости
        this.hideToggle.addEventListener("change", this.handleHideToggle);
    }

    // Метод обработчик для ввода значения
    handleInput() {
        let value = this.input.value;

        if (value < 0) {
            value = 0;
            this.input.value = 0;
        } else if (value > 100) {
            value = 100;
            this.input.value = 100;
        }

        this.setProgress(value);
    }

    // Метод обработчик для значения анимации компонента
    handleAnimateToggle() {
        if (this.animateToggle.checked) {
            this.startAnimation();
        } else {
            this.stopAnimation();
        }
    }

    // Метод обработчик значения видимости компонента
    handleHideToggle() {
        if (this.hideToggle.checked) {
            this.hide();
        } else {
            this.show();
        }
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

    /**
     * Метод для очистки
     */
    destroy() {
        this.input.removeEventListener("input", this.handleInput);
        this.animateToggle.removeEventListener("change", this.handleAnimateToggle);
        this.hideToggle.removeEventListener("change", this.handleHideToggle);
    }
}