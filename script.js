const WHATSAPP_NUMBER = "79284567776";
const INSTAGRAM_URL = "https://www.instagram.com/sabllyaa?utm_source=qr";
const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/LUt8cAMwP643f9Od00mOk7?s=sh&p=a&ilr=1";

const categories = {
    all: "Все",
    coffee: "Кофе",
    milk: "Альт. молоко",
    cold: "Холодный кофе",
    tea: "Чаи классические",
    extras: "Добавки",
    author: "Авторские чаи",
    nocoffee: "Не кофе",
    cocktails: "Коктейли",
    lemonades: "Лимонады",
    smoothie: "Смузи",
    fresh: "Фреши",
    icecream: "Мороженое",
    icetop: "К мороженому"
};

const menuData = [
    { id: "espresso", name: "Двойной эспрессо", category: "coffee", sizes: [{ volume: "50 мл", price: 170 }] },
    { id: "lungo", name: "Лунго", category: "coffee", sizes: [{ volume: "80 мл", price: 170 }] },
    { id: "americano", name: "Американо", category: "coffee", sizes: [{ volume: "180 мл", price: 170 }] },
    { id: "americamble", name: "Америкэмбл", category: "coffee", sizes: [{ volume: "200 мл", price: 200 }] },
    { id: "cappuccino", name: "Капучино", category: "coffee", sizes: [{ volume: "250 мл", price: 200 }, { volume: "350 мл", price: 250 }] },
    { id: "filter", name: "Фильтр", category: "coffee", sizes: [{ volume: "200 мл", price: 180 }, { volume: "300 мл", price: 200 }] },
    { id: "flatwhite", name: "Флэт уайт", category: "coffee", sizes: [{ volume: "250 мл", price: 220 }, { volume: "300 мл", price: 270 }] },
    { id: "latte", name: "Латте", category: "coffee", sizes: [{ volume: "250 мл", price: 220 }, { volume: "350 мл", price: 270 }] },
    { id: "glace", name: "Гляссе", category: "coffee", sizes: [{ volume: "200 мл", price: 250 }] },
    { id: "pelle", name: "Кофе Pelle (легенда из детства)", category: "coffee", isNew: true, sizes: [{ volume: "250 мл", price: 100 }] },
    { id: "glace-choco", name: "Гляссе шоколадный", category: "coffee", sizes: [{ volume: "200 мл", price: 300 }] },
    { id: "mocha", name: "Мокко с натуральным шоколадом", category: "coffee", sizes: [{ volume: "250 мл", price: 250 }, { volume: "350 мл", price: 300 }] },
    { id: "raf-classic", name: "Раф классика (без сахара)", category: "coffee", sizes: [{ volume: "250 мл", price: 300 }, { volume: "350 мл", price: 330 }] },
    { id: "raf-caramel", name: "Раф солёная карамель", category: "coffee", sizes: [{ volume: "250 мл", price: 280 }, { volume: "350 мл", price: 330 }] },
    { id: "raf-orange", name: "Раф красный апельсин", category: "coffee", sizes: [{ volume: "250 мл", price: 280 }, { volume: "350 мл", price: 330 }] },
    { id: "raf-urbech", name: "Раф с урбечом (миндаль/арахис)", category: "coffee", sizes: [{ volume: "250 мл", price: 300 }, { volume: "350 мл", price: 350 }] },
    { id: "raf-snickers", name: "Раф сникерс", category: "coffee", sizes: [{ volume: "250 мл", price: 320 }, { volume: "350 мл", price: 370 }] },
    { id: "raf-date", name: "Раф финиковый", category: "coffee", sizes: [{ volume: "250 мл", price: 300 }, { volume: "350 мл", price: 350 }] },
    { id: "raf-bounty", name: "Раф баунти шоколад-кокос", category: "coffee", sizes: [{ volume: "250 мл", price: 320 }, { volume: "350 мл", price: 370 }] },
    { id: "raf-dubai", name: "Дубайский раф шоколад-фисташка", category: "coffee", isNew: true, sizes: [{ volume: "250 мл", price: 320 }, { volume: "350 мл", price: 370 }] },

    { id: "milk-coco", name: "Кокосовое молоко", category: "milk", sizes: [{ volume: "добавка", price: 50 }] },
    { id: "milk-almond", name: "Миндальное молоко", category: "milk", sizes: [{ volume: "добавка", price: 50 }] },
    { id: "milk-banana", name: "Банановое молоко", category: "milk", sizes: [{ volume: "добавка", price: 50 }] },
    { id: "syrup", name: "Сироп", category: "milk", sizes: [{ volume: "добавка", price: 30 }] },

    { id: "ice-coffee", name: "Айс кофе", category: "cold", sizes: [{ volume: "350 мл", price: 280 }] },
    { id: "ice-urbech", name: "Айс кофе с урбечом", category: "cold", sizes: [{ volume: "350 мл", price: 330 }] },
    { id: "ice-latte", name: "Айс латте", category: "cold", sizes: [{ volume: "270 мл", price: 280 }] },
    { id: "cold-brew", name: "Колд брю в бутылке", category: "cold", sizes: [{ volume: "250 мл", price: 250 }] },
    { id: "tonic-classic", name: "Эспрессо тоник классика", category: "cold", sizes: [{ volume: "270 мл", price: 250 }] },
    { id: "tonic-citrus", name: "Тоник цитрус", category: "cold", sizes: [{ volume: "270 мл", price: 320 }] },
    { id: "bumble", name: "Бамбл на апельсиновом фреше", category: "cold", sizes: [{ volume: "270 мл", price: 320 }] },

    { id: "tea-assam", name: "Чёрный чай Ассам", category: "tea", sizes: [{ volume: "0.3 л", price: 80 }, { volume: "1 л", price: 250 }] },
    { id: "tea-sencha", name: "Зелёный китайский чай Сенча", category: "tea", sizes: [{ volume: "0.3 л", price: 80 }, { volume: "1 л", price: 250 }] },
    { id: "tea-seven", name: "Сбор семь трав", category: "tea", sizes: [{ volume: "0.3 л", price: 100 }, { volume: "1 л", price: 280 }] },
    { id: "tea-taiga", name: "Таёжный сбор", category: "tea", sizes: [{ volume: "0.3 л", price: 100 }, { volume: "1 л", price: 280 }] },
    { id: "tea-oolong", name: "Молочный улун", category: "tea", sizes: [{ volume: "0.3 л", price: 100 }, { volume: "1 л", price: 280 }] },

    { id: "thyme", name: "Чабрец", category: "extras", sizes: [{ volume: "добавка", price: 30 }] },
    { id: "lemon", name: "Лимон", category: "extras", sizes: [{ volume: "добавка", price: 30 }] },
    { id: "ginger", name: "Имбирь", category: "extras", sizes: [{ volume: "добавка", price: 30 }] },
    { id: "clove", name: "Гвоздика", category: "extras", sizes: [{ volume: "добавка", price: 30 }] },
    { id: "mint", name: "Мята", category: "extras", sizes: [{ volume: "добавка", price: 30 }] },
    { id: "cumin", name: "Тмин", category: "extras", sizes: [{ volume: "добавка", price: 30 }] },

    { id: "tea-oblep", name: "Облепиховый", category: "author", sizes: [{ volume: "350 мл", price: 280 }, { volume: "1 л", price: 550 }] },
    { id: "tea-rasp", name: "Малина-имбирь", category: "author", sizes: [{ volume: "350 мл", price: 250 }, { volume: "1 л", price: 450 }] },
    { id: "tea-ginger-lemon", name: "Имбирно-лимонный с мёдом", category: "author", sizes: [{ volume: "350 мл", price: 250 }, { volume: "1 л", price: 450 }] },

    { id: "cacao", name: "Какао турецкий (с бельгийским шоколадом)", category: "nocoffee", sizes: [{ volume: "250 мл", price: 220 }, { volume: "350 мл", price: 270 }] },
    { id: "callebaut", name: "Горячий шоколад Калебаут", category: "nocoffee", sizes: [{ volume: "90 мл", price: 200 }] },
    { id: "corn", name: "Вареная кукуруза в стакане", category: "nocoffee", isNew: true, sizes: [{ volume: "300 г", price: 250 }] },
    { id: "kalmyk", name: "Настоящий калмыцкий чай (на молоке)", category: "nocoffee", sizes: [{ volume: "350 мл", price: 250 }] },

    { id: "cock-milk", name: "Молочный", category: "cocktails", sizes: [{ volume: "350 мл", price: 250 }] },
    { id: "cock-choco", name: "Шоколадный", category: "cocktails", sizes: [{ volume: "350 мл", price: 300 }] },
    { id: "cock-milk-ban", name: "Молочно-банановый", category: "cocktails", sizes: [{ volume: "350 мл", price: 300 }] },
    { id: "cock-choco-ban", name: "Шоколад-банан", category: "cocktails", sizes: [{ volume: "350 мл", price: 300 }] },
    { id: "cock-straw", name: "Клубничный", category: "cocktails", sizes: [{ volume: "350 мл", price: 300 }] },
    { id: "cock-date-ban", name: "Финиково-банановый", category: "cocktails", sizes: [{ volume: "350 мл", price: 320 }] },
    { id: "cock-straw-ban", name: "Клубника-банан", category: "cocktails", sizes: [{ volume: "350 мл", price: 320 }] },
    { id: "cock-date", name: "Финиковый", category: "cocktails", sizes: [{ volume: "350 мл", price: 300 }] },
    { id: "cock-snickers", name: "Сникерс", category: "cocktails", sizes: [{ volume: "350 мл", price: 370 }] },
    { id: "cock-cookie", name: "Черничное печенье", category: "cocktails", sizes: [{ volume: "350 мл", price: 370 }] },

    { id: "lem-sorrel", name: "Щавелевый", category: "lemonades", sizes: [{ volume: "0.3 л", price: 250 }, { volume: "1 л", price: 600 }] },
    { id: "lem-sorrel-apple", name: "Щавель-яблоко", category: "lemonades", sizes: [{ volume: "0.3 л", price: 250 }, { volume: "1 л", price: 600 }] },
    { id: "lem-sorrel-orange", name: "Щавель-апельсин", category: "lemonades", sizes: [{ volume: "0.3 л", price: 350 }, { volume: "1 л", price: 600 }] },
    { id: "lem-mojito", name: "Мохито классика", category: "lemonades", sizes: [{ volume: "0.3 л", price: 250 }, { volume: "1 л", price: 600 }] },
    { id: "lem-mojito-straw", name: "Мохито клубника", category: "lemonades", sizes: [{ volume: "0.3 л", price: 250 }, { volume: "1 л", price: 600 }] },
    { id: "lem-berry", name: "Ягодный", category: "lemonades", sizes: [{ volume: "0.3 л", price: 250 }, { volume: "1 л", price: 600 }] },
    { id: "lem-lagoon", name: "Голубая лагуна", category: "lemonades", sizes: [{ volume: "0.3 л", price: 250 }, { volume: "1 л", price: 600 }] },
    { id: "lem-rasp", name: "Малина-имбирь", category: "lemonades", sizes: [{ volume: "0.3 л", price: 250 }, { volume: "1 л", price: 600 }] },
    { id: "lem-pist", name: "Малина-фисташка", category: "lemonades", sizes: [{ volume: "0.3 л", price: 250 }, { volume: "1 л", price: 600 }] },
    { id: "lem-granate", name: "Гранат-апельсин", category: "lemonades", sizes: [{ volume: "0.3 л", price: 250 }, { volume: "1 л", price: 600 }] },

    { id: "smo-berry", name: "Ягодный смузи", category: "smoothie", sizes: [{ volume: "350 мл", price: 350 }] },
    { id: "smo-straw", name: "Клубника-банан", category: "smoothie", sizes: [{ volume: "350 мл", price: 350 }] },
    { id: "smo-apple", name: "Банан-яблоко", category: "smoothie", sizes: [{ volume: "350 мл", price: 350 }] },

    { id: "fresh-orange", name: "Апельсиновый фреш", category: "fresh", sizes: [{ volume: "300 мл", price: 300 }] },
    { id: "fresh-apple", name: "Яблочный фреш", category: "fresh", sizes: [{ volume: "300 мл", price: 300 }] },
    { id: "fresh-mix", name: "Яблоко-апельсин", category: "fresh", sizes: [{ volume: "300 мл", price: 300 }] },

    { id: "ice-cream-van", name: "Сливочное мороженое", category: "icecream", sizes: [{ volume: "55 г", price: 60 }] },
    { id: "ice-cream-choco", name: "Шоколадное мороженое", category: "icecream", sizes: [{ volume: "55 г", price: 60 }] },
    { id: "ice-cream-straw", name: "Клубничное мороженое", category: "icecream", sizes: [{ volume: "55 г", price: 60 }] },
    { id: "ice-cream-ban", name: "Банановое мороженое", category: "icecream", sizes: [{ volume: "55 г", price: 60 }] },

    { id: "nuts", name: "Орехи", category: "icetop", sizes: [{ volume: "добавка", price: 40 }] },
    { id: "topping", name: "Топинг шоколад и клубника", category: "icetop", sizes: [{ volume: "добавка", price: 30 }] }
];

