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
    lines: ['ART AS', 'WORSHIP'],
    scripture: [
      '“BUT THE HOUR IS COMING,',
      'AND IS NOW HERE,',
      'WHEN THE TRUE WORSHIPPERS',
      'WILL WORSHIP THE FATHER',
      'IN SPIRIT AND TRUTH,',
      'FOR THE FATHER IS SEEKING',
      'SUCH PEOPLE TO WORSHIP HIM.',
      'GOD IS SPIRIT,',
      'AND THOSE WHO WORSHIP HIM',
      'MUST WORSHIP IN SPIRIT AND TRUTH.”'
    ],
    scriptureReference: 'JOHN 4:23–24',
    galleryTitle: 'GALLERY',
    documentLanguage: 'en'
  },
  es: {
    label: 'ES',
    lines: ['ARTE COMO', 'ADORACIÓN A DIOS'],
    scripture: [
      '“PERO LA HORA VIENE,',
      'Y YA ES AHORA,',
      'CUANDO LOS VERDADEROS ADORADORES',
      'ADORARÁN AL PADRE',
      'EN ESPÍRITU Y EN VERDAD,',
      'PORQUE EL PADRE BUSCA',
      'A TALES PERSONAS.',
      'DIOS ES ESPÍRITU,',
      'Y LOS QUE LE ADORAN,',
      'DEBEN ADORARLE',
      'EN ESPÍRITU Y EN VERDAD.”'
    ],
    scriptureReference: 'JUAN 4:23–24',
    galleryTitle: 'GALERÍA',
    documentLanguage: 'es'
  },
  uk: {
    label: 'UA',
    lines: ['МИСТЕЦТВО ЯК', 'ПРОСЛАВА БОГА'],
    scripture: [
      '“АЛЕ НАДХОДИТЬ ЧАС,',
      'І ТЕПЕР ВІН Є,',
      'КОЛИ ПРАВДИВІ ПОКЛОННИКИ',
      'ПОКЛОНЯТИМУТЬСЯ ОТЦЕВІ',
      'В ДУСІ ТА ПРАВДІ,',
      'БО ОТЕЦЬ ШУКАЄ СОБІ',
      'САМЕ ТАКИХ.',
      'БОГ Є ДУХ,',
      'І ТІ, ЩО ПОКЛОНЯЮТЬСЯ ЙОМУ,',
      'ПОВИННІ ПОКЛОНЯТИСЯ',
      'В ДУСІ ТА ПРАВДІ.”'
    ],
    scriptureReference: 'ІВАНА 4:23–24',
    galleryTitle: 'ГАЛЕРЕЯ',
    documentLanguage: 'uk'
  }
};

const languageButtons = [...document.querySelectorAll('[data-language]')];
const tagline = document.querySelector('[data-tagline]');
const scriptureQuote = document.querySelector('[data-scripture-quote]');
const scriptureReference = document.querySelector('[data-scripture-reference]');
const galleryTitle = document.querySelector('[data-gallery-title]');

function setLanguage(language) {
  const selected = translations[language] || translations.en;

  tagline.replaceChildren(
    ...selected.lines.map((line) => {
      const span = document.createElement('span');
      span.textContent = line;
      return span;
    })
  );

  scriptureQuote.replaceChildren(
    ...selected.scripture.map((line) => {
      const span = document.createElement('span');
      span.textContent = line;
      return span;
    })
  );
  scriptureReference.textContent = selected.scriptureReference;
  galleryTitle.textContent = selected.galleryTitle;

  document.documentElement.lang = selected.documentLanguage;
  localStorage.setItem('artworkship-language', language);

  languageButtons.forEach((button) => {
    const active = button.dataset.language === language;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-current', active ? 'true' : 'false');
  });
}

languageButtons.forEach((button) => {
  button.addEventListener('click', () => setLanguage(button.dataset.language));
});

const savedLanguage = localStorage.getItem('artworkship-language');
const browserLanguage = navigator.language.toLowerCase();
const initialLanguage =
  savedLanguage ||
  (browserLanguage.startsWith('es') ? 'es' :
   browserLanguage.startsWith('uk') ? 'uk' : 'en');

setLanguage(initialLanguage);
