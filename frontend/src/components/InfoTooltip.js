import Popup from './Popup.js';

function InfoTooltip({ name, isOpen, onClose, onEscapeClose, infoTooltipType }) {
  return(
    <Popup
      isOpen={isOpen}
      onEscapeClose={onEscapeClose}
      name={name}
      onClose={onClose}
      type='form'
    >
      <div className={`popup-tooltip__icon popup-tooltip__icon_type_${infoTooltipType}`}></div>
      <h2 className="popup__title popup-tooltip__title">
        {infoTooltipType === "success" ? "Вы успешно зарегистрировались!"
                                        : "Что-то пошло не так! Попробуйте ещё раз."}
      </h2>
    </Popup>
  )
}

export default InfoTooltip;
