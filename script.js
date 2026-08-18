// ==========================================
// 1. ДАННЫЕ МЕНЮ (МАССИВ ТОВАРОВ)
// ==========================================
const products = [
    // ГОРЯЧИЙ КОФЕ
    { id: 1, cat: 'hot-coffee', name: 'Двойной эспрессо', desc: 'Крепкий классический эспрессо.', price: 170, vol: '50 мл', img: 'images/espresso.jpg', isNew: false },
    { id: 2, cat: 'hot-coffee', name: 'Лунго', desc: 'Эспрессо с большим количеством воды.', price: 170, vol: '80 мл', img: 'images/lungo.jpg', isNew: false },
    { id: 3, cat: 'hot-coffee', name: 'Американо', desc: 'Мягкий кофейный напиток.', price: 170, vol: '180 мл', img: 'images/americano.jpg', isNew: false },
    { id: 4, cat: 'hot-coffee', name: 'Америкэмбл', desc: 'Фирменный микс американо.', price: 200, vol: '200 мл', img: 'images/americamble.jpg', isNew: true },
    { id: 5, cat: 'hot-coffee', name: 'Капучино', desc: 'Классика с нежной молочной пенкой.', sizes: [{ vol: '250 мл', price: 200 }, { vol: '350 мл', price: 250 }], img: 'images/cappuccino.jpg', isNew: false },
    { id: 6, cat: 'hot-coffee', name: 'Латте', desc: 'Самый нежный кофейно-молочный напиток.', sizes: [{ vol: '250 мл', price: 220 }, { vol: '350 мл', price: 270 }], img: 'images/latte.jpg', isNew: false },
    { id: 7, cat: 'hot-coffee', name: 'Раф классика', desc: 'Сливочный вкус без сахара.', sizes: [{ vol: '250 мл', price: 300 }, { vol: '350 мл', price: 330 }], img: 'images/raf.jpg', isNew: false },
    { id: 8, cat: 'hot-coffee', name: 'Раф с урбечом', desc: 'Уникальный вкус с миндальным урбечом.', sizes: [{ vol: '250 мл', price: 300 }, { vol: '350 мл', price: 350 }], img: 'images/raf-urbech.jpg', isNew: true },
    { id: 9, cat: 'hot-coffee', name: 'Дубайский раф', desc: 'Шоколад и фисташка в одной чашке.', sizes: [{ vol: '250 мл', price: 320 }, { vol: '350 мл', price: 370 }], img: 'images/dubai.jpg', isNew: true },
    
    // ХОЛОДНЫЙ КОФЕ
    { id: 10, cat: 'cold-coffee', name: 'Айс Латте', desc: 'Освежающий кофе со льдом.', price: 280, vol: '270 мл', img: 'images/ice-latte.jpg', isNew: false },
    { id: 11, cat: 'cold-coffee', name: 'Бамбл Фреш', desc: 'Апельсиновый фреш и эспрессо.', price: 320, vol: '270 мл', img: 'images/bumble.jpg', isNew: false },

    // ЛИМОНАДЫ
    { id: 20, cat: 'lemonades', name: 'Щавелевый лимонад', desc: 'Фирменный освежающий вкус.', sizes: [{ vol: '0.3 л', price: 250 }, { vol: '1 л', price: 600 }], img: 'images/lemonade.jpg', isNew: true },
    { id: 21, cat: 'lemonades', name: 'Мохито', desc: 'Лайм, мята, свежесть.', sizes: [{ vol: '0.3 л', price: 250 }, { vol: '1 л', price: 600 }], img: 'images/mojito.jpg', isNew: false },

    // НЕ КОФЕ
    { id: 30, cat: 'no-coffee', name: 'Калмыцкий чай', desc: 'Традиционный чай на молоке.', price: 250, vol: '350 мл', img: 'images/tea.jpg', isNew: false },
    { id: 31, cat: 'no-coffee', name: 'Вареная кукуруза', desc: 'В стакане с солью.', price: 250, vol: '300 гр', img: 'images/corn.jpg', isNew: true },
];

const categories = [
    { id: 'all', name: 'Все' },
    { id: 'hot-coffee', name: 'Горячий кофе' },
    { id: 'cold-coffee', name: 'Холодный кофе' },
    { id: 'tea', name: 'Чаи' },
    { id: 'lemonades', name: 'Лимонады' },
    { id: 'cocktails', name: 'Коктейли' },
    { id: 'no-coffee', name: 'Не кофе' },
    { id: 'icecream', name: 'Мороженое' }
];

