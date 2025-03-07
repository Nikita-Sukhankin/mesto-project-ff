// Функция для открытия попапа
export function openPopup(popup) {
  if (popup) {
    popup.classList.add("popup_is-opened");
    document.addEventListener("keydown", handleEscape);
  }
}

// Функция для закрытия попапа
export function closePopup(popup) {
  if (popup) {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", handleEscape);
  }
}

// Функция для обработки нажатия клавиши ESC
export function handleEscape(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup.popup_is-opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

// Обработчик клика по оверлею
export function setupPopupCloseOnOverlayClick(popups) {
  popups.forEach((popup) => {
    popup.addEventListener("click", (event) => {
      if (event.target === popup) {
        closePopup(popup);
      }
    });
  });
}

// Функция для настройки закрытия попапов по клику на крестик
export function setupPopupCloseOnButtonClick() {
  const closeButtons = document.querySelectorAll('.popup__close');
  closeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const popup = button.closest('.popup');
      if (popup) {
        closePopup(popup);
      }
    });
  });
}