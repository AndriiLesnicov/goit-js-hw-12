import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import './css/loader.css';

const formEl = document.querySelector('.form');
const inputEl = formEl.querySelector('input[name="search-text"]');

formEl.addEventListener('submit', handleFormSubmit);

async function handleFormSubmit(event) {
  event.preventDefault();
  event.target.disabled = true;
  const query = inputEl.value.trim();
  iziToast.destroy();

  if (query === '') {
    iziToast.warning({
      message: 'Please enter a search query.',
      position: 'topRight',
    });
    event.target.disabled = false;
    return;
  }

  showLoader();
  clearGallery();

  try {
    const data = await getImagesByQuery(query);
    const images = data.hits;

    if (images.length === 0) {
      iziToast.info({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(images);
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
    console.error(error);
  } finally {
    hideLoader();
    event.target.disabled = false;
  }
}

function fetchImages(query) {
  return getImagesByQuery(query).then(data => data.hits);
}
