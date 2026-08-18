const WHATSAPP_NUMBER = "79284567776";

const menuData = [
    { id: 'esp', name: 'Двойной эспрессо', price: 170, volume: '50 мл', category: 'coffee' },
    { id: 'cap', name: 'Капучино', price: 200, volume: '250 мл', category: 'coffee' },
    { id: 'raf_urb', name: 'Раф с урбечом', price: 300, volume: '250 мл', category: 'coffee' },
    { id: 'dubai', name: 'Дубайский раф', price: 320, volume: '250 мл', category: 'coffee' },
    { id: 'sorrel', name: 'Щавелевый лимонад', price: 250, volume: '0.3 л', category: 'lemonades' }
    // Добавьте сюда остальные товары по аналогии
];

const categories = { all: "Все", coffee: "Кофе", lemonades: "Лимонады" };

let cart = {};

document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    setupCart();
    setupForms();
});

function renderMenu() {
    const grid = document.getElementById('menu-grid');
    grid.innerHTML = menuData.map(item => `
        <div class="product-card">
            <h3>${item.name}</h3>
            <p>${item.volume}</p>
            <p><strong>${item.price} ₽</strong></p>
            <button class="btn btn-primary" onclick="addToCart('${item.id}')">+</button>
        </div>
    `).join('');
}

function addToCart(id) {
    const product = menuData.find(p => p.id === id);
    if (cart[id]) {
        cart[id].count++;
    } else {
        cart[id] = { ...product, count: 1 };
    }
    updateCartUI();
}

function updateCartUI() {
    const itemsDiv = document.getElementById('cart-items');
    const countLabel = document.getElementById('cart-count');
    const totalLabel = document.getElementById('cart-total-price');
    
    let total = 0;
    let count = 0;
    
    itemsDiv.innerHTML = Object.values(cart).map(item => {
        total += item.price * item.count;
        count += item.count;
        return `<div class="cart-item">${item.name} x${item.count} — ${item.price * item.count} ₽</div>`;
    }).join('');
    
    countLabel.innerText = count;
    totalLabel.innerText = total;
}

function setupCart() {
    document.getElementById('cart-open').onclick = () => document.getElementById('cart-modal').style.display = 'block';
    document.getElementById('cart-close').onclick = () => document.getElementById('cart-modal').style.display = 'none';
}

function setupForms() {
    // Доставка/В зале переключение
    document.querySelectorAll('input[name="delivery-type"]').forEach(input => {
        input.onchange = (e) => {
            document.getElementById('order-address').classList.toggle('hidden', e.target.value !== 'Доставка');
        };
    });

    // Заказ в WhatsApp
    document.getElementById('order-form').onsubmit = (e) => {
        e.preventDefault();
        let text = "🛍 *ЗАКАЗ SABLYA COFFEE*\n\n";
        Object.values(cart).forEach(i => text += `${i.name} x${i.count} = ${i.price * i.count}₽\n`);
        text += `\n💰 Итого: ${document.getElementById('cart-total-price').innerText}₽`;
        text += `\n📍 Способ: ${document.querySelector('input[name="delivery-type"]:checked').value}`;
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`);
    };

    // Бронь в WhatsApp
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
