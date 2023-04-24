import { galleryItems } from './gallery-items.js';

const galleryEl = document.querySelector('.gallery');
const galleryMarkup = makeGalleryMarkup(galleryItems);

galleryEl.insertAdjacentHTML('afterbegin', galleryMarkup);

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function makeGalleryMarkup(gallery) {
  return gallery
    .map(({ description, preview, original }) => {
      return `
    <li class="gallery__item">
       <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          alt="${description}"
        />
      </a>
    </li>
  `;
    })
    .join('');
}
