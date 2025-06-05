/**
 * Инициализация прогресс-бара
 *
 * Создаем экземпляр ProgressBar с параметрами:
 * - Размер: 170px
 * - Толщина линии: 10px
 * - Начальное значение: 0
 * - Анимация отключена
 * - Компонент видим
 */
const progressBar = new ProgressBar(document.getElementById('progress-bar'), {
    size: 170,
    strokeWidth: 10,
    value: 0,
    animated: false,
    hidden: false
});