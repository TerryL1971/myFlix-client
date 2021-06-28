import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import './genre-view.scss';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class GenreView extends React.Component {

  render() {
    const { genre, onBackClick, movies } = this.props;

    return (
      <Col>
        <div className="genre-view">
          <div>
          <img src={genre.ImagePath} width="350" height="250"/>
        </div>
          <div className="genre-name">
            <span className="label d-flex">Genre: </span>
            <span className="value d-flex">{genre.Name}</span>
          </div>
          <div className="genre-description">
            <span className="label d-flex">Description: </span>
            <span className="value d-flex">{genre.Description}</span>
          </div>
          <Button variant="secondary" size="sm" onClick={() => { onBackClick(null); }}>Back</Button>
        </div>
      </Col>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }),
  onBackClick: PropTypes.func.isRequired
};