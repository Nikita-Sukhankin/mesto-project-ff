// @todo: Темплейт карточки
const galleryContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
function createCard(name, link) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    // Ссылка на изображение
    const cardImage = cardElement.querySelector('.card__image');
    
    // Заполняем данные
    cardElement.querySelector('.card__title').textContent = name;
    cardImage.setAttribute('src', link);
    cardImage.setAttribute('alt', name);

    // Обработчик клика по корзине удаления
    const buttonDelete = cardElement.querySelector('.card__delete-button');
    buttonDelete.addEventListener('click', function(event) {
        const card = event.target.closest('.places__item');
        card.remove();
    });

    return cardElement;
}

// @todo: Вывести карточки на страницу
function addCard(cardElement) {
    galleryContainer.append(cardElement);
}


initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData.name, cardData.link);
    addCard(cardElement);
});