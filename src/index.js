import initialCards from "./scripts/cards";
import "./pages/index.css";
import {
    cardLike,
    setupNewCardForm,
    setupDeleteButton,
} from "./components/card.js";
import {
    openPopup,
    closePopup,
    handleEscape,
    setupPopupCloseOnOverlayClick,
} from "./components/modal.js";

const galleryContainer = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;
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

// @todo: Функция создания карточки
function createCard(name, link, onRemove) {
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
    likeButton.addEventListener("click", function (event) {
        cardLike(likeButton);
    });

    // Обработчик клика по изображению карточки
    cardImage.addEventListener("click", function (event) {
        const imageData = {
            link: event.target.src,
            name: event.target.alt,
        };

        const imagePopup = document.querySelector(".popup_type_image");
        const modalImage = imagePopup.querySelector(".popup__image");
        const modalCaption = imagePopup.querySelector(".popup__caption");

        // Обновляем содержимое попапа
        modalImage.src = imageData.link;
        modalImage.alt = imageData.name;
        modalCaption.textContent = imageData.name;

        // Открываем попап
        openPopup(imagePopup);
    });

    // Обработчик клика по корзине удаления
    setupDeleteButton(cardElement, onRemove);

    return cardElement;
}

// @todo: Вывести карточки на страницу
function addCard(cardElement) {
    galleryContainer.prepend(cardElement);
}

// Добавляем начальные карточки
initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData.name, cardData.link, function (card) {
        card.remove();
    });
    addCard(cardElement);
});

// Обработчики событий для открытия попапов
editButton.addEventListener("click", () => {
    // Заполняем поля формы текущими значениями
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;

    // Открываем попап
    openPopup(editPopup);
});

addButton.addEventListener("click", () => {
    const newCardPopup = document.querySelector(".popup_type_new-card");
    openPopup(newCardPopup);
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

    // Обновляем данные на странице
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    // Закрываем попап
    closePopup(editPopup);
}

// Прикрепляем обработчик к форме
editForm.addEventListener("submit", handleEditFormSubmit);

// Настройка формы добавления карточки
setupNewCardForm(createCard, addCard, closePopup);

// Настройка закрытия попапов по клику на оверлей
setupPopupCloseOnOverlayClick(popups);
