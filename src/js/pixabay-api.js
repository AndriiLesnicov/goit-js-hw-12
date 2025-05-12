import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '50210744-4391225cbd715823d75e3ef00';
const PER_PAGE = 15;

export async function getImagesByQuery(query, page = 1) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: PER_PAGE,
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Oops! Failed to load images. Please try again later.',
      position: 'topRight',
    });
  }
}
