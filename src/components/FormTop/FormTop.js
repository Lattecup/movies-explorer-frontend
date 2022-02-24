import React from 'react';
import { Link } from 'react-router-dom';
import './FormTop.css';
import logo from '../../images/logo.svg';

function FormTop(props) {

  return (
    <div className="form-top">
      <Link to="/" className="form-top__logo">
        <img src={logo} alt="Лого" className="form-top__logo-image" />
      </Link>
      <h2 className="form-top__title">{props.title}</h2>
    </div>
  );
};

export default FormTop;