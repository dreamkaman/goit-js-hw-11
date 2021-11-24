import './sass/main.scss';
import axios from "axios";
import Notiflix from 'notiflix';

const NotiflixSettings = { fontSize: '20px', width: '500px' };

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '24499168-c2c7d94c072f729a438874bbc';

const getImages = (query, page) => {

    return axios.get(`${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`)
        .then(res => {
        
            const { total, hits } = res.data;
            
            //const [{ hit: { comments, likes}}] = hits;

        console.log(res.data);

        if (total === 0) {

            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.', NotiflixSettings)
        }
        else {
            const markup = hits.map(el => {
                
            })
        }
    }
    )
};

const inputEl = document.querySelector('input');

const formEl = document.querySelector('form');

const galleryEl = document.querySelector('.gallery');

// console.log(inputEl, formEl);

const onFormSubmit = event => {
    
    event.preventDefault();

    const query = inputEl.value;

   getImages(query, 1); //============================= by default page = 1;

};

formEl.addEventListener('submit', onFormSubmit);




