const intro = document.getElementById("intro");
const invitation = document.getElementById("invitation");
const openInviteBtn = document.getElementById("openInviteBtn");
const letterHero = document.getElementById("letterHero");
const languageSwitcher = document.querySelector(".language-switcher");
const languageButtons = document.querySelectorAll(".language-option");
const musicToggleBtn = document.getElementById("musicToggleBtn");
const backgroundMusic = document.getElementById("backgroundMusic");

const targetWeddingDate = new Date("2026-09-25T07:00:00+05:00").getTime();
const OPENING_DURATION_MS = 1000;
const DEFAULT_LANGUAGE = "uz";
const LANGUAGE_STORAGE_KEY = "weddingInvitationLanguage";
const MUSIC_VOLUME = 0.16;
const ONE_SECOND_MS = 1000;
const ONE_MINUTE_MS = ONE_SECOND_MS * 60;
const ONE_HOUR_MS = ONE_MINUTE_MS * 60;
const ONE_DAY_MS = ONE_HOUR_MS * 24;

firebase.initializeApp({
    apiKey: "AIzaSyA74BmbXZyK3bu0Szsykbtq-_r3LksfkeU",
    authDomain: "muhammadrizo-wedding.firebaseapp.com",
    projectId: "muhammadrizo-wedding",
    storageBucket: "muhammadrizo-wedding.firebasestorage.app",
    messagingSenderId: "729775062921",
    appId: "1:729775062921:web:30f1629d5dab8c19deeb58"
});
const db = firebase.firestore();

const INITIAL_WISHES = [];

function createWishCard(wish, isNew) {
    const card = document.createElement("div");
    card.className = "wish-card" + (isNew ? " wish-card--new" : "");
    card.innerHTML = '<p class="wish-text"></p><p class="wish-author"></p>';
    card.querySelector(".wish-text").textContent = wish.text;
    card.querySelector(".wish-author").textContent = wish.name;
    return card;
}

function renderWishes() {
    const grid = document.getElementById("wishesGrid");
    if (!grid) return;
    grid.innerHTML = "";
    INITIAL_WISHES.forEach(function(w) { grid.appendChild(createWishCard(w, false)); });
    db.collection("wishes").where("approved", "==", true)
        .onSnapshot(function(snapshot) {
            var cards = grid.querySelectorAll(".wish-card--firestore");
            cards.forEach(function(c) { c.remove(); });
            snapshot.forEach(function(doc) {
                var d = doc.data();
                var card = createWishCard({ name: d.name, text: d.text }, false);
                card.classList.add("wish-card--firestore");
                grid.appendChild(card);
            });
        });
}

function setupWishesToggle() {
    const btn = document.getElementById("wishesToggleBtn");
    const grid = document.getElementById("wishesGrid");
    if (!btn || !grid) return;
    let expanded = false;
    btn.addEventListener("click", function() {
        expanded = !expanded;
        grid.classList.toggle("expanded", expanded);
        const locale = getLocale();
        btn.textContent = expanded ? (locale.wishesHideAll || "YOPISH") : (locale.wishesShowAll || "BARCHA TILAKLARNI KO'RISH");
    });
}

function setupWishesForm() {
    const form = document.getElementById("wishesForm");
    if (!form) return;
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        const nameInput = document.getElementById("wishName");
        const msgInput = document.getElementById("wishMessage");
        const name = nameInput.value.trim();
        const text = msgInput.value.trim();
        if (!name) { nameInput.focus(); return; }
        if (!text) { msgInput.focus(); return; }
        var submitBtn = form.querySelector(".wishes-submit-btn");
        if (submitBtn) submitBtn.disabled = true;
        db.collection("wishes").add({
            name: name,
            text: text,
            approved: true,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        }).then(function() {
            form.reset();
            if (submitBtn) submitBtn.disabled = false;
            alert("Rahmat! Tilagingiz qo'shildi.");
        }).catch(function() {
            if (submitBtn) submitBtn.disabled = false;
            alert("Xatolik yuz berdi. Qayta urinib ko'ring.");
        });
    });
}

