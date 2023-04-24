import { galleryItems } from './gallery-items.js';

const galleryEl = document.querySelector('.gallery');
const galleryMarkup = makeGalleryMarkup(galleryItems);

galleryEl.insertAdjacentHTML('afterbegin', galleryMarkup);

galleryEl.addEventListener('click', openOriginalImg);

function openOriginalImg(e) {
  const { target: image } = e;

  if (image.nodeName !== 'IMG') {
    return;
  }

  const originalImg = basicLightbox.create(`
    <img src="${image.dataset.source}" alt="${image.alt}" >
`);

  e.preventDefault();

  originalImg.show();

  window.addEventListener('keydown', onEscKeyPress);

  function onEscKeyPress(e) {
    if (e.code === 'Escape') {
      window.removeEventListener('keydown', onEscKeyPress);
      originalImg.close();
    }
  }
}

function makeGalleryMarkup(gallery) {
  return gallery
    .map(({ description, preview, original }) => {
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
    })
    .join('');
}