const cart = {};
let currentCategory = "all";

function cartKey(id, volume) {
    return id + "__" + volume;
}

function addToCart(id, sizeIndex) {
    const product = menuData.find((item) => item.id === id);
    if (!product) return;
    const size = product.sizes[sizeIndex];
    if (!size) return;

    const key = cartKey(id, size.volume);
    if (cart[key]) {
        cart[key].count += 1;
    } else {
        cart[key] = {
            key,
            id: product.id,
            name: product.name,
            volume: size.volume,
            price: size.price,
            count: 1
        };
    }
    updateCartUI();
    showToast(product.name + " добавлен в заказ");
}

function changeQty(key, delta) {
    if (!cart[key]) return;
    cart[key].count += delta;
    if (cart[key].count <= 0) delete cart[key];
    updateCartUI();
}

function removeItem(key) {
    delete cart[key];
    updateCartUI();
}

function clearCart() {
    Object.keys(cart).forEach((key) => delete cart[key]);
    updateCartUI();
}

function getCartList() {
    return Object.values(cart);
}

function getTotals() {
    return getCartList().reduce((acc, item) => {
        acc.count += item.count;
        acc.sum += item.price * item.count;
        return acc;
    }, { count: 0, sum: 0 });
}

function renderCategories() {
    const box = document.getElementById("categories");
    box.innerHTML = Object.entries(categories).map(([id, name]) => {
        return `<button class="cat-btn${id === currentCategory ? " active" : ""}" data-cat="${id}" type="button">${name}</button>`;
    }).join("");
}

