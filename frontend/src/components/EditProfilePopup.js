import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function EditProfilePopup({ isOpen, onUpdateUser, onClose, onEscapeClose, isLoading }) {
  const currentUser = React.useContext(CurrentUserContext);
  const[name, setName] = React.useState('');
  const[about, setAbout] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateUser(name, about);
  }

  return(
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonValue={isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onSubmitForm={handleSubmit}
      onClose={onClose}
      onEscapeClose={onEscapeClose}
    >
      <input
        name="profile-name"
        type="text"
        value={name || ''}
        onChange={(event) => setName(event.target.value)}
        placeholder="Ваше имя"
        className="form__input"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="form__text-error form__text-error_type_profile-name">Вы пропустили это поле</span>
      <input
        name="profile-profession"
        type="text"
        value={about || ''}
        onChange={(event) => setAbout(event.target.value)}
        placeholder="Ваш тип деятельности"
        className="form__input"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="form__text-error form__text-error_type_profile-profession" />
    </PopupWithForm>
  )
}

export default EditProfilePopup;
