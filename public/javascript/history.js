
async function fetchHistory() {
    try {
        const response = await fetch('http://localhost:8080/api/v1.0/fetchHistory');
        const data = await response.json();
        const pages = data.data.query.pages;
        const page = Object.values(pages)[0];

        const evoContainer = document.getElementsByClassName('equine-evolution')[0];
        const h2 = document.createElement('h2');
        h2.innerHTML = page.title;
        const p = document.createElement('p');
        p.createAttribute = 'class', 'history-text';
        p.innerHTML = page.extract;
        evoContainer.appendChild(h2);
        evoContainer.appendChild(p);
    } catch (error) {
        console.error('Error fetching history data:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchHistory);


// Carousel functionality
const prevBtn = document.querySelector('.prevBtn');
const nextBtn = document.querySelector('.nextBtn');
const carouselInner = document.querySelector('.carousel-inner');
const images = document.querySelectorAll('.carousel-inner img');

let index = 0;

function updateCarousel() {
    if(index >= images.length) index = 0;
    if(index < 0) index = images.length - 1;
    carouselInner.style.transform = `translateX(${-index * 100}%)`;
}

nextBtn.addEventListener('click', () => {
    index++;
    updateCarousel();
});

prevBtn.addEventListener('click', () => {
    index--;
    updateCarousel();
});

setInterval(() => {
    index++;
    updateCarousel();
}, 10000);