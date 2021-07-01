import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Card, FormControl } from 'react-bootstrap';
import axios from "axios";
import Container from "react-bootstrap/Container";
import { Button, Form, Col, Row } from "react-bootstrap";
//import Config from '../../config.js';


// Router
import { Link } from "react-router-dom";

// Style
import './profile-view.scss';

export function ProfileView({ userProfile, userToken, onDelete, onUpdate, movies, onMovieDelete }) {

    const [ newUsername, updateUsername ] = useState('');
    const [ newPassword, updatePassword ] = useState('');
    const [ newEmail, updateEmail ] = useState('');
    const [ newBirthday, updateBirthday ] = useState('');

    // States for validation
    const [ validateUser, setValidateUser ] = useState('');
    const [ validatePassword, setValidatePassword ] = useState('');
    const [ validateEmail, setValidateEmail ] = useState('');
    const [ validateBirthday, setValidateBirthday ] = useState('');
    const [ feedback, setFeedback ] = useState(''); 
    const { Username, Email, Birthday, FavoriteMovies, user, _id  } = userProfile;

    // Username validation
    const validateUsername = (e) => {
        if (e.target.value.length > 0 && e.target.value.length < 5) {
            setValidateUser('Username must be longer than 5 characters' );
        }else {
            setValidateUser('');
        }

        if (!e.currentTarget.value.match(/^[0-9a-zA-Z]+$/) && e.target.value.length > 0) {
            setValidateUser('Only alphanumeric characters allowed')
        }
    }

    // Password validation
    const validatePwd = (e) => {
        if (e.target.value.length > 0 && e.target.value.length < 8) {
            setValidatePassword('Password must be longer than 8 characters');
        }else {
            setValidatePassword('');
        }
    }

    // Email validation
    const validateMail = (e) => {
        if (!e.target.value.match(/\S+@\S+\.\S+/) && e.target.value.length > 0) {
            setValidateEmail('Invalid email');
        }else {
            setValidateEmail('');
        }
    }

    // Birthday validation
    const validateBirthdate = (e) => {
        if(!e.target.value.match(/^\d{4}-\d{2}-\d{2}$/) && e.target.value.length > 0 ) {
            setValidateBirthday('Plese use only this format (yyyy-mm-dd)');
        }else {
            setValidateBirthday('');
        }
    }  

    // Clear inputs after submission
    const clearForm = () => {
        updateUsername('');
        updateEmail('');
        updatePassword('');
        updateBirthday('')
    }

    // Update users info
    const updateUser = (e) => {
        e.preventDefault();

        // validation for empty inputs
        if (newUsername.length === 0 || newPassword.length === 0 || newEmail.length=== 0 || newBirthday.length === 0) {
            alert('Please fill in all the fields')
            return false
        }
        
        // prevent submission of incorrect credentials
        if ( validateUser || validateEmail || validatePassword || validateBirthday ) {
            alert('Incorrect credentials')
            return false;
        }
       
        axios.put(`https://myflix-app-2021.herokuapp.com/users/${Username}`,
        { 
            Username: newUsername,
            Password: newPassword,
            Email: newEmail,
            Birthday: newBirthday
        },
        {
            headers: { Authorization: `Bearer ${userToken}`}

        }).then(response => {
            const data = response.data;
            onUpdate(data)
            setFeedback('Your form has been submitted')
            clearForm()
            
        }).catch(err => {
            console.log(err + 'Update fail')
            setFeedback('Submission failed')
        })
    }
    
    // Delete Account
    const deleteUser = () => {
        axios.delete(`https://myflix-app-2021.herokuapp.com/users/${Username}`,
        {
            headers: { Authorization: `Bearer ${userToken}` }

        }).then(response => {
            console.log(response.data)
            onDelete();
        }).catch(err => {
            console.log(err)
        })
    }

    // Delete a film from favorites
    const deleteMovie = (movieID) => {
        axios.delete(`https://myflix-app-1029.herokuapp.com/users/${Username}/favorites/${movieID}`,
        {
            headers: { Authorization: `Bearer ${userToken}` }

        }).then(response => {
            const data = response.data;
            onMovieDelete(data)
        }).catch(err => {
            console.log(err)
        })
    }



    // Filters the movies based on the favorite_movies (array of only movie IDs)
    const filteredMovies = movies.filter(m => {
        return FavoriteMovies.indexOf(m._id) >= 0 ;
    }); 
    
    return (
        <div className="profile-view ">
          <hr /> <hr />  <h4>{`Welcome ${Username}`}</h4> <hr />
          
            <div className="user-profile">
                <div className="user-info">
                    <div className="user-label">Username:</div>
                    <div className="user">{Username}</div>
                </div>
                <div className="user-info">
                    <div className="user-label">Email:</div>
                    <div className="user">{Email}</div>
                </div>
                <div className="user-info">
                    <div className="user-label">Birth:</div>
                    <div className="user">{Birthday.slice(0, 10)}</div>
                </div>
                <div className="user-info">
                    <div className="user-label">Favorite Movies:</div>
                    <ul className="user">
                    {filteredMovies.map((m, index)=> <li key={index} className="fav-list">  <Link to={`/movies/${m._id}`}>{m.title}</Link> <button className="close" onClick={() => deleteMovie(m._id)} >&times;</button> </li>)}
                    </ul>
                </div>
            </div>

            <Form className="update-info">
                <h4>Manage account</h4> <hr />
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>New-Username:</Form.Label>
                    <Form.Control type="text" value={newUsername} onChange={(e) => {updateUsername(e.target.value),  validateUsername(e)}} />
                    <span className="validation-feedback">{validateUser}</span> 
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>New-password:</Form.Label>
                    <Form.Control type="password" value={newPassword} onChange={(e) => {updatePassword(e.target.value),  validatePwd(e)}} />
                    <span className="validation-feedback">{validatePassword}</span>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>New-email:</Form.Label>
                    <Form.Control type="email"  value={newEmail} onChange={(e) => {updateEmail(e.target.value),  validateMail(e)}} />
                    <span className="validation-feedback">{validateEmail}</span> 
                </Form.Group>

                <Form.Group controlId="formBasicBirth">
                    <Form.Label>New-Birth(yyyy-mm-dd):</Form.Label>
                    <Form.Control type="text"  value={newBirthday} onChange={(e) => {updateBirthday(e.target.value),  validateBirthdate(e)}} />
                    <span className="validation-feedback">{validateBirthday}</span>
                </Form.Group>

                <div className="feedback">{feedback}</div>

                <div className="button-wrapper">
                    <Button variant="primary" size="sm" type="submit" onClick={updateUser} >Update details</Button>
                    <Button variant="danger" size="sm" type="button" onClick={deleteUser} >Delete account</Button>
                </div>
            </Form>
        </div>
    )
}

 ProfileView.propTypes = {
    movies: PropTypes.array.isRequired,

    userProfile: PropTypes.shape({
        username: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        favorite_movies: PropTypes.array.isRequired,
        birth_date: PropTypes.string.isRequired,
        pwd: PropTypes.string,
        _id: PropTypes.string
    }).isRequired,

    userToken: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onMovieDelete: PropTypes.func.isRequired,
} 