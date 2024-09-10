const API_KEY = 'pDH9oCNiRnJIRkuMGw8qziJvDHjnkXSLe7LAPXueOef61c8SQKpJG67O';
const galleryContainer = document.getElementById('gallery');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');


async function fetchImages(query) {
    const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=50`, {
        headers: {
            Authorization: API_KEY
        }
    });
    const data = await response.json();
    return data.photos;
}


function displayImages(photos) {
    galleryContainer.innerHTML = '';
    photos.forEach(photo => {
        const item = document.createElement('div');
        item.classList.add('gallery-item');
        item.innerHTML = `<img src="${photo.src.medium}" alt="${photo.alt}">`;
        galleryContainer.appendChild(item);
    });
}


searchButton.addEventListener('click', () => {
    const query = searchInput.value;
    if (query) {
        fetchImages(query).then(displayImages);
    }
});

searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        searchButton.click();
    }
});