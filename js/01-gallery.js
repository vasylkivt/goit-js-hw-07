import { galleryItems } from './gallery-items.js';

const galleryEl = document.querySelector('.gallery');

galleryEl.insertAdjacentHTML('afterbegin', makeGalleryMarkup(galleryItems));
galleryEl.addEventListener('click', openOriginalImg);

/**
 *? Відкриває оригінальне зображення в лайтбоксі при кліку на зображення
 * @param {MouseEvent} e - Об'єкт події click
 */
function openOriginalImg(e) {
  const { target: image } = e;
  e.preventDefault();

  // Перевіряємо, чи клікнутий елемент є зображенням
  if (image.nodeName !== 'IMG') {
    return;
  }

  // Отримуємо значення атрибутів source та alt зображення
  const src = image.dataset.source;
  const alt = image.alt;

  // Створюємо екземпляр basicLightbox зображення та його атрибутів
  const instance = basicLightbox.create(
    `
    <img src="${src}" alt="${alt}">
  `,
    {
      handlerEscape: null,
      /**
       *? Обробляє подію 'onShow' для екземпляра лайтбокса
       * @param {Object} instance - Екземпляр basicLightbox
       */
      onShow(instance) {
        this.handlerEscape = handlerEsc.bind(instance);
        document.addEventListener('keydown', this.handlerEscape);
      },
      /**
       *? Обробляє подію 'onClose' для екземпляра лайтбокса
       */
      onClose() {
        document.removeEventListener('keydown', this.handlerEscape);
      },
    }
  );

  // Показуємо екземпляр лайтбокса
  instance.show();
}

/**
 *? Обробляє подію натискання клавіші 'Escape' для закриття лайтбокса
 * @param {KeyboardEvent} evt - Об'єкт події keydown
 */
function handlerEsc(evt) {
  if (evt.code === 'Escape') {
    console.log('Escape');
    this.close();
  }
}

/**
 *? Створює розмітку галереї з вхідним масивом об'єктів галереї
 * @param {GalleryItem[]} gallery - Масив елементів галереї
 * @returns {string} - Розмітка галереї у вигляді рядка HTML
 */
function makeGalleryMarkup(gallery) {
  return gallery.reduce(
    (acc, { description, preview, original }) =>
      (acc += createLi(description, preview, original)),
    ''
  );
}

/**
 *? Створює розмітку для елемента списку галереї
 * @param {string} description - Опис зображення
 * @param {string} preview - URL попереднього зображення
 * @param {string} original - URL оригінального зображення
 * @returns {string} - Розмітка елемента списку галереї у вигляді рядка HTML
 */
function createLi(description, preview, original) {
  return `
    <li class="gallery__item">
       <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>
  `;
}
