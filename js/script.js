// toggle Class Active
const navbarNav = document.querySelector(".mynavbar-nav");
// ketika hamburger menu di klik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};
const search = document.querySelector(`#search-button`);
const searchForm = document.querySelector(`.search-form`);
const cartButton = document.querySelector(`#shopping-cart-button`);
let toggleSearch = true;
const searchBox = document.querySelector(`#search-box`);
const scart = document.querySelector(`.shopping-cart`);
cartButton.onclick = (e) => {
  document.querySelector(`.shopping-cart`).classList.toggle(`active`);
  e.preventDefault();
};
// klik diluar sidebar untuk menghilangkan navbar
const hamburger = document.querySelector("#hamburger-menu");
search.addEventListener(`click`, function (e) {
  // if (toggleSearch) {
  //   searchForm.style.transform = `scaleY(1)`;
  //   toggleSearch = false;
  // } else {
  //   searchForm.style.transform = `scaleY(0)`;
  //   toggleSearch = true;
  // }
  e.preventDefault();
  searchForm.classList.toggle(`active`);
  searchBox.focus();
});

const itemDetailModal = document.querySelector(`#item-detail-modal`);
const itemDetailButtons = document.querySelectorAll(`.item-detail-button`);
const closeButton = document.querySelector(`.modal .close-icon`);
window.onclick = (e) => {
  if (e.target === itemDetailModal) {
    itemDetailModal.style.display = `none`;
  }
};
itemDetailButtons.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal.style.display = `flex`;
    e.preventDefault();
  };
});
closeButton.onclick = (e) => {
  itemDetailModal.style.display = `none`;
  e.preventDefault();
};

document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
  if (!search.contains(e.target) && !searchForm.contains(e.target)) {
    // searchForm.style.transform = `scaleY(0)`;
    // toggleSearch = true;
    searchForm.classList.remove(`active`);
  }
  if (!cartButton.contains(e.target) && !scart.contains(e.target)) {
    scart.classList.remove(`active`);
  }
});
