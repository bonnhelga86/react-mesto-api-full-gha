import React from 'react';
import { Route, Routes, Navigate, useNavigate  } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Register from './Register.js';
import Login from './Login.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';
import InfoTooltip from './InfoTooltip.js';
import ProtectedRoute from './ProtectedRoute.js';
import api from '../utils/api.js';
import * as auth from '../utils/auth.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [infoTooltipType, setInfoTooltipType] = React.useState('fail');

  const [selectedViewCard, setSelectedViewCard] = React.useState({});
  const [selectedDeleteCard, setSelectedDeleteCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [email, setEmail] = React.useState('');
  const [cards, setCards] = React.useState([]);
  const [headerMenuData, setHeaderMenuData] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    if(isLoggedIn) {
      api.getInitialCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch(error => {
        console.error(error);
      });
    } else {
      tokenCheck();
    }
  }, [isLoggedIn])

  React.useEffect(() => {
    tokenCheck();
  }, [])

  function handleRegister(email, password) {
    auth.register(email, password)
        .then(data => {
          if(data) {
            setInfoTooltipType('success');
            setIsInfoTooltipPopupOpen(true);
            navigate('/sign-in', {replace: true});
          }
        })
        .catch(error => {
          setInfoTooltipType('fail');
          setIsInfoTooltipPopupOpen(true);
          console.error(error);
        });
  }

  function handleAuthorize(email, password) {
    auth.authorize(email, password)
        .then(data => {
          if (data){
            setIsLoggedIn(true);
            setCurrentUser(data);
            setEmail(email);
            navigate('/', {replace: true});
            return data;
          }
        })
        .catch(error => {
          setInfoTooltipType('fail');
          setIsInfoTooltipPopupOpen(true);
          console.error(error);
        });
  }

  function tokenCheck() {
    auth.tokenCheck()
      .then(data => {
        if(data) {
          setIsLoggedIn(true);
          setCurrentUser(data);
          setEmail(data.email);
          navigate('/', {replace: true});
        }
      })
      .catch(error => {
        setIsLoggedIn(false);
        console.error(error);
      });
  }

  function handleLogin(email) {
    setIsLoggedIn(true);
    setEmail(email);
  }

  function signOut() {
    auth.unauthorize()
    .then(data => {
      if (data.message){
        setIsLoggedIn(false);
        setEmail('');
        navigate('/sign-in', {replace: true});
        return data;
      }
    })
    .catch(error => {
      setInfoTooltipType('fail');
      setIsInfoTooltipPopupOpen(true);
      console.error(error);
    });

  }

  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api.setUserAvatar(avatar)
        .then(userData => {
          setCurrentUser(userData);
          closeAllPopups();
        })
        .catch(error => {
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
  }

  function handleUpdateUser(name, about) {
    setIsLoading(true);
    api.setUserInfo(name, about)
        .then(userData => {
          setCurrentUser(userData);
          closeAllPopups();
        })
        .catch(error => {
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
  }

  function handleAddPlace(name, link) {
    setIsLoading(true);
    api.setCard(name, link)
        .then(newCard => {
          setCards([newCard, ...cards]);
          closeAllPopups();
        })
        .catch(error => {
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
  }

  function handleLikeCard(card, isLiked) {
    api.changeLikeCardStatus(card._id, !isLiked)
        .then((newCard) => {
          setCards((cards) => cards.map((oldCard) => oldCard._id === card._id ? newCard : oldCard));
        })
        .catch(error => {
          console.error(error);
        });
  }

  function handleDeleteCardPopupOpen(cardId) {
    setSelectedDeleteCard(cardId);
    setIsDeleteCardPopupOpen(true);
  }

  function handleDeleteCard(event) {
    event.preventDefault();
    setIsLoading(true);
    api.deleteCard(selectedDeleteCard)
        .then(() => {
          setCards(cards.filter(card => card._id !== selectedDeleteCard));
          setSelectedDeleteCard(null);
          closeAllPopups();
        })
        .catch(error => {
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedViewCard({});
  }

  function handleEscClose(event) {
    if (event.key === 'Escape') {
      closeAllPopups();
    }
  }

  function handleCloseClick(event) {
    if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close')) {
      closeAllPopups();
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header isLoggedIn={isLoggedIn} headerMenuData={headerMenuData} email={email} signOut={signOut} />

      <Routes>
        <Route path="/sign-up" element={
          <Register
            changeHeaderMenuData={setHeaderMenuData}
            onHandleRegister={handleRegister}
          />
        }/>

        <Route path="/sign-in" element={
          <Login
            changeHeaderMenuData={setHeaderMenuData}
            onHandleLogin={handleLogin}
            onHandleAuthorize={handleAuthorize}
          />
        }/>

        <Route path="/" element={
          <ProtectedRoute
            element={Main}
            isLoggedIn={isLoggedIn}
            cards={cards}
            onEditAvatar={setIsEditAvatarPopupOpen}
            onEditProfile={setIsEditProfilePopupOpen}
            onAddPlace={setIsAddPlacePopupOpen}
            onCardClick={setSelectedViewCard}
            onCardLike={handleLikeCard}
            onDeleteCard={handleDeleteCardPopupOpen}
            changeHeaderMenuData={setHeaderMenuData}
         />
        }/>

        <Route path="*" element={<Navigate to="/" replace /> }/>

      </Routes>

      {isLoggedIn && <Footer />}

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onUpdateAvatar={handleUpdateAvatar}
        onClose={handleCloseClick}
        onEscapeClose={handleEscClose}
        isLoading={isLoading}
      />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onUpdateUser={handleUpdateUser}
        onClose={handleCloseClick}
        onEscapeClose={handleEscClose}
        isLoading={isLoading}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onAddPlace={handleAddPlace}
        onClose={handleCloseClick}
        onEscapeClose={handleEscClose}
        isLoading={isLoading}
      />

      <PopupWithForm
        name="delete"
        title="Вы уверены?"
        buttonValue={isLoading ? 'Удаление...' : 'Да'}
        isOpen={isDeleteCardPopupOpen}
        onSubmitForm={handleDeleteCard}
        onClose={handleCloseClick}
        onEscapeClose={handleEscClose}
      />

      <InfoTooltip
        name="tooltip"
        isOpen={isInfoTooltipPopupOpen}
        onClose={handleCloseClick}
        onEscapeClose={handleEscClose}
        infoTooltipType={infoTooltipType}
      />

      <ImagePopup card={selectedViewCard} name='image' onClose={handleCloseClick} onEscapeClose={handleEscClose} />

    </CurrentUserContext.Provider>
  );
}

export default App;
