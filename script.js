const works = [...document.querySelectorAll('.work')];
const dialog = document.querySelector('.viewer');
const viewerImage = document.querySelector('.viewer-image');
const viewerNumber = document.querySelector('.viewer-number');
const closeButton = document.querySelector('.viewer-close');
const previousButton = document.querySelector('.viewer-prev');
const nextButton = document.querySelector('.viewer-next');

let currentIndex = 0;
let touchStartX = 0;

function showArtwork(index) {
  currentIndex = (index + works.length) % works.length;
  const work = works[currentIndex];
  const image = work.querySelector('img');

  viewerImage.src = image.currentSrc || image.src;
  viewerImage.alt = image.alt;
  viewerNumber.textContent = work.dataset.number;
}

function openArtwork(index) {
  showArtwork(index);
  dialog.showModal();
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
}

function closeArtwork() {
  dialog.close();
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
}

works.forEach((work, index) => {
  work.querySelector('button').addEventListener('click', () => openArtwork(index));
});

closeButton.addEventListener('click', closeArtwork);
previousButton.addEventListener('click', () => showArtwork(currentIndex - 1));
nextButton.addEventListener('click', () => showArtwork(currentIndex + 1));

dialog.addEventListener('click', (event) => {
  if (event.target === dialog) closeArtwork();
});

dialog.addEventListener('touchstart', (event) => {
  touchStartX = event.changedTouches[0].clientX;
}, { passive: true });

dialog.addEventListener('touchend', (event) => {
  const delta = event.changedTouches[0].clientX - touchStartX;
  if (Math.abs(delta) < 55) return;
  showArtwork(currentIndex + (delta < 0 ? 1 : -1));
}, { passive: true });

document.addEventListener('keydown', (event) => {
  if (!dialog.open) return;
  if (event.key === 'Escape') closeArtwork();
  if (event.key === 'ArrowLeft') showArtwork(currentIndex - 1);
  if (event.key === 'ArrowRight') showArtwork(currentIndex + 1);
});


const translations = {
  en: {
    label: 'EN',
    tagline: 'Art as Worship',
    documentLanguage: 'en'
  },
  es: {
    label: 'ES',
    tagline: 'Arte como adoración a Dios',
    documentLanguage: 'es'
  },
  uk: {
    label: 'UA',
    tagline: 'Мистецтво як прослава Бога',
    documentLanguage: 'uk'
  }
};

const languageButton = document.querySelector('.language-button');
const languageMenu = document.querySelector('.language-menu');
const currentLanguageLabel = document.querySelector('.current-language');
const tagline = document.querySelector('[data-tagline]');

function setLanguage(language) {
  const selected = translations[language] || translations.en;
  tagline.textContent = selected.tagline;
  currentLanguageLabel.textContent = selected.label;
  document.documentElement.lang = selected.documentLanguage;
  localStorage.setItem('artworkship-language', language);
  languageMenu.hidden = true;
  languageButton.setAttribute('aria-expanded', 'false');
}

languageButton.addEventListener('click', () => {
  const willOpen = languageMenu.hidden;
  languageMenu.hidden = !willOpen;
  languageButton.setAttribute('aria-expanded', String(willOpen));
});

languageMenu.querySelectorAll('[data-language]').forEach((button) => {
  button.addEventListener('click', () => setLanguage(button.dataset.language));
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.language-switcher')) {
    languageMenu.hidden = true;
    languageButton.setAttribute('aria-expanded', 'false');
  }
});

const savedLanguage = localStorage.getItem('artworkship-language');
const browserLanguage = navigator.language.toLowerCase();
const initialLanguage =
  savedLanguage ||
  (browserLanguage.startsWith('es') ? 'es' :
   browserLanguage.startsWith('uk') ? 'uk' : 'en');

setLanguage(initialLanguage);