const LOCALES = {
    ru: {
        pageTitle: "Мухаммадризо | Свадебное приглашение",
        metaDescription: "Приглашение на никох Мухаммадризо, 25 сентября 2026 года.",
        ariaIntro: "Конверт с приглашением",
        ariaEnvelope: "Запечатанный бумажный конверт",
        ariaWeddingDate: "Дата свадьбы",
        ariaCalendar: "Календарь сентября 2026 с выделенным 25 сентября",
        ariaWeddingDay: "День свадьбы",
        ariaOrnamentHero: "Традиционная страница с именем жениха",
        ariaVenueDetails: "Место проведения",
        ariaCountdown: "Обратный отсчет",
        envelopeTopNote: "<span class=\"flap-note-top\">ВАС</span><span class=\"flap-note-middle\">ПРИГЛАШАЕМ</span><span class=\"flap-note-script\">на нахорги ош</span>",
        withLove: "с уважением,",
        signatureNames: "НАЖМЕДДИНОВЛАР ОИЛАСИ",
        ornamentNames: "<span class=\"ornament-name-line\">Мухаммадризо</span>",
        ornamentDay: "25",
        ornamentMonth: "09",
        ornamentYear: "26",
        heroNames: "Уважаемый&nbsp;дорогой<br /><span class=\"no-break\">гость!</span>",
        openHere: "открыть",
        lead: "Приглашаем Вас и Вашу семью на нахорги ош по случаю никоха нашего сына Мухаммадризо.<br /><br /><strong>Будем рады видеть Вас в числе наших дорогих гостей.</strong>",
        scrollHint: "Прокрутите вниз",
        calendarMonth: "Сентябрь, 2026",
        weekdayMon: "ПН",
        weekdayTue: "ВТ",
        weekdayWed: "СР",
        weekdayThu: "ЧТ",
        weekdayFri: "ПТ",
        weekdaySat: "СБ",
        weekdaySun: "ВС",
        locationTitle: "Адрес тойхоны:",
        venueName: "Тойхона Nursaroy",
        venueTime: "Нахорги ош",
        venueAddress: "г. Андижан, улица 80 метров",
        venueLandmark: "",
        mapLinkYandex: "Яндекс Карты",
        mapLinkGoogle: "Google Maps",
        countdownTitle: "Считаем каждое мгновение",
        unitDays: "Дней",
        unitHours: "Часов",
        unitMinutes: "Минут",
        unitSeconds: "Секунд",
        countdownWaiting: "Мы ждем вас.",
        countdownToday: "Этот день настал. Мы ждем вас.",
        languageSwitcher: "Выбор языка",
        languageRuLabel: "Русский",
        languageUzLabel: "O'zbekcha",
        musicPlayLabel: "Включить музыку",
        musicPauseLabel: "Остановить музыку",
        wishesTitle: "Пожелания",
        wishesSubtitle: "ТЁПЛЫЕ СЛОВА ОТ БЛИЗКИХ",
        wishesShowAll: "ПОКАЗАТЬ ВСЕ ПОЖЕЛАНИЯ",
        wishesHideAll: "СКРЫТЬ",
        wishesFormTitle: "Оставьте пожелание",
        wishesFormDesc: "Ваше пожелание будет опубликовано после проверки.",
        wishesNameLabel: "ВАШЕ ИМЯ",
        wishesNamePlaceholder: "Введите ваше имя",
        wishesMessageLabel: "ПОЖЕЛАНИЕ",
        wishesMessagePlaceholder: "Тёплые слова...",
        wishesSubmit: "ОТПРАВИТЬ",
    },
    uz: {
        pageTitle: "Muhammadrizo | Nikoh to'yi",
        metaDescription: "Muhammadrizoning 2026-yil 25-sentyabrdagi nikoh to'yi taklifnomasi.",
        ariaIntro: "Taklifnoma konverti",
        ariaEnvelope: "Muhrlangan qog'oz konvert",
        ariaWeddingDate: "To'y sanasi",
        ariaCalendar: "2026-yil sentyabr kalendari, 25-sentyabr belgilangan",
        ariaWeddingDay: "To'y kuni",
        ariaOrnamentHero: "Kuyov ismi tushirilgan an'anaviy sahifa",
        ariaVenueDetails: "Manzil",
        ariaCountdown: "Orqaga sanoq",
        envelopeTopNote: "<span class=\"flap-note-top\">SIZNI</span><span class=\"flap-note-middle\">NAHORGI OSHIMIZGA</span><span class=\"flap-note-script\">taklif etamiz</span>",
        withLove: "hurmat va ehtirom ila,",
        signatureNames: "NAJMEDDINOVLAR OILASI",
        ornamentNames: "<span class=\"ornament-name-line\">Muhammadrizo</span>",
        ornamentDay: "25",
        ornamentMonth: "09",
        ornamentYear: "26",
        heroNames: "Hurmatli Aziz<br /><span class=\"no-break\">Mehmonimiz!</span>",
        openHere: "ochish",
        lead: "Sizni va oila a'zolaringizni farzandimiz Muhammadrizoning \"NIKOH\" to'yi munosabati bilan nahorgi osh dasturxonimizga samimiy taklif etamiz.<br /><br /><strong>Quvonchli kunimizda aziz mehmonimiz bo'lishingizni intizorlik bilan kutamiz.</strong>",
        scrollHint: "Pastga tushuring",
        calendarMonth: "Sentyabr, 2026",
        weekdayMon: "DU",
        weekdayTue: "SE",
        weekdayWed: "CHOR",
        weekdayThu: "PAY",
        weekdayFri: "JU",
        weekdaySat: "SHA",
        weekdaySun: "YA",
        locationTitle: "To'yxona manzili:",
        venueName: "Nursaroy to'yxonasi",
        venueTime: "Nahorgi osh",
        venueAddress: "Andijon sh. 80 metr ko'cha",
        venueLandmark: "",
        mapLinkYandex: "Yandex xaritasi",
        mapLinkGoogle: "Google Maps",
        countdownTitle: "Har lahzani sanayapmiz",
        unitDays: "Kun",
        unitHours: "Soat",
        unitMinutes: "Daqiqa",
        unitSeconds: "Soniya",
        countdownWaiting: "Sizni intiqlik bilan kutamiz.",
        countdownToday: "Bugun aynan o'sha kun. Sizni kutamiz.",
        languageSwitcher: "Til tanlash",
        languageRuLabel: "Ruscha",
        languageUzLabel: "O'zbekcha",
        musicPlayLabel: "Musiqani yoqish",
        musicPauseLabel: "Musiqani to'xtatish",
        wishesTitle: "Tilaklar",
        wishesSubtitle: "YAQINLARIMIZDAN ILIQ SO'ZLAR",
        wishesShowAll: "BARCHA TILAKLARNI KO'RISH",
        wishesHideAll: "YOPISH",
        wishesFormTitle: "Tilak qoldiring",
        wishesFormDesc: "Tilagingiz ko'rib chiqilgandan so'ng sahifada chop etiladi.",
        wishesNameLabel: "ISMINGIZ",
        wishesNamePlaceholder: "Ismingizni kiriting",
        wishesMessageLabel: "TILAGINGIZ",
        wishesMessagePlaceholder: "Iliq so'zlaringiz...",
        wishesSubmit: "YUBORISH",
    },
    en: {
        pageTitle: "Muhammadrizo | Wedding Invitation",
        metaDescription: "Wedding invitation of Muhammadrizo, September 25, 2026.",
        ariaIntro: "Invitation envelope",
        ariaEnvelope: "Sealed paper envelope",
        ariaWeddingDate: "Wedding date",
        ariaCalendar: "September 2026 calendar, September 25 highlighted",
        ariaWeddingDay: "Wedding day",
        ariaOrnamentHero: "Traditional page with the groom's name",
        ariaVenueDetails: "Venue details",
        ariaCountdown: "Countdown",
        envelopeTopNote: "<span class=\"flap-note-top\">YOU ARE</span><span class=\"flap-note-middle\">INVITED</span><span class=\"flap-note-script\">to the morning feast</span>",
        withLove: "with respect,",
        signatureNames: "NAJMEDDINOV FAMILY",
        ornamentNames: "<span class=\"ornament-name-line\">Muhammadrizo</span>",
        heroNames: "Dear honored<br /><span class=\"no-break\">guest!</span>",
        openHere: "open",
        lead: "We invite you and your family to the morning feast celebrating the nikoh of our son Muhammadrizo.<br /><br /><strong>We look forward to having you as our cherished guest.</strong>",
        scrollHint: "Scroll down",
        calendarMonth: "September, 2026",
        weekdayMon: "Mo",
        weekdayTue: "Tu",
        weekdayWed: "We",
        weekdayThu: "Th",
        weekdayFri: "Fr",
        weekdaySat: "Sa",
        weekdaySun: "Su",
        locationTitle: "Venue address:",
        venueName: "Nursaroy Wedding Hall",
        venueTime: "Morning feast",
        venueAddress: "Andijan, 80 meters street",
        venueLandmark: "",
        mapLinkYandex: "Yandex Maps",
        mapLinkGoogle: "Google Maps",
        countdownTitle: "Counting every moment",
        unitDays: "Days",
        unitHours: "Hours",
        unitMinutes: "Minutes",
        unitSeconds: "Seconds",
        countdownWaiting: "We look forward to seeing you.",
        countdownToday: "Today is the day. We are waiting for you.",
        languageSwitcher: "Language",
        languageRuLabel: "Russian",
        languageUzLabel: "Uzbek",
        musicPlayLabel: "Play music",
        musicPauseLabel: "Pause music",
        wishesTitle: "Wishes",
        wishesSubtitle: "WARM WORDS FROM LOVED ONES",
        wishesShowAll: "VIEW ALL WISHES",
        wishesHideAll: "HIDE",
        wishesFormTitle: "Leave a wish",
        wishesFormDesc: "Your wish will be published after review.",
        wishesNameLabel: "YOUR NAME",
        wishesNamePlaceholder: "Enter your name",
        wishesMessageLabel: "YOUR WISH",
        wishesMessagePlaceholder: "Warm words...",
        wishesSubmit: "SUBMIT",
    },

};

