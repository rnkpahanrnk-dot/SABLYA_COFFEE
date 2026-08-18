/* ==========================================================================
   SABLYA COFFEE — логика сайта
   --------------------------------------------------------------------------
   Все данные меню — в одном массиве `products` внизу файла.
   Чтобы изменить название, цену, объём или добавить товар —
   достаточно отредактировать нужную запись массива.
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------
     1. НАСТРОЙКИ (контакты кофейни)
     ------------------------------------------------------------------ */
  var CONFIG = {
    // Номер кофейни для приёма заказов и брони (WhatsApp, без + и скобок)
    whatsappNumber: "79284567776",
    // Групповая ссылка — используется ТОЛЬКО для кнопки «Наш WhatsApp»
    whatsappGroup: "https://chat.whatsapp.com/LUt8cAMwP643f9Od00mOk7?s=sh&p=a&ilr=1",
    instagram: "https://www.instagram.com/sabllyaa?utm_source=qr",
    phoneDisplay: "+7 (928) 456-77-76",
    phoneHref: "tel:+79284567776",
    address: "Бабаюрт, ул. Ирчи Казака, 54",
    routeUrl:
      "https://yandex.ru/maps/?text=%D0%91%D0%B0%D0%B1%D0%B0%D1%8E%D1%80%D1%82%2C%20%D1%83%D0%BB.%20%D0%98%D1%80%D1%87%D0%B8%20%D0%9A%D0%B0%D0%B7%D0%B0%D0%BA%D0%B0%2C%2054",
  };

  /* ------------------------------------------------------------------
     2. КАТЕГОРИИ МЕНЮ (количество считаем автоматически)
     ------------------------------------------------------------------ */
  var categories = [
    { id: "all", label: "Все" },
    { id: "coffee", label: "Кофе" },
    { id: "alt-milk", label: "Альтернативное молоко" },
    { id: "cold-coffee", label: "Холодный кофе" },
    { id: "tea", label: "Чай" },
    { id: "tea-addons", label: "Добавки" },
    { id: "signature-tea", label: "Авторские чаи" },
    { id: "non-coffee", label: "Не кофе" },
    { id: "cocktails", label: "Коктейли" },
    { id: "lemonades", label: "Лимонады" },
    { id: "smoothies", label: "Смузи" },
    { id: "fresh", label: "Фреши" },
    { id: "icecream", label: "Мороженое" },
    { id: "icecream-addons", label: "Добавки к мороженому" },
  ];

  /* ------------------------------------------------------------------
     3. ДОБАВКИ, которые можно выбрать в карточке товара
     ------------------------------------------------------------------ */
  var ADDONS = {
    milk: [
      { name: "Кокосовое молоко", price: 50 },
      { name: "Миндальное молоко", price: 50 },
      { name: "Банановое молоко", price: 50 },
    ],
    syrup: [{ name: "Сироп", price: 30 }],
    tea: [
      { name: "Чабрец, лимон, имбирь", price: 30 },
      { name: "Гвоздика, мята, тмин", price: 30 },
    ],
    ice: [
      { name: "Орехи", price: 40 },
      { name: "Топинг шоколад и клубника", price: 30 },
    ],
  };

  var ADDON_GROUP_LABELS = {
    milk: "Альтернативное молоко",
    syrup: "Сиропы",
    tea: "Добавки к чаю",
    ice: "Добавки к мороженому",
  };

  /* ------------------------------------------------------------------
     4. ПОЛНОЕ МЕНЮ — 77 позиций с фотографии меню SABLYA COFFEE
        (id — уникальный номер; category — категория; sizes — объёмы и цены;
         desc — краткое описание; image — необязательное фото, можно не указывать)
     ------------------------------------------------------------------ */
  var products = [
    // ---------- КОФЕ ----------
    { id: 1, category: "coffee", name: "Двойной эспрессо", desc: "Плотный, насыщенный, с характером", sizes: [{ volume: "50 мл", price: 170 }] },
    { id: 2, category: "coffee", name: "Лунго", desc: "Мягкий лунго с деликатным вкусом", sizes: [{ volume: "80 мл", price: 170 }] },
    { id: 3, category: "coffee", name: "Американо", desc: "Классическая бодрость на весь день", sizes: [{ volume: "180 мл", price: 170 }] },
    { id: 4, category: "coffee", name: "Америкэмбл", desc: "Авторский напиток с глубоким вкусом", sizes: [{ volume: "200 мл", price: 200 }] },
    { id: 5, category: "coffee", name: "Капучино", desc: "Нежная молочная пена и крепкий кофе", sizes: [{ volume: "250 мл", price: 200 }, { volume: "350 мл", price: 250 }] },
    { id: 6, category: "coffee", name: "Фильтр", desc: "Чистый кофе альтернативного заваривания", sizes: [{ volume: "200 мл", price: 180 }, { volume: "300 мл", price: 200 }] },
    { id: 7, category: "coffee", name: "Флэт уайт", desc: "Двойной эспрессо с шелковистым молоком", sizes: [{ volume: "250 мл", price: 220 }, { volume: "300 мл", price: 270 }] },
    { id: 8, category: "coffee", name: "Латте", desc: "Мягкий и сливочный — любимый многими", sizes: [{ volume: "250 мл", price: 220 }, { volume: "350 мл", price: 270 }] },
    { id: 9, category: "coffee", name: "Гляссе", desc: "Эспрессо с нежным мороженым", sizes: [{ volume: "200 мл", price: 250 }] },
    { id: 10, category: "coffee", name: "Кофе Pelle (легенда из детства)", desc: "Тёплый напиток со вкусом детства", sizes: [{ volume: "250 мл", price: 100 }] },
    { id: 11, category: "coffee", name: "Гляссе шоколадный", desc: "Эспрессо с шоколадным мороженым", sizes: [{ volume: "200 мл", price: 300 }] },
    { id: 12, category: "coffee", name: "Мокко с натуральным шоколадом", desc: "Кофе, молоко и настоящий шоколад", sizes: [{ volume: "250 мл", price: 250 }, { volume: "350 мл", price: 300 }] },
    { id: 13, category: "coffee", name: "Раф классика (без сахара)", desc: "Нежный сливочный раф без сахара", sizes: [{ volume: "250 мл", price: 300 }, { volume: "350 мл", price: 330 }] },
    { id: 14, category: "coffee", name: "Раф солёная карамель", desc: "Карамель и щепотка соли в сливках", sizes: [{ volume: "250 мл", price: 280 }, { volume: "350 мл", price: 330 }] },
    { id: 15, category: "coffee", name: "Раф красный апельсин", desc: "Свежий апельсин в нежном рафе", sizes: [{ volume: "250 мл", price: 280 }, { volume: "350 мл", price: 330 }] },
    { id: 16, category: "coffee", name: "Раф с урбечом (миндаль/арахис)", desc: "Сливочный раф с пастой урбеч", sizes: [{ volume: "250 мл", price: 300 }, { volume: "350 мл", price: 350 }] },
    { id: 17, category: "coffee", name: "Раф Сникерс", desc: "Арахис, карамель и шоколад", sizes: [{ volume: "250 мл", price: 320 }, { volume: "350 мл", price: 370 }] },
    { id: 18, category: "coffee", name: "Раф финиковый", desc: "Натуральная сладость фиников", sizes: [{ volume: "250 мл", price: 300 }, { volume: "350 мл", price: 350 }] },
    { id: 19, category: "coffee", name: "Раф Баунти шоколад-кокос", desc: "Кокос и шоколад в бархатной пенке", sizes: [{ volume: "250 мл", price: 320 }, { volume: "350 мл", price: 370 }] },
    { id: 20, category: "coffee", name: "Дубайский раф шоколад-фисташка", desc: "Авторский вкус: фисташка и шоколад", sizes: [{ volume: "250 мл", price: 320 }, { volume: "350 мл", price: 370 }] },

    // ---------- АЛЬТЕРНАТИВНОЕ МОЛОКО ----------
    { id: 21, category: "alt-milk", name: "Кокосовое молоко", desc: "Растительная альтернатива для кофе", sizes: [{ volume: "порция", price: 50 }] },
    { id: 22, category: "alt-milk", name: "Миндальное молоко", desc: "Мягкий миндальный вкус", sizes: [{ volume: "порция", price: 50 }] },
    { id: 23, category: "alt-milk", name: "Банановое молоко", desc: "Сладкая банановая нота", sizes: [{ volume: "порция", price: 50 }] },
    { id: 24, category: "alt-milk", name: "Сиропы", desc: "Добавьте любимый сироп в напиток", sizes: [{ volume: "порция", price: 30 }] },

    // ---------- ХОЛОДНЫЙ КОФЕ ----------
    { id: 25, category: "cold-coffee", name: "Айс кофе", desc: "Освежающий кофе со льдом", sizes: [{ volume: "350 мл", price: 280 }] },
    { id: 26, category: "cold-coffee", name: "Айс кофе с урбечом", desc: "Кофе со льдом и пастой урбеч", sizes: [{ volume: "350 мл", price: 330 }] },
    { id: 27, category: "cold-coffee", name: "Айс латте", desc: "Ледяное молоко и двойной эспрессо", sizes: [{ volume: "270 мл", price: 280 }] },
    { id: 28, category: "cold-coffee", name: "Колд брю в бутылке", desc: "Медленная экстракция на холоде", sizes: [{ volume: "250 мл", price: 250 }] },
    { id: 29, category: "cold-coffee", name: "Эспрессо тоник классика", desc: "Эспрессо и тоник со льдом", sizes: [{ volume: "270 мл", price: 250 }] },
    { id: 30, category: "cold-coffee", name: "Тоник цитрус", desc: "Цитрусовая свежесть и эспрессо", sizes: [{ volume: "270 мл", price: 320 }] },
    { id: 31, category: "cold-coffee", name: "Бамбл на апельсиновом фреше", desc: "Фреш, эспрессо и тоник — ярко", sizes: [{ volume: "270 мл", price: 320 }] },

    // ---------- ЧАЙ «КЛАССИЧЕСКИЕ» ----------
    { id: 32, category: "tea", name: "Чёрный чай Ассам", desc: "Крепкий классический чёрный чай", sizes: [{ volume: "0,3 л", price: 80 }, { volume: "1 л", price: 250 }] },
    { id: 33, category: "tea", name: "Зелёный китайский чай Сенча", desc: "Свежий зелёный чай с мягким вкусом", sizes: [{ volume: "0,3 л", price: 80 }, { volume: "1 л", price: 250 }] },
    { id: 34, category: "tea", name: "Сбор семь трав", desc: "Ароматный травяной сбор", sizes: [{ volume: "0,3 л", price: 100 }, { volume: "1 л", price: 280 }] },
    { id: 35, category: "tea", name: "Таёжный сбор", desc: "Травы с лёгким духом тайги", sizes: [{ volume: "0,3 л", price: 100 }, { volume: "1 л", price: 280 }] },
    { id: 36, category: "tea", name: "Молочный улун", desc: "Нежный сливочный улун", sizes: [{ volume: "0,3 л", price: 100 }, { volume: "1 л", price: 280 }] },

    // ---------- ДОБАВКИ (к чаю) ----------
    { id: 37, category: "tea-addons", name: "Чабрец, лимон, имбирь", desc: "Ароматная добавка к чаю", sizes: [{ volume: "порция", price: 30 }] },
    { id: 38, category: "tea-addons", name: "Гвоздика, мята, тмин", desc: "Пряная добавка к чаю", sizes: [{ volume: "порция", price: 30 }] },

    // ---------- АВТОРСКИЕ ЧАИ ----------
    { id: 39, category: "signature-tea", name: "Облепиховый", desc: "Яркий, тёплый, витаминный", sizes: [{ volume: "350 мл", price: 280 }, { volume: "1 л", price: 550 }] },
    { id: 40, category: "signature-tea", name: "Малина-имбирь", desc: "Ягоды и имбирная нотка", sizes: [{ volume: "350 мл", price: 250 }, { volume: "1 л", price: 450 }] },
    { id: 41, category: "signature-tea", name: "Имбирно-лимонный с мёдом", desc: "Согревающий, с натуральным мёдом", sizes: [{ volume: "350 мл", price: 250 }, { volume: "1 л", price: 450 }] },

    // ---------- НЕ КОФЕ ----------
    { id: 42, category: "non-coffee", name: "Какао турецкий (с бельгийским шоколадом)", desc: "Густое какао с бельгийским шоколадом", sizes: [{ volume: "250 мл", price: 220 }, { volume: "350 мл", price: 270 }] },
    { id: 43, category: "non-coffee", name: "Горячий шоколад Калебаут", desc: "Настоящий бельгийский шоколад", sizes: [{ volume: "90 мл", price: 200 }] },
    { id: 44, category: "non-coffee", name: "Варёная кукуруза в стакане", desc: "Традиционное тёплое угощение", sizes: [{ volume: "300 г", price: 250 }] },
    { id: 45, category: "non-coffee", name: "Настоящий калмыцкий чай (на молоке)", desc: "Сытно и по-домашнему", sizes: [{ volume: "350 мл", price: 250 }] },

    // ---------- КОКТЕЙЛИ (все 350 мл) ----------
    { id: 46, category: "cocktails", name: "Молочный", desc: "Классический молочный коктейль", sizes: [{ volume: "350 мл", price: 250 }] },
    { id: 47, category: "cocktails", name: "Шоколадный", desc: "Молоко и настоящий шоколад", sizes: [{ volume: "350 мл", price: 300 }] },
    { id: 48, category: "cocktails", name: "Молочно-банановый", desc: "Мягкий банановый вкус", sizes: [{ volume: "350 мл", price: 300 }] },
    { id: 49, category: "cocktails", name: "Шоколад-банан", desc: "Классика: шоколад и банан", sizes: [{ volume: "350 мл", price: 300 }] },
    { id: 50, category: "cocktails", name: "Клубничный", desc: "Свежая клубника и молоко", sizes: [{ volume: "350 мл", price: 300 }] },
    { id: 51, category: "cocktails", name: "Финиково-банановый", desc: "Сладкие финики и банан", sizes: [{ volume: "350 мл", price: 320 }] },
    { id: 52, category: "cocktails", name: "Клубника-банан", desc: "Клубника и банан в молоке", sizes: [{ volume: "350 мл", price: 320 }] },
    { id: 53, category: "cocktails", name: "Финиковый", desc: "Натуральная сладость фиников", sizes: [{ volume: "350 мл", price: 300 }] },
    { id: 54, category: "cocktails", name: "Сникерс", desc: "Арахис, карамель и шоколад", sizes: [{ volume: "350 мл", price: 370 }] },
    { id: 55, category: "cocktails", name: "Черничное печенье", desc: "Ягодная свежесть и печенье", sizes: [{ volume: "350 мл", price: 370 }] },

    // ---------- ЛИМОНАДЫ (0,3 / 1 л) ----------
    { id: 56, category: "lemonades", name: "Щавелевый", desc: "Домашний щавель и лёд", sizes: [{ volume: "0,3 л", price: 250 }, { volume: "1 л", price: 600 }] },
    { id: 57, category: "lemonades", name: "Щавель-яблоко", desc: "Щавель и яблочная свежесть", sizes: [{ volume: "0,3 л", price: 250 }, { volume: "1 л", price: 600 }] },
    { id: 58, category: "lemonades", name: "Щавель-апельсин", desc: "Щавель и апельсиновый фреш", sizes: [{ volume: "0,3 л", price: 250 }, { volume: "1 л", price: 600 }] },
    { id: 59, category: "lemonades", name: "Мохито классика", desc: "Лайм, мята и лёд", sizes: [{ volume: "0,3 л", price: 250 }, { volume: "1 л", price: 600 }] },
    { id: 60, category: "lemonades", name: "Мохито клубника", desc: "Классический мохито с клубникой", sizes: [{ volume: "0,3 л", price: 250 }, { volume: "1 л", price: 600 }] },
    { id: 61, category: "lemonades", name: "Ягодный", desc: "Сбор свежих ягод", sizes: [{ volume: "0,3 л", price: 250 }, { volume: "1 л", price: 600 }] },
    { id: 62, category: "lemonades", name: "Голубая лагуна", desc: "Яркий цвет и цитрус", sizes: [{ volume: "0,3 л", price: 250 }, { volume: "1 л", price: 600 }] },
    { id: 63, category: "lemonades", name: "Малина-имбирь", desc: "Малина и лёгкая острота имбиря", sizes: [{ volume: "0,3 л", price: 250 }, { volume: "1 л", price: 600 }] },
    { id: 64, category: "lemonades", name: "Малина-фисташка", desc: "Ягоды и фисташковая нота", sizes: [{ volume: "0,3 л", price: 250 }, { volume: "1 л", price: 600 }] },
    { id: 65, category: "lemonades", name: "Гранат-апельсин", desc: "Гранат и апельсин — свежо", sizes: [{ volume: "0,3 л", price: 250 }, { volume: "1 л", price: 600 }] },

    // ---------- СМУЗИ (все 350 мл) ----------
    { id: 66, category: "smoothies", name: "Ягодный", desc: "Ягоды, взбитые до гладкости", sizes: [{ volume: "350 мл", price: 350 }] },
    { id: 67, category: "smoothies", name: "Клубника-банан", desc: "Клубника и банан", sizes: [{ volume: "350 мл", price: 350 }] },
    { id: 68, category: "smoothies", name: "Банан-яблоко", desc: "Нежный банан и яблоко", sizes: [{ volume: "350 мл", price: 350 }] },

    // ---------- ФРЕШИ (все 300 мл) ----------
    { id: 69, category: "fresh", name: "Апельсиновый", desc: "Свежевыжатый апельсиновый сок", sizes: [{ volume: "300 мл", price: 300 }] },
    { id: 70, category: "fresh", name: "Яблочный", desc: "Свежевыжатый яблочный сок", sizes: [{ volume: "300 мл", price: 300 }] },
    { id: 71, category: "fresh", name: "Яблоко-апельсин", desc: "Яблочно-апельсиновый микс", sizes: [{ volume: "300 мл", price: 300 }] },

    // ---------- МОРОЖЕНОЕ (шарики, 55 г) ----------
    { id: 72, category: "icecream", name: "Сливочное", desc: "Классическое пломбирное", sizes: [{ volume: "55 г", price: 60 }] },
    { id: 73, category: "icecream", name: "Шоколадное", desc: "С натуральным шоколадом", sizes: [{ volume: "55 г", price: 60 }] },
    { id: 74, category: "icecream", name: "Клубничное", desc: "С ягодным вкусом", sizes: [{ volume: "55 г", price: 60 }] },
    { id: 75, category: "icecream", name: "Банановое", desc: "Сладкое и нежное", sizes: [{ volume: "55 г", price: 60 }] },

    // ---------- ДОБАВКИ К МОРОЖЕНОМУ ----------
    { id: 76, category: "icecream-addons", name: "Орехи", desc: "Хрустящие орехи к шарику", sizes: [{ volume: "порция", price: 40 }] },
    { id: 77, category: "icecream-addons", name: "Топинг шоколад и клубника", desc: "Топинг для мороженого", sizes: [{ volume: "порция", price: 30 }] },
  ];

  // К каким товарам предлагать добавки в карточке («где это логично»)
  var MILK_SYRUP = ["milk", "syrup"];
  var TEA_ADD = ["tea"];
  var ICE_ADD = ["ice"];

  function range(a, b) {
    var out = [];
    for (var i = a; i <= b; i++) out.push(i);
    return out;
  }
  function applyAddons(ids, groups) {
    ids.forEach(function (id) {
      var p = products.find(function (x) { return x.id === id; });
      if (p) p.addons = groups;
    });
  }
  applyAddons(range(1, 20), MILK_SYRUP);      // кофе
  applyAddons(range(25, 31), MILK_SYRUP);     // холодный кофе
  applyAddons([42, 43], MILK_SYRUP);          // какао и горячий шоколад
  applyAddons(range(32, 41), TEA_ADD);        // чаи (классические и авторские)
  applyAddons(range(72, 75), ICE_ADD);        // мороженое

  /* ------------------------------------------------------------------
     5. ОТЗЫВЫ ДЛЯ ПУБЛИКАЦИИ (редактируются здесь)
        Новые отзывы гостей приходят через WhatsApp — публикуйте их после модерации.
     ------------------------------------------------------------------ */
  var publishedReviews = [
    { name: "Амина", rating: 5, text: "Уютно, тихо и очень вкусно. Раф с урбечом — любовь! Спасибо за тёплый приём.", date: "02.08.2026" },
    { name: "Рамазан", rating: 5, text: "Лучший кофе в Бабаюрте. Брал капучино и варёную кукурузу — всё на высоте. Рекомендую!", date: "27.07.2026" },
    { name: "Мадина", rating: 4, text: "Красивое место и внимательный персонал. Лимонад «Голубая лагуна» очень освежает.", date: "18.07.2026" },
  ];

  /* ------------------------------------------------------------------
     6. СОСТОЯНИЕ ПРИЛОЖЕНИЯ
     ------------------------------------------------------------------ */
  var STORAGE_KEY = "sablya_cart_v1";
  var cart = loadCart();
  var activeCategory = "all";
  var searchQuery = "";
  var orderType = "dine"; // dine | takeaway | delivery
  var reviewRating = 5;

  var pm = null; // состояние модального окна товара

  var ORDER_TYPES = {
    dine: { label: "В заведении" },
    takeaway: { label: "С собой" },
    delivery: { label: "Доставка" },
  };

  /* ------------------------------------------------------------------
     7. ПОМОЩНИКИ
     ------------------------------------------------------------------ */
  function $(sel) { return document.querySelector(sel); }
  function $$(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }

  function money(n) { return n.toLocaleString("ru-RU") + " ₽"; }

  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function categoryLabel(id) {
    var c = categories.find(function (x) { return x.id === id; });
    return c ? c.label : id;
  }

  function normalizePhone(v) {
    return String(v || "").replace(/[^\d+]/g, "");
  }
  function isValidPhone(v) {
    var digits = normalizePhone(v).replace(/\D/g, "");
    return digits.length >= 10;
  }

  /* --- Toast-уведомления --- */
  var toastTimer = null;
  function toast(msg) {
    var el = $("#toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove("show"); }, 2600);
  }

  /* --- Модальные окна --- */
  function openModal(el, opener) {
    if (opener) el.dataset.opener = opener.id || null;
    el.classList.add("open");
    document.body.style.overflow = "hidden";
    var focusable = el.querySelector("button, input, select, textarea, a[href]");
    if (focusable) focusable.focus({ preventScroll: true });
  }
  function closeModal(el) {
    el.classList.remove("open");
    document.body.style.overflow = "";
    var opener = el.dataset.opener ? document.getElementById(el.dataset.opener) : null;
    if (opener) { try { opener.focus({ preventScroll: true }); } catch (e) {} }
  }
  function closeAllModals() {
    $$(".modal.open").forEach(closeModal);
  }

  /* --- WhatsApp --- */
  function waLink(text) {
    return "https://wa.me/" + CONFIG.whatsappNumber + "?text=" + encodeURIComponent(text);
  }
  function openWhatsApp(text) {
    var url = waLink(text);
    var w = window.open(url, "_blank", "noopener");
    if (!w) { location.href = url; }
  }

  /* ------------------------------------------------------------------
     8. КОРЗИНА (localStorage)
     ------------------------------------------------------------------ */
  function loadCart() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      var data = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(data)) return [];
      return data.filter(function (item) {
        return item && typeof item.key === "string" && item.productId != null;
      });
    } catch (e) {
      return [];
    }
  }

  function saveCart() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); } catch (e) {}
  }

  function cartCount() {
    return cart.reduce(function (s, i) { return s + i.qty; }, 0);
  }

  function cartTotal() {
    return cart.reduce(function (s, i) { return s + i.qty * lineUnitPrice(i); }, 0);
  }

  function lineUnitPrice(item) {
    var addons = (item.addons || []).reduce(function (s, a) { return s + a.price; }, 0);
    return item.size.price + addons;
  }

  function cartLineKey(productId, sizeIndex, addonKeys) {
    var add = addonKeys.slice().sort().join("|");
    return productId + "|" + sizeIndex + "|" + add;
  }

  function addToCart(productId, sizeIndex, addonKeys, qty) {
    var p = products.find(function (x) { return x.id === productId; });
    if (!p) return;
    var size = p.sizes[sizeIndex];
    if (!size) return;

    var addons = addonKeys.map(function (key) {
      var parts = key.split(":");
      var group = ADDONS[parts[0]];
      return group ? group[Number(parts[1])] : null;
    }).filter(Boolean);

    var key = cartLineKey(productId, sizeIndex, addonKeys);
    var existing = cart.find(function (i) { return i.key === key; });

    if (existing) {
      existing.qty = Math.min(existing.qty + qty, 99);
    } else {
      cart.push({
        key: key,
        productId: p.id,
        name: p.name,
        size: { volume: size.volume, price: size.price },
        addons: addons,
        qty: Math.min(qty, 99),
      });
    }
    saveCart();
    renderCartUI();
  }

  function setQty(key, qty) {
    var item = cart.find(function (i) { return i.key === key; });
    if (!item) return;
    if (qty <= 0) {
      cart = cart.filter(function (i) { return i.key !== key; });
    } else {
      item.qty = Math.min(qty, 99);
    }
    saveCart();
    renderCartUI();
  }

  function clearCart() {
    cart = [];
    saveCart();
    renderCartUI();
  }

  function renderCartUI() {
    var count = cartCount();
    ["cartBadge", "bnCartBadge"].forEach(function (id) {
      var b = document.getElementById(id);
      if (b) {
        b.hidden = count === 0;
        b.textContent = count > 99 ? "99+" : count;
      }
    });
    renderCartItems();
  }

  function renderCartItems() {
    var itemsEl = $("#cartItems");
    var emptyEl = $("#cartEmpty");
    var bodyEl = $("#cartBody");
    var totalEl = $("#cartTotal");
    var submitBtn = $("#submitOrderBtn");

    if (!cart.length) {
      itemsEl.innerHTML = "";
      emptyEl.hidden = false;
      bodyEl.hidden = true;
      if (totalEl) totalEl.textContent = money(0);
      if (submitBtn) submitBtn.disabled = true;
      return;
    }

    emptyEl.hidden = true;
    bodyEl.hidden = false;
    if (submitBtn) submitBtn.disabled = false;

    itemsEl.innerHTML = cart.map(function (item) {
      var addonsMeta = (item.addons || [])
        .map(function (a) { return a.name + " +" + a.price + " ₽"; })
        .join(" · ");
      var meta = item.size.volume + (addonsMeta ? " · " + addonsMeta : "");
      return (
        '<div class="cart-item" data-key="' + esc(item.key) + '">' +
          '<div class="ci-top">' +
            '<div><div class="ci-name">' + esc(item.name) + "</div>" +
            '<div class="ci-meta">' + esc(meta) + "</div></div>" +
            '<button type="button" class="link-btn link-btn--danger ci-remove" data-action="remove">Удалить</button>' +
          "</div>" +
          '<div class="ci-bottom">' +
            '<div class="stepper stepper--sm">' +
              '<button type="button" class="stepper-btn" data-action="minus" aria-label="Уменьшить">−</button>' +
              '<span class="stepper-value">' + item.qty + "</span>" +
              '<button type="button" class="stepper-btn" data-action="plus" aria-label="Увеличить">+</button>' +
            "</div>" +
            '<span class="ci-price">' + money(item.qty * lineUnitPrice(item)) + "</span>" +
          "</div>" +
        "</div>"
      );
    }).join("");

    totalEl.textContent = money(cartTotal());
  }

  /* ------------------------------------------------------------------
     9. ОТРИСОВКА МЕНЮ: категории, поиск, карточки
     ------------------------------------------------------------------ */
  function renderChips() {
    var wrap = $("#categoryChips");
    wrap.innerHTML = categories.map(function (c) {
      var count = c.id === "all" ? products.length : products.filter(function (p) { return p.category === c.id; }).length;
      var cls = "chip" + (c.id === activeCategory ? " active" : "");
      return (
        '<button type="button" class="' + cls + '" data-cat="' + c.id + '" role="tab" aria-selected="' + (c.id === activeCategory) + '">' +
          esc(c.label) +
          '<span class="chip-count">' + count + "</span>" +
        "</button>"
      );
    }).join("");
  }

  // Поиск с учётом русских словоформ: «коктейль» находит «Коктейли», «рафы» — «Раф»
  function normSearch(s) {
    return String(s || "").toLowerCase().replace(/ё/g, "е");
  }
  function stemSearch(s) {
    return s.replace(/(ами|ями|ией|ия|ию|ие|ий|ах|ях|ов|ев|ом|ем|ой|ей|ам|ям|ы|и|а|я|у|ю|о|е|ь)$/g, "");
  }

  function filteredProducts() {
    var q = normSearch(searchQuery.trim());
    return products.filter(function (p) {
      var byCat = activeCategory === "all" || p.category === activeCategory;
      if (!byCat) return false;
      if (!q) return true;
      var hay = normSearch(p.name + " " + categoryLabel(p.category) + " " + (p.desc || ""));
      if (hay.indexOf(q) !== -1) return true;
      // доп. проверка по основе слова
      return stemSearch(hay).indexOf(stemSearch(q)) !== -1;
    });
  }

  function renderMenu() {
    var grid = $("#productGrid");
    var list = filteredProducts();
    var empty = $("#menuEmpty");
    var count = $("#menuCount");

    if (count) count.textContent = products.length;

    if (!list.length) {
      grid.innerHTML = "";
      empty.hidden = false;
      $("#emptyQuery").textContent = searchQuery.trim();
      return;
    }

    empty.hidden = true;

    grid.innerHTML = list.map(function (p) {
      var sizesHtml = p.sizes.map(function (s, i) {
        return (
          '<div class="size-row" data-size="' + i + '" role="button" tabindex="0" aria-label="' + esc(s.volume) + " — " + money(s.price) + '">' +
            '<span class="size-vol">' + esc(s.volume) + "</span>" +
            '<span class="size-price">' + money(s.price) + "</span>" +
          "</div>"
        );
      }).join("");

      var imageHtml = "";
      if (p.image) {
        imageHtml = '<div class="pc-img"><img src="' + esc(p.image) + '" alt="' + esc(p.name) + '" loading="lazy"></div>';
      }

      return (
        '<article class="product-card" data-id="' + p.id + '">' +
          imageHtml +
          '<span class="pc-cat">' + esc(categoryLabel(p.category)) + "</span>" +
          '<h3 class="pc-name">' + esc(p.name) + "</h3>" +
          '<p class="pc-desc">' + esc(p.desc || "") + "</p>" +
          '<div class="pc-sizes">' + sizesHtml + "</div>" +
          '<button type="button" class="btn btn--outline btn--sm pc-add" data-id="' + p.id + '">Добавить</button>' +
        "</article>"
      );
    }).join("");
  }

  /* ------------------------------------------------------------------
     10. МОДАЛЬНОЕ ОКНО ТОВАРА
     ------------------------------------------------------------------ */
  function openProductModal(productId, presetSize) {
    var p = products.find(function (x) { return x.id === productId; });
    if (!p) return;

    pm = {
      product: p,
      sizeIndex: Math.min(presetSize || 0, p.sizes.length - 1),
      addons: [],   // ключи вида "milk:0"
      qty: 1,
    };

    $("#pmodalName").textContent = p.name;
    $("#pmodalDesc").textContent = p.desc || "";
    $("#pmodalCat").textContent = categoryLabel(p.category);
    $("#pqValue").textContent = "1";

    // Объёмы
    var sizesWrap = $("#pmodalSizes");
    sizesWrap.innerHTML = p.sizes.map(function (s, i) {
      return (
        '<button type="button" class="size-opt" data-size="' + i + '">' +
          '<span class="opt-label"><span class="radio" aria-hidden="true"></span>' + esc(s.volume) + "</span>" +
          '<span class="opt-price">' + money(s.price) + "</span>" +
        "</button>"
      );
    }).join("");

    // Добавки
    var addonsWrap = $("#pmodalAddons");
    var addonsBlock = $("#pmodalAddonsBlock");
    var groups = p.addons || [];
    if (groups.length) {
      addonsWrap.innerHTML = groups.map(function (g) {
        var opts = (ADDONS[g] || []).map(function (a, i) {
          return (
            '<button type="button" class="addon-opt" data-key="' + g + ":" + i + '">' +
              '<span class="opt-label"><span class="check" aria-hidden="true"></span>' + esc(a.name) + "</span>" +
              '<span class="opt-price">+' + a.price + " ₽</span>" +
            "</button>"
          );
        }).join("");
        return (
          '<p class="pmodal-label">' + esc(ADDON_GROUP_LABELS[g] || g) + "</p>" +
          '<div class="addon-options">' + opts + "</div>"
        );
      }).join("");
      addonsBlock.hidden = false;
    } else {
      addonsWrap.innerHTML = "";
      addonsBlock.hidden = true;
    }

    syncProductModal();
    openModal($("#productModal"), $("#productModal"));
  }

  function syncProductModal() {
    var p = pm.product;

    // подсветка выбранного объёма
    $$("#pmodalSizes .size-opt").forEach(function (el) {
      el.classList.toggle("selected", Number(el.dataset.size) === pm.sizeIndex);
    });

    // подсветка выбранных добавок
    $$("#pmodalAddons .addon-opt").forEach(function (el) {
      el.classList.toggle("selected", pm.addons.indexOf(el.dataset.key) !== -1);
    });

    // цена
    var addonPrice = pm.addons.reduce(function (s, key) {
      var parts = key.split(":");
      var group = ADDONS[parts[0]];
      return s + (group ? group[Number(parts[1])].price : 0);
    }, 0);
    var unit = p.sizes[pm.sizeIndex].price + addonPrice;
    $("#pmodalAddBtn").textContent = "Добавить в корзину — " + money(unit);
  }

  /* ------------------------------------------------------------------
     11. ОФОРМЛЕНИЕ ЗАКАЗА
     ------------------------------------------------------------------ */
  function renderCheckoutFields() {
    var wrap = $("#checkoutFields");
    // сохраняем введённые значения при переключении типа заказа
    var vals = {};
    $$("#checkoutFields input, #checkoutFields textarea").forEach(function (el) {
      vals[el.id] = el.value;
    });

    var html = "";
    html += fieldHtml("coName", "Имя", "Как к вам обращаться", "text", true);
    html += fieldHtml("coPhone", "Телефон", "+7 (___) ___-__-__", "tel", true);

    if (orderType === "delivery") {
      html += fieldHtml("coAddress", "Адрес", "Улица, дом", "text", true);
      html += fieldHtml("coEntrance", "Подъезд / этаж / квартира", "Необязательно", "text", false);
    }

    html +=
      '<label class="field"><span class="field-label">Комментарий <i class="optional">необязательно</i></span>' +
      '<textarea id="coComment" rows="2" maxlength="300" placeholder="Пожелания к заказу"></textarea></label>';

    wrap.innerHTML = html;
    Object.keys(vals).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.value = vals[id];
    });
  }

  function fieldHtml(id, label, placeholder, type, required) {
    return (
      '<label class="field"><span class="field-label">' + label + (required ? "" : ' <i class="optional">необязательно</i>') + "</span>" +
      '<input type="' + type + '" id="' + id + '" maxlength="40" placeholder="' + esc(placeholder) + '"' + (required ? " required" : "") + "></label>"
    );
  }

  function collectCheckout() {
    return {
      name: $("#coName").value.trim(),
      phone: $("#coPhone").value.trim(),
      address: $("#coAddress") ? $("#coAddress").value.trim() : "",
      entrance: $("#coEntrance") ? $("#coEntrance").value.trim() : "",
      comment: $("#coComment") ? $("#coComment").value.trim() : "",
    };
  }

  function buildOrderMessage(data) {
    var lines = [];
    lines.push("Здравствуйте! Хочу сделать заказ в SABLYA COFFEE.");
    lines.push("Тип заказа: " + ORDER_TYPES[orderType].label);
    lines.push("Заказ:");

    cart.forEach(function (item) {
      lines.push(item.name + " — " + item.size.volume + " — " + item.qty + " шт. — " + money(item.qty * lineUnitPrice(item)));
    });

    // Сводка добавок
    var addonTotals = {};
    cart.forEach(function (item) {
      (item.addons || []).forEach(function (a) {
        if (!addonTotals[a.name]) addonTotals[a.name] = 0;
        addonTotals[a.name] += a.price * item.qty;
      });
    });
    var addonNames = Object.keys(addonTotals);
    if (addonNames.length) {
      lines.push("Добавки:");
      addonNames.forEach(function (n) {
        lines.push(n + " — " + money(addonTotals[n]));
      });
    }

    lines.push("Итого: " + money(cartTotal()));
    lines.push("Имя: " + data.name);
    lines.push("Телефон: " + data.phone);
    if (orderType === "delivery") {
      lines.push("Адрес: " + data.address);
      if (data.entrance) lines.push("Подъезд/этаж/квартира: " + data.entrance);
    }
    if (data.comment) lines.push("Комментарий: " + data.comment);

    return lines.join("\n");
  }

  /* ------------------------------------------------------------------
     12. БРОНИРОВАНИЕ СТОЛИКА
     ------------------------------------------------------------------ */
  function buildTimeOptions() {
    var sel = $("#bkTime");
    var opts = [];
    for (var h = 9; h <= 22; h++) {
      for (var m = 0; m < 60; m += 30) {
        var v = (h < 10 ? "0" + h : h) + ":" + (m === 0 ? "00" : "30");
        opts.push('<option value="' + v + '">' + v + "</option>");
      }
    }
    sel.innerHTML = opts.join("");
  }

  function setMinDate() {
    var d = new Date();
    var iso = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    var input = $("#bkDate");
    input.min = iso;
    input.value = input.value || iso;
  }

  function buildBookingMessage(data) {
    var lines = [];
    lines.push("Здравствуйте! Хочу забронировать столик в SABLYA COFFEE.");
    lines.push("Имя: " + data.name);
    lines.push("Телефон: " + data.phone);
    lines.push("Гостей: " + data.guests);
    lines.push("Дата: " + data.date);
    lines.push("Время: " + data.time);
    if (data.comment) lines.push("Комментарий: " + data.comment);
    return lines.join("\n");
  }

  /* ------------------------------------------------------------------
     13. ОТЗЫВЫ
     ------------------------------------------------------------------ */
  function renderReviews() {
    var grid = $("#reviewsGrid");
    grid.innerHTML = publishedReviews.map(function (r) {
      var stars = "";
      for (var i = 1; i <= 5; i++) stars += i <= r.rating ? "★" : "☆";
      return (
        '<figure class="review-card">' +
          '<div class="review-stars" aria-label="' + r.rating + " из 5" + '">' + stars + "</div>" +
          '<blockquote class="review-text">«' + esc(r.text) + "»</blockquote>" +
          '<figcaption class="review-meta"><span class="review-name">' + esc(r.name) + '</span><span class="review-date">' + esc(r.date) + "</span></figcaption>" +
        "</figure>"
      );
    }).join("");
  }

  function buildReviewMessage(data) {
    return [
      "Здравствуйте! Хочу оставить отзыв о SABLYA COFFEE.",
      "Имя: " + data.name,
      "Оценка: " + data.rating + "/5",
      "Отзыв: " + data.text,
    ].join("\n");
  }

  function renderStars() {
    $$("#rvStars .star").forEach(function (btn) {
      btn.classList.toggle("active", Number(btn.dataset.val) <= reviewRating);
    });
  }

  /* ------------------------------------------------------------------
     14. ПРОКРУТКА И ПОДСВЕТКА НАВИГАЦИИ
     ------------------------------------------------------------------ */
  function initReveal() {
    if (!("IntersectionObserver" in window)) {
      $$(".reveal").forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    $$(".reveal").forEach(function (el) { io.observe(el); });
  }

  function initScrollSpy() {
    var targets = [
      { id: "hero", navs: ["home"] },
      { id: "menu", navs: ["menu"] },
      { id: "booking", navs: ["booking"] },
      { id: "contacts", navs: ["contacts"] },
    ];
    var ticking = false;

    function update() {
      ticking = false;
      var pos = window.scrollY + 140;
      var current = "home";
      targets.forEach(function (t) {
        var el = document.getElementById(t.id);
        if (el && el.offsetTop <= pos) current = t.id;
      });
      if (current === "contacts") {
        var footer = document.querySelector(".site-footer");
        if (footer && window.scrollY + window.innerHeight >= footer.offsetTop) current = "contacts";
      }
      $$(".bn-item").forEach(function (el) {
        el.classList.toggle("active", el.dataset.bn === (current === "hero" ? "home" : current));
      });
      $$(".top-nav .nav-link").forEach(function (el) {
        var href = el.getAttribute("href");
        el.classList.toggle("active", href === "#" + current);
      });
    }

    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ------------------------------------------------------------------
     15. ИНИЦИАЛИЗАЦИЯ
     ------------------------------------------------------------------ */
  function init() {
    // Статистика
    var sp = $("#statProducts");
    var sc = $("#statCategories");
    if (sp) sp.textContent = products.length;
    if (sc) sc.textContent = categories.length - 1;

    var year = $("#footerYear");
    if (year) year.textContent = new Date().getFullYear();

    // Меню
    renderChips();
    renderMenu();
    renderReviews();
    renderCartUI();

    // Бронирование
    buildTimeOptions();
    setMinDate();

    // Форма заказа
    renderCheckoutFields();
    $$("#orderTypeWrap .order-type-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        orderType = btn.dataset.type;
        $$("#orderTypeWrap .order-type-btn").forEach(function (b) {
          b.classList.toggle("selected", b === btn);
        });
        renderCheckoutFields();
      });
    });
    var defaultTypeBtn = document.querySelector('#orderTypeWrap .order-type-btn[data-type="dine"]');
    if (defaultTypeBtn) defaultTypeBtn.classList.add("selected");

    // Категории (делегирование)
    $("#categoryChips").addEventListener("click", function (e) {
      var chip = e.target.closest(".chip");
      if (!chip) return;
      activeCategory = chip.dataset.cat;
      renderChips();
      renderMenu();
      var grid = $("#productGrid");
      if (grid.firstElementChild) grid.firstElementChild.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });

    // Поиск
    var searchInput = $("#searchInput");
    searchInput.addEventListener("input", function () {
      searchQuery = searchInput.value;
      $("#searchClear").hidden = searchQuery.length === 0;
      renderMenu();
    });
    $("#searchClear").addEventListener("click", function () {
      searchInput.value = "";
      searchQuery = "";
      this.hidden = true;
      renderMenu();
      searchInput.focus();
    });

    // Карточки товаров (делегирование)
    $("#productGrid").addEventListener("click", function (e) {
      var sizeRow = e.target.closest(".size-row");
      var addBtn = e.target.closest(".pc-add");
      var card = e.target.closest(".product-card");
      if (!card) return;
      var id = Number(card.dataset.id);
      if (sizeRow) {
        openProductModal(id, Number(sizeRow.dataset.size));
      } else if (addBtn) {
        openProductModal(id, 0);
      } else {
        openProductModal(id, 0);
      }
    });
    // Доступность: Enter на строке объёма
    $("#productGrid").addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      var sizeRow = e.target.closest(".size-row");
      if (sizeRow) {
        e.preventDefault();
        openProductModal(Number(sizeRow.closest(".product-card").dataset.id), Number(sizeRow.dataset.size));
      }
    });

    // Модалка товара
    $("#pmodalSizes").addEventListener("click", function (e) {
      var opt = e.target.closest(".size-opt");
      if (!opt || !pm) return;
      pm.sizeIndex = Number(opt.dataset.size);
      syncProductModal();
    });
    $("#pmodalAddons").addEventListener("click", function (e) {
      var opt = e.target.closest(".addon-opt");
      if (!opt || !pm) return;
      var key = opt.dataset.key;
      var idx = pm.addons.indexOf(key);
      if (idx === -1) pm.addons.push(key); else pm.addons.splice(idx, 1);
      syncProductModal();
    });
    $("#pqMinus").addEventListener("click", function () {
      if (!pm) return;
      pm.qty = Math.max(1, pm.qty - 1);
      $("#pqValue").textContent = pm.qty;
    });
    $("#pqPlus").addEventListener("click", function () {
      if (!pm) return;
      pm.qty = Math.min(99, pm.qty + 1);
      $("#pqValue").textContent = pm.qty;
    });
    $("#pmodalAddBtn").addEventListener("click", function () {
      if (!pm) return;
      addToCart(pm.product.id, pm.sizeIndex, pm.addons, pm.qty);
      closeModal($("#productModal"));
      toast("Добавлено в корзину");
      var badge = $("#cartBadge");
      if (badge) {
        badge.classList.remove("bump");
        void badge.offsetWidth;
        badge.classList.add("bump");
      }
    });

    // Открытие корзины
    ["#headerCartBtn", "#bnCart", "#heroOrderBtn"].forEach(function (sel) {
      var btn = $(sel);
      if (btn) btn.addEventListener("click", function () { openModal($("#cartModal"), btn); });
    });
    $("#toMenuBtn").addEventListener("click", function () {
      closeModal($("#cartModal"));
      document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
    });

    // Управление корзиной (делегирование)
    $("#cartItems").addEventListener("click", function (e) {
      var itemEl = e.target.closest(".cart-item");
      if (!itemEl) return;
      var key = itemEl.dataset.key;
      var action = e.target.closest("[data-action]");
      if (!action) return;
      if (action.dataset.action === "remove") {
        setQty(key, 0);
        toast("Товар удалён");
      } else if (action.dataset.action === "minus") {
        var cur = cart.find(function (i) { return i.key === key; });
        if (cur) setQty(key, cur.qty - 1);
      } else if (action.dataset.action === "plus") {
        var cur2 = cart.find(function (i) { return i.key === key; });
        if (cur2) setQty(key, cur2.qty + 1);
      }
    });

    // Очистка корзины (двойное подтверждение)
    var clearBtn = $("#clearCartBtn");
    var clearTimer = null;
    clearBtn.addEventListener("click", function () {
      if (clearBtn.dataset.armed !== "1") {
        clearBtn.dataset.armed = "1";
        clearBtn.textContent = "Точно очистить?";
        clearTimeout(clearTimer);
        clearTimer = setTimeout(function () {
          clearBtn.dataset.armed = "";
          clearBtn.textContent = "Очистить корзину";
        }, 3000);
        return;
      }
      clearBtn.dataset.armed = "";
      clearBtn.textContent = "Очистить корзину";
      clearCart();
      toast("Корзина очищена");
    });

    // Оформление заказа
    $("#checkoutForm").addEventListener("submit", function (e) {
      e.preventDefault();
      if (!cart.length) {
        toast("Корзина пуста — добавьте напитки");
        return;
      }
      var data = collectCheckout();
      if (!data.name) { toast("Пожалуйста, укажите имя"); return; }
      if (!isValidPhone(data.phone)) { toast("Пожалуйста, укажите корректный телефон"); return; }
      if (orderType === "delivery" && !data.address) { toast("Пожалуйста, укажите адрес доставки"); return; }
      openWhatsApp(buildOrderMessage(data));
      toast("Заказ сформирован в WhatsApp");
    });

    // Бронирование
    var guests = 2;
    function setGuests(v) {
      guests = Math.max(1, Math.min(20, v));
      $("#guestsValue").textContent = guests;
    }
    $("#guestsMinus").addEventListener("click", function () { setGuests(guests - 1); });
    $("#guestsPlus").addEventListener("click", function () { setGuests(guests + 1); });

    $("#bookingForm").addEventListener("submit", function (e) {
      e.preventDefault();
      var name = $("#bkName").value.trim();
      var phone = $("#bkPhone").value.trim();
      var date = $("#bkDate").value;
      var time = $("#bkTime").value;
      var comment = $("#bkComment").value.trim();

      if (!name) { toast("Пожалуйста, укажите имя"); return; }
      if (!isValidPhone(phone)) { toast("Пожалуйста, укажите корректный телефон"); return; }
      if (!date) { toast("Пожалуйста, выберите дату"); return; }
      if (!time) { toast("Пожалуйста, выберите время"); return; }

      var d = new Date();
      var todayIso = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
      if (date < todayIso) { toast("Нельзя выбрать прошедшую дату"); return; }

      openWhatsApp(buildBookingMessage({ name: name, phone: phone, guests: guests, date: date, time: time, comment: comment }));
      toast("Бронь сформирована в WhatsApp");
    });

    // Отзывы
    renderStars();
    $("#rvStars").addEventListener("click", function (e) {
      var star = e.target.closest(".star");
      if (!star) return;
      reviewRating = Number(star.dataset.val);
      renderStars();
    });
    $("#openReviewBtn").addEventListener("click", function () {
      openModal($("#reviewModal"), $("#openReviewBtn"));
    });
    $("#reviewForm").addEventListener("submit", function (e) {
      e.preventDefault();
      var name = $("#rvName").value.trim();
      var text = $("#rvText").value.trim();
      if (!name) { toast("Пожалуйста, укажите имя"); return; }
      if (!text) { toast("Пожалуйста, напишите отзыв"); return; }
      openWhatsApp(buildReviewMessage({ name: name, rating: reviewRating, text: text }));
      closeModal($("#reviewModal"));
      $("#rvText").value = "";
      $("#rvName").value = "";
      toast("Отзыв отправлен, спасибо!");
    });

    // Модальные окна: закрытие
    $$(".modal").forEach(function (modal) {
      modal.addEventListener("click", function (e) {
        if (e.target.closest("[data-close]")) closeModal(modal);
      });
      modal.querySelectorAll(".modal-close").forEach(function (btn) {
        btn.addEventListener("click", function () { closeModal(modal); });
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeAllModals();
    });

    initReveal();
    initScrollSpy();

    // Плавная прокрутка для якорных ссылок с учётом шапки
    $$('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var id = a.getAttribute("href");
        if (id.length > 1) {
          var target = document.querySelector(id);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
          }
        }
      });
    });
  }

  /* ------------------------------------------------------------------
     16. СТАРТ
     ------------------------------------------------------------------ */
  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }
  }

  /* Экспорт для проверки данных (node tests) */
  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      products: products,
      categories: categories,
      ADDONS: ADDONS,
      publishedReviews: publishedReviews,
    };
  }
})();
