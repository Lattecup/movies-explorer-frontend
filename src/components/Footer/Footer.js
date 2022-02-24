import React from 'react';
import './Footer.css';

function Footer() {

  return (
    <div className="footer">
      <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__container">
        <p className="footer__year">&#169; 2022</p>
        <nav className="footer__navigation">
          <ul className="footer__links">
            <li>
              <a href="https://practicum.yandex.ru" target="_blank" className="footer__link link" rel="noreferrer">Яндекс.Практикум</a>
            </li>
            <li>
              <a href="https://github.com/Lattecup" target="_blank" className="footer__link link" rel="noreferrer">Github</a>
            </li>
            <li>
              <a href="https://www.facebook.com/nastyashch" target="_blank" className="footer__link link" rel="noreferrer">Facebook</a>
            </li>
          </ul>
        </nav>
        <p className="footer__year-mobile">&#169; 2022</p>
      </div>
    </div>
  );
}

export default Footer;