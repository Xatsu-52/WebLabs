function calculateSalary() {
    const hoursInput = document.getElementById('hours');
    const rateInput = document.getElementById('rate');
    const salaryInput = document.getElementById('salary');
    const resultBox = document.getElementById('resultMessage');

    if (hoursInput.value.trim() === '') {
        const promptedHours = prompt('Введите количество отработанных часов:');
        if (promptedHours !== null) {
            hoursInput.value = promptedHours.trim();
        }
    }
    if (rateInput.value.trim() === '') {
        const promptedRate = prompt('Введите оплату за 1 час (руб.):');
        if (promptedRate !== null) {
            rateInput.value = promptedRate.trim();
        }
    }

    const hours = parseFloat(hoursInput.value);
    const rate = parseFloat(rateInput.value);

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

    const totalSalary = hours * rate;
    const formattedSalary = totalSalary.toFixed(2);

    salaryInput.value = `${formattedSalary} руб.`;
    showResult(
        `Расчет выполнен успешно!<br>Часов: <strong>${hours}</strong>, Ставка: <strong>${rate} руб./ч</strong>.<br>Итоговая заработная плата: <strong>${formattedSalary} руб.</strong>`,
        'success'
    );
}

function showResult(message, type) {
    const resultBox = document.getElementById('resultMessage');
    resultBox.className = `result-box ${type}`;
    resultBox.innerHTML = message;
}

function resetForm() {
    document.getElementById('hours').value = '';
    document.getElementById('rate').value = '';
    document.getElementById('salary').value = '';
    const resultBox = document.getElementById('resultMessage');
    resultBox.className = 'result-box hidden';
    resultBox.innerHTML = '';
}

window.onload = function () {
    console.log('Лабораторная работа №1 загружена.');
    const salaryField = document.getElementById('salary');
    const resetBtn = document.getElementById('resetBtn');

    salaryField.addEventListener('focus', function () {
        calculateSalary();
    });

    if (resetBtn) {
        resetBtn.addEventListener('click', function () {
            resetForm();
        });
    }
};