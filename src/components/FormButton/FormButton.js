import React from 'react';
import './FormButton.css';

function FormButton(props) {

  return (
    <>
      <button type="submit" disabled={!props.isValid} className={!props.isValid ? `form__submit-button link ${props.type} form__submit-button_disabled` : `form__submit-button link ${props.type}`}>{props.title}</button>
      <span className={props.isSuccess ? "form__success-message" : "form__error-message"} />
    </>
  );
};

export default FormButton;