import React from 'react';
import Popup from './Popup.js';

function ImagePopup({ card, name, onClose, onEscapeClose }) {

  const cardIsNotEmpty = (Object.keys(card).length !== 0);

  return(
    <Popup
      isOpen={cardIsNotEmpty}
      onEscapeClose={onEscapeClose}
      name={name}
      onClose={onClose}
      type='image'
      extraClassName='popup_overlay-dark'
    >
      <figure className="popup-image__wrap">
        <img src={card.link} alt={card.name} className="popup-image__photo" />
        <figcaption className="popup-image__caption">{card.name}</figcaption>
      </figure>
    </Popup>

  )
}

export default ImagePopup;
