import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { setMovies } from '../../actions/actions';

// we haven't written this one yet
import MoviesList from '../movies-list/movies-list';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
// import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { ProfileView } from '../profile-view/profile-view';
//import Config from '../../config.js';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// #2 export keyword removed from here
class MainView extends React.Component {

// #3 movies state removed from here
  constructor() {
    super();
    this.state = {
      user_status: null,
      token: null,
      user_profile: null
    }
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
      user_status: localStorage.getItem('user'),
      user_profile: JSON.parse(localStorage.getItem('profile')),
      token: localStorage.getItem('token')
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://myflix-app-2021.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
        // #4
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
        //  token: authData.token,
        //  user_profile: authData.user
    });

    localStorage.setItem('profile', JSON.stringify(authData.user));
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.username);
        this.getMovies(authData.token);
  }

  onRegister(register) {
    console.log(register);
    this.setState({
      register,
    });
  } 

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  // Update Users info
    updateUser(data) {
        this.setState( {
            user_status: data.username,
            user_profile: data
        } );

        localStorage.setItem('user', data.username);
        localStorage.setItem('profile', JSON.stringify(data));
    }

    // Remove account
    deleteUser() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('profile');
        this.setState({
            user: null,
            token: null
        });
    }

    // Set the state of user_profile, which represents an object with data about a user, after adding or deleting a movie.
    onMovieAddOrDelete(data) {
        this.setState({
            user_profile: data
        });

        localStorage.setItem('profile', JSON.stringify(data))
    }


  render() { 
    const { user_profile, token } = this.state; 
    // #5 movies is extracted from this.props rather than from the this.state
    let { movies } = this.props;
    let { user } = this.state;

    return ( 
      <Router> 
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            // #6
            return <MoviesList movies={movies}/>;
            return movies.map(m => (
              <Col md={3} key={m._id}>
                <NavigationBar logOut={() => this.onLoggedOut()} user={user}  />
                <MovieCard movie={m} />
              </Col>
            ))
          }} /> 

          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
              <RegistrationView /> 
            </Col>
          }} /> 

          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={ (user) => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <NavigationBar logOut={() => this.onLoggedOut()} user={user}  />
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} /> 

          <Route path="/directors/:name" render={({ match, history }) => {
            if (!user) return
             <LoginView onLogin={ (user) => this.onLoggedIn(user) } />
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
             <NavigationBar logOut={() => this.onLoggedOut()} user={user}  />
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/genres/:name" render={({ match, history }) => {
            if (!user) return
            <LoginView onLogin={ (user) => this.onLoggedIn(user) } />
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <NavigationBar logOut={() => this.onLoggedOut()} user={user}  />
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/users/:username" render={() => {
            if (!user) return
            <LoginView onLogin={ (user) => this.onLoggedIn(user) } />
            return <Col>
              <NavigationBar logOut={() => this.onLoggedOut()} user={user}  />
              <ProfileView clickBack={() => {history.goBack()}} userProfile={user_profile} userToken={token} onDelete={() => 
              this.deleteUser()}  onUpdate={(data) => 
              this.updateUser(data)} movies={movies} onMovieDelete={(data) => 
              this.onMovieAddOrDelete(data)} />
            </Col>
          }} />

        </Row>  
      </Router> 
    ); 
  } 
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies } )(MainView);