function renderMenu() {
    const list = currentCategory === "all"
        ? menuData
        : menuData.filter((item) => item.category === currentCategory);

    document.getElementById("menu-grid").innerHTML = list.map((item) => `
        <article class="product-card">
            ${item.isNew ? '<span class="badge-new">НОВИНКА</span>' : ""}
            <h3>${item.name}</h3>
            <div class="sizes">
                ${item.sizes.map((size, index) => `
                    <button class="size-btn" type="button" data-add="${item.id}" data-size="${index}">
                        <span>${size.volume}</span>
                        <span>${size.price} ₽  +</span>
                    </button>
                `).join("")}
            </div>
        </article>
    `).join("");
}

function updateCartUI() {
    const itemsBox = document.getElementById("cart-items");
    const totals = getTotals();
    const list = getCartList();

    document.getElementById("cart-count").textContent = totals.count;
    document.getElementById("cart-total-price").textContent = totals.sum;

    if (!list.length) {
        itemsBox.innerHTML = "<p>Корзина пуста</p>";
        return;
    }

    itemsBox.innerHTML = list.map((item) => `
        <div class="cart-item">
            <div>
                <strong>${item.name}</strong>
                <div>${item.volume} · ${item.price} ₽ × ${item.count}</div>
                <div>${item.price * item.count} ₽</div>
            </div>
            <div class="cart-item-controls">
                <button class="qty-btn" type="button" data-minus="${item.key}">−</button>
                <span>${item.count}</span>
                <button class="qty-btn" type="button" data-plus="${item.key}">+</button>
                <button class="remove-btn" type="button" data-remove="${item.key}">✕</button>
            </div>
        </div>
    `).join("");
}

