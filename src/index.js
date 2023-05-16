import './style.css';
import displayFilterMovie from './modules/filterShow.js';
import displayMovie from './modules/displayShow.js';

window.onload = () => {
  // display all shows
  displayMovie();

  // searchbar
  const form = document.querySelector('form');
  const search = document.querySelector('#search');
  const container = document.querySelector('#container');
  const filter = document.querySelector('#filter');

  form.onsubmit = (e) => {
    e.preventDefault();
    // Get input value and convert to lowercase for case-insensitive matching
    const searchText = search.value.toLowerCase();
    // display filtered shows
    displayFilterMovie(searchText);
    container.style.display = 'none';
    filter.style.display = 'grid';
  };

  // changing pages
  const contactBtn = document.querySelector('#contactBtn');
  const homeBtn = document.querySelector('#homeBtn');
  const contact = document.querySelector('#contact');
  const home = document.querySelector('#home');
  const counter = document.querySelector('#counter');

  // showing home page
  homeBtn.onclick = () => {
    home.style.display = 'grid';
    contact.style.display = 'none';
    counter.style.display = 'block';
  };

  // showing contact page
  contactBtn.onclick = () => {
    contact.style.display = 'block';
    home.style.display = 'none';
    counter.style.display = 'none';
  };

  // mobile menu
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('#link');
  const menuToggle = () => {
    hamburger.classList.toggle('open');
    if (mobileMenu.style.display === 'flex') {
      mobileMenu.style.display = 'none';
    } else {
      mobileMenu.style.display = 'flex';
    }
  };

  hamburger.onclick = () => {
    menuToggle();
  };
};