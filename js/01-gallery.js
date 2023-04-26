import { galleryItems } from './gallery-items.js';

const galleryEl = document.querySelector('.gallery');

//? Ця функція створює HTML-розмітку для одного елемента списку зображень на основі переданих параметрів: опису (description), мініатюри (preview) та оригінального зображення (original). Вона повертає рядок HTML-коду, який містить li елемент з класом gallery__item, який в свою чергу містить посилання (a) з класом gallery__link, яке містить зображення (img) з класом gallery__image, src та alt атрибутами, а також data-source атрибутом, який містить URL оригінального зображення.
const createLi = (description, preview, original) =>
  `
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

//? Ця функція створює HTML-розмітку списку зображень на основі масиву об'єктів, який містить інформацію про опис, мініатюру та оригінальне зображення. Вона використовує метод reduce() для обчислення результуючого рядка HTML-коду, використовуючи функцію createLi(), яка створює HTML-код для кожного елементу списку зображень.
const makeGalleryMarkup = gallery =>
  gallery.reduce(
    (acc, { description, preview, original }) =>
      (acc += createLi(description, preview, original)),
    ''
  );

//? Ця функція відповідає за додавання HTML-розмітки до списку зображень. Вона приймає розмітку як аргумент та додає її до DOM-дерева у вказане місце - до початку списку зображень.
const insertListItem = markup =>
  galleryEl.insertAdjacentHTML('afterbegin', markup);

//?  Ця функція створює модальне вікно з великим зображенням та описом. Вона приймає URL зображення та його опис як аргументи, та використовує їх для створення HTML-коду модального вікна. Після чого функція повертає створене вікно.
const createOriginalImg = (src, alt) =>
  basicLightbox.create(`
    <img src="${src}" alt="${alt}">
  `);

//? Ця функція відповідає за показ модального вікна з великим зображенням та описом. Вона відображає передане зображення в модальному вікні, після чого встановлює обробник подій для клавіші "Escape", який слідкує за закриттям модального вікна при натисканні цієї клавіші. При закритті вікна обробник подій видаляється. 
const showOriginalImg = img => {
  img.show();

  const onEscKeyPress = e => {
    if (e.code === 'Escape') {
      window.removeEventListener('keydown', onEscKeyPress);
      img.close();
    }
  };

  window.addEventListener('keydown', onEscKeyPress);
};

//? Ця функція відповідає за відкриття оригінального зображення у модальному вікні, коли користувач клікає на зображення з галереї. Вона перевіряє, чи клікнутий елемент є зображенням, отримує URL зображення та його опис з атрибутів "data-source" та "alt" відповідно. Після чого вона створює модальне вікно з великим зображенням та описом, використовуючи допоміжні функції "createOriginalImg" та "showOriginalImg".
const openOriginalImg = e => {
  const { target: image } = e;
  e.preventDefault();

  if (image.nodeName !== 'IMG') {
    return;
  }

  const src = image.dataset.source;
  const alt = image.alt;

  const originalImg = createOriginalImg(src, alt);
  showOriginalImg(originalImg);
};

//? викликає функцію makeGalleryMarkup з масивом galleryItems як аргументом, щоб отримати рядок HTML-коду, що містить розмітку списку зображень.
const listItemMarkup = makeGalleryMarkup(galleryItems);

//? викликає функцію insertListItem зі згенерованою розміткою як аргументом, щоб додати розмітку до DOM-дерева на початку списку зображень.
insertListItem(listItemMarkup);

galleryEl.addEventListener('click', openOriginalImg);


