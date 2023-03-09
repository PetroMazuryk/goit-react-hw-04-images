import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '32614456-fa2d97d1002b2d5ec83882b58';

const fetchImage = async (name, page) => {
  const { data } = await axios.get(
    `${BASE_URL}?q=${name}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data.hits;
};

export default fetchImage;
