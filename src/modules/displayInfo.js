import { getOneShow, getComment, postComment } from './fetch.js';
import countComments from './commentCounter.js';

const displayInfo = async (id) => {
  const info = document.querySelector('#info');
  info.style.display = 'block';
  // fetching particular show from the API
  const show = await getOneShow(id);
  // creating a new div element
  const infoCard = document.createElement('div');
  infoCard.classList.add('info-container');
  infoCard.innerHTML = `
        <i class="fa-solid fa-xmark" id="close${id}"></i>
        <div class="info-card">
            <div class="info-img">
                <img src="${show.image ? show.image.original : ''}" alt="${show.name} poster">
            </div>
            <div class="info-text">
                <h1>${show.name}</h1>
                <div class="subtitle">
                  <span class="rating-info"><span class="imdb">IMDb</span>${show.rating.average}/10</span>
                  <span class="genre">
                  </span>
                </div>
                <p class="summary">
                  <span>Summary :</span>
                  ${show.summary}
                </p>
                <p><span>Status :</span>${show.status}</p>
                <p><span>Premiered :</span>${show.premiered}</p>
                <p><span>Ended :</span>${show.ended}</p>
                <p><span>Air on :</span>${show.schedule.days} (${show.schedule.time})</p>
                <p><span>Runtime :</span>${show.runtime} min</p>
                <p><span>Type :</span>${show.type}</p>
                <p><span>Language :</span>${show.language}</p>
                <p><span>Original Network :</span>${show.network ? show.network.name : 'null'}</p>
                <p><a href="${show.officialSite}">Visit the official site</a></p>
            </div>
        </div>
        <div id="comment">
          <h2></h2>
          <div class="comment-container">
            <form action="" method="POST">
              <p class="leave-comment"><i class="fa-regular fa-comment"></i> Leave a comment</p>
              <input type="text" id="name" placeholder="Your name">
              <textarea type="text" id="comments" placeholder="Your insights" maxlength="500"></textarea>
              <button type="submit" id="submit">Comment</button>
            </form>
            <div class="comments"></div>
          </div>
        </div>`;

  // adding genre
  const genreCard = infoCard.querySelector('.genre');
  show.genres.forEach((genre) => {
    genreCard.innerHTML += `<span>${genre}</span>`;
  });
  info.appendChild(infoCard);

  // updating comments
  const updateComment = async (id) => {
    // adding comments
    const commentCard = document.querySelector('.comments');
    // fetching particular comments from the API
    const comments = await getComment(id);
    let innerText = '';
    if (!comments.error) {
      comments.forEach((comment) => {
        innerText += `
        <p class=comment-card>
        <i class="fa-solid fa-circle-user"></i>
        <span class="comment-detail">
          <span class="comment-caption">
            <span class="comment-name">${comment.username}</span>
            <span class="comment-date">${comment.creation_date}</span>
          </span>
          <span class="comment-comment">${comment.comment}</span>
        </span>
        </p>`;
      });
      commentCard.innerHTML = innerText;
    }

    // adding comment counter
    const commentTitle = document.querySelector('h2');
    commentTitle.innerHTML = `Comments (${countComments()})`;
  };
  // show comments
  updateComment(id);

  // posting new comments
  const inputName = document.querySelector('#name');
  const inputComment = document.querySelector('#comments');
  const submitBtn = document.querySelector('#submit');
  submitBtn.onclick = async (e) => {
    e.preventDefault();
    if (inputName.value !== '' && inputComment.value !== '') {
      await postComment(id, inputName.value, inputComment.value);

      inputName.value = '';
      inputComment.value = '';
    }
    updateComment(id);
  };

  // closing info popup
  const closeBtn = document.querySelector(`#close${id}`);
  closeBtn.onclick = () => {
    info.style.display = 'none';
    // removing the previous infoCard
    infoCard.innerHTML = '';
  };
};

export default displayInfo;
