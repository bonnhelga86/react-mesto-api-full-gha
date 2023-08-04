import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup({ isOpen, onUpdateAvatar, onClose, onEscapeClose, isLoading }) {
  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateAvatar(avatarRef.current.value);
  }

  return(
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonValue={isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onSubmitForm={handleSubmit}
      onClose={onClose}
      onEscapeClose={onEscapeClose}
    >
      <input
        ref={avatarRef}
        name="avatar-link"
        type="url"
        placeholder="ссылка на аватар"
        className="form__input"
        required
      />
      <span className="form__text-error form__text-error_type_avatar-link">Вы пропустили это поле</span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
