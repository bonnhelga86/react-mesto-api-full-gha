const router = require('express').Router();
const {
  createCardValidator,
  cardIdValidator,
} = require('../middlewares/cardValidator');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCardValidator, createCard);
router.delete('/:cardId', cardIdValidator, deleteCard);
router.put('/:cardId/likes', cardIdValidator, likeCard);
router.delete('/:cardId/likes', cardIdValidator, dislikeCard);

module.exports = router;
