import React from "react";
import './InfoTooltip.css';
import successIcon from '../../images/success-icon.svg';
import errorIcon from '../../images/error-icon.svg';

function InfoTooltip(props) {
  return (
    <div className={props.isOpen ? "popup popup_opened" : "popup"}>
      <div className="popup__container">
        <img className="popup__image-status" src={props.onState ? successIcon : errorIcon} alt="Уведомление" />
        <h2 className="popup__message-status">
          {props.onState ? 'Всё прошло успешно!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h2>
        <button type="button" className="popup__close-button" aria-label="Закрыть" onClick={props.onClose} />
      </div>
    </div>
  );
};

export default InfoTooltip;