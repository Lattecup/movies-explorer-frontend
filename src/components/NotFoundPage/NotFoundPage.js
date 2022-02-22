import React from 'react';
import { useNavigate } from 'react-router';
import './NotFoundPage.css';


function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <h2 className="not-found-page__title">404</h2>
      <p className="not-found-page__paragraph">Страница не найдена</p>
      <button className="not-found-page__button" type="button" onClick={() => navigate("/")}>Назад</button>
    </div>
  );
};

export default NotFoundPage;