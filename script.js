const WHATSAPP_NUMBER = "79284567776";

// ПОЛНЫЙ МАССИВ ТОВАРОВ (ПОЛНОЕ МЕНЮ)
const products = [
    // ГОРЯЧИЙ КОФЕ
    { id: 1, cat: 'coffee', name: 'Двойной эспрессо', price: 170, vol: '50 мл', desc: 'Крепкий классический эспрессо.' },
    { id: 2, cat: 'coffee', name: 'Лунго', price: 170, vol: '80 мл', desc: 'Эспрессо с большим количеством воды.' },
    { id: 3, cat: 'coffee', name: 'Американо', price: 170, vol: '180 мл', desc: 'Классический черный кофе.' },
    { id: 4, cat: 'coffee', name: 'Америкэмбл', price: 200, vol: '200 мл', desc: 'Фирменная вариация американо.' },
    { id: 5, cat: 'coffee', name: 'Капучино', price: 200, vol: '250 мл', desc: 'Эспрессо с нежной молочной пеной.' },
    { id: 6, cat: 'coffee', name: 'Капучино XL', price: 250, vol: '350 мл', desc: 'Большая порция любимого напитка.' },
    { id: 7, cat: 'coffee', name: 'Латте', price: 220, vol: '250 мл', desc: 'Сливочный молочный напиток с кофе.' },
    { id: 8, cat: 'coffee', name: 'Раф классика', price: 300, vol: '250 мл', desc: 'Кофе на сливках без сахара.' },
    { id: 9, cat: 'coffee', name: 'Раф с урбечом', price: 300, vol: '250 мл', desc: 'Авторский вкус с миндальным урбечом.' },
    { id: 10, cat: 'coffee', name: 'Дубайский раф', price: 320, vol: '250 мл', desc: 'Шоколадно-фисташковый вкус.' },

    // ХОЛОДНЫЙ КОФЕ
    { id: 11, cat: 'cold-coffee', name: 'Айс Латте', price: 280, vol: '270 мл', desc: 'Охлажденный латте со льдом.' },
    { id: 12, cat: 'cold-coffee', name: 'Бамбл Фреш', price: 320, vol: '270 мл', desc: 'Слоистый напиток с апельсиновым соком.' },

    // ЛИМОНАДЫ
    { id: 13, cat: 'lemonades', name: 'Щавелевый лимонад', price: 250, vol: '0.3 л', desc: 'Уникальный кисло-сладкий лимонад.' },
    { id: 14, cat: 'lemonades', name: 'Мохито Классика', price: 250, vol: '0.3 л', desc: 'Лайм, мята, свежесть.' },
    { id: 15, cat: 'lemonades', name: 'Гранат-Апельсин', price: 250, vol: '0.3 л', desc: 'Яркий фруктовый микс.' },

    // КОКТЕЙЛИ
    { id: 16, cat: 'cocktails', name: 'Сникерс коктейль', price: 370, vol: '350 мл', desc: 'Арахис, нуга, шоколад.' },
    { id: 17, cat: 'cocktails', name: 'Черничное печенье', price: 370, vol: '350 мл', desc: 'Вкус домашнего уюта.' },

    // НЕ КОФЕ
    { id: 18, cat: 'no-coffee', name: 'Калмыцкий чай', price: 250, vol: '350 мл', desc: 'Настоящий чай на молоке с солью.' },
    { id: 19, cat: 'no-coffee', name: 'Вареная кукуруза', price: 250, vol: '300 гр', desc: 'В стакане со сливочным маслом.' }
];

const categories = {
    all: 'Все',
    coffee: 'Кофе',
    'cold-coffee': 'Холодный кофе',
    lemonades: 'Лимонады',
    cocktails: 'Коктейли',
    'no-coffee': 'Не кофе'
};

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let activeCat = 'all';
let searchText = '';

