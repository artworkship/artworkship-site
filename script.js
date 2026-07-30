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
    lines: ['ART AS', 'WORSHIP'], documentLanguage: 'en',
    storyTitle: 'WHY IS THE ARTIST ANONYMOUS?',
    storyParagraphs: [
      'These paintings do not begin with an image.',
      'There is no sketch, no predetermined story, no expected result. There is only a blank canvas, a prayer, and a desire to allow the Holy Spirit to guide every movement.',
      'Over time, images began to emerge within the abstract forms—images the artist did not intentionally create. Others saw them first.',
      'This is how artworkship was born—art not as a way to express the self, but as an act of worship to God.',
      'Therefore, the name of the author remains hidden.',
      'Because what matters is not the hand that holds the brush, but the One who guides it.'
    ],
    storyButton: 'READ THE FULL STORY', fragmentLead: 'It all began with this fragment.',
    fragmentCaption: 'Fragment of painting 25002 — “The Garden of Gethsemane”',
    fragmentAlt: 'Fragment of painting 25002 — The Garden of Gethsemane', gallery: 'GALLERY'
  },
  es: {
    lines: ['ARTE COMO', 'ADORACIÓN A DIOS'], documentLanguage: 'es',
    storyTitle: '¿POR QUÉ EL ARTISTA ES ANÓNIMO?',
    storyParagraphs: [
      'Estas pinturas no comienzan con una imagen.',
      'No hay boceto, ni una historia predeterminada, ni un resultado esperado. Solo hay un lienzo en blanco, una oración y el deseo de permitir que el Espíritu Santo guíe cada movimiento.',
      'Con el tiempo, comenzaron a aparecer imágenes dentro de las formas abstractas: imágenes que el artista no creó intencionadamente. Otras personas las vieron primero.',
      'Así nació artworkship: el arte no como una forma de expresarse a uno mismo, sino como un acto de adoración a Dios.',
      'Por eso, el nombre del autor permanece oculto.',
      'Porque lo importante no es la mano que sostiene el pincel, sino Aquel que la guía.'
    ],
    storyButton: 'LEER LA HISTORIA COMPLETA', fragmentLead: 'Todo comenzó con este fragmento.',
    fragmentCaption: 'Fragmento de la pintura 25002 — «El Huerto de Getsemaní»',
    fragmentAlt: 'Fragmento de la pintura 25002 — El Huerto de Getsemaní', gallery: 'GALERÍA'
  },
  uk: {
    lines: ['МИСТЕЦТВО ЯК', 'ПРОСЛАВА БОГА'], documentLanguage: 'uk',
    storyTitle: 'ЧОМУ АВТОР ЗАЛИШАЄТЬСЯ НЕВІДОМИМ?',
    storyParagraphs: [
      'Ці картини не починаються з образу.',
      'Немає ескізу, сюжету чи наперед визначеного результату. Є лише чисте полотно, молитва і бажання дозволити Святому Духові провадити кожен рух.',
      'Згодом в абстрактних формах почали відкриватися образи, яких автор свідомо не створював. Першими їх побачили інші люди.',
      'Так народився artworkship — мистецтво не як спосіб розповісти про себе, а як акт поклоніння Богові.',
      'Тому ім’я автора залишається прихованим.',
      'Бо значення має не рука, яка тримає пензель, а Той, Хто її веде.'
    ],
    storyButton: 'ПРОЧИТАТИ ПОВНУ ІСТОРІЮ', fragmentLead: 'Усе почалося з цього фрагмента.',
    fragmentCaption: 'Фрагмент картини 25002 — «Гетсиманський Сад»',
    fragmentAlt: 'Фрагмент картини 25002 — Гетсиманський Сад', gallery: 'ГАЛЕРЕЯ'
  }
};

const languageButtons = [...document.querySelectorAll('[data-language]')];
const tagline = document.querySelector('[data-tagline]');
const storyTitle = document.querySelector('[data-story-title]');
const storyBody = document.querySelector('[data-story-body]');
const storyButton = document.querySelector('[data-story-button]');
const fragmentLead = document.querySelector('[data-fragment-lead]');
const fragmentCaption = document.querySelector('[data-fragment-caption]');
const fragmentImage = document.querySelector('[data-fragment-image]');
const galleryHeading = document.querySelector('[data-gallery-heading]');

function setLanguage(language) {
  const selected = translations[language] || translations.en;
  tagline.replaceChildren(...selected.lines.map((line) => { const span=document.createElement('span'); span.textContent=line; return span; }));
  storyTitle.textContent = selected.storyTitle;
  storyBody.replaceChildren(...selected.storyParagraphs.map((paragraph,index)=>{ const p=document.createElement('p'); p.textContent=paragraph; if(index===selected.storyParagraphs.length-1)p.className='story-emphasis'; return p; }));
  storyButton.replaceChildren(document.createTextNode(selected.storyButton + ' '));
  const arrow=document.createElement('span'); arrow.setAttribute('aria-hidden','true'); arrow.textContent='→'; storyButton.append(arrow);
  fragmentLead.textContent=selected.fragmentLead; fragmentCaption.textContent=selected.fragmentCaption; fragmentImage.alt=selected.fragmentAlt; galleryHeading.textContent=selected.gallery;
  document.documentElement.lang=selected.documentLanguage; localStorage.setItem('artworkship-language',language);
  languageButtons.forEach((button)=>{ const active=button.dataset.language===language; button.classList.toggle('is-active',active); button.setAttribute('aria-current',active?'true':'false'); });
}
languageButtons.forEach((button)=>button.addEventListener('click',()=>setLanguage(button.dataset.language)));
const savedLanguage=localStorage.getItem('artworkship-language');
const browserLanguage=navigator.language.toLowerCase();
setLanguage(savedLanguage || (browserLanguage.startsWith('es')?'es':browserLanguage.startsWith('uk')?'uk':'en'));

const revealElements=[...document.querySelectorAll('.reveal')];
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer=new IntersectionObserver((entries,obs)=>entries.forEach((entry)=>{ if(entry.isIntersecting){entry.target.classList.add('is-visible'); obs.unobserve(entry.target);} }),{threshold:.12});
  revealElements.forEach((element)=>observer.observe(element));
} else { revealElements.forEach((element)=>element.classList.add('is-visible')); }
