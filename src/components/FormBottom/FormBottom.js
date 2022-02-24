import React from 'react';
import { Link } from 'react-router-dom';
import './FormBottom.css';

function FormBottom(props) {

  return (
    <div className="form-bottom">
      <p className="form-bottom__text">{props.text} <Link to={props.link} className="form-bottom__link link">{props.linkText}</Link></p>
    </div>
  );
};

export default FormBottom;