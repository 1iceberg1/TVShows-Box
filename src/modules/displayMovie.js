import {
  getShow, getLike, postLike,
} from './fetch.js';
import movieCount from './movieCounter.js';
import displayInfo from './displayInfo.js';

const displayMovie = async () => {
  const home = document.querySelector('#home');
  // fetching the likes from the API
  const allLikes = await getLike();
  // fetching the shows from the API
  const showArray = await getShow();
  // looping through the array
  showArray.forEach((data) => {
    // filtering the like for the movie id
    const likes = allLikes.filter((like) => like.item_id === data.id);
    // creating a new div element
    const showCard = document.createElement('div');
    showCard.classList.add('container');
    showCard.innerHTML = `<img src="${data.image.original}" alt="${data.name}">
      <div class="caption">
        <span class="title">
          <p class="name">${data.name}</p>
          <p class="rating">
            <span class="imdb">IMDb</span>
            <span class="ratingNumber">${data.rating.average}</span>
            <button id="info${data.id}">show-info<i class="fa-solid fa-plus"></i></button>
          </p>
        </span>
        <span class="sub-title">
          <i class="fa-regular fa-heart"></i>
          <span id="like">${likes.length > 0 ? likes[0].likes : 0}</span>
        </span>
      </div>
      `;
    home.appendChild(showCard);

    // posting likes on the home page
    const likeBtn = showCard.querySelector('.fa-heart');
    likeBtn.onclick = () => {
      likeBtn.style.color = '#8197a4';
      likeBtn.classList.remove('fa-regular');
      likeBtn.classList.add('fa-solid');
      postLike(data.id);
      const like = showCard.querySelector('#like');
      if (likes.length > 0) {
        like.innerHTML = `${likes[0].likes + 1}`;
      } else {
        like.innerHTML = '1';
      }
    };

    // counting movies
    const countMovie = document.querySelector('#counter');
    countMovie.innerHTML = `Total Number of Series: ${movieCount()}`;

    // opening info popup page
    const infoBtn = document.getElementById(`info${data.id}`);
    infoBtn.onclick = () => {
      displayInfo(data.id);
    };
  });
};

export default displayMovie;