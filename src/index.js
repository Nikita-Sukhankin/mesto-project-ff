import "./pages/index.css";
import { createCard, handleDeleteCard, handleLikeCard } from "./components/card.js";
import {
    openPopup,
    closePopup,
    handleEscape,
    setupPopupCloseOnOverlayClick,
} from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import { fetchUserData, fetchCards, updateUserData, addCard, deleteCard, updateAvatar} from './components/api.js';

let currentUser;

// Контейнер для карточек
const galleryContainer = document.querySelector(".places__list");
if (!galleryContainer) {
    console.error('Контейнер для карточек не найден.');
}

// Элементы профиля
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImageElement = document.querySelector('.profile__image');

// Попапы
const editPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const avatarPopup = document.querySelector('.popup_type_avatar');

// Поля ввода в попапе редактирования профиля
const editForm = editPopup.querySelector(".popup__form");
const nameInput = editForm.querySelector(".popup__input_type_name");
const jobInput = editForm.querySelector(".popup__input_type_description");

// Поля ввода в попапе добавления карточки
const newCardForm = newCardPopup.querySelector(".popup__form");
const cardNameInput = newCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = newCardForm.querySelector(".popup__input_type_url");

// Поля ввода в попапе обновления аватара
const avatarForm = avatarPopup.querySelector('.popup__form');
const avatarInput = avatarForm.querySelector('.popup__input_type_avatar');

// Кнопки открытия попапов
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const avatarEditButton = document.querySelector('.profile__image');

// Элементы попапа с изображением
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

// Функция открытия попапа с изображением
function openImagePopup(link, name) {
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    openPopup(imagePopup);
}

// Функция для управления состоянием кнопок
function toggleButtonState(button, isLoading) {
    if (isLoading) {
        button.textContent = 'Сохранение...';
        button.disabled = true;
    } else {
        button.textContent = 'Сохранить';
        button.disabled = false;
    }
}

// Функция отображения данных пользователя
function renderUserData(userData) {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImageElement.src = userData.avatar; 
    currentUser = userData;
}
// Функция рендеринга карточек
function renderCards(cards) {
    if (!Array.isArray(cards)) {
        console.error('Данные карточек не являются массивом:', cards);
        return;
    }
    cards.forEach(card => {
        const cardElement = createCard(card, handleDeleteCard, handleLikeCard, openImagePopup, currentUser);
        galleryContainer.appendChild(cardElement);
    });
}

// Загрузка данных с сервера
async function fetchData() {
    try {
        const [userData, cardsData] = await Promise.all([fetchUserData(), fetchCards()]);
        console.log('Данные пользователя:', userData);
        console.log('Данные карточек:', cardsData);
        renderUserData(userData);
        renderCards(cardsData);
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
    }
}

// Обработчик открытия попапа редактирования профиля
editButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    clearValidation(editForm, validationConfig);
    openPopup(editPopup);
});

// Обработчик открытия попапа добавления карточки
addButton.addEventListener('click', () => {
    newCardForm.reset();
    clearValidation(newCardForm, validationConfig);
    openPopup(newCardPopup);
});

// Обработчик открытия попапа редактирования аватара
avatarEditButton.addEventListener('click', () => {
    avatarInput.value = '';
    clearValidation(avatarForm, validationConfig);
    openPopup(avatarPopup);
});

// Обработчик отправки формы редактирования профиля
function handleEditFormSubmit(evt) {
    evt.preventDefault();
    const name = nameInput.value.trim();
    const about = jobInput.value.trim();
    toggleButtonState(editForm.querySelector('.popup__button'), true);

    updateUserData({ name, about })
        .then(updatedUserData => {
            renderUserData(updatedUserData);
            closePopup(editPopup);
        })
        .catch(error => {
            console.error('Ошибка при обновлении профиля:', error);
        })
        .finally(() => {
            toggleButtonState(editForm.querySelector('.popup__button'), false);
        });
}
editForm.addEventListener('submit', handleEditFormSubmit);

// Обработчик отправки формы добавления карточки
function handleAddCardSubmit(evt) {
    evt.preventDefault();
    const name = cardNameInput.value.trim();
    const link = cardLinkInput.value.trim();
    toggleButtonState(newCardForm.querySelector('.popup__button'), true);

    addCard({ name, link })
        .then(addedCard => {
            const cardElement = createCard(addedCard, handleDeleteCard, handleLikeCard, openImagePopup, currentUser);
            galleryContainer.prepend(cardElement);
            newCardForm.reset();
            closePopup(newCardPopup);
        })
        .catch(error => {
            console.error('Ошибка при добавлении карточки:', error);
        })
        .finally(() => {
            toggleButtonState(newCardForm.querySelector('.popup__button'), false);
        });
}
newCardForm.addEventListener('submit', handleAddCardSubmit);

// Обработчик отправки формы обновления аватара
function handleAvatarFormSubmit(evt) {
    evt.preventDefault();
    const avatarUrl = avatarInput.value.trim();
    toggleButtonState(avatarForm.querySelector('.popup__button'), true);

    updateAvatar(avatarUrl)
        .then(updatedUserData => {
            profileImageElement.style.backgroundImage = `url(${updatedUserData.avatar})`;
            closePopup(avatarPopup);
        })
        .catch(error => {
            console.error('Ошибка при обновлении аватара:', error);
        })
        .finally(() => {
            toggleButtonState(avatarForm.querySelector('.popup__button'), false);
        });
}
avatarForm.addEventListener('submit', handleAvatarFormSubmit);

const closeButtons = document.querySelectorAll('.popup__close');
closeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup');
    if (popup) {
      closePopup(popup);
    }
  });
});

// Добавляем обработчики закрытия попапов
setupPopupCloseOnOverlayClick([editPopup, newCardPopup, imagePopup, avatarPopup]);

// Включаем валидацию
const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
};

enableValidation(validationConfig);

// Загружаем данные с сервера
fetchData();