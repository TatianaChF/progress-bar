Progress Bar
=====================
Проект представляет собой круговой прогресс-бар, 
созданный с использованием чистого HTML, CSS и 
JavaScript. Блок предоставляет визуальное 
представление прогресса с возможностью управления 
через пользовательский интерфейс или программный API.

### Особенности
1. Круговой прогресс-бар с анимацией заполнения
2. Установка значений через числовое поле ввода
3. Управление состоянием (анимация вращения, видимость компонента)
4. Адаптивный дизайн

### Установка и использование
1. Склонируйте репозиторий:
```
git clone https://github.com/TatianaChF/progress-bar.git
```
2. Откройте файл index.html в браузере:
```bash
open index.html  # Для macOS
start index.html # Для Windows
```
3. Интерфейс будет доступен по адресу:
```
file:///path/to/progress-bar/index.html
```

### Структура проекта
```
progress-bar/
├── index.html         # Основной HTML-файл
├── main.css           # Глобальные стили
├── progress-bar.js    # Класс ProgressBar (основная логика)
└── index.js           # Инициализация приложения
```

## Программный API
Компонент предоставляет следующие методы для управления:
### Создание экземпляра
```javascript
const progressBar = new ProgressBar(containerElement, {
    size: 170,                 // Диаметр прогресс-бара (px)
    strokeWidth: 10,           // Толщина линии (px)
    value: 0,                  // Начальное значение (0-100)
    animated: false,           // Анимация вращения
    hidden: false              // Видимость компонента
});
```
### Основные методы
```javascript
// Установка значения прогресса (0-100)
progressBar.setProgress(75);

// Запуск анимации вращения
progressBar.startAnimation();

// Остановка анимации
progressBar.stopAnimation();

// Скрытие компонента
progressBar.hide();

// Показ компонента
progressBar.show();
```
### Пример использования API
```javascript
let value = 0;
const interval = setInterval(() => {
    value += 5;
    progressBar.setProgress(value);
    
    if (value >= 100) {
        clearInterval(interval);
        progressBar.startAnimation();
    }
}, 500);
```
## Структура блока
### HTML-структура
```html
<div class="container-app">
    <h3 class="app-header">Progress</h3>
    <div id="progress-bar"></div>
</div>
```
### CSS-компоненты
```
1. .container - основной контейнер
2. #progress-container - область прогресс-бара
3. .progress-bg - фон круга
4. .progress-bar - индикатор прогресса
5. .settings-container - панель управления
6. .hidden - состояние скрытия
7. .animated - состояние анимации
```
### JavaScript-класс
```javascript
class ProgressBar {
    constructor(container, options) { ... }
    init() { ... }
    applyStyle() { ... }
    setupEventListeners() { ... }
    setProgress(percent) { ... }
    startAnimation() { ... }
    stopAnimation() { ... }
    show() { ... }
    hide() { ... }
}
```
## Как использовать блок
1. Включите необходимые файлы в ваш HTML:
```html
<link rel="stylesheet" href="main.css">
<script src="progress-bar.js"></script>
```
2. Добавьте контейнер для прогресс-бара:
```html
<div id="progress-bar-container"></div>
```
3. Инициализируйте компонент в вашем скрипте:
```javascript
const progressBar = new ProgressBar(
    document.getElementById('progress-bar-container'),
    {
        value: 30,
    }
);
```
4. Управляйте состоянием через API:
```javascript
// Установите значение 75%
progressBar.setProgress(75);

// Запустите анимацию
progressBar.startAnimation();

// Смените цвета
progressBar.setColors('#f8f8f8', '#FF5722');
``` 