function toggleCart(force) {
    const modal = document.getElementById("cart-modal");
    const shouldOpen = typeof force === "boolean" ? force : !modal.classList.contains("open");
    modal.classList.toggle("open", shouldOpen);
}

function showToast(text) {
    const toast = document.getElementById("toast");
    toast.textContent = text;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 1600);
}

function getDeliveryType() {
    return document.querySelector("input[name='delivery-type']:checked").value;
}

function syncOrderFields() {
    const type = getDeliveryType();
    const address = document.getElementById("order-address");
    const table = document.getElementById("order-table");
    const payment = document.getElementById("payment-wrap");

    address.classList.toggle("hidden", type !== "Доставка");
    address.required = type === "Доставка";
    table.classList.toggle("hidden", type !== "В зале");
    payment.classList.toggle("hidden", type !== "Доставка");
}

function sendOrder(event) {
    event.preventDefault();
    const list = getCartList();
    if (!list.length) {
        showToast("Добавьте товары в корзину");
        return;
    }

    const type = getDeliveryType();
    const name = document.getElementById("order-name").value.trim();
    const phone = document.getElementById("order-phone").value.trim();
    const address = document.getElementById("order-address").value.trim();
    const table = document.getElementById("order-table").value.trim();
    const comment = document.getElementById("order-comment").value.trim();
    const payment = document.getElementById("order-payment").value;
    const totals = getTotals();

    const itemsText = list.map((item) => {
        return `${item.name} (${item.volume}) ×${item.count} — ${item.price * item.count} ₽`;
    }).join("\n");

    let text = `Здравствуйте! Хочу оформить заказ SABLYA COFFEE.\n\n🛍 ЗАКАЗ:\n${itemsText}\n\n💰 ИТОГО: ${totals.sum} ₽\n\n📍 СПОСОБ ПОЛУЧЕНИЯ: ${type}\n👤 ИМЯ: ${name}\n📞 ТЕЛЕФОН: ${phone}`;
    if (type === "Доставка") {
        text += `\n🏠 АДРЕС: ${address}\n💳 ОПЛАТА: ${payment}`;
    }
    if (type === "В зале" && table) text += `\n🍽 СТОЛИК: ${table}`;
    if (comment) text += `\n💬 КОММЕНТАРИЙ: ${comment}`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
}

