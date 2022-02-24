import React from 'react';
import './SectionTitle.css';

function SectionTitle(props) {

  return (
    <div className="section-title">
      <h2 className="section-title__title">{props.text}</h2>
    </div>
  );
}

export default SectionTitle;