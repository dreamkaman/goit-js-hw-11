import './sass/main.scss';
import axios from "axios";
import Notiflix from 'notiflix';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '24499168-c2c7d94c072f729a438874bbc';

const getImages = query => {
    return axios.get(`${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`).then(res => {
        
        const {hits} = res.data;

        console.log(res.data);
        if (hits.length === 0) { Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')};
    }
    )
};

const inputEl = document.querySelector('input');

const formEl = document.querySelector('form');

// console.log(inputEl, formEl);

const onFormSubmit = event => {
    
    event.preventDefault();

    const query = inputEl.value;

   getImages(query); 

};

formEl.addEventListener('submit', onFormSubmit);




