import React from 'react';
import Popup from './Popup.js';

function PopupWithForm({ name, title, buttonValue, isOpen, onSubmitForm, onClose, onEscapeClose, children }) {

  return(
    <Popup
      isOpen={isOpen}
      onEscapeClose={onEscapeClose}
      name={name}
      onClose={onClose}
      type='form'
    >
      <h2 className="popup__title">{title}</h2>
      <form
        className={`form popup-${name}__form`}
        onSubmit={onSubmitForm}
        name={`${name}-form`}
        noValidate
      >
        {children}
        <button className="button popup__button">{buttonValue}</button>
      </form>
    </Popup>
  )
}

export default PopupWithForm;
