import React from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;
    

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImagePath} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <div className="movie-genre">
          <span className="label">Genre: </span>
          <span className="value">{movie.Genre.Name}</span>
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          <span className="value">{movie.Director.Name}</span>
        </div>
        <button onClick={() => { onBackClick(null); }}>Back</button>
        
        <Link to={`/directors/${movie.Director.Name}`}>
          <Button variant="link">Director</Button>
        </Link>

        <Link to={`/genres/${movie.Genre.Name}`}>
          <Button variant="link">Genre</Button>
        </Link>

      </div>
    );
  } 
}

/*

import React from 'react';
import PropTypes from 'prop-types';

// react-bootstrap components
import Button from 'react-bootstrap/Button';

// Router
import { Link } from "react-router-dom";
import axios from 'axios';

// Styles
import './movie-view.scss';
import { propTypes } from 'react-bootstrap/esm/Image';

export class MovieView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // this state is the text of the button for adding or removing a movie
           buttonText: ''
        }
    }
    
    //Set the text of the button for add/remove a movie when the page loads or refreshes based on the content of the favorite_movies array.
    componentDidMount() {
        const favMovies = this.props.user.favorite_movies;
        const movieId = this.props.movie._id;
        if(favMovies.includes(movieId)) {
            this.setState({buttonText: 'Remove from favorites'})
        }
        if(!favMovies.includes(movieId)) {
            this.setState({buttonText: 'Add to favorites'})
        }
    }

    render() {
        const { movie, clickBack, token, user, onMovieAddorDelete } = this.props;
        const { buttonText } = this.state
        const { username } = user


        // Add a movie to favorites
        const addMovie = () => {
            const userName = username;
            const accessToken = token;
            const movieId = movie._id;
            const url = `https://myflix-app-1029.herokuapp.com/users/${userName}/favorites/${movieId}` ;
            // axios.post(url , {
            //     headers: {Authorization: `Bearer ${token}`}
            // })
            fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization": "Bearer " + accessToken
                }
            }).then(response => {
                return response.json();
            }).then(data => {
                const userObj = data;
                // prop that updates the state of a users favorite_movies if a film is added to favorites
                onMovieAddorDelete(userObj);
            }).catch(err => {
                console.log(err);
            })
        }

        // Delete a film from favorites
        const deleteMovie = () => {
            axios.delete(`https://myflix-app-1029.herokuapp.com/users/${username}/favorites/${movie._id}`,
            {
                headers: { Authorization: `Bearer ${token}` }

            }).then(response => {
                const data = response.data;
                // prop that updates the state of a users favorite_movies if a film is deleted from favorites
                onMovieAddorDelete(data)
            }).catch(err => {
                console.log(err)
            })
        }
        
        // Set the text of the button for add/remove a movie, when a user adds or removes a movie from favorites
        const addRemove = () =>  {
            if(user.favorite_movies.includes(movie._id)) {
                this.setState({buttonText : 'Add to favorites'})
                deleteMovie();
            }else {
                this.setState({buttonText: 'Remove from favorites'})
                addMovie();
            }
        }

        return (
            <div className="movie-view">
                <div className="movie-image">
                    <img src={movie.imagePath} alt="Picture of the movie" />
                </div>
                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movie.title}</span>
                </div>
                <div className="movie-genre">
                    <span className="label">Genre: </span>
                    <span className="value">{movie.genre.name}</span>
                </div>
                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.description}</span>
                </div>
                <div className="movie-director">
                    <span className="label">Director: </span>
                    <span className="value">{movie.director.name}</span>
                </div> <hr />
                <Button variant="link"  onClick={() => { clickBack(); }}>Back</Button>

                <Link to={`/directors/${movie.director.name}`}>
                    <Button variant="link">Director</Button>
                </Link>

                <Link to={`/genres/${movie.genre.name}`}>
                    <Button variant="link">Genre</Button>
                </Link>

                { <Button variant="link" onClick={addRemove}>{buttonText}</Button> }
            </div>
        )
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,

        description: PropTypes.string.isRequired,

        imagePath: PropTypes.string.isRequired,

        director: PropTypes.shape({
            name: PropTypes.string.isRequired,
            bio: PropTypes.string,
            death: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
        }).isRequired,

        genre: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string
        }).isRequired,

        featured: PropTypes.bool

    }).isRequired,

    clickBack: PropTypes.func.isRequired,

    token: PropTypes.string.isRequired,

    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        favorite_movies: PropTypes.array.isRequired,
        birth_date: PropTypes.string.isRequired,
        pwd: PropTypes.string,
        _id: PropTypes.string
    }).isRequired,
    
    onMovieAddorDelete: PropTypes.func.isRequired
}

*/