// ==========================================
// 2. СОСТОЯНИЕ (STATE)
// ==========================================
let cart = JSON.parse(localStorage.getItem('sablya_cart')) || [];
let activeFilter = 'all';
let searchQuery = '';

// ==========================================
// 3. ИНИЦИАЛИЗАЦИЯ
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    initMenu();
    updateCartUI();
    renderFilters();
    updateStats();
    setupSearch();
});

function initMenu() {
    renderMenu();
}

function updateStats() {
    document.getElementById('stat-total-items').innerText = products.length;
    document.getElementById('stat-total-cats').innerText = categories.length - 1;
}

// ==========================================
// 4. РЕНДЕРИНГ МЕНЮ
// ==========================================
function renderFilters() {
    const filterBox = document.getElementById('category-filters');
    filterBox.innerHTML = categories.map(cat => `
        <button class="cat-btn ${cat.id === activeFilter ? 'active' : ''}" 
                onclick="setFilter('${cat.id}')">${cat.name}</button>
    `).join('');
}

function setFilter(catId) {
    activeFilter = catId;
    renderFilters();
    renderMenu();
}

function renderMenu() {
    const grid = document.getElementById('menu-grid');
    const noResults = document.getElementById('no-results');
    
    let filtered = products.filter(p => {
        const matchesCat = activeFilter === 'all' || p.cat === activeFilter;
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              (p.desc && p.desc.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCat && matchesSearch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = '';
        noResults.classList.remove('hidden');
    } else {
        noResults.classList.add('hidden');
        grid.innerHTML = filtered.map(product => {
            const hasSizes = product.sizes && product.sizes.length > 0;
            const displayPrice = hasSizes ? `от ${product.sizes[0].price} ₽` : `${product.price} ₽`;
            
            return `
                <div class="product-card">
                    <div class="product-img-wrap">
                        ${product.isNew ? '<span class="badge">НОВИНКА</span>' : ''}
                        <img src="${product.img}" alt="${product.name}" class="product-img" onerror="this.src='https://via.placeholder.com/300x200?text=SABLYA+COFFEE'">
                    </div>
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p class="product-desc">${product.desc || ''}</p>
                        <div class="product-meta">
                            <div class="price-row">
                                <span class="price">${displayPrice}</span>
                                <button class="btn btn-primary" onclick="openProductDetail(${product.id})">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
}

// ==========================================
// 5. МОДАЛЬНОЕ ОКНО ТОВАРА
// ==========================================
function openProductDetail(id) {
    const product = products.find(p => p.id === id);
    const modal = document.getElementById('product-modal');
    const body = document.getElementById('product-detail-body');
    
    let optionsHtml = '';
    if (product.sizes) {
        optionsHtml = `
            <div class="size-selection">
                <h4>Выберите объем:</h4>
                <div class="size-btns">
                    ${product.sizes.map((s, idx) => `
                        <button class="btn-size-choice ${idx === 0 ? 'active' : ''}" 
                                onclick="selectSize(this, ${s.price}, '${s.vol}')">
                            ${s.vol} — ${s.price} ₽
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    }

    body.innerHTML = `
        <div class="detail-grid">
            <div class="detail-img">
                <img src="${product.img}" onerror="this.src='https://via.placeholder.com/400x400?text=COFFEE'">
            </div>
            <div class="detail-info">
                <h2>${product.name}</h2>
                <p>${product.desc || 'Натуральные ингредиенты и фирменный вкус.'}</p>
                ${optionsHtml}
                <div class="detail-footer">
                    <input type="hidden" id="selected-price" value="${product.price || (product.sizes ? product.sizes[0].price : 0)}">
                    <input type="hidden" id="selected-vol" value="${product.vol || (product.sizes ? product.sizes[0].vol : '')}">
                    <button class="btn btn-primary full-width" onclick="confirmAddToCart(${product.id})">Добавить в корзину</button>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

function selectSize(btn, price, vol) {
    document.querySelectorAll('.btn-size-choice').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('selected-price').value = price;
    document.getElementById('selected-vol').value = vol;
}

function closeProductModal() {
    document.getElementById('product-modal').style.display = 'none';
}

// ==========================================
// 6. КОРЗИНА (LOGIC)
// ==========================================
function confirmAddToCart(id) {
    const product = products.find(p => p.id === id);
    const price = parseInt(document.getElementById('selected-price').value);
    const vol = document.getElementById('selected-vol').value;
    
    const cartKey = `${id}-${vol}`;
    const existing = cart.find(item => item.cartKey === cartKey);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({
            cartKey: cartKey,
            id: id,
            name: product.name,
            price: price,
            vol: vol,
            qty: 1
        });
    }

    saveCart();
    updateCartUI();
    closeProductModal();
}

function saveCart() {
    localStorage.setItem('sablya_cart', JSON.stringify(cart));
}

function updateCartUI() {
    const counter = document.getElementById('cart-counter');
    const mobileCounter = document.getElementById('cart-counter-mobile');
    const totalAmount = document.getElementById('cart-total-amount');
    const cartList = document.getElementById('cart-items-list');

    const count = cart.reduce((acc, i) => acc + i.qty, 0);
    const total = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);

    counter.innerText = count;
    mobileCounter.innerText = count;
    totalAmount.innerText = `${total} ₽`;

    if (cart.length === 0) {
        cartList.innerHTML = '<div class="empty-cart-msg">Корзина пуста</div>';
    } else {
        cartList.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <strong>${item.name}</strong>
                    <small>${item.vol}</small>
                    <div class="cart-item-qty">
                        <button class="qty-btn" onclick="updateQty('${item.cartKey}', -1)">-</button>
                        <span>${item.qty}</span>
                        <button class="qty-btn" onclick="updateQty('${item.cartKey}', 1)">+</button>
                    </div>
                </div>
                <div class="cart-item-price">${item.price * item.qty} ₽</div>
            </div>
        `).join('');
    }
}

function updateQty(key, delta) {
    const item = cart.find(i => i.cartKey === key);
    if (item) {
        item.qty += delta;
        if (item.qty <= 0) {
            cart = cart.filter(i => i.cartKey !== key);
        }
    }
    saveCart();
    updateCartUI();
}

function clearCart() {
    cart = [];
    saveCart();
    updateCartUI();
}

function openCart() { document.getElementById('cart-modal').style.display = 'block'; }
function closeCart() { document.getElementById('cart-modal').style.display = 'none'; }

// ==========================================
// 7. ПОИСК
// ==========================================
function setupSearch() {
    const searchInput = document.getElementById('menu-search');
    const clearBtn = document.getElementById('clear-search');

    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        clearBtn.classList.toggle('hidden', searchQuery.length === 0);
        renderMenu();
    });

    clearBtn.addEventListener('click', resetSearch);
}

function resetSearch() {
    const searchInput = document.getElementById('menu-search');
    searchInput.value = '';
    searchQuery = '';
    document.getElementById('clear-search').classList.add('hidden');
    renderMenu();
}

// ==========================================
// 8. ОТПРАВКА ЗАКАЗА
// ==========================================
function submitOrder() {
    if (cart.length === 0) return alert('Ваша корзина пуста');

    const type = document.querySelector('input[name="order-type"]:checked').value;
    const address = document.getElementById('delivery-address').value;
    const comment = document.getElementById('order-comment').value;
    const total = document.getElementById('cart-total-amount').innerText;

    let message = `Здравствуйте! Хочу оформить заказ в *SABLYA COFFEE*.\n\n`;
    message += `📍 *Тип заказа:* ${type}\n`;
    if (type === 'Доставка' && address) message += `🏠 *Адрес:* ${address}\n`;
    message += `\n🛍 *ЗАКАЗ:*\n`;

    cart.forEach(item => {
        message += `• ${item.name} (${item.vol}) — ${item.qty} шт. = ${item.price * item.qty} ₽\n`;
    });

    message += `\n💰 *ИТОГО: ${total}*`;
    if (comment) message += `\n\n💬 *Комментарий:* ${comment}`;

    const waLink = `https://wa.me/79284567776?text=${encodeURIComponent(message)}`;
    window.open(waLink, '_blank');
}

// Переключение поля адреса
document.querySelectorAll('input[name="order-type"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        document.getElementById('delivery-fields').classList.toggle('hidden', e.target.value !== 'Доставка');
    });
});
