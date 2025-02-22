export function cardLike(likeButton) {
  if (!likeButton) {
    return;
  }
  likeButton.classList.toggle("card__like-button_is-active");
}

// Обработчик события для формы добавления карточки
export function setupNewCardForm(createCard, addCard, closePopup) {
  const newCardForm = document.querySelector(
    ".popup_type_new-card .popup__form"
  );
  newCardForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Получаем данные из формы
    const placeName = newCardForm.querySelector(
      ".popup__input_type_card-name"
    ).value;
    const placeLink = newCardForm.querySelector(".popup__input_type_url").value;

    // Создаем новую карточку
    const newCard = createCard(placeName, placeLink, function (card) {
      card.remove();
    });

    // Добавляем карточку на страницу
    addCard(newCard);

    // Закрываем попап
    closePopup(document.querySelector(".popup_type_new-card"));

    // Очищаем форму
    newCardForm.reset();
  });
}

// Обработчик клика по корзине удаления
export function setupDeleteButton(cardElement, onRemove) {
  const buttonDelete = cardElement.querySelector(".card__delete-button");
  buttonDelete.addEventListener("click", function (event) {
    if (typeof onRemove === "function") {
      onRemove(cardElement);
    } else {
      console.error("Не указана функция удаления карточки.");
    }
  });
}
