import React from 'react';
import './Form.css';

function Form(props) {

  return (
    <div className="form__section">
      <label htmlFor={props.name} className="form__label">{props.placeholder}</label>
      <input className="form__input" type={props.type} name={props.name} id={props.id} placeholder={props.placeholder} minLength={props.minLength} maxLength={props.maxLength} value={props.value} pattern={props.pattern} onChange={props.onChange} required />
      <span className={!props.isValid ? "form__input-error form__input-error_active" : "form__input-error"} id={`${props.id}-error`}>{props.error}</span>
    </div>
  );
};

export default Form;