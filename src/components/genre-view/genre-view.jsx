import React from 'react';
import Button from 'react-bootstrap/Button';

import './genre-view.scss';

export class GenreView extends React.Component {

  render() {
    const { genre, onBackClick, movies } = this.props;

    return (
      <div className="genre-view">
        <div className="genre-name">
          <span className="label">Genre: </span>
          <span className="value">{genre.Name}</span>
        </div>
        <div className="genre-description">
          <span className="label">Description: </span>
          <span className="value">{genre.Description}</span>
        </div>
        <Button variant="secondary" size="sm" onClick={() => { onBackClick(null); }}>Back</Button>
      </div>
    );
  }
}