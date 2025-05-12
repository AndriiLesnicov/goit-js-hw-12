import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import './css/loader.css';

const formEl = document.querySelector('.form');
const inputEl = formEl.querySelector('input[name="search-text"]');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
let totalHits = 0;

formEl.addEventListener('submit', handleFormSubmit);
loadMoreBtn.addEventListener('click', handleLoadMore);

async function handleFormSubmit(event) {
  event.preventDefault();
  iziToast.destroy();
  hideLoadMoreButton();
  clearGallery();

  query = inputEl.value.trim();
  page = 1;

  if (!query) {
    iziToast.warning({
      message: 'Please enter a search query.',
      position: 'topRight',
    });
    return;
  }

  await fetchAndRenderImages();
}

async function handleLoadMore() {
  page += 1;
  await fetchAndRenderImages();
}

async function fetchAndRenderImages() {
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    totalHits = data.totalHits;

    if (data.hits.length === 0 && page === 1) {
      iziToast.info({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);

    const totalPages = Math.ceil(totalHits / 15);

    if (page < totalPages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }

    if (page > 1) {
      smoothScroll();
    }
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
    console.error(error);
  } finally {
    hideLoader();
  }
}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
