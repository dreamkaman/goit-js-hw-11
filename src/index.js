import './sass/main.scss';
import axios from "axios";
import Notiflix from 'notiflix';


import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';


const NotiflixSettings = { fontSize: '20px', width: '500px' };

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '24499168-c2c7d94c072f729a438874bbc';
const LIMIT = 40; //limit per page images

const btnLoadMoreEl = document.querySelector('.load-more');

const inputEl = document.querySelector('input');

const formEl = document.querySelector('form');

const galleryEl = document.querySelector('.gallery');

let currentPage = 1;

let queryStr = '';

let gallery = new SimpleLightbox('.gallery a');






const getImages = (query, page) => {

    return axios.get(`${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${LIMIT}`)
    .then(res => {

            btnLoadMoreEl.classList.add('visually-hidden');
        
        const { total, hits } = res.data;
        
        console.log(res.data);

        if (total === 0) {

            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.', NotiflixSettings)
        }
        else {

            Notiflix.Notify.success(`Hooray! We found ${total} images.`, NotiflixSettings);

            const markup = hits.map(el => {

                const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = el;
                
                return `<div class="photo-card">
                        <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
                        <div class="info">
                            <p class="info-item">
                            <b>Likes</b>${likes}
                            </p>
                            <p class="info-item">
                            <b>Views</b>${views}
                            </p>
                            <p class="info-item">
                            <b>Comments</b>${comments}
                            </p>
                            <p class="info-item">
                            <b>Downloads</b>${downloads}
                            </p>
                        </div>
                        </div>`
            }).join('');

            galleryEl.innerHTML = markup;


            gallery.refresh();



            currentPage = 1;

            if (total > 40) {

                btnLoadMoreEl.classList.remove('visually-hidden');

            };
            
        }
    }
    )
};


const getImagesMore = (query, page) => {

    console.log(currentPage);

    return axios.get(`${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${LIMIT}`)
    .then(res => {
        
            const { totalHits, hits } = res.data;

            const markup = hits.map(el => {

                const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = el;
                
                return `<div class="photo-card">
                        <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
                        <div class="info">
                            <p class="info-item">
                            <b>Likes</b>${likes}
                            </p>
                            <p class="info-item">
                            <b>Views</b>${views}
                            </p>
                            <p class="info-item">
                            <b>Comments</b>${comments}
                            </p>
                            <p class="info-item">
                            <b>Downloads</b>${downloads}
                            </p>
                        </div>
                        </div>`
            }).join('');

        galleryEl.insertAdjacentHTML('beforeend', markup)


        gallery.refresh();

        
        if (totalHits - LIMIT * currentPage <= 0) {
        
            btnLoadMoreEl.classList.add('visually-hidden');
            
            Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.", NotiflixSettings)
    }
                
    }
        
    )
};


const onFormSubmit = event => {
    
    event.preventDefault();

    queryStr = inputEl.value;

    getImages(queryStr, currentPage = 1); //============================= by default page = 1;

};

formEl.addEventListener('submit', onFormSubmit);


const onLoadMoreClick = event => {
    
    currentPage += 1;

    getImagesMore(queryStr, currentPage);
    

}


btnLoadMoreEl.addEventListener ('click', onLoadMoreClick);



