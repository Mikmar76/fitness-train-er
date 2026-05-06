// Личный фитнес-тренер - Основной функционал

// ========== Утилиты ==========
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ========== Переключение вкладок ==========
function switchTab(tabName) {
    // Скрываем все вкладки
    $$('.tab-content').forEach(el => el.classList.remove('active'));
    // Убираем активный класс с кнопок
    $$('.nav-btn').forEach(btn => btn.classList.remove('active'));
    // Показываем нужную вкладку
    $(`#${tabName}`).classList.add('active');
    // Активируем кнопку
    $(`.nav-btn[data-tab="${tabName}"]`).classList.add('active');
    
    // Загружаем данные при переходе
    if (tabName === 'progress') loadProgress();
    if (tabName === 'nutrition') updateDailySummary();
}

// Привязываем кнопки навигации
document.addEventListener('DOMContentLoaded', () => {
    $$('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });
    // Загружаем начальные данные
    loadWeight();
    loadProgress();
    updateDailySummary();
});

// ========== Видео тренировки ==========
function playVideo(url) {
    const modal = $('#videoPlayer');
    const frame = $('#ytFrame');
    frame.src = url;
    modal.classList.add('active');
}

// Закрытие видео по клику на модальное окно
$('#videoPlayer')?.addEventListener('click', function(e) {
    if (e.target === this) {
        this.style.display = 'none';
        $('#ytFrame').src = '';
    }
});

// ========== Питание (База продуктов) ==========
const foodDatabase = [
    { barcode: "4607000000000", name: "Куриная грудка (100г)", calories: 165, protein: 31, fat: 3.6, carbs: 0 },
    { barcode: "4607100000010", name: "Рис белый варёный (100г)", calories: 130, protein: 2.7, fat: 0.3, carbs: 28 },
    { barcode: "4607200000020", name: "Банан (1 шт, 120г)", calories: 105, protein: 1.3, fat: 0.4, carbs: 27 },
    { barcode: "4607300000030", name: "Яйцо куриное (1 шт)", calories: 70, protein: 6.3, fat: 5, carbs: 0.7 },
    { barcode: "4607400000040", name: "Овсянка на воде (100г)", calories: 88, protein: 2.5, fat: 1.5, carbs: 16 },
    { barcode: "4607500000050", name: "Гречка варёная (100г)", calories: 110, protein: 4.5, fat: 1, carbs: 22 },
    { barcode: "4607600000060", name: "Творог 5% (100г)", calories: 120, protein: 17, fat: 5, carbs: 3 },
    { barcode: "4607700000070", name: "Яблоко (1 шт, 150г)", calories: 80, protein: 0.3, fat: 0.2, carbs: 21 },
    { barcode: "4607800000080", name: "Говядина постная (100г)", calories: 250, protein: 26, fat: 15, carbs: 0 },
    { barcode: "4607900000090", name: "Лосось (100г)", calories: 208, protein: 20, fat: 13, carbs: 0 }
];

let dailyFoods = JSON.parse(localStorage.getItem('dailyFoods') || '[]');

function searchFood(query) {
    const resultsDiv = $('#foodResults');
    if (!query) {
        resultsDiv.innerHTML = '';
        return;
    }
    const results = foodDatabase.filter(f => 
        f.name.toLowerCase().includes(query.toLowerCase())
    );
    
    resultsDiv.innerHTML = results.map(food => `
        <div class="food-item">
            <div class="food-info">
                <h4>${food.name}</h4>
                <p>${food.calories} ккал | Б: ${food.protein}г Ж: ${food.fat}г У: ${food.carbs}г</p>
            </div>
            <button class="add-food" onclick='addFood(${JSON.stringify(food).replace(/"/g, '&quot;')})'>+</button>
        </div>
    `).join('');
}

function addFood(food) {
    dailyFoods.push(food);
    localStorage.setItem('dailyFoods', JSON.stringify(dailyFoods));
    updateDailySummary();
    searchFood(''); // Очищаем поиск
}

function updateDailySummary() {
    let totalCals = 0, totalProt = 0, totalFats = 0, totalCarbs = 0;
    dailyFoods.forEach(f => {
        totalCals += f.calories;
        totalProt += f.protein;
        totalFats += f.fat;
        totalCarbs += f.carbs;
    });
    $('#totalCals').textContent = totalCals;
    $('#totalProt').textContent = totalProt.toFixed(1);
    $('#totalFats').textContent = totalFats.toFixed(1);
    $('#totalCarbs').textContent = totalCarbs.toFixed(1);
}

// ========== Прогресс ==========
let weightChart = null;
let waistChart = null;

function saveProgress() {
    const weight = parseFloat($('#newWeight').value);
    const waist = parseFloat($('#newWaist').value);
    if (!weight) {
        alert('Введите вес!');
        return;
    }
    
    const entry = {
        date: new Date().toLocaleDateString('ru-RU'),
        weight: weight,
        waist: waist || null
    };
    
    let history = JSON.parse(localStorage.getItem('progressHistory') || '[]');
    history.push(entry);
    localStorage.setItem('progressHistory', JSON.stringify(history));
    
    $('#newWeight').value = '';
    $('#newWaist').value = '';
    loadProgress();
    loadWeight();
    alert('✅ Прогресс сохранён!');
}

function loadProgress() {
    const history = JSON.parse(localStorage.getItem('progressHistory') || '[]');
    const list = $('#progressList');
    if (history.length === 0) {
        list.innerHTML = '<p style="color:#666; text-align:center; padding:20px;">📭 Пока нет записей. Добавьте первый результат!</p>';
        return;
    }
    // Строим список (последние 10 записей, с конца)
    list.innerHTML = history.slice(-10).reverse().map((h, idx, arr) => {
        const trend = idx < arr.length - 1 
            ? (h.weight < arr[idx+1].weight ? 'down' : h.weight > arr[idx+1].weight ? 'up' : 'same')
            : 'same';
        return `
            <li>
                <span class="date">${h.date}</span>
                <span class="weight">${h.weight} кг</span>
                ${h.waist ? `<span class="waist">Талия: ${h.waist} см</span>` : ''}
                <span class="trend ${trend}"></span>
            </li>
        `;
    }).join('');
}

function loadWeight() {
    const history = JSON.parse(localStorage.getItem('progressHistory') || '[]');
    if (history.length > 0) {
        const last = history[history.length - 1];
        $('#currentWeight').textContent = last.weight;
    }
}

    const input = $('#userMessage');
    const message = input.value.trim();
    if (!message) return;
    
    // Добавляем сообщение пользователя
    addChatMessage(message, 'user');
    input.value = '';
    
    // Имитация ответа AI (в будущем можно подключить реальный API)
    setTimeout(() => {
        const response = getAIResponse(message);
        addChatMessage(response, 'bot');
    }, 500);
}

