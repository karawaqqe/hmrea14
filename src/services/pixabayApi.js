const API_KEY = '54230221-35decfcca49e03eb020489ad8';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = async (query, page = 1) => {
  const response = await fetch(
    `${BASE_URL}?q=${encodeURIComponent(query)}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );

  const data = await response.json();
  return data.hits;
};