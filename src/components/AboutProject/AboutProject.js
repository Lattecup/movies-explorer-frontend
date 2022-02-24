import React from 'react';
import './AboutProject.css';
import SectionTitle from '../SectionTitle/SectionTitle';

function AboutProject() {

  return (
    <section className="about-project" id="about-project">
      <SectionTitle text="О проекте" />
      <div className="about-project__description">
        <div className="about-project__info">
          <p className="about-project__paragraph-title">Дипломный проект включал 5 этапов</p>
          <p className="about-project__paragraph">Составление плана, работу над бэкендом, вёрстку, добавление функциональности&nbsp;и финальные доработки.</p>
        </div>
        <div className="about-project__info">
        <p className="about-project__paragraph-title">На выполнение диплома ушло 5 недель</p>
          <p className="about-project__paragraph">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="about-project__timeline">
        <div className="about-project__timeline_type_left">
          <div className="about-project__timeline-text about-project__timeline-text_type_backend">1 неделя</div>
          <p className="about-project__timeline-paragraph">Back-end</p>
        </div>
        <div className="about-project__timeline_type_right">
          <div className="about-project__timeline-text about-project__timeline-text_type_frontend">4 недели</div>
          <p className="about-project__timeline-paragraph">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;