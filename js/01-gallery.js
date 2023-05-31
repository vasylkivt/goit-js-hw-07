import { galleryItems } from './gallery-items.js';

const galleryEl = document.querySelector('.gallery');

galleryEl.insertAdjacentHTML('afterbegin', makeGalleryMarkup(galleryItems));

galleryEl.addEventListener('click', openOriginalImg);

function openOriginalImg(e) {
  const { target: image } = e;
  e.preventDefault();

  if (image.nodeName !== 'IMG') {
    return;
  }

  const src = image.dataset.source;
  const alt = image.alt;

  const instance = basicLightbox.create(
    `
    <img src="${src}" alt="${alt}">
  `,
    {
      handlerEscape: null,
      onShow(instance) {
        this.handlerEscape = handlerEsc.bind(instance);
        document.addEventListener('keydown', this.handlerEscape);
      },
      onClose() {
        document.removeEventListener('keydown', this.handlerEscape);
      },
    }
  );

  instance.show();
}

function handlerEsc(evt) {
  if (evt.code === 'Escape') {
    console.log('Escape');
    this.close();
  }
}

/**
 *? Ця функція створює HTML-розмітку списку зображень на основі масиву об'єктів, який містить інформацію про опис, мініатюру та оригінальне зображення. Вона використовує метод reduce() для обчислення результуючого рядка HTML-коду, використовуючи функцію createLi(), яка створює HTML-код для кожного елементу списку зображень.
 * @param {array} gallery
 * @returns //? Вона повертає рядок HTML-коду, який містить li елементи
 */
function makeGalleryMarkup(gallery) {
  return gallery.reduce(
    (acc, { description, preview, original }) =>
      (acc += createLi(description, preview, original)),
    ''
  );
}

/**
 *? Ця функція створює HTML-розмітку для одного елемента списку зображень на основі переданих параметрів: опису (description), мініатюри (preview) та оригінального зображення (original).
 * @param {string} description
 * @param {string} preview
 * @param {string} original
 * @returns//? Вона повертає рядок HTML-коду, який містить li елемент з класом gallery__item, який в свою чергу містить посилання (a) з класом gallery__link, яке містить зображення (img) з класом gallery__image, src та alt атрибутами, а також data-source атрибутом, який містить URL оригінального зображення.
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
