import React from 'react';
import './Portfolio.css';

function Portfolio() {

  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a href="https://lattecup.github.io/how-to-learn/" target="_blank" className="portfolio__link link" rel="noreferrer">Статичный сайт</a>
          <a href="https://lattecup.github.io/how-to-learn/" target="_blank" rel="noreferrer" className="portfolio__arrow link"/>
        </li>
        <li className="portfolio__item">
          <a href="https://lattecup.github.io/russian-travel" target="_blank" className="portfolio__link link" rel="noreferrer">Адаптивный сайт</a>
          <a href="https://github.com/Lattecup/how-to-learn" target="_blank" rel="noreferrer" className="portfolio__arrow link"/>
        </li>
        <li className="portfolio__item">
          <a href="https://avshchipakina.nomoredomains.rocks" target="_blank" className="portfolio__link link" rel="noreferrer">Одностраничное приложение</a>
          <a href="https://github.com/Lattecup/how-to-learn" target="_blank" rel="noreferrer" className="portfolio__arrow link"/>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;