function sendBooking(event) {
    event.preventDefault();
    const name = document.getElementById("book-name").value.trim();
    const date = document.getElementById("book-date").value;
    const time = document.getElementById("book-time").value;
    const guests = document.getElementById("book-guests").value;
    const comment = document.getElementById("book-comment").value.trim();

    let text = `Здравствуйте! Хочу забронировать столик в SABLYA COFFEE.\n\nИмя: ${name}\nДата: ${date}\nВремя: ${time}\nКоличество гостей: ${guests}`;
    if (comment) text += `\nКомментарий: ${comment}`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
}

function init() {
    if (window.__sablyaInit) return;
    window.__sablyaInit = true;

    renderCategories();
    renderMenu();
    updateCartUI();
    syncOrderFields();

    document.getElementById("categories").addEventListener("click", (event) => {
        const btn = event.target.closest("[data-cat]");
        if (!btn) return;
        currentCategory = btn.dataset.cat;
        renderCategories();
        renderMenu();
    });

    document.getElementById("menu-grid").addEventListener("click", (event) => {
        const btn = event.target.closest("[data-add]");
        if (!btn) return;
        addToCart(btn.dataset.add, Number(btn.dataset.size));
    });

    document.getElementById("cart-items").addEventListener("click", (event) => {
        const plus = event.target.closest("[data-plus]");
        const minus = event.target.closest("[data-minus]");
        const remove = event.target.closest("[data-remove]");
        if (plus) changeQty(plus.dataset.plus, 1);
        if (minus) changeQty(minus.dataset.minus, -1);
        if (remove) removeItem(remove.dataset.remove);
    });

    document.getElementById("cart-open").addEventListener("click", () => toggleCart(true));
    document.getElementById("cart-close").addEventListener("click", () => toggleCart(false));
    document.getElementById("hero-order").addEventListener("click", () => toggleCart(true));
    document.getElementById("clear-cart").addEventListener("click", clearCart);
    document.getElementById("order-form").addEventListener("submit", sendOrder);
    document.getElementById("booking-form").addEventListener("submit", sendBooking);
    document.getElementById("cart-modal").addEventListener("click", (event) => {
        if (event.target.id === "cart-modal") toggleCart(false);
    });

    document.querySelectorAll("input[name='delivery-type']").forEach((input) => {
        input.addEventListener("change", syncOrderFields);
    });

    const burger = document.getElementById("burger");
    const nav = document.getElementById("nav");
    burger.addEventListener("click", () => nav.classList.toggle("open"));
    nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => nav.classList.remove("open"));
    });
}

document.addEventListener("DOMContentLoaded", init);
