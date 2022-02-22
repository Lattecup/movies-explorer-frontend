import React from 'react';
import './Techs.css';
import SectionTitle from '../SectionTitle/SectionTitle';

function Techs() {

  return (
    <section className="techs">
      <SectionTitle text="Технологии" />
      <div className="techs__container">
        <p className="techs__paragraph-title">7 технологий</p>
        <p className="techs__paragraph">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <ul className="techs__list">
          <li className="techs__list-item">HTML</li>
          <li className="techs__list-item">CSS</li>
          <li className="techs__list-item">JS</li>
          <li className="techs__list-item">React</li>
          <li className="techs__list-item">Git</li>
          <li className="techs__list-item">Express.js</li>
          <li className="techs__list-item">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;