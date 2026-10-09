/**
 * Лабораторная работа №1.
 * Задание: Написать сценарий, который определяет зарплату работнику,
 * работающему на условиях часовой оплаты. Событие происходит при
 * получении фокуса (Необходимо ввести количество часов и оплату за час).
 */

/**
 * Функция расчета заработной платы.
 * Вызывается при получении фокуса (событие "focus") элементом #salary.
 */
function calculateSalary() {
    var hoursInput = document.getElementById('hours');
    var rateInput = document.getElementById('rate');
    var salaryInput = document.getElementById('salary');
    var resultBox = document.getElementById('resultMessage');

    // Если поле "часы" пустое, запрашиваем значение через prompt
    if (hoursInput.value.trim() === '') {
        var promptedHours = prompt('Введите количество отработанных часов:');
        if (promptedHours !== null) {
            hoursInput.value = promptedHours.trim();
        }
    }

    // Если поле "оплата за час" пустое, запрашиваем значение через prompt
    if (rateInput.value.trim() === '') {
        var promptedRate = prompt('Введите оплату за 1 час (руб.):');
        if (promptedRate !== null) {
            rateInput.value = promptedRate.trim();
        }
    }

    // Получаем числовые значения из полей ввода
    var hours = parseFloat(hoursInput.value);
    var rate = parseFloat(rateInput.value);

    // Проверяем корректность введенных данных
    if (isNaN(hours) || isNaN(rate)) {
        salaryInput.value = 'Ошибка ввода';
        showResult('Пожалуйста, введите корректные числовые значения для часов и ставки.', 'error');
        return;
    }

    if (hours < 0 || rate < 0) {
        salaryInput.value = 'Ошибка ввода';
        showResult('Количество часов и ставка не могут быть отрицательными числами.', 'error');
        return;
    }

    // Основная формула: Зарплата = Часы * Ставка за час
    var totalSalary = hours * rate;

    // Округляем до двух знаков после запятой для удобства
    var formattedSalary = totalSalary.toFixed(2);

    // Записываем результат в поле вывода
    salaryInput.value = formattedSalary + ' руб.';

    // Показываем поясняющее сообщение
    showResult(
        'Расчет выполнен успешно!<br>' +
        'Часов: <strong>' + hours + '</strong>, ' +
        'Ставка: <strong>' + rate + ' руб./ч</strong>.<br>' +
        'Итоговая заработная плата: <strong>' + formattedSalary + ' руб.</strong>',
        'success'
    );
}

/**
 * Вспомогательная функция для вывода информационных сообщений
 * @param {string} message - Текст сообщения (может содержать HTML)
 * @param {string} type - Класс стиля ('success', 'error', 'info')
 */
function showResult(message, type) {
    var resultBox = document.getElementById('resultMessage');
    resultBox.className = 'result-box ' + type;
    resultBox.innerHTML = message;
}

/**
 * Функция очистки полей формы
 */
function resetForm() {
    document.getElementById('hours').value = '';
    document.getElementById('rate').value = '';
    document.getElementById('salary').value = '';
    var resultBox = document.getElementById('resultMessage');
    resultBox.className = 'result-box hidden';
    resultBox.innerHTML = '';
}

/**
 * Назначение обработчиков событий после полной загрузки страницы.
 */
window.onload = function () {
    console.log('Лабораторная работа №1 загружена.');

    var salaryField = document.getElementById('salary');
    var resetBtn = document.getElementById('resetBtn');

    // Событие "focus" возникает в момент, когда элемент получает фокус
    // (например, при клике мыши или переходе с помощью клавиши Tab).
    salaryField.addEventListener('focus', function () {
        calculateSalary();
    });

    // Обработчик для кнопки сброса
    if (resetBtn) {
        resetBtn.addEventListener('click', function () {
            resetForm();
        });
    }
};
