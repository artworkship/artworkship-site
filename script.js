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
    projectTitle: 'PAINTING AS WORSHIP',
    projectCopy: [
      "This project was born as a response to God's calling.",
      'The artist creates each painting without a sketch, without a predetermined subject, and without an expected outcome.',
      'There is only a blank canvas, worship of God, and a prayer asking the Holy Spirit to guide every movement of the brush.',
      'As the work unfolds, images begin to emerge within the abstract forms—images the artist does not consciously create.',
      'The most remarkable part is that other people notice them first.',
      'These paintings reveal biblical imagery.',
      'This is how artworkship was born—not as a way to express oneself, but as an act of worship to God.'
    ],
    authorTitle: 'RK',
    authorCopy: [
      'The name and face of the artist remain hidden.',
      'The artist does not seek publicity or personal attention.',
      'He believes that the focus should not be on the artist, but on God.',
      'This project was never created for fame, popularity, or human recognition. It is an act of humility and obedience before the Creator.',
      'The artist remains only the hand that holds the brush.',
      { text: 'For God to work through this world, He chooses to work through us.', highlight: true },
      'The artist deliberately remains in the background so that all glory, honor, and praise belong to God alone.',
      'You can be sure that these paintings will speak to you in their own way.',
      'You will discover exactly what is meant to be revealed to you.',
      'Yet there have already been occasions when different people, independently of one another, recognized the very same biblical scenes within the same painting.'
    ],
    storyButton: 'READ THE FULL STORY OF THE ARTIST',
    footerCopy: 'If you have something to say to the artist or the team, write to',
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
    projectTitle: 'LA PINTURA COMO ADORACIÓN',
    projectCopy: [
      'Este proyecto nació como respuesta al llamado de Dios.',
      'El autor pinta cada obra sin boceto, sin un tema predeterminado y sin un resultado esperado.',
      'Solo existe el lienzo en blanco, la alabanza a Dios y una oración pidiendo al Espíritu Santo que guíe cada movimiento del pincel.',
      'Con el tiempo, entre las formas abstractas comienzan a revelarse imágenes que el autor no crea de manera consciente.',
      'Lo más sorprendente es que otras personas suelen descubrirlas primero.',
      'En estos lienzos aparecen precisamente imágenes bíblicas.',
      'Así nació artworkship: la pintura no como una forma de expresarse, sino como un acto de adoración a Dios.'
    ],
    authorTitle: 'RK',
    authorCopy: [
      'El nombre y el rostro del autor de este proyecto permanecen ocultos.',
      'El autor no busca fama ni atención personal.',
      'Está convencido de que el centro no debe ser el artista, sino Dios.',
      'Este proyecto no nació para alcanzar fama, popularidad o reconocimiento humano. Es un acto de humildad y obediencia del autor ante el Creador.',
      'El autor permanece únicamente como la mano que sostiene el pincel.',
      { text: 'Porque para que Dios actúe en este mundo, Él ha elegido actuar a través de nosotros.', highlight: true },
      'El autor permanece deliberadamente en la sombra para que toda la gloria, el honor y la alabanza pertenezcan únicamente a Dios.',
      'Puedes estar seguro de que estas pinturas hablarán contigo de una manera única.',
      'Descubrirás exactamente lo que está destinado a revelarse a ti.',
      'Sin embargo, ya ha ocurrido que diferentes personas, de manera totalmente independiente, han reconocido las mismas escenas bíblicas en una misma pintura.'
    ],
    storyButton: 'LEER LA HISTORIA COMPLETA DEL AUTOR',
    footerCopy: 'Si tienes algo que decirle al autor o al equipo, escribe a',
    documentLanguage: 'es'
  },
  it: {
    label: 'IT',
    lines: ['ARTE COME', 'ADORAZIONE'],
    scripture: [
      '«MA VIENE L’ORA,',
      'ED È QUESTA,',
      'IN CUI I VERI ADORATORI',
      'ADORERANNO IL PADRE',
      'IN SPIRITO E VERITÀ,',
      'PERCHÉ IL PADRE CERCA',
      'TALI ADORATORI.',
      'DIO È SPIRITO,',
      'E QUELLI CHE LO ADORANO',
      'DEVONO ADORARE',
      'IN SPIRITO E VERITÀ.»'
    ],
    scriptureReference: 'GIOVANNI 4:23–24',
    galleryTitle: 'GALLERIA',
    projectTitle: 'LA PITTURA COME ADORAZIONE',
    projectCopy: [
      'Questo progetto è nato come risposta alla chiamata di Dio.',
      'L’artista crea ogni dipinto senza bozzetto, senza un soggetto prestabilito e senza un risultato atteso.',
      'Ci sono soltanto una tela bianca, l’adorazione di Dio e una preghiera allo Spirito Santo, affinché guidi ogni movimento del pennello.',
      'Man mano che l’opera prende forma, tra le forme astratte cominciano a emergere immagini che l’artista non crea consapevolmente.',
      'La cosa più sorprendente è che sono altre persone a notarle per prime.',
      'In questi dipinti emergono immagini bibliche.',
      'Così è nato artworkship: non come un modo di esprimere sé stessi, ma come un atto di adorazione a Dio.'
    ],
    authorTitle: 'RK',
    authorCopy: [
      'Il nome e il volto dell’artista rimangono nascosti.',
      'L’artista non cerca pubblicità né attenzione personale.',
      'Crede che al centro non debba esserci l’artista, ma Dio.',
      'Questo progetto non è mai nato per la fama, la popolarità o il riconoscimento umano. È un atto di umiltà e obbedienza davanti al Creatore.',
      'L’artista rimane soltanto la mano che tiene il pennello.',
      { text: 'Per agire in questo mondo, Dio ha scelto di operare attraverso di noi.', highlight: true },
      'L’artista sceglie consapevolmente di rimanere nell’ombra affinché tutta la gloria, l’onore e la lode appartengano soltanto a Dio.',
      'Puoi essere certo che questi dipinti ti parleranno in modo unico.',
      'Ti si rivelerà esattamente ciò che è destinato a essere rivelato a te.',
      'Eppure è già accaduto che persone diverse, indipendentemente l’una dall’altra, riconoscessero le stesse scene bibliche nello stesso dipinto.'
    ],
    storyButton: 'LEGGI LA STORIA COMPLETA DELL’ARTISTA',
    footerCopy: 'Se hai qualcosa da dire all’artista o al team, scrivi a',
    documentLanguage: 'it'
  },
  uk: {
    label: 'UA',
    lines: ['МИСТЕЦТВО ЯК', 'ПОКЛОНІННЯ БОГУ'],
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
    projectTitle: 'ЖИВОПИС ЯК ПОКЛОНІННЯ',
    projectCopy: [
      'Цей проєкт народився як відповідь на Божий заклик.',
      'Автор пише роботи без ескізу, без заздалегідь визначеного сюжету і без очікуваного результату.',
      'Є лише чисте полотно, прослава Бога і молитва до Святого Духа з проханням провадити кожен рух пензля.',
      'Згодом серед абстрактних форм починають відкриватися образи, яких автор свідомо не створює.',
      'Найдивовижніше те, що першими їх помічали інші люди.',
      'На даних роботах з’являються саме біблійні образи.',
      'Так народився artworkship — мистецтво не як спосіб виразити себе, а як акт поклоніння Богові.'
    ],
    authorTitle: 'RK',
    authorCopy: [
      'Ім’я та обличчя автора цього проєкту залишаються прихованими.',
      'Автор не шукає публічності і зайвої уваги до себе.',
      'Він вважає, що в центрі має бути не художник, а Бог.',
      'Цей проєкт не народився заради слави, популярності чи визнання людини. Це акт покори і послуху автора перед Творцем.',
      'Автор залишається лише рукою, яка тримає пензель.',
      { text: 'Адже для того, щоб Бог діяв — Йому потрібні ми.', highlight: true },
      'Автор свідомо залишається в тіні, щоб уся слава, честь і хвала належали лише Богові.',
      'Можете бути впевнені, картини заговорять до вас по-своєму.',
      'Вам відкриється саме те, що має відкритися вам.',
      'Але були випадки, коли різні люди паралельно бачили одні і ті ж сюжети із Біблії.'
    ],
    storyButton: 'ЧИТАТИ ПОВНУ ІСТОРІЮ АВТОРА',
    footerCopy: 'Якщо вам є, що сказати автору або команді — пишіть',
    documentLanguage: 'uk'
  }
};

