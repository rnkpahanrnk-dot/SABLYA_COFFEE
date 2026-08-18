const WHATSAPP_NUMBER = "79284567776";

// ПОЛНЫЙ СПИСОК ТОВАРОВ ИЗ МЕНЮ
const menuData = [
    // КОФЕ
    { id: 'c1', name: 'Двойной эспрессо', price: 170, vol: '50 мл', cat: 'coffee' },
    { id: 'c2', name: 'Лунго', price: 170, vol: '80 мл', cat: 'coffee' },
    { id: 'c3', name: 'Американо', price: 170, vol: '180 мл', cat: 'coffee' },
    { id: 'c4', name: 'Америкэмбл', price: 200, vol: '200 мл', cat: 'coffee' },
    { id: 'c5', name: 'Капучино', price: 200, vol: '250/350 мл', cat: 'coffee' },
    { id: 'c6', name: 'Фильтр', price: 180, vol: '180/200 мл', cat: 'coffee' },
    { id: 'c7', name: 'Флэт Уайт', price: 220, vol: '250/300 мл', cat: 'coffee' },
    { id: 'c8', name: 'Латте', price: 220, vol: '250/350 мл', cat: 'coffee' },
    { id: 'c9', name: 'Гляссе', price: 250, vol: '200 мл', cat: 'coffee' },
    { id: 'c10', name: 'Кофе PELLE', price: 100, vol: '250 мл', cat: 'coffee', isNew: true },
    { id: 'c11', name: 'Раф классика', price: 300, vol: '250/350 мл', cat: 'coffee' },
    { id: 'c12', name: 'Раф с урбечом', price: 300, vol: '250/350 мл', cat: 'coffee' },
    { id: 'c13', name: 'Дубайский раф', price: 320, vol: '250/350 мл', cat: 'coffee', isNew: true },

    // ХОЛОДНЫЙ КОФЕ
    { id: 'h1', name: 'Айс кофе', price: 280, vol: '350 мл', cat: 'cold' },
    { id: 'h2', name: 'Айс кофе с урбечом', price: 330, vol: '350 мл', cat: 'cold' },
    { id: 'h3', name: 'Бамбл фреш', price: 320, vol: '270 мл', cat: 'cold' },

    // ЛИМОНАДЫ
    { id: 'l1', name: 'Щавелевый лимонад', price: 250, vol: '0.3/1 л', cat: 'lemonades' },
    { id: 'l2', name: 'Мохито классика', price: 250, vol: '0.3/1 л', cat: 'lemonades' },
    { id: 'l3', name: 'Малина-имбирь', price: 250, vol: '0.3/1 л', cat: 'lemonades' },
    { id: 'l4', name: 'Гранат-апельсин', price: 250, vol: '0.3/1 л', cat: 'lemonades' },

    // КОКТЕЙЛИ
    { id: 'k1', name: 'Молочный коктейль', price: 250, vol: '350 мл', cat: 'cocktails' },
    { id: 'k2', name: 'Сникерс коктейль', price: 370, vol: '350 мл', cat: 'cocktails' },
    { id: 'k3', name: 'Черничное печенье', price: 370, vol: '350 мл', cat: 'cocktails' },

    // НЕ КОФЕ
    { id: 'n1', name: 'Какао турецкий', price: 220, vol: '250/350 мл', cat: 'nocoffee' },
    { id: 'n2', name: 'Калмыцкий чай', price: 250, vol: '350 мл', cat: 'nocoffee' },
    { id: 'n3', name: 'Вареная кукуруза', price: 250, vol: '300 гр', cat: 'nocoffee', isNew: true },

    // СМУЗИ И ФРЕШИ
    { id: 's1', name: 'Смузи ягодный', price: 350, vol: '350 мл', cat: 'smoothie' },
    { id: 'f1', name: 'Апельсиновый фреш', price: 300, vol: '300 мл', cat: 'smoothie' },

    // МОРОЖЕНОЕ
    { id: 'm1', name: 'Мороженое сливочное', price: 60, vol: '55 гр', cat: 'icecream' },
    { id: 'm2', name: 'Мороженое шоколад', price: 60, vol: '55 гр', cat: 'icecream' }
];

