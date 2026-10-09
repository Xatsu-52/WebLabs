function calculateSalary() {
    var hoursInput = document.getElementById('hours');
    var rateInput = document.getElementById('rate');
    var salaryInput = document.getElementById('salary');
    var resultBox = document.getElementById('resultMessage');

    if (hoursInput.value.trim() === '') {
        var promptedHours = prompt('Введите количество отработанных часов:');
        if (promptedHours !== null) {
            hoursInput.value = promptedHours.trim();
        }
    }

    if (rateInput.value.trim() === '') {
        var promptedRate = prompt('Введите оплату за 1 час (руб.):');
        if (promptedRate !== null) {
            rateInput.value = promptedRate.trim();
        }
    }

    var hours = parseFloat(hoursInput.value); var rate = parseFloat(rateInput.value);

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

    var totalSalary = hours * rate;

    var formattedSalary = totalSalary.toFixed(2);

    salaryInput.value = formattedSalary + ' руб.';

    showResult(
        'Расчет выполнен успешно!<br>' +
        'Часов: <strong>' + hours + '</strong>, ' +
        'Ставка: <strong>' + rate + ' руб./ч</strong>.<br>' +
        'Итоговая заработная плата: <strong>' + formattedSalary + ' руб.</strong>',
        'success'
    );
}

function showResult(message, type) {
    var resultBox = document.getElementById('resultMessage');
    resultBox.className = 'result-box ' + type;
    resultBox.innerHTML = message;
}


function resetForm() {
    document.getElementById('hours').value = '';
    document.getElementById('rate').value = '';
    document.getElementById('salary').value = '';
    var resultBox = document.getElementById('resultMessage');
    resultBox.className = 'result-box hidden';
    resultBox.innerHTML = '';
}


window.onload = function () {
    console.log('Лабораторная работа №1 загружена.');

    var salaryField = document.getElementById('salary');
    var resetBtn = document.getElementById('resetBtn');

    salaryField.addEventListener('focus', function () {
        calculateSalary();
    });

    if (resetBtn) {
        resetBtn.addEventListener('click', function () {
            resetForm();
        });
    }
};
