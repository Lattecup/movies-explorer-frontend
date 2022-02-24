import React from 'react';
import './Promo.css';
import promo from '../../images/promo-img.svg';
import { Link as Scroll } from 'react-scroll';

function Promo() {

  return (
    <section className="promo">
      <div className="promo__container">
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
        <p className="promo__paragraph">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <Scroll to="about-project" smooth={true} offset={-50} duration={400} className="promo__link link">Узнать больше</Scroll>
      </div>
      <img src={promo} alt="Промо" className="promo__image" />
    </section>
  );
};

export default Promo;