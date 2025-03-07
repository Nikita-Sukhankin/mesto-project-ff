// Функция для обработки лайка
import { toggleLikeCard } from './api.js';
export function likeCard(likeButton) {
  if (!likeButton) {
      return;
  }
  likeButton.classList.toggle("card__like-button_is-active");
}

export function handleLikeCard(likeButton, likeCountElement, cardId) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');

  toggleLikeCard(cardId, !isLiked)
      .then(updatedCard => {
          likeCountElement.textContent = updatedCard.likes.length;
          likeButton.classList.toggle('card__like-button_is-active', !isLiked);
      })
      .catch(error => {
          console.error('Ошибка при лайке/дизлайке карточки:', error);
      });
}

// Функция для обработки удаления карточки
export function handleDeleteCard(cardElement, cardId) {
  deleteCard(cardId)
      .then(() => {
          cardElement.remove();
      })
      .catch(error => {
          console.error('Ошибка при удалении карточки:', error);
      });
}

// Функция создания карточки
export function createCard(cardData, handleDeleteCard, handleLikeCard, openImagePopup, currentUser) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);

  // Заполняем данные
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeCountElement = cardElement.querySelector(".card__like-count");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  // Обработчик клика по изображению карточки
  cardImage.addEventListener("click", () => openImagePopup(cardData.link, cardData.name));

  // Обработчик лайка
  likeButton.addEventListener("click", () => handleLikeCard(likeButton, likeCountElement, cardData._id));

  // Обработчик удаления карточки
  if (cardData.owner._id === currentUser._id) {
      deleteButton.addEventListener("click", () => handleDeleteCard(cardElement, cardData._id));
  } else {
      deleteButton.remove();
  }

  // Отображение количества лайков
  likeCountElement.textContent = cardData.likes.length;

  // Проверка, лайкнул ли текущий пользователь карточку
  if (cardData.likes.some(like => like._id === currentUser._id)) {
      likeButton.classList.add("card__like-button_is-active");
  }

  return cardElement;
}