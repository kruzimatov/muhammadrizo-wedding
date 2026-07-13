const intro = document.getElementById("intro");
const invitation = document.getElementById("invitation");
const openInviteBtn = document.getElementById("openInviteBtn");
const letterHero = document.getElementById("letterHero");
const languageSwitcher = document.querySelector(".language-switcher");
const languageButtons = document.querySelectorAll(".language-option");
const musicToggleBtn = document.getElementById("musicToggleBtn");
const backgroundMusic = document.getElementById("backgroundMusic");

const targetWeddingDate = new Date("2026-08-02T10:00:00+05:00").getTime();
const OPENING_DURATION_MS = 1000;
const DEFAULT_LANGUAGE = "uz";
const LANGUAGE_STORAGE_KEY = "weddingInvitationLanguage";
const MUSIC_VOLUME = 0.16;
const ONE_SECOND_MS = 1000;
const ONE_MINUTE_MS = ONE_SECOND_MS * 60;
const ONE_HOUR_MS = ONE_MINUTE_MS * 60;
const ONE_DAY_MS = ONE_HOUR_MS * 24;

const LOCALES = {
    ru: {
        pageTitle: "Иззатулло и Муяссархон | Свадебное приглашение",
        metaDescription: "Свадебное приглашение Иззатулло и Муяссархон на 2 августа 2026 года.",
        ariaIntro: "Конверт с приглашением",
        ariaEnvelope: "Запечатанный бумажный конверт",
        ariaWeddingDate: "Дата свадьбы",
        ariaCalendar: "Календарь августа 2026 с выделенным 2 августа",
        ariaWeddingDay: "День свадьбы",
        ariaOrnamentHero: "Традиционная страница с именами молодоженов",
        ariaVenueDetails: "Место проведения",
        ariaCountdown: "Обратный отсчет",
        envelopeTopNote: "<span class=\"flap-note-top\">ВАС</span><span class=\"flap-note-middle\">ПРИГЛАШАЕМ</span><span class=\"flap-note-script\">на свадьбу</span>",
        withLove: "с любовью,",
        signatureNames: "Иззатулло\u00a0и\u00a0Муяссархон",
        ornamentNames: "<span class=\"ornament-name-line\">Иззатулло</span><span class=\"ornament-name-amp\">и</span><span class=\"ornament-name-line\">Муяссархон</span>",
        ornamentMessage: "Спешим сообщить<br />радостную новость:<br />мы женимся!",
        ornamentDay: "02",
        ornamentMonth: "08",
        ornamentYear: "26",
        heroNames: "Дорогие&nbsp;наши<br />родные&nbsp;и&nbsp;<span class=\"no-break\">близкие!</span>",
        openHere: "открыть",
        lead: "В этот прекрасный день мы соединяем наши сердца и начинаем новую историю - историю нашей любви.<br /><br />Будем счастливы разделить радость этого торжества вместе с вами.<br /><br /><strong>С любовью приглашаем вас на нашу свадьбу.</strong>",
        scrollHint: "Прокрутите вниз",
        calendarMonth: "Август, 2026",
        weekdayMon: "ПН",
        weekdayTue: "ВТ",
        weekdayWed: "СР",
        weekdayThu: "ЧТ",
        weekdayFri: "ПТ",
        weekdaySat: "СБ",
        weekdaySun: "ВС",
        locationTitle: "Адрес:",
        venueName: "Тойхона Omad",
        venueTime: "В 10:00",
        venueAddress: "Ферганская область, город Маргилан",
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
    },
    uz: {
        pageTitle: "Izzatullo va Muyassarxon | To'y taklifnomasi",
        metaDescription: "Izzatullo va Muyassarxonning 2026-yil 2-avgustdagi to'y taklifnomasi.",
        ariaIntro: "Taklifnoma konverti",
        ariaEnvelope: "Muhrlangan qog'oz konvert",
        ariaWeddingDate: "To'y sanasi",
        ariaCalendar: "2026-yil avgust kalendari, 2-avgust belgilangan",
        ariaWeddingDay: "To'y kuni",
        ariaOrnamentHero: "Yoshlar ismlari tushirilgan an'anaviy sahifa",
        ariaVenueDetails: "Manzil",
        ariaCountdown: "Orqaga sanoq",
        envelopeTopNote: "<span class=\"flap-note-top\">SIZNI</span><span class=\"flap-note-middle\">TO'YIMIZGA</span><span class=\"flap-note-script\">taklif etamiz</span>",
        withLove: "muhabbat ila,",
        signatureNames: "Izzatullo\u00a0va\u00a0Muyassarxon",
        ornamentNames: "<span class=\"ornament-name-line\">Izzatullo</span><span class=\"ornament-name-amp\">va</span><span class=\"ornament-name-line\">Muyassarxon</span>",
        ornamentMessage: "Quvonchli yangilik:<br />biz turmush<br />quramiz!",
        ornamentDay: "02",
        ornamentMonth: "08",
        ornamentYear: "26",
        heroNames: "Aziz\u00a0va\u00a0qadrdon<br /><span class=\"no-break\">insonimiz!</span>",
        openHere: "ochish",
        lead: "Hayotimizdagi eng baxtli kunlardan biri - nikoh to'yimizni siz bilan birga nishonlashni niyat qildik.<br /><br />Sizni ushbu to'y marosimimizga samimiy taklif etamiz.<br /><br /><strong>Quvonchli kunimizda aziz mehmonimiz bo'lishingizni intiqlik bilan kutamiz.</strong>",
        scrollHint: "Pastga tushuring",
        calendarMonth: "Avgust, 2026",
        weekdayMon: "DU",
        weekdayTue: "SE",
        weekdayWed: "CHOR",
        weekdayThu: "PAY",
        weekdayFri: "JU",
        weekdaySat: "SHA",
        weekdaySun: "YA",
        locationTitle: "Manzil:",
        venueName: "Omad to'yxonasi",
        venueTime: "Soat 10:00 da",
        venueAddress: "Farg'ona viloyati, Marg'ilon shahri",
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
    },
    en: {
        pageTitle: "Izzatullo and Muyassarxon | Wedding Invitation",
        metaDescription: "Wedding invitation of Izzatullo and Muyassarxon, August 2, 2026.",
        ariaIntro: "Invitation envelope",
        ariaEnvelope: "Sealed paper envelope",
        ariaWeddingDate: "Wedding date",
        ariaCalendar: "August 2026 calendar, August 2 highlighted",
        ariaWeddingDay: "Wedding day",
        ariaOrnamentHero: "Traditional page with the names of the couple",
        ariaVenueDetails: "Venue details",
        ariaCountdown: "Countdown",
        envelopeTopNote: "<span class=\"flap-note-top\">YOU ARE</span><span class=\"flap-note-middle\">INVITED</span><span class=\"flap-note-script\">to our wedding</span>",
        withLove: "with love,",
        signatureNames: "Izzatullo\u00a0&\u00a0Muyassarxon",
        ornamentNames: "<span class=\"ornament-name-line\">Izzatullo</span><span class=\"ornament-name-amp\">&</span><span class=\"ornament-name-line\">Muyassarxon</span>",
        heroNames: "Dear\u00a0friends<br /><span class=\"no-break\">and family!</span>",
        openHere: "open",
        lead: "One of the happiest days of our lives — our wedding — and we want to celebrate it with you.<br /><br />We sincerely invite you to join us for this wedding ceremony.<br /><br /><strong>We look forward to having you as our cherished guest.</strong>",
        scrollHint: "Scroll down",
        calendarMonth: "August, 2026",
        weekdayMon: "Mo",
        weekdayTue: "Tu",
        weekdayWed: "We",
        weekdayThu: "Th",
        weekdayFri: "Fr",
        weekdaySat: "Sa",
        weekdaySun: "Su",
        locationTitle: "Address:",
        venueName: "Omad Wedding Hall",
        venueTime: "At 10:00",
        venueAddress: "Fergana region, Margilan city",
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
