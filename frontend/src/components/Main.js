import React from 'react';
import Card from './Card.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function Main({ cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onDeleteCard, changeHeaderMenuData }) {
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    changeHeaderMenuData({link: '/sign-in', name: 'Выйти'});
  }, [])

  return(
    <main className="content">
      <section className="profile">
        <div className="profile__content">

          <div className="profile__wrap-image">
            <img src={currentUser.avatar} alt="" className="profile__image" onClick={() => onEditAvatar(true)} />
          </div>

          <div className="profile__info">
            <button
              className="profile__edit"
              type="button"
              aria-label="Редактировать"
              onClick={() => onEditProfile(true)}
            />
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__profession">{currentUser.about}</p>
          </div>

        </div>
        <button
          className="button profile__button"
          type="button"
          aria-label="Добавить"
          onClick={() => onAddPlace(true)}
        />
      </section>


      <section className="elements">
        <ul className="elements__list-item">
          {cards.map(card => <Card
                                key={card._id}
                                cardInfo={card}
                                onCardClick={() => onCardClick(card)}
                                onCardLike={onCardLike}
                                onDeleteCard={onDeleteCard}
                              />)}
        </ul>
      </section>
    </main>
  )
}

export default Main;