const languageButtons = [...document.querySelectorAll('[data-language]')];
const tagline = document.querySelector('[data-tagline]');
const scriptureQuote = document.querySelector('[data-scripture-quote]');
const scriptureReference = document.querySelector('[data-scripture-reference]');
const galleryTitle = document.querySelector('[data-gallery-title]');
const projectTitle = document.querySelector('[data-project-title]');
const projectCopy = document.querySelector('[data-project-copy]');
const authorTitle = document.querySelector('[data-author-title]');
const authorCopy = document.querySelector('[data-author-copy]');
const storyButton = document.querySelector('[data-story-button]');
const footerCopy = document.querySelector('[data-footer-copy]');

function replaceParagraphs(container, items) {
  container.replaceChildren(
    ...items.map((item) => {
      const paragraph = document.createElement('p');
      if (typeof item === 'string') {
        paragraph.textContent = item;
      } else {
        paragraph.textContent = item.text;
        if (item.highlight) paragraph.classList.add('story-highlight');
      }
      return paragraph;
    })
  );
}

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
  projectTitle.textContent = selected.projectTitle;
  replaceParagraphs(projectCopy, selected.projectCopy);
  authorTitle.textContent = selected.authorTitle;
  replaceParagraphs(authorCopy, selected.authorCopy);
  storyButton.firstChild.textContent = `${selected.storyButton} `;
  footerCopy.textContent = `${selected.footerCopy} `;

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

storyButton.addEventListener('click', (event) => {
  if (storyButton.getAttribute('aria-disabled') === 'true') event.preventDefault();
});

const savedLanguage = localStorage.getItem('artworkship-language');
const browserLanguage = navigator.language.toLowerCase();
const initialLanguage =
  savedLanguage ||
  (browserLanguage.startsWith('es') ? 'es' :
   browserLanguage.startsWith('it') ? 'it' :
   browserLanguage.startsWith('uk') ? 'uk' : 'en');

setLanguage(initialLanguage);