let isOpening = false;
let currentLanguage = DEFAULT_LANGUAGE;
let ornamentNameFitFrame = null;

function resetPageScrollToTop() {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
}

function getLocale() {
    return LOCALES[currentLanguage] || LOCALES[DEFAULT_LANGUAGE];
}

function isMusicPlaying() {
    if (!backgroundMusic) return false;
    return !backgroundMusic.paused && !backgroundMusic.ended;
}

function updateMusicToggleState(isPlaying = false) {
    if (!musicToggleBtn) return;
    const locale = getLocale();
    const label = isPlaying ? locale.musicPauseLabel : locale.musicPlayLabel;
    musicToggleBtn.classList.toggle("is-playing", isPlaying);
    musicToggleBtn.setAttribute("aria-pressed", isPlaying ? "true" : "false");
    musicToggleBtn.setAttribute("aria-label", label);
    musicToggleBtn.setAttribute("title", label);
}

function playBackgroundMusic() {
    if (!backgroundMusic) return;
    backgroundMusic.loop = true;
    backgroundMusic.volume = MUSIC_VOLUME;
    const playPromise = backgroundMusic.play();
    if (playPromise && typeof playPromise.then === "function") {
        playPromise.then(() => updateMusicToggleState(true)).catch(() => updateMusicToggleState(false));
        return;
    }
    updateMusicToggleState(isMusicPlaying());
}