const categories = {
    all: 'Все',
    coffee: 'Кофе',
    cold: 'Холодный кофе',
    lemonades: 'Лимонады',
    cocktails: 'Коктейли',
    nocoffee: 'Не кофе',
    smoothie: 'Смузи & Фреши',
    icecream: 'Мороженое'
};

let cart = {};
let currentCat = 'all';

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    renderCats();
    renderMenu();
    setupListeners();
});

function renderCats() {
    const container = document.getElementById('categories');
    container.innerHTML = Object.entries(categories).map(([id, name]) => `
        <button class="cat-btn ${id === currentCat ? 'active' : ''}" onclick="filter('${id}')">${name}</button>
    `).join('');
}

function filter(id) {
    currentCat = id;
    renderCats();
    renderMenu();
}

function renderMenu() {
    const grid = document.getElementById('menu-grid');
    const items = currentCat === 'all' ? menuData : menuData.filter(i => i.cat === currentCat);
    
    grid.innerHTML = items.map(i => `
        <div class="product-card">
            ${i.isNew ? '<span class="badge-new">НОВИНКА</span>' : ''}
            <h3>${i.name}</h3>
            <p class="product-vol">${i.vol}</p>
            <div class="price-row">
                <span class="price-val">${i.price} ₽</span>
                <button class="btn btn-gold" onclick="addToCart('${i.id}')">+</button>
            </div>
        </div>
    `).join('');
}

// ЛОГИКА КОРЗИНЫ (ИСПРАВЛЕНО)
function addToCart(id) {
    const product = menuData.find(p => p.id === id);
    if (cart[id]) {
        cart[id].qty += 1;
    } else {
        cart[id] = { ...product, qty: 1 };
    }
    updateCart();
}

function updateQty(id, delta) {
    if (cart[id]) {
        cart[id].qty += delta;
        if (cart[id].qty <= 0) delete cart[id];
    }
    updateCart();
}

function updateCart() {
    const list = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    const countEl = document.getElementById('cart-count');
    
    let total = 0;
    let count = 0;
    
    list.innerHTML = Object.values(cart).map(i => {
        total += i.price * i.qty;
        count += i.qty;
        return `
            <div class="cart-item">
                <div>
                    <strong>${i.name}</strong><br>
                    <small>${i.price} ₽</small>
                </div>
                <div class="qty-controls">
                    <button class="qty-btn" onclick="updateQty('${i.id}', -1)">-</button>
                    <span>${i.qty}</span>
                    <button class="qty-btn" onclick="updateQty('${i.id}', 1)">+</button>
                </div>
            </div>
        `;
    }).join('');
    
    totalEl.innerText = total;
    countEl.innerText = count;
}

function toggleCart(show) {
    document.getElementById('cart-modal').style.display = show ? 'block' : 'none';
}

function toggleMobileMenu() {
    document.getElementById('main-nav').classList.toggle('active');
}

function setupListeners() {
    // Тип заказа
    document.querySelectorAll('input[name="order-type"]').forEach(input => {
        input.addEventListener('change', (e) => {
            document.getElementById('order-address').classList.toggle('hidden', e.target.value !== 'Доставка');
        });
    });

    // Оформление заказа
    document.getElementById('order-form').onsubmit = (e) => {
        e.preventDefault();
        let text = "🛍 *НОВЫЙ ЗАКАЗ SABLYA COFFEE*\n\n";
        Object.values(cart).forEach(i => {
            text += `• ${i.name} x${i.qty} = ${i.price * i.qty}₽\n`;
        });
        text += `\n💰 *ИТОГО: ${document.getElementById('cart-total').innerText}₽*`;
        text += `\n📍 Способ: ${document.querySelector('input[name="order-type"]:checked').value}`;
        text += `\n👤 Имя: ${document.getElementById('order-name').value}`;
        text += `\n📞 Тел: ${document.getElementById('order-phone').value}`;
        
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`);
    };

    // Бронирование
    document.getElementById('booking-form').onsubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById('book-name').value;
        const date = document.getElementById('book-date').value;
        const time = document.getElementById('book-time').value;
        const guests = document.getElementById('book-guests').value;
        
        let text = `📅 *БРОНЬ СТОЛИКА*\nИмя: ${name}\nДата: ${date}\nВремя: ${time}\nГостей: ${guests}`;
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`);
    };
}
