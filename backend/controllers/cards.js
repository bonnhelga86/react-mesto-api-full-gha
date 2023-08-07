const mongoose = require('mongoose');
const Card = require('../models/card');
const { NotFoundError } = require('../errors/not-found-error');
const { ForbiddenError } = require('../errors/forbidden-error');
const { ValidationError } = require('../errors/validation-error');

module.exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({}).populate('owner').populate('likes');
    res.send(cards);
  } catch (error) {
    next(error);
  }
};

module.exports.createCard = async (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user;
  try {
    const card = await Card.create({ name, link, owner });
    const newCard = await Card.findById(card._id).populate('owner');
    res.status(201).send(newCard);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      next(new ValidationError('Некорректно заполнено одно из полей'));
    } else {
      next(error);
    }
  }
};

module.exports.deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId).populate('owner');
    if (!card) throw new NotFoundError('Карточка не найдена');
    if (!card.owner._id.equals(req.user._id)) throw new ForbiddenError('Вы можете удалять только свои карточки');
    await Card.findByIdAndRemove(req.params.cardId);
    res.send(card);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      next(new ValidationError('Не валидный id!'));
    } else {
      next(error);
    }
  }
};

module.exports.likeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).populate('owner').populate('likes');
    if (!card) throw new NotFoundError('Карточка не найдена');
    res.send(card);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      next(new ValidationError('Не валидный id!'));
    } else {
      next(error);
    }
  }
};

module.exports.dislikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).populate('owner');
    if (!card) throw new NotFoundError('Карточка не найдена');
    res.send(card);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      next(new ValidationError('Не валидный id!'));
    } else {
      next(error);
    }
  }
};
