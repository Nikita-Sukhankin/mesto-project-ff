import initialCards from "./scripts/cards";
import "./pages/index.css";
import { createCard, cardLike } from "./components/card.js";
import {
  openPopup,
  closePopup,
  handleEscape,
  setupPopupCloseOnOverlayClick,
} from "./components/modal.js";

const galleryContainer = document.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close");
const popups = document.querySelectorAll(".popup");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editPopup = document.querySelector(".popup_type_edit");
const nameInput = editPopup.querySelector(".popup__input_type_name");
const jobInput = editPopup.querySelector(".popup__input_type_description");
const editForm = document.querySelector(".popup_type_edit .popup__form");
const newCardForm = document.querySelector(".popup_type_new-card .popup__form");

// Функция для открытия попапа с изображением
function openImagePopup(link, name) {
  const imagePopup = document.querySelector(".popup_type_image");
  const modalImage = imagePopup.querySelector(".popup__image");
  const modalCaption = imagePopup.querySelector(".popup__caption");

  modalImage.src = link;
  modalImage.alt = name;
  modalCaption.textContent = name;

  openPopup(imagePopup);
}

// @todo: Вывести карточки на страницу
function addCard(cardElement) {
  galleryContainer.prepend(cardElement);
}

// Добавляем начальные карточки
initialCards.forEach((cardData) => {
  const cardElement = createCard(
    cardData.name,
    cardData.link,
    function (card) {
      card.remove();
    },
    openImagePopup
  );
  addCard(cardElement);
});

// Обработчики событий для открытия попапов
editButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(editPopup);
});

addButton.addEventListener("click", () => {
  openPopup(document.querySelector(".popup_type_new-card"));
});

// Обработчик события для закрытия попапов
closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup");
    closePopup(popup);
  });
});

// Обработчик события для формы редактирования профиля
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(editPopup);
}

editForm.addEventListener("submit", handleEditFormSubmit);

// Обработчик события для формы добавления карточки
newCardForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Получаем данные из формы
  const placeName = newCardForm.querySelector(
    ".popup__input_type_card-name"
  ).value;
  const placeLink = newCardForm.querySelector(".popup__input_type_url").value;

  // Создаем новую карточку
  const newCard = createCard(
    placeName,
    placeLink,
    function (card) {
      card.remove();
    },
    openImagePopup
  );

  // Добавляем карточку на страницу
  addCard(newCard);

  // Закрываем попап
  closePopup(document.querySelector(".popup_type_new-card"));

  // Очищаем форму
  newCardForm.reset();
});

setupPopupCloseOnOverlayClick(popups);