// Рендер меню
function renderMenu() {
    const grid = document.getElementById('menu-grid');
    const noRes = document.getElementById('no-results');
    
    const filtered = products.filter(p => {
        const matchesCat = activeCat === 'all' || p.cat === activeCat;
        const matchesSearch = p.name.toLowerCase().includes(searchText.toLowerCase());
        return matchesCat && matchesSearch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = '';
        noRes.classList.remove('hidden');
    } else {
        noRes.classList.add('hidden');
        grid.innerHTML = filtered.map(p => `
            <div class="product-card">
                <h3>${p.name}</h3>
                <p class="product-desc">${p.desc}</p>
                <div class="product-footer">
                    <div>
                        <span class="price">${p.price} ₽</span><br>
                        <small>${p.vol}</small>
                    </div>
                    <button class="btn btn-dark" onclick="addToCart(${p.id})">Добавить</button>
                </div>
            </div>
        `).join('');
    }
}

// Корзина
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    updateCart();
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    const counter = document.getElementById('cart-counter');
    const mCounter = document.getElementById('m-cart-count');
    const totalSum = document.getElementById('cart-total-sum');
    const list = document.getElementById('cart-items');

    const totalQty = cart.reduce((acc, i) => acc + i.qty, 0);
    const totalMoney = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);

    counter.innerText = totalQty;
    mCounter.innerText = totalQty;
    totalSum.innerText = totalMoney;

    list.innerHTML = cart.map(i => `
        <div class="cart-item">
            <div>
                <strong>${i.name}</strong><br>
                <small>${i.price} ₽ x ${i.qty}</small>
            </div>
            <div class="qty-control">
                <button onclick="changeQty(${i.id}, -1)">-</button>
                <button onclick="changeQty(${i.id}, 1)">+</button>
            </div>
        </div>
    `).join('');
}

function changeQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty += delta;
        if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
    }
    updateCart();
}

function toggleCart(show) {
    document.getElementById('cart-modal').style.display = show ? 'block' : 'none';
}

// Поиск и фильтры
function renderFilters() {
    const bar = document.getElementById('category-filters');
    bar.innerHTML = Object.entries(categories).map(([id, name]) => `
        <button class="cat-btn ${id === activeCat ? 'active' : ''}" onclick="setCategory('${id}')">${name}</button>
    `).join('');
}

function setCategory(id) {
    activeCat = id;
    renderFilters();
    renderMenu();
}

document.getElementById('menu-search').oninput = (e) => {
    searchText = e.target.value;
    renderMenu();
};

function resetSearch() {
    document.getElementById('menu-search').value = '';
    searchText = '';
    renderMenu();
}

// WhatsApp Заказ
document.getElementById('order-form').onsubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert('Корзина пуста');
    
    const type = document.querySelector('input[name="order-type"]:checked').value;
    const name = document.getElementById('order-name').value;
    const phone = document.getElementById('order-phone').value;
    const addr = document.getElementById('order-address').value;
    const comm = document.getElementById('order-comment').value;

    let text = `Здравствуйте! Заказ SABLYA COFFEE.\n\n`;
    text += `Тип: ${type}\n`;
    cart.forEach(i => text += `• ${i.name} x${i.qty} = ${i.price * i.qty}₽\n`);
    text += `\nИТОГО: ${document.getElementById('cart-total-sum').innerText}₽\n`;
    text += `\nИмя: ${name}\nТел: ${phone}`;
    if(type === 'Доставка') text += `\nАдрес: ${addr}`;
    if(comm) text += `\nКоммент: ${comm}`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`);
};

// Бронирование
document.getElementById('booking-form').onsubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById('book-name').value;
    const guests = document.getElementById('book-guests').value;
    const date = document.getElementById('book-date').value;
    const time = document.getElementById('book-time').value;
    const comm = document.getElementById('book-comment').value;

    let text = `Здравствуйте! Бронь столика в SABLYA COFFEE.\n\n`;
    text += `Имя: ${name}\nГостей: ${guests}\nДата: ${date}\nВремя: ${time}\n`;
    if(comm) text += `Коммент: ${comm}`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`);
};

// Тип заказа (показ адреса)
document.querySelectorAll('input[name="order-type"]').forEach(radio => {
    radio.onchange = (e) => {
        document.getElementById('order-address').classList.toggle('hidden', e.target.value !== 'Доставка');
    };
});

// Отзывы
const reviews = [
    { name: 'Магомед', stars: 5, text: 'Лучший раф с урбечом, который я пробовал!' },
    { name: 'Алина', stars: 5, text: 'Очень уютная атмосфера и приветливый персонал.' }
];

function renderReviews() {
    const list = document.getElementById('reviews-list');
    list.innerHTML = reviews.map(r => `
        <div class="review-item">
            <div class="rev-meta">
                <span>${r.name}</span>
                <span class="rev-stars">${'★'.repeat(r.stars)}</span>
            </div>
            <p>${r.text}</p>
        </div>
    `).join('');
}

function toggleReviewForm(show) {
    document.getElementById('review-modal').style.display = show ? 'block' : 'none';
}

document.getElementById('review-form').onsubmit = (e) => {
    e.preventDefault();
    alert('Спасибо! Ваш отзыв отправлен на модерацию.');
    toggleReviewForm(false);
};

// Init
renderFilters();
renderMenu();
updateCart();
renderReviews();
