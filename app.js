// Основной JavaScript для Личного фитнес-тренера
document.addEventListener('DOMContentLoaded', () => {
    console.log('App initialized');
    
    // Навигация по вкладкам
    const navButtons = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-tab');
            
            // Убираем активные классы
            navButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(t => t.classList.remove('active'));
            
            // Ставим активные классы
            btn.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });

    // Логика Питания (добавление в дневник)
    const foodList = [
        { name: 'Яблоко', calories: 52, protein: 0.3, fat: 0.2, carbs: 14, barcode: '123456789012' },
        { name: 'Куриная грудка (100г)', calories: 165, protein: 31, fat: 3.6, carbs: 0, barcode: '4607000000000' },
        { name: 'Рис (100г)', calories: 130, protein: 2.7, fat: 0.3, carbs: 28, barcode: '234567890123' },
        { name: 'Овсянка (100г)', calories: 389, protein: 16.9, fat: 6.9, carbs: 66.3, barcode: '345678901234' },
        { name: 'Гречка (100г)', calories: 346, protein: 12.6, fat: 3.3, carbs: 68, barcode: '456789012345' },
        { name: 'Банан', calories: 89, protein: 1.1, fat: 0.3, carbs: 22.8, barcode: '567890123456' },
        { name: 'Творог 5% (100г)', calories: 121, protein: 17, fat: 5, carbs: 1.8, barcode: '678901234567' },
        { name: 'Яйцо куриное (1 шт)', calories: 70, protein: 6.3, fat: 5, carbs: 0.7, barcode: '789012345678' },
        { name: 'Авокадо (100г)', calories: 160, protein: 2, fat: 14.7, carbs: 8.5, barcode: '890123456789' },
        { name: 'Лосось (100г)', calories: 208, protein: 20, fat: 13, carbs: 0, barcode: '901234567890' }
    ];

    let dailyTotals = { calories: 0, protein: 0, fat: 0, carbs: 0 };
    let dailyLog = [];

    const searchInput = document.getElementById('food-search');
    const searchResults = document.getElementById('search-results');
    const dailyFoodList = document.getElementById('daily-food');
    const totalCaloriesEl = document.getElementById('total-calories');
    const totalProteinEl = document.getElementById('total-protein');
    const totalFatEl = document.getElementById('total-fat');
    const totalCarbsEl = document.getElementById('total-carbs');

    function updateDailyUI() {
        if(dailyFoodList) dailyFoodList.innerHTML = '';
        dailyTotals = { calories: 0, protein: 0, fat: 0, carbs: 0 };
        
        dailyLog.forEach(item => {
            dailyTotals.calories += item.calories;
            dailyTotals.protein += item.protein;
            dailyTotals.fat += item.fat;
            dailyTotals.carbs += item.carbs;
            
            if(dailyFoodList) {
                const li = document.createElement('li');
                li.textContent = `${item.name} - ${item.calories} ккал`;
                dailyFoodList.appendChild(li);
            }
        });

        if(totalCaloriesEl) totalCaloriesEl.textContent = Math.round(dailyTotals.calories);
        if(totalProteinEl) totalProteinEl.textContent = Math.round(dailyTotals.protein);
        if(totalFatEl) totalFatEl.textContent = Math.round(dailyTotals.fat);
        if(totalCarbsEl) totalCarbsEl.textContent = Math.round(dailyTotals.carbs);
    }

    if(searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            if(searchResults) searchResults.innerHTML = '';
            
            if(query.length < 2) return;
            
            const results = foodList.filter(f => f.name.toLowerCase().includes(query));
            results.forEach(food => {
                const li = document.createElement('li');
                li.textContent = `${food.name} (${food.calories} ккал)`;
                li.style.cursor = 'pointer';
                li.style.padding = '5px';
                li.addEventListener('click', () => {
                    dailyLog.push(food);
                    updateDailyUI();
                    if(searchResults) searchResults.innerHTML = '';
                    if(searchInput) searchInput.value = '';
                });
                searchResults.appendChild(li);
            });
        });
    }

    // Сканер штрихкода (заглушка для демонстрации)
    const scanBtn = document.getElementById('scan-barcode');
    if(scanBtn) {
        scanBtn.addEventListener('click', () => {
            const barcode = prompt('Введите штрихкод (для теста: 4607000000000):', '4607000000000');
            if(barcode) {
                const food = foodList.find(f => f.barcode === barcode);
                if(food) {
                    dailyLog.push(food);
                    updateDailyUI();
                    alert(`Добавлено: ${food.name}`);
                } else {
                    alert('Продукт не найден в базе!');
                }
            }
        });
    }

    // Загрузка прогресса (имитация)
    const progressList = document.getElementById('progress-list');
    if(progressList) {
        const storedProgress = JSON.parse(localStorage.getItem('fitnessProgress') || '[]');
        if(storedProgress.length > 0) {
            progressList.innerHTML = '';
            storedProgress.slice(-10).reverse().forEach(p => {
                const li = document.createElement('li');
                li.textContent = `${p.date}: Вес ${p.weight} кг, Тренировок ${p.workouts}`;
                progressList.appendChild(li);
            });
        }
    }

    // Сохранение прогресса
    const saveProgressBtn = document.getElementById('save-progress');
    if(saveProgressBtn) {
        saveProgressBtn.addEventListener('click', () => {
            const weight = document.getElementById('weight-input')?.value || 70;
            const workouts = document.getElementById('workouts-input')?.value || 0;
            
            const newEntry = {
                date: new Date().toLocaleDateString('ru-RU'),
                weight: parseFloat(weight),
                workouts: parseInt(workouts)
            };

            let progress = JSON.parse(localStorage.getItem('fitnessProgress') || '[]');
            progress.push(newEntry);
            localStorage.setItem('fitnessProgress', JSON.stringify(progress));
            alert('Прогресс сохранен!');
            
            // Обновляем список
            if(progressList) {
                progressList.innerHTML = '';
                progress.slice(-10).reverse().forEach(p => {
                    const li = document.createElement('li');
                    li.textContent = `${p.date}: Вес ${p.weight} кг, Тренировок ${p.workouts}`;
                    progressList.appendChild(li);
                });
            }
        });
    }

    // Имитация AI Коуча
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');

    if(chatSend && chatInput && chatMessages) {
        chatSend.addEventListener('click', () => {
            const text = chatInput.value.trim();
            if(!text) return;

            // Сообщение пользователя
            const userDiv = document.createElement('div');
            userDiv.innerHTML = `<p><strong>Ты:</strong> ${text}</p>`;
            chatMessages.appendChild(userDiv);

            // Ответ AI (заглушка)
            setTimeout(() => {
                const aiDiv = document.createElement('div');
                aiDiv.innerHTML = `<p><strong>AI Коуч:</strong> Спасибо за вопрос! Помни: регулярность важнее интенсивности. Продолжай тренироваться! 💪</p>`;
                chatMessages.appendChild(aiDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 500);

            chatInput.value = '';
        });
    }

    // Инициализация
    updateDailyUI();
});
