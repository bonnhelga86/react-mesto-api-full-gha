import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup({ isOpen, onAddPlace, onClose, onEscapeClose, isLoading }) {
  const[name, setName] = React.useState('');
  const[link, setLink] = React.useState('');

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  function handleSubmit(event) {
    event.preventDefault();
    onAddPlace(name, link);
  }

  return(
    <PopupWithForm
        name="card"
        title="Новое место"
        buttonValue={isLoading ? 'Создание...' : 'Создать'}
        isOpen={isOpen}
        onSubmitForm={handleSubmit}
        onClose={onClose}
        onEscapeClose={onEscapeClose}
    >
      <input
        name="card-name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        type="text"
        placeholder="Название"
        className="form__input"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="form__text-error form__text-error_type_card-name" />
      <input
        name="card-link"
        value={link}
        onChange={(event) => setLink(event.target.value)}
        type="url"
        placeholder="Ссылка на картинку"
        className="form__input"
        required
      />
      <span className="form__text-error form__text-error_type_card-link" />
    </PopupWithForm>
  )
}

export default AddPlacePopup;