function stopBackgroundMusic() {
    if (!backgroundMusic) return;
    backgroundMusic.pause();
    updateMusicToggleState(false);
}

function toggleBackgroundMusic() {
    if (!backgroundMusic) return;
    if (isMusicPlaying()) {
        stopBackgroundMusic();
        return;
    }
    playBackgroundMusic();
}

function setLanguageSwitcherState(lang) {
    languageButtons.forEach((button) => {
        const isActive = button.dataset.language === lang;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
}

function saveLanguagePreference(lang) {
    try {
        window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch (_) {
    }
}

function getSavedLanguagePreference() {
    try {
        const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
        return LOCALES[saved] ? saved : null;
    } catch (_) {
        return null;
    }
}

function getInitialLanguage() {
    return getSavedLanguagePreference() || DEFAULT_LANGUAGE;
}

function fitOrnamentNames() {
    const namesBlock = document.querySelector(".ornament-names");
    if (!namesBlock) return;
    const nameLines = Array.from(namesBlock.querySelectorAll(".ornament-name-line"));
    if (!nameLines.length) return;
    namesBlock.style.setProperty("--ornament-name-fit-scale", "1");
    nameLines.forEach((line) => line.style.setProperty("--line-fit-scale", "1"));
    const availableWidth = namesBlock.clientWidth;
    if (!availableWidth) return;
    const sideSafePadding = Math.max(8, availableWidth * 0.045);
    const safeWidth = Math.max(0, availableWidth - sideSafePadding * 2);
    if (!safeWidth) return;
    nameLines.forEach((line) => {
        const lineWidth = line.scrollWidth;
        if (!lineWidth) return;
        const fitScale = Math.max(0.68, Math.min(1, (safeWidth / lineWidth) * 0.985));
        line.style.setProperty("--line-fit-scale", fitScale.toFixed(3));
    });
}

function scheduleOrnamentNameFit() {
    if (ornamentNameFitFrame !== null) window.cancelAnimationFrame(ornamentNameFitFrame);
    ornamentNameFitFrame = window.requestAnimationFrame(() => {
        fitOrnamentNames();
        ornamentNameFitFrame = null;
    });
}

function applyTranslations(lang = DEFAULT_LANGUAGE) {
    if (!LOCALES[lang]) return;
    currentLanguage = lang;
    setLanguageSwitcherState(lang);
    const locale = getLocale();
    document.documentElement.lang = lang;
    document.title = locale.pageTitle;
    document.querySelectorAll("[data-i18n]").forEach((node) => {
        const key = node.getAttribute("data-i18n");
        if (key && Object.prototype.hasOwnProperty.call(locale, key)) node.textContent = locale[key];
    });
    document.querySelectorAll("[data-i18n-html]").forEach((node) => {
        const key = node.getAttribute("data-i18n-html");
        if (key && Object.prototype.hasOwnProperty.call(locale, key)) node.innerHTML = locale[key];
    });
    document.querySelectorAll("[data-i18n-attr]").forEach((node) => {
        const rawMapping = node.getAttribute("data-i18n-attr");
        if (!rawMapping) return;
        rawMapping.split(";").forEach((pair) => {
            const [attr, key] = pair.split(":").map((item) => item.trim());
            if (!attr || !key) return;
            if (Object.prototype.hasOwnProperty.call(locale, key)) node.setAttribute(attr, locale[key]);
        });
    });
    const countdownMessage = document.getElementById("countdownMessage");
    if (countdownMessage) countdownMessage.textContent = locale.countdownWaiting;
    scheduleOrnamentNameFit();
    updateMusicToggleState(isMusicPlaying());
}

function openInvitation() {
    if (isOpening) return;
    isOpening = true;
    intro.classList.add("opened");
    openInviteBtn.setAttribute("aria-expanded", "true");
    playBackgroundMusic();
    window.setTimeout(() => {
        openInviteBtn.blur();
        document.body.classList.remove("intro-active");
        resetPageScrollToTop();
        window.requestAnimationFrame(resetPageScrollToTop);
        document.body.classList.add("invitation-visible");
        invitation.setAttribute("aria-hidden", "false");
        intro.classList.add("fade-out");
        revealVisibleSections();
        window.setTimeout(() => {
            intro.hidden = true;
        }, 900);
    }, OPENING_DURATION_MS);
}

function revealVisibleSections() {
    const reveals = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
        reveals.forEach((node) => node.classList.add("visible"));
        return;
    }
    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("visible");
            currentObserver.unobserve(entry.target);
        });
    }, {threshold: 0.2, rootMargin: "0px 0px -8% 0px"});
    reveals.forEach((node, index) => {
        node.style.transitionDelay = `${Math.min(index * 90, 360)}ms`;
        observer.observe(node);
    });
}

