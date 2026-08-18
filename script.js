/* ==========================================================================
   SABLYA COFFEE — логика сайта (общие модули для всех страниц)
   --------------------------------------------------------------------------
   Файл подключается на ВСЕ страницы: index, menu, about, booking, reviews,
   contacts. Шапка, нижняя навигация, подвал и корзина создаются скриптом
   автоматически и выглядят одинаково на каждой странице.

   ВСЁ меню — в массиве `products` ниже. Чтобы изменить название, цену,
   объём или добавить товар — отредактируйте нужную запись массива.
   ========================================================================== */

(function () {
  "use strict";

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
  ]

  /* ------------------------------------------------------------------
     СОСТОЯНИЕ ПРИЛОЖЕНИЯ
     ------------------------------------------------------------------ */
  var STORAGE_KEY = "sablya_cart_v1";
  var cart = loadCart(); // loadCart объявлена ниже (function hoisting)

  var activeCategory = "all";
  var searchQuery = "";
  var orderType = "dine"; // dine | takeaway | delivery
  var reviewRating = 5;
  var pm = null; // состояние модального окна товара

  var PAGE = "home";
  if (typeof document !== "undefined" && document.body && document.body.dataset && document.body.dataset.page) {
    PAGE = document.body.dataset.page;
  }

  var ORDER_TYPES = {
    dine: { label: "В заведении" },
    takeaway: { label: "С собой" },
    delivery: { label: "Доставка" },
  };

  /* ------------------------------------------------------------------
     ПОМОЩНИКИ
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

  function isoToday() {
    var d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }

  /* --- Toast-уведомления --- */
  var toastTimer = null;
  function toast(msg) {
    var el = $("#toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove("show"); }, 2800);
  }

  /* --- Модальные окна --- */
  function openModal(el, opener) {
    if (!el) return;
    if (opener) el.dataset.opener = opener.id || "";
    el.classList.add("open");
    document.body.style.overflow = "hidden";
    var focusable = el.querySelector("button, input, select, textarea, a[href]");
    if (focusable) { try { focusable.focus({ preventScroll: true }); } catch (e) {} }
  }
  function closeModal(el) {
    if (!el) return;
    el.classList.remove("open");
    document.body.style.overflow = "";
    var opener = el.dataset.opener ? document.getElementById(el.dataset.opener) : null;
    if (opener) { try { opener.focus({ preventScroll: true }); } catch (e) {} }
  }
  function closeAllModals() {
    $$(".modal.open").forEach(closeModal);
  }

  /* --- WhatsApp (корректное кодирование сообщения) --- */
  function waLink(text) {
    return "https://wa.me/" + CONFIG.whatsappNumber + "?text=" + encodeURIComponent(text);
  }
  function openWhatsApp(text) {
    var url = waLink(text);
    var w = null;
    try { w = window.open(url, "_blank"); } catch (e) { w = null; }
    if (!w) {
      var a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }

  /* ------------------------------------------------------------------
     КОРЗИНА (localStorage — общая для всех страниц)
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
    if (!itemsEl) return;

    if (!cart.length) {
      itemsEl.innerHTML = "";
      if (emptyEl) emptyEl.hidden = false;
      if (bodyEl) bodyEl.hidden = true;
      if (totalEl) totalEl.textContent = money(0);
      return;
    }

    if (emptyEl) emptyEl.hidden = true;
    if (bodyEl) bodyEl.hidden = false;

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

    if (totalEl) totalEl.textContent = money(cartTotal());
  }

  /* ------------------------------------------------------------------
     ОФОРМЛЕНИЕ ЗАКАЗА
     ------------------------------------------------------------------ */
  function fieldHtml(id, label, placeholder, type, required) {
    var hint = required
      ? ' <i class="field-required">обязательно</i>'
      : ' <i class="optional">необязательно</i>';
    return (
      '<label class="field"><span class="field-label">' + label + hint + "</span>" +
      '<input type="' + type + '" id="' + id + '" maxlength="40" placeholder="' + esc(placeholder) + '"' + (required ? " required" : "") + "></label>"
    );
  }

  function renderCheckoutFields() {
    var wrap = $("#checkoutFields");
    if (!wrap) return;

    // сохраняем введённые значения при переключении типа заказа
    var vals = {};
    $$("#checkoutFields input, #checkoutFields textarea").forEach(function (el) {
      vals[el.id] = el.value;
    });

    var html = "";
    html += fieldHtml("coName", "Имя", "Как к вам обращаться", "text", false);
    html += fieldHtml("coPhone", "Телефон", "+7 (___) ___-__-__", "tel", false);

    // Адрес спрашиваем только для доставки
    if (orderType === "delivery") {
      html += fieldHtml("coAddress", "Адрес доставки", "Улица, дом", "text", true);
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

  function collectCheckout() {
    return {
      name: $("#coName") ? $("#coName").value.trim() : "",
      phone: $("#coPhone") ? $("#coPhone").value.trim() : "",
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

    // Имя и телефон НЕ обязательны
    lines.push("Имя: " + (data.name || "не указано"));
    lines.push("Телефон: " + (data.phone || "не указан"));

    if (orderType === "delivery") {
      lines.push("Адрес: " + (data.address || "не указан"));
      if (data.entrance) lines.push("Подъезд/этаж/квартира: " + data.entrance);
    }
    if (data.comment) lines.push("Комментарий: " + data.comment);

    return lines.join("\n");
  }

  /* ------------------------------------------------------------------
     БРОНИРОВАНИЕ
     ------------------------------------------------------------------ */
  function buildTimeOptions() {
    var sel = $("#bkTime");
    if (!sel) return;
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
    var input = $("#bkDate");
    if (!input) return;
    var d = new Date();
    var iso = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    input.min = iso;
    input.value = input.value || iso;
  }

  function buildBookingMessage(data) {
    var lines = [];
    lines.push("Здравствуйте! Хочу забронировать столик в SABLYA COFFEE.");
    lines.push("Имя: " + (data.name || "не указано"));
    lines.push("Телефон: " + (data.phone || "не указан"));
    lines.push("Гостей: " + data.guests);
    lines.push("Дата: " + data.date);
    lines.push("Время: " + data.time);
    if (data.comment) lines.push("Комментарий: " + data.comment);
    return lines.join("\n");
  }

  /* ------------------------------------------------------------------
     ОТЗЫВЫ
     ------------------------------------------------------------------ */
  function renderReviews() {
    var grid = $("#reviewsGrid");
    if (!grid) return;
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

  function renderStars() {
    $$("#rvStars .star").forEach(function (btn) {
      btn.classList.toggle("active", Number(btn.dataset.val) <= reviewRating);
    });
  }

  function buildReviewMessage(data) {
    return [
      "Здравствуйте! Хочу оставить отзыв о SABLYA COFFEE.",
      "Имя: " + (data.name || "не указано"),
      "Оценка: " + data.rating + "/5",
      "Отзыв: " + data.text,
    ].join("\n");
  }

  /* ------------------------------------------------------------------
     ОБЩИЙ КАРКАС СТРАНИЦЫ (шапка, подвал, корзина, модальные окна)
     ------------------------------------------------------------------ */
  var IC_CART =
    '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M6 8h12l-1.2 11.2a1.8 1.8 0 0 1-1.8 1.6H9a1.8 1.8 0 0 1-1.8-1.6L6 8Z"/><path d="M9 10V6a3 3 0 0 1 6 0v4"/>' +
    "</svg>";
  var IC_HOME =
    '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M4 11 12 4l8 7"/><path d="M6 9.5V20h12V9.5"/>' +
    "</svg>";
  var IC_MENU =
    '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M5 5h14v3H5z"/><path d="M5 12h14v3H5z"/><path d="M5 19h9v3H5z"/>' +
    "</svg>";
  var IC_BOOK =
    '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M8 3v4M16 3v4M4 11h16"/><path d="M12 14l1.6 1.6L16 13.5"/>' +
    "</svg>";
  var IC_PIN =
    '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M12 21s7-5.1 7-11a7 7 0 1 0-14 0c0 5.9 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/>' +
    "</svg>";

  var NAV_LINKS = [
    ["index.html", "Главная"],
    ["menu.html", "Меню"],
    ["about.html", "О нас"],
    ["booking.html", "Бронь"],
    ["reviews.html", "Отзывы"],
    ["contacts.html", "Контакты"],
  ];

  var headerHtml =
    '<header class="site-header" id="siteHeader">' +
      '<div class="container header-inner">' +
        '<a class="logo" href="index.html" aria-label="SABLYA COFFEE — на главную">' +
          '<span class="logo-mark" aria-hidden="true">S</span>' +
          '<span class="logo-text">SABLYA&nbsp;<em>COFFEE</em></span>' +
        "</a>" +
        '<nav class="top-nav" aria-label="Основная навигация">' +
          NAV_LINKS.map(function (l) { return '<a class="nav-link" href="' + l[0] + '">' + l[1] + "</a>"; }).join("") +
        "</nav>" +
        '<button class="cart-btn" id="headerCartBtn" type="button" aria-label="Открыть корзину">' +
          IC_CART +
          '<span class="cart-badge" id="cartBadge" hidden>0</span>' +
        "</button>" +
      "</div>" +
    "</header>";

  var footerHtml =
    '<footer class="site-footer">' +
      '<div class="container">' +
        '<p class="footer-brand">SABLYA COFFEE</p>' +
        '<p class="footer-tagline">Вкус кофе. Характер Кавказа.</p>' +
        '<nav class="footer-nav" aria-label="Навигация в подвале">' +
          '<a href="menu.html">Меню</a>' +
          '<a href="about.html">О нас</a>' +
          '<a href="booking.html">Бронь</a>' +
          '<a href="reviews.html">Отзывы</a>' +
          '<a href="contacts.html">Контакты</a>' +
        "</nav>" +
        '<div class="footer-social">' +
          '<a href="' + CONFIG.instagram + '" target="_blank" rel="noopener">Instagram</a>' +
          '<span class="dot" aria-hidden="true"></span>' +
          '<a href="' + CONFIG.whatsappGroup + '" target="_blank" rel="noopener">WhatsApp</a>' +
        "</div>" +
        '<p class="footer-copy">© SABLYA COFFEE · <span id="footerYear">2026</span> · Бабаюрт</p>' +
      "</div>" +
    "</footer>";

  var bottomNavHtml =
    '<nav class="bottom-nav" aria-label="Мобильная навигация">' +
      '<a href="index.html" class="bn-item" data-bn="home">' + IC_HOME + "<span>Главная</span></a>" +
      '<a href="menu.html" class="bn-item" data-bn="menu">' + IC_MENU + "<span>Меню</span></a>" +
      '<button class="bn-item" id="bnCart" type="button" data-bn="cart">' +
        '<span class="bn-cart-icon">' + IC_CART + '<span class="cart-badge" id="bnCartBadge" hidden>0</span></span>' +
        "<span>Корзина</span>" +
      "</button>" +
      '<a href="booking.html" class="bn-item" data-bn="booking">' + IC_BOOK + "<span>Бронь</span></a>" +
      '<a href="contacts.html" class="bn-item" data-bn="contacts">' + IC_PIN + "<span>Контакты</span></a>" +
    "</nav>";

  var cartModalHtml =
    '<div class="modal" id="cartModal" aria-hidden="true">' +
      '<div class="modal-backdrop" data-close></div>' +
      '<div class="modal-panel modal-panel--cart" role="dialog" aria-modal="true" aria-label="Корзина">' +
        '<div class="modal-head">' +
          '<h2 class="modal-title">Корзина</h2>' +
          '<button class="modal-close" data-close type="button" aria-label="Закрыть корзину">×</button>' +
        "</div>" +
        '<div class="cart-scroll">' +
          '<div id="cartItems" class="cart-items"></div>' +
          '<div id="cartEmpty" class="cart-empty">' +
            "<p>В корзине пока пусто</p>" +
            '<p class="cart-empty-sub">Загляните в меню — там много интересного.</p>' +
            '<button class="btn btn--outline" id="toMenuBtn" type="button">Перейти в меню</button>' +
          "</div>" +
          '<div id="cartBody" class="cart-body" hidden>' +
            '<div class="cart-tools">' +
              '<span class="cart-save-note">Корзина сохраняется автоматически</span>' +
              '<button class="link-btn link-btn--danger" id="clearCartBtn" type="button">Очистить корзину</button>' +
            "</div>" +
            '<div class="order-type">' +
              '<p class="field-label">Тип заказа</p>' +
              '<div class="order-type-grid" id="orderTypeWrap">' +
                '<button class="order-type-btn" type="button" data-type="dine"><span class="ot-emoji" aria-hidden="true">🪑</span>В заведении</button>' +
                '<button class="order-type-btn" type="button" data-type="takeaway"><span class="ot-emoji" aria-hidden="true">🛍</span>С собой</button>' +
                '<button class="order-type-btn" type="button" data-type="delivery"><span class="ot-emoji" aria-hidden="true">🛵</span>Доставка</button>' +
              "</div>" +
            "</div>" +
            '<form id="checkoutForm" novalidate>' +
              '<div class="form-fields" id="checkoutFields"></div>' +
              '<div class="cart-total-row"><span>Итого</span><strong id="cartTotal">0 ₽</strong></div>' +
              '<button type="submit" class="btn btn--primary btn--wide" id="submitOrderBtn">Оформить заказ</button>' +
              '<p class="form-hint">Заказ откроется в WhatsApp — останется нажать «Отправить».</p>' +
            "</form>" +
          "</div>" +
        "</div>" +
      "</div>" +
    "</div>";

  var productModalHtml =
    '<div class="modal" id="productModal" aria-hidden="true">' +
      '<div class="modal-backdrop" data-close></div>' +
      '<div class="modal-panel modal-panel--product" role="dialog" aria-modal="true" aria-labelledby="pmodalName">' +
        '<div class="modal-head">' +
          '<h2 class="modal-title" id="pmodalName"></h2>' +
          '<button class="modal-close" data-close type="button" aria-label="Закрыть">×</button>' +
        "</div>" +
        '<div class="modal-body">' +
          '<p class="modal-desc" id="pmodalDesc"></p>' +
          '<div class="pmodal-cat" id="pmodalCat"></div>' +
          '<div class="pmodal-block" id="pmodalSizesBlock">' +
            '<p class="pmodal-label">Объём</p>' +
            '<div class="size-options" id="pmodalSizes" role="radiogroup" aria-label="Выберите объём"></div>' +
          "</div>" +
          '<div class="pmodal-block" id="pmodalAddonsBlock" hidden>' +
            '<p class="pmodal-label">Добавки</p>' +
            '<div id="pmodalAddons"></div>' +
          "</div>" +
          '<div class="pmodal-bottom">' +
            '<div class="stepper">' +
              '<button type="button" class="stepper-btn" id="pqMinus" aria-label="Меньше">−</button>' +
              '<span class="stepper-value" id="pqValue">1</span>' +
              '<button type="button" class="stepper-btn" id="pqPlus" aria-label="Больше">+</button>' +
            "</div>" +
            '<button class="btn btn--primary btn--grow" id="pmodalAddBtn" type="button">Добавить в корзину</button>' +
          "</div>" +
        "</div>" +
      "</div>" +
    "</div>";

  var reviewModalHtml =
    '<div class="modal" id="reviewModal" aria-hidden="true">' +
      '<div class="modal-backdrop" data-close></div>' +
      '<div class="modal-panel" role="dialog" aria-modal="true" aria-label="Оставить отзыв">' +
        '<div class="modal-head">' +
          '<h2 class="modal-title">Оставить отзыв</h2>' +
          '<button class="modal-close" data-close type="button" aria-label="Закрыть">×</button>' +
        "</div>" +
        '<div class="modal-body">' +
          '<form id="reviewForm" novalidate>' +
            '<label class="field">' +
              '<span class="field-label">Имя <i class="optional">необязательно</i></span>' +
              '<input type="text" id="rvName" maxlength="40" placeholder="Ваше имя">' +
            "</label>" +
            '<div class="field" style="margin-top:14px;">' +
              '<span class="field-label">Оценка <i class="field-required">обязательно</i></span>' +
              '<div class="stars" id="rvStars" role="radiogroup" aria-label="Оценка от 1 до 5">' +
                '<button type="button" class="star" data-val="1" aria-label="1 звезда">★</button>' +
                '<button type="button" class="star" data-val="2" aria-label="2 звезды">★</button>' +
                '<button type="button" class="star" data-val="3" aria-label="3 звезды">★</button>' +
                '<button type="button" class="star" data-val="4" aria-label="4 звезды">★</button>' +
                '<button type="button" class="star" data-val="5" aria-label="5 звёзд">★</button>' +
              "</div>" +
            "</div>" +
            '<label class="field" style="margin-top:14px;">' +
              '<span class="field-label">Отзыв <i class="field-required">обязательно</i></span>' +
              '<textarea id="rvText" rows="4" maxlength="600" placeholder="Поделитесь впечатлениями"></textarea>' +
            "</label>" +
            '<button type="submit" class="btn btn--primary btn--wide" style="margin-top:16px;">Отправить отзыв</button>' +
            '<p class="form-hint">Отзыв отправится нам в WhatsApp. После модерации он появится на сайте.</p>' +
          "</form>" +
        "</div>" +
      "</div>" +
    "</div>";

  var toastHtml = '<div class="toast" id="toast" role="status" aria-live="polite"></div>';

  function parseHtml(html) {
    var d = document.createElement("div");
    d.innerHTML = html;
    return d.firstElementChild;
  }

  function setActiveNav() {
    var file = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
    if (!file || file === "/") file = "index.html";

    $$(".site-header .nav-link").forEach(function (a) {
      var href = (a.getAttribute("href") || "").toLowerCase();
      if (href === file) {
        a.classList.add("active");
        a.setAttribute("aria-current", "page");
      }
    });
    $$(".bottom-nav .bn-item").forEach(function (a) {
      var href = (a.getAttribute("href") || "").toLowerCase();
      if (href === file) a.classList.add("active");
    });
  }

  function bindCartModal() {
    var cartModal = $("#cartModal");
    if (!cartModal) return;

    cartModal.addEventListener("click", function (e) {
      if (e.target.closest("[data-close]")) closeModal(cartModal);
    });

    $("#toMenuBtn").addEventListener("click", function () {
      closeModal(cartModal);
      window.location.href = "menu.html";
    });

    // Очистка корзины с подтверждением
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

    // Тип заказа
    $$("#orderTypeWrap .order-type-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        orderType = btn.dataset.type;
        $$("#orderTypeWrap .order-type-btn").forEach(function (b) {
          b.classList.toggle("selected", b === btn);
        });
        renderCheckoutFields();
      });
    });
    var dineBtn = document.querySelector('#orderTypeWrap .order-type-btn[data-type="dine"]');
    if (dineBtn) dineBtn.classList.add("selected");
    renderCheckoutFields();

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

    // Сброс подсветки ошибки при вводе
    $("#checkoutFields").addEventListener("input", function (e) {
      var f = e.target.closest(".field-error");
      if (f) f.classList.remove("field-error");
    });

    // ============ ОФОРМЛЕНИЕ ЗАКАЗА ============
    $("#checkoutForm").addEventListener("submit", function (e) {
      e.preventDefault();

      // 1. Корзина не пустая
      if (!cart.length) {
        toast("Корзина пуста");
        return;
      }

      var data = collectCheckout();

      // 2. Для доставки адрес обязателен — с понятной ошибкой
      if (orderType === "delivery" && !data.address) {
        toast("Укажите адрес доставки");
        var addr = $("#coAddress");
        if (addr) {
          addr.closest(".field").classList.add("field-error");
          try { addr.focus({ preventScroll: true }); } catch (err) {}
        }
        return;
      }

      // 3. Формируем сообщение и открываем WhatsApp
      openWhatsApp(buildOrderMessage(data));
      toast("Заказ сформирован в WhatsApp");
    });
  }

  function injectShell() {
    var body = document.body;
    var main = document.getElementById("main");

    var header = parseHtml(headerHtml);
    if (main) {
      body.insertBefore(header, main);
    } else {
      body.insertBefore(header, body.firstChild);
    }

    body.appendChild(parseHtml(footerHtml));
    body.appendChild(parseHtml(bottomNavHtml));
    body.appendChild(parseHtml(cartModalHtml));
    body.appendChild(parseHtml(toastHtml));

    if (PAGE === "menu") body.appendChild(parseHtml(productModalHtml));
    if (PAGE === "reviews") body.appendChild(parseHtml(reviewModalHtml));

    // Открытие корзины из шапки и нижней навигации
    var headerBtn = $("#headerCartBtn");
    if (headerBtn) headerBtn.addEventListener("click", function () { openModal($("#cartModal"), headerBtn); });
    var bnCart = $("#bnCart");
    if (bnCart) bnCart.addEventListener("click", function () { openModal($("#cartModal"), bnCart); });

    bindCartModal();
    setActiveNav();
  }

  /* ------------------------------------------------------------------
     СТРАНИЦА МЕНЮ
     ------------------------------------------------------------------ */
  function renderChips() {
    var wrap = $("#categoryChips");
    if (!wrap) return;
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

  // Поиск с учётом русских словоформ: «коктейль» находит «Коктейли»
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
      return stemSearch(hay).indexOf(stemSearch(q)) !== -1;
    });
  }

  function renderMenu() {
    var grid = $("#productGrid");
    if (!grid) return;
    var list = filteredProducts();
    var empty = $("#menuEmpty");

    if (!list.length) {
      grid.innerHTML = "";
      if (empty) {
        empty.hidden = false;
        $("#emptyQuery").textContent = searchQuery.trim();
      }
      return;
    }

    if (empty) empty.hidden = true;

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

  function openProductModal(productId, presetSize) {
    var p = products.find(function (x) { return x.id === productId; });
    if (!p) return;

    pm = {
      product: p,
      sizeIndex: Math.min(presetSize || 0, p.sizes.length - 1),
      addons: [],
      qty: 1,
    };

    $("#pmodalName").textContent = p.name;
    $("#pmodalDesc").textContent = p.desc || "";
    $("#pmodalCat").textContent = categoryLabel(p.category);
    $("#pqValue").textContent = "1";

    var sizesWrap = $("#pmodalSizes");
    sizesWrap.innerHTML = p.sizes.map(function (s, i) {
      return (
        '<button type="button" class="size-opt" data-size="' + i + '">' +
          '<span class="opt-label"><span class="radio" aria-hidden="true"></span>' + esc(s.volume) + "</span>" +
          '<span class="opt-price">' + money(s.price) + "</span>" +
        "</button>"
      );
    }).join("");

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
    if (!pm) return;
    var p = pm.product;

    $$("#pmodalSizes .size-opt").forEach(function (el) {
      el.classList.toggle("selected", Number(el.dataset.size) === pm.sizeIndex);
    });
    $$("#pmodalAddons .addon-opt").forEach(function (el) {
      el.classList.toggle("selected", pm.addons.indexOf(el.dataset.key) !== -1);
    });

    var addonPrice = pm.addons.reduce(function (s, key) {
      var parts = key.split(":");
      var group = ADDONS[parts[0]];
      return s + (group ? group[Number(parts[1])].price : 0);
    }, 0);
    var unit = p.sizes[pm.sizeIndex].price + addonPrice;
    $("#pmodalAddBtn").textContent = "Добавить в корзину — " + money(unit);
  }

  function initMenuPage() {
    if (!$("#categoryChips")) return;

    var count = $("#menuCount");
    if (count) count.textContent = products.length;

    renderChips();
    renderMenu();

    // Категории
    $("#categoryChips").addEventListener("click", function (e) {
      var chip = e.target.closest(".chip");
      if (!chip) return;
      activeCategory = chip.dataset.cat;
      renderChips();
      renderMenu();
      var grid = $("#productGrid");
      if (grid && grid.firstElementChild) {
        grid.firstElementChild.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
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

    // Карточки товаров
    $("#productGrid").addEventListener("click", function (e) {
      var card = e.target.closest(".product-card");
      if (!card) return;
      var id = Number(card.dataset.id);
      var sizeRow = e.target.closest(".size-row");
      var addBtn = e.target.closest(".pc-add");
      if (sizeRow) openProductModal(id, Number(sizeRow.dataset.size));
      else if (addBtn) openProductModal(id, 0);
      else openProductModal(id, 0);
    });
    $("#productGrid").addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      var sizeRow = e.target.closest(".size-row");
      if (sizeRow) {
        e.preventDefault();
        openProductModal(Number(sizeRow.closest(".product-card").dataset.id), Number(sizeRow.dataset.size));
      }
    });

    // Модальное окно товара
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

    var productModal = $("#productModal");
    if (productModal) {
      productModal.addEventListener("click", function (e) {
        if (e.target.closest("[data-close]")) closeModal(productModal);
      });
    }
  }

  /* ------------------------------------------------------------------
     СТРАНИЦА БРОНИРОВАНИЯ
     ------------------------------------------------------------------ */
  function initBookingPage() {
    if (!$("#bookingForm")) return;

    buildTimeOptions();
    setMinDate();

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

      // Обязательны только дата и время
      if (!date) { toast("Пожалуйста, выберите дату"); return; }
      if (date < isoToday()) { toast("Нельзя выбрать прошедшую дату"); return; }
      if (!time) { toast("Пожалуйста, выберите время"); return; }

      openWhatsApp(buildBookingMessage({ name: name, phone: phone, guests: guests, date: date, time: time, comment: comment }));
      toast("Бронь сформирована в WhatsApp");
    });
  }

  /* ------------------------------------------------------------------
     СТРАНИЦА ОТЗЫВОВ
     ------------------------------------------------------------------ */
  function initReviewsPage() {
    if (!$("#reviewsGrid")) return;

    renderReviews();
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

    var reviewModal = $("#reviewModal");
    if (reviewModal) {
      reviewModal.addEventListener("click", function (e) {
        if (e.target.closest("[data-close]")) closeModal(reviewModal);
      });
    }

    $("#reviewForm").addEventListener("submit", function (e) {
      e.preventDefault();
      var name = $("#rvName").value.trim();
      var text = $("#rvText").value.trim();

      // Обязателен только текст
      if (!text) { toast("Пожалуйста, напишите отзыв"); return; }

      openWhatsApp(buildReviewMessage({ name: name, rating: reviewRating, text: text }));
      closeModal($("#reviewModal"));
      $("#rvText").value = "";
      $("#rvName").value = "";
      toast("Отзыв отправлен, спасибо!");
    });
  }

  /* ------------------------------------------------------------------
     ПРОЧЕЕ: появление при прокрутке, якоря, ESC
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

  /* ------------------------------------------------------------------
     ИНИЦИАЛИЗАЦИЯ
     ------------------------------------------------------------------ */
  function init() {
    injectShell();
    renderCartUI();

    var year = $("#footerYear");
    if (year) year.textContent = new Date().getFullYear();

    var sp = $("#statProducts");
    var sc = $("#statCategories");
    if (sp) sp.textContent = products.length;
    if (sc) sc.textContent = categories.length - 1;

    if (PAGE === "menu") initMenuPage();
    if (PAGE === "booking") initBookingPage();
    if (PAGE === "reviews") initReviewsPage();

    initReveal();

    // Плавная прокрутка для внутренних якорей (например #hero на главной)
    $$('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var id = a.getAttribute("href");
        if (id && id.length > 1) {
          var target = document.querySelector(id);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
          }
        }
      });
    });

    // ESC закрывает модальные окна
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeAllModals();
    });
  }

  function boot() {
    if (typeof document === "undefined") return; // node-совместимость (тесты данных)
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }
  }
  boot();

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
