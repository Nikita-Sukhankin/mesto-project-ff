// Функция для обработки лайка
export function cardLike(likeButton) {
  if (!likeButton) {
    return;
  }
  likeButton.classList.toggle("card__like-button_is-active");
}

// Функция создания карточки
export function createCard(name, link, onRemove, openImagePopup) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  // Ссылка на изображение
  const cardImage = cardElement.querySelector(".card__image");

  // Заполняем данные
  cardElement.querySelector(".card__title").textContent = name;
  cardImage.setAttribute("src", link);
  cardImage.setAttribute("alt", name);

  // Обработчик клика по кнопке лайка
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", function () {
    cardLike(likeButton);
  });

  // Обработчик клика по изображению карточки
  cardImage.addEventListener("click", function () {
    openImagePopup(link, name);
  });

  // Обработчик клика по корзине удаления
  setupDeleteButton(cardElement, onRemove);

  return cardElement;
}

// Обработчик клика по корзине удаления
function setupDeleteButton(cardElement, onRemove) {
  const buttonDelete = cardElement.querySelector(".card__delete-button");
  buttonDelete.addEventListener("click", function () {
    if (typeof onRemove === "function") {
      onRemove(cardElement);
    } else {
      console.error("Не указана функция удаления карточки.");
    }
  });
}