function observeHeroVisibility() {
    if (!letterHero) return;
    if (!("IntersectionObserver" in window)) {
        document.body.classList.add("hero-in-view");
        return;
    }
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            document.body.classList.toggle("hero-in-view", entry.isIntersecting);
        });
    }, {threshold: 0.22});
    heroObserver.observe(letterHero);
}

function setCountdownValues(days, hours, minutes, seconds) {
    document.getElementById("days").textContent = String(days).padStart(2, "0");
    document.getElementById("hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

function updateCountdown() {
    const now = Date.now();
    const difference = targetWeddingDate - now;
    const countdownMessage = document.getElementById("countdownMessage");
    const locale = getLocale();
    if (difference <= 0) {
        setCountdownValues(0, 0, 0, 0);
        countdownMessage.textContent = locale.countdownToday;
        return false;
    }
    const days = Math.floor(difference / ONE_DAY_MS);
    const hours = Math.floor((difference % ONE_DAY_MS) / ONE_HOUR_MS);
    const minutes = Math.floor((difference % ONE_HOUR_MS) / ONE_MINUTE_MS);
    const seconds = Math.floor((difference % ONE_MINUTE_MS) / ONE_SECOND_MS);
    setCountdownValues(days, hours, minutes, seconds);
    countdownMessage.textContent = locale.countdownWaiting;
    return true;
}

function handleLanguageSwitcherClick(event) {
    const button = event.target.closest(".language-option");
    if (!button) return;
    const selectedLanguage = button.dataset.language;
    if (!selectedLanguage || selectedLanguage === currentLanguage || !LOCALES[selectedLanguage]) return;
    applyTranslations(selectedLanguage);
    updateCountdown();
    saveLanguagePreference(selectedLanguage);
}

openInviteBtn.addEventListener("click", openInvitation);
if (languageSwitcher) languageSwitcher.addEventListener("click", handleLanguageSwitcherClick);
if (musicToggleBtn) musicToggleBtn.addEventListener("click", toggleBackgroundMusic);
if (backgroundMusic) {
    backgroundMusic.loop = true;
    backgroundMusic.volume = MUSIC_VOLUME;
}

document.body.classList.add("intro-active");
resetPageScrollToTop();
observeHeroVisibility();
applyTranslations(getInitialLanguage());
window.addEventListener("resize", scheduleOrnamentNameFit);
if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => scheduleOrnamentNameFit());
updateCountdown();
const countdownInterval = window.setInterval(() => {
    const hasTimeLeft = updateCountdown();
    if (!hasTimeLeft) window.clearInterval(countdownInterval);
}, 1000);

renderWishes();
setupWishesToggle();
setupWishesForm();
