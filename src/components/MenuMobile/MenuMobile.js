import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './MenuMobile.css';
import account from '../../images/account-image.svg'

function MenuMobile(props) {

  return (
    <>
      <button type="button" className="menu-mobile__open-button" aria-label="Открыть" onClick={props.onOpen}/>
      <div className={`menu-mobile ${props.isOpen ? "menu-mobile_opened" : ""}`}>
        <nav className="menu-mobile__navigation">
          <div className="menu-mobile__links">
            <NavLink to="/" className={({ isActive }) => "link menu-mobile__link" + (isActive ? "_active" : "")}>Главная</NavLink>
            <NavLink to="/movies" className={({ isActive }) => "link menu-mobile__link" + (isActive ? "_active" : "")}>Фильмы</NavLink>
            <NavLink to="/saved-movies" className={({ isActive }) => "link menu-mobile__link" + (isActive ? "_active" : "")}>Сохраненные фильмы</NavLink>
          </div>
          <div className="menu-mobile__account">
            <Link to="/profile" className="menu-mobile__account-link link">Аккаунт</Link>
            <div className="menu-mobile__account-image-container">
              <img src={account} alt="Аккаунт" className="menu-mobile__account-image" />
            </div>
          </div>
        </nav>
        <button type="button" className="menu-mobile__close-button" aria-label="Закрыть" onClick={props.onClose}/>
      </div>
    </>
  );
};

export default MenuMobile;