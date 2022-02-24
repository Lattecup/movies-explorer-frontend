import React from 'react';
import './AboutMe.css';
import photo from '../../images/my-photo.jpg';
import SectionTitle from '../SectionTitle/SectionTitle';

function AboutMe() {

  return (
    <section className="about-me">
      <SectionTitle text="Студент" />
      <div className="about-me__container">
        <div className="about-me__info">
          <p className="about-me__name">Анастасия</p>
          <p className="about-me__job">Фронтенд-разработчик, 34 года</p>
          <p className="about-me__bio">Родилась и живу в Москве, закончила факультет экономики в РГТЭУ. Увлекаюсь социальными танцами и йогой, а еще люблю кататься на велосипеде. С мая 2021 начала учиться фронтенд-разработке. С 2006 года работала в сфере экономики, а с 2022 года работаю оперативным менеджером в греческой IT компании, которая разрабатывает программное обеспечения в сфере ритэйла.</p>
          <div className="about-me__links">
            <a href="https://www.facebook.com/nastyashch" className="about-me__link link" target="_blank" rel="noreferrer">Facebook</a>
            <a href="https://github.com/Lattecup" className="about-me__link link" target="_blank" rel="noreferrer">Github</a>
          </div>
        </div>
        <img src={photo} className="about-me__image" alt="Фото"/>
      </div>
    </section>
  );
}

export default AboutMe;