function addChatMessage(text, sender) {
    const chat = $('#chatMessages');
    const div = document.createElement('div');
    div.className = `message ${sender}`;
    div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

function getAIResponse(msg) {
    const lower = msg.toLowerCase();
    if (lower.includes('привет') || lower.includes('здравствуй')) {
        return 'Привет! 💪 Я твой AI-коуч. Готов помочь с тренировкой!';
    }
    if (lower.includes('питан') || lower.includes('есть') || lower.includes('еда')) {
        return '🥗 Старайся поддерживать дефицит калорий! Белок — основа для мышц. Рекомендую курицу, рыбу и яйца.';
    }
    if (lower.includes('трениров') || lower.includes('упражн')) {
        return '💪 Лучшая база: жим лёжа, приседания, становая тяга. 3-4 раза в неделю по 45-60 минут.';
    }
    if (lower.includes('вес') || lower.includes('похуд')) {
        return '📉 Для похудения нужен дефицит 300-500 ккал. Пей больше воды и гуляй!';
    }
    return '🤖 Хороший вопрос! Продолжай в том же духе, и результат не заставит себя ждать! 💪';
}

// ========== Сканер штрих-кодов ==========
let html5QrcodeScanner = null;

function startScanner() {
    const container = document.getElementById('scanner-container');
    const readerDiv = document.getElementById('reader');
    container.style.display = 'block';
    
    if (!html5QrcodeScanner) {
        html5QrcodeScanner = new Html5Qrcode("reader");
    }
    
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };
    
    html5QrcodeScanner.start(
        { facingMode: "environment" },
        config,
        onScanSuccess,
        onScanError
    ).catch(err => {
        console.error("Unable to start scanning", err);
        alert("Ошибка доступа к камере. Проверьте разрешения.");
    });
}

function stopScanner() {
    const container = document.getElementById('scanner-container');
    container.style.display = 'none';
    
    if (html5QrcodeScanner && html5QrcodeScanner.isScanning) {
        html5QrcodeScanner.stop().then(() => {
            console.log("Scanner stopped");
        }).catch(err => {
            console.error("Error stopping scanner", err);
        });
    }
}

function onScanSuccess(decodedText, decodedResult) {
    console.log(`Barcode detected: ${decodedText}`);
    stopScanner();
    lookupProduct(decodedText);
}

function onScanError(error) {
    // console.error(error);
}

async function lookupProduct(barcode) {
    // Сначала ищем в локальной базе
    const localFood = foodDatabase.find(f => f.barcode === barcode);
    if (localFood) {
        addFood(localFood);
        alert(`Добавлено: ${localFood.name}`);
        return;
    }
    
    // Пробуем Open Food Facts API
    try {
        const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
        const data = await response.json();
        
        if (data.status === 1 && data.product) {
            const product = data.product;
            const name = product.product_name_ru || product.product_name || "Неизвестный продукт";
            const calories = product.nutriments?.['energy-kcal_100g'] || 0;
            const protein = product.nutriments?.proteins_100g || 0;
            const fat = product.nutriments?.fat_100g || 0;
            const carbs = product.nutriments?.carbohydrates_100g || 0;
            
            const food = {
                name: name + " (100г)",
                calories: Math.round(calories),
                protein: parseFloat(protein.toFixed(1)),
                fat: parseFloat(fat.toFixed(1)),
                carbs: parseFloat(carbs.toFixed(1))
            };
            
            addFood(food);
            alert(`Добавлено: ${food.name}`);
        } else {
            alert(`Товар с кодом ${barcode} не найден в базе. Попробуйте добавить вручную.`);
        }
    } catch (error) {
        console.error("API error:", error);
        alert("Ошибка при поиске продукта. Проверьте соединение.");
    }
}

// Привязываем Enter для чата
$('#userMessage')?.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// Делаем функции глобальными для onclick
window.switchTab = switchTab;
window.playVideo = playVideo;
window.searchFood = searchFood;
window.addFood = addFood;
window.saveProgress = saveProgress;
window.sendMessage = sendMessage;
