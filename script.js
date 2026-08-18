// Конфигурация
const WHATSAPP_NUMBER = "79000000000"; // ЗАМЕНИТЕ НА ВАШ НОМЕР БЕЗ +

// Данные меню
const menuData = [
    // КОФЕ
    { id: 'esp', name: 'Двойной эспрессо', price: 150, volume: '60 мл', category: 'coffee' },
    { id: 'amr', name: 'Американо', price: 180, volume: '250/350 мл', category: 'coffee' },
    { id: 'cap', name: 'Капучино', price: 220, volume: '250/350 мл', category: 'coffee', isNew: true },
    { id: 'lat', name: 'Латте', price: 240, volume: '350 мл', category: 'coffee' },
    { id: 'raf_urb', name: 'Раф с урбечом', price: 300, volume: '350 мл', category: 'coffee', isNew: true },
    { id: 'dubai', name: 'Дубайский раф шоколад-фисташка', price: 350, volume: '350 мл', category: 'coffee', isNew: true },
    
    // ХОЛОДНЫЙ КОФЕ
    { id: 'ice_lat', name: 'Айс латте', price: 250, volume: '350 мл', category: 'cold-coffee' },
    { id: 'bumble', name: 'Бамбл на апельсиновом фреше', price: 320, volume: '350 мл', category: 'cold-coffee' },
    
    // ЧАЙ
    { id: 'assam', name: 'Чёрный чай Ассам', price: 200, volume: '500 мл', category: 'tea' },
    { id: 'oblep', name: 'Облепиховый чай', price: 300, volume: '500 мл', category: 'author-tea' },
    
    // НЕ КОФЕ
    { id: 'kalmyk', name: 'Калмыцкий чай на молоке', price: 150, volume: '300 мл', category: 'no-coffee' },
    
    // КОКТЕЙЛИ
    { id: 'milkshake', name: 'Молочный коктейль классика', price: 280, volume: '400 мл', category: 'cocktails' }
];

const categories = {
    'all': 'Все',
    'coffee': 'Кофе',
    'cold-coffee': 'Холодный кофе',
    'tea': 'Классический чай',
    'author-tea': 'Авторский чай',
    'no-coffee': 'Не кофе',
    'cocktails': 'Коктейли'
};

let cart = {}; // Исправлено: используем объект для быстрого доступа по ID

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
    renderMenu('all');
    setupEventListeners();
});

function renderCategories() {
    const catContainer = document.getElementById('categories');
    catContainer.innerHTML = Object.entries(categories).map(([key, value]) => `
        <button class="cat-btn ${key === 'all' ? 'active' : ''}" onclick="filterMenu('${key}', this)">${value}</button>
    `).join('');
}

function renderMenu(category) {
    const grid = document.getElementById('menu-grid');
    const filtered = category === 'all' ? menuData : menuData.filter(item => item.category === category);
    
    grid.innerHTML = filtered.map(item => `
        <div class="product-card">
            ${item.isNew ? '<span class="badge-new">НОВИНКА</span>' : ''}
            <h3 class="product-name">${item.name}</h3>
            <p class="product-volume">${item.volume}</p>
            <p class="product-price">${item.price} ₽</p>
            <button class="btn btn-primary" onclick="addToCart('${item.id}')">+</button>
        </div>
    `).join('');
}

function filterMenu(cat, btn) {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderMenu(cat);
}

// ЛОГИКА КОРЗИНЫ (ИСПРАВЛЕНА)
function addToCart(id) {
    const product = menuData.find(p => p.id === id);
    if (cart[id]) {
        cart[id].count += 1;
    } else {
        cart[id] = { ...product, count: 1 };
    }
    updateCartUI();
}

function removeFromCart(id) {
    if (cart[id].count > 1) {
        cart[id].count -= 1;
    } else {
        delete cart[id];
    }
    updateCartUI();
}

function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    const countLabel = document.getElementById('cart-count');
    const totalPriceLabel = document.getElementById('cart-total-price');
    
    let totalItems = 0;
    let totalPrice = 0;
    
    cartItems.innerHTML = Object.values(cart).map(item => {
        totalItems += item.count;
        totalPrice += item.price * item.count;
        return `
            <div class="cart-item">
                <span>${item.name} x${item.count}</span>
                <span>${item.price * item.count} ₽</span>
                <button onclick="removeFromCart('${item.id}')">-</button>
            </div>
        `;
    }).join('');

    countLabel.innerText = totalItems;
    totalPriceLabel.innerText = totalPrice;
}

// Модальные окна
function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

function openBooking() {
    document.getElementById('booking-modal').style.display = 'block';
}

function closeBooking() {
    document.getElementById('booking-modal').style.display = 'none';
}

// Слушатели событий
function setupEventListeners() {
    // Показ поля адреса при выборе доставки
    document.querySelectorAll('input[name="delivery-type"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            const addrInput = document.getElementById('order-address');
            addrInput.classList.toggle('hidden', e.target.value !== 'Доставка');
            if (e.target.value === 'Доставка') addrInput.setAttribute('required', true);
            else addrInput.removeAttribute('required');
        });
    });

    // Оформление заказа
    document.getElementById('order-form').onsubmit = (e) => {
        e.preventDefault();
        sendOrder();
    };

    // Бронирование
    document.getElementById('booking-form').onsubmit = (e) => {
        e.preventDefault();
        sendBooking();
    };
}

function sendOrder() {
    const name = document.getElementById('order-name').value;
    const phone = document.getElementById('order-phone').value;
    const address = document.getElementById('order-address').value;
    const comment = document.getElementById('order-comment').value;
    const type = document.querySelector('input[name="delivery-type"]:checked').value;
    const payment = document.getElementById('order-payment').value;

    let itemsText = Object.values(cart).map(i => `${i.name} x${i.count} — ${i.price * i.count}₽`).join('\n');
    let total = document.getElementById('cart-total-price').innerText;

    let text = `🛍 *ЗАКАЗ SABLYA COFFEE*\n\n${itemsText}\n\n💰 *ИТОГО: ${total} ₽*\n\n📍 Способ: ${type}\n👤 Имя: ${name}\n📞 Тел: ${phone}\n💳 Оплата: ${payment}`;
    if (address) text += `\n🏠 Адрес: ${address}`;
    if (comment) text += `\n💬 Коммент: ${comment}`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`);
}

function sendBooking() {
    const name = document.getElementById('book-name').value;
    const date = document.getElementById('book-date').value;
    const time = document.getElementById('book-time').value;
    const guests = document.getElementById('book-guests').value;
    const comment = document.getElementById('book-comment').value;

    let text = `📅 *БРОНИРОВАНИЕ СТОЛИКА*\n\n👤 Имя: ${name}\n🗓 Дата: ${date}\n🕒 Время: ${time}\n👥 Гостей: ${guests}\n💬 Коммент: ${comment}`;
    
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`);
}
